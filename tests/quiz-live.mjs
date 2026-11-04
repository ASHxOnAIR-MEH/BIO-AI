import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const base = process.argv[2] || 'http://127.0.0.1:3002';
const bank = JSON.parse(await readFile(new URL('../src/data/arogyamithranQuizBank.json', import.meta.url), 'utf8')).questions;
let cookie = '';
const times = [];
async function request(path, body, publicRequest = false) {
  const start = performance.now();
  const response = await fetch(base + path, {
    method: body ? 'POST' : 'GET',
    headers: { ...(body ? {'Content-Type':'application/json'} : {}), ...(!publicRequest && cookie ? {Cookie:cookie} : {}) },
    body: body ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(20000),
  });
  const data = await response.json();
  assert.equal(response.status, 200, data.message || 'HTTP failure');
  assert.equal(data.success, true, data.message);
  const nextCookie = response.headers.getSetCookie().find(value => value.startsWith('bioai_quiz_session='));
  if (nextCookie) cookie = nextCookie.split(';')[0];
  if (path.endsWith('/submit-answer')) times.push(Math.round(performance.now() - start));
  return data;
}
const quiz = await request('/api/kiosk/quiz/start', {language:'en'});
assert.ok(cookie, 'Start must issue a session cookie');
assert.ok(!JSON.stringify(quiz.questions).includes('correct_option_index'));
for (const [index, question] of quiz.questions.entries()) {
  const selectedOptionIndex = bank.find(q => q.id === question.id).correct_option_index;
  const body = {attemptId:quiz.attemptId, questionId:question.id, selectedOptionIndex};
  const answer = await request('/api/kiosk/quiz/submit-answer', body);
  assert.equal(answer.currentScore, (index+1)*10);
  if (index === 0 || index === 9) {
    assert.equal((await request('/api/kiosk/quiz/submit-answer', body)).currentScore, answer.currentScore);
  }
  const state = await request('/api/kiosk/quiz/result?action=recover&attemptId='+quiz.attemptId);
  assert.equal(state.currentScore, answer.currentScore);
}
const {result} = await request('/api/kiosk/quiz/result?attemptId='+quiz.attemptId);
assert.equal(result.totalScore, 100);
assert.ok(result.qrCodeDataUrl.startsWith('data:image/png;base64,'));
const publicResult = await request('/api/kiosk/result/'+result.accessToken, undefined, true);
assert.equal(publicResult.result.totalScore, 100);
console.log(JSON.stringify({passed:true,answers:10,duplicateChecks:2,publicQr:true,submitMs:times,averageMs:Math.round(times.reduce((a,b)=>a+b,0)/times.length)}));
