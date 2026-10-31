"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Lock,
  CheckCircle2,
  Play,
  RotateCcw,
  Award,
  Clock,
  Compass,
  ArrowRight
} from "lucide-react";
import { useSpiceQuest } from "./SpiceQuestContext";
import { SPICE_QUEST_LEVELS } from "@/data/spiceQuestData";
import VedaGameGuide from "./VedaGameGuide";

export default function SpiceQuestLevelSelector() {
  const { state, startLevel, setView, resetGame } = useSpiceQuest();
  const isMl = state.language === "ml";

  const completedCount = Object.values(state.levels).filter((l) => l.status === "completed").length;

  return (
    <div className="w-full flex-1 flex flex-col py-4 sm:py-6 px-3 sm:px-6 max-w-6xl mx-auto">
      {/* ─── 1. TOP HEADER & VEDA COMPANION ───────────────────────────────────── */}
      <div className="mb-4 sm:mb-6">
        <VedaGameGuide
          overrideExpression={completedCount === 6 ? "celebrating" : "welcome"}
          overrideMessage={
            completedCount === 6
              ? "Magnificent! You have conquered all 6 levels! You can replay any level or view your Grand Master Achievement."
              : completedCount === 0
              ? "Welcome to Level Select! Start with Level 1: The Spice Detective to begin your journey."
              : `Great work! You have unlocked Level ${completedCount + 1}. Continue your quest to discover all Six Secrets!`
          }
          overrideMessageMl={
            completedCount === 6
              ? "ഗംഭീരം! നിങ്ങൾ 6 ലെവലുകളും വിജയകരമായി പൂർത്തിയാക്കി! ഏതൊരു ലെവലും വീണ്ടും കളിക്കാം അല്ലെങ്കിൽ അന്തിമ സർട്ടിഫിക്കറ്റ് പരിശോധിക്കാം."
              : completedCount === 0
              ? "ലെവൽ തിരഞ്ഞെടുപ്പിലേക്ക് സ്വാഗതം! നിങ്ങളുടെ യാത്ര ആരംഭിക്കാൻ ലെവൽ 1 തിരഞ്ഞെടുക്കൂ."
              : `നന്നായിരിക്കുന്നു! നിങ്ങൾ ലെവൽ ${completedCount + 1} അൺലോക്ക് ചെയ്തു. ആറ് രഹസ്യങ്ങളും വെളിപ്പെടുത്താൻ മുന്നോട്ട് പോകൂ!`
          }
        />
      </div>

      {/* ─── 2. PROGRESS BANNER ──────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-[#0B5D46]/15 shadow-sm mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0B5D46] to-[#072820] text-[#D4AF37] flex items-center justify-center shrink-0 shadow-sm">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-[#072820] leading-tight">
              {isMl ? "ആയുർവേദ അന്വേഷണ പാത" : "Ayurvedic Quest Map"}
            </h2>
            <p className="text-xs text-[#244B3F]/80">
              {isMl
                ? "അടുത്ത ഘട്ടങ്ങൾ അൺലോക്ക് ചെയ്യാൻ ഓരോ വെല്ലുവിളിയും പൂർത്തിയാക്കുക"
                : "Complete each challenge to unlock subsequent Ayurvedic secrets"}
            </p>
          </div>
        </div>

        {/* Progress Bar & Counters */}
        <div className="w-full sm:w-auto flex items-center gap-4">
          <div className="flex-1 sm:w-48">
            <div className="flex items-center justify-between text-xs font-bold text-[#072820] mb-1">
              <span>{isMl ? "പൂർത്തിയായത്" : "Completed"}</span>
              <span className="text-[#0B5D46]">{completedCount} / 6</span>
            </div>
            <div className="w-full h-3 rounded-full bg-gray-100 overflow-hidden border border-gray-200">
              <div
                className="h-full bg-gradient-to-r from-[#10B981] via-[#059669] to-[#D4AF37] transition-all duration-500 rounded-full"
                style={{ width: `${(completedCount / 6) * 100}%` }}
              />
            </div>
          </div>

          {completedCount === 6 && (
            <button
              type="button"
              onClick={() => setView("results")}
              className="px-4 py-2 rounded-full bg-[#D4AF37] hover:bg-[#F59E0B] text-[#072820] text-xs font-black flex items-center gap-1.5 shadow-sm active:scale-95 transition-all touch-manipulation cursor-pointer"
            >
              <Award className="w-4 h-4" />
              <span>{isMl ? "നേട്ടങ്ങൾ" : "Final Badge"}</span>
            </button>
          )}
        </div>
      </div>

      {/* ─── 3. SIX LEVEL INTERACTIVE CARDS GRID ──────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 flex-1">
        {SPICE_QUEST_LEVELS.map((lvl, index) => {
          const progress = state.levels[lvl.levelNumber];
          const isCompleted = progress.status === "completed";
          const isUnlocked = progress.status === "unlocked" || isCompleted;
          const isExpert = lvl.levelNumber === 6;

          return (
            <motion.div
              key={lvl.levelNumber}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              className="h-full"
            >
              <div
                onClick={() => isUnlocked && startLevel(lvl.levelNumber)}
                className={`relative h-full rounded-3xl p-5 sm:p-6 border-2 flex flex-col justify-between transition-all duration-300 select-none overflow-hidden ${
                  isUnlocked
                    ? "cursor-pointer active:scale-98 shadow-md hover:shadow-xl"
                    : "cursor-not-allowed opacity-70 bg-gray-50 border-gray-200"
                } ${
                  isExpert && isUnlocked
                    ? "bg-gradient-to-br from-[#072820] via-[#0B3A2C] to-[#041D16] border-[#D4AF37] text-white shadow-xl"
                    : isCompleted
                    ? "bg-[#FAFAF7] border-[#10B981]/50 hover:border-[#10B981]"
                    : isUnlocked
                    ? "bg-white border-[#D4AF37]/50 hover:border-[#D4AF37]"
                    : ""
                }`}
              >
                {/* Level 6 Special Golden Aura */}
                {isExpert && isUnlocked && (
                  <div className="absolute top-0 right-0 w-36 h-36 bg-[#D4AF37]/20 rounded-full blur-2xl pointer-events-none" />
                )}

                <div>
                  {/* Top Level Number & Status Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-8 h-8 rounded-full flex items-center justify-center font-black text-sm text-white shadow-xs"
                        style={{ backgroundColor: lvl.difficultyColor }}
                      >
                        {lvl.levelNumber}
                      </span>
                      <span
                        className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                          isExpert && isUnlocked
                            ? "bg-[#D4AF37] text-[#072820]"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {isMl ? lvl.difficultyMl : lvl.difficulty}
                      </span>
                    </div>

                    {/* Status Pill */}
                    {isCompleted ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{isMl ? "പൂർത്തിയായി" : "Completed"}</span>
                      </span>
                    ) : isUnlocked ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300 animate-pulse">
                        <Play className="w-3 h-3 fill-amber-800" />
                        <span>{isMl ? "തയ്യാറാണ്" : "Unlocked"}</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-bold text-gray-500 bg-gray-200 px-3 py-1 rounded-full">
                        <Lock className="w-3 h-3" />
                        <span>{isMl ? "പൂട്ടിയത്" : "Locked"}</span>
                      </span>
                    )}
                  </div>

                  {/* Title & Subtitle */}
                  <h3
                    className={`text-lg sm:text-xl font-bold tracking-tight mb-1 ${
                      isExpert && isUnlocked ? "text-[#FAF7EE] font-serif" : "text-[#072820]"
                    }`}
                  >
                    {isMl ? lvl.titleMl : lvl.title}
                  </h3>

                  <p
                    className={`text-xs font-semibold mb-3 ${
                      isExpert && isUnlocked ? "text-[#D4AF37]" : "text-[#55B96A]"
                    }`}
                  >
                    {isMl ? lvl.subtitleMl : lvl.subtitle}
                  </p>

                  <p
                    className={`text-xs leading-relaxed line-clamp-3 mb-4 ${
                      isExpert && isUnlocked ? "text-white/80" : "text-[#244B3F]/85"
                    }`}
                  >
                    {isMl ? lvl.descriptionMl : lvl.description}
                  </p>
                </div>

                {/* Bottom Card Footer: Score, Estimated Time & Action Button */}
                <div
                  className={`pt-3 border-t flex items-center justify-between gap-2 ${
                    isExpert && isUnlocked ? "border-white/15" : "border-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-3 text-[11px]">
                    <span
                      className={`flex items-center gap-1 ${
                        isExpert && isUnlocked ? "text-white/70" : "text-gray-500"
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>{lvl.estimatedTime}</span>
                    </span>

                    {progress.bestScore > 0 && (
                      <span
                        className={`font-bold ${
                          isExpert && isUnlocked ? "text-[#D4AF37]" : "text-[#0B5D46]"
                        }`}
                      >
                        +{progress.bestScore} pts
                      </span>
                    )}
                  </div>

                  {/* Interactive Button */}
                  {isUnlocked && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        startLevel(lvl.levelNumber);
                      }}
                      className={`px-4 py-2 rounded-full font-bold text-xs flex items-center gap-1.5 transition-all touch-manipulation cursor-pointer ${
                        isExpert
                          ? "bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-[#072820] shadow-md hover:brightness-110"
                          : isCompleted
                          ? "bg-gray-100 hover:bg-gray-200 text-[#072820]"
                          : "bg-[#0B5D46] hover:bg-[#073B30] text-white shadow-xs"
                      }`}
                    >
                      <span>
                        {isCompleted
                          ? isMl
                            ? "വീണ്ടും കളിക്കൂ"
                            : "Replay"
                          : isMl
                          ? "കളിക്കൂ"
                          : "Play"}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ─── 4. BOTTOM ACTION ROW ──────────────────────────────────────────────── */}
      <div className="mt-6 flex items-center justify-between text-xs text-gray-500 px-2">
        <button
          type="button"
          onClick={() => setView("landing")}
          className="text-[#0B5D46] font-bold hover:underline cursor-pointer"
        >
          ← {isMl ? "പ്രവേശന പേജിലേക്ക് മടങ്ങുക" : "Back to Introduction"}
        </button>

        <button
          type="button"
          onClick={() => {
            if (confirm(isMl ? "ഗെയിം പുനരാരംഭിക്കാൻ ആഗ്രഹിക്കുന്നുണ്ടോ?" : "Reset game progress?")) {
              resetGame();
            }
          }}
          className="flex items-center gap-1 text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{isMl ? "ഗെയിം റീസെറ്റ് ചെയ്യുക" : "Reset Progress"}</span>
        </button>
      </div>
    </div>
  );
}
