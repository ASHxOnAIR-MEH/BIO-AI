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
          1. KERALA STARTUP MISSION DIGITAL HUB KOCHI CAMPUS BACKGROUND
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/assets/kiosk/backgrounds/digital-hub.jpg"
          alt="Kerala Startup Mission Digital Hub Kochi campus"
          fill
          priority
          className="object-cover object-center select-none"
          sizes="100vw"
        />

        {/* Directional gradient: darker on left behind text */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#052A22]/95 via-[#052A22]/75 to-[#052A22]/30 max-w-[70%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#052A22]/80 via-transparent to-transparent sm:hidden" />

        {/* Smooth fade to pale mint at bottom into the navigation cards section */}
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-b from-transparent to-[#F0F7F2]" />
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          2. CANONICAL AROGYAMITHRAN CHARACTER (Right Side)
          - High-resolution transparent PNG with genuine alpha cutout
          - Tightly cropped to eliminate dead padding, occupying 88-92% of height
          - Soft botanical aura glow behind character
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="absolute right-1 sm:right-4 md:right-8 bottom-0 top-2 sm:top-4 w-[46%] sm:w-[48%] max-w-[380px] flex items-end justify-center pointer-events-none z-10">
        {/* Botanical aura glow behind character */}
        <div
          className="absolute inset-x-2 bottom-4 top-8 rounded-full blur-3xl opacity-45 pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(85, 185, 106, 0.45) 0%, rgba(212, 175, 55, 0.25) 50%, transparent 70%)"
          }}
        />

        {/* Floating/breathing motion */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-full h-full max-h-[390px] sm:max-h-[450px] flex items-end justify-center"
        >
          <Image
            src="/assets/kiosk/arogyamithran/arogyamithran-transparent.png"
            alt="Arogyamithran welcoming guide with glowing tablet and Kasavu attire"
            fill
            priority
            className="object-contain object-bottom drop-shadow-[0_12px_28px_rgba(5,42,34,0.35)] select-none"
            sizes="(max-width: 640px) 220px, 380px"
          />

          {/* Active Status Beacon */}
          <span className="absolute top-4 right-6 sm:right-8 flex h-3.5 w-3.5 z-20">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#55B96A] opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#55B96A] border-2 border-white" />
          </span>
        </motion.div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          3. HERO TEXT CONTENT (Left aligned)
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 w-full pt-4 sm:pt-7 px-4 sm:px-7 pb-6 sm:pb-8 flex flex-col justify-center max-w-[60%] sm:max-w-[56%]">
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
