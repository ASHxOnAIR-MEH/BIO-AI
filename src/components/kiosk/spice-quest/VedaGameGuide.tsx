"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, HelpCircle } from "lucide-react";
import { useSpiceQuest } from "./SpiceQuestContext";
import { VedaGameExpression } from "./types";

interface VedaGameGuideProps {
  compact?: boolean;
  onHintClick?: () => void;
  hintText?: string;
  hintTextMl?: string;
  overrideExpression?: VedaGameExpression;
  overrideMessage?: string;
  overrideMessageMl?: string;
}

export default function VedaGameGuide({
  compact = false,
  onHintClick,
  hintText,
  hintTextMl,
  overrideExpression,
  overrideMessage,
  overrideMessageMl,
}: VedaGameGuideProps) {
  const { state } = useSpiceQuest();
  const [showHintModal, setShowHintModal] = useState(false);
  const isMl = state.language === "ml";

  const expression = overrideExpression || state.vedaDialog.expression;
  const message = (isMl ? overrideMessageMl || state.vedaDialog.messageMl : null) || overrideMessage || state.vedaDialog.message;
  const supporting = isMl ? state.vedaDialog.supportingTextMl : state.vedaDialog.supportingText;
  const hint = (isMl ? hintTextMl || state.vedaDialog.hintTextMl : null) || hintText || state.vedaDialog.hintText;

  const getExpressionAsset = (exp: VedaGameExpression) => {
    switch (exp) {
      case "welcome":
        return "/images/veda/veda-welcome.png";
      case "curious":
        return "/images/veda/veda-curious.png";
      case "thinking":
        return "/images/veda/veda-thinking.png";
      case "explaining":
        return "/images/veda/veda-explaining.png";
      case "happy":
        return "/images/veda/veda-happy.png";
      case "celebrating":
        return "/images/veda/veda-celebrating.png";
      case "concerned":
        return "/images/veda/veda-concerned.png";
      default:
        return "/images/veda/veda-welcome.png";
    }
  };

  const getStatusLabel = (exp: VedaGameExpression) => {
    switch (exp) {
      case "happy":
        return isMl ? "ശരിയുത്തരം!" : "Correct Insight!";
      case "celebrating":
        return isMl ? "വിജയം!" : "Level Conquered!";
      case "concerned":
        return isMl ? "വീണ്ടും ചിന്തിക്കൂ" : "Research Hint";
      case "thinking":
        return isMl ? "സൂക്ഷ്മ നിരീക്ഷണം" : "Analyzing Evidence";
      case "explaining":
        return isMl ? "ശാസ്ത്രീയ വിശദീകരണം" : "Botanical Fact";
      case "curious":
        return isMl ? "സസ്യ രഹസ്യം" : "Botanical Mystery";
      case "welcome":
      default:
        return isMl ? "ആയുർവേദ ഗവേഷക" : "Ayurveda Research Guide";
    }
  };

  const assetPath = getExpressionAsset(expression);

  return (
    <div className="w-full">
      <div className="bg-[#FAF7EE] border-2 border-[#D4AF37]/40 rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-md relative overflow-hidden transition-all">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-start gap-3 sm:gap-4 relative z-10">
          {/* VEDA Character Avatar (Transparent PNG with subtle breathing motion) */}
          <div className="relative shrink-0 flex flex-col items-center">
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-16 h-20 sm:w-20 sm:h-24 rounded-2xl bg-gradient-to-b from-[#0B5D46]/10 to-[#D4AF37]/20 border border-[#0B5D46]/20 p-1 flex items-end justify-center shadow-inner overflow-hidden"
            >
              <Image
                src={assetPath}
                alt="Veda Ayurveda Guide"
                width={80}
                height={96}
                className="object-contain max-h-full drop-shadow-md select-none pointer-events-none"
                priority
              />
            </motion.div>

            {/* Guide Name Pill */}
            <span className="mt-1 px-2 py-0.5 rounded-full bg-[#072820] text-[#D4AF37] text-[9px] sm:text-[10px] font-black uppercase tracking-wider">
              VEDA
            </span>
          </div>

          {/* Dialogue & Fact Content */}
          <div className="flex-1 min-w-0">
            {/* Status & Hint Bar */}
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0B5D46]/10 text-[#072820] text-[10px] sm:text-xs font-bold border border-[#0B5D46]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                <span>{getStatusLabel(expression)}</span>
              </span>

              {/* Optional Hint Button */}
              {hint && (
                <button
                  type="button"
                  onClick={() => setShowHintModal((prev) => !prev)}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 hover:bg-[#D4AF37]/35 text-[#072820] text-[10px] sm:text-xs font-bold border border-[#D4AF37]/50 active:scale-95 transition-all touch-manipulation cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-[#B45309]" />
                  <span>{showHintModal ? (isMl ? "മറയ്ക്കൂ" : "Hide Hint") : (isMl ? "സൂചന" : "Hint")}</span>
                </button>
              )}
            </div>

            {/* Main Dialogue Speech */}
            <motion.p
              key={message}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-xs sm:text-sm font-semibold text-[#072820] leading-snug"
            >
              &ldquo;{message}&rdquo;
            </motion.p>

            {/* Supporting Information / Textual Reference */}
            {supporting && (
              <p className="mt-1 text-[11px] sm:text-xs text-[#244B3F]/85 leading-relaxed font-normal">
                {supporting}
              </p>
            )}

            {/* Expandable Hint Box */}
            <AnimatePresence>
              {showHintModal && hint && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-2 p-2.5 bg-amber-50 rounded-xl border border-amber-300 text-[11px] sm:text-xs text-amber-900 shadow-xs flex items-start gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">{isMl ? "വേദയുടെ സൂചന: " : "Veda's Clue: "}</span>
                    <span>{hint}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
