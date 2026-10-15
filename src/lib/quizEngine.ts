import { randomBytes } from "node:crypto";
import QRCode from "qrcode";
import quizBankJson from "@/data/arogyamithranQuizBank.json";
import {
  QuizBankDataset,
  QuizQuestionRaw,
  QuizQuestionClient,
  QuizAnswerResponse,
  QuizFinalResult,
  QuizReviewItem,
  KioskLanguage,
  VisitorRegistrationRecord,
  SavedQuizResultRecord,
  PublicResultViewData,
  EmailDeliveryInfo,
} from "@/components/kiosk/types";
import { sendResultEmail } from "./emailService";

const dataset = quizBankJson as unknown as QuizBankDataset;

// Validate that dataset has at least 10 valid questions
export function getValidQuestionBank(): QuizQuestionRaw[] {
  if (!dataset || !Array.isArray(dataset.questions)) {
    throw new Error("Question bank is malformed or missing questions array.");
  }

  const valid = dataset.questions.filter((q) => {
    return (
      typeof q.id === "string" &&
      q.id.trim().length > 0 &&
      typeof q.question === "string" &&
      q.question.trim().length > 0 &&
      Array.isArray(q.options) &&
      q.options.length === 4 &&
      typeof q.correct_option_index === "number" &&
      q.correct_option_index >= 0 &&
      q.correct_option_index <= 3 &&
      typeof q.correct_answer === "string"
    );
  });

  if (valid.length < 10) {
    throw new Error(
      `Question bank contains only ${valid.length} valid questions. Minimum 10 distinct questions required to start a challenge.`
    );
  }

  return valid;
}

// In-memory attempts store for server session management
interface ServerQuizAttempt {
  attemptId: string;
  registrationId: string;
  language: KioskLanguage;
  selectedQuestions: QuizQuestionRaw[];
  answers: Record<
    string,
    {
      selectedOptionIndex: number;
      isCorrect: boolean;
      awardedPoints: number;
      answeredAt: string;
    }
  >;
  totalScore: number;
  isCompleted: boolean;
  createdAt: string;
  completedAt?: string;
}

// Global in-memory storage (singleton across server requests)
const globalAttempts = new Map<string, ServerQuizAttempt>();

/**
 * Initializes a new quiz attempt with 10 randomly selected distinct questions.
 */
export function startQuizAttempt(
  registrationId: string,
  language: KioskLanguage = "en"
): { attemptId: string; questions: QuizQuestionClient[] } {
  const allValid = getValidQuestionBank();

  // Fisher-Yates shuffle to pick 10 random distinct questions
  const shuffled = [...allValid];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  const selected10 = shuffled.slice(0, 10);

  // Generate unique opaque attempt ID
  const attemptId = `ATT-${Date.now().toString(36).toUpperCase()}-${Math.floor(
    1000 + Math.random() * 9000
  )}`;

  const attempt: ServerQuizAttempt = {
    attemptId,
    registrationId,
    language,
    selectedQuestions: selected10,
    answers: {},
    totalScore: 0,
    isCompleted: false,
    createdAt: new Date().toISOString(),
  };

  globalAttempts.set(attemptId, attempt);

  // Strip answers and explanations before sending to client (Security Requirement)
  const clientQuestions: QuizQuestionClient[] = selected10.map((q) => ({
    id: q.id,
    category: q.category,
    difficulty: q.difficulty,
    question: q.question,
    options: [...q.options],
    image: q.image || "/assets/kiosk/categories/card_vedaverse.jpg",
  }));

  return { attemptId, questions: clientQuestions };
}

/**
 * Submits an answer for a question in an active attempt.
 * Validates correctness, prevents duplicate scoring, and returns feedback.
 */
