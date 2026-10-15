"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, X, Cpu, FlaskConical, CheckCircle2 } from "lucide-react";
import KioskSubHeader from "@/components/kiosk/KioskSubHeader";
import KioskFooter from "@/components/kiosk/KioskFooter";
import ArogyamithranMascot from "@/components/kiosk/ArogyamithranMascot";
import { KioskLanguage } from "@/components/kiosk/types";
import { KIOSK_CATEGORY_ILLUSTRATIONS } from "@/lib/kioskAssets";
import innovationsData from "@/data/bioAiInnovations.json";

interface InnovationItem {
  id: string;
  title: string;
  titleMl: string;
  category: string;
  categoryMl: string;
  status: string;
  statusMl: string;
  summary: string;
  summaryMl: string;
  leadInstitution: string;
  collaborators: string[];
  keyCapabilities: string[];
  metrics: string;
  sourceReference: string;
  link: string;
}

export default function KioskInnovationsPage() {
  const [language, setLanguage] = useState<KioskLanguage>("en");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeItem, setActiveItem] = useState<InnovationItem | null>(null);

  const isMl = language === "ml";
  const items: InnovationItem[] = innovationsData.innovations;

  // Unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(items.map((it) => it.category)));
    return ["all", ...cats];
  }, [items]);

  // Filtered items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.titleMl.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.leadInstitution.toLowerCase().includes(q) ||
        item.keyCapabilities.some((c) => c.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [items, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#073B30] flex flex-col font-sans selection:bg-[#55B96A]/20">
      {/* ─── KIOSK SUB HEADER ────────────────────────────────────────── */}
      <KioskSubHeader
        language={language}
        onLanguageChange={setLanguage}
        showLanguageToggle={true}
        currentStepBadge="Bio-AI Innovations"
        currentStepBadgeMl="ബയോ-എഐ നവീകരണങ്ങൾ"
        backHref="/kiosk"
      />

      {/* ─── ILLUSTRATED SCIENTIFIC HERO ─────────────────────────────── */}
      <section className="relative w-full bg-gradient-to-b from-[#F0F7F1] via-[#FAFAF7] to-white border-b border-[#0B5D46]/10 pt-6 sm:pt-10 pb-6 sm:pb-8 px-4 sm:px-8 overflow-hidden">
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
          <div className="max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#0B5D46]/20 text-[#0B5D46] text-xs font-bold shadow-2xs mb-3">
              <Cpu className="w-3.5 h-3.5 text-[#55B96A]" />
              <span>
                {isMl
                  ? "ബയോ-എഐ ഗവേഷണവും സാങ്കേതിക മുന്നേറ്റങ്ങളും"
                  : "Bio-AI Research & Technology Showcase"}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#073B30] tracking-tight leading-tight mb-3">
              {isMl ? (
                <>
                  ജീവശാസ്ത്രവും എഐയും{" "}
                  <span className="text-[#0B5D46]">കൈകോർക്കുന്ന നവീകരണങ്ങൾ</span>
                </>
              ) : (
                <>
                  Pioneering Breakthroughs in{" "}
                  <span className="text-[#0B5D46]">Biology & Artificial Intelligence</span>
                </>
              )}
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-[#244B3F]/85 leading-relaxed font-medium">
              {isMl
                ? "കേരള സ്റ്റാർട്ടപ്പ് മിഷൻ, ഡിജിറ്റൽ ഹബ്ബ്, കൊച്ചിയിലെ അത്യാധുനിക ബയോ-കമ്പ്യൂട്ടിംഗ് ലബോറട്ടറിയിൽ വികസിപ്പിച്ച ആധികാരിക ഗവേഷണങ്ങളും സാങ്കേതിക പരീക്ഷണങ്ങളും ഇവിടെ പരിശോധിക്കാം."
                : "Explore verified deep-tech research, high-throughput genomic mapping, spectral adulteration detection, and Ayurvedic pharmacoinformatics from Kerala Startup Mission Digital Hub, Kochi."}
            </p>
          </div>

          {/* Arogyamithran Mascot in Reading / Analytics posture */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-[#0B5D46]/20 shadow-md bg-white shrink-0 hidden sm:block">
              <Image
                src={KIOSK_CATEGORY_ILLUSTRATIONS.innovations.path}
                alt="Bio-AI Innovations"
                fill
                className="object-cover object-top"
              />
            </div>
            <ArogyamithranMascot
              expression="reading_tablet"
              size="sm"
              language={language}
              showDialogue={false}
              priority
            />
          </div>
        </div>
      </section>

      {/* ─── SEARCH & FILTER CONTROLS ─────────────────────────────────── */}
      <div className="sticky top-[73px] z-30 bg-[#FAFAF7]/95 backdrop-blur-md border-b border-[#0B5D46]/10 px-4 sm:px-8 py-3.5">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
          {/* Search Box */}
          <div className="relative w-full md:w-80 lg:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0B5D46]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isMl
                  ? "സാങ്കേതികവിദ്യ തിരയുക (ഉദാ: Docking, NIR, Genome)..."
                  : "Search innovations (e.g. Docking, NIR, Genome)..."
              }
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-[#0B5D46]/25 text-xs sm:text-sm text-[#073B30] placeholder-[#244B3F]/50 focus:outline-none focus:ring-2 focus:ring-[#55B96A] shadow-2xs font-medium"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              const label = cat === "all" ? (isMl ? "എല്ലാം" : "All Domains") : cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`min-h-[38px] px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all active:scale-95 touch-manipulation ${
                    isActive
                      ? "bg-[#073B30] text-white shadow-xs"
                      : "bg-white text-[#244B3F] border border-[#0B5D46]/20 hover:border-[#55B96A]"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─── INNOVATIONS CARDS GRID ───────────────────────────────────── */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-8 py-6 sm:py-10 flex-1 w-full">
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border-2 border-dashed border-[#0B5D46]/20 p-8 max-w-lg mx-auto">
            <FlaskConical className="w-12 h-12 text-[#0B5D46]/40 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-[#073B30] mb-1">
              {isMl ? "ഫലങ്ങളൊന്നും കണ്ടെത്തിയില്ല" : "No Innovation Records Found"}
            </h3>
            <p className="text-xs text-[#244B3F]/70 mb-4">
              {isMl
                ? "തിരഞ്ഞെടുത്ത വാക്കിന് അനുയോജ്യമായ രേഖകൾ ഇല്ല. ഫിൽട്ടറുകൾ മാറ്റി വീണ്ടും ശ്രമിക്കുക."
                : "Try adjusting your search terms or selecting another category filter."}
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="px-4 py-2 rounded-full bg-[#0B5D46] text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                onClick={() => setActiveItem(item)}
                className="group relative bg-white rounded-3xl p-6 border-2 border-[#0B5D46]/15 hover:border-[#55B96A] shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between active:scale-[0.985] touch-manipulation min-h-[300px]"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-[#F0F7F1] text-[#073B30] border border-[#0B5D46]/15">
                      {item.id}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#0B5D46] text-white">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#55B96A] animate-pulse" />
                      {isMl ? item.statusMl : item.status}
                    </span>
                  </div>

                  {/* Category Pill */}
                  <div className="mb-2">
                    <span className="text-[11px] font-bold text-[#55B96A] uppercase tracking-wide">
                      {isMl ? item.categoryMl : item.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-[#073B30] group-hover:text-[#0B5D46] transition-colors leading-snug mb-2">
                    {isMl ? item.titleMl : item.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs sm:text-[13px] text-[#244B3F]/80 leading-relaxed line-clamp-3 mb-4">
                    {isMl ? item.summaryMl : item.summary}
                  </p>
                </div>

                {/* Bottom specs and CTA */}
                <div className="pt-3 border-t border-[#0B5D46]/10 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-[#0B5D46] truncate max-w-[200px]">
                    {item.leadInstitution}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#073B30] group-hover:text-[#0B5D46]">
                    <span>{isMl ? "വിശദാംശങ്ങൾ" : "Details"}</span>
                    <span>→</span>
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* ─── MODAL DETAIL VIEW ────────────────────────────────────────── */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveItem(null)}
              className="fixed inset-0 bg-[#073B30]/75 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              className="relative w-full max-w-2xl bg-[#FAFAF7] rounded-3xl shadow-2xl border-2 border-[#0B5D46]/20 p-6 sm:p-8 z-10 overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-[#F0F7F1] text-[#073B30] border border-[#0B5D46]/15 mr-2">
                    {activeItem.id}
                  </span>
                  <span className="text-xs font-bold text-[#0B5D46] uppercase">
                    {isMl ? activeItem.categoryMl : activeItem.category}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveItem(null)}
                  className="w-10 h-10 rounded-full bg-white border border-[#0B5D46]/20 text-[#073B30] hover:bg-[#073B30] hover:text-white flex items-center justify-center transition-colors active:scale-95 touch-manipulation"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Title & Status */}
              <h2 className="text-xl sm:text-2xl font-black text-[#073B30] mb-2 leading-tight">
                {isMl ? activeItem.titleMl : activeItem.title}
              </h2>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B5D46] text-white text-xs font-bold mb-4">
                <span className="w-2 h-2 rounded-full bg-[#55B96A] animate-pulse" />
                <span>{isMl ? activeItem.statusMl : activeItem.status}</span>
              </div>

              {/* Summary */}
              <div className="p-4 rounded-2xl bg-white border border-[#0B5D46]/15 mb-5">
                <p className="text-xs sm:text-sm text-[#132E27] leading-relaxed">
                  {isMl ? activeItem.summaryMl : activeItem.summary}
                </p>
              </div>

              {/* Key Capabilities */}
              <div className="mb-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#073B30] mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#55B96A]" />
                  <span>Key Technical Capabilities:</span>
                </h4>
                <ul className="space-y-2">
                  {activeItem.keyCapabilities.map((cap, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[#244B3F]">
                      <CheckCircle2 className="w-4 h-4 text-[#0B5D46] shrink-0 mt-0.5" />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Metrics */}
              <div className="p-3.5 rounded-xl bg-[#F0F7F1] border border-[#0B5D46]/15 mb-5 text-xs text-[#073B30]">
                <span className="font-bold">Verified Benchmark / Metrics: </span>
                <span>{activeItem.metrics}</span>
              </div>

              {/* Institutional Lead & Source */}
              <div className="text-[11px] text-[#244B3F]/80 space-y-1 mb-6 border-t border-[#0B5D46]/10 pt-3">
                <p>
                  <span className="font-bold text-[#073B30]">Lead:</span> {activeItem.leadInstitution}
                </p>
                <p>
                  <span className="font-bold text-[#073B30]">Collaborators:</span> {activeItem.collaborators.join(", ")}
                </p>
                <p>
                  <span className="font-bold text-[#073B30]">Citation Source:</span> {activeItem.sourceReference}
                </p>
              </div>

              {/* Action */}
              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveItem(null)}
                  className="px-6 py-3 rounded-full bg-[#073B30] text-white text-xs sm:text-sm font-bold shadow-md hover:bg-[#0B5D46] active:scale-95 transition-all touch-manipulation"
                >
                  Close Monograph
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── KIOSK FOOTER ────────────────────────────────────────────── */}
      <KioskFooter language={language} />
    </div>
  );
}
