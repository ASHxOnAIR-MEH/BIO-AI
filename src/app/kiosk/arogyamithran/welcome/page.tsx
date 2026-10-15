"use client";

import { Suspense, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Trophy, Search, Lightbulb } from "lucide-react";
import KioskSubHeader from "@/components/kiosk/KioskSubHeader";
import { useArogyamithranLanguage } from "@/components/kiosk/ArogyamithranContext";
import { KioskLanguage } from "@/components/kiosk/types";

function WelcomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlLang = searchParams.get("lang") as KioskLanguage | null;
  const { language, setLanguage } = useArogyamithranLanguage();

  const activeLang: KioskLanguage =
    urlLang === "ml" || urlLang === "en"
      ? urlLang
      : language === "ml"
      ? "ml"
      : "en";

  useEffect(() => {
    if (urlLang && (urlLang === "en" || urlLang === "ml") && urlLang !== language) {
      setLanguage(urlLang);
    }
  }, [urlLang, language, setLanguage]);

  const isMl = activeLang === "ml";

  const handleBegin = () => {
    router.push(`/kiosk/arogyamithran/register?lang=${activeLang}`);
  };

  return (
    <div className="min-h-screen w-full bg-[#F0F7F2] text-[#132E27] relative flex flex-col justify-between items-center selection:bg-[#55B96A]/25 overflow-x-hidden">
      <main className="w-full max-w-[820px] min-h-screen flex flex-col justify-between relative shadow-[0_0_60px_rgba(0,0,0,0.18)] overflow-hidden bg-[#F0F7F2]">
        {/* 1. Header with official KSUM | Kerala IT | Huddle Global branding */}
        <KioskSubHeader
          language={activeLang}
          backHref="/kiosk/arogyamithran/language"
          backLabel="Language"
          backLabelMl="ഭാഷ മാറ്റുക"
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
            {/* Soft gradient wash at the bottom behind speech card and actions */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#FAFAF7]/60 via-[#FAFAF7]/80 to-[#FAFAF7]" />
          </div>

          {/* Arogyamithran Character Illustration prominently standing above speech bubble */}
          <div className="relative z-10 w-full flex-1 flex flex-col justify-end items-center min-h-[220px] sm:min-h-[280px] md:min-h-[320px] pt-2 pb-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="relative w-52 h-64 sm:w-64 sm:h-76 md:w-72 md:h-84 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/90 bg-gradient-to-b from-[#F0F7F1] via-white to-[#FAFAF7] -mb-2 sm:-mb-3"
            >
              <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-[#0B5D46] via-[#D4AF37] to-[#0B5D46] z-10" />
              <Image
                src="/assets/kiosk/arogyamithran/hero_mascot.jpg"
                alt="Arogyamithran welcoming Bio-AI guide waving with glowing leaf tablet"
                fill
                priority
                className="object-cover object-top select-none"
                sizes="(max-width: 640px) 240px, 320px"
              />
            </motion.div>
          </div>

          {/* Bottom Card Area matching Screen 2 Storyboard */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 w-full max-w-xl mx-auto flex flex-col items-center gap-3.5 pb-2"
          >
            {/* Speech Bubble Card with Pointer */}
            <div className="relative w-full bg-white rounded-3xl p-5 sm:p-6 shadow-xl border-2 border-[#0B5D46]/15 text-left">
              {/* Pointer Triangle pointing upwards toward Arogyamithran */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-3 overflow-hidden">
                <div className="w-4 h-4 bg-white border-t-2 border-l-2 border-[#0B5D46]/15 rotate-45 mx-auto translate-y-1" />
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-[#073B30] tracking-tight mb-1.5 flex items-center gap-2">
                <span>{isMl ? "നമസ്കാരം!" : "Hello!"}</span>
                <span className="text-lg">👋</span>
              </h2>

              <p className={`text-xs sm:text-sm text-[#244B3F] font-medium leading-relaxed ${isMl ? "font-malayalam" : ""}`}>
                {isMl
                  ? "ഞാൻ നിങ്ങളുടെ സുഹൃത്തായ ആരോഗ്യമിത്രൻ. ബയോടെക്നോളജി, ആയുർവേദം, പ്രകൃതി, ആധുനിക ശാസ്ത്രം എന്നിവയുടെ അത്ഭുതകരമായ ലോകം നമുക്ക് ഒരുമിച്ച് അടുത്തറിയാം!"
                  : "I'm Arogyamithran, your friendly Bio-AI guide. Let's explore the amazing world of biotechnology, Ayurveda, nature and modern science together!"}
              </p>
            </div>

            {/* 4 Feature Badges (Learn, Play, Discover, Innovate) */}
            <div className="w-full grid grid-cols-4 gap-2 sm:gap-3">
              {/* Learn */}
              <div className="bg-white/95 rounded-2xl p-2.5 sm:p-3 border border-[#0B5D46]/15 shadow-sm flex flex-col items-center justify-center text-center">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#0B5D46] flex items-center justify-center mb-1">
                  <BookOpen className="w-4 h-4" />
                </div>
                <span className={`text-[11px] sm:text-xs font-bold text-[#073B30] ${isMl ? "font-malayalam" : ""}`}>
                  {isMl ? "പഠിക്കൂ" : "Learn"}
                </span>
              </div>

              {/* Play */}
              <div className="bg-white/95 rounded-2xl p-2.5 sm:p-3 border border-[#0B5D46]/15 shadow-sm flex flex-col items-center justify-center text-center">
                <div className="w-8 h-8 rounded-full bg-amber-50 text-[#D97706] flex items-center justify-center mb-1">
                  <Trophy className="w-4 h-4" />
                </div>
                <span className={`text-[11px] sm:text-xs font-bold text-[#073B30] ${isMl ? "font-malayalam" : ""}`}>
                  {isMl ? "കളിക്കൂ" : "Play"}
                </span>
              </div>

              {/* Discover */}
              <div className="bg-white/95 rounded-2xl p-2.5 sm:p-3 border border-[#0B5D46]/15 shadow-sm flex flex-col items-center justify-center text-center">
                <div className="w-8 h-8 rounded-full bg-teal-50 text-[#0B5D46] flex items-center justify-center mb-1">
                  <Search className="w-4 h-4" />
                </div>
                <span className={`text-[11px] sm:text-xs font-bold text-[#073B30] ${isMl ? "font-malayalam" : ""}`}>
                  {isMl ? "കണ്ടെത്തൂ" : "Discover"}
                </span>
              </div>

              {/* Innovate */}
              <div className="bg-white/95 rounded-2xl p-2.5 sm:p-3 border border-[#0B5D46]/15 shadow-sm flex flex-col items-center justify-center text-center">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#55B96A] flex items-center justify-center mb-1">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <span className={`text-[11px] sm:text-xs font-bold text-[#073B30] ${isMl ? "font-malayalam" : ""}`}>
                  {isMl ? "നവീകരിക്കൂ" : "Innovate"}
                </span>
              </div>
            </div>

            {/* Primary Action Button: Let's Begin */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBegin}
              className="w-full min-h-[52px] sm:min-h-[56px] px-6 py-3 rounded-2xl bg-gradient-to-r from-[#073B30] to-[#0B5D46] hover:from-[#0B5D46] hover:to-[#55B96A] text-[#FAFAF7] font-black text-base sm:text-lg shadow-lg border border-white/20 flex items-center justify-center gap-2 touch-manipulation active:scale-95 transition-all"
            >
              <span className={isMl ? "font-malayalam" : ""}>
                {isMl ? "നമുക്ക് തുടങ്ങാം" : "Let's Begin"}
              </span>
              <span className="text-xl">→</span>
            </motion.button>

            {/* Return to Home Action */}
            <Link
              href="/kiosk"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-full bg-white/90 hover:bg-white text-[#073B30] text-xs font-bold shadow-xs border border-[#0B5D46]/20 transition-all active:scale-95 touch-manipulation"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#55B96A]" />
              <span className={isMl ? "font-malayalam" : ""}>
                {isMl ? "പ്രധാന പേജിലേക്ക് മടങ്ങുക" : "Back to Home"}
              </span>
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

export default function ArogyamithranWelcomePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F0F7F2]" />}>
      <WelcomeContent />
    </Suspense>
  );
}
