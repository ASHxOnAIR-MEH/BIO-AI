"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { KioskLanguage } from "./types";

interface KioskWelcomeProps {
  language: KioskLanguage;
}

export default function KioskWelcome({ language }: KioskWelcomeProps) {
  const isMl = language === "ml";

  return (
    <section className="relative w-full overflow-hidden isolate min-h-[380px] sm:min-h-[440px] md:aspect-[16/9] flex flex-col justify-between">
      {/* ═══════════════════════════════════════════════════════════════════
          CUSTOM 16:9 HERO BACKGROUND:
          - Kerala Startup Mission Digital Hub Kochi building photograph
          - Lush Kerala coconut palm trees framing the tropical sky
          - Arogyamithran character welcoming visitors with tablet in kiosk size
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/assets/kiosk/backgrounds/hero_kiosk_custom.jpg"
          alt="Bio-AI Centre of Excellence at Kerala Startup Mission Digital Hub Kochi with Arogyamithran and coconut palms"
          fill
          priority
          className="object-cover object-[78%_center] sm:object-center select-none"
          sizes="100vw"
        />

        {/* Directional gradient: darker on left behind text, transparent on right so Arogyamithran and building shine */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#052A22]/90 via-[#052A22]/50 to-transparent max-w-[75%]" />

        {/* Smooth fade to pale mint at bottom into the navigation cards section */}
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-b from-transparent to-[#F0F7F2]" />
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          HERO TEXT CONTENT (Left aligned, leaving right side clear for Arogyamithran)
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 w-full pt-4 sm:pt-7 px-4 sm:px-7 pb-6 sm:pb-8 flex flex-col justify-center max-w-[62%] sm:max-w-[54%]">
        {/* Main title BIO-AI */}
        <motion.h1
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="font-black text-[#FAFAF7] tracking-tight leading-none mb-1 text-[clamp(2.2rem,7.5vw,3.4rem)]"
          style={{ textShadow: "0 2px 14px rgba(5,42,34,0.95), 0 1px 3px rgba(5,42,34,1)" }}
        >
          {isMl ? "ബയോ-എഐ" : "BIO-AI"}
        </motion.h1>

        {/* CENTRE OF EXCELLENCE */}
        <motion.h2
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.06 }}
          className="font-black text-[#FAFAF7] tracking-tight uppercase leading-tight mb-2 text-[clamp(0.85rem,2.8vw,1.35rem)]"
          style={{ textShadow: "0 2px 10px rgba(5,42,34,0.9), 0 1px 3px rgba(5,42,34,1)" }}
        >
          {isMl ? "സെന്റർ ഓഫ് എക്സലൻസ്" : "CENTRE OF EXCELLENCE"}
        </motion.h2>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.12 }}
          className="font-semibold text-[#DDEFE3] leading-snug mb-3 text-[clamp(0.78rem,2vw,1.05rem)]"
          style={{ textShadow: "0 1px 8px rgba(5,42,34,0.9)" }}
        >
          {isMl
            ? "ജീവശാസ്ത്രവും നിർമ്മിതബുദ്ധിയും ഒത്തുചേരുമ്പോൾ"
            : "Where Biology Meets Artificial Intelligence"}
        </motion.p>

        {/* Description card */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.18 }}
          className="bg-[#052A22]/70 backdrop-blur-md rounded-xl border border-white/20 p-2.5 sm:p-3.5 shadow-xl max-w-full"
        >
          <p className="text-white/95 font-medium leading-relaxed text-[clamp(0.72rem,1.7vw,0.88rem)]">
            {isMl
              ? "ബയോടെക്നോളജി, ആയുർവേദം, ലൈഫ് സയൻസസ്, നിർമ്മിതബുദ്ധി — ആരോഗ്യകരവും സുസ്ഥിരവുമായ നാളേക്കായി."
              : "Explore biotechnology, Ayurveda, life sciences and AI to discover ideas shaping a healthier, more sustainable future."}
          </p>
        </motion.div>
      </div>

      {/* ── SMOOTH TRANSITION BAND INTO CARD SECTION ──────────────────────── */}
      <div className="h-2 bg-[#F0F7F2]" />
    </section>
  );
}
