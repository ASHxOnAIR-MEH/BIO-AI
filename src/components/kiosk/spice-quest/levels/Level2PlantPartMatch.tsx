"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Layers, Sprout, Flower2, Cherry, Info } from "lucide-react";
import { useSpiceQuest } from "../SpiceQuestContext";
import { LEVEL_2_ITEMS, PLANT_PART_CATEGORIES, Level2Item, PlantPartCategory } from "@/data/spiceQuestData";
import { SpiceAudio } from "../SpiceAudio";
import VedaGameGuide from "../VedaGameGuide";

export default function Level2PlantPartMatch() {
  const { state, completeLevel, recordScoreIncrement, setView } = useSpiceQuest();
  const isMl = state.language === "ml";

  // Selected spice awaiting category tap (or dragged)
  const [selectedSpiceId, setSelectedSpiceId] = useState<string | null>(null);
  // Map of matched spiceId -> categoryId
  const [matchedSpices, setMatchedSpices] = useState<Record<string, string>>({});
  // Last matched item for botanical popup
  const [lastMatchedItem, setLastMatchedItem] = useState<Level2Item | null>(null);
  const [errorFeedback, setErrorFeedback] = useState<string | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    startTimeRef.current = Date.now();
  }, []);

  const totalItems = LEVEL_2_ITEMS.length;
  const matchedCount = Object.keys(matchedSpices).length;
  const isAllMatched = matchedCount === totalItems;

  const handleSpiceClick = (spiceId: string) => {
    if (matchedSpices[spiceId]) return; // already matched
    setSelectedSpiceId(spiceId === selectedSpiceId ? null : spiceId);
    setErrorFeedback(null);
    SpiceAudio.playCardFlip();
  };

  const handleCategoryClick = (category: PlantPartCategory) => {
    if (!selectedSpiceId) return;

    const currentSpice = LEVEL_2_ITEMS.find((s) => s.id === selectedSpiceId);
    if (!currentSpice) return;

    // Check if match is correct
    if (currentSpice.correctCategory === category.id) {
      // Correct!
      SpiceAudio.playCorrect();
      recordScoreIncrement(10);
      setMatchedSpices((prev) => ({ ...prev, [selectedSpiceId]: category.id }));
      setLastMatchedItem(currentSpice);
      setSelectedSpiceId(null);
      setErrorFeedback(null);
    } else {
      // Incorrect match
      SpiceAudio.playIncorrect();
      setErrorFeedback(
        isMl
          ? "തെറ്റായ ഭാഗമാണ്! വീണ്ടും സസ്യഭാഗം ശ്രദ്ധിച്ചു നോക്കൂ."
          : `Not quite! ${currentSpice.nameEn} does not come from the ${category.labelEn}.`
      );
      setTimeout(() => setErrorFeedback(null), 2500);
    }
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, spiceId: string) => {
    e.dataTransfer.setData("text/plain", spiceId);
    setSelectedSpiceId(spiceId);
  };

  const handleDrop = (e: React.DragEvent, categoryId: string) => {
    e.preventDefault();
    const spiceId = e.dataTransfer.getData("text/plain") || selectedSpiceId;
    if (!spiceId) return;

    const currentSpice = LEVEL_2_ITEMS.find((s) => s.id === spiceId);
    if (!currentSpice) return;

    if (currentSpice.correctCategory === categoryId) {
      SpiceAudio.playCorrect();
      recordScoreIncrement(10);
      setMatchedSpices((prev) => ({ ...prev, [spiceId]: categoryId }));
      setLastMatchedItem(currentSpice);
      setSelectedSpiceId(null);
      setErrorFeedback(null);
    } else {
      SpiceAudio.playIncorrect();
      setErrorFeedback(
        isMl
          ? "തെറ്റായ പൊരുത്തം! വീണ്ടും ശ്രമിക്കൂ."
          : `Try again! ${currentSpice.nameEn} doesn't belong to this category.`
      );
      setTimeout(() => setErrorFeedback(null), 2500);
    }
  };

  const handleFinishLevel = () => {
    const timeSpent = startTimeRef.current
      ? Math.round((Date.now() - startTimeRef.current) / 1000)
      : 15;
    completeLevel(2, 30, timeSpent);
    setView("selector");
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-3 sm:py-6 px-3 sm:px-6 flex flex-col gap-4 sm:gap-6">
      {/* ─── 1. LEVEL HEADER ──────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between bg-white rounded-2xl p-3 sm:p-4 border-2 border-[#0B5D46]/15 shadow-xs">
        <div>
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#34D399] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            {isMl ? "ലെവൽ 2 • എളുപ്പം" : "Level 2 • Easy"}
          </span>
          <h2 className="text-base sm:text-xl font-black text-[#072820] mt-0.5">
            {isMl ? "സസ്യ ഭാഗം കണ്ടെത്തൂ" : "Find the Plant Part"}
          </h2>
        </div>

        {/* Progress Badge */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-500">
            {isMl ? "പൊരുത്തം: " : "Matched: "}
            <strong className="text-[#0B5D46]">{matchedCount}</strong> / {totalItems}
          </span>
          <div className="w-24 h-2.5 rounded-full bg-gray-100 overflow-hidden border border-gray-200">
            <div
              className="h-full bg-[#10B981] transition-all duration-300"
              style={{ width: `${(matchedCount / totalItems) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* ─── 2. VEDA COMPANION MESSAGE ────────────────────────────────────────── */}
      <VedaGameGuide
        overrideExpression={
          isAllMatched
            ? "celebrating"
            : errorFeedback
            ? "concerned"
            : selectedSpiceId
            ? "thinking"
            : "explaining"
        }
        overrideMessage={
          isAllMatched
            ? "Marvelous! You mastered botanical morphology! Ready for the Memory Grid?"
            : errorFeedback || (selectedSpiceId
            ? `Selected: ${LEVEL_2_ITEMS.find((s) => s.id === selectedSpiceId)?.nameEn}. Now tap its correct plant part on the right!`
            : "Look carefully at the plant part. Is it an underground rhizome, bark, bud or fruit?")
        }
        overrideMessageMl={
          isAllMatched
            ? "അത്യുജ്ജ്വലം! സസ്യഭാഗങ്ങളെല്ലാം കൃത്യമായി പൊരുത്തപ്പെടുത്തി! അടുത്ത വെല്ലുവിളിക്ക് തയ്യാറാണോ?"
            : errorFeedback || (selectedSpiceId
            ? `${LEVEL_2_ITEMS.find((s) => s.id === selectedSpiceId)?.nameMl} തിരഞ്ഞെടുത്തു. വലതുവശത്തെ ശരിയായ സസ്യഭാഗത്തിൽ തൊടൂ!`
            : "സസ്യഭാഗം ശ്രദ്ധിച്ചു നോക്കൂ. ഇത് ഭൂകാണ്ഡമാണോ, തൊലിയാണോ, പൂമൊട്ടാണോ അതോ ഫലമാണോ?")
        }
      />

      {/* ─── 3. INTERACTIVE MATCHING WORKBENCH ─────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
        {/* Left Side: 6 Spice Cards (7 cols) */}
        <div className="md:col-span-7 flex flex-col gap-2.5">
          <h3 className="text-xs font-bold text-[#072820] uppercase tracking-wider px-1">
            {isMl ? "1. സുഗന്ധവ്യഞ്ജനം തിരഞ്ഞെടുക്കൂ" : "1. Select a Spice"}
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {LEVEL_2_ITEMS.map((spice) => {
              const isMatched = !!matchedSpices[spice.id];
              const isSelected = selectedSpiceId === spice.id;

              return (
                <div
                  key={spice.id}
                  draggable={!isMatched}
                  onDragStart={(e) => handleDragStart(e, spice.id)}
                  onClick={() => handleSpiceClick(spice.id)}
                  className={`relative rounded-2xl p-2.5 border-2 flex flex-col items-center justify-between text-center transition-all select-none ${
                    isMatched
                      ? "bg-emerald-50/70 border-emerald-300 opacity-80 cursor-default"
                      : isSelected
                      ? "bg-[#D4AF37]/25 border-[#D4AF37] ring-4 ring-[#D4AF37]/30 scale-102 cursor-pointer shadow-md"
                      : "bg-white border-gray-200 hover:border-[#D4AF37] cursor-pointer shadow-xs active:scale-98"
                  }`}
                >
                  {/* Photo */}
                  <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-2 bg-[#072820]">
                    <Image
                      src={spice.image}
                      alt={spice.nameEn}
                      fill
                      className="object-cover"
                      sizes="160px"
                    />
                    {isMatched && (
                      <div className="absolute inset-0 bg-emerald-900/40 backdrop-blur-xs flex items-center justify-center">
                        <CheckCircle2 className="w-8 h-8 text-white drop-shadow-md" />
                      </div>
                    )}
                  </div>

                  {/* Names */}
                  <span className="text-xs font-bold text-[#072820] block leading-tight">
                    {isMl ? spice.nameMl : spice.nameEn}
                  </span>
                  <span className="text-[10px] text-gray-500 italic block mt-0.5">
                    {spice.botanicalName}
                  </span>

                  {isMatched && (
                    <span className="mt-1 text-[9px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                      ✓ {PLANT_PART_CATEGORIES.find((c) => c.id === matchedSpices[spice.id])?.labelEn.split(" ")[0]}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: 4 Plant Part Categories (5 cols) */}
        <div className="md:col-span-5 flex flex-col gap-2.5">
          <h3 className="text-xs font-bold text-[#072820] uppercase tracking-wider px-1">
            {isMl ? "2. അനുയോജ്യമായ സസ്യഭാഗം" : "2. Target Plant Part (Tap or Drop)"}
          </h3>

          <div className="flex flex-col gap-2.5">
            {PLANT_PART_CATEGORIES.map((cat) => {
              // Count how many spices matched to this category
              const matchedCountForCat = Object.values(matchedSpices).filter((c) => c === cat.id).length;

              return (
                <div
                  key={cat.id}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDrop(e, cat.id)}
                  onClick={() => handleCategoryClick(cat)}
                  className={`p-3.5 sm:p-4 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 select-none ${
                    selectedSpiceId
                      ? "border-[#D4AF37] bg-[#FFFDF7] hover:bg-[#D4AF37]/15 cursor-pointer shadow-sm hover:scale-[1.01]"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0B5D46] text-[#D4AF37] flex items-center justify-center shrink-0">
                      {cat.id === "rhizome" && <Sprout className="w-5 h-5" />}
                      {cat.id === "bark" && <Layers className="w-5 h-5" />}
                      {cat.id === "flower_bud" && <Flower2 className="w-5 h-5" />}
                      {cat.id === "fruit" && <Cherry className="w-5 h-5" />}
                    </div>

                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#072820]">
                        {isMl ? cat.labelMl : cat.labelEn}
                      </h4>
                      <p className="text-[10px] text-gray-500 leading-tight">
                        {cat.description}
                      </p>
                    </div>
                  </div>

                  {matchedCountForCat > 0 && (
                    <span className="shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center border border-emerald-300">
                      {matchedCountForCat}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Last Matched Botanical Snippet */}
          {lastMatchedItem && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-2 p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2 shadow-xs"
            >
              <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">{lastMatchedItem.nameEn}: </span>
                <span>{lastMatchedItem.explanation}</span>
              </div>
            </motion.div>
          )}

          {/* Level Complete Button */}
          {isAllMatched && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              type="button"
              onClick={handleFinishLevel}
              className="mt-3 w-full py-3.5 rounded-full bg-gradient-to-r from-[#10B981] to-[#059669] text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all touch-manipulation cursor-pointer"
            >
              <span>{isMl ? "ലെവൽ 2 പൂർത്തിയാക്കൂ (+30 ബോണസ്)" : "Complete Level 2 (+30 Bonus)"}</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}
