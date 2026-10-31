"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  GameView,
  LevelNumber,
  LevelProgress,
  SpiceQuestState,
  VedaDialogState,
  VedaGameExpression,
} from "./types";
import { SpiceAudio } from "./SpiceAudio";

const STORAGE_KEY = "bioai_spice_quest_state_v1";

const INITIAL_LEVELS: Record<LevelNumber, LevelProgress> = {
  1: { levelNumber: 1, status: "unlocked", score: 0, bestScore: 0, timeSpentSeconds: 0, attempts: 0 },
  2: { levelNumber: 2, status: "locked", score: 0, bestScore: 0, timeSpentSeconds: 0, attempts: 0 },
  3: { levelNumber: 3, status: "locked", score: 0, bestScore: 0, timeSpentSeconds: 0, attempts: 0 },
  4: { levelNumber: 4, status: "locked", score: 0, bestScore: 0, timeSpentSeconds: 0, attempts: 0 },
  5: { levelNumber: 5, status: "locked", score: 0, bestScore: 0, timeSpentSeconds: 0, attempts: 0 },
  6: { levelNumber: 6, status: "locked", score: 0, bestScore: 0, timeSpentSeconds: 0, attempts: 0 },
};

const INITIAL_VEDA_DIALOG: VedaDialogState = {
  expression: "welcome",
  message: "Welcome to the Spice Garden! Discover the world of traditional spices through six exciting challenges.",
  messageMl: "സുഗന്ധ തോട്ടത്തിലേക്ക് സ്വാഗതം! ആറ് ആവേശകരമായ വെല്ലുവിളികളിലൂടെ പരമ്പരാഗത സുഗന്ധവ്യഞ്ജനങ്ങളെ പരിചയപ്പെടൂ.",
  supportingText: "Identify mysterious ingredients, explore their botanical identities, and unlock classical Ayurvedic secrets.",
  supportingTextMl: "സസ്യശാസ്ത്രപരമായ തെളിവുകളും ആയുർവേദ രഹസ്യങ്ങളും കണ്ടെത്തി ഓരോ വെല്ലുവിളിയും പൂർത്തിയാക്കൂ."
};

interface SpiceQuestContextType {
  state: SpiceQuestState;
  setView: (view: GameView) => void;
  startLevel: (level: LevelNumber) => void;
  completeLevel: (level: LevelNumber, pointsEarned: number, timeSpent: number) => void;
  recordScoreIncrement: (points: number) => void;
  setVedaDialog: (dialog: Partial<VedaDialogState>) => void;
  toggleMute: () => void;
  setLanguage: (lang: "en" | "ml") => void;
  resetGame: () => void;
  isLevelCompleted: (level: LevelNumber) => boolean;
  isLevelUnlocked: (level: LevelNumber) => boolean;
}

const SpiceQuestContext = createContext<SpiceQuestContextType | null>(null);

