"use client";

import { Suspense, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ArogyamithranCharacterFrame from "@/components/kiosk/ArogyamithranCharacterFrame";
import { useArogyamithranLanguage } from "@/components/kiosk/ArogyamithranContext";
import {
  KioskLanguage,
  QuizQuestionClient,
  QuizAnswerResponse,
} from "@/components/kiosk/types";
import { KIOSK_BRANDING } from "@/lib/kioskAssets";
import KioskSubHeader from "@/components/kiosk/KioskSubHeader";
import KioskFooter from "@/components/kiosk/KioskFooter";

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
  const [completedCount, setCompletedCount] = useState(0);
  const [loading, setLoading] = useState(() => Boolean(attemptId));
  const [errorMessage, setErrorMessage] = useState<string | null>(() =>
    !attemptId
      ? "No active challenge attempt found. Please start from registration."
      : null
  );

  // Load or recover attempt questions on mount
  useEffect(() => {
    if (!attemptId) {
      return;
    }

    let isMounted = true;

    async function loadAttempt() {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/kiosk/quiz/result?attemptId=${encodeURIComponent(
            attemptId
          )}&action=recover`
        );
        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.message || "Failed to load attempt questions.");
        }

        if (isMounted) {
          setQuestions(data.questions || []);
          setScore(data.currentScore || 0);

          // If there are already answered questions, determine current progress
          const answered = data.answeredQuestions || {};
          const answeredKeys = Object.keys(answered);
          setCompletedCount(answeredKeys.length);

          if (answeredKeys.length >= (data.questions || []).length) {
            // Already finished all 10
            router.push(
              `/kiosk/arogyamithran/results?attemptId=${encodeURIComponent(
                attemptId
              )}&regId=${encodeURIComponent(regId)}&lang=${activeLang}`
            );
            return;
          }

          // Advance to the first unanswered question
          const firstUnansweredIndex = (data.questions || []).findIndex(
            (q: QuizQuestionClient) => !answered[q.id]
          );

          if (firstUnansweredIndex >= 0) {
            setCurrentIndex(firstUnansweredIndex);
          }
        }
      } catch (err: unknown) {
        if (isMounted) {
          const message =
            err instanceof Error ? err.message : "Error loading challenge attempt.";
          setErrorMessage(message);
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

  const currentQuestion: QuizQuestionClient | undefined = questions[currentIndex];

  // Handle option select (only allowed if feedback has not yet been shown)
  const handleSelectOption = useCallback((idx: number) => {
    if (feedback !== null || isSubmitting) return;
    setSelectedOption(idx);
  }, [feedback, isSubmitting]);

  // Submit answer
  const handleSubmitAnswer = useCallback(async () => {
    if (selectedOption === null || !currentQuestion || feedback !== null || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/kiosk/quiz/submit-answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          attemptId,
          questionId: currentQuestion.id,
          selectedOptionIndex: selectedOption,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to submit answer.");
      }

      const answerResult: QuizAnswerResponse = data.result;
      setFeedback(answerResult);
      setScore(answerResult.currentScore);
      setCompletedCount(answerResult.questionsAnswered);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Submission error occurred.";
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  }, [attemptId, currentQuestion, feedback, isSubmitting, selectedOption]);

  // Proceed to next question or view results
  const handleNextQuestion = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setFeedback(null);
      setErrorMessage(null);
    } else {
      // Completed all 10 questions
      router.push(
        `/kiosk/arogyamithran/results?attemptId=${encodeURIComponent(
          attemptId
        )}&regId=${encodeURIComponent(regId)}&lang=${activeLang}`
      );
    }
  }, [currentIndex, questions.length, router, attemptId, regId, activeLang]);

  // Keyboard navigation for testing (1, 2, 3, 4 to select, Enter to submit/advance)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (feedback === null) {
        if (["1", "2", "3", "4"].includes(e.key)) {
          const idx = parseInt(e.key, 10) - 1;
          if (idx >= 0 && idx < 4) {
            handleSelectOption(idx);
          }
        } else if (e.key === "Enter" && selectedOption !== null) {
          handleSubmitAnswer();
        }
      } else {
        if (e.key === "Enter" || e.key === " ") {
          handleNextQuestion();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [feedback, selectedOption, handleSubmitAnswer, handleSelectOption, handleNextQuestion]);

  // Character Dialogue and Expression determination
  let currentExpression: "thinking" | "correct" | "incorrect" = "thinking";
  let characterDialogue = isMl
    ? "ചോദ്യം ശ്രദ്ധാപൂർവ്വം വായിച്ച് ശരിയായ ഉത്തരം തിരഞ്ഞെടുക്കൂ!"
    : "Read the question carefully and select the best answer!";

  if (feedback !== null) {
    if (feedback.isCorrect) {
      currentExpression = "correct";
      characterDialogue = isMl
        ? "അടിപൊളി! ശരിയുത്തരം! (+10 പോയിന്റ്)"
        : "Excellent! You got it right! (+10 points)";
    } else {
      currentExpression = "incorrect";
      characterDialogue = isMl
        ? "നല്ല ശ്രമം! നമുക്ക് പുതിയൊരു കാര്യം കൂടി പഠിക്കാം."
        : "Good try! Let's learn something new.";
    }
  }

  // Calculated Progress percentage based on completed answers
  const progressPercent = Math.round((completedCount / (questions.length || 10)) * 100);

  // Loading Screen
  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#FAFAF7] text-[#073B30]">
        <div className="flex flex-col items-center gap-4 text-center p-6">
          <div className="w-12 h-12 rounded-full border-4 border-[#0B5D46] border-t-transparent animate-spin" />
          <p className="text-base font-bold">
            {isMl ? "ചോദ്യങ്ങൾ തയ്യാറാക്കുന്നു..." : "Loading Challenge..."}
          </p>
        </div>
      </main>
    );
  }

  // Error Screen
  if (errorMessage && questions.length === 0) {
    return (
      <main className="min-h-screen flex flex-col justify-between bg-[#FAFAF7] text-[#132E27]">
        <KioskSubHeader
          language={activeLang}
          showLanguageToggle={false}
          currentStepBadge="Bio-AI Challenge"
          currentStepBadgeMl="ബയോ-എഐ ചലഞ്ച്"
          backHref="/kiosk/arogyamithran/instructions"
        />
        <div className="flex-1 max-w-lg mx-auto p-6 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-2xl mb-4 font-bold">
            !
          </div>
          <h2 className="text-xl font-bold text-[#073B30] mb-2">
            {isMl ? "സെഷൻ ലഭ്യമല്ല" : "Session Unavailable"}
          </h2>
          <p className="text-sm text-[#244B3F] mb-6 leading-relaxed">
            {errorMessage}
          </p>
          <Link
            href="/kiosk/arogyamithran/instructions"
            className="px-6 py-3.5 rounded-2xl bg-[#073B30] text-white font-bold text-sm shadow-md hover:bg-[#0B5D46] transition-all"
          >
            {isMl ? "നിർദ്ദേശങ്ങളിലേക്ക് മടങ്ങുക" : "Return to Instructions"}
          </Link>
        </div>
        <KioskFooter language={activeLang} />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col justify-between bg-[#FAFAF7] text-[#132E27] relative selection:bg-[#55B96A]/20">
      {/* ─── KIOSK HEADER WITH DEDICATED INSTITUTIONAL BRANDING ────────── */}
      <header className="w-full bg-[#FAFAF7]/95 backdrop-blur-md border-b border-[#0B5D46]/15 sticky top-0 z-40">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-3">
          {/* Institutional Branding Card */}
          <div className="flex items-center gap-2 sm:gap-3 bg-white/95 rounded-2xl px-3 sm:px-4 py-1.5 border border-[#0B5D46]/15 shadow-xs">
            {/* KSUM Logo */}
            <div className="flex items-center shrink-0">
              <Image
                src={KIOSK_BRANDING.ksum.path}
                alt={isMl ? KIOSK_BRANDING.ksum.altTextMl : KIOSK_BRANDING.ksum.altTextEn}
                width={120}
                height={42}
                priority
                className="h-6 sm:h-7 w-auto object-contain select-none"
              />
            </div>

            <div className="h-5 sm:h-6 w-px bg-[#0B5D46]/20 shrink-0" />

            <div className="hidden sm:flex flex-col justify-center min-w-0 px-0.5">
              <span className="text-[10px] sm:text-[11px] font-extrabold tracking-wider text-[#073B30] uppercase truncate">
                Bio-AI Challenge
              </span>
              <span className="text-[9px] text-[#0B5D46]/80 tracking-tight truncate">
                Digital Hub, Kochi
              </span>
            </div>

            <div className="h-5 sm:h-6 w-px bg-[#0B5D46]/20 shrink-0" />

            {/* Huddle Global Logo */}
            <div className="flex items-center shrink-0">
              <Image
                src={KIOSK_BRANDING.huddleGlobal.path}
                alt={isMl ? KIOSK_BRANDING.huddleGlobal.altTextMl : KIOSK_BRANDING.huddleGlobal.altTextEn}
                width={100}
                height={38}
                priority
                className="h-5 sm:h-6 w-auto object-contain select-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Live Score Counter Pill */}
            <div className="px-3.5 py-1.5 rounded-full bg-[#073B30] text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-xs border border-[#55B96A]/30">
              <span className="text-[#55B96A]">★</span>
              <span>
                {isMl ? `സ്കോർ: ${score}` : `Score: ${score}`}
              </span>
            </div>

            <Link
              href="/kiosk"
              className="inline-flex items-center justify-center gap-1.5 min-h-[40px] px-3.5 py-1.5 rounded-full bg-[#F0F7F1] text-[#073B30] hover:bg-[#0B5D46] hover:text-white border border-[#0B5D46]/20 text-xs font-bold transition-all touch-manipulation shadow-xs"
            >
              <span>{isMl ? "മെനു" : "Exit"}</span>
              <span className="text-red-500 font-bold">✕</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ─── PROGRESS BAR STRIP ────────────────────────────────────────── */}
      <div className="w-full bg-[#F0F7F1] border-b border-[#0B5D46]/10 px-4 sm:px-8 py-2">
        <div className="max-w-3xl mx-auto flex items-center justify-between text-xs font-bold text-[#073B30] mb-1.5">
          <div className="flex items-center gap-2">
            <span>
              {isMl
                ? `ചോദ്യം ${currentIndex + 1} / ${questions.length}`
                : `Question ${currentIndex + 1} of ${questions.length}`}
            </span>
            {currentQuestion?.category && (
              <span className="hidden sm:inline px-2 py-0.5 rounded-full bg-white text-[10px] text-[#0B5D46] border border-[#0B5D46]/15 font-medium">
                {currentQuestion.category}
              </span>
            )}
          </div>
          <span>{isMl ? `പൂർത്തിയായത്: ${progressPercent}%` : `Progress: ${progressPercent}%`}</span>
        </div>
        <div className="max-w-3xl mx-auto w-full h-2 rounded-full bg-white border border-[#0B5D46]/15 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#0B5D46] to-[#55B96A]"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* ─── MAIN QUESTION STAGE ───────────────────────────────────────── */}
      <div className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-col justify-start">
        {/* Character Feedback & Dialogue Bar */}
        <div className="w-full mb-3">
          <ArogyamithranCharacterFrame
            compact={true}
            selectedLanguage={activeLang}
            expression={currentExpression}
            dialogue={characterDialogue}
          />
        </div>

        {/* Question Content Box */}
        {currentQuestion && (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="w-full bg-white rounded-3xl p-5 sm:p-7 border-2 border-[#0B5D46]/15 shadow-sm mb-4"
            >
              {/* Question metadata badge */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-bold text-[#0B5D46] uppercase tracking-wider">
                  #{currentQuestion.id} · {currentQuestion.category || "Bio-AI Topic"}
                </span>

                {isMl && (
                  <span className="text-[10px] font-medium text-[#244B3F]/75 bg-[#F0F7F1] px-2 py-0.5 rounded-full border border-[#0B5D46]/10">
                    ചോദ്യ ബാങ്ക് ഇംഗ്ലീഷിൽ
                  </span>
                )}
              </div>

              {/* The Question Text */}
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#073B30] leading-snug tracking-tight mb-5">
                {currentQuestion.question}
              </h2>

              {/* The Four Options */}
              <div className="space-y-3">
                {currentQuestion.options.map((optionText, optIndex) => {
                  const optionLetters = ["A", "B", "C", "D"];
                  const isSelected = selectedOption === optIndex;
                  const hasSubmitted = feedback !== null;

                  let optionClasses =
                    "w-full min-h-[56px] sm:min-h-[62px] p-3.5 sm:p-4 rounded-2xl border-2 text-left flex items-center justify-between gap-3 text-sm sm:text-base font-semibold transition-all touch-manipulation";

                  if (!hasSubmitted) {
                    // Pre-submission state
                    if (isSelected) {
                      optionClasses +=
                        " bg-[#F0F7F1] border-[#0B5D46] text-[#073B30] shadow-sm ring-2 ring-[#0B5D46]/20";
                    } else {
                      optionClasses +=
                        " bg-[#FAFAF7] hover:bg-[#F0F7F1] border-[#0B5D46]/15 text-[#132E27] active:scale-[0.99]";
                    }
                  } else {
                    // Post-submission feedback state
                    const isThisCorrect = optIndex === feedback.correctOptionIndex;
                    const isThisSelectedWrong =
                      isSelected && optIndex !== feedback.correctOptionIndex;

                    if (isThisCorrect) {
                      optionClasses +=
                        " bg-[#073B30] border-[#55B96A] text-[#FAFAF7] shadow-md ring-2 ring-[#55B96A]";
                    } else if (isThisSelectedWrong) {
                      optionClasses +=
                        " bg-red-50 border-red-400 text-red-900 line-through opacity-90";
                    } else {
                      optionClasses +=
                        " bg-gray-50 border-gray-200 text-gray-400 opacity-60";
                    }
                  }

                  return (
                    <button
                      key={optIndex}
                      type="button"
                      disabled={hasSubmitted || isSubmitting}
                      onClick={() => handleSelectOption(optIndex)}
                      className={optionClasses}
                      aria-pressed={isSelected}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Letter indicator circle */}
                        <span
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                            hasSubmitted && optIndex === feedback.correctOptionIndex
                              ? "bg-[#55B96A] text-[#073B30]"
                              : isSelected
                              ? "bg-[#0B5D46] text-white"
                              : "bg-[#0B5D46]/10 text-[#0B5D46]"
                          }`}
                        >
                          {optionLetters[optIndex]}
                        </span>

                        <span className="leading-snug break-words">
                          {optionText}
                        </span>
                      </div>

                      {/* Status Checkmark / Cross icon */}
                      {hasSubmitted && (
                        <div className="shrink-0 pl-2">
                          {optIndex === feedback.correctOptionIndex ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#55B96A] text-[#073B30] text-xs font-bold shadow-xs">
                              ✓ {isMl ? "ശരി" : "Correct"}
                            </span>
                          ) : isSelected ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-200 text-red-900 text-xs font-bold">
                              ✕ {isMl ? "നിങ്ങൾ തിരഞ്ഞെടുത്തത്" : "Your pick"}
                            </span>
                          ) : null}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Educational Explanation Box (Visible only after submission) */}
              {feedback !== null && feedback.explanation && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 p-4 rounded-2xl bg-[#F0F7F1] border border-[#0B5D46]/20 text-xs sm:text-sm text-[#073B30]"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="text-base shrink-0">🌿</span>
                    <div>
                      <p className="font-bold text-[#0B5D46] mb-1">
                        {isMl
                          ? "ശാസ്ത്രീയ / പരമ്പരാഗത വിശദീകരണം:"
                          : "Scientific & Educational Note:"}
                      </p>
                      <p className="leading-relaxed text-[#244B3F]">
                        {feedback.explanation}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Inline Submission Error alert */}
        {errorMessage && (
          <div className="w-full mb-3 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
            {errorMessage}
          </div>
        )}

        {/* ─── ACTION BUTTON AREA ───────────────────────────────────────── */}
        <div className="w-full mt-2">
          {feedback === null ? (
            /* SUBMIT ANSWER BUTTON */
            <button
              type="button"
              disabled={selectedOption === null || isSubmitting}
              onClick={handleSubmitAnswer}
              className="w-full min-h-[58px] sm:min-h-[64px] px-8 py-4 rounded-2xl bg-[#073B30] text-[#FAFAF7] hover:bg-[#0B5D46] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-base sm:text-lg font-bold shadow-lg flex items-center justify-center gap-3 touch-manipulation focus:outline-none focus-visible:ring-4 focus-visible:ring-[#55B96A]"
            >
              {isSubmitting ? (
                <>
                  <span className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  <span>
                    {isMl ? "പരിശോധിക്കുന്നു..." : "Validating Answer..."}
                  </span>
                </>
              ) : (
                <>
                  <span className={isMl ? "font-malayalam" : ""}>
                    {isMl ? "ഉത്തരം സമർപ്പിക്കുക" : "SUBMIT ANSWER"}
                  </span>
                  <span className="text-[#55B96A] text-xl font-bold">→</span>
                </>
              )}
            </button>
          ) : (
            /* NEXT QUESTION / VIEW RESULTS BUTTON */
            <button
              type="button"
              onClick={handleNextQuestion}
              className="w-full min-h-[58px] sm:min-h-[64px] px-8 py-4 rounded-2xl bg-[#0B5D46] text-[#FAFAF7] hover:bg-[#073B30] active:scale-95 transition-all text-base sm:text-lg font-bold shadow-lg flex items-center justify-center gap-3 touch-manipulation focus:outline-none focus-visible:ring-4 focus-visible:ring-[#55B96A]"
            >
              {currentIndex < questions.length - 1 ? (
                <>
                  <span className={isMl ? "font-malayalam" : ""}>
                    {isMl ? "അടുത്ത ചോദ്യം" : "NEXT QUESTION"}
                  </span>
                  <span className="text-[#55B96A] text-xl font-bold">→</span>
                </>
              ) : (
                <>
                  <span className={isMl ? "font-malayalam" : ""}>
                    {isMl ? "എന്റെ ഫലം കാണുക" : "VIEW MY RESULTS"}
                  </span>
                  <span className="text-[#55B96A] text-xl font-bold">🏆</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* ─── KIOSK FOOTER ──────────────────────────────────────────────── */}
      <footer className="w-full py-3 px-4 sm:px-8 border-t border-[#0B5D46]/15 bg-[#F0F7F1]/80 text-[#244B3F]">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#55B96A]" />
            <span className="font-semibold text-[#073B30]">
              {isMl
                ? `ചലഞ്ച് പുരോഗതി: ${completedCount} / 10 ചോദ്യങ്ങൾ പൂർത്തിയായി`
                : `Challenge Progress: ${completedCount} of 10 completed`}
            </span>
          </div>

          <span className="text-[11px] text-[#244B3F]/75">
            {isMl
              ? "ഓരോ ശരിയുത്തരത്തിനും 10 പോയിന്റ് · നെഗറ്റീവ് മാർക്കിംഗ് ഇല്ല"
              : "10 points per correct answer · No negative marking"}
          </span>
        </div>
      </footer>
    </main>
  );
}

export default function ArogyamithranChallengePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FAFAF7] text-[#073B30]">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#55B96A] animate-ping" />
            <span className="text-sm font-bold">Loading Challenge...</span>
          </div>
        </div>
      }
    >
      <ChallengeContent />
    </Suspense>
  );
}
