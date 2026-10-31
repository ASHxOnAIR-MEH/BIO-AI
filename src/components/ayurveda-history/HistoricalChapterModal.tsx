"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  HistoricalDestination,
  HISTORICAL_DESTINATIONS,
} from "@/data/ayurvedaHistoryData";
import {
  X,
  Sparkles,
  BookOpen,
  Award,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Scroll,
  ShieldCheck,
  Quote,
} from "lucide-react";

interface HistoricalChapterModalProps {
  destination: HistoricalDestination | null;
  onClose: () => void;
  onCompleteDestination: (destId: string) => void;
  onNextDestination: (nextDest: HistoricalDestination) => void;
  isMalayalam?: boolean;
}

export default function HistoricalChapterModal({
  destination,
  onClose,
  onCompleteDestination,
  onNextDestination,
  isMalayalam = false,
}: HistoricalChapterModalProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<"narrative" | "sources" | "artifact" | "challenge">("narrative");

  if (!destination) return null;

  const isCorrect = selectedAnswer === destination.challenge.correctIndex;

  const handleAnswerSubmit = (idx: number) => {
    if (quizSubmitted) return;
    setSelectedAnswer(idx);
    setQuizSubmitted(true);

    if (idx === destination.challenge.correctIndex) {
      onCompleteDestination(destination.id);
    }
  };

  const currentIdx = HISTORICAL_DESTINATIONS.findIndex((d) => d.id === destination.id);
  const nextDest = currentIdx >= 0 && currentIdx < HISTORICAL_DESTINATIONS.length - 1
    ? HISTORICAL_DESTINATIONS[currentIdx + 1]
    : null;

  const getDestinationImage = (id: string) => {
    switch (id) {
      case "vedic-foundations":
        return { path: "/images/veda/05-heritage-journey.jpg", alt: "Veda on Ancient Vedic Heritage Journey" };
      case "classical-samhita":
        return { path: "/images/veda/03-classical-manuscript-researcher.jpg", alt: "Veda Examining Classical Samhita Palm-Leaf Codices" };
      case "vagbhata-ashtanga":
        return { path: "/images/veda/06-palm-leaf-manuscript-archive.jpg", alt: "Historical Palm-Leaf Archives & Kerala Lamps" };
      case "classical-expansion":
        return { path: "/images/veda/03-classical-manuscript-researcher.jpg", alt: "Veda Studying Ayurvedic Compendia" };
      case "regional-traditions":
        return { path: "/images/veda/08-medicinal-plant-field-research.jpg", alt: "Veda Conducting Botanical Fieldwork in Western Ghats" };
      case "modern-ayurveda":
        return { path: "/images/veda/09-ayurveda-laboratory-research.jpg", alt: "Veda in Modern Bio-AI Research Laboratory" };
      default:
        return { path: "/images/veda/01-young-ayurveda-researcher-guide.jpg", alt: "Veda, Ayurveda Researcher" };
    }
  };

  const destImg = getDestinationImage(destination.id);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#FAF7EE] text-[#072820] rounded-3xl shadow-2xl border-2 border-[#D4AF37]/50 overflow-hidden"
          role="dialog"
          aria-labelledby="chapter-title"
        >
          {/* ─── MODAL HEADER ─── */}
          <div className="px-6 sm:px-8 py-5 bg-[#072820] text-[#FAF7EE] border-b border-[#D4AF37]/30">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-0.5 rounded-full bg-[#D4AF37] text-[#072820] text-xs font-mono font-bold uppercase tracking-wider">
                  Epoch 0{destination.order}
                </span>
                <span className="text-xs font-mono text-[#D4AF37]">
                  {destination.dateRange}
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-all active:scale-90"
                aria-label="Close chapter dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Title */}
            <h2 id="chapter-title" className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              {isMalayalam ? destination.periodNameMl : destination.periodName}
            </h2>
            <p className="text-xs sm:text-sm text-[#E6C665] font-serif italic mt-0.5">
              {destination.periodNameSanskrit} • {destination.approxEra}
            </p>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-1.5 sm:gap-2 mt-4 overflow-x-auto scrollbar-none pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={() => setActiveTab("narrative")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === "narrative"
                    ? "bg-[#D4AF37] text-[#072820] shadow-xs"
                    : "bg-white/10 text-white/80 hover:bg-white/15"
                }`}
              >
                {isMalayalam ? "ചരിത്ര വിവരണം" : "Historical Narrative"}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("sources")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === "sources"
                    ? "bg-[#D4AF37] text-[#072820] shadow-xs"
                    : "bg-white/10 text-white/80 hover:bg-white/15"
                }`}
              >
                {isMalayalam ? "ആധാരഗ്രന്ഥങ്ങൾ" : "Surviving Sources"}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("artifact")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === "artifact"
                    ? "bg-[#D4AF37] text-[#072820] shadow-xs"
                    : "bg-white/10 text-white/80 hover:bg-white/15"
                }`}
              >
                {isMalayalam ? "കൈയെഴുത്തുപ്രതി" : "Featured Artifact"}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("challenge")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === "challenge"
                    ? "bg-[#D4AF37] text-[#072820] shadow-xs"
                    : "bg-white/10 text-white/80 hover:bg-white/15"
                }`}
              >
                <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{isMalayalam ? "വിജ്ഞാന ചലഞ്ച്" : "Knowledge Challenge"}</span>
              </button>
            </div>
          </div>

          {/* ─── MODAL CONTENT BODY ─── */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
            {/* 1. NARRATIVE TAB */}
            {activeTab === "narrative" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Destination Scene Artwork from Veda Package */}
                <div className="relative w-full aspect-[21/9] sm:aspect-[24/9] rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-sm">
                  <Image
                    src={destImg.path}
                    alt={destImg.alt}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 640px) 100vw, 800px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#072820]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-2.5 left-3.5 flex items-center gap-2 text-white">
                    <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider bg-[#072820]/80 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20">
                      VEDA ARCHIVAL FIELD • {destImg.alt}
                    </span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#0B5D46]/15 shadow-xs">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#072820] mb-3 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#0B5D46]" />
                    <span>{isMalayalam ? "ഈ യുഗത്തിന്റെ പ്രാധാന്യം" : "Significance of this Epoch"}</span>
                  </h3>
                  <div className="space-y-3 text-sm sm:text-base text-[#244B3F]/90 leading-relaxed font-sans">
                    {destination.narrative.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </div>

                {/* Core Conceptual Breakthroughs */}
                <div>
                  <h4 className="font-serif text-base sm:text-lg font-bold text-[#072820] mb-3">
                    {isMalayalam ? "പ്രധാന ശാസ്ത്രീയ ആശയങ്ങൾ" : "Core Conceptual Breakthroughs"}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                    {destination.coreConcepts.map((concept, idx) => (
                      <div
                        key={idx}
                        className="bg-white rounded-2xl p-4 border border-[#0B5D46]/15 shadow-2xs hover:border-[#D4AF37] transition-all"
                      >
                        {concept.sanskritTerm && (
                          <span className="text-[11px] font-serif font-bold text-[#7A622A] block mb-1">
                            {concept.sanskritTerm}
                          </span>
                        )}
                        <h5 className="text-sm font-bold text-[#072820] mb-1">
                          {concept.title}
                        </h5>
                        <p className="text-xs text-[#244B3F]/80 leading-relaxed">
                          {concept.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* 2. SOURCES TAB */}
            {activeTab === "sources" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#0B5D46]/15 shadow-xs">
                  <h3 className="font-serif text-lg font-bold text-[#072820] mb-3 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#0B5D46]" />
                    <span>{isMalayalam ? "അതിജീവിച്ച പ്രാചീന ഗ്രന്ഥങ്ങൾ" : "Surviving Historical Texts"}</span>
                  </h3>
                  <ul className="space-y-2.5">
                    {destination.survivingSources.map((src, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-[#244B3F] bg-[#FAF7EE] p-3 rounded-xl border border-[#0B5D46]/10"
                      >
                        <Scroll className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                        <span className="font-medium">{src}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Academic & Archival Citations */}
                <div className="bg-[#FAF7EE] rounded-2xl p-5 border border-[#D4AF37]/30">
                  <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-[#072820] mb-3 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#0B5D46]" />
                    <span>{isMalayalam ? "ആധികാരിക സ്രോതസ്സുകൾ" : "Verified Academic Citations"}</span>
                  </h4>
                  <div className="space-y-2 text-xs text-[#244B3F]/85">
                    {destination.sourcesAndCitations.map((cite, i) => (
                      <div key={i} className="pb-2 border-b border-gray-200/80 last:border-none">
                        <p className="font-bold text-[#072820]">{cite.source}</p>
                        <p className="text-[11px] text-[#0B5D46]">{cite.institution}</p>
                        <p className="text-[11px] italic text-gray-600">{cite.citation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* 3. ARTIFACT TAB */}
            {activeTab === "artifact" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-gradient-to-br from-[#072820] to-[#0A382C] text-[#FAF7EE] rounded-3xl p-6 sm:p-8 border-2 border-[#D4AF37]/50 shadow-lg relative overflow-hidden">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
                      Featured Artifact: {destination.featuredArtifact.type}
                    </span>
                    <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-3">
                    {destination.featuredArtifact.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#FAF7EE]/85 leading-relaxed mb-6">
                    {destination.featuredArtifact.description}
                  </p>

                  {/* Classical Quote Inscription */}
                  {destination.featuredArtifact.quoteSanskrit && (
                    <div className="bg-white/10 rounded-2xl p-5 border border-white/15 backdrop-blur-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <Quote className="w-4 h-4 text-[#D4AF37]" />
                        <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider">
                          Original Sanskrit Citation
                        </span>
                      </div>
                      <p className="font-serif text-base sm:text-lg text-[#F4DE97] leading-relaxed mb-2">
                        {destination.featuredArtifact.quoteSanskrit}
                      </p>
                      <p className="text-xs sm:text-sm text-white/80 font-sans italic">
                        &ldquo;{destination.featuredArtifact.quoteTranslation}&rdquo;
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* 4. CHALLENGE TAB */}
            {activeTab === "challenge" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#0B5D46]/20 shadow-md">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#D4AF37] shrink-0">
                      <Image
                        src={quizSubmitted && isCorrect ? "/images/veda/veda-happy.png" : "/images/veda/veda-thinking.png"}
                        alt="Veda Guide"
                        fill
                        className="object-cover object-center"
                        sizes="36px"
                      />
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0B5D46] block">
                        {isMalayalam ? "വേദയുടെ അധ്യായ പരീക്ഷണം" : "Veda's Epoch Verification Challenge"}
                      </span>
                      <span className="text-[11px] text-gray-500">Test your mastery of this historical period</span>
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#072820] mb-5 leading-snug">
                    {isMalayalam ? destination.challenge.questionMl : destination.challenge.question}
                  </h3>

                  {/* Options */}
                  <div className="space-y-3 mb-6">
                    {destination.challenge.options.map((option, idx) => {
                      const isOptionSelected = selectedAnswer === idx;
                      const isOptionCorrect = idx === destination.challenge.correctIndex;

                      let btnStyle = "bg-[#FAF7EE] border-gray-200 text-[#072820] hover:border-[#D4AF37]";
                      if (quizSubmitted) {
                        if (isOptionCorrect) {
                          btnStyle = "bg-[#55B96A]/20 border-[#55B96A] text-[#073B30] font-bold";
                        } else if (isOptionSelected) {
                          btnStyle = "bg-red-50 border-red-400 text-red-800";
                        }
                      } else if (isOptionSelected) {
                        btnStyle = "bg-[#D4AF37]/20 border-[#D4AF37] font-bold";
                      }

                      return (
                        <button
                          key={idx}
                          type="button"
                          disabled={quizSubmitted}
                          onClick={() => handleAnswerSubmit(idx)}
                          className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center justify-between text-xs sm:text-sm active:scale-[0.99] touch-manipulation ${btnStyle}`}
                        >
                          <span>{option}</span>
                          {quizSubmitted && isOptionCorrect && (
                            <CheckCircle2 className="w-5 h-5 text-[#227744] shrink-0" />
                          )}
                          {quizSubmitted && isOptionSelected && !isOptionCorrect && (
                            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback Explanation */}
                  {quizSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed ${
                        isCorrect
                          ? "bg-[#55B96A]/15 border-[#55B96A] text-[#073B30]"
                          : "bg-amber-50 border-amber-300 text-amber-900"
                      }`}
                    >
                      <div className="flex items-center gap-2 font-bold mb-1">
                        {isCorrect ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-[#227744]" />
                            <span>{isMalayalam ? "ശരിയുത്തരം! യുഗം വിജയിച്ചു!" : "Veda's Feedback: Correct! Epoch Verified & Mastered!"}</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-4 h-4 text-amber-700" />
                            <span>{isMalayalam ? "വിശദീകരണം വായിക്കുക:" : "Veda's Note: Historical Clarification:"}</span>
                          </>
                        )}
                      </div>
                      <p>{destination.challenge.explanation}</p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </div>

          {/* ─── MODAL FOOTER ─── */}
          <div className="px-6 sm:px-8 py-4 bg-white border-t border-gray-200 flex items-center justify-between gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs sm:text-sm font-semibold transition-all"
            >
              {isMalayalam ? "അടയ്ക്കുക" : "Close Chapter"}
            </button>

            {nextDest && (
              <button
                type="button"
                onClick={() => {
                  onNextDestination(nextDest);
                  setActiveTab("narrative");
                  setQuizSubmitted(false);
                  setSelectedAnswer(null);
                }}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-[#072820] text-xs sm:text-sm font-serif font-bold shadow-md hover:shadow-lg transition-all active:scale-95"
              >
                <span>{isMalayalam ? "അടുത്ത യുഗം ➔" : `Next: Epoch 0${nextDest.order}`}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
