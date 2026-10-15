export type KioskLanguage = "en" | "ml";

export type KioskCardId =
  | "arogyamithran"
  | "vedaverse"
  | "innovations"
  | "ecosystem";

export interface KioskNavigationCard {
  id: KioskCardId;
  title: string;
  titleMl: string;
  subtitle: string;
  subtitleMl: string;
  description: string;
  descriptionMl: string;
  badge: string;
  badgeMl: string;
  iconName: string;
  accentColor: string;
  features: string[];
  status: "coming_soon" | "ready";
  phase: string;
}

export interface KioskSessionState {
  language: KioskLanguage;
  selectedCard: KioskCardId | null;
  activeModal: KioskCardId | null;
  isIdle: boolean;
  lastInteractionTime: number;
}

// ─── Quiz Data Models ─────────────────────────────────────────────────────────

export interface QuizQuestionRaw {
  id: string;
  category: string;
  difficulty: string;
  question: string;
  options: string[];
  correct_option_index: number;
  correct_answer: string;
  explanation: string;
  source_urls?: string[];
  status?: string;
  language?: string;
}

export interface QuizBankDataset {
  dataset: string;
  version: string;
  description: string;
  scoring: {
    points_per_correct_answer: number;
    max_questions_per_attempt: number;
    max_score: number;
    no_negative_marking: boolean;
  };
  selection_policy: {
    questions_per_attempt: number;
    no_duplicates_within_attempt: boolean;
    recommended_repeat_visitor_policy?: string;
    security?: string;
  };
  questions: QuizQuestionRaw[];
}

/** Sanitized question sent to client before answer is submitted */
export interface QuizQuestionClient {
  id: string;
  category: string;
  difficulty: string;
  question: string;
  options: string[];
}

/** Feedback returned from server after answer submission */
export interface QuizAnswerResponse {
  success: boolean;
  questionId: string;
  isCorrect: boolean;
  correctOptionIndex: number;
  correctAnswer: string;
  explanation: string;
  awardedPoints: number;
  currentScore: number;
  questionsAnswered: number;
  totalQuestions: number;
  message?: string;
}

/** Individual review entry in final results */
export interface QuizReviewItem {
  questionId: string;
  questionText: string;
  category: string;
  options: string[];
  selectedOptionIndex: number;
  correctOptionIndex: number;
  isCorrect: boolean;
  awardedPoints: number;
  explanation: string;
}

/** Final quiz attempt result */
export interface QuizFinalResult {
  attemptId: string;
  registrationId?: string;
  totalScore: number;
  maxScore: number;
  correctCount: number;
  incorrectCount: number;
  totalQuestions: number;
  accuracyPercentage: number;
  language: KioskLanguage;
  completedAt: string;
  review: QuizReviewItem[];
  // Step 5 Result Delivery extensions
  resultId?: string;
  accessToken?: string;
  resultUrl?: string;
  qrCodeDataUrl?: string;
  emailDelivery?: EmailDeliveryInfo;
}

// ─── Step 5: Personal Result Link, QR & Email Models ─────────────────────────

export type EmailDeliveryStatus =
  | "pending"
  | "sent"
  | "accepted"
  | "failed"
  | "not-configured";

export interface EmailDeliveryInfo {
  status: EmailDeliveryStatus;
  recipientEmailMasked: string;
  sentAt?: string;
  lastAttemptAt?: string;
  error?: string;
  attemptsCount: number;
  message?: string;
}

export interface VisitorRegistrationRecord {
  registrationId: string;
  fullName: string;
  email: string;
  mobile: string;
  designation?: string;
  organisation?: string;
  consent: boolean;
  language: KioskLanguage;
  registeredAt: string;
}

export interface SavedQuizResultRecord {
  resultId: string;
  registrationId: string;
  attemptId: string;
  accessToken: string;
  resultUrl: string;
  qrCodeDataUrl: string;
  totalScore: number;
  maxScore: number;
  correctCount: number;
  incorrectCount: number;
  totalQuestions: number;
  accuracyPercentage: number;
  language: KioskLanguage;
  completedAt: string;
  review: QuizReviewItem[];
  emailDelivery: EmailDeliveryInfo;
  isRevoked?: boolean;
  expiresAt?: string;
}

/** Public result view sent to mobile phones scanning the QR code (Strictly ZERO PII) */
export interface PublicResultViewData {
  resultId: string;
  totalScore: number;
  maxScore: number;
  correctCount: number;
  incorrectCount: number;
  totalQuestions: number;
  accuracyPercentage: number;
  language: KioskLanguage;
  completedAt: string;
  review: QuizReviewItem[];
  isRevoked?: boolean;
}

// ─── Step 6: VedaVerse Plant & Spice Library Models ─────────────────────────

export type VedaVerseCategory =
  | "Ayurvedic plant"
  | "Medicinal plant"
  | "Culinary spice / herb";

export interface VedaVerseSourceInfo {
  name: string;
  url: string;
  scope: string;
}

export interface PlantRecord {
  id: string;
  category: VedaVerseCategory;
  common_name_en: string;
  common_name_ml: string;
  scientific_name: string;
  family: string;
  plant_part_or_spice_part: string;
  traditional_or_general_context: string;
  culinary_or_ecological_context: string;
  safety_note: string;
  evidence_note: string;
  image_search_query: string;
  source_urls: string[];
  verification_status: string;
  source_ids: string[];
}

export interface VedaVerseDataset {
  dataset: string;
  version: string;
  description: string;
  counts: {
    "Ayurvedic plant": number;
    "Medicinal plant": number;
    "Culinary spice / herb": number;
    total: number;
  };
  disclaimer: string;
  sources: Record<string, VedaVerseSourceInfo>;
  plants: PlantRecord[];
}


