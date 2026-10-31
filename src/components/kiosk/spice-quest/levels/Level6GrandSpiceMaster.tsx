"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Award,
  Clock,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Check
} from "lucide-react";
import { useSpiceQuest } from "../SpiceQuestContext";
import {
  STAGE_A_QUESTIONS,
  STAGE_B_ITEMS,
  STAGE_C_ITEMS,
  STAGE_D_RIDDLES,
  STAGE_E_MATRIX,
  StageBClassificationItem,
  StageCSanskritItem,
  StageEMatrixItem
} from "@/data/spiceQuestData";
import { SpiceAudio } from "../SpiceAudio";
import VedaGameGuide from "../VedaGameGuide";

type StageName = "stage_a" | "stage_b" | "stage_c" | "stage_d" | "stage_e";

const STAGE_NAMES: { id: StageName; labelEn: string; labelMl: string }[] = [
  { id: "stage_a", labelEn: "Stage A: Mystery ID", labelMl: "ഘട്ടം A: നിഗൂഢ ചേരുവകൾ" },
  { id: "stage_b", labelEn: "Stage B: Botanical Taxa", labelMl: "ഘട്ടം B: സസ്യ വർഗ്ഗീകരണം" },
  { id: "stage_c", labelEn: "Stage C: Sanskrit Lore", labelMl: "ഘട്ടം C: സംസ്കൃത നാമങ്ങൾ" },
  { id: "stage_d", labelEn: "Stage D: Ancient Codices", labelMl: "ഘട്ടം D: ചരിത്ര രേഖകൾ" },
  { id: "stage_e", labelEn: "Stage E: Grand Matrix", labelMl: "ഘട്ടം E: മാസ്റ്റർ മാട്രിക്സ്" }
];

