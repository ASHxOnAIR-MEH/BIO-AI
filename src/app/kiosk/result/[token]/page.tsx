"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ArogyamithranCharacterFrame from "@/components/kiosk/ArogyamithranCharacterFrame";
import {
  KioskLanguage,
  PublicResultViewData,
  QuizReviewItem,
} from "@/components/kiosk/types";
import { KIOSK_BRANDING } from "@/lib/kioskAssets";

interface PageProps {
  params: Promise<{ token: string }>;
}

export default function PersonalResultPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const token = resolvedParams.token;

  const [result, setResult] = useState<PublicResultViewData | null>(null);
  const [loading, setLoading] = useState(() => Boolean(token));
  const [errorMessage, setErrorMessage] = useState<string | null>(() =>
    !token ? "No access token provided." : null
  );
  const [language, setLanguage] = useState<KioskLanguage>("en");
  const [showReview, setShowReview] = useState(false);

  useEffect(() => {
    if (!token) {
      return;
    }

    let isMounted = true;

    async function loadResult() {
      try {
        setLoading(true);
        const res = await fetch(`/api/kiosk/result/${encodeURIComponent(token)}`);
        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.message || "Failed to retrieve quiz result.");
        }

        if (isMounted) {
          setResult(data.result);
          if (data.result.language) {
            setLanguage(data.result.language);
          }
        }
      } catch (err: unknown) {
        if (isMounted) {
          const msg =
            err instanceof Error ? err.message : "Error loading result.";
          setErrorMessage(msg);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadResult();

    return () => {
      isMounted = false;
    };
  }, [token]);

  const isMl = language === "ml";

  // Loading State
  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#FAFAF7] text-[#073B30] p-4">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="w-12 h-12 rounded-full border-4 border-[#0B5D46] border-t-transparent animate-spin" />
          <p className="text-sm font-bold">
            {isMl ? "ഫലം ലഭ്യമാക്കുന്നു..." : "Loading Your Result..."}
          </p>
        </div>
      </main>
    );
  }

  // Error State
  if (errorMessage || !result) {
    return (
      <main className="min-h-screen flex flex-col justify-between bg-[#FAFAF7] text-[#132E27] p-4 sm:p-6">
        <header className="w-full max-w-md mx-auto py-4 flex items-center justify-between border-b border-[#0B5D46]/10">
          <Image
            src="/ksum-logo.png"
            alt="Kerala Startup Mission"
            width={120}
            height={48}
            priority
            className="h-7 w-auto object-contain"
          />
          <span className="text-[11px] font-bold text-[#0B5D46] uppercase">
            Bio-AI CoE
          </span>
        </header>

        <div className="max-w-md mx-auto my-auto text-center py-12 px-4">
          <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-2xl mx-auto mb-4 font-bold">
            !
          </div>
          <h1 className="text-xl font-bold text-[#073B30] mb-2">
            {isMl
              ? "ഫലം കണ്ടെത്താനായില്ല അല്ലെങ്കിൽ കാലാവധി കഴിഞ്ഞു"
              : "Result Not Found or Link Expired"}
          </h1>
          <p className="text-xs sm:text-sm text-[#244B3F] mb-6 leading-relaxed">
            {errorMessage ||
              "This result link is invalid, has expired, or access has been revoked."}
          </p>
          <Link
            href="/"
            className="inline-flex px-6 py-3 rounded-xl bg-[#073B30] text-white text-xs font-bold hover:bg-[#0B5D46] transition-all"
          >
            Visit Bio-AI Website
          </Link>
        </div>

        <footer className="w-full max-w-md mx-auto py-4 text-center text-[10px] text-[#244B3F]/75 border-t border-[#0B5D46]/10">
          Bio-AI Centre of Excellence · KSUM Digital Hub, Kochi
        </footer>
      </main>
    );
  }

  // Format Completion Date
  let formattedDate = "";
  try {
    const d = new Date(result.completedAt);
    formattedDate = d.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    formattedDate = result.completedAt;
  }

  // Encouraging Dialogue based on score
  let congratulatoryMessage = "";
  if (result.totalScore >= 80) {
    congratulatoryMessage = isMl
      ? "അത്ഭുതകരമായ അറിവ്! നിങ്ങൾ ബയോ-എഐയുടെയും ഔഷധസസ്യങ്ങളുടെയും ലോകത്ത് മികച്ച മികവ് പുലർത്തിയിരിക്കുന്നു."
      : "Outstanding! You demonstrated deep insight into Bio-AI, medicinal plants, and scientific concepts.";
  } else if (result.totalScore >= 50) {
    congratulatoryMessage = isMl
      ? "മികച്ച പ്രകടനം! കേരളത്തിന്റെ ജൈവ സമ്പത്തിനെക്കുറിച്ചും ആധുനിക ബയോ-എഐ സാങ്കേതികവിദ്യകളെക്കുറിച്ചും വിലപ്പെട്ട അറിവുകൾ നിങ്ങൾ നേടി."
      : "Great performance! You grasped essential concepts across Bio-AI innovations and Kerala's botanical heritage.";
  } else {
    congratulatoryMessage = isMl
      ? "നല്ല ശ്രമം! ഓരോ ചോദ്യവും പുതിയൊരു അറിവ് നേടാനുള്ള അവസരമായിരുന്നു. ശാസ്ത്രവും ആയുർവേദവും എന്നും കൗതുകകരമാണ്."
      : "Wonderful effort! Every question was an opportunity to learn something new about Bio-AI and traditional knowledge.";
  }

  return (
    <main className="min-h-screen flex flex-col justify-between bg-[#FAFAF7] text-[#132E27] relative selection:bg-[#55B96A]/20">
      {/* ─── MOBILE-OPTIMIZED HEADER ───────────────────────────────────── */}
      <header className="w-full bg-[#FAFAF7]/95 backdrop-blur-md border-b border-[#0B5D46]/15 sticky top-0 z-40">
        <div className="max-w-xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 bg-white/95 rounded-xl px-2.5 py-1 border border-[#0B5D46]/15 shadow-2xs">
            <Image
              src={KIOSK_BRANDING.ksum.path}
              alt={isMl ? KIOSK_BRANDING.ksum.altTextMl : KIOSK_BRANDING.ksum.altTextEn}
              width={100}
              height={36}
              priority
              className="h-5 sm:h-6 w-auto object-contain select-none"
            />
            <div className="h-4 w-px bg-[#0B5D46]/20" />
            <Image
              src={KIOSK_BRANDING.huddleGlobal.path}
              alt={isMl ? KIOSK_BRANDING.huddleGlobal.altTextMl : KIOSK_BRANDING.huddleGlobal.altTextEn}
              width={85}
              height={32}
              priority
              className="h-4 sm:h-5 w-auto object-contain select-none"
            />
          </div>

          {/* Bilingual Language Toggle */}
          <div className="flex items-center gap-1 bg-[#F0F7F1] p-0.5 rounded-full border border-[#0B5D46]/20 text-[11px] font-bold">
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={`px-2.5 py-1 rounded-full transition-all ${
                !isMl
                  ? "bg-[#073B30] text-white shadow-xs"
                  : "text-[#0B5D46] hover:bg-white/60"
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage("ml")}
              className={`px-2.5 py-1 rounded-full transition-all font-malayalam ${
                isMl
                  ? "bg-[#073B30] text-white shadow-xs"
                  : "text-[#0B5D46] hover:bg-white/60"
              }`}
            >
              മലയാളം
            </button>
          </div>
        </div>
      </header>

      {/* ─── MAIN RESULT CONTENT ───────────────────────────────────────── */}
      <div className="flex-1 max-w-xl w-full mx-auto px-4 py-6 sm:py-8 flex flex-col items-center text-center">
        {/* Branding Subhead */}
        <p className="text-[11px] font-extrabold uppercase tracking-widest text-[#0B5D46] mb-1">
          Bio-AI Centre of Excellence · KSUM Digital Hub
        </p>

        <h1
          className={`text-2xl sm:text-3xl font-extrabold text-[#073B30] tracking-tight mb-1 ${
            isMl ? "font-malayalam leading-snug" : ""
          }`}
        >
          {isMl ? "നിങ്ങളുടെ ചലഞ്ച് ഫലം" : "Your Challenge Results"}
        </h1>

        <p className="text-xs text-[#244B3F]/80 mb-6">
          Arogyamithran Bio-AI Challenge
        </p>

        {/* Score Showcase Card */}
        <motion.div
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="w-full bg-gradient-to-b from-white via-[#F0F7F1]/50 to-white rounded-3xl p-6 border-2 border-[#0B5D46]/20 shadow-[0_8px_30px_rgba(11,93,70,0.08)] mb-6 relative overflow-hidden"
        >
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#0B5D46] via-[#D4AF37] to-[#55B96A]" />

          <p className="text-[11px] font-bold uppercase tracking-widest text-[#0B5D46] mb-1">
            {isMl ? "നിങ്ങളുടെ അന്തിമ സ്കോർ" : "YOUR SCORE"}
          </p>

          <div className="text-5xl sm:text-6xl font-black text-[#073B30] tracking-tight mb-2">
            <span>{result.totalScore}</span>
            <span className="text-xl sm:text-2xl font-bold text-[#0B5D46]/60">
              {" "}/ 100
            </span>
          </div>

          {/* Breakdown Pills */}
          <div className="grid grid-cols-2 gap-2.5 mt-5 pt-4 border-t border-[#0B5D46]/15 text-center">
            <div className="p-2.5 rounded-xl bg-white border border-[#0B5D46]/15 shadow-2xs">
              <span className="block text-xl font-black text-[#0B5D46]">
                {result.correctCount} / {result.totalQuestions}
              </span>
              <span className="text-[11px] font-semibold text-[#244B3F]">
                {isMl ? "ശരിയുത്തരങ്ങൾ" : "Correct Answers"}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-white border border-[#0B5D46]/15 shadow-2xs">
              <span className="block text-xl font-black text-[#991B1B]">
                {result.incorrectCount} / {result.totalQuestions}
              </span>
              <span className="text-[11px] font-semibold text-[#244B3F]">
                {isMl ? "തെറ്റിയവ" : "Incorrect"}
              </span>
            </div>
          </div>

          {/* Timestamp & Result ID (No PII) */}
          <div className="mt-4 pt-3 border-t border-[#0B5D46]/10 flex items-center justify-between text-[10px] text-[#244B3F]/75 font-medium">
            <span className="font-mono">ID: {result.resultId}</span>
            <span>{formattedDate}</span>
          </div>
        </motion.div>

        {/* Arogyamithran Character Frame */}
        <div className="w-full mb-6">
          <ArogyamithranCharacterFrame
            compact={true}
            selectedLanguage={language}
            expression="final"
            dialogue={congratulatoryMessage}
          />
        </div>

        {/* Compact Question Review Accordion */}
        <div className="w-full mb-6">
          <button
            type="button"
            onClick={() => setShowReview(!showReview)}
            className="w-full py-3 px-4 rounded-2xl bg-white border-2 border-[#0B5D46]/15 shadow-xs text-xs font-bold text-[#073B30] hover:bg-[#F0F7F1] transition-all flex items-center justify-between"
          >
            <span>
              {showReview
                ? isMl
                  ? "ചോദ്യങ്ങൾ മറയ്ക്കുക"
                  : "Hide Question Review"
                : isMl
                ? `ചോദ്യങ്ങൾ അവലോകനം ചെയ്യുക (${result.review.length} എണ്ണം)`
                : `Review All ${result.review.length} Questions & Answers`}
            </span>
            <span className="text-sm text-[#0B5D46]">
              {showReview ? "▲" : "▼"}
            </span>
          </button>

          {showReview && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-3 space-y-2.5 text-left overflow-hidden"
            >
              {result.review.map((item: QuizReviewItem, idx: number) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl border text-xs ${
                    item.isCorrect
                      ? "bg-white border-[#55B96A]/40"
                      : "bg-white border-red-200"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-bold text-[#073B30]">
                      #{item.questionId} · Q{idx + 1}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        item.isCorrect
                          ? "bg-[#55B96A] text-[#073B30]"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.isCorrect ? "+10 pts" : "0 pts"}
                    </span>
                  </div>

                  <p className="font-semibold text-[#132E27] mb-2 leading-snug">
                    {item.questionText}
                  </p>

                  <div className="space-y-1 text-[11px]">
                    <p className="text-[#244B3F]">
                      <span className="font-bold">
                        {isMl ? "നിങ്ങൾ തിരഞ്ഞെടുത്തത്: " : "Your Choice: "}
                      </span>
                      {item.selectedOptionIndex >= 0
                        ? item.options[item.selectedOptionIndex]
                        : "None"}
                    </p>

                    {!item.isCorrect && (
                      <p className="text-[#0B5D46] font-bold">
                        <span>{isMl ? "ശരിയുത്തരം: " : "Correct: "}</span>
                        {item.options[item.correctOptionIndex]}
                      </p>
                    )}

                    {item.explanation && (
                      <p className="text-[#244B3F]/85 italic mt-1 pt-1 border-t border-gray-100">
                        {item.explanation}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Explore More on Main Website */}
        <div className="w-full">
          <Link
            href="/"
            className="w-full min-h-[48px] px-6 py-3.5 rounded-2xl bg-[#073B30] text-[#FAFAF7] hover:bg-[#0B5D46] active:scale-95 transition-all text-sm font-bold shadow-md flex items-center justify-center gap-2"
          >
            <span>
              {isMl ? "ബയോ-എഐ വെബ്സൈറ്റ് സന്ദർശിക്കുക" : "Explore Bio-AI Centre of Excellence"}
            </span>
            <span className="text-[#55B96A]">→</span>
          </Link>
        </div>
      </div>

      {/* ─── FOOTER ────────────────────────────────────────────────────── */}
      <footer className="w-full py-4 px-4 border-t border-[#0B5D46]/15 bg-[#F0F7F1]/80 text-[#244B3F] text-center text-[11px]">
        <p className="font-semibold text-[#073B30] mb-0.5">
          Bio-AI Centre of Excellence
        </p>
        <p className="text-[#244B3F]/75">
          Kerala Startup Mission (KSUM) · Digital Hub, Kalamassery, Kochi
        </p>
      </footer>
    </main>
  );
}
