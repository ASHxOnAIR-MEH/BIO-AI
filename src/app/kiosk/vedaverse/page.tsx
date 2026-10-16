"use client";

import React, { useState } from "react";
import { KioskLanguage, VedaVerseCategory } from "@/components/kiosk/types";
import { getAllPlants, getCategoriesWithCounts } from "@/lib/vedaverseEngine";
import PlantCard from "@/components/kiosk/vedaverse/PlantCard";
import KioskSubHeader from "@/components/kiosk/KioskSubHeader";
import KioskFooter from "@/components/kiosk/KioskFooter";
import { Sparkles, Layers } from "lucide-react";

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
