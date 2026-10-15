"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import KioskSubHeader from "@/components/kiosk/KioskSubHeader";
import { useArogyamithranLanguage } from "@/components/kiosk/ArogyamithranContext";
import { KioskLanguage } from "@/components/kiosk/types";

export default function ArogyamithranLanguagePage() {
  const router = useRouter();
  const { setLanguage } = useArogyamithranLanguage();
  const [selected, setSelected] = useState<KioskLanguage | null>(null);

  const handleSelectLanguage = (lang: KioskLanguage) => {
    setSelected(lang);
    setLanguage(lang);

    setTimeout(() => {
      router.push(`/kiosk/arogyamithran/welcome?lang=${lang}`);
    }, 250);
  };

  return (
    <div className="min-h-screen w-full bg-[#F0F7F2] text-[#132E27] relative flex flex-col justify-between items-center selection:bg-[#55B96A]/25 overflow-x-hidden">
      {/* ── MAIN KIOSK CONTAINER (max-w-[820px] portrait kiosk reference) ── */}
      <main className="w-full max-w-[820px] min-h-screen flex flex-col justify-between relative shadow-[0_0_60px_rgba(0,0,0,0.18)] overflow-hidden bg-[#F0F7F2]">
        {/* 1. Header with official KSUM | Kerala IT | Huddle Global branding */}
        <KioskSubHeader
          language={selected || "en"}
          backHref="/kiosk"
          backLabel="Back to Home"
          backLabelMl="പ്രധാന പേജ്"
        />

        {/* 2. Visual Content Area */}
        <div className="relative flex-1 flex flex-col justify-between px-4 sm:px-6 py-3 sm:py-5 overflow-y-auto">
          {/* Background Illustration with Digital Hub, palms and botanical frame */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <Image
              src="/assets/kiosk/backgrounds/hero_portrait.jpg"
              alt="Digital Hub Kochi Bio-AI campus background"
              fill
              priority
              className="object-cover object-top select-none opacity-40"
              sizes="820px"
            />
            {/* Soft gradient wash */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#FAFAF7]/70 via-[#FAFAF7]/85 to-[#FAFAF7]" />
          </div>

          {/* Top Headings */}
          <div className="relative z-10 text-center pt-1 sm:pt-2 max-w-xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl sm:text-3xl md:text-4xl font-black text-[#073B30] tracking-tight leading-tight mb-1"
              style={{ textShadow: "0 1px 8px rgba(255,255,255,0.9)" }}
            >
              Let&apos;s begin your Bio-AI journey!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="text-sm sm:text-base font-semibold text-[#0B5D46]"
              style={{ textShadow: "0 1px 6px rgba(255,255,255,0.9)" }}
            >
              Please choose your language to continue.
            </motion.p>
          </div>

          {/* Arogyamithran Center Mascot matching Screen 1 Storyboard */}
          <div className="relative z-10 w-full flex-1 flex flex-col justify-center items-center py-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="relative w-48 h-56 sm:w-56 sm:h-68 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/90 bg-gradient-to-b from-[#F0F7F1] via-white to-[#FAFAF7]"
            >
              <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-[#0B5D46] via-[#D4AF37] to-[#0B5D46] z-10" />
              <Image
                src="/assets/kiosk/arogyamithran/hero_mascot.jpg"
                alt="Arogyamithran welcoming Bio-AI guide"
                fill
                priority
                className="object-cover object-top select-none"
                sizes="(max-width: 640px) 220px, 280px"
              />
            </motion.div>
          </div>

          {/* Bottom Area: Language Cards + Return Button */}
          <div className="relative z-10 w-full max-w-xl mx-auto flex flex-col items-center gap-4 pb-2">
            {/* Language Selection Grid */}
            <div className="w-full grid grid-cols-2 gap-3.5 sm:gap-5">
              {/* English Card */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelectLanguage("en")}
                className={`relative w-full rounded-2xl sm:rounded-3xl p-4 sm:p-5 text-center flex flex-col items-center justify-center transition-all bg-white border-2 shadow-lg touch-manipulation ${
                  selected === "en"
                    ? "border-[#0B5D46] ring-4 ring-[#55B96A]/30 bg-[#F0F7F1]"
                    : "border-emerald-900/10 hover:border-[#55B96A]"
                }`}
              >
                {/* Circular UK Flag / Language Badge */}
                <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full overflow-hidden shadow-md mb-2 flex items-center justify-center border border-gray-200 bg-white">
                  <svg viewBox="0 0 60 30" className="w-full h-full object-cover">
                    <clipPath id="uk-s">
                      <path d="M0,0 v30 h60 v-30 z"/>
                    </clipPath>
                    <clipPath id="uk-t">
                      <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/>
                    </clipPath>
                    <g clipPath="url(#uk-s)">
                      <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
                      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
                      <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#uk-t)" stroke="#C8102E" strokeWidth="4"/>
                      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
                      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
                    </g>
                  </svg>
                </div>
                <h3 className="text-lg sm:text-2xl font-black text-[#073B30] tracking-tight leading-tight">
                  English
                </h3>
                <p className="text-[11px] sm:text-xs font-semibold text-[#0B5D46]/80 mt-0.5">
                  Continue in English
                </p>
              </motion.button>

              {/* Malayalam Card */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelectLanguage("ml")}
                className={`relative w-full rounded-2xl sm:rounded-3xl p-4 sm:p-5 text-center flex flex-col items-center justify-center transition-all bg-white border-2 shadow-lg touch-manipulation ${
                  selected === "ml"
                    ? "border-[#0B5D46] ring-4 ring-[#55B96A]/30 bg-[#F0F7F1]"
                    : "border-emerald-900/10 hover:border-[#55B96A]"
                }`}
              >
                {/* Circular Kerala Motif Badge */}
                <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full overflow-hidden shadow-md mb-2 flex items-center justify-center border border-[#D4AF37]/50 bg-gradient-to-br from-[#0B5D46] to-[#073B30] text-white">
                  <span className="text-xl sm:text-2xl">🌱</span>
                </div>
                <h3 className="text-lg sm:text-2xl font-black text-[#073B30] tracking-tight leading-tight font-malayalam">
                  മലയാളം
                </h3>
                <p className="text-[11px] sm:text-xs font-semibold text-[#0B5D46]/80 mt-0.5 font-malayalam">
                  മലയാളത്തിൽ തുടരുക
                </p>
              </motion.button>
            </div>

            {/* Back to Home Button */}
            <Link
              href="/kiosk"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-white/90 hover:bg-white text-[#073B30] text-xs font-bold shadow-sm border border-[#0B5D46]/20 transition-all active:scale-95 touch-manipulation"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#55B96A]" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
