"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import ArogyamithranCharacterFrame from "@/components/kiosk/ArogyamithranCharacterFrame";
import KioskSubHeader from "@/components/kiosk/KioskSubHeader";
import KioskFooter from "@/components/kiosk/KioskFooter";
import { useArogyamithranLanguage } from "@/components/kiosk/ArogyamithranContext";
import { KioskLanguage } from "@/components/kiosk/types";

export default function ArogyamithranLanguagePage() {
  const router = useRouter();
  const { setLanguage } = useArogyamithranLanguage();
  const [selected, setSelected] = useState<KioskLanguage | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);

  const handleSelectLanguage = (lang: KioskLanguage) => {
    setSelected(lang);
    setLanguage(lang);
    setIsNavigating(true);

    // Brief tactile transition delay to show feedback before navigating
    setTimeout(() => {
      router.push(`/kiosk/arogyamithran/welcome?lang=${lang}`);
    }, 280);
  };

  return (
    <main className="min-h-screen flex flex-col justify-between bg-[#FAFAF7] text-[#132E27] relative selection:bg-[#55B96A]/20">
      {/* ─── KIOSK SUB HEADER WITH OFFICIAL BRANDING ─────────────────── */}
      <KioskSubHeader
        language={selected || "en"}
        backHref="/kiosk"
        backLabel="Back to Kiosk"
        backLabelMl="കിയോസ്ക് മെനു"
        currentStepBadge="Step 1: Language Selection"
        currentStepBadgeMl="ഘട്ടം 1: ഭാഷ തിരഞ്ഞെടുക്കുക"
      />

      {/* ─── SCREEN CONTENT ────────────────────────────────────────────── */}
      <div className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex flex-col items-center justify-center">
        {/* Character Visual Reservation Area */}
        <ArogyamithranCharacterFrame
          compact={false}
          selectedLanguage={selected}
          expression="namaskaram"
        />

        {/* Headings */}
        <div className="text-center mt-3 mb-6 sm:mb-8 max-w-2xl">
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#0B5D46] mb-1">
            BIO-AI CENTRE OF EXCELLENCE
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#073B30] tracking-tight mb-2">
            Meet Arogyamithran
          </h1>
          <p className="text-base sm:text-lg text-[#244B3F] font-medium leading-relaxed">
            Choose your preferred language to continue.
          </p>
          <p className="text-sm sm:text-base text-[#0B5D46] font-medium font-malayalam mt-0.5">
            തുടരുന്നതിന് നിങ്ങളുടെ ഭാഷ തിരഞ്ഞെടുക്കുക.
          </p>
        </div>

        {/* Informative Guidance Banner */}
        <div className="w-full max-w-xl mb-6 px-4 py-2.5 rounded-2xl bg-[#F0F7F1] border border-[#0B5D46]/15 text-center">
          <p className="text-xs text-[#244B3F]/90 leading-relaxed font-medium">
            Selecting either option determines the language used throughout your
            subsequent Arogyamithran experience. You can switch back at any time.
          </p>
        </div>

        {/* ─── TWO LARGE LANGUAGE SELECTION CARDS ──────────────────────── */}
        <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* OPTION 1 — ENGLISH */}
          <motion.div
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.985 }}
            className="h-full"
          >
            <div
              className={`h-full bg-white rounded-3xl p-6 sm:p-7 border-2 transition-all duration-200 flex flex-col justify-between shadow-sm relative overflow-hidden ${
                selected === "en"
                  ? "border-[#0B5D46] ring-4 ring-[#55B96A]/25 bg-emerald-50/20"
                  : "border-[#0B5D46]/20 hover:border-[#55B96A]"
              }`}
            >
              {/* Selected Badge */}
              {selected === "en" && (
                <div className="absolute top-4 right-4 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#0B5D46] text-white text-[10px] font-bold">
                  <span>Active</span>
                  <span>✓</span>
                </div>
              )}

              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#F0F7F1] text-[#0B5D46] font-extrabold text-base flex items-center justify-center mb-4 border border-[#0B5D46]/15">
                  EN
                </div>
                <h2 className="text-2xl font-bold text-[#073B30] mb-1">
                  English
                </h2>
                <p className="text-sm text-[#244B3F]/80 mb-6 font-medium">
                  Continue in English
                </p>
              </div>

              {/* Action Button: Target 56–72px touch height */}
              <button
                type="button"
                onClick={() => handleSelectLanguage("en")}
                disabled={isNavigating}
                className={`w-full min-h-[58px] sm:min-h-[64px] px-6 py-4 rounded-2xl text-sm sm:text-base font-bold tracking-wide transition-all shadow-md active:scale-95 touch-manipulation focus:outline-none focus-visible:ring-4 focus-visible:ring-[#55B96A] flex items-center justify-center gap-2 ${
                  selected === "en"
                    ? "bg-[#073B30] text-[#FAFAF7] ring-2 ring-[#55B96A]"
                    : "bg-[#0B5D46] text-[#FAFAF7] hover:bg-[#073B30]"
                }`}
                aria-label="Continue in English"
              >
                <span>CONTINUE IN ENGLISH</span>
                <span className="text-[#55B96A] text-lg font-bold">→</span>
              </button>
            </div>
          </motion.div>

          {/* OPTION 2 — MALAYALAM */}
          <motion.div
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.985 }}
            className="h-full"
          >
            <div
              className={`h-full bg-white rounded-3xl p-6 sm:p-7 border-2 transition-all duration-200 flex flex-col justify-between shadow-sm relative overflow-hidden ${
                selected === "ml"
                  ? "border-[#0B5D46] ring-4 ring-[#55B96A]/25 bg-emerald-50/20"
                  : "border-[#0B5D46]/20 hover:border-[#55B96A]"
              }`}
            >
              {/* Selected Badge */}
              {selected === "ml" && (
                <div className="absolute top-4 right-4 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#0B5D46] text-white text-[10px] font-bold">
                  <span>തിരഞ്ഞെടുത്തു</span>
                  <span>✓</span>
                </div>
              )}

              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#F0F7F1] text-[#0B5D46] font-extrabold text-base flex items-center justify-center mb-4 border border-[#0B5D46]/15 font-malayalam">
                  മല
                </div>
                <h2 className="text-2xl font-bold text-[#073B30] mb-1 font-malayalam">
                  മലയാളം
                </h2>
                <p className="text-sm text-[#244B3F]/80 mb-6 font-medium font-malayalam">
                  മലയാളത്തിൽ തുടരുക
                </p>
              </div>

              {/* Action Button: Target 56–72px touch height */}
              <button
                type="button"
                onClick={() => handleSelectLanguage("ml")}
                disabled={isNavigating}
                className={`w-full min-h-[58px] sm:min-h-[64px] px-6 py-4 rounded-2xl text-sm sm:text-base font-bold tracking-wide transition-all shadow-md active:scale-95 touch-manipulation focus:outline-none focus-visible:ring-4 focus-visible:ring-[#55B96A] flex items-center justify-center gap-2 font-malayalam ${
                  selected === "ml"
                    ? "bg-[#073B30] text-[#FAFAF7] ring-2 ring-[#55B96A]"
                    : "bg-[#0B5D46] text-[#FAFAF7] hover:bg-[#073B30]"
                }`}
                aria-label="മലയാളത്തിൽ തുടരുക"
              >
                <span>മലയാളത്തിൽ തുടരുക</span>
                <span className="text-[#55B96A] text-lg font-bold">→</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ─── KIOSK FOOTER ──────────────────────────────────────────────── */}
      <KioskFooter language={selected || "en"} />
    </main>
  );
}
