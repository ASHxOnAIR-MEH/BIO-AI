"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ASHTAVAIDYA_FAMILIES_DATA,
  REGIONAL_KERALA_TEXTS_DATA,
  AshtavaidyaFamily,
  RegionalKeralaText,
} from "@/data/ayurvedaHistoryData";
import GurukulaExperience from "./GurukulaExperience";
import {
  TreePine,
  Sparkles,
  MapPin,
  BookOpen,
  Award,
  Scroll,
  ShieldCheck,
  ChevronRight,
  Heart,
  Quote,
  CheckCircle2,
} from "lucide-react";

interface AshtavaidyaHeritageSectionProps {
  onUnlockHeritageBadge?: () => void;
  isMalayalam?: boolean;
}

export default function AshtavaidyaHeritageSection({
  onUnlockHeritageBadge,
  isMalayalam = false,
}: AshtavaidyaHeritageSectionProps) {
  const [selectedFamily, setSelectedFamily] = useState<AshtavaidyaFamily>(
    ASHTAVAIDYA_FAMILIES_DATA[0]
  );
  const [selectedText, setSelectedText] = useState<RegionalKeralaText>(
    REGIONAL_KERALA_TEXTS_DATA[0]
  );
  const [activeStoryChapter, setActiveStoryChapter] = useState(1);
  const [heritageBadgeUnlocked, setHeritageBadgeUnlocked] = useState(false);

  const handleFinishHeritage = () => {
    setHeritageBadgeUnlocked(true);
    if (onUnlockHeritageBadge) {
      onUnlockHeritageBadge();
    }
  };

  const CHAPTERS = [
    { num: 1, title: "1. Arrival of Classical Knowledge", titleMl: "1. അഷ്ടാംഗഹൃദയത്തിന്റെ ആഗമനം" },
    { num: 2, title: "2. Rise of the Ashtavaidyas", titleMl: "2. നിലാതീരത്തെ അഷ്ടവൈദ്യ ഉദയം" },
    { num: 3, title: "3. The Documented Families", titleMl: "3. പാരമ്പര്യ വൈദ്യ ഇല്ലങ്ങൾ" },
    { num: 4, title: "4. The Gurukula System", titleMl: "4. ഗുരുകുല പഠനരീതി" },
    { num: 5, title: "5. Kerala Classical Literature", titleMl: "5. പ്രാദേശിക ഗ്രന്ഥങ്ങൾ" },
    { num: 6, title: "6. Preserving Living Heritage", titleMl: "6. പൈതൃക സംരക്ഷണം" },
  ];

  return (
    <section
      id="kerala-ashtavaidya"
      className="relative w-full py-16 sm:py-24 px-4 sm:px-6 md:px-12 bg-gradient-to-b from-[#FAF7EE] via-[#F4EFE6] to-[#FAF7EE] text-[#072820] overflow-hidden"
    >
      {/* Background Kerala Kasavu & Nila River Ambience */}
      <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-r from-[#0B5D46] via-[#D4AF37] to-[#0B5D46]" />
      <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-[#55B96A]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-[#D4AF37]/15 blur-[120px] pointer-events-none" />

      {/* ─── SECTION HEADER ─── */}
      <div className="relative z-10 max-w-4xl mx-auto text-center mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#072820] text-[#D4AF37] text-xs font-bold tracking-wider uppercase mb-3 shadow-xs">
          <TreePine className="w-3.5 h-3.5 text-[#55B96A]" />
          <span>{isMalayalam ? "പ്രത്യേക കേരളീയ പൈതൃകം" : "Special Interactive Heritage Showcase"}</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#072820] tracking-tight">
          {isMalayalam ? "അഷ്ടവൈദ്യന്മാർ — കേരളത്തിന്റെ എട്ട് സംരക്ഷകർ" : "THE EIGHT GUARDIANS"}
        </h2>
        <p className="font-serif text-lg sm:text-xl md:text-2xl text-[#0B5D46] font-semibold mt-1">
          {isMalayalam
            ? "ഭാരതീയ ആയുർവേദ പാരമ്പര്യത്തിൽ കേരളത്തിന്റെ അതുല്യ സംഭാവന"
            : "The Ashtavaidya Heritage of Kerala"}
        </p>

        <p className="text-xs sm:text-sm md:text-base text-[#244B3F]/85 max-w-2xl mx-auto mt-3 font-sans leading-relaxed">
          {isMalayalam
            ? "നിളാനദിയുടെ തീരങ്ങളിലും പശ്ചിമഘട്ട താഴ്‌വരകളിലും പടർന്നുപന്തലിച്ച പാരമ്പര്യ വൈദ്യ കുടുംബങ്ങളുടെ ചരിത്രവും ആധികാരിക ഗവേഷണങ്ങളും പരിശോധിക്കൂ."
            : "Discover the physician families, classical Sanskrit scholarship, and centuries-old living traditions documented by the National Centre for Biological Sciences (NCBS)."}
        </p>

        {/* ─── CHAPTER SELECTION TABS ─── */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-8 overflow-x-auto pb-2 scrollbar-none">
          {CHAPTERS.map((ch) => (
            <button
              key={ch.num}
              type="button"
              onClick={() => setActiveStoryChapter(ch.num)}
              className={`px-3.5 sm:px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap touch-manipulation ${
                activeStoryChapter === ch.num
                  ? "bg-[#072820] text-[#D4AF37] shadow-sm ring-2 ring-[#D4AF37]"
                  : "bg-white/80 text-[#072820] hover:bg-white border border-[#0B5D46]/15"
              }`}
            >
              {isMalayalam ? ch.titleMl : ch.title}
            </button>
          ))}
        </div>
      </div>

      {/* ─── STORY CHAPTER CONTAINER ─── */}
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* ── CHAPTER 1: THE ARRIVAL OF CLASSICAL KNOWLEDGE ── */}
        {activeStoryChapter === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#0B5D46]/20 shadow-md space-y-6"
          >
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#0B5D46] uppercase">
              <Scroll className="w-4 h-4 text-[#D4AF37]" />
              <span>Chapter 1 • Classical Transmission to the South</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#072820]">
              The Supremacy of Ashtanga Hridaya in Kerala
            </h3>

            <div className="space-y-4 text-sm sm:text-base text-[#244B3F]/90 leading-relaxed font-sans">
              <p>
                Unlike northern regions where the prose-heavy Charaka Samhita remained the primary scholarly manual, Kerala adopted Master Vagbhata's <em>Ashtanga Hridaya</em> as its definitive medical bible.
              </p>
              <p>
                Oral tradition recounts that disciples of Vagbhata traveled south to Kerala, establishing gurukulas where the text was committed entirely to memory in musical Sanskrit meter. Its 7,120 verses were celebrated for clinical directness: providing clear diagnoses, minimal philosophical disputation, and practical formulations.
              </p>
              <p>
                Kerala scholars penned world-renowned commentaries on the Hridaya, notably the ancient <em>Vakyapradipika</em> and <em>Hridyabodhika</em>, embedding the text indelibly into Malayalam literary and medical culture.
              </p>
            </div>

            <div className="bg-[#FAF7EE] rounded-2xl p-5 border border-[#D4AF37]/40 flex items-start gap-3">
              <Quote className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
              <div>
                <p className="font-serif italic text-sm text-[#072820]">
                  &ldquo;In Kerala, a student cannot even begin practical medical training until all 120 chapters of the Ashtanga Hridaya are recited flawlessly from memory.&rdquo;
                </p>
                <p className="text-[11px] text-[#0B5D46] font-mono mt-1">
                  — NCBS Oral History Archive (Vaidyamadham Cheriya Narayanan Namboodiri)
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveStoryChapter(2)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0B5D46] text-white text-xs sm:text-sm font-bold hover:bg-[#072820] transition-all"
              >
                <span>Continue to Chapter 2: Rise of Ashtavaidyas ➔</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── CHAPTER 2: THE RISE OF ASHTAVAIDYAS (NILA VALLEY) ── */}
        {activeStoryChapter === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#0B5D46]/20 shadow-md space-y-6"
          >
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#0B5D46] uppercase">
              <MapPin className="w-4 h-4 text-[#D4AF37]" />
              <span>Chapter 2 • 13th to 17th Century Consolidation</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#072820]">
              The Nila River Basin: Crucible of Living Ayurveda
            </h3>

            <div className="space-y-4 text-sm sm:text-base text-[#244B3F]/90 leading-relaxed font-sans">
              <p>
                Rigorous historical research led by the National Centre for Biological Sciences (NCBS) establishes that the Ashtavaidya tradition consolidated between the <strong>13th and 17th centuries CE</strong>, centered predominantly in the fertile basin of the <strong>Nila River (Bharathapuzha)</strong> in central Kerala.
              </p>
              <p>
                The title <em>Ashtavaidya</em> designates mastery over the full <strong>Eight Branches (Ashtanga)</strong> of Ayurveda. These hereditary Namboodiri Brahmin physician lineages established family estates (Illams) where classical Sanskrit scholarship interfaced with the extraordinary tropical botanical biodiversity of the Western Ghats.
              </p>
              <p>
                The Ashtavaidyas synthesized Sanskrit texts with local folk knowledge, developing unique clinical procedures that have made Kerala world-famous: <strong>Dhara</strong> (continuous medicated liquid stream over forehead), <strong>Pizhichil</strong> (medicated warm oil bath), <strong>Navarakizhi</strong> (boluses of medicated Shashtika rice cooked in milk and herbal decoction), and specialized toxicological protocols.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-[#FAF7EE] border border-[#0B5D46]/10 text-center">
                <span className="text-xl font-bold text-[#0B5D46] block">13th–17th c.</span>
                <span className="text-xs text-gray-600">Documented Historical Epoch</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#FAF7EE] border border-[#0B5D46]/10 text-center">
                <span className="text-xl font-bold text-[#0B5D46] block">Nila River</span>
                <span className="text-xs text-gray-600">Geographic & Cultural Epicentre</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#FAF7EE] border border-[#0B5D46]/10 text-center">
                <span className="text-xl font-bold text-[#0B5D46] block">8 Branches</span>
                <span className="text-xs text-gray-600">Exhaustive Systemic Mastery</span>
              </div>
            </div>

            <div className="pt-2 flex justify-between">
              <button
                type="button"
                onClick={() => setActiveStoryChapter(1)}
                className="px-5 py-2.5 rounded-full border border-gray-300 text-xs font-bold text-gray-600 hover:bg-gray-100"
              >
                ← Previous
              </button>
              <button
                type="button"
                onClick={() => setActiveStoryChapter(3)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0B5D46] text-white text-xs sm:text-sm font-bold hover:bg-[#072820] transition-all"
              >
                <span>Continue to Chapter 3: The Documented Families ➔</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── CHAPTER 3: THE ASHTAVAIDYA FAMILIES (INTERACTIVE HERITAGE MAP) ── */}
        {activeStoryChapter === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#0B5D46]/20 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-xs font-mono font-bold text-[#0B5D46] uppercase block">
                    Chapter 3 • Ancestral Heritage Map
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#072820]">
                    The Documented Physician Families
                  </h3>
                </div>
                <span className="text-xs font-mono text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  NCBS Archival Records
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#244B3F]/85 leading-relaxed mb-6 font-sans">
                While regional oral tradition fondly counts eighteen original lineages, scholarly historical documentation highlights prominent surviving and historically influential families. Touch any family below to view their documented clinical specialization.
              </p>

              {/* Family Selector Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-8">
                {ASHTAVAIDYA_FAMILIES_DATA.map((fam) => {
                  const isSelected = selectedFamily.id === fam.id;

                  return (
                    <button
                      key={fam.id}
                      type="button"
                      onClick={() => setSelectedFamily(fam)}
                      className={`p-3.5 rounded-2xl border text-left transition-all active:scale-[0.985] ${
                        isSelected
                          ? "bg-[#072820] text-white border-[#D4AF37] shadow-sm font-bold"
                          : "bg-[#FAF7EE] text-[#072820] border-[#0B5D46]/10 hover:border-[#D4AF37]"
                      }`}
                    >
                      <span className="text-[10px] font-mono text-[#D4AF37] block uppercase">
                        {fam.district}
                      </span>
                      <p className="font-serif text-sm truncate">{fam.name}</p>
                      <p className="text-[11px] text-[#244B3F]/70 truncate font-malayalam">
                        {fam.nameMl}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Selected Family Detail Profile */}
              <div className="bg-gradient-to-br from-[#FAF7EE] to-[#F0F7F1] rounded-2xl p-6 border-2 border-[#D4AF37]/40 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#0B5D46]/15 pb-3">
                  <div>
                    <h4 className="font-serif text-2xl font-bold text-[#072820]">
                      {selectedFamily.name}
                    </h4>
                    <p className="text-xs text-[#0B5D46] font-semibold">
                      {selectedFamily.location} • {selectedFamily.riverValley}
                    </p>
                  </div>

                  <span className="text-xs font-mono bg-[#0B5D46] text-white px-3 py-1 rounded-full">
                    Specialization: {selectedFamily.specialization.split(",")[0]}
                  </span>
                </div>

                <div>
                  <h5 className="text-xs font-bold text-[#072820] uppercase font-mono mb-1">
                    Documented Clinical Specialty:
                  </h5>
                  <p className="text-xs sm:text-sm text-[#244B3F]/90 leading-relaxed font-sans">
                    {selectedFamily.specialization}
                  </p>
                </div>

                <div>
                  <h5 className="text-xs font-bold text-[#072820] uppercase font-mono mb-1">
                    Historical Documentation:
                  </h5>
                  <p className="text-xs sm:text-sm text-[#244B3F]/90 leading-relaxed font-sans">
                    {selectedFamily.historicalDocumentation}
                  </p>
                </div>

                <div className="bg-white/80 rounded-xl p-3 border border-amber-200 text-xs text-amber-950">
                  <span className="font-bold text-[#7A622A] block mb-0.5">
                    Oral Tradition vs. Archival History:
                  </span>
                  {selectedFamily.oralTraditionNote}
                </div>

                <p className="text-[11px] text-[#0B5D46] italic font-mono pt-1">
                  Source: {selectedFamily.ncbsArchiveReference}
                </p>
              </div>

              <div className="pt-6 flex justify-between">
                <button
                  type="button"
                  onClick={() => setActiveStoryChapter(2)}
                  className="px-5 py-2.5 rounded-full border border-gray-300 text-xs font-bold text-gray-600 hover:bg-gray-100"
                >
                  ← Previous
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStoryChapter(4)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0B5D46] text-white text-xs sm:text-sm font-bold hover:bg-[#072820] transition-all"
                >
                  <span>Continue to Chapter 4: The Gurukula System ➔</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── CHAPTER 4: THE GURUKULA LEARNING SYSTEM (SIMULATOR) ── */}
        {activeStoryChapter === 4 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <GurukulaExperience
              onCompleteGurukula={() => {
                setActiveStoryChapter(5);
              }}
              isMalayalam={isMalayalam}
            />

            <div className="flex justify-between pt-2">
              <button
                type="button"
                onClick={() => setActiveStoryChapter(3)}
                className="px-5 py-2.5 rounded-full border border-gray-300 text-xs font-bold text-gray-600 hover:bg-gray-100 bg-white"
              >
                ← Previous
              </button>
              <button
                type="button"
                onClick={() => setActiveStoryChapter(5)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0B5D46] text-white text-xs sm:text-sm font-bold hover:bg-[#072820] transition-all"
              >
                <span>Continue to Chapter 5: Regional Literature ➔</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── CHAPTER 5: KERALA'S CLASSICAL LITERATURE ── */}
        {activeStoryChapter === 5 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#0B5D46]/20 shadow-md space-y-6"
          >
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="text-xs font-mono font-bold text-[#0B5D46] uppercase block">
                  Chapter 5 • Vernacular Medical Codices
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#072820]">
                  Kerala's Classical Clinical Literature
                </h3>
              </div>
              <BookOpen className="w-6 h-6 text-[#D4AF37]" />
            </div>

            <p className="text-xs sm:text-sm text-[#244B3F]/85 font-sans leading-relaxed">
              Kerala physicians authored monumental clinical compendia that adapted Sanskrit teachings for immediate bedside formulation. Touch each manuscript below to explore its historic significance.
            </p>

            {/* Manuscript Object Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {REGIONAL_KERALA_TEXTS_DATA.map((txt) => {
                const isSelected = selectedText.id === txt.id;

                return (
                  <button
                    key={txt.id}
                    type="button"
                    onClick={() => setSelectedText(txt)}
                    className={`p-4 rounded-2xl border text-left transition-all active:scale-[0.985] ${
                      isSelected
                        ? "bg-[#072820] text-[#FAF7EE] border-[#D4AF37] shadow-sm font-bold"
                        : "bg-[#FAF7EE] text-[#072820] border-[#0B5D46]/10 hover:border-[#D4AF37]"
                    }`}
                  >
                    <span className="text-[10px] font-mono text-[#D4AF37] block uppercase">
                      {txt.approximatePeriod}
                    </span>
                    <p className="font-serif text-sm sm:text-base mt-1 truncate">
                      {txt.title}
                    </p>
                    <p className="text-[11px] text-[#244B3F]/70 truncate font-malayalam">
                      {txt.titleMl}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Selected Text Showcase */}
            <div className="bg-[#FAF7EE] rounded-2xl p-6 border-2 border-[#D4AF37]/40 space-y-4">
              <div className="border-b border-[#0B5D46]/15 pb-3">
                <span className="text-xs font-mono text-[#0B5D46] font-bold">
                  {selectedText.approximatePeriod} • Authorship: {selectedText.authorship}
                </span>
                <h4 className="font-serif text-2xl font-bold text-[#072820] mt-0.5">
                  {selectedText.title} ({selectedText.titleMl})
                </h4>
                <p className="text-xs text-gray-600 font-mono mt-0.5">
                  Script: {selectedText.languageAndScript}
                </p>
              </div>

              <div>
                <h5 className="text-xs font-bold text-[#072820] uppercase font-mono mb-1">
                  Textual Structure & Clinical Purpose:
                </h5>
                <p className="text-xs sm:text-sm text-[#244B3F]/90 leading-relaxed">
                  {selectedText.structure}
                </p>
              </div>

              <div>
                <h5 className="text-xs font-bold text-[#072820] uppercase font-mono mb-1.5">
                  Major Contributions to Ayurvedic Practice:
                </h5>
                <ul className="space-y-1.5 text-xs text-[#244B3F]/90">
                  {selectedText.keyContributions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#0B5D46] font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/80 rounded-xl p-3 border border-gray-200 text-xs text-gray-700">
                <span className="font-bold text-[#072820] block mb-0.5">Historical Context:</span>
                {selectedText.historicalContext}
              </div>

              <p className="text-[11px] text-[#0B5D46] font-mono italic">
                Citation: {selectedText.referenceSource}
              </p>
            </div>

            <div className="pt-2 flex justify-between">
              <button
                type="button"
                onClick={() => setActiveStoryChapter(4)}
                className="px-5 py-2.5 rounded-full border border-gray-300 text-xs font-bold text-gray-600 hover:bg-gray-100"
              >
                ← Previous
              </button>
              <button
                type="button"
                onClick={() => setActiveStoryChapter(6)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0B5D46] text-white text-xs sm:text-sm font-bold hover:bg-[#072820] transition-all"
              >
                <span>Continue to Chapter 6: Living Heritage ➔</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── CHAPTER 6: PRESERVING THE LIVING HERITAGE ── */}
        {activeStoryChapter === 6 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-[#072820] to-[#0A382C] text-[#FAF7EE] rounded-3xl p-6 sm:p-10 border-2 border-[#D4AF37]/50 shadow-2xl space-y-6 relative overflow-hidden"
          >
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#D4AF37] uppercase">
              <Award className="w-4 h-4 text-[#D4AF37]" />
              <span>Chapter 6 • Archive Preservation & Living Legacy</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
              Preserving Kerala's Living Medical Sanctuary
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-white/90 leading-relaxed font-sans">
              <p>
                In an era of rapid industrialization, the National Centre for Biological Sciences (NCBS, TIFR), Bangalore, spearheaded the monumental <strong>Ashtavaidya Archives Project</strong> under Dr. P. Ram Manohar and Indira Vaidyanathan.
              </p>
              <p>
                Through exhaustive audio-visual interviews, high-resolution digitisation of rare palm-leaf manuscripts (Grantha and Malayalam scripts), and botanical verification, the project chronicled the living memory of elder masters before their fragile oral histories were lost to time.
              </p>
              <p>
                Today, the Bio-AI Centre of Excellence carries this flame into the future: utilizing modern machine learning, spectral fingerprinting, and botanical database modeling to corroborate centuries of empirical Ashtavaidya formulations.
              </p>
            </div>

            {/* Sacred Closing Creed */}
            <div className="bg-white/10 rounded-2xl p-6 border border-[#D4AF37]/40 text-center my-6">
              <Sparkles className="w-6 h-6 text-[#D4AF37] mx-auto mb-2 animate-pulse" />
              <blockquote className="font-serif italic text-lg sm:text-2xl text-[#F4DE97] leading-relaxed">
                &ldquo;Knowledge survives when it is studied, documented and passed on.&rdquo;
              </blockquote>
              <p className="text-xs text-white/70 font-mono mt-2 uppercase tracking-widest">
                The Guiding Creed of the Bio-AI Heritage Exhibition
              </p>
            </div>

            {/* Completion Badge Award Card */}
            <div className="bg-[#FAF7EE] text-[#072820] rounded-2xl p-6 border-2 border-[#D4AF37] shadow-lg flex flex-col sm:flex-row items-center justify-between gap-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0B5D46] to-[#072820] flex items-center justify-center text-[#D4AF37] shrink-0 shadow-md">
                  <Award className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#0B5D46] font-bold block">
                    Heritage Journey Achievement
                  </span>
                  <h4 className="font-serif text-lg sm:text-xl font-bold text-[#072820]">
                    KERALA AYURVEDA HERITAGE EXPLORER
                  </h4>
                  <p className="text-xs text-[#244B3F]/80">
                    Mastered the Nila Valley history, documented families, and Gurukula system.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleFinishHeritage}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#0B5D46] hover:bg-[#072820] text-white font-serif font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 shrink-0"
              >
                {heritageBadgeUnlocked ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                    <span>Badge Claimed!</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                    <span>Claim Heritage Badge</span>
                  </>
                )}
              </button>
            </div>

            <div className="pt-2 flex justify-start">
              <button
                type="button"
                onClick={() => setActiveStoryChapter(5)}
                className="px-5 py-2.5 rounded-full border border-white/20 text-xs font-bold text-white/80 hover:bg-white/10"
              >
                ← Previous Chapter
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

