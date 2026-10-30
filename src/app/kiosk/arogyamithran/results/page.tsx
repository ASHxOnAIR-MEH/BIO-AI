"use client";

import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, RotateCcw, QrCode, CheckCircle2, AlertCircle, Gift } from "lucide-react";
import KioskSubHeader from "@/components/kiosk/KioskSubHeader";
import { useArogyamithranLanguage } from "@/components/kiosk/ArogyamithranContext";
import {
  KioskLanguage,
} from "@/components/kiosk/types";

// Extended result type including QR + email fields from SavedQuizResultRecord
interface FullQuizResult {
  attemptId: string;
  totalScore: number;
  maxScore: number;
  correctCount: number;
  incorrectCount: number;
  totalQuestions: number;
  accuracyPercentage: number;
  language: KioskLanguage;
  completedAt: string;
  // Step 5 QR & Token fields
  resultId?: string;
  accessToken?: string;
  resultUrl?: string;
  qrCodeDataUrl?: string;
}

// Premium 3D Golden Trophy Cup SVG matching Screen 7 storyboard
function GoldenTrophyGraphic({ className = "w-24 h-24 sm:w-28 sm:h-28" }: { className?: string }) {
  return (
    <div className={`relative shrink-0 flex items-center justify-center ${className} drop-shadow-xl select-none`}>
      <svg viewBox="0 0 160 170" className="w-full h-full">
        <defs>
          <linearGradient id="gold-cup" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF3B0" />
            <stop offset="30%" stopColor="#F59E0B" />
            <stop offset="70%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
          <linearGradient id="gold-glow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#D97706" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="pedestal-wood" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#291206" />
            <stop offset="50%" stopColor="#4A1E0E" />
            <stop offset="100%" stopColor="#1E0B04" />
          </linearGradient>
          <linearGradient id="pedestal-plate" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="50%" stopColor="#FEF3C7" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
        </defs>
        <circle cx="80" cy="65" r="50" fill="url(#gold-glow)" />
        <path d="M 45 42 C 20 42 16 75 42 85 C 44 86 48 83 48 80 C 26 73 30 50 48 48 Z" fill="url(#gold-cup)" stroke="#B45309" strokeWidth="1.5" />
        <path d="M 115 42 C 140 42 144 75 118 85 C 116 86 112 83 112 80 C 134 73 130 50 112 48 Z" fill="url(#gold-cup)" stroke="#B45309" strokeWidth="1.5" />
        <path d="M 46 32 L 114 32 C 114 32 118 78 80 94 C 42 78 46 32 46 32 Z" fill="url(#gold-cup)" stroke="#92400E" strokeWidth="1.5" />
        <ellipse cx="80" cy="32" rx="34" ry="7" fill="#FEF08A" stroke="#B45309" strokeWidth="1.5" />
        <ellipse cx="80" cy="33" rx="30" ry="4" fill="#F59E0B" />
        <path d="M 68 55 C 65 65 72 75 80 78 C 88 75 95 65 92 55" fill="none" stroke="#FEF3C7" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="80" cy="62" r="3.5" fill="#FEF3C7" />
        <path d="M 74 94 L 86 94 L 84 116 L 76 116 Z" fill="url(#gold-cup)" stroke="#92400E" strokeWidth="1" />
        <ellipse cx="80" cy="116" rx="14" ry="4" fill="#D97706" />
        <path d="M 62 118 L 98 118 L 102 126 L 58 126 Z" fill="url(#gold-cup)" stroke="#92400E" strokeWidth="1" />
        <rect x="50" y="126" width="60" height="26" rx="4" fill="url(#pedestal-wood)" stroke="#110502" strokeWidth="1.5" />
        <rect x="58" y="132" width="44" height="14" rx="2" fill="url(#pedestal-plate)" stroke="#92400E" strokeWidth="0.8" />
        <text x="80" y="142" fontSize="7" fontWeight="bold" textAnchor="middle" fill="#78350F" letterSpacing="0.5">BIO-AI 2026</text>
        <path d="M 116 26 L 118 31 L 123 33 L 118 35 L 116 40 L 114 35 L 109 33 L 114 31 Z" fill="#FFFBEB" />
        <path d="M 42 66 L 43 69 L 46 70 L 43 71 L 42 74 L 41 71 L 38 70 L 41 69 Z" fill="#FFFBEB" />
      </svg>
    </div>
  );
}

function ResultsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const attemptId = searchParams.get("attemptId") || "";
  const urlLang = searchParams.get("lang") as KioskLanguage | null;
  const { language, setLanguage, clearLanguage } = useArogyamithranLanguage();

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

  const [result, setResult] = useState<FullQuizResult | null>(null);
  const [loading, setLoading] = useState(() => Boolean(attemptId));
  const [errorMessage, setErrorMessage] = useState<string | null>(() =>
    !attemptId ? "No attempt identifier provided." : null
  );

  useEffect(() => {
    if (!attemptId) return;

    let isMounted = true;

    async function fetchResult() {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/kiosk/quiz/result?attemptId=${encodeURIComponent(attemptId)}`
        );
        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.message || "Failed to retrieve quiz results.");
        }

        if (isMounted) {
          // API returns SavedQuizResultRecord which includes qrCodeDataUrl & resultUrl
          setResult(data.result);
        }
      } catch (err: unknown) {
        if (isMounted) {
          setErrorMessage(err instanceof Error ? err.message : "Error retrieving result.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchResult();

    return () => {
      isMounted = false;
    };
  }, [attemptId]);

  const handlePlayAgain = () => {
    clearLanguage();
    router.push(`/kiosk/arogyamithran/instructions?lang=${activeLang}`);
  };

  const handleReturnHome = () => {
    clearLanguage();
    router.push("/kiosk");
  };

  return (
    <div className="min-h-screen w-full bg-[#F0F7F2] text-[#132E27] relative flex flex-col justify-between items-center selection:bg-[#55B96A]/25 overflow-x-hidden">
      <main className="w-full max-w-[820px] min-h-screen flex flex-col justify-between relative shadow-[0_0_60px_rgba(0,0,0,0.18)] overflow-hidden bg-[#F0F7F2]">
        {/* 1. Header with official KSUM | Kerala IT | Huddle Global branding */}
        <KioskSubHeader
          language={activeLang}
          backHref="/kiosk"
          backLabel="Exit"
          backLabelMl="പുറത്തു കടക്കുക"
        />

        {/* 2. Visual Content Area */}
        <div className="relative flex-1 flex flex-col justify-between px-3 sm:px-6 py-3 sm:py-5 overflow-y-auto">
          {/* Background Botanical Illustration */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <Image
              src="/assets/kiosk/backgrounds/hero_portrait.jpg"
              alt="Bio-AI results celebration background"
              fill
              priority
              className="object-cover object-center opacity-30 select-none"
              sizes="820px"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#F0F7F2]/95 via-[#F0F7F2]/85 to-[#F0F7F2]/95" />
          </div>

          {loading ? (
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center py-20">
              <div className="w-10 h-10 border-4 border-[#0B5D46]/20 border-t-[#0B5D46] rounded-full animate-spin mb-4" />
              <p className="text-sm font-bold text-[#073B30]">
                {isMl ? "ഫലം കണക്കാക്കുന്നു..." : "Calculating Your Score..."}
              </p>
            </div>
          ) : errorMessage && !result ? (
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center py-12 px-4 max-w-md mx-auto">
              <AlertCircle className="w-12 h-12 text-red-500 mb-3" />
              <h2 className="text-lg font-black text-[#073B30] mb-2">Notice</h2>
              <p className="text-xs text-[#244B3F] mb-4 leading-relaxed">{errorMessage}</p>
              <Link
                href="/kiosk"
                className="px-6 py-2.5 rounded-full bg-[#073B30] text-white text-xs font-bold"
              >
                Return to Kiosk
              </Link>
            </div>
          ) : result ? (
            /* ═════════════════════════════════════════════════════════════════
               SCREEN 7: FINAL RESULTS & QR CODE (Phase 3 enhanced)
            ═════════════════════════════════════════════════════════════════ */
            <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center flex-1 justify-between gap-3">
              {/* Header Title */}
              <div className="text-center pt-1">
                <h1 className={`text-xl sm:text-2xl font-black text-[#073B30] tracking-tight leading-tight ${isMl ? "font-malayalam" : ""}`}>
                  {isMl ? "ചലഞ്ച് പൂർത്തിയായി!" : "Your Bio-AI Challenge Result"}
                </h1>
                <p className={`text-xs font-semibold text-[#0B5D46] mt-0.5 ${isMl ? "font-malayalam" : ""}`}>
                  {isMl ? "നിങ്ങളുടെ ചലഞ്ച് പൂർത്തിയായി!" : "Your challenge is complete!"}
                </p>
              </div>

              {/* Score Hero Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full bg-white rounded-3xl p-4 sm:p-5 shadow-xl border-2 border-[#0B5D46]/15 flex items-center justify-between gap-3 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-amber-500/10 to-emerald-500/5 pointer-events-none" />

                {/* Left: Arogyamithran Celebration Pose — object-contain, full figure */}
                <div className="relative w-24 h-32 sm:w-28 sm:h-36 shrink-0 rounded-2xl overflow-hidden shadow-md border-2 border-white/80 bg-[#F0F7F1] flex items-end justify-center">
                  <Image
                    src="/assets/kiosk/arogyamithran/celebration.jpg"
                    alt="Arogyamithran celebrating quiz completion"
                    fill
                    priority
                    className="object-contain object-bottom"
                    sizes="120px"
                  />
                </div>

                {/* Center: Score Display */}
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#0B5D46] mb-0.5">
                    {isMl ? "നിങ്ങളുടെ സ്കോർ" : "YOUR SCORE"}
                  </span>
                  <div className="text-4xl sm:text-5xl font-black text-[#0B5D46] tracking-tight leading-none">
                    {result.totalScore}
                    <span className="text-2xl text-[#55B96A] font-bold">/100</span>
                  </div>
                  <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-emerald-100/80 text-[#073B30] text-[11px] font-bold">
                    {result.accuracyPercentage}% {isMl ? "കൃത്യത" : "Accuracy"}
                  </span>
                  {/* Negative marking note */}
                  <span className="inline-block mt-1 text-[10px] text-[#244B3F]/70 font-medium">
                    {isMl ? "(−5 തെറ്റിന്)" : "(−5 per wrong answer)"}
                  </span>
                </div>

                {/* Right: Golden Trophy */}
                <GoldenTrophyGraphic className="w-20 h-28 sm:w-24 sm:h-32" />
              </motion.div>

              {/* 3 Metrics Row */}
              <div className="w-full grid grid-cols-3 gap-2.5">
                <div className="bg-white rounded-2xl p-2.5 text-center border-2 border-emerald-100 shadow-sm flex flex-col items-center justify-center">
                  <span className="text-xl font-black text-[#0B5D46] leading-none mb-0.5">{result.correctCount}</span>
                  <span className={`text-[10px] font-bold text-gray-600 leading-tight ${isMl ? "font-malayalam" : ""}`}>
                    {isMl ? "ശരി" : "Correct"}
                  </span>
                </div>
                <div className="bg-white rounded-2xl p-2.5 text-center border-2 border-red-100 shadow-sm flex flex-col items-center justify-center">
                  <span className="text-xl font-black text-[#D97706] leading-none mb-0.5">{result.incorrectCount}</span>
                  <span className={`text-[10px] font-bold text-gray-600 leading-tight ${isMl ? "font-malayalam" : ""}`}>
                    {isMl ? "തെറ്റ്" : "Wrong"}
                  </span>
                </div>
                <div className="bg-white rounded-2xl p-2.5 text-center border-2 border-teal-100 shadow-sm flex flex-col items-center justify-center">
                  <span className="text-xl font-black text-[#073B30] leading-none mb-0.5">{result.totalQuestions}</span>
                  <span className={`text-[10px] font-bold text-gray-600 leading-tight ${isMl ? "font-malayalam" : ""}`}>
                    {isMl ? "ആകെ" : "Total"}
                  </span>
                </div>
              </div>

              {/* ═══ QR CODE CARD — Large & Scannable ═══ */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full bg-white rounded-3xl shadow-xl border-2 border-[#0B5D46]/20 overflow-hidden"
              >
                {/* QR Card Header */}
                <div className="bg-gradient-to-r from-[#073B30] to-[#0B5D46] px-4 py-3 text-white text-center">
                  <p className={`text-xs font-black uppercase tracking-widest ${isMl ? "font-malayalam" : ""}`}>
                    {isMl ? "📱 ഫോണിൽ സ്കാൻ ചെയ്യൂ" : "📱 Scan with Your Phone"}
                  </p>
                </div>

                <div className="p-4 flex items-center gap-4">
                  {/* QR Code — large enough to scan */}
                  <div className="relative w-32 h-32 sm:w-36 sm:h-36 bg-white rounded-2xl p-2 shadow-sm border-2 border-[#0B5D46]/10 shrink-0 flex items-center justify-center">
                    {result.qrCodeDataUrl ? (
                      <Image
                        src={result.qrCodeDataUrl}
                        alt={isMl ? "ഫലം കാണാൻ QR കോഡ് സ്കാൻ ചെയ്യൂ" : "Scan QR code to view your Bio-AI quiz result"}
                        width={144}
                        height={144}
                        className="w-full h-full object-contain"
                        unoptimized
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <QrCode className="w-14 h-14 text-[#0B5D46]" />
                        <span className="text-[10px] text-[#244B3F] font-medium">
                          {isMl ? "ഉൽപ്പാദിപ്പിക്കുന്നു..." : "Generating..."}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Scan Instructions */}
                  <div className="flex-1 flex flex-col gap-2">
                    <p className={`text-xs font-black text-[#073B30] leading-tight ${isMl ? "font-malayalam" : ""}`}>
                      {isMl
                        ? "ഈ QR കോഡ് നിങ്ങളുടെ ഫോൺ ക്യാമറ ഉപയോഗിച്ച് സ്കാൻ ചെയ്യൂ"
                        : "Scan this QR code with your phone camera"}
                    </p>
                    <p className={`text-[11px] text-[#244B3F]/80 font-medium leading-relaxed ${isMl ? "font-malayalam" : ""}`}>
                      {isMl
                        ? "നിങ്ങളുടെ ഫോണിൽ ഫലം തുറക്കും. ബയോ-എഐ ഡെസ്കിൽ കാണിക്കൂ."
                        : "Your verified result page will open on your phone. Show it at the Bio-AI desk."}
                    </p>

                    {result.resultUrl && (
                      <a
                        href={result.resultUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#0B5D46] underline underline-offset-2"
                      >
                        <span>{isMl ? "ലിങ്ക് തുറക്കൂ" : "Open result link"}</span>
                        <span>↗</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* QR fallback if not available */}
                {!result.qrCodeDataUrl && (
                  <div className="px-4 pb-3">
                    <p className="text-[10px] text-[#244B3F]/70 text-center">
                      {isMl
                        ? "QR കോഡ് ലഭ്യമല്ല. ദയവായി ഡെസ്കിൽ ഇദ്ദേഹത്തെ ബന്ധപ്പെടുക."
                        : "QR unavailable. Please visit the Bio-AI desk directly."}
                    </p>
                  </div>
                )}
              </motion.div>

              {/* ═══ GOODIES COLLECTION CARD ═══ */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="w-full bg-gradient-to-r from-amber-50 to-yellow-50 rounded-3xl p-4 shadow-lg border-2 border-amber-200/60 flex items-start gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                  <Gift className="w-5 h-5 text-[#D97706]" />
                </div>
                <div>
                  <p className={`text-sm font-black text-[#92400E] mb-0.5 ${isMl ? "font-malayalam" : ""}`}>
                    {isMl ? "ഗുഡീസ് ശേഖരിക്കൂ" : "Collect Your Goodies"}
                  </p>
                  <p className={`text-[11px] text-[#78350F] font-medium leading-relaxed ${isMl ? "font-malayalam" : ""}`}>
                    {isMl
                      ? "നിങ്ങളുടെ ഫോണിൽ ഫലം കാണിക്കൂ. ബയോ-എഐ സെന്റർ ഓഫ് എക്സലൻസ് ഡെസ്കിൽ ഫലം കാണിച്ച് ഗുഡീസ് ശേഖരിക്കൂ."
                      : "Show your result page at the Bio-AI Centre of Excellence desk to claim your goodies."}
                  </p>
                  <p className={`text-[11px] text-[#0B5D46] font-semibold mt-2 ${isMl ? "font-malayalam" : ""}`}>
                    {isMl
                      ? "ബയോടെക്നോളജി, ആയുർവേദം, നിർമ്മിതബുദ്ധി — ഇവ പര്യവേഷണം ചെയ്തതിന് നന്ദി!"
                      : "Thank you for exploring biotechnology, Ayurveda and artificial intelligence!"}
                  </p>
                </div>
              </motion.div>

              {/* Email delivery status */}
              <div className="w-full flex items-center gap-2 text-xs font-semibold text-[#0B5D46]">
                <CheckCircle2 className="w-4 h-4 text-[#55B96A] shrink-0" />
                <span className={isMl ? "font-malayalam" : ""}>
                  {isMl
                    ? "നിങ്ങളുടെ ഫലം രജിസ്റ്റർ ചെയ്ത ഇമെയിൽ വിലാസത്തിലേക്ക് അയച്ചിട്ടുണ്ട്."
                    : "Your result has been sent to your registered email address."}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="w-full flex flex-col gap-2 mt-1">
                <div className="w-full grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={handlePlayAgain}
                    className="w-full min-h-[44px] rounded-2xl bg-white hover:bg-emerald-50 text-[#073B30] font-bold text-xs border-2 border-[#0B5D46]/20 shadow-xs flex items-center justify-center gap-1.5 touch-manipulation active:scale-95 transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-[#55B96A]" />
                    <span className={isMl ? "font-malayalam" : ""}>
                      {isMl ? "വീണ്ടും കളിക്കുക" : "Play Again"}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={handleReturnHome}
                    className="w-full min-h-[44px] rounded-2xl bg-white hover:bg-emerald-50 text-[#073B30] font-bold text-xs border-2 border-[#0B5D46]/20 shadow-xs flex items-center justify-center gap-1.5 touch-manipulation active:scale-95 transition-all"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 text-[#55B96A]" />
                    <span className={isMl ? "font-malayalam" : ""}>
                      {isMl ? "പ്രധാന പേജ്" : "Return Home"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}

export default function ArogyamithranResultsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F0F7F2]" />}>
      <ResultsContent />
    </Suspense>
  );
}