export function SpiceQuestProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<SpiceQuestState>(() => {
    // Initial load from sessionStorage or fallback
    if (typeof window !== "undefined") {
      try {
        const saved = sessionStorage.getItem(STORAGE_KEY) || localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          return {
            ...parsed,
            currentView: "landing",
            currentLevel: 1,
            gameStartTime: Date.now(),
            vedaDialog: INITIAL_VEDA_DIALOG
          };
        }
      } catch {
        // ignore
      }
    }

    return {
      currentView: "landing",
      currentLevel: 1,
      levels: INITIAL_LEVELS,
      totalScore: 0,
      bestTotalScore: 0,
      isMuted: false,
      language: "en",
      isKioskPortrait: false,
      gameStartTime: null,
      vedaDialog: INITIAL_VEDA_DIALOG
    };
  });

  // Sync mute to sound engine
  useEffect(() => {
    SpiceAudio.setMuted(state.isMuted);
  }, [state.isMuted]);

  // Persist state changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const dataToSave = {
        levels: state.levels,
        totalScore: state.totalScore,
        bestTotalScore: Math.max(state.totalScore, state.bestTotalScore),
        isMuted: state.isMuted,
        language: state.language
      };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch {
      // ignore
    }
  }, [state.levels, state.totalScore, state.bestTotalScore, state.isMuted, state.language]);

  const setView = useCallback((view: GameView) => {
    setState((prev) => ({ ...prev, currentView: view }));
  }, []);

  const startLevel = useCallback((level: LevelNumber) => {
    setState((prev) => {
      // Only allow if level is unlocked or completed
      if (prev.levels[level].status === "locked") return prev;

      // Set Veda intro dialog based on level
      let vedaExp: VedaGameExpression = "curious";
      let msg = `Ready for Level ${level}? Let's uncover this Ayurvedic secret.`;
      let msgMl = `ലെവൽ ${level}-ന് തയ്യാറാണോ? ഈ രഹസ്യം നമുക്ക് കണ്ടെത്താം.`;

      if (level === 1) {
        vedaExp = "curious";
        msg = "Welcome Detective! Look carefully at the spice photograph and choose the correct answer.";
        msgMl = "സ്വാഗതം! ഫോട്ടോ സൂക്ഷ്മമായി കണ്ട് ശരിയായ സുഗന്ധവ്യഞ്ജനം തിരഞ്ഞെടുക്കൂ.";
      } else if (level === 2) {
        vedaExp = "thinking";
        msg = "Botanical organ check: Which part of the living plant gives us each spice? Drag or tap to match!";
        msgMl = "സസ്യശാസ്ത്ര വിഭാഗങ്ങൾ പരിശോധിക്കൂ: സസ്യത്തിന്റെ ഏത് ഭാഗമാണ് ഓരോ സുഗന്ധവ്യഞ്ജനവും?";
      } else if (level === 3) {
        vedaExp = "thinking";
        msg = "Turn over the ancient cards and find matching pairs of sacred Kerala spices!";
        msgMl = "കാർഡുകൾ മറിച്ചു നോക്കി ഒരേപോലെയുള്ള സുഗന്ധവ്യഞ്ജന ജോടികളെ കണ്ടെത്തൂ!";
      } else if (level === 4) {
        vedaExp = "explaining";
        msg = "Match the Sanskrit names and classical texts like Charaka and Sushruta Samhita with each spice.";
        msgMl = "ചരക-സുശ്രുത സംഹിതകളിലെ സംസ്കൃത നാമങ്ങളും ഗുണങ്ങളും സുഗന്ധവ്യഞ്ജനങ്ങളുമായി പൊരുത്തപ്പെടുത്തൂ.";
      } else if (level === 5) {
        vedaExp = "curious";
        msg = "Assemble this traditional Kerala spice collection puzzle, then identify the hidden ingredients!";
        msgMl = "പരമ്പരാഗത സുഗന്ധവ്യഞ്ജന പാത്രങ്ങളുടെ പസിൽ പൂർത്തിയാക്കി അതിലെ ചേരുവകളെ കണ്ടെത്തൂ!";
      } else if (level === 6) {
        vedaExp = "celebrating";
        msg = "The Grand Challenge! Only a true Spice Master can conquer all 5 stages before the timer expires!";
        msgMl = "ഗ്രാൻഡ് സ്പൈസ് മാസ്റ്റർ പരീക്ഷണം! സമയം തീരുന്നതിന് മുൻപ് 5 ഘട്ടങ്ങളും പൂർത്തിയാക്കൂ!";
      }

      return {
        ...prev,
        currentView: "level",
        currentLevel: level,
        vedaDialog: {
          expression: vedaExp,
          message: msg,
          messageMl: msgMl,
          supportingText: "Take your time, read the clues, and touch your choices.",
          supportingTextMl: "സൂചനകൾ വായിച്ച് തൊട്ടു തിരഞ്ഞെടുക്കൂ."
        }
      };
    });
  }, []);

  const recordScoreIncrement = useCallback((points: number) => {
    setState((prev) => {
      const newScore = prev.totalScore + points;
      return {
        ...prev,
        totalScore: newScore,
        bestTotalScore: Math.max(newScore, prev.bestTotalScore),
        levels: {
          ...prev.levels,
          [prev.currentLevel]: {
            ...prev.levels[prev.currentLevel],
            score: prev.levels[prev.currentLevel].score + points,
            bestScore: Math.max(
              prev.levels[prev.currentLevel].bestScore,
              prev.levels[prev.currentLevel].score + points
            )
          }
        }
      };
    });
  }, []);

  const completeLevel = useCallback((level: LevelNumber, pointsEarned: number, timeSpent: number) => {
    SpiceAudio.playLevelComplete();

    setState((prev) => {
      const nextLevelNum = (level + 1) as LevelNumber;
      const updatedLevels = { ...prev.levels };

      // Update current level
      updatedLevels[level] = {
        ...updatedLevels[level],
        status: "completed",
        score: updatedLevels[level].score + pointsEarned,
        bestScore: Math.max(updatedLevels[level].bestScore, updatedLevels[level].score + pointsEarned),
        timeSpentSeconds: timeSpent,
        completedAt: new Date().toISOString()
      };

      // Unlock next level if exists
      if (nextLevelNum <= 6 && updatedLevels[nextLevelNum].status === "locked") {
        updatedLevels[nextLevelNum] = {
          ...updatedLevels[nextLevelNum],
          status: "unlocked"
        };
      }

      const newTotalScore = prev.totalScore + pointsEarned;

      // If completed level 6, go to final results
      if (level === 6) {
        return {
          ...prev,
          levels: updatedLevels,
          totalScore: newTotalScore,
          bestTotalScore: Math.max(newTotalScore, prev.bestTotalScore),
          currentView: "results",
          vedaDialog: {
            expression: "celebrating",
            message: "Spectacular Achievement! You have unlocked all Six Secrets and earned the title of Grand Spice Master!",
            messageMl: "അഭിനന്ദനങ്ങൾ! നിങ്ങൾ ആറ് ആയുർവേദ രഹസ്യങ്ങളും വെളിപ്പെടുത്തി ഗ്രാൻഡ് സ്പൈസ് മാസ്റ്റർ പദവി നേടിയിരിക്കുന്നു!"
          }
        };
      }

      return {
        ...prev,
        levels: updatedLevels,
        totalScore: newTotalScore,
        bestTotalScore: Math.max(newTotalScore, prev.bestTotalScore),
        vedaDialog: {
          expression: "celebrating",
          message: `Outstanding! Level ${level} complete! Ready for Level ${nextLevelNum}?`,
          messageMl: `മികച്ച വിജയം! ലെവൽ ${level} പൂർത്തിയായി! ലെവൽ ${nextLevelNum}-ലേക്ക് പോകാം?`
        }
      };
    });
  }, []);

  const setVedaDialog = useCallback((dialog: Partial<VedaDialogState>) => {
    setState((prev) => ({
      ...prev,
      vedaDialog: {
        ...prev.vedaDialog,
        ...dialog
      }
    }));
  }, []);

  const toggleMute = useCallback(() => {
    setState((prev) => {
      const nextMuted = !prev.isMuted;
      SpiceAudio.setMuted(nextMuted);
      return { ...prev, isMuted: nextMuted };
    });
  }, []);

  const setLanguage = useCallback((lang: "en" | "ml") => {
    setState((prev) => ({ ...prev, language: lang }));
  }, []);

  const resetGame = useCallback(() => {
    setState({
      currentView: "landing",
      currentLevel: 1,
      levels: INITIAL_LEVELS,
      totalScore: 0,
      bestTotalScore: 0,
      isMuted: false,
      language: "en",
      isKioskPortrait: false,
      gameStartTime: null,
      vedaDialog: INITIAL_VEDA_DIALOG
    });
    if (typeof window !== "undefined") {
      try {
        sessionStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
    }
  }, []);

  const isLevelCompleted = useCallback((level: LevelNumber) => {
    return state.levels[level]?.status === "completed";
  }, [state.levels]);

  const isLevelUnlocked = useCallback((level: LevelNumber) => {
    const s = state.levels[level]?.status;
    return s === "unlocked" || s === "completed" || s === "current";
  }, [state.levels]);

  return (
    <SpiceQuestContext.Provider
      value={{
        state,
        setView,
        startLevel,
        completeLevel,
        recordScoreIncrement,
        setVedaDialog,
        toggleMute,
        setLanguage,
        resetGame,
        isLevelCompleted,
        isLevelUnlocked
      }}
    >
      {children}
    </SpiceQuestContext.Provider>
  );
}

export function useSpiceQuest() {
  const context = useContext(SpiceQuestContext);
  if (!context) {
    throw new Error("useSpiceQuest must be used within a SpiceQuestProvider");
  }
  return context;
}

