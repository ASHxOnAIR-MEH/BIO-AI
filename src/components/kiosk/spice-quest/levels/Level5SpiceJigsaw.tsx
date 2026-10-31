"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Sparkles,
  Eye,
  EyeOff,
  ArrowRight,
  Hash,
  Wand2,
  Check
} from "lucide-react";
import { useSpiceQuest } from "../SpiceQuestContext";
import { LEVEL_5_DISCOVERIES, Level5DiscoveryItem } from "@/data/spiceQuestData";
import { SpiceAudio } from "../SpiceAudio";
import VedaGameGuide from "../VedaGameGuide";

const JIGSAW_IMAGE = "/assets/kiosk/categories/spices.jpg";

function generateShuffledTiles(size: 3 | 4): number[] {
  const total = size * size;
  const initial = Array.from({ length: total }, (_, i) => i);
  const shuffled = [...initial];
  let isSame = true;
  while (isSame) {
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    isSame = shuffled.every((val, idx) => val === idx);
  }
  return shuffled;
}

export default function Level5SpiceJigsaw() {
  const { state, completeLevel, recordScoreIncrement, setView } = useSpiceQuest();
  const isMl = state.language === "ml";

  // Grid size: 3 for 3x3 (9 pieces) or 4 for 4x4 (16 pieces)
  const [gridSize, setGridSize] = useState<3 | 4>(4);

  // Board state: array of original piece indices [0, 1, 2, ... totalTiles-1]
  const [tiles, setTiles] = useState<number[]>(() => generateShuffledTiles(4));
  const [selectedTileIdx, setSelectedTileIdx] = useState<number | null>(null);
  const [isJigsawSolved, setIsJigsawSolved] = useState(false);
  const [showGhostPreview, setShowGhostPreview] = useState(false);
  const [showNumberGuides, setShowNumberGuides] = useState(false);

  // Phase 2: Botanical Discovery after jigsaw completion
  const [phase2SolvedIds, setPhase2SolvedIds] = useState<string[]>([]);
  const [selectedDiscoveryId, setSelectedDiscoveryId] = useState<string | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    startTimeRef.current = Date.now();
  }, []);

  const handleSetGridSize = (size: 3 | 4) => {
    setGridSize(size);
    setTiles(generateShuffledTiles(size));
    setSelectedTileIdx(null);
    setIsJigsawSolved(false);
  };

  // Check if puzzle is solved
  const checkSolved = (currentTiles: number[]) => {
    const solved = currentTiles.every((val, idx) => val === idx);
    if (solved) {
      setIsJigsawSolved(true);
      SpiceAudio.playVictory();
      recordScoreIncrement(50);
    }
  };

  // Swap two tiles
  const swapTiles = (indexA: number, indexB: number) => {
    if (indexA === indexB) return;
    const nextTiles = [...tiles];
    const temp = nextTiles[indexA];
    nextTiles[indexA] = nextTiles[indexB];
    nextTiles[indexB] = temp;

    setTiles(nextTiles);
    SpiceAudio.playPuzzleSnap();
    checkSolved(nextTiles);
  };

  const handleTileClick = (clickedSlotIdx: number) => {
    if (isJigsawSolved) return;

    if (selectedTileIdx === null) {
      setSelectedTileIdx(clickedSlotIdx);
      SpiceAudio.playCardFlip();
    } else {
      swapTiles(selectedTileIdx, clickedSlotIdx);
      setSelectedTileIdx(null);
    }
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, slotIdx: number) => {
    if (isJigsawSolved) return;
    e.dataTransfer.setData("text/plain", slotIdx.toString());
    setSelectedTileIdx(slotIdx);
  };

  const handleDrop = (e: React.DragEvent, targetSlotIdx: number) => {
    e.preventDefault();
    if (isJigsawSolved) return;
    const sourceIdxStr = e.dataTransfer.getData("text/plain");
    const sourceSlotIdx = sourceIdxStr !== "" ? parseInt(sourceIdxStr, 10) : selectedTileIdx;
    if (sourceSlotIdx !== null && !isNaN(sourceSlotIdx)) {
      swapTiles(sourceSlotIdx, targetSlotIdx);
    }
    setSelectedTileIdx(null);
  };

  // Auto-solve one incorrect piece as a smart hint
  const handleHintAutoPlace = () => {
    if (isJigsawSolved) return;
    const wrongSlotIdx = tiles.findIndex((tileValue, slotIdx) => tileValue !== slotIdx);
    if (wrongSlotIdx === -1) return;

    const targetTileValue = wrongSlotIdx; // the piece that belongs in wrongSlotIdx
    const currentLocOfTarget = tiles.indexOf(targetTileValue);

    if (currentLocOfTarget !== -1) {
      swapTiles(wrongSlotIdx, currentLocOfTarget);
    }
  };

  // Phase 2 Discovery Match
  const handleDiscoveryCardClick = (item: Level5DiscoveryItem) => {
    if (phase2SolvedIds.includes(item.id)) return;
    if (selectedDiscoveryId === item.id) {
      setSelectedDiscoveryId(null);
    } else {
      setSelectedDiscoveryId(item.id);
      SpiceAudio.playCardFlip();
    }
  };

  const handleDiscoveryBowlClick = (targetItem: Level5DiscoveryItem) => {
    if (!selectedDiscoveryId) return;

    if (selectedDiscoveryId === targetItem.id) {
      SpiceAudio.playCorrect();
      recordScoreIncrement(10);
      setPhase2SolvedIds((prev) => [...prev, targetItem.id]);
      setSelectedDiscoveryId(null);
    } else {
      SpiceAudio.playIncorrect();
    }
  };

  const isAllPhase2Done = phase2SolvedIds.length === LEVEL_5_DISCOVERIES.length;

  const handleFinishLevel = () => {
    const timeSpent = startTimeRef.current
      ? Math.round((Date.now() - startTimeRef.current) / 1000)
      : 30;
    completeLevel(5, 30, timeSpent);
    setView("selector");
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-3 sm:py-6 px-3 sm:px-6 flex flex-col gap-4 sm:gap-6">
      {/* ─── 1. LEVEL HEADER & CONTROLS ───────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white rounded-2xl p-3 sm:p-4 border-2 border-[#0B5D46]/15 shadow-xs">
        <div>
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#EA580C] bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200">
            {isMl ? "ലെവൽ 5 • കഠിനം" : "Level 5 • Hard"}
          </span>
          <h2 className="text-base sm:text-xl font-black text-[#072820] mt-0.5">
            {isMl ? "സുഗന്ധ ശേഖരം പുനർനിർമ്മിക്കൂ" : "Rebuild the Spice Collection"}
          </h2>
        </div>

        {/* Toolbar Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* 3x3 vs 4x4 Grid Mode Toggle */}
          <div className="flex items-center rounded-xl bg-gray-100 p-0.5 border border-gray-200 text-xs font-bold">
            <button
              type="button"
              onClick={() => handleSetGridSize(3)}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                gridSize === 3 ? "bg-white text-[#072820] shadow-xs" : "text-gray-500"
              }`}
            >
              3 × 3
            </button>
            <button
              type="button"
              onClick={() => handleSetGridSize(4)}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                gridSize === 4 ? "bg-white text-[#072820] shadow-xs" : "text-gray-500"
              }`}
            >
              4 × 4
            </button>
          </div>

          {/* Ghost Preview Toggle */}
          <button
            type="button"
            onClick={() => setShowGhostPreview((prev) => !prev)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all touch-manipulation cursor-pointer ${
              showGhostPreview
                ? "bg-[#D4AF37]/20 border-[#D4AF37] text-[#072820]"
                : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
            }`}
            title="Toggle original image preview"
          >
            {showGhostPreview ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isMl ? "പ്രിവ്യൂ" : "Preview"}</span>
          </button>

          {/* Number Hints Toggle */}
          <button
            type="button"
            onClick={() => setShowNumberGuides((prev) => !prev)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all touch-manipulation cursor-pointer ${
              showNumberGuides
                ? "bg-[#10B981]/20 border-[#10B981] text-[#072820]"
                : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
            }`}
            title="Toggle piece numbers"
          >
            <Hash className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isMl ? "നമ്പറുകൾ" : "Numbers"}</span>
          </button>

          {/* Single Piece Auto-Place Hint */}
          {!isJigsawSolved && (
            <button
              type="button"
              onClick={handleHintAutoPlace}
              className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
              title="Snap one piece into place"
            >
              <Wand2 className="w-3.5 h-3.5 text-amber-700" />
              <span>{isMl ? "ഒരു കഷണം സഹായിക്കൂ" : "Fix 1 Piece"}</span>
            </button>
          )}
        </div>
      </div>

      {/* ─── 2. VEDA COMPANION MESSAGE ────────────────────────────────────────── */}
      <VedaGameGuide
        overrideExpression={
          isAllPhase2Done
            ? "celebrating"
            : isJigsawSolved
            ? "happy"
            : "curious"
        }
        overrideMessage={
          isAllPhase2Done
            ? "Masterful achievement! You solved the complete puzzle and verified all Kerala spices! Next stop: Grand Master!"
            : isJigsawSolved
            ? "Jigsaw solved (+50 pts)! Now complete Phase 2: Tap the spice information cards below to match the spices in the bowls."
            : "Touch a piece to select it, then touch another piece to swap them into the correct order. You can also drag and drop!"
        }
        overrideMessageMl={
          isAllPhase2Done
            ? "അത്യുജ്ജ്വലം! പസിൽ പൂർത്തിയാക്കി എല്ലാ സുഗന്ധവ്യഞ്ജനങ്ങളെയും കണ്ടെത്തി! അടുത്തത് ഗ്രാൻഡ് മാസ്റ്റർ ചലഞ്ച്!"
            : isJigsawSolved
            ? "ജിഗ്‌സോ പസിൽ പൂർത്തിയായി (+50 പോയിന്റ്)! ഇനി താഴെയുള്ള കാർഡുകളിൽ തൊട്ടു പാത്രങ്ങളിലെ ചേരുവകളെ പൊരുത്തപ്പെടുത്തൂ."
            : "ഒരു കഷണത്തിൽ തൊട്ട ശേഷം മാറ്റിവെക്കേണ്ട മറ്റൊരു കഷണത്തിൽ തൊടുക. അല്ലെങ്കിൽ ഡ്രാഗ് ചെയ്ത് വെക്കാം!"
        }
      />

      {/* ─── 3. JIGSAW PUZZLE BOARD WORKBENCH ─────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* The Jigsaw Canvas (7 cols on desktop) */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div
            className={`relative w-full max-w-[500px] aspect-square rounded-3xl overflow-hidden border-4 transition-all shadow-2xl ${
              isJigsawSolved ? "border-[#D4AF37] ring-4 ring-[#D4AF37]/40" : "border-[#072820]"
            }`}
          >
            {/* Ghost Preview Overlay */}
            {showGhostPreview && (
              <div className="absolute inset-0 z-20 pointer-events-none opacity-40">
                <Image
                  src={JIGSAW_IMAGE}
                  alt="Original preview"
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Jigsaw Grid Tiles */}
            <div
              className="w-full h-full grid"
              style={{
                gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
                gridTemplateRows: `repeat(${gridSize}, minmax(0, 1fr))`,
              }}
            >
              {tiles.map((pieceVal, slotIdx) => {
                const isSelected = selectedTileIdx === slotIdx;
                const isCorrect = pieceVal === slotIdx;

                // Calculate CSS background position for this pieceVal
                const col = pieceVal % gridSize;
                const row = Math.floor(pieceVal / gridSize);
                const bgPosX = (col / (gridSize - 1)) * 100;
                const bgPosY = (row / (gridSize - 1)) * 100;

                return (
                  <div
                    key={slotIdx}
                    draggable={!isJigsawSolved}
                    onDragStart={(e) => handleDragStart(e, slotIdx)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDrop(e, slotIdx)}
                    onClick={() => handleTileClick(slotIdx)}
                    className={`relative w-full h-full border border-black/30 overflow-hidden select-none transition-all ${
                      isJigsawSolved
                        ? "cursor-default"
                        : "cursor-pointer active:scale-95"
                    } ${
                      isSelected
                        ? "ring-4 ring-[#D4AF37] z-30 scale-95 shadow-2xl"
                        : "hover:brightness-105"
                    }`}
                    style={{
                      backgroundImage: `url(${JIGSAW_IMAGE})`,
                      backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
                      backgroundPosition: `${bgPosX}% ${bgPosY}%`,
                    }}
                  >
                    {/* Optional Number Guide Overlay */}
                    {showNumberGuides && (
                      <span className="absolute top-1 left-1 bg-black/70 text-white font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
                        {pieceVal + 1}
                      </span>
                    )}

                    {/* Correct piece subtle indicator */}
                    {!isJigsawSolved && isCorrect && (
                      <span className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-[#10B981] shadow-xs" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Solved Sparkle Overlay */}
            {isJigsawSolved && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-[#072820]/15 pointer-events-none flex items-center justify-center"
              >
                <div className="bg-[#072820]/90 text-[#D4AF37] px-6 py-3 rounded-full border-2 border-[#D4AF37] font-black text-sm flex items-center gap-2 shadow-2xl backdrop-blur-md">
                  <Sparkles className="w-5 h-5 text-[#F59E0B]" />
                  <span>{isMl ? "പസിൽ വിജയകരമായി പൂർത്തിയായി!" : "Spice Collection Assembled!"}</span>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Right Side: Phase 2 Botanical Discovery Challenge (5 cols on desktop) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <div className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-[#0B5D46]/20 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs sm:text-sm font-bold text-[#072820] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>{isMl ? "ഘട്ടം 2: സുഗന്ധവ്യഞ്ജനങ്ങളെ കണ്ടെത്തൂ" : "Phase 2: Identify Ingredients"}</span>
              </h3>
              <span className="text-xs font-bold text-[#0B5D46]">
                {phase2SolvedIds.length} / {LEVEL_5_DISCOVERIES.length}
              </span>
            </div>

            <p className="text-[11px] text-[#244B3F]/85 mb-3 leading-relaxed">
              {isMl
                ? "ചിത്രത്തിൽ കാണുന്ന കേരളീയ സുഗന്ധവ്യഞ്ജനങ്ങളെ അവയുടെ സസ്യശാസ്ത്ര കാർഡുകളുമായി പൊരുത്തപ്പെടുത്തുക."
                : "Identify the four key spices visible in this Kerala brass & teak collection by matching them below."}
            </p>

            {/* Discovery Items List */}
            <div className="flex flex-col gap-2.5">
              {LEVEL_5_DISCOVERIES.map((item) => {
                const isSolved = phase2SolvedIds.includes(item.id);
                const isSelected = selectedDiscoveryId === item.id;

                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      if (!isJigsawSolved) return;
                      if (!isSolved) {
                        handleDiscoveryCardClick(item);
                        // Also auto-matches if clicked
                        handleDiscoveryBowlClick(item);
                      }
                    }}
                    className={`p-3 rounded-2xl border-2 flex items-center justify-between gap-3 transition-all select-none ${
                      !isJigsawSolved
                        ? "opacity-50 cursor-not-allowed bg-gray-50 border-gray-200"
                        : isSolved
                        ? "bg-emerald-50/80 border-emerald-300 text-emerald-950 cursor-default"
                        : isSelected
                        ? "bg-[#FFFDF7] border-[#D4AF37] ring-4 ring-[#D4AF37]/30 shadow-sm cursor-pointer"
                        : "bg-white border-gray-200 hover:border-[#D4AF37] cursor-pointer shadow-xs active:scale-98"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-[#072820] shrink-0 border border-gray-200">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="50px"
                        />
                      </div>

                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-[#072820]">
                          {isMl ? item.nameMl : item.name}
                        </h4>
                        <p className="text-[10px] text-gray-500 italic">
                          {item.botanicalName} ({item.family})
                        </p>
                        <p className="text-[9px] text-[#0B5D46] font-medium mt-0.5">
                          {item.bowlLocation}
                        </p>
                      </div>
                    </div>

                    {isSolved ? (
                      <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-300">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
                        Tap
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Level Completion CTA Button */}
            {isAllPhase2Done && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                type="button"
                onClick={handleFinishLevel}
                className="mt-4 w-full py-3.5 rounded-full bg-gradient-to-r from-[#EA580C] via-[#F59E0B] to-[#D4AF37] text-[#072820] font-black text-sm flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all touch-manipulation cursor-pointer"
              >
                <span>{isMl ? "ലെവൽ 5 പൂർത്തിയാക്കൂ (+30 ബോണസ്)" : "Complete Level 5 (+30 Bonus)"}</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
