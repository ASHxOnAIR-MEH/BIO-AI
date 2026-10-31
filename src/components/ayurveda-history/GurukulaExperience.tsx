"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { GURUKULA_STAGES_DATA } from "@/data/ayurvedaHistoryData";
import {
  BookOpen,
  Sprout,
  UserCheck,
  CheckCircle2,
  Sparkles,
  ChevronRight,
} from "lucide-react";

interface GurukulaExperienceProps {
  onCompleteGurukula: () => void;
  isMalayalam?: boolean;
}

export default function GurukulaExperience({
  onCompleteGurukula,
  isMalayalam = false,
}: GurukulaExperienceProps) {
  const [activeStageNumber, setActiveStageNumber] = useState<number>(1);
  const [completedStages, setCompletedStages] = useState<number[]>([]);
  const [stageExerciseDone, setStageExerciseDone] = useState<{ [key: number]: boolean }>({});

  const activeStage =
    GURUKULA_STAGES_DATA.find((s) => s.stageNumber === activeStageNumber) ||
    GURUKULA_STAGES_DATA[0];

  const handleCompleteCurrentStage = () => {
    if (!completedStages.includes(activeStageNumber)) {
      setCompletedStages((prev) => [...prev, activeStageNumber]);
    }
    setStageExerciseDone((prev) => ({ ...prev, [activeStageNumber]: true }));

    if (activeStageNumber < 3) {
      setActiveStageNumber(activeStageNumber + 1);
    } else {
      onCompleteGurukula();
    }
  };

  const getStageIcon = (num: number) => {
    switch (num) {
      case 1:
        return <BookOpen className="w-5 h-5 text-[#D4AF37]" />;
      case 2:
        return <Sprout className="w-5 h-5 text-[#55B96A]" />;
      case 3:
        return <UserCheck className="w-5 h-5 text-[#D4AF37]" />;
      default:
        return <BookOpen className="w-5 h-5" />;
    }
  };

  return (
    <div className="w-full bg-gradient-to-br from-[#072820] to-[#0A382C] text-[#FAF7EE] rounded-3xl p-6 sm:p-10 border-2 border-[#D4AF37]/50 shadow-2xl relative overflow-hidden select-none">
      {/* Background Ornament */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#D4AF37]/10 blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isMalayalam ? "ഗുരുകുല വിദ്യാഭ്യാസം" : "Traditional Gurukula Simulator"}</span>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
          {isMalayalam ? "അഷ്ടവൈദ്യ ഗുരുകുല പഠനരീതി" : "The Three-Stage Gurukula Journey"}
        </h3>
        <p className="text-xs sm:text-sm text-white/80 mt-2 font-sans leading-relaxed">
          {isMalayalam
            ? "അഷ്ടവൈദ്യ കുടുംബങ്ങളിലെ വൈദ്യശിക്ഷണത്തിന്റെ മൂന്ന് സുപ്രധാന ഘട്ടങ്ങൾ വേദയോടൊപ്പം അനുഭവിച്ചറിയൂ."
            : "Walk in the footsteps of a 17th-century Kerala medical apprentice across text memorisation, Nila Valley plant identification, and clinical bedside care under elder masters."}
        </p>
      </div>

      {/* ─── 3-STAGE PROGRESS STEPPER ─── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
        {GURUKULA_STAGES_DATA.map((stage) => {
          const isActive = stage.stageNumber === activeStageNumber;
          const isDone = completedStages.includes(stage.stageNumber);

          return (
            <button
              key={stage.stageNumber}
              type="button"
              onClick={() => setActiveStageNumber(stage.stageNumber)}
              className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between touch-manipulation active:scale-[0.99] ${
                isActive
                  ? "bg-[#D4AF37] text-[#072820] border-white shadow-md font-bold"
                  : isDone
                  ? "bg-white/15 text-white border-[#55B96A]/60"
                  : "bg-white/5 text-white/70 border-white/10 hover:bg-white/10"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    isActive ? "bg-[#072820]" : "bg-black/20"
                  }`}
                >
                  {getStageIcon(stage.stageNumber)}
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase block opacity-80">
                    STAGE 0{stage.stageNumber} • {stage.durationApprox}
                  </span>
                  <p className="font-serif text-sm leading-tight">
                    {isMalayalam ? stage.titleMl : stage.title}
                  </p>
                </div>
              </div>

              {isDone && <CheckCircle2 className={`w-5 h-5 ${isActive ? "text-[#072820]" : "text-[#55B96A]"}`} />}
            </button>
          );
        })}
      </div>

      {/* ─── ACTIVE STAGE IMMERSIVE CARD ─── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStage.stageNumber}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="bg-white/10 rounded-3xl p-6 sm:p-8 border border-white/15 backdrop-blur-md space-y-6"
        >
          {/* Stage Subtitle & Sanskrit Term */}
          <div className="border-b border-white/10 pb-4 flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-xs font-serif font-bold text-[#E6C665]">
                {activeStage.sanskritTerm}
              </span>
              <h4 className="font-serif text-xl sm:text-2xl font-bold text-white mt-0.5">
                {activeStage.subtitle}
              </h4>
            </div>

            <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/10 text-white/90">
              Typical Period: {activeStage.durationApprox}
            </span>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-sans">
            {activeStage.description}
          </p>

          {/* VEDA Guide Note */}
          <div className="bg-[#052A22]/80 rounded-2xl p-4 border border-[#55B96A]/40 flex items-start gap-3.5">
            <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-[#D4AF37] shrink-0">
              <Image
                src="/images/veda/veda-avatar.png"
                alt="Veda Guide"
                fill
                className="object-cover object-center"
                sizes="44px"
              />
            </div>
            <div>
              <span className="text-[11px] font-mono font-bold text-[#55B96A] uppercase block">
                VEDA&apos;S RESEARCH FIELD NOTE
              </span>
              <p className="text-xs sm:text-sm text-white/95 italic mt-0.5 leading-relaxed font-serif">
                {activeStage.stageNumber === 1
                  ? "“In the ancient Ashtavaidya system, no student was allowed near clinical preparations until all 7,120 verses of the Ashtanga Hridaya were committed flawlessly to musical memory.”"
                  : activeStage.stageNumber === 2
                  ? "“Look at how students explored the Bharathapuzha (Nila) river banks and Silent Valley forests. They verified plants in seasonal phases, observing soil, aroma and active potency.”"
                  : "“Bedside apprenticeship took upwards of twelve years. Students watched the elder Vaidya read the pulse (Nadi), examine tongue and eyes, and compound tailored tailams.”"}
              </p>
            </div>
          </div>

          {/* Dual Columns: Learning Methods & Practical Exercises */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black/20 rounded-2xl p-4 border border-white/10">
              <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-[#E6C665] mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Core Methods of Instruction</span>
              </h5>
              <ul className="space-y-2 text-xs text-white/80">
                {activeStage.learningMethods.map((m, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#D4AF37]">•</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-black/20 rounded-2xl p-4 border border-white/10">
              <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-[#55B96A] mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Hands-on Apprentice Milestone</span>
              </h5>
              <ul className="space-y-2 text-xs text-white/80">
                {activeStage.practicalExercises.map((e, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#55B96A]">✓</span>
                    <span>{e}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Historical Note from NCBS */}
          <div className="bg-[#D4AF37]/15 rounded-2xl p-4 border border-[#D4AF37]/30 text-xs text-[#FAF7EE] leading-relaxed">
            <span className="font-bold text-[#E6C665] uppercase font-mono block mb-1">
              Historical Context (NCBS Archives):
            </span>
            {activeStage.historicalNotes}
          </div>

          {/* Stage Action Button */}
          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs text-white/60 font-mono">
              Stage {activeStage.stageNumber} of 3
            </span>

            <button
              type="button"
              onClick={handleCompleteCurrentStage}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D4AF37] hover:bg-[#E5C358] text-[#072820] font-serif font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
            >
              <span>
                {stageExerciseDone[activeStage.stageNumber]
                  ? "Stage Mastered — Continue"
                  : activeStage.stageNumber === 3
                  ? "Graduate Gurukula Apprenticeship"
                  : `Master Stage 0${activeStage.stageNumber} ➔`}
              </span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
