"use client";

import { Suspense, useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle2, Sparkles, AlertCircle, Clock } from "lucide-react";
import KioskSubHeader from "@/components/kiosk/KioskSubHeader";
import { useArogyamithranLanguage } from "@/components/kiosk/ArogyamithranContext";
import {
  KioskLanguage,
  QuizQuestionClient,
  QuizAnswerResponse,
} from "@/components/kiosk/types";

// Per-question time limit in seconds
const QUESTION_TIME_LIMIT = 60;

// Mascot character frame — object-contain so full character is always visible
function MascotFrame({
  src,
  alt,
  isCorrect,
  isFeedback,
}: {
  src: string;
  alt: string;
  isCorrect?: boolean;
  isFeedback?: boolean;
}) {
  const beaconColor = isFeedback
    ? isCorrect
      ? "bg-[#55B96A]"
      : "bg-[#D97706]"
    : "bg-[#0B5D46]";

  return (
    <motion.div
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="relative w-44 h-56 sm:w-52 sm:h-64 md:w-60 md:h-72 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/90 bg-gradient-to-b from-[#F0F7F1] via-white to-[#FAFAF7] shrink-0 flex items-end justify-center"
    >
      <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-[#0B5D46] via-[#D4AF37] to-[#0B5D46] z-10" />
      <Image
        src={src}
        alt={alt}
        fill
        priority
        className="object-contain object-bottom select-none pointer-events-none"
        sizes="(max-width: 640px) 220px, 260px"
      />
      <span className="absolute top-3.5 right-3.5 flex h-3.5 w-3.5 z-20">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${beaconColor} opacity-75`} />
        <span className={`relative inline-flex rounded-full h-3.5 w-3.5 ${beaconColor} border-2 border-white`} />
      </span>
      <div className="absolute inset-x-0 bottom-0 h-1 bg-[#0B5D46]/20 z-10" />
    </motion.div>
  );
}

// Circular countdown timer ring
function CountdownRing({ timeLeft, total }: { timeLeft: number; total: number }) {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const progress = timeLeft / total;
  const strokeDashoffset = circumference * (1 - progress);
  const isUrgent = timeLeft <= 10;

  return (
    <div className="relative flex items-center justify-center w-14 h-14 shrink-0">
      <svg className="absolute inset-0 -rotate-90" width="56" height="56" viewBox="0 0 56 56">
        <circle cx="28" cy="28" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="4" />
        <circle
          cx="28" cy="28" r={radius}
          fill="none"
          stroke={isUrgent ? "#ef4444" : "#0B5D46"}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: "stroke-dashoffset 1s linear, stroke 0.3s" }}
        />
      </svg>
      <div className={`flex flex-col items-center justify-center z-10 ${isUrgent ? "text-red-600" : "text-[#073B30]"}`}>
        <Clock className="w-3 h-3 mb-0.5" />
        <span className="text-xs font-black leading-none">{timeLeft}s</span>
      </div>
    </div>
  );
}

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

  // 60-second countdown timer
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME_LIMIT);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const submittedByTimerRef = useRef(false);

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
        if (!res.ok || !data.success) throw new Error(data.message || "Failed to load attempt questions.");
        if (isMounted) {
          setQuestions(data.questions || []);
          setScore(data.currentScore || 0);
          const answered = data.answeredQuestions || {};
          const answeredKeys = Object.keys(answered);
          if (answeredKeys.length >= (data.questions || []).length && (data.questions || []).length > 0) {
            router.push(
              `/kiosk/arogyamithran/results?attemptId=${encodeURIComponent(attemptId)}&regId=${encodeURIComponent(regId)}&lang=${activeLang}`
            );
            return;
          }
          const firstUnansweredIndex = (data.questions || []).findIndex(
            (q: QuizQuestionClient) => !answered[q.id]
          );
          if (firstUnansweredIndex >= 0) setCurrentIndex(firstUnansweredIndex);
        }
      } catch (err: unknown) {
        if (isMounted) setErrorMessage(err instanceof Error ? err.message : "Error loading attempt.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadAttempt();
    return () => { isMounted = false; };
  }, [attemptId, regId, activeLang, router]);

  // Submit answer handler
  const handleSubmitAnswer = useCallback(
    async (optionIndex: number | null, isTimedOut = false) => {
      if (isSubmitting) return;
      const finalOption = optionIndex ?? -1;
      const currentQ = questions[currentIndex];
      if (!currentQ) return;
      if (isTimedOut && feedback !== null) return;

      setIsSubmitting(true);
      setErrorMessage(null);

      try {
        const response = await fetch("/api/kiosk/quiz/submit-answer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            attemptId,
            questionId: currentQ.id,
            selectedOptionIndex: finalOption,
          }),
        });
        const data = await response.json();
        if (!response.ok || !data.success) throw new Error(data.error || "Failed to submit answer.");
        setFeedback(data);
        setScore(data.currentScore);
        if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
      } catch (err: unknown) {
        setErrorMessage(err instanceof Error ? err.message : "Submission error.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [isSubmitting, questions, currentIndex, feedback, attemptId]
  );

  // Start/reset countdown timer for each new question
  useEffect(() => {
    if (loading || !questions.length || feedback !== null) return;

    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    submittedByTimerRef.current = false;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          timerRef.current = null;
          if (!submittedByTimerRef.current) {
            submittedByTimerRef.current = true;
            handleSubmitAnswer(null, true);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, loading, questions.length]);

  // Stop timer when feedback shown
  useEffect(() => {
    if (feedback !== null && timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, [feedback]);

  // Next question handler
  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setFeedback(null);
      setErrorMessage(null);
      setTimeLeft(QUESTION_TIME_LIMIT);
    } else {
      router.push(
        `/kiosk/arogyamithran/results?attemptId=${encodeURIComponent(attemptId)}&regId=${encodeURIComponent(regId)}&lang=${activeLang}`
      );
    }
  };

  const currentQuestion = questions[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / (questions.length || 10)) * 100);
  const optionLabels = ["A", "B", "C", "D"];

  return (
    <div className="min-h-screen w-full bg-[#F0F7F2] text-[#132E27] relative flex flex-col justify-between items-center selection:bg-[#55B96A]/25 overflow-x-hidden">
      <main className="w-full max-w-[820px] min-h-screen flex flex-col justify-between relative shadow-[0_0_60px_rgba(0,0,0,0.18)] overflow-hidden bg-[#F0F7F2]">
        <KioskSubHeader
          language={activeLang}
          backHref="/kiosk"
          backLabel="Exit"
          backLabelMl="പുറത്തു കടക്കുക"
        />

        <div className="relative flex-1 flex flex-col justify-between px-3 sm:px-6 py-3 sm:py-5 overflow-y-auto">
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
            <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center flex-1 justify-between gap-2.5">
              {/* Progress + Score + Negative marking */}
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
                    <span className="text-[10px] font-semibold text-[#D97706] bg-amber-50 px-2 py-0.5 rounded-full border border-[#D97706]/20">
                      {isMl ? "തെറ്റ്: −5" : "Wrong: −5"}
                    </span>
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

              {/* Mascot + Timer + Speech Bubble */}
              <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 py-1">
                <MascotFrame
                  src="/images/veda/veda-thinking.png"
                  alt="VEDA thinking about the question"
                />

                <div className="flex flex-col gap-2 max-w-xs sm:max-w-sm">
                  {/* Timer */}
                  <div className="flex items-center gap-2 bg-white/90 rounded-2xl px-3 py-2 border-2 border-[#0B5D46]/15 shadow-sm">
                    <CountdownRing timeLeft={timeLeft} total={QUESTION_TIME_LIMIT} />
                    <div>
                      <p className="text-xs font-black text-[#073B30]">
                        {timeLeft <= 10
                          ? isMl ? "⚡ ഉടൻ ഉത്തരം നൽകൂ!" : "⚡ Answer quickly!"
                          : isMl ? "സമയം ശ്രദ്ധിക്കൂ" : "Time remaining"}
                      </p>
                      <p className="text-[10px] text-[#244B3F]/70">
                        {isMl ? "ഒരു മിനിറ്റ് / ചോദ്യം" : "60 seconds per question"}
                      </p>
                    </div>
                  </div>

                  {/* Speech Bubble */}
                  <div className="relative bg-white rounded-2xl p-3.5 shadow-xl border-2 border-[#0B5D46]/15 text-left">
                    <div className="hidden sm:block absolute top-4 -left-2.5 w-3 h-3 bg-white border-b-2 border-l-2 border-[#0B5D46]/15 rotate-45" />
                    <div className="sm:hidden absolute -top-2 left-8 w-3 h-3 bg-white border-t-2 border-l-2 border-[#0B5D46]/15 rotate-45" />
                    <p className={`text-sm font-black text-[#073B30] leading-snug ${isMl ? "font-malayalam" : ""}`}>
                      {isMl ? "മ്മ്... ചിന്തിച്ച് ഉത്തരം പറയൂ!" : "Hmm... Let's think!"}
                    </p>
                    <p className={`text-xs text-[#244B3F]/85 font-medium mt-1 leading-relaxed ${isMl ? "font-malayalam" : ""}`}>
                      {isMl ? "സസ്യശാസ്ത്ര രഹസ്യം കണ്ടെത്താൻ നിങ്ങൾക്ക് കഴിയുമോ?" : "Can you solve this Bio-AI mystery?"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Question Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion?.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="w-full bg-white rounded-3xl p-4 sm:p-5 shadow-xl border-2 border-[#0B5D46]/15 flex flex-col gap-2.5"
                >
                  <h2 className={`text-sm sm:text-base font-black text-[#073B30] leading-snug tracking-tight ${isMl ? "font-malayalam" : ""}`}>
                    {currentQuestion?.question}
                  </h2>

                  <div className="relative w-full h-28 sm:h-36 rounded-2xl overflow-hidden border border-[#0B5D46]/15 shadow-md bg-emerald-50/40">
                    <Image
                      src={currentQuestion?.image || "/assets/kiosk/questions/turmeric.jpg"}
                      alt={currentQuestion?.question || ""}
                      fill
                      priority
                      className="object-cover object-center select-none"
                      sizes="(max-width: 640px) 100vw, 640px"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    {currentQuestion?.options.map((option, idx) => {
                      const isSelected = selectedOption === idx;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedOption(idx)}
                          disabled={isSubmitting}
                          className={`w-full min-h-[44px] px-3.5 py-2 rounded-2xl border-2 text-left flex items-center gap-3 transition-all touch-manipulation active:scale-[0.99] ${
                            isSelected
                              ? "border-[#0B5D46] bg-[#F0F7F1] ring-2 ring-[#55B96A]/30 shadow-sm"
                              : "border-gray-200 hover:border-[#55B96A]/50 bg-white"
                          }`}
                        >
                          <div
                            className={`w-7 h-7 rounded-full font-black text-xs flex items-center justify-center shrink-0 transition-colors ${
                              isSelected ? "bg-[#0B5D46] text-white" : "bg-gray-100 text-[#073B30]"
                            }`}
                          >
                            {optionLabels[idx]}
                          </div>
                          <span className={`text-xs sm:text-sm font-bold text-[#132E27] flex-1 ${isMl ? "font-malayalam" : ""}`}>
                            {option}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <motion.button
                    type="button"
                    whileHover={{ scale: selectedOption !== null ? 1.01 : 1 }}
                    whileTap={{ scale: selectedOption !== null ? 0.98 : 1 }}
                    onClick={() => handleSubmitAnswer(selectedOption)}
                    disabled={selectedOption === null || isSubmitting}
                    className={`w-full min-h-[48px] mt-1 rounded-2xl font-black text-sm shadow-lg transition-all touch-manipulation flex items-center justify-center gap-2 ${
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
              </AnimatePresence>

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
            /* ANSWER FEEDBACK */
            <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center flex-1 justify-between gap-2.5">
              <div className="w-full">
                <div className="flex items-center justify-between text-xs font-bold text-[#073B30] mb-1">
                  <span>
                    {isMl
                      ? `ചോദ്യം ${currentIndex + 1} / ${questions.length || 10}`
                      : `Question ${currentIndex + 1} of ${questions.length || 10}`}
                  </span>
                  <span className="text-[11px] font-bold text-[#0B5D46] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-[#0B5D46]/20">
                    {score} pts
                  </span>
                </div>
                <div className="w-full h-2.5 bg-gray-200/80 rounded-full overflow-hidden p-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-[#0B5D46] to-[#55B96A] rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Mascot reaction */}
              <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 py-1">
                <motion.div
                  initial={{ scale: 0.9, y: 10 }}
                  animate={{ scale: 1, y: [0, -5, 0] }}
                  transition={{
                    scale: { duration: 0.3 },
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="relative w-44 h-56 sm:w-52 sm:h-64 md:w-60 md:h-72 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/90 bg-gradient-to-b from-[#F0F7F1] via-white to-[#FAFAF7] shrink-0 flex items-end justify-center"
                >
                  <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-[#0B5D46] via-[#D4AF37] to-[#0B5D46] z-10" />
                  <Image
                    src={
                      feedback.isCorrect
                        ? "/images/veda/veda-celebrating.png"
                        : "/images/veda/veda-concerned.png"
                    }
                    alt={feedback.isCorrect ? "VEDA celebrating correct answer" : "VEDA encouraging after wrong answer"}
                    fill
                    priority
                    className="object-contain object-bottom select-none pointer-events-none"
                    sizes="(max-width: 640px) 220px, 260px"
                  />
                  <span className="absolute top-3.5 right-3.5 flex h-3.5 w-3.5 z-20">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${feedback.isCorrect ? "bg-[#55B96A]" : "bg-[#D97706]"} opacity-75`} />
                    <span className={`relative inline-flex rounded-full h-3.5 w-3.5 ${feedback.isCorrect ? "bg-[#55B96A]" : "bg-[#D97706]"} border-2 border-white`} />
                  </span>
                </motion.div>

                <div
                  className={`relative rounded-2xl p-3.5 shadow-xl border-2 max-w-xs sm:max-w-sm text-left ${
                    feedback.isCorrect
                      ? "bg-emerald-50/95 border-[#55B96A]/60"
                      : "bg-amber-50/95 border-[#D97706]/50"
                  }`}
                >
                  <div className={`hidden sm:block absolute top-1/2 -left-2.5 -translate-y-1/2 w-3 h-3 rotate-45 ${
                    feedback.isCorrect ? "bg-emerald-50 border-b-2 border-l-2 border-[#55B96A]/60" : "bg-amber-50 border-b-2 border-l-2 border-[#D97706]/50"
                  }`} />
                  <div className={`sm:hidden absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 ${
                    feedback.isCorrect ? "bg-emerald-50 border-t-2 border-l-2 border-[#55B96A]/60" : "bg-amber-50 border-t-2 border-l-2 border-[#D97706]/50"
                  }`} />
                  <p className="text-sm font-black tracking-tight text-[#073B30] flex items-center gap-1.5">
                    {feedback.isCorrect ? (
                      <>
                        <Sparkles className="w-4 h-4 text-[#55B96A] shrink-0" />
                        <span>{isMl ? "മികച്ച ഉത്തരം! ശരിയായി!" : "Excellent! You got it right!"}</span>
                      </>
                    ) : (
                      <span>{isMl ? "നല്ല ശ്രമം! നമുക്ക് പഠിക്കാം." : "Good try! Let's learn something new."}</span>
                    )}
                  </p>
                  <p className="text-xs font-semibold text-[#244B3F]/85 mt-1 leading-relaxed">
                    {feedback.isCorrect
                      ? isMl ? "+10 പോയിന്റുകൾ ലഭിച്ചു! 🌟" : "+10 points awarded! Well done."
                      : isMl ? "−5 പോയിന്റ് കുറഞ്ഞു. ഓരോ ഉത്തരവും ഒരു പഠനം!" : "−5 points. Every attempt teaches us something new!"}
                  </p>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full bg-white rounded-3xl p-4 sm:p-5 shadow-xl border-2 border-[#0B5D46]/15 flex flex-col gap-2.5"
              >
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {isMl ? "ശരിയുത്തരം:" : "The correct answer is:"}
                </p>

                <div className="flex items-center gap-2 p-3 rounded-2xl bg-[#F0F7F1] border border-[#0B5D46]/20">
                  <CheckCircle2 className="w-5 h-5 text-[#55B96A] shrink-0" />
                  <span className={`text-sm font-black text-[#073B30] ${isMl ? "font-malayalam" : ""}`}>
                    {feedback.correctAnswer}
                  </span>
                </div>

                <p className={`text-xs sm:text-sm text-[#244B3F] font-medium leading-relaxed pt-1 ${isMl ? "font-malayalam" : ""}`}>
                  {feedback.explanation}
                </p>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleNextQuestion}
                  className="w-full min-h-[48px] mt-2 rounded-2xl bg-gradient-to-r from-[#073B30] to-[#0B5D46] hover:from-[#0B5D46] hover:to-[#55B96A] text-[#FAFAF7] font-black text-sm shadow-lg border border-white/20 flex items-center justify-center gap-2 touch-manipulation active:scale-95 transition-all"
                >
                  <span className={isMl ? "font-malayalam" : ""}>
                    {currentIndex < questions.length - 1
                      ? isMl ? "അടുത്ത ചോദ്യം" : "Next Question"
                      : isMl ? "അന്തിമ ഫലം കാണുക" : "See Final Results"}
                  </span>
                  <span className="text-lg">→</span>
                </motion.button>
              </motion.div>

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
