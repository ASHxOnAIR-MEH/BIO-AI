"use client";

import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import ArogyamithranCharacterFrame from "@/components/kiosk/ArogyamithranCharacterFrame";
import { useArogyamithranLanguage } from "@/components/kiosk/ArogyamithranContext";
import {
  KioskLanguage,
  QuizFinalResult,
  QuizReviewItem,
  EmailDeliveryInfo,
} from "@/components/kiosk/types";
import KioskSubHeader from "@/components/kiosk/KioskSubHeader";
import KioskFooter from "@/components/kiosk/KioskFooter";

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

  const [result, setResult] = useState<QuizFinalResult | null>(null);
  const [loading, setLoading] = useState(() => Boolean(attemptId));
  const [errorMessage, setErrorMessage] = useState<string | null>(() =>
    !attemptId ? "No attempt identifier provided." : null
  );
  const [showReview, setShowReview] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Email resend tracking
  const [isResending, setIsResending] = useState(false);
  const [resendStatusMsg, setResendStatusMsg] = useState<string | null>(null);
  const [liveEmailDelivery, setLiveEmailDelivery] = useState<EmailDeliveryInfo | null>(null);

  useEffect(() => {
    if (!attemptId) {
      return;
    }

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
          setResult(data.result);
          if (data.result.emailDelivery) {
            setLiveEmailDelivery(data.result.emailDelivery);
          }
        }
      } catch (err: unknown) {
        if (isMounted) {
          const msg =
            err instanceof Error ? err.message : "Error retrieving result.";
          setErrorMessage(msg);
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

  // Handle Copy Link
  const handleCopyLink = () => {
    if (!result?.resultUrl) return;
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(result.resultUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  // Handle Email Retry / Resend
  const handleResendEmail = async () => {
    if (!result?.accessToken || isResending) return;
    setIsResending(true);
    setResendStatusMsg(null);

    try {
      const res = await fetch("/api/kiosk/quiz/resend-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessToken: result.accessToken }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Email retry failed.");
      }

      setLiveEmailDelivery(data.emailDelivery);
      setResendStatusMsg(
        isMl ? "ഇമെയിൽ വീണ്ടും അയച്ചു." : "Email retry processed."
      );
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error retrying email.";
      setResendStatusMsg(msg);
    } finally {
      setIsResending(false);
    }
  };

  // Handle Return Home and reset visitor session
  const handleReturnHome = () => {
    clearLanguage();
    try {
      sessionStorage.removeItem("kiosk_arogyamithran_lang");
      sessionStorage.removeItem("kiosk_language");
    } catch {
      // ignore
    }
    router.push("/kiosk");
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#FAFAF7] text-[#073B30]">
        <div className="flex flex-col items-center gap-4 text-center p-6">
          <div className="w-12 h-12 rounded-full border-4 border-[#0B5D46] border-t-transparent animate-spin" />
          <p className="text-base font-bold">
            {isMl
              ? "ഫലം സംരക്ഷിക്കുകയും QR തയ്യാറാക്കുകയും ചെയ്യുന്നു..."
              : "Saving Result & Generating Personal QR Code..."}
          </p>
        </div>
      </main>
    );
  }

  if (errorMessage || !result) {
    return (
      <main className="min-h-screen flex flex-col justify-between bg-[#FAFAF7] text-[#132E27]">
        <KioskSubHeader
          language={activeLang}
          showLanguageToggle={false}
          currentStepBadge="Quiz Results"
          currentStepBadgeMl="ക്വിസ് ഫലം"
          backHref="/kiosk"
        />
        <div className="flex-1 max-w-lg mx-auto p-6 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-2xl mb-4 font-bold">
            !
          </div>
          <h2 className="text-xl font-bold text-[#073B30] mb-2">
            {isMl ? "ഫലം കണ്ടെത്താനായില്ല" : "Results Not Available"}
          </h2>
          <p className="text-sm text-[#244B3F] mb-6 leading-relaxed">
            {errorMessage || "Attempt data could not be verified."}
          </p>
          <Link
            href="/kiosk"
            className="px-6 py-3.5 rounded-2xl bg-[#073B30] text-white font-bold text-sm shadow-md hover:bg-[#0B5D46] transition-all"
          >
            {isMl ? "കിയോസ്ക് മെനുവിലേക്ക് മടങ്ങുക" : "Return to Kiosk Menu"}
          </Link>
        </div>
        <KioskFooter language={activeLang} />
      </main>
    );
  }

  // Final congratulatory message based on verified score
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

  const currentEmailDelivery = liveEmailDelivery || result.emailDelivery;

  return (
    <main className="min-h-screen flex flex-col justify-between bg-[#FAFAF7] text-[#132E27] relative selection:bg-[#55B96A]/20">
      {/* ─── KIOSK SUB HEADER ────────────────────────────────────────── */}
      <KioskSubHeader
        language={activeLang}
        backHref="/kiosk"
        backLabel="Back to Kiosk"
        backLabelMl="കിയോസ്ക് മെനു"
        currentStepBadge="Step 9: Final Results & Certificate"
        currentStepBadgeMl="ഘട്ടം 9: അന്തിമ ഫലം"
      />

      {/* ─── RESULTS CONTAINER ─────────────────────────────────────────── */}
      <div className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col items-center justify-center text-center">
        {/* Step Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F0F7F1] border border-[#0B5D46]/15 mb-3 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#55B96A]" />
          <span className="text-[11px] sm:text-xs font-bold text-[#0B5D46] uppercase tracking-wider">
            {isMl ? "ഘട്ടം 9 / 9 · അന്തിമ ഫലം" : "Step 9 of 9 · Final Results"}
          </span>
        </div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#073B30] tracking-tight mb-3 ${
            isMl ? "font-malayalam leading-snug" : ""
          }`}
        >
          {isMl ? "ചലഞ്ച് പൂർത്തിയായി!" : "Challenge Completed!"}
        </motion.h1>

        {/* ─── STEP 5: PERSONAL RESULT & SCANNABLE QR SHOWCASE CARD ─────── */}
        {result.qrCodeDataUrl && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-xl bg-white rounded-3xl p-6 sm:p-7 border-2 border-[#0B5D46]/20 shadow-[0_12px_36px_rgba(11,93,70,0.1)] mb-6 text-center relative overflow-hidden"
          >
            {/* Kerala Kasavu Gold trim */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#0B5D46] via-[#D4AF37] to-[#55B96A]" />

            {/* Saved Confirmation Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#F0F7F1] border border-[#0B5D46]/20 text-[11px] font-bold text-[#0B5D46] mb-3">
              <span className="text-[#55B96A] font-bold">✓</span>
              <span>
                {isMl
                  ? "ഫലം സുരക്ഷിതമായി രേഖപ്പെടുത്തി"
                  : "Result Saved & Verified"}
              </span>
            </div>

            <h2
              className={`text-lg sm:text-xl font-bold text-[#073B30] mb-1 ${
                isMl ? "font-malayalam" : ""
              }`}
            >
              {isMl
                ? "നിങ്ങളുടെ ബയോ-എഐ ചലഞ്ച് ഫലം തയ്യാറാണ്!"
                : "Your Bio-AI Challenge Result Is Ready!"}
            </h2>

            <p
              className={`text-xs sm:text-sm text-[#244B3F]/90 mb-4 max-w-md mx-auto ${
                isMl ? "font-malayalam" : ""
              }`}
            >
              {isMl
                ? "നിങ്ങളുടെ വ്യക്തിഗത ഫലം ഫോണിൽ കാണുന്നതിന് ഈ QR കോഡ് സ്കാൻ ചെയ്യുക."
                : "Scan this QR code with your phone to view your personal result."}
            </p>

            {/* High-Contrast QR Code Card */}
            <div className="inline-block p-4 rounded-3xl bg-[#FAFAF7] border-2 border-[#0B5D46]/20 shadow-xs mb-3">
              <div className="bg-white p-3 rounded-2xl shadow-inner border border-gray-100">
                <Image
                  src={result.qrCodeDataUrl}
                  alt="Scannable Bio-AI Result QR Code"
                  width={200}
                  height={200}
                  priority
                  className="w-44 h-44 sm:w-52 sm:h-52 object-contain"
                />
              </div>
            </div>

            <p className="text-[11px] text-[#244B3F]/75 font-medium mb-3">
              {isMl
                ? "ഫോണിലെ ക്യാമറ തുറന്ന് QR കോഡിലേക്ക് ചൂണ്ടുക"
                : "Point your phone camera at this QR code"}
            </p>

            {/* Visible Result Link Alternative */}
            {result.resultUrl && (
              <div className="w-full max-w-md mx-auto p-3 rounded-2xl bg-[#F0F7F1] border border-[#0B5D46]/15 text-left mb-4 flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <span className="block text-[10px] font-bold text-[#0B5D46] uppercase">
                    {isMl ? "വ്യക്തിഗത ഫല ലിങ്ക്:" : "Personal Result Link:"}
                  </span>
                  <a
                    href={result.resultUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-[#073B30] hover:underline truncate block"
                  >
                    {result.resultUrl}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="shrink-0 px-3 py-1.5 rounded-xl bg-[#073B30] text-white text-xs font-bold hover:bg-[#0B5D46] transition-all touch-manipulation"
                >
                  {copiedLink
                    ? isMl
                      ? "കോപ്പി ചെയ്തു!"
                      : "Copied!"
                    : isMl
                    ? "കോപ്പി"
                    : "Copy"}
                </button>
              </div>
            )}

            {/* Email Delivery Status Box */}
            {currentEmailDelivery && (
              <div className="w-full max-w-md mx-auto p-3.5 rounded-2xl bg-[#FAFAF7] border border-[#0B5D46]/15 text-left">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-bold text-[#073B30] flex items-center gap-1.5">
                    <span>📧</span>
                    <span>{isMl ? "ഇമെയിൽ ഡെലിവറി:" : "Email Delivery:"}</span>
                  </span>

                  {/* Delivery Status Pill */}
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      currentEmailDelivery.status === "sent"
                        ? "bg-[#55B96A] text-[#073B30]"
                        : currentEmailDelivery.status === "accepted"
                        ? "bg-blue-100 text-blue-900"
                        : currentEmailDelivery.status === "failed"
                        ? "bg-red-100 text-red-900"
                        : "bg-amber-100 text-amber-900"
                    }`}
                  >
                    {currentEmailDelivery.status}
                  </span>
                </div>

                <p className="text-[11px] text-[#244B3F]/85 leading-relaxed">
                  {currentEmailDelivery.status === "sent" ? (
                    isMl ? (
                      `നിങ്ങൾ രജിസ്റ്റർ ചെയ്ത ഇമെയിൽ വിലാസത്തിലേക്ക് (${currentEmailDelivery.recipientEmailMasked}) ഫലം അയച്ചിട്ടുണ്ട്.`
                    ) : (
                      `Result has been sent to your registered email (${currentEmailDelivery.recipientEmailMasked}).`
                    )
                  ) : currentEmailDelivery.status === "accepted" ? (
                    isMl ? (
                      `ഇമെയിൽ ഡെലിവറിക്ക് സ്വീകരിച്ചു (${currentEmailDelivery.recipientEmailMasked}).`
                    ) : (
                      `Email accepted for delivery to ${currentEmailDelivery.recipientEmailMasked}.`
                    )
                  ) : currentEmailDelivery.status === "not-configured" ? (
                    isMl ? (
                      `ഇമെയിൽ സർവീസ് കോൺഫിഗറേഷൻ തയ്യാറാകുന്നു (RESEND_API_KEY). നിങ്ങളുടെ ഓൺ-സ്ക്രീൻ QR കോഡും ലിങ്കും പ്രവർത്തനക്ഷമമാണ്.`
                    ) : (
                      `Email provider configuration pending in deployment. Your on-screen QR code and personal link are fully active.`
                    )
                  ) : (
                    isMl ? (
                      `ഇമെയിൽ അയയ്ക്കുന്നതിൽ തടസ്സമുണ്ടായി: ${currentEmailDelivery.error || "ദയവായി വീണ്ടും ശ്രമിക്കുക"}`
                    ) : (
                      `Email delivery failed: ${currentEmailDelivery.error || "Please try again."}`
                    )
                  )}
                </p>

                {/* Email Retry Button if delivery failed */}
                {currentEmailDelivery.status === "failed" && (
                  <div className="mt-2 pt-2 border-t border-gray-200 flex items-center justify-between">
                    <span className="text-[10px] text-gray-500">
                      Attempt {currentEmailDelivery.attemptsCount}
                    </span>
                    <button
                      type="button"
                      disabled={isResending}
                      onClick={handleResendEmail}
                      className="px-3 py-1 rounded-lg bg-[#073B30] text-white text-[11px] font-bold hover:bg-[#0B5D46] disabled:opacity-50"
                    >
                      {isResending ? "Retrying..." : "Retry Email"}
                    </button>
                  </div>
                )}

                {resendStatusMsg && (
                  <p className="text-[10px] text-[#0B5D46] font-semibold mt-1">
                    {resendStatusMsg}
                  </p>
                )}
              </div>
            )}
          </motion.div>
        )}

        {/* Main Score Showcase Card */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-xl bg-gradient-to-b from-white via-[#F0F7F1]/50 to-white rounded-3xl p-6 sm:p-7 border-2 border-[#0B5D46]/20 shadow-[0_8px_30px_rgba(11,93,70,0.08)] mb-6 text-center relative overflow-hidden"
        >
          <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#0B5D46] mb-2">
            {isMl ? "നിങ്ങളുടെ അന്തിമ സ്കോർ" : "YOUR SCORE"}
          </p>

          <div className="text-5xl sm:text-6xl font-black text-[#073B30] tracking-tight mb-2">
            <span>{result.totalScore}</span>
            <span className="text-2xl sm:text-3xl font-bold text-[#0B5D46]/60">
              {" "}/ 100
            </span>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 gap-3 mt-5 pt-4 border-t border-[#0B5D46]/15">
            <div className="p-3 rounded-2xl bg-white border border-[#0B5D46]/15 shadow-xs">
              <span className="block text-2xl font-black text-[#0B5D46]">
                {result.correctCount} / {result.totalQuestions}
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-[#244B3F]">
                {isMl ? "ശരിയുത്തരങ്ങൾ" : "Correct Answers"}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-white border border-[#0B5D46]/15 shadow-xs">
              <span className="block text-2xl font-black text-[#991B1B]">
                {result.incorrectCount} / {result.totalQuestions}
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-[#244B3F]">
                {isMl ? "തെറ്റിയ ഉത്തരങ്ങൾ" : "Incorrect Answers"}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Arogyamithran Character Final Congratulatory Message */}
        <div className="w-full max-w-xl mb-6">
          <ArogyamithranCharacterFrame
            compact={true}
            selectedLanguage={activeLang}
            expression="final"
            dialogue={congratulatoryMessage}
          />
        </div>

        {/* Question Review Accordion / Toggle */}
        <div className="w-full max-w-xl mb-6">
          <button
            type="button"
            onClick={() => setShowReview(!showReview)}
            className="w-full py-3.5 px-5 rounded-2xl bg-white border-2 border-[#0B5D46]/15 shadow-sm text-xs sm:text-sm font-bold text-[#073B30] hover:bg-[#F0F7F1] transition-all flex items-center justify-between touch-manipulation"
          >
            <span>
              {showReview
                ? isMl
                  ? "ചോദ്യ അവലോകനം മറയ്ക്കുക"
                  : "Hide Question Review"
                : isMl
                ? `ചോദ്യ അവലോകനം കാണുക (${result.review.length} ചോദ്യങ്ങൾ)`
                : `Review All ${result.review.length} Questions & Explanations`}
            </span>
            <span className="text-base text-[#0B5D46]">
              {showReview ? "▲" : "▼"}
            </span>
          </button>

          {showReview && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-3 space-y-3 text-left overflow-hidden"
            >
              {result.review.map((item: QuizReviewItem, rIdx: number) => (
                <div
                  key={rIdx}
                  className={`p-4 rounded-2xl border-2 text-xs sm:text-sm ${
                    item.isCorrect
                      ? "bg-white border-[#55B96A]/40"
                      : "bg-white border-red-200"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-bold text-[#073B30]">
                      #{item.questionId} · Q{rIdx + 1}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        item.isCorrect
                          ? "bg-[#55B96A] text-[#073B30]"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.isCorrect
                        ? isMl
                          ? "✓ ശരി (+10)"
                          : "✓ Correct (+10)"
                        : isMl
                        ? "✕ തെറ്റ് (0)"
                        : "✕ Incorrect (0)"}
                    </span>
                  </div>

                  <p className="font-semibold text-[#132E27] mb-2 leading-snug">
                    {item.questionText}
                  </p>

                  <div className="space-y-1 text-[11px] sm:text-xs">
                    <p className="text-[#244B3F]">
                      <span className="font-bold">
                        {isMl ? "നിങ്ങളുടെ ഉത്തരം: " : "Your Choice: "}
                      </span>
                      {item.selectedOptionIndex >= 0
                        ? item.options[item.selectedOptionIndex]
                        : "None"}
                    </p>

                    {!item.isCorrect && (
                      <p className="text-[#0B5D46] font-bold">
                        <span>{isMl ? "ശരിയുത്തരം: " : "Correct Answer: "}</span>
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

        {/* Primary Return Button (Ends Kiosk Session) */}
        <div className="w-full max-w-xl">
          <button
            type="button"
            onClick={handleReturnHome}
            className="w-full min-h-[58px] sm:min-h-[64px] px-8 py-4 rounded-2xl bg-[#073B30] text-[#FAFAF7] hover:bg-[#0B5D46] active:scale-95 transition-all text-base sm:text-lg font-bold shadow-lg flex items-center justify-center gap-3 touch-manipulation focus:outline-none focus-visible:ring-4 focus-visible:ring-[#55B96A]"
          >
            <span className={isMl ? "font-malayalam" : ""}>
              {isMl ? "കിയോസ്ക് മെനുവിലേക്ക് മടങ്ങുക" : "RETURN TO KIOSK HOMEPAGE"}
            </span>
            <span className="text-[#55B96A] text-xl font-bold">→</span>
          </button>
        </div>
      </div>

      {/* ─── KIOSK FOOTER ──────────────────────────────────────────────── */}
      <KioskFooter language={activeLang} />
    </main>
  );
}

export default function ArogyamithranResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FAFAF7] text-[#073B30]">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#55B96A] animate-ping" />
            <span className="text-sm font-bold">Loading Results...</span>
          </div>
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}
