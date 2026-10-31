export type GameView = "landing" | "selector" | "level" | "results";

export type LevelNumber = 1 | 2 | 3 | 4 | 5 | 6;

export type LevelStatus = "locked" | "unlocked" | "completed" | "current";

export interface LevelProgress {
  levelNumber: LevelNumber;
  status: LevelStatus;
  score: number;
  bestScore: number;
  timeSpentSeconds: number;
  attempts: number;
  completedAt?: string;
}

export type VedaGameExpression =
  | "welcome"
  | "curious"
  | "thinking"
  | "explaining"
  | "happy"
  | "celebrating"
  | "concerned";

export interface VedaDialogState {
  expression: VedaGameExpression;
  message: string;
  messageMl?: string;
  supportingText?: string;
  supportingTextMl?: string;
  hintText?: string;
  hintTextMl?: string;
}

export interface SpiceQuestState {
  currentView: GameView;
  currentLevel: LevelNumber;
  levels: Record<LevelNumber, LevelProgress>;
  totalScore: number;
  bestTotalScore: number;
  isMuted: boolean;
  language: "en" | "ml";
  isKioskPortrait: boolean;
  gameStartTime: number | null;
  vedaDialog: VedaDialogState;
}

export interface QRResultData {
  title: string;
  score: number;
  maxScore: number;
  levelsCompleted: number;
  timestamp: string;
  rank: string;
  kioskVenue: string;
}