export function submitQuizAnswer(
  attemptId: string,
  questionId: string,
  selectedOptionIndex: number
): QuizAnswerResponse {
  const attempt = globalAttempts.get(attemptId);
  if (!attempt) {
    throw new Error("Active quiz attempt not found or has expired.");
  }

  if (attempt.isCompleted) {
    throw new Error("This quiz attempt has already been completed.");
  }

  const question = attempt.selectedQuestions.find((q) => q.id === questionId);
  if (!question) {
    throw new Error("Question does not belong to this active quiz attempt.");
  }

  if (selectedOptionIndex < 0 || selectedOptionIndex > 3) {
    throw new Error("Selected option index must be between 0 and 3.");
  }

  // Prevent duplicate submissions / double-taps
  if (attempt.answers[questionId]) {
    const existing = attempt.answers[questionId];
    return {
      success: true,
      questionId,
      isCorrect: existing.isCorrect,
      correctOptionIndex: question.correct_option_index,
      correctAnswer: question.correct_answer,
      explanation: question.explanation,
      awardedPoints: existing.awardedPoints,
      currentScore: attempt.totalScore,
      questionsAnswered: Object.keys(attempt.answers).length,
      totalQuestions: 10,
      message: "Answer already submitted for this question.",
    };
  }

  const isCorrect = selectedOptionIndex === question.correct_option_index;
  const awardedPoints = isCorrect ? 10 : 0;

  attempt.answers[questionId] = {
    selectedOptionIndex,
    isCorrect,
    awardedPoints,
    answeredAt: new Date().toISOString(),
  };

  attempt.totalScore += awardedPoints;

  const questionsAnswered = Object.keys(attempt.answers).length;
  if (questionsAnswered >= 10) {
    attempt.isCompleted = true;
    attempt.completedAt = new Date().toISOString();
  }

  return {
    success: true,
    questionId,
    isCorrect,
    correctOptionIndex: question.correct_option_index,
    correctAnswer: question.correct_answer,
    explanation: question.explanation,
    awardedPoints,
    currentScore: attempt.totalScore,
    questionsAnswered,
    totalQuestions: 10,
  };
}

/**
 * Retrieves the verified final score and question review for an attempt.
 */
export function getQuizAttemptResult(attemptId: string): QuizFinalResult {
  const attempt = globalAttempts.get(attemptId);
  if (!attempt) {
    throw new Error("Quiz attempt not found.");
  }

  const review: QuizReviewItem[] = attempt.selectedQuestions.map((q) => {
    const ans = attempt.answers[q.id];
    return {
      questionId: q.id,
      questionText: q.question,
      category: q.category,
      options: q.options,
      selectedOptionIndex: ans ? ans.selectedOptionIndex : -1,
      correctOptionIndex: q.correct_option_index,
      isCorrect: ans ? ans.isCorrect : false,
      awardedPoints: ans ? ans.awardedPoints : 0,
      explanation: q.explanation,
    };
  });

  const correctCount = Object.values(attempt.answers).filter(
    (a) => a.isCorrect
  ).length;
  const incorrectCount = Object.keys(attempt.answers).length - correctCount;

  return {
    attemptId: attempt.attemptId,
    registrationId: attempt.registrationId,
    totalScore: attempt.totalScore,
    maxScore: 100,
    correctCount,
    incorrectCount,
    totalQuestions: 10,
    accuracyPercentage: Math.round((correctCount / 10) * 100),
    language: attempt.language,
    completedAt: attempt.completedAt || new Date().toISOString(),
    review,
  };
}

/**
 * Recovers an ongoing attempt state if visitor reloads during quiz.
 */