export default function Level6GrandSpiceMaster() {
  const { state, completeLevel, recordScoreIncrement, setView } = useSpiceQuest();
  const isMl = state.language === "ml";

  const [activeStage, setActiveStage] = useState<StageName>("stage_a");
  const [timeLeft, setTimeLeft] = useState(150); // 150 seconds countdown
  const [isTimeExpired, setIsTimeExpired] = useState(false);
  const [isChallengeComplete, setIsChallengeComplete] = useState(false);

  // Stage A State: Rapid 5-question mystery ID
  const [stageAIndex, setStageAIndex] = useState(0);
  const [stageASelectedOption, setStageASelectedOption] = useState<string | null>(null);

  // Stage B State: Classification Matching (5 items)
  const [stageBMatchedIds, setStageBMatchedIds] = useState<string[]>([]);
  const [stageBSelectedId, setStageBSelectedId] = useState<string | null>(null);

  // Stage C State: Sanskrit Matching (5 items)
  const [stageCMatchedIds, setStageCMatchedIds] = useState<string[]>([]);
  const [stageCSelectedId, setStageCSelectedId] = useState<string | null>(null);

  // Stage D State: Historical Codex Riddles (3 questions)
  const [stageDIndex, setStageDIndex] = useState(0);
  const [stageDSelected, setStageDSelected] = useState<string | null>(null);

  // Stage E State: Grand Synthesis Matrix (5 rows)
  const [stageEMatchedRows, setStageEMatchedRows] = useState<string[]>([]);
  const [stageESelectedItem, setStageESelectedItem] = useState<StageEMatrixItem | null>(null);

  // Countdown timer
  useEffect(() => {
    if (isChallengeComplete || isTimeExpired) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsTimeExpired(true);
          SpiceAudio.playIncorrect();
          return 0;
        }
        if (prev <= 15) {
          SpiceAudio.playTick();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isChallengeComplete, isTimeExpired]);

  // ─── STAGE A HANDLER ────────────────────────────────────────────────────────
  const handleStageAOption = (option: string) => {
    if (stageASelectedOption) return;
    const currentQ = STAGE_A_QUESTIONS[stageAIndex];
    setStageASelectedOption(option);

    if (option === currentQ.correctAnswer) {
      SpiceAudio.playCorrect();
      recordScoreIncrement(10);
    } else {
      SpiceAudio.playIncorrect();
    }

    setTimeout(() => {
      if (stageAIndex < STAGE_A_QUESTIONS.length - 1) {
        setStageAIndex((prev) => prev + 1);
        setStageASelectedOption(null);
      } else {
        // Stage A complete -> Proceed to Stage B!
        SpiceAudio.playLevelComplete();
        setActiveStage("stage_b");
      }
    }, 600);
  };

  // ─── STAGE B HANDLER (Classification) ───────────────────────────────────────
  const handleStageBTapItem = (item: StageBClassificationItem) => {
    if (stageBMatchedIds.includes(item.id)) return;
    setStageBSelectedId(item.id === stageBSelectedId ? null : item.id);
    SpiceAudio.playCardFlip();
  };

  const handleStageBTapFamily = (familyTarget: string) => {
    if (!stageBSelectedId) return;
    const currentItem = STAGE_B_ITEMS.find((i) => i.id === stageBSelectedId);
    if (!currentItem) return;

    if (currentItem.family === familyTarget) {
      SpiceAudio.playCorrect();
      recordScoreIncrement(10);
      const nextMatched = [...stageBMatchedIds, stageBSelectedId];
      setStageBMatchedIds(nextMatched);
      setStageBSelectedId(null);

      if (nextMatched.length === STAGE_B_ITEMS.length) {
        setTimeout(() => {
          SpiceAudio.playLevelComplete();
          setActiveStage("stage_c");
        }, 500);
      }
    } else {
      SpiceAudio.playIncorrect();
    }
  };

  // ─── STAGE C HANDLER (Sanskrit) ─────────────────────────────────────────────
  const handleStageCTapItem = (item: StageCSanskritItem) => {
    if (stageCMatchedIds.includes(item.id)) return;
    setStageCSelectedId(item.id === stageCSelectedId ? null : item.id);
    SpiceAudio.playCardFlip();
  };

  const handleStageCTapTarget = (targetItem: StageCSanskritItem) => {
    if (!stageCSelectedId) return;

    if (stageCSelectedId === targetItem.id) {
      SpiceAudio.playCorrect();
      recordScoreIncrement(10);
      const nextMatched = [...stageCMatchedIds, targetItem.id];
      setStageCMatchedIds(nextMatched);
      setStageCSelectedId(null);

      if (nextMatched.length === STAGE_C_ITEMS.length) {
        setTimeout(() => {
          SpiceAudio.playLevelComplete();
          setActiveStage("stage_d");
        }, 500);
      }
    } else {
      SpiceAudio.playIncorrect();
    }
  };

  // ─── STAGE D HANDLER (Codices Riddles) ───────────────────────────────────────
  const handleStageDOption = (opt: string) => {
    if (stageDSelected) return;
    const currentRiddle = STAGE_D_RIDDLES[stageDIndex];
    setStageDSelected(opt);

    if (opt === currentRiddle.correctSpice) {
      SpiceAudio.playCorrect();
      recordScoreIncrement(15);
    } else {
      SpiceAudio.playIncorrect();
    }

    setTimeout(() => {
      if (stageDIndex < STAGE_D_RIDDLES.length - 1) {
        setStageDIndex((prev) => prev + 1);
        setStageDSelected(null);
      } else {
        SpiceAudio.playLevelComplete();
        setActiveStage("stage_e");
      }
    }, 700);
  };

  // ─── STAGE E HANDLER (Grand Matrix) ─────────────────────────────────────────
  const handleStageERowClick = (item: StageEMatrixItem) => {
    if (stageEMatchedRows.includes(item.id)) return;

    if (!stageESelectedItem) {
      setStageESelectedItem(item);
      SpiceAudio.playCardFlip();
    } else {
      if (stageESelectedItem.id === item.id) {
        // Matched!
        SpiceAudio.playCorrect();
        recordScoreIncrement(20);
        const nextRows = [...stageEMatchedRows, item.id];
        setStageEMatchedRows(nextRows);
        setStageESelectedItem(null);

        if (nextRows.length === STAGE_E_MATRIX.length) {
          // ALL 5 STAGES CONQUERED!
          setIsChallengeComplete(true);
          SpiceAudio.playVictory();
          // Bonus points: +50 level finish + remaining seconds bonus
          const timeBonus = Math.floor(timeLeft / 2);
          completeLevel(6, 50 + timeBonus, 150 - timeLeft);
        }
      } else {
        SpiceAudio.playIncorrect();
        setStageESelectedItem(null);
      }
    }
  };

  // Retry on time expired
  const handleRetry = () => {
    setTimeLeft(150);
    setIsTimeExpired(false);
    setIsChallengeComplete(false);
    setActiveStage("stage_a");
    setStageAIndex(0);
    setStageASelectedOption(null);
    setStageBMatchedIds([]);
    setStageCMatchedIds([]);
    setStageDIndex(0);
    setStageDSelected(null);
    setStageEMatchedRows([]);
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-3 sm:py-6 px-3 sm:px-6 flex flex-col gap-4 sm:gap-6 bg-[#041D16] text-[#FAF7EE] rounded-3xl min-h-[85vh] border-2 border-[#D4AF37] shadow-2xl relative overflow-hidden">
      {/* Golden Particle Ambient Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none" />

      {/* ─── 1. TOP HEADER: THE GRAND SPICE MASTER & COUNTDOWN TIMER ───────────── */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#072820]/90 backdrop-blur-md rounded-2xl p-4 border border-[#D4AF37]/50 shadow-lg">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] sm:text-xs font-black uppercase tracking-wider mb-1">
            <Award className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>{isMl ? "അന്തിമ എക്സ്പെർട്ട് പരീക്ഷണം" : "Final Expert Trial"}</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-serif font-black tracking-tight text-white leading-tight">
            {isMl ? "ദി ഗ്രാൻഡ് സ്പൈസ് മാസ്റ്റർ" : "THE GRAND SPICE MASTER"}
          </h1>
          <p className="text-xs text-[#D4AF37] italic">
            {isMl
              ? "ഒരു യഥാർത്ഥ സ്പൈസ് മാസ്റ്റർക്ക് മാത്രമേ അന്തിമ ശേഖരം തുറക്കാൻ സാധിക്കൂ."
              : "Only a true Spice Master can unlock the final Ayurvedic collection."}
          </p>
        </div>

        {/* Countdown Timer Display */}
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl border-2 font-mono font-black text-lg sm:text-xl transition-all ${
              timeLeft <= 30
                ? "bg-red-950/80 border-red-500 text-red-400 animate-pulse ring-4 ring-red-500/20"
                : "bg-[#072820] border-[#D4AF37] text-[#D4AF37]"
            }`}
          >
            <Clock className={`w-5 h-5 ${timeLeft <= 30 ? "text-red-400 animate-spin" : "text-[#D4AF37]"}`} />
            <span>{String(Math.floor(timeLeft / 60)).padStart(2, "0")}:{String(timeLeft % 60).padStart(2, "0")}</span>
          </div>

          {/* Quick Exit to Level Selector */}
          <button
            type="button"
            onClick={() => setView("selector")}
            className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-gray-300 transition-all cursor-pointer"
          >
            {isMl ? "വിടുക" : "Exit"}
          </button>
        </div>
      </div>

      {/* ─── 2. FIVE PROGRESSIVE STAGE TABS ───────────────────────────────────── */}
      <div className="relative z-10 flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none">
        {STAGE_NAMES.map((stg, idx) => {
          const isActive = activeStage === stg.id;
          const isPassed =
            (stg.id === "stage_a" && activeStage !== "stage_a") ||
            (stg.id === "stage_b" && ["stage_c", "stage_d", "stage_e"].includes(activeStage)) ||
            (stg.id === "stage_c" && ["stage_d", "stage_e"].includes(activeStage)) ||
            (stg.id === "stage_d" && activeStage === "stage_e");

          return (
            <div
              key={stg.id}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all ${
                isActive
                  ? "bg-[#D4AF37] text-[#072820] ring-2 ring-white shadow-md font-black"
                  : isPassed
                  ? "bg-[#10B981]/25 text-[#10B981] border border-[#10B981]/40"
                  : "bg-white/10 text-white/50"
              }`}
            >
              <span>{idx + 1}</span>
              <span>{isMl ? stg.labelMl : stg.labelEn}</span>
              {isPassed && <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />}
            </div>
          );
        })}
      </div>

      {/* ─── 3. VEDA GAME GUIDE ────────────────────────────────────────────────── */}
      <div className="relative z-10">
        <VedaGameGuide
          overrideExpression={
            isChallengeComplete
              ? "celebrating"
              : isTimeExpired
              ? "concerned"
              : activeStage === "stage_e"
              ? "thinking"
              : "curious"
          }
          overrideMessage={
            isChallengeComplete
              ? "ASTONISHING! You have proven your mastery across all botanical sciences and classical texts!"
              : isTimeExpired
              ? "Time has run out! Do not worry; take a deep breath and challenge the Grand Master trial again."
              : activeStage === "stage_a"
              ? "Stage A: Quick identification! Tap the correct spice name as each mystery photo appears."
              : activeStage === "stage_b"
              ? "Stage B: Botanical Classification! Connect each spice to its plant family."
              : activeStage === "stage_c"
              ? "Stage C: Classical Sanskrit! Match the spices with their traditional Ayurvedic names."
              : activeStage === "stage_d"
              ? "Stage D: Ancient Textual Codices! Solve the historical clues from Charaka and Ashtanga Hridaya."
              : "Stage E: The Grand Synthesis Matrix! Assemble the final Master Tablet to claim victory!"
          }
        />
      </div>

      {/* ─── 4. MAIN STAGE WORKBENCH ───────────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex flex-col justify-center">
        {/* TIME EXPIRED MODAL OVERLAY */}
        {isTimeExpired && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#072820] p-6 sm:p-8 rounded-3xl border-2 border-red-500 text-center max-w-md mx-auto shadow-2xl flex flex-col items-center gap-4"
          >
            <AlertTriangle className="w-12 h-12 text-red-500" />
            <div>
              <h2 className="text-xl font-black text-white font-serif">
                {isMl ? "സമയം കഴിഞ്ഞു!" : "Time Has Expired!"}
              </h2>
              <p className="text-xs text-white/80 mt-1">
                {isMl
                  ? "ഗ്രാൻഡ് മാസ്റ്റർ ചലഞ്ചിൽ സമയം അതിപ്രധാനമാണ്. വീണ്ടും പരിശ്രമിക്കൂ!"
                  : "The Grand Master challenge tests both precision and speed. Try again to claim the title!"}
              </p>
            </div>

            <button
              type="button"
              onClick={handleRetry}
              className="px-6 py-3 rounded-full bg-[#D4AF37] hover:bg-[#F59E0B] text-[#072820] font-black text-sm flex items-center gap-2 active:scale-95 cursor-pointer shadow-lg"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{isMl ? "വീണ്ടും ആരംഭിക്കുക" : "Try Again (Reset Timer)"}</span>
            </button>
          </motion.div>
        )}

        {/* ── STAGE A: RAPID MYSTERY IDENTIFICATION ── */}
        {!isTimeExpired && activeStage === "stage_a" && (
          <div className="bg-[#072820]/80 rounded-3xl p-5 sm:p-6 border border-[#D4AF37]/30 shadow-xl max-w-2xl mx-auto w-full">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#D4AF37]">
                Mystery {stageAIndex + 1} of {STAGE_A_QUESTIONS.length}
              </span>
              <span className="text-xs text-white/60">Rapid Touch</span>
            </div>

            {/* Photo */}
            <div className="relative aspect-16/9 rounded-2xl overflow-hidden bg-black/40 border border-[#D4AF37]/40 mb-4 shadow-inner">
              <Image
                src={STAGE_A_QUESTIONS[stageAIndex].image}
                alt="Mystery Spice"
                fill
                className="object-cover"
                sizes="500px"
                priority
              />
            </div>

            {/* 4 Rapid Options */}
            <div className="grid grid-cols-2 gap-3">
              {STAGE_A_QUESTIONS[stageAIndex].options.map((opt) => {
                const isSelected = stageASelectedOption === opt;
                const isRight = opt === STAGE_A_QUESTIONS[stageAIndex].correctAnswer;

                return (
                  <button
                    key={opt}
                    type="button"
                    disabled={!!stageASelectedOption}
                    onClick={() => handleStageAOption(opt)}
                    className={`p-3.5 rounded-xl border-2 font-bold text-sm transition-all touch-manipulation cursor-pointer ${
                      stageASelectedOption && isRight
                        ? "bg-[#10B981] border-[#10B981] text-white"
                        : stageASelectedOption && isSelected && !isRight
                        ? "bg-red-900 border-red-500 text-white"
                        : "bg-white/10 hover:bg-white/20 border-white/20 text-white active:scale-95"
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── STAGE B: BOTANICAL TAXA MATCHING ── */}
        {!isTimeExpired && activeStage === "stage_b" && (
          <div className="bg-[#072820]/80 rounded-3xl p-5 sm:p-6 border border-[#D4AF37]/30 shadow-xl max-w-4xl mx-auto w-full">
            <h3 className="text-sm font-bold text-[#D4AF37] uppercase tracking-wider mb-3">
              Match Each Spice with its Botanical Family (Zingiberaceae, Piperaceae, Lauraceae, Myrtaceae)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: 5 Spices */}
              <div className="flex flex-col gap-2">
                <span className="text-xs text-white/60 mb-1">Select Spice:</span>
                {STAGE_B_ITEMS.map((item) => {
                  const isDone = stageBMatchedIds.includes(item.id);
                  const isSelected = stageBSelectedId === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      disabled={isDone}
                      onClick={() => handleStageBTapItem(item)}
                      className={`p-3 rounded-xl border text-left flex items-center justify-between text-xs font-bold transition-all cursor-pointer ${
                        isDone
                          ? "bg-emerald-950/60 border-emerald-500 text-emerald-300 opacity-80"
                          : isSelected
                          ? "bg-[#D4AF37] border-[#D4AF37] text-[#072820] shadow-md ring-2 ring-white"
                          : "bg-white/10 hover:bg-white/15 border-white/20 text-white"
                      }`}
                    >
                      <div>
                        <span className="block text-sm">{item.commonName}</span>
                        <span className="italic text-[10px] opacity-80">{item.botanicalName}</span>
                      </div>
                      {isDone && <Check className="w-4 h-4 text-emerald-400" />}
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Plant Families */}
              <div className="flex flex-col gap-2">
                <span className="text-xs text-white/60 mb-1">Target Plant Family:</span>
                {Array.from(new Set(STAGE_B_ITEMS.map((i) => i.family))).map((fam) => (
                  <button
                    key={fam}
                    type="button"
                    onClick={() => handleStageBTapFamily(fam)}
                    className="p-3.5 rounded-xl border border-white/20 bg-white/5 hover:bg-[#D4AF37]/20 hover:border-[#D4AF37] text-left text-sm font-bold text-white transition-all cursor-pointer"
                  >
                    <span>{fam}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── STAGE C: SANSKRIT TERMINOLOGY ── */}
        {!isTimeExpired && activeStage === "stage_c" && (
          <div className="bg-[#072820]/80 rounded-3xl p-5 sm:p-6 border border-[#D4AF37]/30 shadow-xl max-w-4xl mx-auto w-full">
            <h3 className="text-sm font-bold text-[#D4AF37] uppercase tracking-wider mb-3">
              Match Classical Sanskrit Names with Spices
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {STAGE_C_ITEMS.map((item) => {
                const isDone = stageCMatchedIds.includes(item.id);
                const isSelected = stageCSelectedId === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    disabled={isDone}
                    onClick={() => {
                      if (!stageCSelectedId) {
                        handleStageCTapItem(item);
                      } else {
                        handleStageCTapTarget(item);
                      }
                    }}
                    className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                      isDone
                        ? "bg-emerald-950/60 border-emerald-500 text-emerald-200"
                        : isSelected
                        ? "bg-[#D4AF37] border-[#D4AF37] text-[#072820] shadow-md ring-2 ring-white"
                        : "bg-white/10 hover:bg-white/15 border-white/20 text-white"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-base">{item.sanskritName}</span>
                      {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    </div>
                    <span className="text-xs text-white/70 block mt-1">{item.commonName}</span>
                    <span className="text-[10px] text-gray-400 italic block mt-0.5">
                      &ldquo;{item.sanskritMeaning}&rdquo;
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── STAGE D: ANCIENT TEXTUAL RIDDLES ── */}
        {!isTimeExpired && activeStage === "stage_d" && (
          <div className="bg-[#072820]/80 rounded-3xl p-5 sm:p-6 border border-[#D4AF37]/30 shadow-xl max-w-2xl mx-auto w-full">
            <div className="flex items-center justify-between mb-3 text-xs">
              <span className="font-bold text-[#D4AF37]">
                Ancient Codex Riddle {stageDIndex + 1} of {STAGE_D_RIDDLES.length}
              </span>
              <span className="font-semibold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                {STAGE_D_RIDDLES[stageDIndex].sourceCodex}
              </span>
            </div>

            <div className="bg-white/10 rounded-2xl p-4 border border-white/15 mb-4">
              <p className="text-sm sm:text-base font-serif text-[#FAF7EE] leading-relaxed">
                &ldquo;{STAGE_D_RIDDLES[stageDIndex].clue}&rdquo;
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {STAGE_D_RIDDLES[stageDIndex].options.map((opt) => {
                const isSelected = stageDSelected === opt;
                const isRight = opt === STAGE_D_RIDDLES[stageDIndex].correctSpice;

                return (
                  <button
                    key={opt}
                    type="button"
                    disabled={!!stageDSelected}
                    onClick={() => handleStageDOption(opt)}
                    className={`p-3.5 rounded-xl border-2 font-bold text-sm transition-all cursor-pointer ${
                      stageDSelected && isRight
                        ? "bg-[#10B981] border-[#10B981] text-white"
                        : stageDSelected && isSelected && !isRight
                        ? "bg-red-900 border-red-500 text-white"
                        : "bg-white/10 hover:bg-white/20 border-white/20 text-white active:scale-95"
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── STAGE E: THE FINAL GRAND SYNTHESIS MATRIX ── */}
        {!isTimeExpired && activeStage === "stage_e" && (
          <div className="bg-[#072820]/80 rounded-3xl p-4 sm:p-6 border-2 border-[#D4AF37] shadow-2xl max-w-4xl mx-auto w-full">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-base font-serif font-black text-[#D4AF37]">
                  The Grand Master Synthesis Tablet
                </h3>
                <p className="text-xs text-white/70">
                  Assemble all five secrets: Photo, Common Name, Botanical Taxa, Plant Part, and Classical Citation.
                </p>
              </div>
              <span className="text-xs font-bold text-[#D4AF37] bg-[#D4AF37]/20 px-3 py-1 rounded-full border border-[#D4AF37]/40">
                {stageEMatchedRows.length} / {STAGE_E_MATRIX.length} Synthesized
              </span>
            </div>

            <div className="flex flex-col gap-2.5">
              {STAGE_E_MATRIX.map((row) => {
                const isDone = stageEMatchedRows.includes(row.id);
                const isSelected = stageESelectedItem?.id === row.id;

                return (
                  <div
                    key={row.id}
                    onClick={() => handleStageERowClick(row)}
                    className={`p-3 rounded-2xl border-2 flex items-center justify-between gap-3 transition-all select-none cursor-pointer ${
                      isDone
                        ? "bg-emerald-950/70 border-emerald-400 text-emerald-100 shadow-md"
                        : isSelected
                        ? "bg-[#D4AF37] border-white text-[#072820] shadow-xl scale-[1.01]"
                        : "bg-white/10 hover:bg-white/15 border-white/20 text-white"
                    }`}
                  >
                    {/* Image Thumbnail */}
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-black shrink-0 border border-white/20">
                      <Image
                        src={row.image}
                        alt={row.spiceName}
                        fill
                        className="object-cover"
                        sizes="50px"
                      />
                    </div>

                    {/* Matrix Properties */}
                    <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      <div>
                        <span className="block font-bold">{row.spiceName}</span>
                        <span className="text-[10px] opacity-80">{row.sanskrit}</span>
                      </div>
                      <div className="hidden sm:block">
                        <span className="block italic">{row.botanical}</span>
                        <span className="text-[10px] opacity-80">Flora Taxon</span>
                      </div>
                      <div>
                        <span className="block font-medium">{row.part}</span>
                        <span className="text-[10px] opacity-80">Organ</span>
                      </div>
                      <div className="hidden sm:block">
                        <span className="block font-semibold text-[#D4AF37]">{row.sourceText}</span>
                        <span className="text-[10px] opacity-80">Classical Codex</span>
                      </div>
                    </div>

                    {/* Status Pill */}
                    {isDone ? (
                      <span className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold bg-white/10 px-2.5 py-1 rounded-full text-white/80">
                        Synthesize
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
