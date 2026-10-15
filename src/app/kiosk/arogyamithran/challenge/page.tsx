"use client";

import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Sparkles, AlertCircle } from "lucide-react";
import KioskSubHeader from "@/components/kiosk/KioskSubHeader";
import { useArogyamithranLanguage } from "@/components/kiosk/ArogyamithranContext";
import {
  KioskLanguage,
  QuizQuestionClient,
  QuizAnswerResponse,
} from "@/components/kiosk/types";

function ChallengeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const attemptId = searchParams.get("attemptId") || "";
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

  // State
  const [questions, setQuestions] = useState<QuizQuestionClient[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<QuizAnswerResponse | null>(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(() => Boolean(attemptId));
  const [errorMessage, setErrorMessage] = useState<string | null>(() =>
    !attemptId ? "No active challenge attempt found. Please start from registration." : null
  );

  // Load questions on mount
  useEffect(() => {
    if (!attemptId) return;

    let isMounted = true;

    async function loadAttempt() {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/kiosk/quiz/result?attemptId=${encodeURIComponent(attemptId)}&action=recover`
        );
        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.message || "Failed to load attempt questions.");
        }

        if (isMounted) {
          setQuestions(data.questions || []);
          setScore(data.currentScore || 0);

          const answered = data.answeredQuestions || {};
          const answeredKeys = Object.keys(answered);

          if (answeredKeys.length >= (data.questions || []).length && (data.questions || []).length > 0) {
            router.push(
              `/kiosk/arogyamithran/results?attemptId=${encodeURIComponent(
                attemptId
              )}&regId=${encodeURIComponent(regId)}&lang=${activeLang}`
            );
            return;
          }

          const firstUnansweredIndex = (data.questions || []).findIndex(
            (q: QuizQuestionClient) => !answered[q.id]
          );

          if (firstUnansweredIndex >= 0) {
            setCurrentIndex(firstUnansweredIndex);
          }
        }
      } catch (err: unknown) {
        if (isMounted) {
          setErrorMessage(err instanceof Error ? err.message : "Error loading attempt.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadAttempt();

    return () => {
      isMounted = false;
    };
  }, [attemptId, regId, activeLang, router]);

  const currentQuestion = questions[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / (questions.length || 10)) * 100);

  // Submit Answer Handler
  const handleSubmitAnswer = async () => {
    if (selectedOption === null || !currentQuestion || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/kiosk/quiz/submit-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          attemptId,
          questionId: currentQuestion.id,
          selectedOptionIndex: selectedOption,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to submit answer.");
      }

      setFeedback(data);
      setScore(data.currentScore);
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : "Submission error.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Next Question Handler
  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setFeedback(null);
      setErrorMessage(null);
    } else {
      router.push(
        `/kiosk/arogyamithran/results?attemptId=${encodeURIComponent(
          attemptId
        )}&regId=${encodeURIComponent(regId)}&lang=${activeLang}`
      );
    }
  };

  const optionLabels = ["A", "B", "C", "D"];

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
              alt="Bio-AI challenge background"
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
                {isMl ? "ചോദ്യങ്ങൾ തയ്യാറാക്കുന്നു..." : "Loading Bio-AI Challenge..."}
              </p>
            </div>
          ) : errorMessage && !currentQuestion ? (
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center py-12 px-4 max-w-md mx-auto">
              <AlertCircle className="w-12 h-12 text-red-500 mb-3" />
              <h2 className="text-lg font-black text-[#073B30] mb-2">Notice</h2>
              <p className="text-xs text-[#244B3F] mb-4 leading-relaxed">{errorMessage}</p>
              <Link
                href={`/kiosk/arogyamithran/register?lang=${activeLang}`}
                className="px-6 py-2.5 rounded-full bg-[#073B30] text-white text-xs font-bold"
              >
                Register to Start
              </Link>
            </div>
          ) : !feedback ? (
            /* ═════════════════════════════════════════════════════════════════
               SCREEN 5: QUIZ QUESTION MODE (AKINATOR-STYLE MASCOT ON TOP)
            ═════════════════════════════════════════════════════════════════ */
            <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center flex-1 justify-between gap-2.5">
              {/* Progress Bar Header */}
              <div className="w-full">
                <div className="flex items-center justify-between text-xs font-bold text-[#073B30] mb-1">
                  <span>
                    {isMl
                      ? `ചോദ്യം ${currentIndex + 1} / ${questions.length || 10}`
                      : `Question ${currentIndex + 1} of ${questions.length || 10}`}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-[#0B5D46] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-[#0B5D46]/20">
                      {score} pts
                    </span>
                    <span className="text-[#0B5D46]">{progressPercent}%</span>
                  </div>
                </div>
                <div className="w-full h-2.5 bg-gray-200/80 rounded-full overflow-hidden p-0.5">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#0B5D46] to-[#55B96A] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* ─── AKINATOR-STYLE PROMINENT MASCOT ON TOP ─── */}
              <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 py-2">
                {/* Arogyamithran Large Character Showcase Frame with Kasavu Trim */}
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative w-44 h-56 sm:w-52 sm:h-64 md:w-60 md:h-72 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/90 bg-gradient-to-b from-[#F0F7F1] via-white to-[#FAFAF7] shrink-0"
                >
                  {/* Kerala Kasavu Gold & Emerald Header Trim */}
                  <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-[#0B5D46] via-[#D4AF37] to-[#0B5D46] z-10" />

                  {/* High-Resolution Thinking Character */}
                  <Image
                    src="/assets/kiosk/arogyamithran/thinking.jpg"
                    alt="Arogyamithran thinking pose"
                    fill
                    priority
                    className="object-cover object-top select-none"
                    sizes="(max-width: 640px) 220px, 260px"
                  />

                  {/* Active Status Beacon */}
                  <span className="absolute top-3.5 right-3.5 flex h-3.5 w-3.5 z-20">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#55B96A] opacity-75" />
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#55B96A] border-2 border-white" />
                  </span>
                </motion.div>

                {/* Akinator Speech Bubble with Pointer pointing to Arogyamithran */}
                <div className="relative bg-white rounded-2xl p-3.5 sm:p-4 shadow-xl border-2 border-[#0B5D46]/15 max-w-xs sm:max-w-sm text-left">
                  <div className="hidden sm:block absolute top-1/2 -left-2.5 -translate-y-1/2 w-3 h-3 bg-white border-b-2 border-l-2 border-[#0B5D46]/15 rotate-45" />
                  <div className="sm:hidden absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-t-2 border-l-2 border-[#0B5D46]/15 rotate-45" />
                  <p className={`text-sm sm:text-base font-black text-[#073B30] leading-snug ${isMl ? "font-malayalam" : ""}`}>
                    {isMl ? "മ്മ്... ചിന്തിച്ച് ഉത്തരം പറയൂ!" : "Hmm... Let's think!"}
                  </p>
                  <p className={`text-xs text-[#244B3F]/85 font-medium mt-1 leading-relaxed ${isMl ? "font-malayalam" : ""}`}>
                    {isMl ? "സസ്യശാസ്ത്ര രഹസ്യം കണ്ടെത്താൻ നിങ്ങൾക്ക് കഴിയുമോ?" : "Can you solve this Bio-AI mystery? Take a close look at the plant!"}
                  </p>
                </div>
              </div>

              {/* Question Card */}
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full bg-white rounded-3xl p-4 sm:p-5 shadow-xl border-2 border-[#0B5D46]/15 flex flex-col gap-2.5"
              >
                {/* Question Heading */}
                <h2 className={`text-sm sm:text-base md:text-lg font-black text-[#073B30] leading-snug tracking-tight ${isMl ? "font-malayalam" : ""}`}>
                  {currentQuestion.question}
                </h2>

                {/* Subject Image (New Generated Botanical Image) */}
                <div className="relative w-full h-32 sm:h-44 rounded-2xl overflow-hidden border border-[#0B5D46]/15 shadow-md bg-emerald-50/40">
                  <Image
                    src={currentQuestion.image || "/assets/kiosk/questions/turmeric.jpg"}
                    alt={currentQuestion.question}
                    fill
                    priority
                    className="object-cover object-center select-none"
                    sizes="(max-width: 640px) 100vw, 640px"
                  />
                </div>

                {/* 4 Selectable Options Grid */}
                <div className="flex flex-col gap-2">
                  {currentQuestion.options.map((option, idx) => {
                    const isSelected = selectedOption === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedOption(idx)}
                        disabled={isSubmitting}
                        className={`w-full min-h-[46px] sm:min-h-[50px] px-3.5 py-2 rounded-2xl border-2 text-left flex items-center gap-3 transition-all touch-manipulation active:scale-[0.99] ${
                          isSelected
                            ? "border-[#0B5D46] bg-[#F0F7F1] ring-2 ring-[#55B96A]/30 shadow-sm"
                            : "border-gray-200 hover:border-[#55B96A]/50 bg-white"
                        }`}
                      >
                        {/* Letter Badge A, B, C, D */}
                        <div
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full font-black text-xs sm:text-sm flex items-center justify-center shrink-0 transition-colors ${
                            isSelected
                              ? "bg-[#0B5D46] text-white shadow-xs"
                              : "bg-gray-100 text-[#073B30]"
                          }`}
                        >
                          {optionLabels[idx]}
                        </div>
                        {/* Option Text */}
                        <span className={`text-xs sm:text-sm font-bold text-[#132E27] flex-1 ${isMl ? "font-malayalam" : ""}`}>
                          {option}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Primary Button: Submit Answer */}
                <motion.button
                  type="button"
                  whileHover={{ scale: selectedOption !== null ? 1.01 : 1 }}
                  whileTap={{ scale: selectedOption !== null ? 0.98 : 1 }}
                  onClick={handleSubmitAnswer}
                  disabled={selectedOption === null || isSubmitting}
                  className={`w-full min-h-[48px] sm:min-h-[52px] mt-1 rounded-2xl font-black text-sm sm:text-base shadow-lg transition-all touch-manipulation flex items-center justify-center gap-2 ${
                    selectedOption !== null && !isSubmitting
                      ? "bg-gradient-to-r from-[#073B30] to-[#0B5D46] hover:from-[#0B5D46] hover:to-[#55B96A] text-[#FAFAF7] border border-white/20 active:scale-95"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed border border-transparent shadow-none"
                  }`}
                >
                  {isSubmitting ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span className={isMl ? "font-malayalam" : ""}>
                        {isMl ? "ഉത്തരം സമർപ്പിക്കുക" : "Submit Answer"}
                      </span>
                      <span className="text-lg">→</span>
                    </>
                  )}
                </motion.button>
              </motion.div>

              {/* Back to Home Link */}
              <div className="text-center pt-0.5">
                <Link
                  href="/kiosk"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-white/90 hover:bg-white text-[#073B30] text-[11px] font-bold shadow-xs border border-[#0B5D46]/20 transition-all active:scale-95 touch-manipulation"
                >
                  <ArrowLeft className="w-3 h-3 text-[#55B96A]" />
                  <span>{isMl ? "പ്രധാന പേജ്" : "Back to Home"}</span>
                </Link>
              </div>
            </div>
          ) : (
            /* ═════════════════════════════════════════════════════════════════
               SCREEN 6A & 6B: ANSWER FEEDBACK MODE (AKINATOR-STYLE REACTION)
            ═════════════════════════════════════════════════════════════════ */
            <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center flex-1 justify-between gap-2.5">
              {/* Progress Bar Header */}
              <div className="w-full">
                <div className="flex items-center justify-between text-xs font-bold text-[#073B30] mb-1">
                  <span>
                    {isMl
                      ? `ചോദ്യം ${currentIndex + 1} / ${questions.length || 10}`
                      : `Question ${currentIndex + 1} of ${questions.length || 10}`}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-[#0B5D46] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-[#0B5D46]/20">
                      {score} pts
                    </span>
                    <span className="text-[#0B5D46]">{progressPercent}%</span>
                  </div>
                </div>
                <div className="w-full h-2.5 bg-gray-200/80 rounded-full overflow-hidden p-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-[#0B5D46] to-[#55B96A] rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* ─── AKINATOR-STYLE PROMINENT MASCOT REACTION ON TOP ─── */}
              <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 py-2">
                {/* Large Reaction Character Frame */}
                <motion.div
                  initial={{ scale: 0.9, y: 10 }}
                  animate={{ scale: 1, y: [0, -5, 0] }}
                  transition={{
                    scale: { duration: 0.3 },
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="relative w-44 h-56 sm:w-52 sm:h-64 md:w-60 md:h-72 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/90 bg-gradient-to-b from-[#F0F7F1] via-white to-[#FAFAF7] shrink-0"
                >
                  <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-[#0B5D46] via-[#D4AF37] to-[#0B5D46] z-10" />

                  <Image
                    src={
                      feedback.isCorrect
                        ? "/assets/kiosk/arogyamithran/correct-answer.jpg"
                        : "/assets/kiosk/arogyamithran/holding-spice.jpg"
                    }
                    alt={feedback.isCorrect ? "Arogyamithran celebrating" : "Arogyamithran encouraging"}
                    fill
                    priority
                    className="object-cover object-top select-none"
                    sizes="(max-width: 640px) 220px, 260px"
                  />

                  {/* Status Beacon */}
                  <span className="absolute top-3.5 right-3.5 flex h-3.5 w-3.5 z-20">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${feedback.isCorrect ? "bg-[#55B96A]" : "bg-[#D97706]"} opacity-75`} />
                    <span className={`relative inline-flex rounded-full h-3.5 w-3.5 ${feedback.isCorrect ? "bg-[#55B96A]" : "bg-[#D97706]"} border-2 border-white`} />
                  </span>
                </motion.div>

                {/* Speech Bubble with Pointer */}
                <div
                  className={`relative rounded-2xl p-3.5 sm:p-4 shadow-xl border-2 max-w-xs sm:max-w-sm text-left ${
                    feedback.isCorrect
                      ? "bg-emerald-50/95 border-[#55B96A]/60 text-[#073B30]"
                      : "bg-amber-50/95 border-[#D97706]/50 text-[#073B30]"
                  }`}
                >
                  <div className={`hidden sm:block absolute top-1/2 -left-2.5 -translate-y-1/2 w-3 h-3 rotate-45 ${
                    feedback.isCorrect ? "bg-emerald-50 border-b-2 border-l-2 border-[#55B96A]/60" : "bg-amber-50 border-b-2 border-l-2 border-[#D97706]/50"
                  }`} />
                  <div className={`sm:hidden absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 ${
                    feedback.isCorrect ? "bg-emerald-50 border-t-2 border-l-2 border-[#55B96A]/60" : "bg-amber-50 border-t-2 border-l-2 border-[#D97706]/50"
                  }`} />
                  <p className="text-sm sm:text-base font-black tracking-tight flex items-center gap-1.5">
                    {feedback.isCorrect ? (
                      <>
                        <Sparkles className="w-4 h-4 text-[#55B96A] shrink-0" />
                        <span>{isMl ? "മികച്ച ഉത്തരം! ശരിയായി!" : "Excellent! You got it right!"}</span>
                      </>
                    ) : (
                      <span>{isMl ? "നല്ല ശ്രമം! നമുക്ക് പുതിയൊരു കാര്യം പഠിക്കാം." : "Good try! Let's learn something new."}</span>
                    )}
                  </p>
                  <p className="text-xs font-semibold text-[#244B3F]/85 mt-1 leading-relaxed">
                    {feedback.isCorrect
                      ? isMl ? "+10 പോയിന്റുകൾ ലഭിച്ചു! നിങ്ങളുടെ അറിവ് അത്ഭുതപ്പെടുത്തുന്നു!" : "+10 points awarded! Your knowledge of nature is remarkable."
                      : isMl ? "എല്ലാ ഉത്തരങ്ങളിൽ നിന്നും പുതിയൊരു അറിവ് നേടാം!" : "Every attempt teaches us something new. Keep exploring!"}
                  </p>
                </div>
              </div>

              {/* Feedback Card matching Storyboard 6A & 6B */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full bg-white rounded-3xl p-4 sm:p-5 shadow-xl border-2 border-[#0B5D46]/15 flex flex-col gap-2.5"
              >
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {isMl ? "ശരിയുത്തരം:" : "The correct answer is:"}
                </p>

                {/* Highlighted Correct Answer */}
                <div className="flex items-center gap-2 p-3 rounded-2xl bg-[#F0F7F1] border border-[#0B5D46]/20">
                  <CheckCircle2 className="w-5 h-5 text-[#55B96A] shrink-0" />
                  <span className={`text-sm sm:text-base font-black text-[#073B30] ${isMl ? "font-malayalam" : ""}`}>
                    {feedback.correctAnswer}
                  </span>
                </div>

                {/* Verified Explanation */}
                <p className={`text-xs sm:text-sm text-[#244B3F] font-medium leading-relaxed pt-1 ${isMl ? "font-malayalam" : ""}`}>
                  {feedback.explanation}
                </p>

                {/* Action Button: Next Question or See Final Results */}
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleNextQuestion}
                  className="w-full min-h-[48px] sm:min-h-[52px] mt-2 rounded-2xl bg-gradient-to-r from-[#073B30] to-[#0B5D46] hover:from-[#0B5D46] hover:to-[#55B96A] text-[#FAFAF7] font-black text-sm sm:text-base shadow-lg border border-white/20 flex items-center justify-center gap-2 touch-manipulation active:scale-95 transition-all"
                >
                  <span className={isMl ? "font-malayalam" : ""}>
                    {currentIndex < questions.length - 1
                      ? isMl ? "അടുത്ത ചോദ്യം" : "Next Question"
                      : isMl ? "അന്തിമ ഫലം കാണുക" : "See Final Results"}
                  </span>
                  <span className="text-lg">→</span>
                </motion.button>
              </motion.div>

              {/* Back to Home Link */}
              <div className="text-center pt-0.5">
                <Link
                  href="/kiosk"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-white/90 hover:bg-white text-[#073B30] text-[11px] font-bold shadow-xs border border-[#0B5D46]/20 transition-all active:scale-95 touch-manipulation"
                >
                  <ArrowLeft className="w-3 h-3 text-[#55B96A]" />
                  <span>{isMl ? "പ്രധാന പേജ്" : "Back to Home"}</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function ArogyamithranChallengePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F0F7F2]" />}>
      <ChallengeContent />
    </Suspense>
  );
}
