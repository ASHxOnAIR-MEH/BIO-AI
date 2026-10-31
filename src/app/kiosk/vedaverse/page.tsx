"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { KioskLanguage, VedaVerseCategory } from "@/components/kiosk/types";
import { getAllPlants, getCategoriesWithCounts } from "@/lib/vedaverseEngine";
import PlantCard from "@/components/kiosk/vedaverse/PlantCard";
import KioskSubHeader from "@/components/kiosk/KioskSubHeader";
import KioskFooter from "@/components/kiosk/KioskFooter";
import { Gamepad2, ArrowRight } from "lucide-react";

export default function VedaVersePage() {
  const [language, setLanguage] = useState<KioskLanguage>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = sessionStorage.getItem("kiosk_language");
        if (stored === "ml" || stored === "en") return stored;
      } catch {
        // ignore
      }
    }
    return "en";
  });

  const [selectedCategory, setSelectedCategory] = useState<
    VedaVerseCategory | "all"
  >("all");

  const handleLanguageChange = (newLang: KioskLanguage) => {
    setLanguage(newLang);
    try {
      sessionStorage.setItem("kiosk_language", newLang);
    } catch {
      // ignore
    }
  };

  const isMl = language === "ml";
  const allPlants = getAllPlants();

  // Category statistics from dataset
  const categoryMeta = getCategoriesWithCounts();
  const ayurvedicCount =
    categoryMeta.find((c) => c.id === "Ayurvedic plant")?.count ?? 25;
  const medicinalCount =
    categoryMeta.find((c) => c.id === "Medicinal plant")?.count ?? 25;
  const spicesCount =
    categoryMeta.find((c) => c.id === "Culinary spice / herb")?.count ?? 50;

  // Filter plants based on tab selection
  const filteredPlants =
    selectedCategory === "all"
      ? allPlants
      : allPlants.filter((p) => p.category === selectedCategory);

  const TABS = [
    {
      id: "all" as const,
      labelEn: "All Products",
      labelMl: "എല്ലാ ഉൽപ്പന്നങ്ങളും",
      count: allPlants.length,
    },
    {
      id: "Ayurvedic plant" as const,
      labelEn: "Ayurvedic Medicines",
      labelMl: "ആയുർവേദ ഔഷധങ്ങൾ",
      count: ayurvedicCount,
    },
    {
      id: "Medicinal plant" as const,
      labelEn: "Medicinal Flora",
      labelMl: "ഔഷധ സസ്യങ്ങൾ",
      count: medicinalCount,
    },
    {
      id: "Culinary spice / herb" as const,
      labelEn: "Herbs & Spices",
      labelMl: "സുഗന്ധവ്യഞ്ജനങ്ങൾ",
      count: spicesCount,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F7F6] text-[#073B30] flex flex-col font-sans selection:bg-[#55B96A]/20">
      {/* ─── KIOSK SUB HEADER ──────────────────────────────────────────────────── */}
      <KioskSubHeader
        language={language}
        onLanguageChange={handleLanguageChange}
        showLanguageToggle={true}
        backHref="/kiosk"
        backLabel="Back to Kiosk"
        backLabelMl="കിയോസ്ക് ഹോം"
        currentStepBadge="VedaVerse Botanical Catalog"
        currentStepBadgeMl="വേദവേഴ്സ് സസ്യ കാറ്റലോഗ്"
      />

      {/* ─── FLIPKART-STYLE STORE TOP BAR ──────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-200 sticky top-14 sm:top-16 z-30 shadow-xs">
        <div className="max-w-[1440px] mx-auto px-3 sm:px-6 py-3 sm:py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#55B96A] animate-pulse" />
                <h1 className="text-xl sm:text-2xl font-black text-[#073B30] tracking-tight">
                  {isMl ? "വേദവേഴ്സ് കാറ്റലോഗ്" : "VedaVerse Botanical Catalog"}
                </h1>
                <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full">
                  {filteredPlants.length} {isMl ? "ഇനങ്ങൾ" : "Items"}
                </span>
              </div>
              <p className="text-xs text-gray-600 mt-0.5">
                {isMl
                  ? "100 ആയുർവേദ ഔഷധങ്ങളും, ഔഷധ സസ്യങ്ങളും, കേരളീയ സുഗന്ധവ്യഞ്ജനങ്ങളും"
                  : "100 Ayurvedic Medicines, Medicinal Flora & Kerala Spice Heritage"}
              </p>
            </div>

            {/* Flipkart-Style Category Tabs */}
            <div
              className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none"
              role="tablist"
              aria-label="Product categories"
            >
              {TABS.map((tab) => {
                const isActive = selectedCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSelectedCategory(tab.id)}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap touch-manipulation flex items-center gap-1.5 ${
                      isActive
                        ? "bg-[#0B5D46] text-white shadow-sm ring-2 ring-[#0B5D46]/20"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 active:scale-95"
                    }`}
                  >
                    <span>{isMl ? tab.labelMl : tab.labelEn}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ─── FLIPKART PRODUCT LISTING GRID ─────────────────────────────────────── */}
      <main className="max-w-[1440px] mx-auto px-3 sm:px-6 py-4 sm:py-6 flex-1 w-full">
        {/* ─── FEATURED SPICE QUEST INTERACTIVE GAME BANNER ───────────────────── */}
        <div className="mb-6">
          <Link
            href="/kiosk/vedaverse/spice-quest"
            className="w-full bg-gradient-to-r from-[#072820] via-[#0A382C] to-[#041D16] text-[#FAF7EE] rounded-3xl p-5 sm:p-7 border-2 border-[#D4AF37]/60 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col md:flex-row items-center justify-between gap-5 group active:scale-[0.99] touch-manipulation focus:outline-none focus:ring-4 focus:ring-[#D4AF37]/30 relative overflow-hidden"
          >
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#10B981]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center gap-4 sm:gap-6 relative z-10">
              {/* VEDA Avatar */}
              <div className="relative w-16 h-20 sm:w-20 sm:h-24 rounded-2xl bg-gradient-to-b from-[#F0F7F1]/20 to-white/5 border border-[#D4AF37]/40 p-1 flex items-end justify-center shrink-0 shadow-md">
                <Image
                  src="/images/veda/veda-welcome.png"
                  alt="Veda Guide"
                  width={80}
                  height={96}
                  className="object-contain max-h-full drop-shadow-md select-none group-hover:scale-105 transition-transform"
                />
              </div>

              {/* Banner Text */}
              <div className="text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-[10px] sm:text-xs font-black uppercase tracking-wider mb-1.5 border border-[#D4AF37]/30">
                  <Gamepad2 className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>{isMl ? "ഇന്ററാക്ടീവ് പസിൽ ഗെയിം" : "Interactive Puzzle Game"}</span>
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-black text-white group-hover:text-[#F4DE97] transition-colors leading-tight">
                  SPICE QUEST – {isMl ? "ആയുർവേദത്തിലെ ആറ് രഹസ്യങ്ങൾ" : "The Six Secrets of Ayurveda"}
                </h2>
                <p className="text-xs sm:text-sm text-white/80 line-clamp-2 mt-1 max-w-2xl leading-relaxed">
                  {isMl
                    ? "6 ലെവലുകളിലൂടെ കേരളീയ സുഗന്ധവ്യഞ്ജനങ്ങളെ തിരിച്ചറിയുക, സസ്യഭാഗങ്ങൾ പൊരുത്തപ്പെടുത്തുക, മെമ്മറി ഗ്രിഡ് ജയിക്കുക, സംസ്കൃത നാമങ്ങളും ജിഗ്‌സോ പസിലും വെളിപ്പെടുത്തുക!"
                    : "Solve 6 progressive challenges: identify mysterious spices, match botanical organs, conquer the 3x4 memory grid, match classical Sanskrit codices, assemble the jigsaw puzzle, and face the Grand Master!"}
                </p>
              </div>
            </div>

            {/* Action Button */}
            <div className="shrink-0 flex items-center gap-2.5 text-xs sm:text-sm font-black text-[#072820] bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] px-6 py-3.5 rounded-full shadow-lg group-hover:brightness-110 transition-all relative z-10">
              <span>{isMl ? "കളിക്കൂ" : "PLAY SPICE QUEST"}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {filteredPlants.map((plant) => (
            <PlantCard key={plant.id} plant={plant} isMl={isMl} />
          ))}
        </div>

        {/* Compact Educational Notice */}
        <div className="mt-8 p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-center justify-center text-center">
          <p>
            {isMl
              ? "വിദ്യാഭ്യാസ ആവശ്യങ്ങൾക്ക് മാത്രം. പരമ്പരാഗത ഉപയോഗങ്ങളും ഗവേഷണ കണ്ടെത്തലുകളും വിദഗ്ദ്ധ വൈദ്യോപദേശത്തിന് പകരമാവില്ല."
              : "Educational information only. Traditional uses and botanical records do not replace professional medical advice."}
          </p>
        </div>
      </main>

      {/* ─── KIOSK FOOTER ──────────────────────────────────────────────────────── */}
      <KioskFooter language={language} />
    </div>
  );
}
