"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export type VedaExpression =
  | "neutral"
  | "welcome"
  | "happy"
  | "thinking"
  | "explaining"
  | "curious"
  | "celebrating"
  | "concerned"
  // Common aliases for quiz compatibility
  | "correct"
  | "incorrect"
  | "encouraging"
  | "final"
  | "holding_plant"
  | "holding_spice"
  | "reading_tablet"
  | "pointing"
  | "welcoming"
  | "namaskaram";

export type VedaSize = "sm" | "md" | "lg" | "xl" | "hero";

interface VedaGuideProps {
  expression?: VedaExpression | string;
  size?: VedaSize;
  className?: string;
  language?: "en" | "ml" | null;
  dialogue?: string;
  supportingText?: string;
  showDialogue?: boolean;
  priority?: boolean;
  image?: string;
}

export default function VedaGuide({
  expression = "welcome",
  size = "md",
  className = "",
  language = "en",
  dialogue,
  supportingText,
  showDialogue = true,
  priority = false,
  image,
}: VedaGuideProps) {
  const isMl = language === "ml";

  // Map expressions to image assets and badge configurations
  const getExpressionData = () => {
    switch (expression) {
      case "welcome":
      case "welcoming":
      case "namaskaram":
        return {
          path: "/images/veda/veda-welcome.png",
          fullScene: "/images/veda/01-young-ayurveda-researcher-guide.jpg",
          dotBg: "bg-[#55B96A]",
          labelEn: "Research Guide",
          labelMl: "ഗവേഷണ ഗൈഡ്",
          aura: "rgba(85, 185, 106, 0.4)",
        };
      case "happy":
      case "correct":
        return {
          path: "/images/veda/veda-happy.png",
          fullScene: "/images/veda/02-spice-garden-researcher.jpg",
          dotBg: "bg-[#55B96A]",
          labelEn: "Correct Insight!",
          labelMl: "ശരിയുത്തരം!",
          aura: "rgba(85, 185, 106, 0.5)",
        };
      case "thinking":
        return {
          path: "/images/veda/veda-thinking.png",
          fullScene: "/images/veda/03-classical-manuscript-researcher.jpg",
          dotBg: "bg-[#0B5D46]",
          labelEn: "Analyzing Sources",
          labelMl: "വിവരങ്ങൾ പരിശോധിക്കുന്നു",
          aura: "rgba(11, 93, 70, 0.35)",
        };
      case "explaining":
        return {
          path: "/images/veda/veda-explaining.png",
          fullScene: "/images/veda/03-classical-manuscript-researcher.jpg",
          dotBg: "bg-[#0B5D46]",
          labelEn: "Explaining Discovery",
          labelMl: "വിശദീകരിക്കുന്നു",
          aura: "rgba(11, 93, 70, 0.35)",
        };
      case "curious":
        return {
          path: "/images/veda/veda-curious.png",
          fullScene: "/images/veda/08-medicinal-plant-field-research.jpg",
          dotBg: "bg-[#D4AF37]",
          labelEn: "Botanical Curiosity",
          labelMl: "സസ്യകൗതുകം",
          aura: "rgba(212, 175, 55, 0.4)",
        };
      case "celebrating":
      case "final":
        return {
          path: "/images/veda/veda-celebrating.png",
          fullScene: "/images/veda/05-heritage-journey.jpg",
          dotBg: "bg-[#D4AF37]",
          labelEn: "Milestone Achieved!",
          labelMl: "വിജയകരമായ നേട്ടം!",
          aura: "rgba(212, 175, 55, 0.5)",
        };
      case "concerned":
      case "incorrect":
      case "encouraging":
        return {
          path: "/images/veda/veda-concerned.png",
          fullScene: "/images/veda/09-ayurveda-laboratory-research.jpg",
          dotBg: "bg-[#D97706]",
          labelEn: "Evidence Analysis",
          labelMl: "തെളിവുകൾ പുനഃപരിശോധിക്കുക",
          aura: "rgba(217, 119, 6, 0.4)",
        };
      case "neutral":
      default:
        return {
          path: "/images/veda/veda-neutral.png",
          fullScene: "/images/veda/01-young-ayurveda-researcher-guide.jpg",
          dotBg: "bg-[#55B96A]",
          labelEn: "Ayurveda Researcher",
          labelMl: "ആയുർവേദ ഗവേഷക",
          aura: "rgba(85, 185, 106, 0.35)",
        };
    }
  };

  const exp = getExpressionData();
  const assetPath = image || exp.fullScene;

  // Frame dimension styling
  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return {
          container: "w-36 h-48 sm:w-44 sm:h-56",
          imgW: 176,
          imgH: 224,
          rounded: "rounded-2xl",
        };
      case "md":
        return {
          container: "w-52 h-68 sm:w-64 sm:h-80",
          imgW: 256,
          imgH: 320,
          rounded: "rounded-3xl",
        };
      case "lg":
        return {
          container: "w-64 h-84 sm:w-80 sm:h-[400px] md:w-88 md:h-[440px]",
          imgW: 352,
          imgH: 440,
          rounded: "rounded-3xl",
        };
      case "xl":
        return {
          container: "w-72 h-96 sm:w-92 sm:h-[460px] md:w-[420px] md:h-[520px]",
          imgW: 420,
          imgH: 520,
          rounded: "rounded-[32px]",
        };
      case "hero":
        return {
          container: "w-80 h-[420px] sm:w-[420px] sm:h-[520px] md:w-[480px] md:h-[580px]",
          imgW: 480,
          imgH: 580,
          rounded: "rounded-[36px]",
        };
      default:
        return {
          container: "w-52 h-68 sm:w-64 sm:h-80",
          imgW: 256,
          imgH: 320,
          rounded: "rounded-3xl",
        };
    }
  };

  const dim = getSizeStyles();

  return (
    <div className={`relative flex flex-col items-center text-center ${className}`}>
      {/* Botanical aura glow behind character */}
      <div
        className="absolute inset-0 pointer-events-none -z-10 rounded-full blur-3xl opacity-40 transition-colors duration-500"
        style={{
          background: `radial-gradient(circle, ${exp.aura} 0%, rgba(7, 59, 48, 0.2) 50%, transparent 70%)`,
        }}
      />

      {/* ─── VEDA RESEARCHER CHARACTER CARD FRAME ───────────────────────── */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative group cursor-default"
      >
        <div
          className={`relative ${dim.container} ${dim.rounded} overflow-hidden bg-gradient-to-b from-[#F0F7F1]/90 via-white to-[#FAFAF7] border-2 border-[#0B5D46]/25 shadow-[0_18px_45px_rgba(7,59,48,0.15)] flex flex-col items-center justify-end p-1 transition-all duration-300 group-hover:shadow-[0_22px_55px_rgba(11,93,70,0.22)]`}
        >
          {/* Header Botanical Gold & Emerald Accent */}
          <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-[#0B5D46] via-[#D4AF37] to-[#0B5D46] z-20" />

          {/* VEDA Researcher Artwork */}
          <div className="relative w-full h-full flex items-center justify-center z-10 overflow-hidden rounded-2xl">
            <Image
              src={assetPath}
              alt="Veda, Young Ayurveda Researcher & Digital Heritage Guide"
              fill
              priority={priority}
              className="object-cover object-center drop-shadow-sm select-none pointer-events-none group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 256px, 480px"
            />
          </div>

          {/* Active Status Beacon */}
          <span className="absolute top-3 right-3 flex h-3.5 w-3.5 z-30">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${exp.dotBg} opacity-75`} />
            <span className={`relative inline-flex rounded-full h-3.5 w-3.5 ${exp.dotBg} border-2 border-white`} />
          </span>

          {/* Bottom Emerald Trim */}
          <div className="absolute inset-x-0 bottom-0 h-1 bg-[#0B5D46]/20 z-20" />
        </div>

        {/* Character Title / Badge Below Frame */}
        <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/95 border border-[#0B5D46]/20 shadow-xs backdrop-blur-sm">
          <span className={`w-2 h-2 rounded-full ${exp.dotBg}`} />
          <span className="text-[11px] sm:text-xs font-bold text-[#073B30] uppercase tracking-wide">
            VEDA • {isMl ? exp.labelMl : exp.labelEn}
          </span>
        </div>
      </motion.div>

      {/* ─── SPEECH BUBBLE / DIALOGUE CARD ─────────────────────────────── */}
      {showDialogue && dialogue && (
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="relative mt-5 w-full max-w-xl mx-auto"
        >
          {/* Speech bubble pointer arrow */}
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-5 h-5 bg-white border-t-2 border-l-2 border-[#0B5D46]/20 rotate-45 z-10" />

          {/* Dialogue bubble box */}
          <div className="relative z-20 bg-white rounded-3xl p-5 sm:p-7 border-2 border-[#0B5D46]/20 shadow-[0_10px_35px_rgba(11,93,70,0.1)]">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#F0F7F1] text-[10px] sm:text-xs font-bold text-[#0B5D46] border border-[#0B5D46]/15 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#55B96A]" />
              <span>{isMl ? "വേദ സംസാരിക്കുന്നു" : "Veda Speaks"}</span>
            </div>

            <p
              className={`text-lg sm:text-xl font-bold text-[#072820] leading-snug mb-2 ${
                isMl ? "font-malayalam" : ""
              }`}
            >
              &ldquo;{dialogue}&rdquo;
            </p>

            {supportingText && (
              <p
                className={`text-xs sm:text-sm text-[#244B3F]/85 leading-relaxed mt-2 ${
                  isMl ? "font-malayalam" : ""
                }`}
              >
                {supportingText}
              </p>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
