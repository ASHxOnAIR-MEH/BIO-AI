"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  BookOpen,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Info,
  Scroll
} from "lucide-react";
import { useSpiceQuest } from "../SpiceQuestContext";
import { LEVEL_4_MATCHES, Level4AyurvedaMatch } from "@/data/spiceQuestData";
import { SpiceAudio } from "../SpiceAudio";
import VedaGameGuide from "../VedaGameGuide";

export default function Level4AyurvedaKnowledgeMatch() {
  const { state, completeLevel, recordScoreIncrement, setView } = useSpiceQuest();
  const isMl = state.language === "ml";

  // Selected classical manuscript card waiting for spice match
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
  // Completed matches map: matchId -> matched boolean
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  // Current active explanation dialog
  const [activeExplanation, setActiveExplanation] = useState<Level4AyurvedaMatch | null>(null);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    startTimeRef.current = Date.now();
  }, []);

  const totalMatches = LEVEL_4_MATCHES.length;
  const isAllMatched = matchedIds.length === totalMatches;

  const handleParchmentClick = (item: Level4AyurvedaMatch) => {
    if (matchedIds.includes(item.id)) return; // already solved
    setSelectedMatchId(item.id === selectedMatchId ? null : item.id);
    setErrorNotice(null);
    SpiceAudio.playCardFlip();
  };

  const handleSpiceTargetClick = (targetItem: Level4AyurvedaMatch) => {
    if (!selectedMatchId) return;

    if (selectedMatchId === targetItem.id) {
      // MATCH!
      SpiceAudio.playCorrect();
      recordScoreIncrement(15);
      setMatchedIds((prev) => [...prev, targetItem.id]);
      setActiveExplanation(targetItem);
      setSelectedMatchId(null);
      setErrorNotice(null);
    } else {
      // Wrong match
      SpiceAudio.playIncorrect();
      const selectedObj = LEVEL_4_MATCHES.find((m) => m.id === selectedMatchId);
      setErrorNotice(
        isMl
          ? `പൊരുത്തം ശരിയല്ല! "${selectedObj?.sanskritName}" എന്നത് ${targetItem.commonName}-ന് ബാധകമല്ല.`
          : `Not a match! "${selectedObj?.sanskritName}" does not correspond to ${targetItem.commonName}.`
      );
      setTimeout(() => setErrorNotice(null), 3000);
    }
  };

  const handleFinishLevel = () => {
    const timeSpent = startTimeRef.current
      ? Math.round((Date.now() - startTimeRef.current) / 1000)
      : 20;
    completeLevel(4, 30, timeSpent);
    setView("selector");
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-3 sm:py-6 px-3 sm:px-6 flex flex-col gap-4 sm:gap-6">
      {/* ─── 1. LEVEL HEADER & SOURCE DISCLAIMER ───────────────────────────────── */}
      <div className="flex items-center justify-between bg-white rounded-2xl p-3 sm:p-4 border-2 border-[#0B5D46]/15 shadow-xs">
        <div>
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#F59E0B] bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
            {isMl ? "ലെവൽ 4 • ഇടത്തരം കാഠിന്യം" : "Level 4 • Medium–Hard"}
          </span>
          <h2 className="text-base sm:text-xl font-black text-[#072820] mt-0.5">
            {isMl ? "ആയുർവേദ ജ്ഞാന പൊരുത്തം" : "Ayurveda Knowledge Match"}
          </h2>
        </div>

        {/* Counter Badge */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-500">
            {isMl ? "പൊരുത്തം: " : "Matched: "}
            <strong className="text-[#0B5D46]">{matchedIds.length}</strong> / {totalMatches}
          </span>
          <div className="w-24 h-2.5 rounded-full bg-gray-100 overflow-hidden border border-gray-200">
            <div
              className="h-full bg-gradient-to-r from-[#D4AF37] to-[#10B981] transition-all duration-300"
              style={{ width: `${(matchedIds.length / totalMatches) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* ─── 2. VEDA COMPANION MESSAGE ────────────────────────────────────────── */}
      <VedaGameGuide
        overrideExpression={
          isAllMatched
            ? "celebrating"
            : activeExplanation
            ? "happy"
            : errorNotice
            ? "concerned"
            : selectedMatchId
            ? "thinking"
            : "explaining"
        }
        overrideMessage={
          isAllMatched
            ? "Incredible scholarship! You matched all classical codices and Sanskrit terms perfectly!"
            : activeExplanation
            ? `${activeExplanation.sanskritName} → ${activeExplanation.commonName}. Verified in ${activeExplanation.classicalSource}.`
            : errorNotice ||
              "Select an ancient manuscript card on the left, then touch its corresponding Kerala spice on the right!"
        }
        overrideMessageMl={
          isAllMatched
            ? "അത്യുജ്ജ്വലമായ പാണ്ഡിത്യം! ആയുർവേദ ഗ്രന്ഥങ്ങളിലെ സംസ്കൃത പദങ്ങളെല്ലാം കൃത്യമായി പൊരുത്തപ്പെടുത്തി!"
            : activeExplanation
            ? `${activeExplanation.sanskritName} → ${activeExplanation.commonName}. ${activeExplanation.classicalSource}-ൽ രേഖപ്പെടുത്തിയത്.`
            : errorNotice ||
              "ഇടതുവശത്തെ താളിയോല കാർഡിൽ തൊടുക, ശേഷം വലതുവശത്തെ അനുയോജ്യമായ സുഗന്ധവ്യഞ്ജനത്തിൽ തൊട്ടു പൊരുത്തപ്പെടുത്തുക!"
        }
      />

      {/* ─── 3. DUAL WORKBENCH: PARCHMENT CARDS (LEFT) & SPICE TARGETS (RIGHT) ─── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
        {/* Left Column: 6 Ancient Manuscript Parchment Cards (6 cols) */}
        <div className="md:col-span-6 flex flex-col gap-2.5">
          <h3 className="text-xs font-bold text-[#072820] uppercase tracking-wider px-1 flex items-center gap-1.5">
            <Scroll className="w-4 h-4 text-[#D4AF37]" />
            <span>{isMl ? "1. താളിയോല രേഖകൾ (തിരഞ്ഞെടുക്കൂ)" : "1. Classical Sanskrit Records"}</span>
          </h3>

          <div className="flex flex-col gap-2.5">
            {LEVEL_4_MATCHES.map((item) => {
              const isMatched = matchedIds.includes(item.id);
              const isSelected = selectedMatchId === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => handleParchmentClick(item)}
                  className={`p-3.5 sm:p-4 rounded-2xl border-2 transition-all select-none cursor-pointer flex flex-col justify-between ${
                    isMatched
                      ? "bg-emerald-50/70 border-emerald-300 opacity-75 cursor-default"
                      : isSelected
                      ? "bg-[#FFFDF7] border-[#D4AF37] ring-4 ring-[#D4AF37]/30 scale-[1.01] shadow-md"
                      : "bg-[#FBF8EE] border-[#D4AF37]/40 hover:border-[#D4AF37] hover:bg-white shadow-xs active:scale-99"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      {/* Sanskrit Name in Devanagari & Transliteration */}
                      <h4 className="text-sm sm:text-base font-bold text-[#072820] font-serif">
                        {item.sanskritName}
                      </h4>
                      <p className="text-[11px] text-[#244B3F]/85 italic mt-0.5">
                        &ldquo;{item.sanskritMeaning}&rdquo;
                      </p>
                    </div>

                    {isMatched ? (
                      <span className="shrink-0 flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{item.commonName}</span>
                      </span>
                    ) : (
                      <span className="shrink-0 text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md border border-amber-300">
                        {item.classicalConcept}
                      </span>
                    )}
                  </div>

                  {/* Classical Source Citation */}
                  <div className="mt-2 pt-2 border-t border-[#D4AF37]/20 flex items-center justify-between text-[10px] text-gray-600">
                    <span className="font-semibold text-[#0B5D46]">{item.classicalSource}</span>
                    <span className="italic">{item.fullQuote}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: 6 Spice Display Targets (6 cols) */}
        <div className="md:col-span-6 flex flex-col gap-2.5">
          <h3 className="text-xs font-bold text-[#072820] uppercase tracking-wider px-1 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#0B5D46]" />
            <span>{isMl ? "2. സുഗന്ധവ്യഞ്ജനങ്ങളുമായി പൊരുത്തപ്പെടുത്തൂ" : "2. Kerala Spice Targets"}</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {LEVEL_4_MATCHES.map((target) => {
              const isMatched = matchedIds.includes(target.id);

              return (
                <div
                  key={target.id}
                  onClick={() => handleSpiceTargetClick(target)}
                  className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-between text-center transition-all select-none ${
                    isMatched
                      ? "bg-emerald-50/70 border-emerald-300 cursor-default"
                      : selectedMatchId
                      ? "bg-white border-[#D4AF37] hover:bg-[#D4AF37]/15 cursor-pointer shadow-sm hover:scale-[1.02] ring-2 ring-[#D4AF37]/25"
                      : "bg-white border-gray-200 cursor-pointer shadow-xs"
                  }`}
                >
                  {/* Photo */}
                  <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-2 bg-[#072820]">
                    <Image
                      src={target.image}
                      alt={target.commonName}
                      fill
                      className="object-cover"
                      sizes="140px"
                    />
                    {isMatched && (
                      <div className="absolute inset-0 bg-emerald-900/40 backdrop-blur-xs flex items-center justify-center">
                        <CheckCircle2 className="w-7 h-7 text-white drop-shadow-md" />
                      </div>
                    )}
                  </div>

                  {/* Name Voucher */}
                  <span className="text-xs font-bold text-[#072820] leading-tight">
                    {isMl ? target.commonNameMl : target.commonName}
                  </span>
                  <span className="text-[10px] text-gray-500 italic block mt-0.5 truncate w-full">
                    {target.botanicalName}
                  </span>

                  {isMatched && (
                    <span className="mt-1 text-[9px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                      ✓ {target.sanskritName.split(" ")[0]}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Educational Monograph Reveal Modal / Card */}
          {activeExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 p-3.5 bg-amber-50/90 rounded-2xl border border-amber-300 text-xs text-amber-950 shadow-xs"
            >
              <div className="flex items-center gap-1.5 font-bold text-[#072820] mb-1">
                <BookOpen className="w-4 h-4 text-[#B45309]" />
                <span>
                  {activeExplanation.sanskritName} • {activeExplanation.commonName} ({activeExplanation.botanicalName})
                </span>
              </div>
              <p className="leading-relaxed text-[11px] text-gray-700">
                {activeExplanation.educationalNote}
              </p>
              <p className="mt-1 text-[10px] font-semibold text-[#0B5D46]">
                Citation: {activeExplanation.classicalSource}
              </p>
            </motion.div>
          )}

          {/* Educational Disclaimer */}
          <div className="mt-2 p-2 rounded-xl bg-gray-50 border border-gray-200 text-[10px] text-gray-500 leading-normal flex items-start gap-1.5">
            <Info className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
            <span>
              {isMl
                ? "വിദ്യാഭ്യാസ ആവശ്യങ്ങൾക്ക് മാത്രം. പ്രാചീന ഗ്രന്ഥങ്ങളിലെ പദാവലിയും പാരമ്പര്യ വർഗ്ഗീകരണങ്ങളും പഠിക്കാനാണ് ഇത് നൽകിയിരിക്കുന്നത്."
                : "Source-grounded traditional terminology only. For educational study of classical Ayurvedic literature. No medical diagnosis or treatment claims."}
            </span>
          </div>

          {/* Finish Level Button */}
          {isAllMatched && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              type="button"
              onClick={handleFinishLevel}
              className="mt-2 w-full py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-[#072820] font-black text-sm flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all touch-manipulation cursor-pointer"
            >
              <span>{isMl ? "ലെവൽ 4 പൂർത്തിയാക്കൂ (+30 ബോണസ്)" : "Complete Level 4 (+30 Bonus)"}</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}
