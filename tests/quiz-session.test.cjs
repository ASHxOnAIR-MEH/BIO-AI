const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const Module = require('node:module');
const root = path.resolve(__dirname, '..');
process.env.QUIZ_SESSION_SECRET = 'test-only-session-secret-not-used-in-production';
// Compile the actual TypeScript modules into fresh module instances to simulate cold starts.
function load(relative) {
  const filename = path.join(root, relative);
  const mod = new Module(filename, module);
  mod.filename = filename;
  mod.paths = Module._nodeModulePaths(path.dirname(filename));
  const normalRequire = mod.require.bind(mod);
  mod.require = (name) => {
    if (name.startsWith('@/')) return require(path.join(root, 'src', name.slice(2)));
    if (name.startsWith('./')) return load(path.relative(root, path.resolve(path.dirname(filename), name + '.ts')));
    return normalRequire(name);
  };
  mod._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
  }).outputText, filename);
  return mod.exports;
}
function coldEngine() { delete globalThis.bioAiQuizStore; return load('src/lib/quizEngine.ts'); }

test('quiz survives a cold instance for every answer, duplicate, recovery, and public QR result', async () => {
  let engine = coldEngine();
  const { attemptId, questions } = engine.startQuizAttempt('test-registration', 'en');
  const bank = engine.getValidQuestionBank();
  let cookie = engine.exportQuizSession(attemptId);
  assert.ok(cookie.length < 3800);
  for (let i = 0; i < questions.length; i++) {
    engine = coldEngine();
    assert.equal(engine.getOngoingAttemptState(attemptId), null);
    engine.restoreQuizSession(cookie, attemptId);
    const correct = bank.find(q => q.id === questions[i].id).correct_option_index;
    const choice = i === 1 ? -1 : i === 2 ? (correct + 1) % 4 : correct;
    const result = engine.submitQuizAnswer(attemptId, questions[i].id, choice);
    assert.equal(result.currentScore, i === 0 ? 10 : i === 1 ? 5 : (i - 2) * 10);
    cookie = engine.exportQuizSession(attemptId);
    engine = coldEngine();
    engine.restoreQuizSession(cookie, attemptId);
    assert.equal(engine.submitQuizAnswer(attemptId, questions[i].id, choice).currentScore, result.currentScore);
    assert.equal(engine.getOngoingAttemptState(attemptId).currentScore, result.currentScore);
  }
  const result = await engine.finalizeAndPersistResult(attemptId, 'https://example.test');
  engine = coldEngine();
  const publicResult = engine.getPublicResultByToken(result.accessToken);
  assert.equal(publicResult.totalScore, 70);
  assert.equal(publicResult.correctCount, 8);
  assert.ok(!('registrationId' in publicResult));
  assert.ok(!('email' in publicResult));
});

test('tampered, expired, wrong-purpose and wrong-attempt tokens are rejected', () => {
  const codec = load('src/lib/quizToken.ts');
  const token = codec.sealQuizToken({ test: true }, 'session', Date.now() + 60000);
  assert.deepEqual(codec.openQuizToken(token, 'session'), { test: true });
  const altered = token.slice(0, 40) + (token[40] === 'A' ? 'B' : 'A') + token.slice(41);
  assert.throws(() => codec.openQuizToken(altered, 'session'));
  assert.throws(() => codec.openQuizToken(token, 'result'));
  assert.throws(() => codec.openQuizToken(codec.sealQuizToken({}, 'session', Date.now()-1), 'session'));
  const engine = coldEngine();
  const { attemptId, questions } = engine.startQuizAttempt('test', 'en');
  assert.throws(() => engine.restoreQuizSession(engine.exportQuizSession(attemptId), 'other-attempt'));
  assert.throws(() => engine.restoreQuizSession(undefined, attemptId));
  assert.throws(() => engine.submitQuizAnswer(attemptId, questions[0].id, 0.5));
  assert.throws(() => engine.submitQuizAnswer(attemptId, questions[1].id, 0));
});
