"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import ArogyamithranCharacterFrame from "@/components/kiosk/ArogyamithranCharacterFrame";
import KioskSubHeader from "@/components/kiosk/KioskSubHeader";
import KioskFooter from "@/components/kiosk/KioskFooter";
import { useArogyamithranLanguage } from "@/components/kiosk/ArogyamithranContext";
import { KioskLanguage } from "@/components/kiosk/types";

function CompletedContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const regId = searchParams.get("regId") || "";
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
  const heading = isMl ? "രജിസ്ട്രേഷൻ പൂർത്തിയായി!" : "You're registered!";
  const subHeading = isMl
    ? "Bio-AI Challenge-ൽ ആരോഗ്യ മിത്രൻ നിങ്ങളെ നയിക്കാൻ തയ്യാറാണ്."
    : "Arogyamithran is ready to guide you through the Bio-AI Challenge.";
  const resultNotice = isMl
    ? "ചലഞ്ച് പൂർത്തിയാക്കിയ ശേഷം നിങ്ങളുടെ ഫലത്തിന്റെ QR ലിങ്ക് ഇമെയിൽ വഴി അയയ്ക്കുന്നതായിരിക്കും; ഈ സൗകര്യം പ്രവർത്തനക്ഷമമാക്കിയ ശേഷം മാത്രമേ ഇമെയിൽ അയയ്ക്കൂ."
    : "Your result QR link will be sent to the email address you provided after the challenge, once that feature is implemented and configured.";
  const continueButtonLabel = isMl ? "തുടരുക" : "CONTINUE";

  const handleContinue = () => {
    router.push(
      `/kiosk/arogyamithran/instructions?regId=${encodeURIComponent(
        regId
      )}&lang=${activeLang}`
    );
  };

  return (
    <main className="min-h-screen flex flex-col justify-between bg-[#FAFAF7] text-[#132E27] relative selection:bg-[#55B96A]/20">
      {/* ─── KIOSK SUB HEADER ────────────────────────────────────────── */}
      <KioskSubHeader
        language={activeLang}
        backHref={`/kiosk/arogyamithran/register?lang=${activeLang}`}
        backLabel="Back to Registration"
        backLabelMl="രജിസ്ട്രേഷനിലേക്ക്"
        currentStepBadge="Step 4: Registration Confirmed"
        currentStepBadgeMl="ഘട്ടം 4: രജിസ്ട്രേഷൻ പൂർത്തിയായി"
      />

      {/* ─── COMPLETION SCREEN CONTENT ─────────────────────────────────── */}
      <div className="flex-1 max-w-2xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col items-center justify-center text-center">
        {/* Success Checkmark & Registration ID Pill */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#0B5D46] text-white flex items-center justify-center shadow-lg border-4 border-white mb-4"
        >
          <svg
            className="w-8 h-8 sm:w-10 sm:h-10 text-[#55B96A]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </motion.div>

        {regId && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F0F7F1] border border-[#0B5D46]/20 text-xs font-bold text-[#073B30] mb-4">
            <span className="text-[#0B5D46]">
              {isMl ? "രജിസ്ട്രേഷൻ ഐഡി:" : "Registration ID:"}
            </span>
            <span className="font-mono text-[#0B5D46]">{regId}</span>
          </div>
        )}

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#073B30] tracking-tight mb-2 ${
            isMl ? "font-malayalam leading-snug" : ""
          }`}
        >
          {heading}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className={`text-base sm:text-lg text-[#0B5D46] font-semibold mb-6 max-w-lg ${
            isMl ? "font-malayalam leading-relaxed" : ""
          }`}
        >
          {subHeading}
        </motion.p>

        {/* Character Visual */}
        <ArogyamithranCharacterFrame
          compact={true}
          selectedLanguage={activeLang}
          expression="encouraging"
        />

        {/* Honest Email QR Notice Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-6 w-full max-w-lg p-4 sm:p-5 rounded-2xl bg-white border-2 border-[#0B5D46]/15 shadow-sm text-left"
        >
          <div className="flex items-start gap-3">
            <span className="text-xl shrink-0">ℹ️</span>
            <p
              className={`text-xs sm:text-sm text-[#244B3F]/90 leading-relaxed ${
                isMl ? "font-malayalam" : ""
              }`}
            >
              {resultNotice}
            </p>
          </div>
        </motion.div>

        {/* Action Button: Target 56-64px height */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 sm:mt-10 w-full max-w-md"
        >
          <button
            type="button"
            onClick={handleContinue}
            className="w-full min-h-[58px] sm:min-h-[64px] px-8 py-4 rounded-2xl bg-[#073B30] text-[#FAFAF7] hover:bg-[#0B5D46] active:scale-95 transition-all text-base sm:text-lg font-bold shadow-lg flex items-center justify-center gap-3 touch-manipulation focus:outline-none focus-visible:ring-4 focus-visible:ring-[#55B96A]"
          >
            <span className={isMl ? "font-malayalam" : ""}>
              {continueButtonLabel}
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

export default function ArogyamithranCompletedPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FAFAF7] text-[#073B30]">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#55B96A] animate-ping" />
            <span className="text-sm font-bold">Loading Confirmation...</span>
          </div>
        </div>
      }
    >
      <CompletedContent />
    </Suspense>
  );
}
