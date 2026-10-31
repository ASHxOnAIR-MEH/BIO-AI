"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CLASSICAL_BOOKS_DATA, ClassicalBook } from "@/data/ayurvedaHistoryData";
import {
  BookOpen,
  Search,
  X,
  Quote,
  ChevronRight,
  BookMarked,
  ExternalLink,
  ShieldCheck,
  Type,
} from "lucide-react";

interface DigitalTextExplorerProps {
  onSelectBook?: (book: ClassicalBook) => void;
  isMalayalam?: boolean;
}

export default function DigitalTextExplorer({
  onSelectBook,
  isMalayalam = false,
}: DigitalTextExplorerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBranch, setSelectedBranch] = useState<string>("all");
  const [activeBookModal, setActiveBookModal] = useState<ClassicalBook | null>(null);
  const [fontSize, setFontSize] = useState<"sm" | "md" | "lg">("md");

  const branches = [
    { id: "all", label: "All Treatises", labelMl: "എല്ലാ ഗ്രന്ഥങ്ങളും" },
    { id: "Kayachikitsa", label: "Internal Medicine", labelMl: "കായചികിത്സ" },
    { id: "Shalyatantra", label: "Surgery", labelMl: "ശല്യതന്ത്രം" },
    { id: "Samgraha", label: "Synthetic Compendia", labelMl: "അഷ്ടാംഗ സംഗ്രഹം" },
    { id: "Nidana", label: "Pathology & Diagnostics", labelMl: "രോഗനിദാനം" },
    { id: "Bhaishajya", label: "Pharmacy & Chemistry", labelMl: "ഔഷധനിർമ്മാണം" },
    { id: "Nighantu", label: "Materia Medica", labelMl: "നിഘണ്ടു" },
    { id: "Regional Compendium", label: "Kerala Compendia", labelMl: "കേരളീയ ഗ്രന്ഥങ്ങൾ" },
  ];

  const filteredBooks = useMemo(() => {
    return CLASSICAL_BOOKS_DATA.filter((b) => {
      const matchesBranch = selectedBranch === "all" || b.branch === selectedBranch;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        b.title.toLowerCase().includes(q) ||
        b.titleSanskrit.toLowerCase().includes(q) ||
        b.titleMl.toLowerCase().includes(q) ||
        b.traditionalAuthor.toLowerCase().includes(q) ||
        (b.redactorCommentator && b.redactorCommentator.toLowerCase().includes(q)) ||
        b.historicalSignificance.toLowerCase().includes(q) ||
        b.sthanaStructure.some((s) => s.name.toLowerCase().includes(q));

      return matchesBranch && matchesSearch;
    });
  }, [selectedBranch, searchQuery]);

  const handleOpenBook = (book: ClassicalBook) => {
    setActiveBookModal(book);
    if (onSelectBook) {
      onSelectBook(book);
    }
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case "sm":
        return "text-xs sm:text-sm";
      case "lg":
        return "text-base sm:text-lg";
      default:
        return "text-sm sm:text-base";
    }
  };

  return (
    <section
      id="classical-library"
      className="relative w-full py-16 sm:py-24 px-4 sm:px-6 md:px-12 bg-gradient-to-b from-[#F3EDE2] via-[#FAF7EE] to-[#F3EDE2] text-[#072820] overflow-hidden select-none"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#0B5D46_1px,transparent_1px)] [background-size:28px_28px]" />

      {/* ─── SECTION HEADER ─── */}
      <div className="relative z-10 max-w-4xl mx-auto text-center mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#072820]/10 border border-[#0B5D46]/20 text-[#072820] text-xs font-bold tracking-wider uppercase mb-3">
          <BookMarked className="w-3.5 h-3.5 text-[#0B5D46]" />
          <span>{isMalayalam ? "ഓപ്പൺ നോളജ് ലൈബ്രറി" : "Open Knowledge Library & Codex Explorer"}</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#072820] tracking-tight">
          {isMalayalam ? "ആയുർവേദ ശാസ്ത്ര ഗ്രന്ഥപ്പുര" : "Classical Treatises & Medical Codices"}
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-[#244B3F]/85 max-w-2xl mx-auto mt-2 font-sans leading-relaxed">
          {isMalayalam
            ? "പൗരാണിക സംഹിതകൾ, അധ്യായ ക്രമങ്ങൾ, സംസ്‌കൃത ശ്ലോകങ്ങൾ, അവയുടെ ശാസ്ത്രീയ വ്യാഖ്യാനങ്ങൾ എന്നിവ ഇവിടെ പരിശോധിക്കാം."
            : "Explore legally accessible classical Indian medical treatises, structural chapters (Sthanas), Sanskrit excerpts, and archival preservation records from CCRAS, NCBS and SAMHiTA."}
        </p>

        {/* Live Search Input */}
        <div className="relative max-w-lg mx-auto mt-6 mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              isMalayalam
                ? "ഗ്രന്ഥങ്ങൾ, ആചാര്യന്മാർ, സ്ഥാനങ്ങൾ തിരയുക..."
                : "Search by treatise title, author, sthana, or pathology..."
            }
            className="w-full pl-11 pr-4 py-3 rounded-full bg-white border-2 border-[#0B5D46]/20 text-xs sm:text-sm text-[#072820] placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Branch Filter Chips */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-none">
          {branches.map((b) => (
            <button
              key={b.id}
              type="button"
              onClick={() => setSelectedBranch(b.id)}
              className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap touch-manipulation ${
                selectedBranch === b.id
                  ? "bg-[#0B5D46] text-white shadow-xs"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {isMalayalam ? b.labelMl : b.label}
            </button>
          ))}
        </div>
      </div>

      {/* ─── BOOK CARDS GRID ─── */}
      <div className="relative z-10 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <motion.div
            key={book.id}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.985 }}
            onClick={() => handleOpenBook(book)}
            className="bg-white rounded-3xl p-6 border-2 border-[#0B5D46]/15 hover:border-[#D4AF37] shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group touch-manipulation relative overflow-hidden"
          >
            {/* Top Spine Accent */}
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#0B5D46] via-[#D4AF37] to-[#0B5D46]" />

            <div>
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0B5D46] bg-[#0B5D46]/10 px-2.5 py-0.5 rounded-full">
                  {book.branch}
                </span>
                <span className="text-[11px] font-mono text-gray-500">
                  {book.dateRangeApprox.split("–")[0]}
                </span>
              </div>

              {/* Title & Sanskrit */}
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#072820] group-hover:text-[#0B5D46] transition-colors leading-snug">
                {book.title}
              </h3>
              <p className="font-serif italic text-xs text-[#7A622A] mt-0.5">
                {book.titleSanskrit} • {book.titleMl}
              </p>

              {/* Legal License & Source Institution Badge */}
              <div className="flex items-center gap-1.5 mt-2.5 flex-wrap">
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                  book.licenseType === "Public Domain"
                    ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                    : "bg-blue-100 text-blue-800 border border-blue-300"
                }`}>
                  ⚖️ {book.licenseType || "Public Domain"}
                </span>
                <span className="text-[10px] text-gray-500 font-mono truncate">
                  🏛️ {book.sourceInstitution ? book.sourceInstitution.split("/")[0].trim() : "CCRAS"}
                </span>
              </div>

              {/* Author & Redactor */}
              <div className="mt-3 pt-3 border-t border-gray-100 text-xs">
                <p className="text-gray-600">
                  <span className="font-bold text-[#072820]">Author:</span> {book.traditionalAuthor}
                </p>
                {book.redactorCommentator && (
                  <p className="text-gray-500 text-[11px] mt-0.5 truncate">
                    <span className="font-semibold text-gray-700">Redactor:</span> {book.redactorCommentator}
                  </p>
                )}
              </div>

              {/* Structure Stats */}
              <div className="grid grid-cols-2 gap-2 mt-4 p-2.5 rounded-xl bg-[#FAF7EE] text-center text-xs">
                <div>
                  <span className="text-sm font-bold text-[#0B5D46] block">
                    {book.totalChapters}
                  </span>
                  <span className="text-[10px] text-gray-600 uppercase">Chapters</span>
                </div>
                <div>
                  <span className="text-sm font-bold text-[#0B5D46] block truncate">
                    {book.sthanaStructure.length}
                  </span>
                  <span className="text-[10px] text-gray-600 uppercase">Sections (Sthanas)</span>
                </div>
              </div>

              {/* Core Snippet */}
              <p className="text-xs text-[#244B3F]/80 leading-relaxed mt-3 line-clamp-2">
                {book.historicalSignificance}
              </p>
            </div>

            {/* Bottom Action */}
            <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#0B5D46]">
              <span className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                <span>{isMalayalam ? "ഗ്രന്ഥം തുറക്കൂ" : "Inspect Treatise"}</span>
                <ChevronRight className="w-4 h-4" />
              </span>
              <BookOpen className="w-4 h-4 text-[#D4AF37]" />
            </div>
          </motion.div>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-12 text-gray-500 font-sans">
          <BookOpen className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm font-bold">No classical treatises matched your search query.</p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedBranch("all");
            }}
            className="mt-3 text-xs text-[#0B5D46] font-bold underline"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* ─── DETAILED DIGITAL BOOK READER MODAL ─── */}
      <AnimatePresence>
        {activeBookModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#FAF7EE] text-[#072820] rounded-3xl shadow-2xl border-2 border-[#D4AF37]/50 overflow-hidden"
            >
              {/* Header */}
              <div className="px-6 sm:px-8 py-4 sm:py-5 bg-[#072820] text-[#FAF7EE] border-b border-[#D4AF37]/30 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider bg-white/10 px-2.5 py-0.5 rounded-full">
                      {activeBookModal.branch} • {activeBookModal.dateRangeApprox}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-300">
                      ⚖️ {activeBookModal.licenseType || "Public Domain"}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-3xl font-bold">
                    {activeBookModal.title} ({activeBookModal.titleSanskrit})
                  </h3>
                </div>

                {/* Controls: Text size & Close */}
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex items-center gap-1 bg-white/10 px-2 py-1 rounded-full text-xs">
                    <Type className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <button
                      type="button"
                      onClick={() => setFontSize("sm")}
                      className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${
                        fontSize === "sm" ? "bg-[#D4AF37] text-[#072820]" : "text-white/70"
                      }`}
                    >
                      A-
                    </button>
                    <button
                      type="button"
                      onClick={() => setFontSize("md")}
                      className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${
                        fontSize === "md" ? "bg-[#D4AF37] text-[#072820]" : "text-white/70"
                      }`}
                    >
                      A
                    </button>
                    <button
                      type="button"
                      onClick={() => setFontSize("lg")}
                      className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${
                        fontSize === "lg" ? "bg-[#D4AF37] text-[#072820]" : "text-white/70"
                      }`}
                    >
                      A+
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveBookModal(null)}
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className={`flex-1 overflow-y-auto p-5 sm:p-8 space-y-6 ${getFontSizeClass()}`}>
                {/* Legal Access & Source Reference Banner */}
                <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="font-bold text-emerald-900 block">
                      🏛️ Source Repository: {activeBookModal.sourceInstitution || "CCRAS / SAMHiTA"}
                    </span>
                    <span className="text-emerald-800 text-[11px]">
                      Edition: {activeBookModal.editionInfo || "Standard Critical Sanskrit Edition"}
                    </span>
                  </div>

                  {activeBookModal.originalSourceLink && (
                    <a
                      href={activeBookModal.originalSourceLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-[11px] shrink-0 transition-colors"
                    >
                      <span>Institutional Source</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                {/* Author & Transmission */}
                <div className="bg-white rounded-2xl p-5 border border-gray-200">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0B5D46] mb-2">
                    Traditional Authorship & Historical Transmission:
                  </h4>
                  <p className="font-bold text-[#072820]">
                    Traditional Author: {activeBookModal.traditionalAuthor}
                  </p>
                  {activeBookModal.redactorCommentator && (
                    <p className="text-xs text-gray-600 mt-1">
                      Redactors & Commentaries: {activeBookModal.redactorCommentator}
                    </p>
                  )}
                  <p className="text-xs text-amber-900 bg-amber-50 p-2.5 rounded-xl border border-amber-200 mt-2.5">
                    <span className="font-bold">Historical Note:</span> {activeBookModal.dateUncertaintyNote}
                  </p>
                </div>

                {/* Sthana Structure Table */}
                <div className="bg-white rounded-2xl p-5 border border-gray-200 space-y-3">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0B5D46]">
                    Sectional Architecture ({activeBookModal.sthanaStructure.length} Sthanas • {activeBookModal.totalChapters} Chapters):
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeBookModal.sthanaStructure.map((sthana, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-[#FAF7EE] border border-[#0B5D46]/10 text-xs"
                      >
                        <div className="flex items-center justify-between font-bold text-[#072820]">
                          <span>{sthana.name} ({sthana.nameSanskrit})</span>
                          <span className="text-[10px] text-[#0B5D46] bg-[#0B5D46]/10 px-2 py-0.5 rounded-full">
                            {sthana.chapters} ch.
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-600 mt-1 leading-snug">
                          {sthana.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Verified Classical Excerpt */}
                <div className="bg-[#072820] text-[#FAF7EE] rounded-2xl p-5 sm:p-6 border-2 border-[#D4AF37]/50 relative">
                  <div className="flex items-center gap-2 mb-2">
                    <Quote className="w-4 h-4 text-[#D4AF37]" />
                    <span className="text-[11px] font-mono font-bold text-[#D4AF37] uppercase tracking-wider">
                      Verified Sanskrit Excerpt • {activeBookModal.verifiedExcerpt.reference}
                    </span>
                  </div>
                  <p className="font-serif text-base sm:text-lg text-[#F4DE97] leading-relaxed mb-2">
                    {activeBookModal.verifiedExcerpt.sanskrit}
                  </p>
                  <p className="text-xs font-serif italic text-white/70 mb-3">
                    {activeBookModal.verifiedExcerpt.transliteration}
                  </p>
                  <p className="text-xs sm:text-sm text-white/90 font-sans italic border-t border-white/10 pt-2">
                    &ldquo;{activeBookModal.verifiedExcerpt.english}&rdquo;
                  </p>
                  <p className="text-[11px] text-white/70 mt-2">
                    <span className="font-bold text-[#D4AF37]">Context:</span> {activeBookModal.verifiedExcerpt.context}
                  </p>
                </div>

                {/* Manuscript Preservation Details */}
                <div className="bg-white rounded-2xl p-5 border border-gray-200 text-xs space-y-2">
                  <h4 className="font-mono font-bold uppercase tracking-wider text-[#0B5D46]">
                    Manuscript Details & Archival Preservation:
                  </h4>
                  <p>
                    <span className="font-bold">Historical Material & Scripts:</span> {activeBookModal.manuscriptDetails.material} ({activeBookModal.manuscriptDetails.primaryScript})
                  </p>
                  <p>
                    <span className="font-bold">Major Preserving Repositories:</span> {activeBookModal.manuscriptDetails.preservationCenters.join(", ")}
                  </p>
                  {activeBookModal.manuscriptDetails.firstPrintedEdition && (
                    <p>
                      <span className="font-bold">First Historic Printed Edition:</span> {activeBookModal.manuscriptDetails.firstPrintedEdition}
                    </p>
                  )}
                  <p className="text-[11px] text-[#0B5D46] italic pt-1 border-t border-gray-100 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Authority: {activeBookModal.ccrasReference}</span>
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-white border-t border-gray-200 flex items-center justify-between">
                <span className="text-[11px] text-gray-500 font-mono hidden sm:inline">
                  Educational codex reference • Bio-AI Centre of Excellence
                </span>
                <button
                  type="button"
                  onClick={() => setActiveBookModal(null)}
                  className="px-6 py-2.5 rounded-full bg-[#0B5D46] text-white text-xs sm:text-sm font-bold hover:bg-[#072820] transition-all"
                >
                  Close Codex
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
