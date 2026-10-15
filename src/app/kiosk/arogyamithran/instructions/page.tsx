"use client";

import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, AlertCircle } from "lucide-react";
import KioskSubHeader from "@/components/kiosk/KioskSubHeader";
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

  const instructions = isMl
    ? [
        { num: 1, text: "10 മൾട്ടിപ്പിൾ ചോയ്സ് ചോദ്യങ്ങൾ ഉണ്ടായിരിക്കും." },
        { num: 2, text: "100 ചോദ്യങ്ങളുടെ ബയോ-എഐ ബാങ്കിൽ നിന്ന് റാൻഡമായി ചോദ്യങ്ങൾ തിരഞ്ഞെടുക്കപ്പെടുന്നു." },
        { num: 3, text: "ഓരോ ശരിയുത്തരത്തിനും 10 പോയിന്റ് ലഭിക്കും." },
        { num: 4, text: "സസ്യങ്ങൾ, സുഗന്ധവ്യഞ്ജനങ്ങൾ, ബയോടെക്നോളജി, എഐ എന്നിവയെക്കുറിച്ചുള്ള രസകരമായ വസ്തുതകൾ പഠിക്കാം." },
        { num: 5, text: "അവസാനം നിങ്ങളുടെ സ്കോറും ക്യുആർ കോഡും ലഭിക്കും, ഫലം ഇമെയിലിൽ അയയ്ക്കും." },
      ]
    : [
        { num: 1, text: "You will see 10 multiple-choice questions." },
        { num: 2, text: "Questions are selected randomly from our 100-question Bio-AI bank." },
        { num: 3, text: "Each correct answer gives you 10 points." },
        { num: 4, text: "Try your best and learn interesting facts about plants, spices, biotechnology and AI." },
        { num: 5, text: "At the end, you will get your score, a QR code and the result will be sent to your email." },
      ];

  const handleStartChallenge = async () => {
    setIsStarting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/kiosk/quiz/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          registrationId: regId || "kiosk-guest-session",
          language: activeLang,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || (isMl ? "ചലഞ്ച് ആരംഭിക്കാൻ കഴിഞ്ഞില്ല." : "Failed to start quiz attempt."));
      }

      router.push(
        `/kiosk/arogyamithran/challenge?attemptId=${encodeURIComponent(
          data.attemptId
        )}&regId=${encodeURIComponent(regId)}&lang=${activeLang}`
      );
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : isMl ? "സെർവർ പിശക് സംഭവിച്ചു." : "An error occurred.";
      setErrorMessage(msg);
      setIsStarting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F0F7F2] text-[#132E27] relative flex flex-col justify-between items-center selection:bg-[#55B96A]/25 overflow-x-hidden">
      <main className="w-full max-w-[820px] min-h-screen flex flex-col justify-between relative shadow-[0_0_60px_rgba(0,0,0,0.18)] overflow-hidden bg-[#F0F7F2]">
        {/* 1. Header with official KSUM | Kerala IT | Huddle Global branding */}
        <KioskSubHeader
          language={activeLang}
          backHref={`/kiosk/arogyamithran/register?lang=${activeLang}`}
          backLabel="Back"
          backLabelMl="പിന്നിലേക്ക്"
        />

        {/* 2. Visual Content Area */}
        <div className="relative flex-1 flex flex-col justify-between px-4 sm:px-6 py-4 sm:py-6 overflow-y-auto">
          {/* Background Botanical Illustration */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <Image
              src="/assets/kiosk/backgrounds/hero_portrait.jpg"
              alt="Bio-AI tropical background"
              fill
              priority
              className="object-cover object-center opacity-30 select-none"
              sizes="820px"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#F0F7F2]/95 via-[#F0F7F2]/85 to-[#F0F7F2]/95" />
          </div>

          <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center">
            {/* Title Section */}
            <div className="text-center mb-3">
              <h1 className={`text-2xl sm:text-3xl font-black text-[#073B30] tracking-tight ${isMl ? "font-malayalam" : ""}`}>
                {isMl ? "ബയോ-എഐ ചലഞ്ച്" : "Bio-AI Challenge"}
              </h1>
              <p className={`text-xs sm:text-sm font-semibold text-[#0B5D46] mt-0.5 max-w-md mx-auto ${isMl ? "font-malayalam" : ""}`}>
                {isMl
                  ? "നിങ്ങളുടെ അറിവ് പരിശോധിക്കൂ. പുതിയ കാര്യങ്ങൾ പഠിക്കൂ. ആരോഗ്യകരവും സുസ്ഥിരവുമായ നാളേക്കായി!"
                  : "Test your knowledge. Learn something new. Be a part of a healthier, sustainable future!"}
              </p>
            </div>

            {/* Error Banner */}
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full mb-3 p-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{errorMessage}</span>
              </motion.div>
            )}

            {/* Mascot and Speech Bubble Row matching Storyboard Screen 4 */}
            <div className="w-full flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              {/* Arogyamithran Pointing Pose */}
              <div className="relative w-20 h-28 sm:w-28 sm:h-36 shrink-0 rounded-2xl overflow-hidden shadow-md border-2 border-white/60 bg-[#FAFAF7]">
                <Image
                  src="/assets/kiosk/arogyamithran/pointing.jpg"
                  alt="Arogyamithran explaining the quiz rules"
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="120px"
                />
              </div>

              {/* Speech Bubble pointing to Arogyamithran */}
              <div className="relative flex-1 bg-white rounded-2xl p-3.5 sm:p-4 shadow-lg border-2 border-[#0B5D46]/15">
                <div className="absolute top-1/2 -left-2.5 -translate-y-1/2 w-3 h-3 bg-white border-b-2 border-l-2 border-[#0B5D46]/15 rotate-45" />
                <p className={`text-xs sm:text-sm font-extrabold text-[#073B30] leading-snug ${isMl ? "font-malayalam" : ""}`}>
                  {isMl ? "ചലഞ്ച് എങ്ങനെയാണെന്ന് മനസ്സിലാക്കാം!" : "Here's how the challenge works!"}
                </p>
                <p className={`text-[11px] text-[#244B3F]/80 font-medium mt-0.5 ${isMl ? "font-malayalam" : ""}`}>
                  {isMl ? "10 ചോദ്യങ്ങൾ · 100 പരമാവധി സ്കോർ" : "10 Questions · 100 Maximum Score"}
                </p>
              </div>
            </div>

            {/* Five Instructions White Card matching Storyboard */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full bg-white rounded-3xl p-4 sm:p-5 shadow-xl border-2 border-[#0B5D46]/15 flex flex-col gap-2.5"
            >
              {instructions.map((item) => (
                <div key={item.num} className="flex items-start gap-3">
                  {/* Number Badge */}
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#55B96A] text-white font-black text-xs sm:text-sm flex items-center justify-center shrink-0 shadow-xs">
                    {item.num}
                  </div>
                  {/* Rule Text */}
                  <p className={`text-xs sm:text-sm text-[#132E27] font-semibold leading-relaxed pt-0.5 ${isMl ? "font-malayalam" : ""}`}>
                    {item.text}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Action Button: Start Quiz */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleStartChallenge}
              disabled={isStarting}
              className="w-full min-h-[50px] sm:min-h-[54px] mt-4 rounded-2xl bg-gradient-to-r from-[#073B30] to-[#0B5D46] hover:from-[#0B5D46] hover:to-[#55B96A] text-[#FAFAF7] font-black text-base sm:text-lg shadow-lg border border-white/20 flex items-center justify-center gap-2 touch-manipulation active:scale-95 transition-all disabled:opacity-60"
            >
              {isStarting ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>{isMl ? "ചോദ്യങ്ങൾ തയ്യാറാക്കുന്നു..." : "Preparing Questions..."}</span>
                </span>
              ) : (
                <>
                  <span className={isMl ? "font-malayalam" : ""}>
                    {isMl ? "ക്വിസ് ആരംഭിക്കുക" : "Start Quiz"}
                  </span>
                  <span className="text-xl">→</span>
                </>
              )}
            </motion.button>

            {/* Back to Home Button */}
            <div className="mt-3">
              <Link
                href="/kiosk"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-full bg-white/90 hover:bg-white text-[#073B30] text-xs font-bold shadow-xs border border-[#0B5D46]/20 transition-all active:scale-95 touch-manipulation"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-[#55B96A]" />
                <span className={isMl ? "font-malayalam" : ""}>
                  {isMl ? "പ്രധാന പേജിലേക്ക് മടങ്ങുക" : "Back to Home"}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ArogyamithranInstructionsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F0F7F2]" />}>
      <InstructionsContent />
    </Suspense>
  );
}
