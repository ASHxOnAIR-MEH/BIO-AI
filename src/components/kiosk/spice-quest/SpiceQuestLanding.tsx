"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Hand,
  Compass,
  Trophy,
  CheckCircle2,
  Lock,
  ChevronRight
} from "lucide-react";
import { useSpiceQuest } from "./SpiceQuestContext";
import { SPICE_QUEST_LEVELS } from "@/data/spiceQuestData";

export default function SpiceQuestLanding() {
  const { state, setView, startLevel } = useSpiceQuest();
  const isMl = state.language === "ml";

  // Calculate completed levels count
  const completedCount = Object.values(state.levels).filter((l) => l.status === "completed").length;

  return (
    <div className="w-full flex-1 flex flex-col justify-between py-4 sm:py-6 px-3 sm:px-6 max-w-6xl mx-auto">
      {/* ─── 1. HERO TITLE & VEDA WELCOME BANNER ───────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full bg-gradient-to-br from-[#072820] via-[#0A382C] to-[#041D16] rounded-3xl p-5 sm:p-8 border-2 border-[#D4AF37]/50 shadow-2xl relative overflow-hidden text-[#FAF7EE]"
      >
        {/* Decorative Golden Ambient Orbs */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#10B981]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-6 sm:gap-8">
          {/* VEDA Welcome Avatar (veda-welcome.png) */}
          <div className="relative shrink-0 flex flex-col items-center">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-40 h-52 sm:w-48 sm:h-64 rounded-3xl bg-gradient-to-b from-[#F0F7F1]/20 via-[#FAF7EE]/10 to-transparent border-2 border-[#D4AF37]/40 p-2 flex items-end justify-center shadow-xl backdrop-blur-xs"
            >
              <Image
                src="/images/veda/veda-welcome.png"
                alt="Veda Welcome Character"
                width={200}
                height={260}
                className="object-contain max-h-full drop-shadow-2xl select-none pointer-events-none"
                priority
              />
            </motion.div>

            <span className="mt-2 px-3 py-0.5 rounded-full bg-[#D4AF37] text-[#072820] text-xs font-black uppercase tracking-wider shadow-sm">
              VEDA • {isMl ? "ഗവേഷണ ഗൈഡ്" : "Research Guide"}
            </span>
          </div>

          {/* Title & Introduction Text */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#F4DE97] text-xs font-bold uppercase tracking-wider mb-2 sm:mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>{isMl ? "ഇന്ററാക്ടീവ് പസിൽ ഗെയിം" : "Interactive Puzzle Game"}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight text-white mb-2 leading-tight">
              SPICE QUEST
            </h1>
            <p className="text-base sm:text-lg lg:text-xl font-serif text-[#D4AF37] font-semibold mb-3">
              {isMl ? "ആയുർവേദത്തിലെ ആറ് രഹസ്യങ്ങൾ" : "The Six Secrets of Ayurveda"}
            </p>

            <div className="bg-white/10 rounded-2xl p-4 border border-white/15 backdrop-blur-xs mb-5 max-w-2xl">
              <p className="text-xs sm:text-sm text-[#FAF7EE]/95 leading-relaxed">
                &ldquo;
                {isMl
                  ? "സുഗന്ധ തോട്ടത്തിലേക്ക് സ്വാഗതം! ആറ് ആവേശകരമായ വെല്ലുവിളികളിലൂടെ പരമ്പരാഗത സുഗന്ധവ്യഞ്ജനങ്ങളെ പരിചയപ്പെടൂ. നിഗൂഢ ചേരുവകളെ തിരിച്ചറിയുക, അവയുടെ സസ്യശാസ്ത്രപരമായ സ്വഭാവം പരിശോധിക്കുക, പുരാതന ആയുർവേദ രഹസ്യങ്ങൾ സ്വന്തമാക്കുക."
                  : "Welcome to the Spice Garden! Discover the world of traditional spices through six exciting challenges. Identify mysterious ingredients, explore their botanical identities and unlock the secrets of Ayurvedic knowledge."}
                &rdquo;
              </p>
            </div>

            {/* START THE ADVENTURE Button */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <button
                type="button"
                onClick={() => setView("selector")}
                className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#D4AF37] hover:brightness-110 active:scale-95 text-[#072820] font-black text-sm sm:text-base tracking-wide shadow-[0_10px_25px_rgba(212,175,55,0.4)] flex items-center gap-2.5 transition-all touch-manipulation cursor-pointer group"
              >
                <span>{isMl ? "യാത്ര ആരംഭിക്കൂ" : "START THE ADVENTURE"}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Progress Summary Pill */}
              <div className="flex items-center gap-2 px-4 py-3 rounded-full bg-white/10 border border-white/15 text-xs text-white/90">
                <Trophy className="w-4 h-4 text-[#D4AF37]" />
                <span>
                  {isMl ? "പുരോഗതി: " : "Progress: "}
                  <strong className="text-[#D4AF37] font-bold">{completedCount}/6</strong>{" "}
                  {isMl ? "ലെവലുകൾ" : "Levels"}
                </span>
                {state.bestTotalScore > 0 && (
                  <span className="ml-2 pl-2 border-l border-white/20 text-[#F4DE97]">
                    {isMl ? "മികച്ച സ്കോർ: " : "Best Score: "}
                    <strong>{state.bestTotalScore}</strong>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ─── 2. SIX PROGRESSIVE LEVELS PREVIEW CARDS ───────────────────────────── */}
      <div className="my-6">
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-sm sm:text-base font-bold text-[#072820] uppercase tracking-wider flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#0B5D46]" />
            <span>{isMl ? "ആറ് വെല്ലുവിളികളുടെ ക്രമം" : "The Six Progressive Challenges"}</span>
          </h2>
          <span className="text-xs text-[#244B3F]/75 font-semibold">
            {isMl ? "ലളിതം മുതൽ അതികഠിനം വരെ" : "Progressive Difficulty"}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
          {SPICE_QUEST_LEVELS.map((lvl) => {
            const prog = state.levels[lvl.levelNumber];
            const isCompleted = prog.status === "completed";
            const isUnlocked = prog.status === "unlocked" || isCompleted;

            return (
              <div
                key={lvl.levelNumber}
                onClick={() => isUnlocked && startLevel(lvl.levelNumber)}
                className={`rounded-2xl p-3 sm:p-3.5 border transition-all duration-300 flex flex-col justify-between select-none ${
                  isUnlocked ? "cursor-pointer hover:shadow-lg active:scale-98" : "cursor-not-allowed opacity-75"
                } ${
                  isCompleted
                    ? "bg-[#F0FDF4] border-[#10B981] shadow-xs"
                    : isUnlocked
                    ? "bg-white border-[#D4AF37]/50 shadow-xs hover:border-[#D4AF37]"
                    : "bg-gray-100/80 border-gray-200"
                }`}
              >
                <div>
                  {/* Top Level # and Status Indicator */}
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white"
                      style={{ backgroundColor: lvl.difficultyColor }}
                    >
                      {lvl.levelNumber}
                    </span>
                    {isCompleted ? (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Done</span>
                      </span>
                    ) : isUnlocked ? (
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                        Ready
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">
                        <Lock className="w-2.5 h-2.5" />
                        <span>Lock</span>
                      </span>
                    )}
                  </div>

                  {/* Level Subtitle / Name */}
                  <h3 className="text-xs sm:text-sm font-bold text-[#072820] line-clamp-1 leading-snug">
                    {isMl ? lvl.titleMl.split(":")[1] || lvl.titleMl : lvl.title.split(":")[1] || lvl.title}
                  </h3>

                  {/* Difficulty Tag */}
                  <span
                    className="inline-block mt-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md"
                    style={{
                      backgroundColor: `${lvl.difficultyColor}18`,
                      color: lvl.difficultyColor,
                    }}
                  >
                    {isMl ? lvl.difficultyMl : lvl.difficulty}
                  </span>
                </div>

                <p className="mt-2 text-[10px] sm:text-[11px] text-[#244B3F]/75 line-clamp-2 leading-tight">
                  {isMl ? lvl.subtitleMl : lvl.subtitle}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── 3. TOUCH & DRAG INSTRUCTIONS / KIOSK GUIDE ────────────────────────── */}
      <div className="bg-[#FAF7EE] border border-[#D4AF37]/40 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#072820]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0B5D46] text-[#D4AF37] flex items-center justify-center shrink-0">
            <Hand className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-[#072820]">
              {isMl ? "ടച്ച്സ്ക്രീൻ നിർദ്ദേശങ്ങൾ" : "Kiosk Touch & Drag Guide"}
            </h4>
            <p className="text-[11px] sm:text-xs text-[#244B3F]/85">
              {isMl
                ? "കാർഡുകൾ ഡ്രാഗ് ചെയ്യുകയോ തൊട്ടു തിരഞ്ഞെടുക്കുകയോ ചെയ്യാം. അതിഥി രജിസ്ട്രേഷൻ ആവശ്യമില്ല."
                : "You can drag puzzle items with your finger or simply tap cards to connect. No registration required."}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setView("selector")}
          className="shrink-0 px-5 py-2.5 rounded-full bg-[#0B5D46] hover:bg-[#073B30] text-white text-xs sm:text-sm font-bold flex items-center gap-2 active:scale-95 transition-all touch-manipulation cursor-pointer"
        >
          <span>{isMl ? "ലെവൽ മാപ്പ് കാണുക" : "View Level Map"}</span>
          <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
        </button>
      </div>
    </div>
  );
}
