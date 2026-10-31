"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Trophy, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { useSpiceQuest } from "../SpiceQuestContext";
import { MEMORY_SPICE_PAIRS } from "@/data/spiceQuestData";
import { SpiceAudio } from "../SpiceAudio";
import VedaGameGuide from "../VedaGameGuide";

interface CardItem {
  instanceId: string;
  pairId: string;
  name: string;
  nameMl: string;
  botanicalName: string;
  image: string;
  fact: string;
}

export default function Level3SpiceMemoryGrid() {
  const { state, completeLevel, recordScoreIncrement, setView } = useSpiceQuest();
  const isMl = state.language === "ml";

  // Build the 12 shuffled cards
  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [lastDiscoveredFact, setLastDiscoveredFact] = useState<string | null>(null);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Initialize and shuffle cards on mount
  useEffect(() => {
    const deck: CardItem[] = [];
    MEMORY_SPICE_PAIRS.forEach((spice) => {
      // 2 cards per spice
      deck.push({
        instanceId: `${spice.pairId}_1`,
        pairId: spice.pairId,
        name: spice.name,
        nameMl: spice.nameMl,
        botanicalName: spice.botanicalName,
        image: spice.image,
        fact: spice.fact,
      });
      deck.push({
        instanceId: `${spice.pairId}_2`,
        pairId: spice.pairId,
        name: spice.name,
        nameMl: spice.nameMl,
        botanicalName: spice.botanicalName,
        image: spice.image,
        fact: spice.fact,
      });
    });

    // Shuffle using Fisher-Yates
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    setCards(deck);
  }, []);

  // Timer effect
  useEffect(() => {
    if (isCompleted) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isCompleted]);

  // Card click handler
  const handleCardClick = (index: number) => {
    // Prevent clicking if 2 already flipped, or clicked same card, or card already matched
    if (flippedIndices.length === 2) return;
    if (flippedIndices.includes(index)) return;
    if (matchedPairs.includes(cards[index].pairId)) return;

    SpiceAudio.playCardFlip();
    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    // If 2 cards are now flipped, compare
    if (newFlipped.length === 2) {
      setAttempts((prev) => prev + 1);
      const [firstIdx, secondIdx] = newFlipped;
      const firstCard = cards[firstIdx];
      const secondCard = cards[secondIdx];

      if (firstCard.pairId === secondCard.pairId) {
        // MATCH!
        setTimeout(() => {
          SpiceAudio.playCorrect();
          recordScoreIncrement(10);
          setMatchedPairs((prev) => {
            const next = [...prev, firstCard.pairId];
            if (next.length === MEMORY_SPICE_PAIRS.length) {
              setIsCompleted(true);
            }
            return next;
          });
          setLastDiscoveredFact(firstCard.fact);
          setFlippedIndices([]);
        }, 500);
      } else {
        // MISMATCH -> flip back after 900ms
        setTimeout(() => {
          SpiceAudio.playIncorrect();
          setFlippedIndices([]);
        }, 900);
      }
    }
  };

  const handleFinishLevel = () => {
    // Attempts bonus
    const efficiencyBonus = attempts <= 10 ? 20 : attempts <= 14 ? 10 : 0;
    const totalBonus = 30 + efficiencyBonus;
    completeLevel(3, totalBonus, timerSeconds);
    setView("selector");
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-3 sm:py-6 px-3 sm:px-6 flex flex-col gap-4 sm:gap-6">
      {/* ─── 1. LEVEL HEADER & STATS ─────────────────────────────────────────── */}
      <div className="flex items-center justify-between bg-white rounded-2xl p-3 sm:p-4 border-2 border-[#0B5D46]/15 shadow-xs">
        <div>
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#F59E0B] bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
            {isMl ? "ലെവൽ 3 • ഇടത്തരം" : "Level 3 • Medium"}
          </span>
          <h2 className="text-base sm:text-xl font-black text-[#072820] mt-0.5">
            {isMl ? "സുഗന്ധ മെമ്മറി ഗ്രിഡ്" : "The Spice Memory Grid"}
          </h2>
        </div>

        {/* Stats Row */}
        <div className="flex items-center gap-3 sm:gap-4 text-xs font-bold text-[#072820]">
          <div className="flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-full">
            <Trophy className="w-4 h-4 text-[#D4AF37]" />
            <span>
              {matchedPairs.length} / {MEMORY_SPICE_PAIRS.length} {isMl ? "ജോടികൾ" : "Pairs"}
            </span>
          </div>

          <div className="flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-full">
            <span>{isMl ? "ശ്രമങ്ങൾ: " : "Tries: "} {attempts}</span>
          </div>

          <div className="flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-full">
            <Clock className="w-4 h-4 text-[#0B5D46]" />
            <span>{timerSeconds}s</span>
          </div>
        </div>
      </div>

      {/* ─── 2. VEDA COMPANION MESSAGE ────────────────────────────────────────── */}
      <VedaGameGuide
        overrideExpression={
          isCompleted
            ? "celebrating"
            : lastDiscoveredFact
            ? "happy"
            : "thinking"
        }
        overrideMessage={
          isCompleted
            ? `Tremendous! You found all 6 spice pairs in ${attempts} tries and ${timerSeconds} seconds!`
            : lastDiscoveredFact || "Touch two cards to flip them. Remember the locations to pair all six Kerala spices!"
        }
        overrideMessageMl={
          isCompleted
            ? `അത്ഭുതകരം! ${attempts} ശ്രമങ്ങളിൽ ${timerSeconds} സെക്കൻഡിൽ നിങ്ങൾ എല്ലാ ജോടികളും കണ്ടെത്തി!`
            : lastDiscoveredFact || "രണ്ട് കാർഡുകൾ തൊട്ടു മറിച്ചു നോക്കൂ. ഓരോ സുഗന്ധവ്യഞ്ജനത്തിന്റെയും സ്ഥാനം ഓർത്തു വെക്കുക!"
        }
      />

      {/* ─── 3. 3x4 MEMORY GRID (12 CARDS) ────────────────────────────────────── */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 sm:gap-4">
        {cards.map((card, idx) => {
          const isFlipped = flippedIndices.includes(idx) || matchedPairs.includes(card.pairId);
          const isMatched = matchedPairs.includes(card.pairId);

          return (
            <div
              key={card.instanceId}
              onClick={() => handleCardClick(idx)}
              className="relative aspect-3/4 rounded-2xl cursor-pointer perspective-1000 select-none touch-manipulation"
            >
              <motion.div
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
                className="w-full h-full relative preserve-3d"
              >
                {/* ─── CARD BACK (FACE DOWN: Ancient Kerala Botanical Brass Seal) ─── */}
                <div className="absolute inset-0 backface-hidden rounded-2xl bg-gradient-to-br from-[#072820] via-[#0B3A2C] to-[#041D16] border-2 border-[#D4AF37]/50 p-2 shadow-md hover:border-[#D4AF37] flex flex-col items-center justify-between text-center overflow-hidden">
                  <div className="w-full flex justify-between text-[9px] text-[#D4AF37]/60 font-serif">
                    <span>BIO-AI</span>
                    <span>VEDA</span>
                  </div>

                  {/* Brass Emblem Icon */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#D4AF37]/15 border-2 border-[#D4AF37]/60 flex items-center justify-center shadow-inner">
                    <Sparkles className="w-6 h-6 text-[#D4AF37]" />
                  </div>

                  <span className="text-[10px] sm:text-xs font-serif italic text-[#D4AF37]/80">
                    {isMl ? "രഹസ്യ കാർഡ്" : "Spice Secret"}
                  </span>
                </div>

                {/* ─── CARD FRONT (FACE UP: Spice Photo & Botanical Voucher) ───────── */}
                <div
                  className={`absolute inset-0 backface-hidden rotate-y-180 rounded-2xl p-2 sm:p-2.5 border-2 flex flex-col items-center justify-between text-center shadow-lg transition-all ${
                    isMatched
                      ? "bg-[#F0FDF4] border-[#10B981] ring-2 ring-[#10B981]/30"
                      : "bg-white border-[#D4AF37]"
                  }`}
                >
                  {/* Photo */}
                  <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#072820] shadow-inner">
                    <Image
                      src={card.image}
                      alt={card.name}
                      fill
                      className="object-cover"
                      sizes="160px"
                    />
                    {isMatched && (
                      <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[#10B981] text-white flex items-center justify-center shadow-xs">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>

                  {/* Text Voucher */}
                  <div className="w-full mt-1">
                    <h4 className="text-xs sm:text-sm font-bold text-[#072820] truncate">
                      {isMl ? card.nameMl : card.name}
                    </h4>
                    <p className="text-[9px] sm:text-[10px] text-gray-500 italic truncate">
                      {card.botanicalName}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* ─── 4. LEVEL COMPLETION BANNER ────────────────────────────────────────── */}
      {isCompleted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-[#0B5D46] via-[#072820] to-[#0B5D46] rounded-2xl p-5 text-white border-2 border-[#D4AF37] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl"
        >
          <div>
            <h3 className="text-lg font-serif font-black text-[#D4AF37]">
              {isMl ? "ലെവൽ 3 പൂർത്തിയായി!" : "Level 3 Memory Grid Solved!"}
            </h3>
            <p className="text-xs text-white/80">
              {isMl
                ? `സമയം: ${timerSeconds}s • ശ്രമങ്ങൾ: ${attempts} • +30 പോയിന്റ് ബോണസ്!`
                : `Time: ${timerSeconds}s • Attempts: ${attempts} • +30 Point Completion Bonus!`}
            </p>
          </div>

          <button
            type="button"
            onClick={handleFinishLevel}
            className="px-6 py-3 rounded-full bg-[#D4AF37] hover:bg-[#F59E0B] text-[#072820] font-black text-sm flex items-center gap-2 shadow-lg active:scale-95 transition-all touch-manipulation cursor-pointer"
          >
            <span>{isMl ? "ലെവൽ 4-ലേക്ക് പോകുക" : "Proceed to Level 4"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </div>
  );
}
