"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  HISTORICAL_DESTINATIONS,
  HistoricalDestination,
} from "@/data/ayurvedaHistoryData";
import {
  Sparkles,
  BookOpen,
  Award,
  ChevronRight,
  Flame,
  Feather,
  Compass,
  Layers,
  CheckCircle2,
  TreePine,
  ExternalLink,
} from "lucide-react";

interface HistoricalRoadmapProps {
  onSelectDestination: (dest: HistoricalDestination) => void;
  onOpenEightBranchesWheel: () => void;
  onOpenAshtavaidyaHeritage: () => void;
  completedDestinationIds: string[];
  isMalayalam?: boolean;
}

export default function HistoricalRoadmap({
  onSelectDestination,
  onOpenEightBranchesWheel,
  onOpenAshtavaidyaHeritage,
  completedDestinationIds,
  isMalayalam = false,
}: HistoricalRoadmapProps) {
  const [hoveredDestId, setHoveredDestId] = useState<string | null>(null);

  const getDestinationIcon = (order: number) => {
    switch (order) {
      case 1:
        return <Flame className="w-6 h-6 text-[#E6C665]" />;
      case 2:
        return <BookOpen className="w-6 h-6 text-[#E6C665]" />;
      case 3:
        return <Compass className="w-6 h-6 text-[#E6C665]" />;
      case 4:
        return <Layers className="w-6 h-6 text-[#E6C665]" />;
      case 5:
        return <TreePine className="w-6 h-6 text-[#E6C665]" />;
      case 6:
        return <Sparkles className="w-6 h-6 text-[#E6C665]" />;
      default:
        return <Feather className="w-6 h-6 text-[#E6C665]" />;
    }
  };

  return (
    <section
      id="historical-roadmap"
      className="relative w-full py-16 sm:py-24 px-4 sm:px-6 md:px-12 bg-[#FAF7EE] text-[#132E27] overflow-hidden"
    >
      {/* ─── BACKGROUND PARCHMENT MOTIF & SUBTLE GOLD LINES ─── */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#C5A028_0.8px,transparent_0.8px)] [background-size:20px_20px]" />
      <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-[#D4AF37]/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full bg-[#0B5D46]/10 blur-[100px] pointer-events-none" />

      {/* ─── SECTION HEADER ─── */}
      <div className="relative z-10 max-w-4xl mx-auto text-center mb-14 sm:mb-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#072820]/10 border border-[#0B5D46]/20 text-[#072820] text-xs font-bold tracking-wider uppercase mb-3">
          <Compass className="w-3.5 h-3.5 text-[#0B5D46]" />
          <span>{isMalayalam ? "ചരിത്ര നാൾവഴികൾ" : "Chronological Roadmap"}</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#072820] tracking-tight mb-4">
          {isMalayalam ? (
            <>
              ആയുർവേദത്തിന്റെ <span className="text-[#0B5D46]">യുഗങ്ങളിലൂടെയുള്ള പ്രയാണം</span>
            </>
          ) : (
            <>
              The Winding Pathway of <span className="text-[#0B5D46]">Classical Medicine</span>
            </>
          )}
        </h2>

        <p className="text-sm sm:text-base text-[#244B3F]/85 max-w-2xl mx-auto font-sans leading-relaxed">
          {isMalayalam
            ? "ഓരോ യുഗവും ഓരോ സവിശേഷ അധ്യായമാണ്. ലക്ഷ്യസ്ഥാനങ്ങളിൽ സ്പർശിച്ച് ദൃശ്യങ്ങളും, പ്രാചീന കൈയെഴുത്തുപ്രതികളും, വിജ്ഞാന ചലഞ്ചുകളും പരിശോധിക്കൂ."
            : "Each historical epoch is an interactive sanctuary. Touch any destination to reveal ancient learning environments, manuscript folios, and knowledge challenges."}
        </p>

        {/* Journey Progress Bar */}
        <div className="mt-6 inline-flex items-center gap-3 bg-white/80 border border-[#D4AF37]/40 px-5 py-2 rounded-full shadow-xs backdrop-blur-sm">
          <div className="flex items-center gap-1.5">
            <Award className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs font-bold text-[#072820]">
              {isMalayalam ? "പൂർത്തിയായവ:" : "Explored Epochs:"}
            </span>
          </div>
          <span className="text-xs font-mono font-bold text-[#0B5D46] bg-[#0B5D46]/10 px-2.5 py-0.5 rounded-full">
            {completedDestinationIds.length} / {HISTORICAL_DESTINATIONS.length}
          </span>
        </div>
      </div>

      {/* ─── WINDING HISTORICAL PATHWAY ─── */}
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Central Connecting Thread (Desktop/Tablet) */}
        <div className="hidden md:block absolute left-1/2 top-10 bottom-10 w-1 -translate-x-1/2 bg-gradient-to-b from-[#D4AF37] via-[#0B5D46] to-[#072820] opacity-40 rounded-full" />

        <div className="space-y-12 sm:space-y-16">
          {HISTORICAL_DESTINATIONS.map((dest, idx) => {
            const isEven = idx % 2 === 0;
            const isCompleted = completedDestinationIds.includes(dest.id);
            const isHovered = hoveredDestId === dest.id;

            return (
              <div
                key={dest.id}
                className={`relative flex flex-col md:flex-row items-center ${
                  isEven ? "md:flex-row-reverse" : ""
                } gap-6 md:gap-12`}
                onMouseEnter={() => setHoveredDestId(dest.id)}
                onMouseLeave={() => setHoveredDestId(null)}
              >
                {/* ─── DESKTOP CENTRAL TIMELINE NODE ─── */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-20 items-center justify-center">
                  <div
                    className={`w-12 h-12 rounded-full p-1 border-2 transition-all duration-300 ${
                      isCompleted
                        ? "bg-[#0B5D46] border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.6)]"
                        : isHovered
                        ? "bg-[#D4AF37] border-white shadow-[0_0_20px_rgba(212,175,55,0.7)] scale-110"
                        : "bg-[#072820] border-[#D4AF37]/50"
                    }`}
                  >
                    <div className="w-full h-full rounded-full flex items-center justify-center text-xs font-mono font-bold text-white">
                      {isCompleted ? <CheckCircle2 className="w-5 h-5 text-[#FAF7EE]" /> : `0${dest.order}`}
                    </div>
                  </div>
                </div>

                {/* ─── DESTINATION CARD (TOUCHABLE SURFACE) ─── */}
                <motion.div
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => onSelectDestination(dest)}
                  className={`w-full md:w-[calc(50%-2rem)] bg-white rounded-3xl p-6 sm:p-8 border-2 transition-all duration-300 cursor-pointer shadow-md hover:shadow-xl touch-manipulation relative group overflow-hidden ${
                    isCompleted
                      ? "border-[#55B96A] bg-gradient-to-br from-white via-white to-[#F0F7F1]"
                      : "border-[#0B5D46]/15 hover:border-[#D4AF37]"
                  }`}
                >
                  {/* Decorative Golden Corner Ribbon */}
                  <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden pointer-events-none">
                    <div className="absolute transform rotate-45 bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-[#072820] text-[9px] font-bold py-0.5 right-[-35px] top-[18px] w-[120px] text-center shadow-xs">
                      EPOCH 0{dest.order}
                    </div>
                  </div>

                  {/* Header Row: Badge & Era */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#072820] to-[#0B5D46] p-0.5 flex items-center justify-center shrink-0 shadow-sm">
                      {getDestinationIcon(dest.order)}
                    </div>

                    <div>
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0B5D46] bg-[#0B5D46]/10 px-2.5 py-0.5 rounded-full">
                        {dest.dateRange}
                      </span>
                      <p className="text-xs text-[#244B3F]/75 font-serif italic mt-0.5">
                        {dest.periodNameSanskrit}
                      </p>
                    </div>
                  </div>

                  {/* Period Name */}
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#072820] group-hover:text-[#0B5D46] transition-colors mb-2">
                    {isMalayalam ? dest.periodNameMl : dest.periodName}
                  </h3>

                  {/* Tagline */}
                  <p className="text-xs sm:text-sm font-semibold text-[#0B5D46] leading-snug mb-3">
                    {isMalayalam ? dest.taglineMl : dest.tagline}
                  </p>

                  {/* Short Summary */}
                  <p className="text-xs sm:text-sm text-[#244B3F]/85 leading-relaxed line-clamp-3 mb-5 font-sans">
                    {isMalayalam ? dest.summaryMl : dest.summary}
                  </p>

                  {/* Special Features & Shortcuts for Specific Epochs */}
                  {dest.id === "vagbhata-ashtanga" && (
                    <div className="mb-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-[#0B5D46]">
                        {isMalayalam ? "അഷ്ടാംഗ ചക്രം പര്യവേക്ഷണം ചെയ്യൂ" : "Special Feature: Eight-Branch Wheel"}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenEightBranchesWheel();
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0B5D46] text-white text-xs font-bold shadow-xs hover:bg-[#072820] active:scale-95 transition-all"
                      >
                        <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>{isMalayalam ? "ചക്രം തുറക്കൂ" : "Open Wheel"}</span>
                      </button>
                    </div>
                  )}

                  {dest.id === "regional-traditions" && (
                    <div className="mb-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-[#0B5D46]">
                        {isMalayalam ? "കേരള അഷ്ടവൈദ്യ പൈതൃകം" : "Special Deep Dive: Kerala Ashtavaidyas"}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenAshtavaidyaHeritage();
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#D4AF37] text-[#072820] text-xs font-bold shadow-xs hover:bg-[#C5A028] active:scale-95 transition-all"
                      >
                        <TreePine className="w-3.5 h-3.5 text-[#072820]" />
                        <span>{isMalayalam ? "പൈതൃകം കാണൂ" : "Explore Heritage"}</span>
                      </button>
                    </div>
                  )}

                  {/* Footer Row: Action CTA */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs font-bold">
                    <span className="text-[#0B5D46] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      <span>{isMalayalam ? "ഈ അധ്യായം കാണുക" : "Enter Historical Scene"}</span>
                      <ChevronRight className="w-4 h-4" />
                    </span>

                    {isCompleted ? (
                      <span className="inline-flex items-center gap-1 text-[#227744] bg-[#227744]/10 px-2.5 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{isMalayalam ? "പൂർത്തിയായി" : "Mastered"}</span>
                      </span>
                    ) : (
                      <span className="text-[#7A622A] font-mono text-[11px]">
                        {isMalayalam ? "വിജ്ഞാന ചലഞ്ച് ഉൾപ്പെടുന്നു" : "Quiz & Foliant Inside"}
                      </span>
                    )}
                  </div>
                </motion.div>

                {/* Empty Balancing Spacer for Desktop */}
                <div className="hidden md:block w-[calc(50%-2rem)]" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

