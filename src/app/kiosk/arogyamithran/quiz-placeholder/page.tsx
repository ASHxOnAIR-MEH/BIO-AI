"use client";

import { Suspense, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useArogyamithranLanguage } from "@/components/kiosk/ArogyamithranContext";
import { KioskLanguage } from "@/components/kiosk/types";

function QuizPlaceholderContent() {
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

  return (
    <main className="min-h-screen flex flex-col justify-between bg-[#FAFAF7] text-[#132E27] relative selection:bg-[#55B96A]/20">
      {/* ─── KIOSK HEADER ──────────────────────────────────────────────── */}
      <header className="w-full bg-[#FAFAF7]/95 backdrop-blur-md border-b border-[#0B5D46]/15 sticky top-0 z-40">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-3.5 sm:py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-6 min-w-0">
            <div className="flex items-center shrink-0">
              <Image
                src="/ksum-logo.png"
                alt="Kerala Startup Mission"
                width={150}
                height={60}
                priority
                className="h-8 sm:h-10 w-auto object-contain"
              />
            </div>

            <div className="h-6 w-px bg-[#0B5D46]/20 hidden xs:block" />

            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#55B96A]" />
              <span className="text-[11px] sm:text-xs font-bold text-[#0B5D46] uppercase tracking-wider hidden sm:inline">
                Bio-AI Centre of Excellence
              </span>
            </div>
          </div>

          <Link
            href="/kiosk"
            className="inline-flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-[#073B30] text-white hover:bg-[#0B5D46] active:scale-95 transition-all text-xs sm:text-sm font-semibold shadow-sm touch-manipulation"
          >
            <span>{isMl ? "കിയോസ്ക് മെനു" : "Kiosk Menu"}</span>
            <span className="text-[#55B96A]">✕</span>
          </Link>
        </div>
      </header>

      {/* ─── QUIZ STAGE PLACEHOLDER CONTENT ────────────────────────────── */}
      <div className="flex-1 max-w-2xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col items-center justify-center text-center">
        {/* Step Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F0F7F1] border border-[#0B5D46]/15 mb-4 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#55B96A]" />
          <span className="text-[11px] sm:text-xs font-bold text-[#0B5D46] uppercase tracking-wider">
            {isMl
              ? "ഘട്ടം 4: ക്വിസ് മൊഡ്യൂൾ (അടുത്ത ഘട്ടം)"
              : "Step 4: Quiz Module (Next Phase)"}
          </span>
        </div>

        {regId && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#0B5D46]/20 text-xs font-bold text-[#073B30] mb-4 shadow-xs">
            <span className="text-[#0B5D46]">
              {isMl ? "രജിസ്ട്രേഷൻ ഐഡി:" : "Registration ID:"}
            </span>
            <span className="font-mono text-[#0B5D46]">{regId}</span>
          </div>
        )}

        <h1
          className={`text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#073B30] tracking-tight mb-3 ${
            isMl ? "font-malayalam leading-snug" : ""
          }`}
        >
          {isMl
            ? "ആരോഗ്യ മിത്രൻ ബയോ-എഐ ചലഞ്ച്"
            : "Arogyamithran Bio-AI Challenge"}
        </h1>

        <p
          className={`text-sm sm:text-base text-[#244B3F]/90 max-w-lg mb-8 leading-relaxed ${
            isMl ? "font-malayalam leading-relaxed" : ""
          }`}
        >
          {isMl
            ? "നിങ്ങളുടെ രജിസ്ട്രേഷൻ വിജയകരമായി പൂർത്തിയായി. മൾട്ടി-ലെവൽ ക്വിസ് ചോദ്യങ്ങളും തത്സമയ സ്കോറിംഗും അടുത്ത നടപ്പിലാക്കൽ ഘട്ടത്തിൽ സജ്ജമാകും."
            : "Your registration has been successfully recorded. The multi-level quiz questions, interactive plant trivia, and scoring engine are scheduled for the next implementation phase."}
        </p>

        {/* Milestone Card */}
        <div className="w-full max-w-md p-5 rounded-3xl bg-white border-2 border-[#0B5D46]/15 shadow-sm text-left mb-8">
          <h3 className="text-xs font-bold text-[#073B30] uppercase tracking-wider mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#55B96A]" />
            {isMl ? "പൂർത്തിയായ ഘട്ടങ്ങൾ" : "Completed Milestones"}
          </h3>
          <ul className="text-xs text-[#244B3F] space-y-2">
            <li className="flex items-center gap-2">
              <span className="text-[#55B96A] font-bold">✓</span>
              <span>
                {isMl
                  ? "ഭാഷ തിരഞ്ഞെടുക്കൽ (ഇംഗ്ലീഷ് / മലയാളം)"
                  : "Language selection (English & Malayalam)"}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#55B96A] font-bold">✓</span>
              <span>
                {isMl
                  ? "ആരോഗ്യ മിത്രൻ സ്വാഗത സ്ക്രീൻ"
                  : "Arogyamithran character welcome screen"}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#55B96A] font-bold">✓</span>
              <span>
                {isMl
                  ? "സന്ദർശക രജിസ്ട്രേഷനും സമ്മതപത്രവും"
                  : "Visitor registration & explicit consent verification"}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#0B5D46] font-bold">⏱</span>
              <span className="font-semibold text-[#073B30]">
                {isMl
                  ? "അടുത്തത്: ക്വിസ് ചോദ്യങ്ങൾ & സ്കോറിംഗ്"
                  : "Next Phase: Interactive Quiz & Scoring Engine"}
              </span>
            </li>
          </ul>
        </div>

        {/* Return Button */}
        <Link
          href="/kiosk"
          className="w-full max-w-md min-h-[56px] px-8 py-3.5 rounded-2xl bg-[#073B30] text-[#FAFAF7] hover:bg-[#0B5D46] active:scale-95 transition-all text-sm sm:text-base font-bold shadow-md flex items-center justify-center gap-2 touch-manipulation"
        >
          <span className={isMl ? "font-malayalam" : ""}>
            {isMl ? "കിയോസ്ക് മെനുവിലേക്ക് മടങ്ങുക" : "Return to Kiosk Menu"}
          </span>
          <span className="text-[#55B96A]">→</span>
        </Link>
      </div>

      {/* ─── KIOSK FOOTER ──────────────────────────────────────────────── */}
      <footer className="w-full py-4 sm:py-6 px-4 sm:px-8 border-t border-[#0B5D46]/15 bg-[#F0F7F1]/80 text-[#244B3F]">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#55B96A]" />
            <span className="font-semibold text-[#073B30]">
              Step 3 Completed · Ready for Step 4
            </span>
          </div>

          <Link
            href="/kiosk"
            className="text-[#073B30] hover:text-[#0B5D46] font-bold underline underline-offset-4"
          >
            Exit to Kiosk Menu
          </Link>
        </div>
      </footer>
    </main>
  );
}

export default function ArogyamithranQuizPlaceholderPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FAFAF7] text-[#073B30]">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#55B96A] animate-ping" />
            <span className="text-sm font-bold">Loading...</span>
          </div>
        </div>
      }
    >
      <QuizPlaceholderContent />
    </Suspense>
  );
}
