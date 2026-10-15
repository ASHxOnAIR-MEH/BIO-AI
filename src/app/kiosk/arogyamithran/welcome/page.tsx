"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import ArogyamithranCharacterFrame from "@/components/kiosk/ArogyamithranCharacterFrame";
import KioskSubHeader from "@/components/kiosk/KioskSubHeader";
import KioskFooter from "@/components/kiosk/KioskFooter";
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

  // Content specified in requirements
  const heading = isMl ? "ആരോഗ്യ മിത്രനെ പരിചയപ്പെടാം" : "Meet Arogyamithran";
  const dialogue = isMl
    ? "നമസ്കാരം! ഞാൻ ആരോഗ്യ മിത്രൻ. Bio-AI Challenge-ലേക്ക് സ്വാഗതം!"
    : "Namaskaram! I'm Arogyamithran, your friendly guide to the Bio-AI Challenge.";
  const supportingText = isMl
    ? "ഔഷധസസ്യങ്ങൾ, സുഗന്ധവ്യഞ്ജനങ്ങൾ, പരമ്പരാഗത അറിവ്, ശാസ്ത്രം എന്നിവയുടെ അത്ഭുതകരമായ ലോകം നമുക്ക് ഒരുമിച്ച് അടുത്തറിയാം."
    : "Let's explore traditional knowledge, medicinal plants, spices and the science connecting biology with artificial intelligence.";
  const primaryButtonLabel = isMl ? "നമുക്ക് തുടങ്ങാം" : "LET'S BEGIN";

  const handleBegin = () => {
    router.push(`/kiosk/arogyamithran/register?lang=${activeLang}`);
  };

  return (
    <main className="min-h-screen flex flex-col justify-between bg-[#FAFAF7] text-[#132E27] relative selection:bg-[#55B96A]/20">
      {/* ─── KIOSK SUB HEADER ────────────────────────────────────────── */}
      <KioskSubHeader
        language={activeLang}
        backHref="/kiosk/arogyamithran/language"
        backLabel="Change Language"
        backLabelMl="ഭാഷ മാറ്റുക"
        currentStepBadge="Step 2: Guide Introduction"
        currentStepBadgeMl="ഘട്ടം 2: വഴികാട്ടി ആമുഖം"
      />

      {/* ─── CHARACTER WELCOME SCREEN CONTENT ──────────────────────────── */}
      <div className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex flex-col items-center justify-center text-center">
        {/* Progress indicator */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F0F7F1] border border-[#0B5D46]/15 mb-4 sm:mb-6 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#55B96A] animate-pulse" />
          <span className="text-[11px] sm:text-xs font-bold text-[#0B5D46] uppercase tracking-wider">
            {isMl
              ? "ഘട്ടം 2 / 9: ആരോഗ്യ മിത്രന്റെ സ്വാഗതം"
              : "Step 2 of 9: Arogyamithran Welcome"}
          </span>
        </div>

        {/* Heading */}
        <h1
          className={`text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#073B30] tracking-tight mb-2 ${
            isMl ? "font-malayalam leading-relaxed" : ""
          }`}
        >
          {heading}
        </h1>

        {/* Character Visual Area with Speech Bubble (Visual text only - no audio) */}
        <ArogyamithranCharacterFrame
          compact={false}
          selectedLanguage={activeLang}
          dialogue={dialogue}
          supportingText={supportingText}
          expression="welcoming"
        />

        {/* Action Area */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-3 w-full max-w-md"
        >
          {/* Primary Button: Target min 56px height for touchscreens */}
          <button
            type="button"
            onClick={handleBegin}
            className="w-full min-h-[58px] sm:min-h-[64px] px-8 py-4 rounded-2xl bg-[#073B30] text-[#FAFAF7] hover:bg-[#0B5D46] active:scale-95 transition-all text-base sm:text-lg font-bold shadow-lg flex items-center justify-center gap-3 touch-manipulation focus:outline-none focus-visible:ring-4 focus-visible:ring-[#55B96A]"
          >
            <span className={isMl ? "font-malayalam" : ""}>
              {primaryButtonLabel}
            </span>
            <span className="text-[#55B96A] text-xl font-bold">→</span>
          </button>
        </motion.div>
      </div>

      {/* ─── KIOSK FOOTER ──────────────────────────────────────────────── */}
      <KioskFooter language={activeLang} />
    </main>
  );
}

export default function ArogyamithranWelcomePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FAFAF7] text-[#073B30]">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#55B96A] animate-ping" />
            <span className="text-sm font-bold">Loading Arogyamithran...</span>
          </div>
        </div>
      }
    >
      <WelcomeContent />
    </Suspense>
  );
}
