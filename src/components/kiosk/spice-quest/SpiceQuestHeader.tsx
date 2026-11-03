"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Volume2, VolumeX, Sparkles, Home } from "lucide-react";
import { useSpiceQuest } from "./SpiceQuestContext";
import { SPICE_QUEST_LEVELS } from "@/data/spiceQuestData";

export default function SpiceQuestHeader() {
  const { state, setView, toggleMute, setLanguage, startLevel } = useSpiceQuest();
  const isMl = state.language === "ml";

  const handleBack = () => {
    if (state.currentView === "level") {
      setView("selector");
    } else if (state.currentView === "results") {
      setView("selector");
    } else if (state.currentView === "selector") {
      setView("landing");
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#072820]/95 backdrop-blur-md border-b border-[#D4AF37]/30 text-[#FAF7EE] shadow-lg">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3.5 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Back / Exit Navigation */}
        <div className="flex items-center gap-2">
          {state.currentView !== "landing" ? (
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-xs font-bold text-[#F4DE97] border border-[#D4AF37]/30 transition-all touch-manipulation cursor-pointer"
              title={isMl ? "തിരികെ പോകുക" : "Go Back"}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">
                {state.currentView === "level"
                  ? isMl
                    ? "ലെവലുകൾ"
                    : "Level Map"
                  : isMl
                  ? "മുഖപ്പ്"
                  : "Overview"}
              </span>
            </button>
          ) : (
            <Link
              href="/kiosk/vedaverse"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-xs font-bold text-[#F4DE97] border border-[#D4AF37]/30 transition-all touch-manipulation cursor-pointer"
              title="Return to VedaVerse Catalog"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{isMl ? "വേദവേഴ്സ്" : "VedaVerse"}</span>
            </Link>
          )}

          {/* Home Link to VedaVerse always accessible */}
          <Link
            href="/kiosk/vedaverse"
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/15 text-[#D4AF37] transition-all"
            title="VedaVerse Catalog"
          >
            <Home className="w-4 h-4" />
          </Link>

          {/* Title Branding */}
          <div className="hidden xl:flex flex-col ml-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[#D4AF37] font-black text-xs uppercase tracking-wider">
                Spice Quest
              </span>
              <span className="text-white/40 text-[10px]">•</span>
              <span className="text-white/80 text-[11px] font-serif italic">
                {isMl ? "ആയുർവേദത്തിലെ ആറ് രഹസ്യങ്ങൾ" : "The Six Secrets of Ayurveda"}
              </span>
            </div>
          </div>
        </div>

        {/* Center: 6 Level Indicators */}
        <div className="kiosk-level-nav flex flex-wrap items-center justify-center gap-2">
          {SPICE_QUEST_LEVELS.map((lvl) => {
            const progress = state.levels[lvl.levelNumber];
            const isCompleted = progress.status === "completed";
            const isCurrent = state.currentView === "level" && state.currentLevel === lvl.levelNumber;
            const isUnlocked = progress.status === "unlocked" || isCompleted;

            return (
              <button
                key={lvl.levelNumber}
                type="button"
                onClick={() => isUnlocked && startLevel(lvl.levelNumber)}
                disabled={!isUnlocked}
                className={`relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full text-xs font-black transition-all touch-manipulation cursor-pointer ${
                  isCurrent
                    ? "bg-[#D4AF37] text-[#072820] shadow-[0_0_12px_#D4AF37] scale-110 ring-2 ring-white"
                    : isCompleted
                    ? "bg-[#10B981] text-white hover:bg-[#059669]"
                    : isUnlocked
                    ? "bg-white/20 text-white hover:bg-white/30"
                    : "bg-white/5 text-white/30 cursor-not-allowed"
                }`}
                title={`${lvl.title} (${lvl.difficulty})`}
              >
                <span>{lvl.levelNumber}</span>
                {isCompleted && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#D4AF37] ring-1 ring-[#072820]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right: Score, Language & Audio Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Total Score Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
            <div className="flex flex-col text-right">
              <span className="text-[9px] uppercase tracking-wider text-[#F4DE97] font-bold leading-none">
                {isMl ? "സ്കോർ" : "Score"}
              </span>
              <span className="text-xs sm:text-sm font-black text-white leading-tight">
                {state.totalScore}
              </span>
            </div>
          </div>

          {/* Bilingual Toggle */}
          <button
            type="button"
            onClick={() => setLanguage(isMl ? "en" : "ml")}
            className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-xs font-bold text-[#F4DE97] border border-[#D4AF37]/30 transition-all touch-manipulation cursor-pointer"
            title={isMl ? "Switch to English" : "മലയാളത്തിലേക്ക് മാറ്റുക"}
          >
            {isMl ? "EN" : "മല"}
          </button>

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={toggleMute}
            className={`p-2 rounded-full border transition-all touch-manipulation cursor-pointer ${
              state.isMuted
                ? "bg-red-500/20 text-red-300 border-red-500/40"
                : "bg-white/10 text-[#D4AF37] hover:bg-white/20 border-[#D4AF37]/30"
            }`}
            title={state.isMuted ? "Unmute Audio" : "Mute Audio"}
            aria-label="Sound Toggle"
          >
            {state.isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}