export function getOngoingAttemptState(attemptId: string): {
  attemptId: string;
  questions: QuizQuestionClient[];
  answeredQuestions: Record<
    string,
    {
      selectedOptionIndex: number;
      isCorrect: boolean;
      correctOptionIndex: number;
      correctAnswer: string;
      explanation: string;
    }
  >;
  currentScore: number;
  isCompleted: boolean;
} | null {
  const attempt = globalAttempts.get(attemptId);
  if (!attempt) return null;

  const clientQuestions: QuizQuestionClient[] = attempt.selectedQuestions.map(
    (q) => ({
      id: q.id,
      category: q.category,
      difficulty: q.difficulty,
      question: q.question,
      options: [...q.options],
      image: q.image || "/assets/kiosk/categories/card_vedaverse.jpg",
    })
  );

  const answeredMap: Record<
    string,
    {
      selectedOptionIndex: number;
      isCorrect: boolean;
      correctOptionIndex: number;
      correctAnswer: string;
      explanation: string;
    }
  > = {};

  for (const [qid, ans] of Object.entries(attempt.answers)) {
    const q = attempt.selectedQuestions.find((item) => item.id === qid);
    if (q) {
      answeredMap[qid] = {
        selectedOptionIndex: ans.selectedOptionIndex,
        isCorrect: ans.isCorrect,
        correctOptionIndex: q.correct_option_index,
        correctAnswer: q.correct_answer,
        explanation: q.explanation,
      };
    }
  }

  return {
    attemptId: attempt.attemptId,
    questions: clientQuestions,
    answeredQuestions: answeredMap,
    currentScore: attempt.totalScore,
    isCompleted: attempt.isCompleted,
  };
}

// ─── Step 5: Visitor Registry, Result Persistence, QR & Tokens ──────────────

const globalVisitors = new Map<string, VisitorRegistrationRecord>();
const globalSavedResults = new Map<string, SavedQuizResultRecord>();
const tokenToResultMap = new Map<string, string>();
const attemptToResultMap = new Map<string, string>();

export function saveVisitorRegistration(record: VisitorRegistrationRecord): void {
  globalVisitors.set(record.registrationId, record);
}

export function getVisitorRegistration(
  registrationId: string
): VisitorRegistrationRecord | undefined {
  return globalVisitors.get(registrationId);
}

/**
 * Finalizes and saves a completed quiz result, generates a cryptographic access token,
 * produces a scannable high-contrast QR code, and triggers honest email delivery.
 */
export async function finalizeAndPersistResult(
  attemptId: string,
  originUrl?: string
): Promise<SavedQuizResultRecord> {
  const attempt = globalAttempts.get(attemptId);
  if (!attempt) {
    throw new Error("Quiz attempt not found.");
  }

  // Idempotency: Return existing saved record if already finalized
  const existingResultId = attemptToResultMap.get(attemptId);
  if (existingResultId) {
    const existing = globalSavedResults.get(existingResultId);
    if (existing) {
      return existing;
    }
  }

  // Calculate final review items
  const review: QuizReviewItem[] = attempt.selectedQuestions.map((q) => {
    const ans = attempt.answers[q.id];
    return {
      questionId: q.id,
      questionText: q.question,
      category: q.category,
      options: q.options,
      selectedOptionIndex: ans ? ans.selectedOptionIndex : -1,
      correctOptionIndex: q.correct_option_index,
      isCorrect: ans ? ans.isCorrect : false,
      awardedPoints: ans ? ans.awardedPoints : 0,
      explanation: q.explanation,
    };
  });

  const correctCount = Object.values(attempt.answers).filter(
    (a) => a.isCorrect
  ).length;
  const incorrectCount = Object.keys(attempt.answers).length - correctCount;

  // Generate unique opaque result identifier
  const resultId = `RES-${Date.now().toString(36).toUpperCase()}-${Math.floor(
    1000 + Math.random() * 9000
  )}`;

  // Cryptographically secure opaque access token (unpredictable)
  const accessToken = randomBytes(24).toString("base64url");

  // Determine canonical origin
  const origin = (
    originUrl ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "http://localhost:3001"
  ).replace(/\/$/, "");

  const resultUrl = `${origin}/kiosk/result/${accessToken}`;

  // High-contrast, scannable QR Code data URL (PNG)
  const qrCodeDataUrl = await QRCode.toDataURL(resultUrl, {
    margin: 2,
    width: 320,
    errorCorrectionLevel: "M",
    color: {
      dark: "#073B30",
      light: "#FFFFFF",
    },
  });

  // Look up visitor registration for email delivery
  const visitor = globalVisitors.get(attempt.registrationId);

  let emailDelivery: EmailDeliveryInfo = {
    status: "not-configured",
    recipientEmailMasked: visitor
      ? visitor.email.replace(/(.{1})(.*)(@.*)/, "$1***$3")
      : "visitor@***",
    attemptsCount: 0,
    message: "No email address registered for this attempt.",
  };

  if (visitor && visitor.email) {
    emailDelivery = await sendResultEmail({
      toEmail: visitor.email,
      visitorName: visitor.fullName,
      score: attempt.totalScore,
      correctCount,
      totalQuestions: 10,
      resultUrl,
      qrCodeDataUrl,
      language: attempt.language,
    });
  }

  const savedRecord: SavedQuizResultRecord = {
    resultId,
    registrationId: attempt.registrationId,
    attemptId: attempt.attemptId,
    accessToken,
    resultUrl,
    qrCodeDataUrl,
    totalScore: attempt.totalScore,
    maxScore: 100,
    correctCount,
    incorrectCount,
    totalQuestions: 10,
    accuracyPercentage: Math.round((correctCount / 10) * 100),
    language: attempt.language,
    completedAt: attempt.completedAt || new Date().toISOString(),
    review,
    emailDelivery,
    isRevoked: false,
  };

  globalSavedResults.set(resultId, savedRecord);
  tokenToResultMap.set(accessToken, resultId);
  attemptToResultMap.set(attemptId, resultId);

  return savedRecord;
}

