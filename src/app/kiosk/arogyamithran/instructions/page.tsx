"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import ArogyamithranCharacterFrame from "@/components/kiosk/ArogyamithranCharacterFrame";
import KioskSubHeader from "@/components/kiosk/KioskSubHeader";
import KioskFooter from "@/components/kiosk/KioskFooter";
import { useArogyamithranLanguage } from "@/components/kiosk/ArogyamithranContext";
import { KioskLanguage } from "@/components/kiosk/types";

function InstructionsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const regId = searchParams.get("regId") || "";
  const urlLang = searchParams.get("lang") as KioskLanguage | null;
  const { language, setLanguage } = useArogyamithranLanguage();

  const [isStarting, setIsStarting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

  // Content specified in Step 4 requirements
  const heading = isMl
    ? "ആരോഗ്യ മിത്രൻ ബയോ-എഐ ചലഞ്ച്"
    : "Arogyamithran Bio-AI Challenge";

  const supportingText = isMl
    ? "ബയോ-എഐ, ആയുർവേദം, ഔഷധസസ്യങ്ങൾ, സുഗന്ധവ്യഞ്ജനങ്ങൾ, അനുബന്ധ ശാസ്ത്രീയ ആശയങ്ങൾ എന്നിവയിലെ നിങ്ങളുടെ അറിവ് പരിശോധിക്കുക."
    : "Test your knowledge of Bio-AI, Ayurveda, medicinal plants, spices and related scientific concepts.";

  const rulesHeading = isMl ? "ചലഞ്ച് നിയമങ്ങൾ" : "Challenge Rules";

  const rules = isMl
    ? [
        { icon: "📝", text: "10 ചോദ്യങ്ങൾക്ക് ഉത്തരം നൽകുക." },
        { icon: "✨", text: "ഓരോ ശരിയുത്തരത്തിനും 10 പോയിന്റ് ലഭിക്കും." },
        { icon: "🔢", text: "ഓരോ ചോദ്യത്തിനും നാല് ഉത്തര ഓപ്ഷനുകൾ ഉണ്ട്." },
        { icon: "🎯", text: "ഒരു ചോദ്യത്തിന് ഒരു ഉത്തരം മാത്രം തിരഞ്ഞെടുക്കുക." },
        { icon: "🏆", text: "നിങ്ങളുടെ പരമാവധി സ്കോർ 100 പോയിന്റാണ്." },
      ]
    : [
        { icon: "📝", text: "Answer 10 questions." },
        { icon: "✨", text: "Each correct answer earns 10 points." },
        { icon: "🔢", text: "Each question has four answer options." },
        { icon: "🎯", text: "Select one answer per question." },
        { icon: "🏆", text: "Your maximum score is 100 points." },
      ];

  const characterDialogue = isMl
    ? "ചലഞ്ചിലേക്ക് സ്വാഗതം! ചോദ്യങ്ങൾ ശ്രദ്ധാപൂർവ്വം വായിച്ച് പുതിയ ബയോ-എഐ അറിവുകൾ നേടൂ."
    : "Welcome to the challenge! Read each question carefully and discover exciting Bio-AI insights.";

  const startButtonLabel = isMl
    ? "ചലഞ്ച് ആരംഭിക്കുക"
    : "START THE CHALLENGE";

  const handleStartChallenge = async () => {
    setIsStarting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/kiosk/quiz/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          registrationId: regId || "kiosk-guest-session",
          language: activeLang,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to initialize challenge attempt.");
      }

      // Navigate to challenge screen with attemptId
      router.push(
        `/kiosk/arogyamithran/challenge?attemptId=${encodeURIComponent(
          data.attemptId
        )}&regId=${encodeURIComponent(regId)}&lang=${activeLang}`
      );
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      setErrorMessage(message);
      setIsStarting(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col justify-between bg-[#FAFAF7] text-[#132E27] relative selection:bg-[#55B96A]/20">
      {/* ─── KIOSK SUB HEADER ────────────────────────────────────────── */}
      <KioskSubHeader
        language={activeLang}
        backHref="/kiosk"
        backLabel="Back to Kiosk"
        backLabelMl="കിയോസ്ക് മെനു"
        currentStepBadge="Step 5: Challenge Instructions"
        currentStepBadgeMl="ഘട്ടം 5: ചലഞ്ച് നിർദ്ദേശങ്ങൾ"
      />

      {/* ─── INSTRUCTIONS CONTENT ──────────────────────────────────────── */}
      <div className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex flex-col items-center justify-center">
        {/* Step indicator badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F0F7F1] border border-[#0B5D46]/15 mb-3 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#55B96A]" />
          <span className="text-[11px] sm:text-xs font-bold text-[#0B5D46] uppercase tracking-wider">
            {isMl ? "ഘട്ടം 7 / 9 · ചലഞ്ച് നിർദ്ദേശങ്ങൾ" : "Step 7 of 9 · Challenge Instructions"}
          </span>
        </div>

        {/* Heading */}
        <h1
          className={`text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#073B30] text-center tracking-tight mb-2 ${
            isMl ? "font-malayalam leading-snug" : ""
          }`}
        >
          {heading}
        </h1>

        {/* Supporting introduction */}
        <p
          className={`text-sm sm:text-base text-[#244B3F]/90 text-center max-w-xl mb-6 leading-relaxed ${
            isMl ? "font-malayalam" : ""
          }`}
        >
          {supportingText}
        </p>

        {/* Arogyamithran explaining character frame */}
        <div className="w-full mb-6">
          <ArogyamithranCharacterFrame
            compact={true}
            selectedLanguage={activeLang}
            expression="talking"
            dialogue={characterDialogue}
          />
        </div>

        {/* Rules Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-xl bg-white rounded-3xl p-5 sm:p-6 border-2 border-[#0B5D46]/15 shadow-sm mb-6"
        >
          <div className="flex items-center gap-2 mb-3.5 pb-2 border-b border-[#0B5D46]/10">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0B5D46]" />
            <h2
              className={`text-xs sm:text-sm font-bold uppercase tracking-wider text-[#073B30] ${
                isMl ? "font-malayalam" : ""
              }`}
            >
              {rulesHeading}
            </h2>
          </div>

          <ul className="space-y-2.5">
            {rules.map((rule, idx) => (
              <li
                key={idx}
                className="flex items-center gap-3 text-xs sm:text-sm text-[#132E27] font-medium"
              >
                <span className="text-base shrink-0">{rule.icon}</span>
                <span className={isMl ? "font-malayalam leading-relaxed" : ""}>
                  {rule.text}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Language Notification Badge */}
        {isMl && (
          <div className="w-full max-w-xl mb-4 px-4 py-2.5 rounded-xl bg-[#F0F7F1] border border-[#0B5D46]/20 text-[11px] sm:text-xs text-[#0B5D46] font-medium flex items-center gap-2">
            <span className="shrink-0 text-sm">ℹ️</span>
            <span>
              ചോദ്യ ബാങ്ക് ഇംഗ്ലീഷിൽ ലഭ്യമാണ് • ഇന്റർഫേസും ഫീഡ്ബാക്കും മലയാളത്തിലാണ്.
            </span>
          </div>
        )}

        {/* Error message alert if attempt start fails */}
        {errorMessage && (
          <div className="w-full max-w-xl mb-4 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm">
            <p className="font-bold mb-1">Configuration / Session Error:</p>
            <p>{errorMessage}</p>
          </div>
        )}

        {/* Start Button: Accessible touch size ~60px min-height */}
        <div className="w-full max-w-xl">
          <button
            type="button"
            onClick={handleStartChallenge}
            disabled={isStarting}
            className="w-full min-h-[58px] sm:min-h-[64px] px-8 py-4 rounded-2xl bg-[#073B30] text-[#FAFAF7] hover:bg-[#0B5D46] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed transition-all text-base sm:text-lg font-bold shadow-lg flex items-center justify-center gap-3 touch-manipulation focus:outline-none focus-visible:ring-4 focus-visible:ring-[#55B96A]"
          >
            {isStarting ? (
              <>
                <span className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                <span>
                  {isMl ? "ചോദ്യങ്ങൾ തയ്യാറാക്കുന്നു..." : "Preparing your challenge..."}
                </span>
              </>
            ) : (
              <>
                <span className={isMl ? "font-malayalam" : ""}>
                  {startButtonLabel}
                </span>
                <span className="text-[#55B96A] text-xl font-bold">→</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ─── KIOSK FOOTER ──────────────────────────────────────────────── */}
      <KioskFooter language={activeLang} />
    </main>
  );
}

export default function ArogyamithranInstructionsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FAFAF7] text-[#073B30]">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#55B96A] animate-ping" />
            <span className="text-sm font-bold">Loading Instructions...</span>
          </div>
        </div>
      }
    >
      <InstructionsContent />
    </Suspense>
  );
}
