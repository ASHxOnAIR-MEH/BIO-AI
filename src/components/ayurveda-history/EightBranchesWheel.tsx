"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EIGHT_BRANCHES_DATA, EightBranchInfo } from "@/data/ayurvedaHistoryData";
import {
  Compass,
  Sparkles,
  BookOpen,
  ChevronRight,
  X,
  Cpu,
  Quote,
  ShieldCheck,
} from "lucide-react";

interface EightBranchesWheelProps {
  onClose?: () => void;
  isModal?: boolean;
  isMalayalam?: boolean;
}

export default function EightBranchesWheel({
  onClose,
  isModal = false,
  isMalayalam = false,
}: EightBranchesWheelProps) {
  const [selectedBranch, setSelectedBranch] = useState<EightBranchInfo>(
    EIGHT_BRANCHES_DATA[0]
  );

  return (
    <div
      className={`relative w-full ${
        isModal
          ? "fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
          : "py-12 sm:py-16 bg-[#FAF7EE] text-[#072820]"
      }`}
    >
      <div
        className={`relative w-full max-w-5xl bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#D4AF37]/50 shadow-2xl overflow-hidden ${
          isModal ? "max-h-[92vh] overflow-y-auto" : ""
        }`}
      >
        {/* Close Button (if in modal mode) */}
        {isModal && onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition-all active:scale-90 z-20"
            aria-label="Close eight-branch wheel"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* ─── HEADER ─── */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B5D46]/10 border border-[#0B5D46]/20 text-[#0B5D46] text-xs font-bold tracking-wider uppercase mb-2">
            <Compass className="w-3.5 h-3.5 text-[#0B5D46]" />
            <span>{isMalayalam ? "അഷ്ടാംഗ ആയുർവേദം" : "Ashtanga Ayurveda Mandala"}</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#072820] tracking-tight">
            {isMalayalam
              ? "എട്ട് ചികിത്സാ ശാഖകളുടെ ജ്ഞാനചക്രം"
              : "The Eight Branches of Classical Medicine"}
          </h2>

          <p className="text-xs sm:text-sm text-[#244B3F]/85 mt-2 font-sans leading-relaxed">
            {isMalayalam
              ? "ആചാര്യ വാഗ്ഭടൻ അഷ്ടാംഗഹൃദയത്തിൽ ചിട്ടപ്പെടുത്തിയ എട്ട് വിശിഷ്ട ചികിത്സാ ശാഖകൾ. ഓരോ ശാഖയിലും സ്പർശിച്ച് ശ്ലോകവും ആധുനിക ബയോ-എഐ ബന്ധവും അറിയൂ."
              : "Master Vagbhata unified classical medicine into eight distinct specialized disciplines. Touch any petal of the wheel to inspect classical scope, foundational sutras, and contemporary Bio-AI links."}
          </p>
        </div>

        {/* ─── MAIN CONTENT: 8-PETAL WHEEL GRID + DETAIL DOSSIER ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ─── LEFT: 8-BRANCH INTERACTIVE SELECTION DIAL (5 COLS) ─── */}
          <div className="lg:col-span-5 flex flex-col gap-2.5">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0B5D46] mb-1">
              {isMalayalam ? "ശാഖ തിരഞ്ഞെടുക്കൂ (1 - 8):" : "Select a Branch (1 to 8):"}
            </span>

            {EIGHT_BRANCHES_DATA.map((branch) => {
              const isSelected = selectedBranch.branchNumber === branch.branchNumber;

              return (
                <button
                  key={branch.branchNumber}
                  type="button"
                  onClick={() => setSelectedBranch(branch)}
                  className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border-2 transition-all flex items-center justify-between touch-manipulation active:scale-[0.985] ${
                    isSelected
                      ? "bg-gradient-to-r from-[#072820] to-[#0B5D46] text-[#FAF7EE] border-[#D4AF37] shadow-md"
                      : "bg-[#FAF7EE]/60 hover:bg-[#FAF7EE] text-[#072820] border-[#0B5D46]/10 hover:border-[#D4AF37]/50"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold shrink-0 ${
                        isSelected
                          ? "bg-[#D4AF37] text-[#072820]"
                          : "bg-[#0B5D46]/15 text-[#0B5D46]"
                      }`}
                    >
                      0{branch.branchNumber}
                    </span>
                    <div className="min-w-0 truncate">
                      <p className="font-serif font-bold text-sm sm:text-base leading-tight truncate">
                        {branch.name}
                      </p>
                      <p
                        className={`text-[11px] truncate ${
                          isSelected ? "text-[#E6C665]" : "text-[#244B3F]/70"
                        }`}
                      >
                        {branch.sanskritScript} • {branch.englishTitle}
                      </p>
                    </div>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isSelected ? "text-[#D4AF37] translate-x-1" : "text-gray-400"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* ─── RIGHT: DETAIL DOSSIER FOR SELECTED BRANCH (7 COLS) ─── */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedBranch.branchNumber}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-[#F0F7F1] via-white to-[#FAF7EE] rounded-3xl p-6 sm:p-8 border-2 border-[#0B5D46]/20 shadow-md space-y-6"
              >
                {/* Branch Number & Title */}
                <div className="border-b border-[#0B5D46]/15 pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-3 py-0.5 rounded-full bg-[#D4AF37] text-[#072820] text-xs font-mono font-bold">
                      BRANCH 0{selectedBranch.branchNumber} OF 08
                    </span>
                    <span className="text-xs font-serif font-bold text-[#0B5D46]">
                      {selectedBranch.classicalAuthority}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#072820]">
                    {selectedBranch.name}
                  </h3>
                  <p className="text-sm font-semibold text-[#0B5D46]">
                    {selectedBranch.englishTitle}
                  </p>
                </div>

                {/* Classical Scope */}
                <div>
                  <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-[#072820] mb-1.5 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#0B5D46]" />
                    <span>{isMalayalam ? "ചികിത്സാ പരിധി" : "Classical Scope & Applications"}</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-[#244B3F]/90 leading-relaxed font-sans">
                    {selectedBranch.classicalScope}
                  </p>
                </div>

                {/* Key Conditions Managed */}
                <div>
                  <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-[#072820] mb-2">
                    {isMalayalam ? "ചികിത്സിക്കുന്ന പ്രധാന രോഗങ്ങൾ:" : "Key Conditions Managed:"}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedBranch.keyConditions.map((cond, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full bg-white border border-[#0B5D46]/20 text-[#072820] text-xs font-medium shadow-2xs"
                      >
                        {cond}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Foundational Sutra Inscription */}
                <div className="bg-[#072820] text-[#FAF7EE] rounded-2xl p-5 border border-[#D4AF37]/40 shadow-xs relative">
                  <div className="flex items-center gap-2 mb-2">
                    <Quote className="w-4 h-4 text-[#D4AF37]" />
                    <span className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase tracking-wider">
                      Foundational Shloka • {selectedBranch.foundationalSutra.source}
                    </span>
                  </div>
                  <p className="font-serif text-sm sm:text-base text-[#F4DE97] leading-relaxed mb-2">
                    {selectedBranch.foundationalSutra.sanskrit}
                  </p>
                  <p className="text-xs text-white/80 italic font-sans">
                    &ldquo;{selectedBranch.foundationalSutra.translation}&rdquo;
                  </p>
                </div>

                {/* Contemporary Bio-AI Connection */}
                <div className="bg-[#FAF7EE] rounded-2xl p-4 border border-[#55B96A]/40 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#0B5D46] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <Cpu className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#072820] uppercase tracking-wider">
                      {isMalayalam ? "ആധുനിക ബയോ-എഐ ബന്ധം" : "Modern Bio-AI Integration Frontier"}
                    </h5>
                    <p className="text-xs text-[#244B3F]/85 mt-1 leading-relaxed">
                      {selectedBranch.modernBioAiConnection}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