/**
 * Retrieves public result view data by secure access token.
 * Strictly filters out visitor PII (no mobile, email, name, organization).
 */
export function getPublicResultByToken(
  token: string
): PublicResultViewData | null {
  if (!token) return null;
  const resultId = tokenToResultMap.get(token);
  if (!resultId) return null;
  const record = globalSavedResults.get(resultId);
  if (!record || record.isRevoked) return null;

  return {
    resultId: record.resultId,
    totalScore: record.totalScore,
    maxScore: record.maxScore,
    correctCount: record.correctCount,
    incorrectCount: record.incorrectCount,
    totalQuestions: record.totalQuestions,
    accuracyPercentage: record.accuracyPercentage,
    language: record.language,
    completedAt: record.completedAt,
    review: record.review,
    isRevoked: record.isRevoked,
  };
}

/**
 * Retries result email delivery for a given access token.
 */
export async function resendResultEmailByToken(
  token: string
): Promise<EmailDeliveryInfo> {
  const resultId = tokenToResultMap.get(token);
  if (!resultId) throw new Error("Invalid result token.");
  const record = globalSavedResults.get(resultId);
  if (!record) throw new Error("Result record not found.");

  const visitor = globalVisitors.get(record.registrationId);
  if (!visitor || !visitor.email) {
    throw new Error("No recipient email on file for this result.");
  }

  const updatedDelivery = await sendResultEmail({
    toEmail: visitor.email,
    visitorName: visitor.fullName,
    score: record.totalScore,
    correctCount: record.correctCount,
    totalQuestions: record.totalQuestions,
    resultUrl: record.resultUrl,
    qrCodeDataUrl: record.qrCodeDataUrl,
    language: record.language,
  });

  updatedDelivery.attemptsCount = (record.emailDelivery.attemptsCount || 0) + 1;
  record.emailDelivery = updatedDelivery;

  return updatedDelivery;
}

/**
 * Checks if a result has already been finalized.
 */
export function getSavedResultByAttemptId(
  attemptId: string
): SavedQuizResultRecord | undefined {
  const resultId = attemptToResultMap.get(attemptId);
  if (!resultId) return undefined;
  return globalSavedResults.get(resultId);
}

