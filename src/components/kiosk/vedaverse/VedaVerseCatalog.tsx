"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import {
  Search,
  X,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from "lucide-react";
import { PlantRecord, VedaVerseCategory } from "../types";
import {
  getCategoriesWithCounts,
  searchPlants,
} from "@/lib/vedaverseEngine";
import PlantCard from "./PlantCard";
import BotanicalGlyph from "./BotanicalGlyph";
import VedaVerseDisclaimer from "./VedaVerseDisclaimer";

interface VedaVerseCatalogProps {
  initialPlants?: PlantRecord[];
  isMl?: boolean;
  initialQuery?: string;
  initialCategory?: VedaVerseCategory | "all";
}

const ITEMS_PER_PAGE = 24;

export default function VedaVerseCatalog({
  isMl = false,
  initialQuery = "",
  initialCategory = "all",
}: VedaVerseCatalogProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<
    VedaVerseCategory | "all"
  >(initialCategory);
  const [selectedLetter, setSelectedLetter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAllAtOnce, setShowAllAtOnce] = useState(false);

  // Track filter changes to adjust page during render without cascading effect
  const [prevSearch, setPrevSearch] = useState(searchQuery);
  const [prevCategory, setPrevCategory] = useState(selectedCategory);
  const [prevLetter, setPrevLetter] = useState(selectedLetter);
  if (
    prevSearch !== searchQuery ||
    prevCategory !== selectedCategory ||
    prevLetter !== selectedLetter
  ) {
    setPrevSearch(searchQuery);
    setPrevCategory(selectedCategory);
    setPrevLetter(selectedLetter);
    setCurrentPage(1);
  }

  // Category statistics
  const categoryCounts = useMemo(() => {
    const list = getCategoriesWithCounts();
    return {
      ayurvedic: list.find((c) => c.id === "Ayurvedic plant")?.count ?? 25,
      medicinal: list.find((c) => c.id === "Medicinal plant")?.count ?? 25,
      spices: list.find((c) => c.id === "Culinary spice / herb")?.count ?? 50,
    };
  }, []);

  // Filtered plant list
  const filteredPlants = useMemo(() => {
    let list = searchPlants({
      query: searchQuery,
      category: selectedCategory,
    });
    if (selectedLetter !== "all") {
      list = list.filter((p) =>
        p.common_name_en.trim().toUpperCase().startsWith(selectedLetter)
      );
    }
    return list;
  }, [searchQuery, selectedCategory, selectedLetter]);

  // Paginated slice
  const totalPages = Math.ceil(filteredPlants.length / ITEMS_PER_PAGE) || 1;
  const displayedPlants = useMemo(() => {
    if (showAllAtOnce) return filteredPlants;
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredPlants.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredPlants, currentPage, showAllAtOnce]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedLetter("all");
    setCurrentPage(1);
  };

  return (
    <div className="w-full space-y-8">
      {/* ─── Category Overview Quick Cards ─────────────────────────────────────── */}
      <section aria-label="Category Overview" className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* 1. Ayurvedic Plants Card */}
          <button
            type="button"
            onClick={() =>
              setSelectedCategory(
                selectedCategory === "Ayurvedic plant" ? "all" : "Ayurvedic plant"
              )
            }
            className={`text-left rounded-2xl sm:rounded-3xl p-5 sm:p-6 border-2 transition-all duration-200 relative overflow-hidden group touch-manipulation active:scale-[0.98] ${
              selectedCategory === "Ayurvedic plant"
                ? "bg-gradient-to-br from-[#0B5D46] to-[#073B30] text-white border-[#0B5D46] shadow-md ring-2 ring-[#55B96A]/50"
                : "bg-white text-[#073B30] border-[#0B5D46]/15 hover:border-[#0B5D46] shadow-sm hover:shadow"
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-[#0B5D46]/20 shadow-sm shrink-0">
                  <Image
                    src="/assets/kiosk/categories/ayurvedic-plants.jpg"
                    alt="Ayurvedic Plants"
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    selectedCategory === "Ayurvedic plant"
                      ? "bg-white/15 text-white"
                      : "bg-[#F0F7F1] text-[#0B5D46]"
                  }`}
                >
                  <BotanicalGlyph category="Ayurvedic plant" size="sm" />
                </div>
              </div>
              <span
                className={`text-2xl font-black font-mono px-3 py-1 rounded-xl ${
                  selectedCategory === "Ayurvedic plant"
                    ? "bg-white/20 text-white"
                    : "bg-[#0B5D46]/10 text-[#0B5D46]"
                }`}
              >
                {categoryCounts.ayurvedic}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold leading-tight">
              {isMl ? "ആയുർവേദ സസ്യങ്ങൾ" : "Ayurvedic Plants"}
            </h3>
            <p
              className={`text-xs sm:text-sm mt-1 leading-relaxed ${
                selectedCategory === "Ayurvedic plant"
                  ? "text-white/80"
                  : "text-[#244B3F]/75"
              }`}
            >
              {isMl
                ? "അശ്വഗന്ധ, ബ്രാഹ്മി, ശതാവരി ഉൾപ്പെടെ 25 ക്ലാസിക്കൽ രസായന സസ്യങ്ങൾ"
                : "Classical Rasayana herbs, Triphala botanicals & vitalizers"}
            </p>
            <div
              className={`mt-4 pt-3 border-t text-xs font-bold flex items-center justify-between ${
                selectedCategory === "Ayurvedic plant"
                  ? "border-white/20 text-[#55B96A]"
                  : "border-[#0B5D46]/10 text-[#0B5D46]"
              }`}
            >
              <span>{isMl ? "ഫിൽട്ടർ ചെയ്യാൻ ടച്ച് ചെയ്യുക" : "Touch to Filter"}</span>
              <span>{selectedCategory === "Ayurvedic plant" ? "Active ✓" : "View 25 →"}</span>
            </div>
          </button>

          {/* 2. Medicinal Plants Card */}
          <button
            type="button"
            onClick={() =>
              setSelectedCategory(
                selectedCategory === "Medicinal plant" ? "all" : "Medicinal plant"
              )
            }
            className={`text-left rounded-2xl sm:rounded-3xl p-5 sm:p-6 border-2 transition-all duration-200 relative overflow-hidden group touch-manipulation active:scale-[0.98] ${
              selectedCategory === "Medicinal plant"
                ? "bg-gradient-to-br from-[#087F8C] to-[#055159] text-white border-[#087F8C] shadow-md ring-2 ring-[#087F8C]/50"
                : "bg-white text-[#073B30] border-[#0B5D46]/15 hover:border-[#087F8C] shadow-sm hover:shadow"
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-[#087F8C]/20 shadow-sm shrink-0">
                  <Image
                    src="/assets/kiosk/categories/medicinal-plants.jpg"
                    alt="Medicinal Flora"
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    selectedCategory === "Medicinal plant"
                      ? "bg-white/15 text-white"
                      : "bg-[#E6F7F9] text-[#087F8C]"
                  }`}
                >
                  <BotanicalGlyph category="Medicinal plant" size="sm" />
                </div>
              </div>
              <span
                className={`text-2xl font-black font-mono px-3 py-1 rounded-xl ${
                  selectedCategory === "Medicinal plant"
                    ? "bg-white/20 text-white"
                    : "bg-[#087F8C]/10 text-[#087F8C]"
                }`}
              >
                {categoryCounts.medicinal}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold leading-tight">
              {isMl ? "ഔഷധ സസ്യങ്ങൾ" : "Medicinal Flora"}
            </h3>
            <p
              className={`text-xs sm:text-sm mt-1 leading-relaxed ${
                selectedCategory === "Medicinal plant"
                  ? "text-white/80"
                  : "text-[#244B3F]/75"
              }`}
            >
              {isMl
                ? "കറ്റാർവാഴ, കുടങ്ങൽ, പനിക്കൂർക്ക ഉൾപ്പെടെ 25 തെറാപ്യൂട്ടിക് സസ്യങ്ങൾ"
                : "Therapeutic herbs, WHO monographs & bio-active flora"}
            </p>
            <div
              className={`mt-4 pt-3 border-t text-xs font-bold flex items-center justify-between ${
                selectedCategory === "Medicinal plant"
                  ? "border-white/20 text-teal-200"
                  : "border-[#0B5D46]/10 text-[#087F8C]"
              }`}
            >
              <span>{isMl ? "ഫിൽട്ടർ ചെയ്യാൻ ടച്ച് ചെയ്യുക" : "Touch to Filter"}</span>
              <span>{selectedCategory === "Medicinal plant" ? "Active ✓" : "View 25 →"}</span>
            </div>
          </button>

          {/* 3. Culinary Spices Card */}
          <button
            type="button"
            onClick={() =>
              setSelectedCategory(
                selectedCategory === "Culinary spice / herb"
                  ? "all"
                  : "Culinary spice / herb"
              )
            }
            className={`text-left rounded-2xl sm:rounded-3xl p-5 sm:p-6 border-2 transition-all duration-200 relative overflow-hidden group touch-manipulation active:scale-[0.98] ${
              selectedCategory === "Culinary spice / herb"
                ? "bg-gradient-to-br from-[#C26D00] to-[#7E4300] text-white border-[#C26D00] shadow-md ring-2 ring-[#F59E0B]/50"
                : "bg-white text-[#073B30] border-[#0B5D46]/15 hover:border-[#C26D00] shadow-sm hover:shadow"
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-[#C26D00]/20 shadow-sm shrink-0">
                  <Image
                    src="/assets/kiosk/categories/spices.jpg"
                    alt="Kerala Spices"
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    selectedCategory === "Culinary spice / herb"
                      ? "bg-white/15 text-white"
                      : "bg-[#FFF6E5] text-[#C26D00]"
                  }`}
                >
                  <BotanicalGlyph category="Culinary spice / herb" size="sm" />
                </div>
              </div>
              <span
                className={`text-2xl font-black font-mono px-3 py-1 rounded-xl ${
                  selectedCategory === "Culinary spice / herb"
                    ? "bg-white/20 text-white"
                    : "bg-[#C26D00]/10 text-[#C26D00]"
                }`}
              >
                {categoryCounts.spices}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold leading-tight">
              {isMl ? "സുഗന്ധവ്യഞ്ജനങ്ങളും ഔഷധികളും" : "Culinary Spices & Herbs"}
            </h3>
            <p
              className={`text-xs sm:text-sm mt-1 leading-relaxed ${
                selectedCategory === "Culinary spice / herb"
                  ? "text-white/80"
                  : "text-[#244B3F]/75"
              }`}
            >
              {isMl
                ? "കുരുമുളക്, ഏലം, മഞ്ഞൾ, ഇഞ്ചി ഉൾപ്പെടെ 50 കേരളീയ/ആഗോള സുഗന്ധവ്യഞ്ജനങ്ങൾ"
                : "Kerala Malabar Black Pepper, Cardamom, Turmeric, Ginger & spices"}
            </p>
            <div
              className={`mt-4 pt-3 border-t text-xs font-bold flex items-center justify-between ${
                selectedCategory === "Culinary spice / herb"
                  ? "border-white/20 text-amber-200"
                  : "border-[#0B5D46]/10 text-[#C26D00]"
              }`}
            >
              <span>{isMl ? "ഫിൽട്ടർ ചെയ്യാൻ ടച്ച് ചെയ്യുക" : "Touch to Filter"}</span>
              <span>
                {selectedCategory === "Culinary spice / herb"
                  ? "Active ✓"
                  : "View 50 →"}
              </span>
            </div>
          </button>
        </div>
      </section>

      {/* ─── Search & Category Filter Controls ─────────────────────────────────── */}
      <section className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border-2 border-[#0B5D46]/15 shadow-sm space-y-4">
        {/* Search input with touchscreen clear button */}
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-4 sm:pl-5 flex items-center pointer-events-none text-[#0B5D46]">
            <Search className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              isMl
                ? "ഇംഗ്ലീഷ്, മലയാളം അല്ലെങ്കിൽ ശാസ്ത്രനാമം തിരയുക…"
                : "Search by English, Malayalam or scientific name…"
            }
            className="w-full pl-12 sm:pl-14 pr-12 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl border-2 border-[#0B5D46]/20 focus:border-[#55B96A] focus:outline-none focus:ring-4 focus:ring-[#55B96A]/20 bg-[#F0F7F1]/30 text-base sm:text-lg text-[#073B30] placeholder-[#244B3F]/50 transition-all font-medium touch-manipulation"
          />

          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#244B3F]/70 hover:text-[#073B30] active:scale-90 transition-transform touch-manipulation"
              aria-label="Clear search input"
            >
              <div className="w-8 h-8 rounded-full bg-[#E5EBE5] flex items-center justify-center">
                <X className="w-4 h-4" />
              </div>
            </button>
          )}
        </div>

        {/* Category Pills & Total Counter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          {/* Pills */}
          <div
            className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none"
            role="tablist"
            aria-label="Plant category filter"
          >
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap touch-manipulation ${
                selectedCategory === "all"
                  ? "bg-[#073B30] text-white shadow-sm"
                  : "bg-[#F0F7F1] text-[#073B30] hover:bg-[#E2EDE3]"
              }`}
            >
              {isMl ? "എല്ലാം" : "All Species"} (100)
            </button>

            <button
              type="button"
              onClick={() => setSelectedCategory("Ayurvedic plant")}
              className={`px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap touch-manipulation ${
                selectedCategory === "Ayurvedic plant"
                  ? "bg-[#0B5D46] text-white shadow-sm"
                  : "bg-[#F0F7F1] text-[#0B5D46] hover:bg-[#E2EDE3]"
              }`}
            >
              {isMl ? "ആയുർവേദം" : "Ayurvedic Plants"} (25)
            </button>

            <button
              type="button"
              onClick={() => setSelectedCategory("Medicinal plant")}
              className={`px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap touch-manipulation ${
                selectedCategory === "Medicinal plant"
                  ? "bg-[#087F8C] text-white shadow-sm"
                  : "bg-[#F0F7F1] text-[#087F8C] hover:bg-[#E2EDE3]"
              }`}
            >
              {isMl ? "ഔഷധ സസ്യങ്ങൾ" : "Medicinal Plants"} (25)
            </button>

            <button
              type="button"
              onClick={() => setSelectedCategory("Culinary spice / herb")}
              className={`px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap touch-manipulation ${
                selectedCategory === "Culinary spice / herb"
                  ? "bg-[#C26D00] text-white shadow-sm"
                  : "bg-[#F0F7F1] text-[#C26D00] hover:bg-[#E2EDE3]"
              }`}
            >
              {isMl ? "സുഗന്ധവ്യഞ്ജനങ്ങൾ" : "Spices & Herbs"} (50)
            </button>
          </div>

          {/* Results summary counter */}
          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 text-xs sm:text-sm font-bold text-[#244B3F]">
            <span className="w-2 h-2 rounded-full bg-[#55B96A]" />
            <span>
              {isMl
                ? `${filteredPlants.length} സസ്യങ്ങൾ ലഭ്യമാണ്`
                : `Showing ${filteredPlants.length} of 100 species`}
            </span>
            {(searchQuery || selectedCategory !== "all" || selectedLetter !== "all") && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="ml-2 inline-flex items-center gap-1 text-[11px] font-bold text-[#0B5D46] hover:underline bg-[#F0F7F1] px-2.5 py-1 rounded-md"
              >
                <RotateCcw className="w-3 h-3" />
                {isMl ? "റീസെറ്റ്" : "Reset"}
              </button>
            )}
          </div>
        </div>

        {/* Alphabetical Browsing Row (A-Z) */}
        <div className="pt-3 border-t border-[#0B5D46]/10 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[11px] font-bold text-[#244B3F]/60 uppercase tracking-wider shrink-0 mr-1">
            {isMl ? "അക്ഷരസൂചിക:" : "A-Z Index:"}
          </span>
          <button
            type="button"
            onClick={() => setSelectedLetter("all")}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all shrink-0 touch-manipulation ${
              selectedLetter === "all"
                ? "bg-[#073B30] text-white shadow-2xs"
                : "bg-[#F0F7F1] text-[#073B30] hover:bg-[#E2EDE3]"
            }`}
          >
            {isMl ? "എല്ലാം" : "All"}
          </button>
          {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => {
            const hasPlants = "ABCDEFGHIKLMNOPRSTVWY".includes(letter);
            return (
              <button
                key={letter}
                type="button"
                disabled={!hasPlants}
                onClick={() =>
                  setSelectedLetter(selectedLetter === letter ? "all" : letter)
                }
                className={`w-7 h-7 rounded-lg text-xs font-mono font-bold transition-all shrink-0 touch-manipulation flex items-center justify-center ${
                  selectedLetter === letter
                    ? "bg-[#0B5D46] text-white shadow-2xs scale-105"
                    : hasPlants
                    ? "bg-[#F0F7F1] text-[#073B30] hover:bg-[#E2EDE3]"
                    : "opacity-25 cursor-not-allowed bg-transparent text-gray-400"
                }`}
                aria-label={`Filter species starting with ${letter}`}
              >
                {letter}
              </button>
            );
          })}
        </div>
      </section>

      {/* ─── Compact Educational Disclaimer Banner ─────────────────────────────── */}
      <VedaVerseDisclaimer compact isMl={isMl} />

      {/* ─── Plant Grid ────────────────────────────────────────────────────────── */}
      {filteredPlants.length === 0 ? (
        <div className="w-full bg-white rounded-3xl p-8 sm:p-12 text-center border-2 border-dashed border-[#0B5D46]/20 space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#F0F7F1] text-[#0B5D46] flex items-center justify-center mx-auto">
            <BookOpen className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-[#073B30]">
            {isMl
              ? "സസ്യങ്ങളൊന്നും കണ്ടെത്താനായില്ല"
              : "No Botanical Species Found"}
          </h3>
          <p className="text-sm text-[#244B3F]/80 max-w-md mx-auto">
            {isMl
              ? `"${searchQuery}" എന്നതിന് അനുയോജ്യമായ ഫലങ്ങൾ ലഭ്യമല്ല. മറ്റൊരു പേരോ ശാസ്ത്രനാമമോ തിരയുക.`
              : `No plant or spice matched your search for "${searchQuery}". Try searching for common terms like "Pepper", "Ginger", "Ashwagandha", or botanical families like "Zingiberaceae".`}
          </p>
          <button
            type="button"
            onClick={handleClearFilters}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0B5D46] text-white font-bold text-sm shadow-sm hover:bg-[#073B30] active:scale-95 transition-all touch-manipulation"
          >
            <RotateCcw className="w-4 h-4" />
            {isMl ? "ഫിൽട്ടറുകൾ നീക്കം ചെയ്യുക" : "Reset Search & Filters"}
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {displayedPlants.map((plant) => (
              <PlantCard key={plant.id} plant={plant} isMl={isMl} />
            ))}
          </div>

          {/* ─── Touch Pagination & Batching Controls ───────────────────────────── */}
          {filteredPlants.length > ITEMS_PER_PAGE && (
            <div className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-[#0B5D46]/15 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs sm:text-sm font-semibold text-[#244B3F]">
                {isMl
                  ? `പേജ് ${currentPage} / ${totalPages} (ആകെ ${filteredPlants.length} സസ്യങ്ങൾ)`
                  : `Page ${currentPage} of ${totalPages} (${filteredPlants.length} species total)`}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={currentPage <= 1 || showAllAtOnce}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#0B5D46]/20 bg-[#F0F7F1] text-[#073B30] text-xs sm:text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#E2EDE3] active:scale-95 transition-all touch-manipulation"
                >
                  <ChevronLeft className="w-4 h-4" />
                  {isMl ? "മുമ്പത്തെ പേജ്" : "Previous"}
                </button>

                <button
                  type="button"
                  disabled={currentPage >= totalPages || showAllAtOnce}
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#0B5D46]/20 bg-[#F0F7F1] text-[#073B30] text-xs sm:text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#E2EDE3] active:scale-95 transition-all touch-manipulation"
                >
                  {isMl ? "അടുത്ത പേജ്" : "Next"}
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setShowAllAtOnce(!showAllAtOnce)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-all touch-manipulation ${
                    showAllAtOnce
                      ? "bg-[#0B5D46] text-white border-[#0B5D46]"
                      : "bg-white text-[#0B5D46] border-[#0B5D46]/25 hover:bg-[#F0F7F1]"
                  }`}
                >
                  {showAllAtOnce
                    ? (isMl ? "പേജുകളാക്കുക" : "Paginate")
                    : (isMl ? `എല്ലാം കാണുക (${filteredPlants.length})` : `Show All (${filteredPlants.length})`)}
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
