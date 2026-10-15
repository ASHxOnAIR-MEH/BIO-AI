"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { getArogyamithranAsset } from "@/lib/kioskAssets";

export type ArogyamithranMascotExpression =
  | "welcoming"
  | "namaskaram"
  | "explaining"
  | "thinking"
  | "correct"
  | "incorrect"
  | "encouraging"
  | "final"
  | "celebration"
  | "holding_plant"
  | "holding_spice"
  | "reading_tablet"
  | "pointing"
  | "neutral";

export type MascotSize = "sm" | "md" | "lg" | "xl" | "hero";

interface ArogyamithranMascotProps {
  expression?: ArogyamithranMascotExpression | string;
  size?: MascotSize;
  className?: string;
  language?: "en" | "ml" | null;
  dialogue?: string;
  supportingText?: string;
  showDialogue?: boolean;
  priority?: boolean;
}

export default function ArogyamithranMascot({
  expression = "welcoming",
  size = "md",
  className = "",
  language = "en",
  dialogue,
  supportingText,
  showDialogue = true,
  priority = false,
}: ArogyamithranMascotProps) {
  const isMl = language === "ml";
  const asset = getArogyamithranAsset(expression);

  // Size styling for avatar pedestal and character illustration
  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return {
          container: "w-28 h-36 sm:w-32 sm:h-40",
          imgW: 128,
          imgH: 160,
          rounded: "rounded-2xl",
        };
      case "md":
        return {
          container: "w-44 h-56 sm:w-52 sm:h-64",
          imgW: 208,
          imgH: 260,
          rounded: "rounded-3xl",
        };
      case "lg":
        return {
          container: "w-56 h-72 sm:w-64 sm:h-80 md:w-72 md:h-96",
          imgW: 288,
          imgH: 384,
          rounded: "rounded-3xl",
        };
      case "xl":
        return {
          container: "w-64 h-80 sm:w-80 sm:h-[420px] md:w-96 md:h-[480px]",
          imgW: 384,
          imgH: 480,
          rounded: "rounded-[32px]",
        };
      case "hero":
        return {
          container: "w-72 h-96 sm:w-96 sm:h-[480px] md:w-[420px] md:h-[540px]",
          imgW: 420,
          imgH: 540,
          rounded: "rounded-[36px]",
        };
      default:
        return {
          container: "w-48 h-60 sm:w-56 sm:h-72",
          imgW: 224,
          imgH: 288,
          rounded: "rounded-3xl",
        };
    }
  };

  const dim = getSizeStyles();

  // Status badge config based on expression
  const getBadgeInfo = () => {
    switch (expression) {
      case "correct":
        return {
          dotBg: "bg-[#55B96A]",
          labelEn: "Correct Answer!",
          labelMl: "ശരിയുത്തരം!",
        };
      case "incorrect":
      case "encouraging":
        return {
          dotBg: "bg-[#D97706]",
          labelEn: "Encouraging Sage",
          labelMl: "പുതിയൊരു അറിവ്",
        };
      case "thinking":
        return {
          dotBg: "bg-[#0B5D46]",
          labelEn: "Exploring Question",
          labelMl: "ചോദ്യം പരിശോധിക്കുന്നു",
        };
      case "final":
      case "celebration":
        return {
          dotBg: "bg-[#D4AF37]",
          labelEn: "Challenge Completed!",
          labelMl: "വിജയകരമായി പൂർത്തിയായി!",
        };
      case "holding_plant":
        return {
          dotBg: "bg-[#55B96A]",
          labelEn: "Flora Wisdom",
          labelMl: "സസ്യജ്ഞാനം",
        };
      case "holding_spice":
        return {
          dotBg: "bg-[#D97706]",
          labelEn: "Spice Heritage",
          labelMl: "സുഗന്ധ പാരമ്പര്യം",
        };
      case "reading_tablet":
        return {
          dotBg: "bg-[#0B5D46]",
          labelEn: "Bio-AI Analytics",
          labelMl: "ബയോ-എഐ ഡാറ്റ",
        };
      default:
        return {
          dotBg: "bg-[#55B96A]",
          labelEn: "Bio-AI Guide",
          labelMl: "ബയോ-എഐ ഗൈഡ്",
        };
    }
  };

  const badge = getBadgeInfo();

  return (
    <div className={`relative flex flex-col items-center text-center ${className}`}>
      {/* Botanical aura glow behind character */}
      <div
        className="absolute inset-0 pointer-events-none -z-10 rounded-full blur-3xl opacity-35"
        style={{
          background:
            expression === "correct"
              ? "radial-gradient(circle, rgba(85, 185, 106, 0.4) 0%, rgba(212, 175, 55, 0.25) 45%, transparent 70%)"
              : expression === "celebration" || expression === "final"
              ? "radial-gradient(circle, rgba(212, 175, 55, 0.45) 0%, rgba(11, 93, 70, 0.3) 45%, transparent 70%)"
              : "radial-gradient(circle, rgba(85, 185, 106, 0.35) 0%, rgba(11, 93, 70, 0.2) 50%, transparent 70%)",
        }}
      />

      {/* ─── 3D CARTOON CHARACTER FRAME WITH KERALA KASAVU ACCENTS ───────── */}
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
          {/* Kerala Kasavu Gold & Emerald Header Trim */}
          <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-[#0B5D46] via-[#D4AF37] to-[#0B5D46] z-20" />

          {/* Master 3D-Cartoon Character Asset */}
          <div className="relative w-full h-full flex items-end justify-center z-10 pt-2">
            <Image
              src={asset.path}
              alt={isMl ? asset.altTextMl : asset.altTextEn}
              width={dim.imgW}
              height={dim.imgH}
              priority={priority}
              className="w-auto h-full object-contain object-bottom drop-shadow-[0_10px_20px_rgba(7,59,48,0.2)] select-none pointer-events-none"
            />
          </div>

          {/* Active Status Beacon */}
          <span className="absolute top-3 right-3 flex h-3.5 w-3.5 z-30">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${badge.dotBg} opacity-75`} />
            <span className={`relative inline-flex rounded-full h-3.5 w-3.5 ${badge.dotBg} border-2 border-white`} />
          </span>

          {/* Kerala Kasavu Bottom Trim */}
          <div className="absolute inset-x-0 bottom-0 h-1 bg-[#0B5D46]/20 z-20" />
        </div>

        {/* Character Title / Badge Below Frame */}
        <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/90 border border-[#0B5D46]/20 shadow-xs">
          <span className={`w-2 h-2 rounded-full ${badge.dotBg}`} />
          <span className="text-[11px] sm:text-xs font-bold text-[#073B30] uppercase tracking-wide">
            {isMl ? badge.labelMl : badge.labelEn}
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
              <span>
                {isMl ? "ആരോഗ്യ മിത്രൻ സംസാരിക്കുന്നു" : "Arogyamithran Speaks"}
              </span>
            </div>

            <p
              className={`text-lg sm:text-xl font-bold text-[#073B30] leading-snug mb-2 ${
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
