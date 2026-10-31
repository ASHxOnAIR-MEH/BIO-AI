"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Sparkles, ArrowRight, Info } from "lucide-react";
import { useSpiceQuest } from "../SpiceQuestContext";
import { LEVEL_1_QUESTIONS, Level1Question } from "@/data/spiceQuestData";
import { SpiceAudio } from "../SpiceAudio";
import VedaGameGuide from "../VedaGameGuide";

export default function Level1SpiceDetective() {
  const { state, completeLevel, recordScoreIncrement, setView } = useSpiceQuest();
  const isMl = state.language === "ml";

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [roundScore, setRoundScore] = useState(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    startTimeRef.current = Date.now();
  }, []);

  const currentQ: Level1Question = LEVEL_1_QUESTIONS[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === LEVEL_1_QUESTIONS.length - 1;

  const handleSelectOption = (option: { label: string; labelMl: string; isCorrect: boolean }) => {
    if (isAnswered) return;

    setSelectedOption(option.label);
    setIsAnswered(true);

    if (option.isCorrect) {
      setIsCorrect(true);
      SpiceAudio.playCorrect();
      recordScoreIncrement(10);
      setRoundScore((prev) => prev + 10);
    } else {
      setIsCorrect(false);
      SpiceAudio.playIncorrect();
    }
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      // Level completed! Award +30 completion bonus
      const timeSpent = startTimeRef.current
        ? Math.round((Date.now() - startTimeRef.current) / 1000)
        : 10;
      completeLevel(1, 30, timeSpent);
      setView("selector");
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setIsCorrect(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-3 sm:py-6 px-3 sm:px-6 flex flex-col gap-4 sm:gap-6">
      {/* ─── 1. LEVEL HEADER & ROUND PROGRESS ─────────────────────────────────── */}
      <div className="flex items-center justify-between bg-white rounded-2xl p-3 sm:p-4 border-2 border-[#0B5D46]/15 shadow-xs">
        <div>
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#10B981] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            {isMl ? "ലെവൽ 1 • വളരെ എളുപ്പം" : "Level 1 • Very Easy"}
          </span>
          <h2 className="text-base sm:text-xl font-black text-[#072820] mt-0.5">
            {isMl ? "സുഗന്ധ ഡിറ്റക്ടീവ്" : "The Spice Detective"}
          </h2>
        </div>

        {/* Round Progress Indicator */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-500">
            {isMl ? "ചോദ്യം: " : "Round: "}
            <strong className="text-[#0B5D46]">{currentQuestionIndex + 1}</strong> / {LEVEL_1_QUESTIONS.length}
          </span>
          <div className="flex items-center gap-1">
            {LEVEL_1_QUESTIONS.map((_, idx) => (
              <span
                key={idx}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  idx < currentQuestionIndex
                    ? "bg-[#10B981]"
                    : idx === currentQuestionIndex
                    ? "bg-[#D4AF37] ring-2 ring-[#D4AF37]/40 scale-125"
                    : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ─── 2. VEDA COMPANION MESSAGE ────────────────────────────────────────── */}
      <VedaGameGuide
        overrideExpression={
          !isAnswered
            ? "curious"
            : isCorrect
            ? "happy"
            : "concerned"
        }
        overrideMessage={
          !isAnswered
            ? currentQ.question
            : isCorrect
            ? currentQ.vedaExplanation
            : "Look closer at the shape, texture and color! Try to think about traditional Kerala spices."
        }
        overrideMessageMl={
          !isAnswered
            ? currentQ.questionMl
            : isCorrect
            ? currentQ.vedaExplanationMl
            : "നിറവും രൂപവും വീണ്ടും ശ്രദ്ധിക്കൂ! കേരളത്തിലെ പ്രധാന സുഗന്ധവ്യഞ്ജനങ്ങളെ ഓർത്തുനോക്കൂ."
        }
      />

      {/* ─── 3. SPICE PHOTOGRAPH & 4 OPTION BUTTONS ────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 bg-white rounded-3xl p-4 sm:p-6 border-2 border-[#0B5D46]/20 shadow-lg">
        {/* Large High-Fidelity Photograph Frame */}
        <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-[#072820] border-2 border-[#D4AF37]/40 shadow-inner flex items-center justify-center group">
          <Image
            src={currentQ.image}
            alt={currentQ.correctAnswer}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 500px"
            priority
          />
          {/* Subtle vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

          {/* Botanical Voucher Badge */}
          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-3 left-3 right-3 bg-[#072820]/90 text-[#FAF7EE] p-3 rounded-xl border border-[#D4AF37]/50 backdrop-blur-md text-xs flex items-center justify-between"
            >
              <div>
                <span className="text-[#D4AF37] font-bold block">{currentQ.correctAnswer}</span>
                <span className="italic text-white/80">{currentQ.botanicalName}</span>
              </div>
              <span className="text-[10px] font-bold bg-white/10 px-2 py-1 rounded-md text-emerald-300">
                {currentQ.family}
              </span>
            </motion.div>
          )}
        </div>

        {/* 4 Interactive Name Option Buttons */}
        <div className="flex flex-col justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-[#072820] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>{isMl ? "ഏതാണ് ഈ സുഗന്ധവ്യഞ്ജനം?" : "Which spice is this?"}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              {currentQ.options.map((opt) => {
                const isThisSelected = selectedOption === opt.label;
                const showSuccess = isAnswered && opt.isCorrect;
                const showWrong = isAnswered && isThisSelected && !opt.isCorrect;

                return (
                  <button
                    key={opt.label}
                    type="button"
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(opt)}
                    className={`p-4 sm:p-5 rounded-2xl border-2 text-left font-bold text-sm sm:text-base flex items-center justify-between transition-all touch-manipulation cursor-pointer ${
                      showSuccess
                        ? "bg-[#10B981] text-white border-[#059669] shadow-md ring-4 ring-[#10B981]/25 scale-[1.02]"
                        : showWrong
                        ? "bg-red-50 text-red-700 border-red-400 shake"
                        : isThisSelected
                        ? "bg-[#D4AF37]/20 border-[#D4AF37] text-[#072820]"
                        : "bg-[#FAFAF7] hover:bg-white border-gray-200 text-[#072820] hover:border-[#D4AF37] shadow-xs active:scale-98"
                    }`}
                  >
                    <div>
                      <span className="block">{isMl ? opt.labelMl : opt.label}</span>
                      {isMl && <span className="text-xs font-normal opacity-75">{opt.label}</span>}
                    </div>

                    {showSuccess && <CheckCircle2 className="w-5 h-5 text-white shrink-0" />}
                    {showWrong && <XCircle className="w-5 h-5 text-red-600 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Row After Answering */}
          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                {isCorrect ? (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>+10 {isMl ? "പോയിന്റ്" : "Points"}!</span>
                  </span>
                ) : (
                  <span className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200 flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-amber-600" />
                    <span>{isMl ? "ശരിയുത്തരം: " : "Correct: "} {isMl ? currentQ.correctAnswerMl : currentQ.correctAnswer}</span>
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={handleNextQuestion}
                className="px-6 py-3 rounded-full bg-[#0B5D46] hover:bg-[#073B30] text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-md active:scale-95 transition-all touch-manipulation cursor-pointer"
              >
                <span>
                  {isLastQuestion
                    ? isMl
                      ? "ലെവൽ പൂർത്തിയാക്കൂ"
                      : "Complete Level"
                    : isMl
                    ? "അടുത്ത ചോദ്യം"
                    : "Next Spice"}
                </span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
