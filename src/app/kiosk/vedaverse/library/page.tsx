"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { KioskLanguage, VedaVerseCategory } from "@/components/kiosk/types";
import { getAllPlants } from "@/lib/vedaverseEngine";
import VedaVerseCatalog from "@/components/kiosk/vedaverse/VedaVerseCatalog";
import KioskSubHeader from "@/components/kiosk/KioskSubHeader";
import KioskFooter from "@/components/kiosk/KioskFooter";

function LibraryContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const rawCategory = searchParams.get("category") ?? "";
  const validCategories: VedaVerseCategory[] = [
    "Ayurvedic plant",
    "Medicinal plant",
    "Culinary spice / herb",
  ];
  const initialCategory: VedaVerseCategory | "all" = validCategories.includes(
    rawCategory as VedaVerseCategory
  )
    ? (rawCategory as VedaVerseCategory)
    : "all";

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

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#073B30] flex flex-col font-sans selection:bg-[#55B96A]/20">
      <KioskSubHeader
        language={language}
        onLanguageChange={handleLanguageChange}
        showLanguageToggle={true}
        currentStepBadge="VedaVerse Library"
        currentStepBadgeMl="വേദവേഴ്സ് ലൈബ്രറി"
        backHref="/kiosk/vedaverse"
        backLabel="VedaVerse Home"
        backLabelMl="VedaVerse ഹോം"
      />

      <main className="max-w-[1440px] mx-auto px-4 sm:px-8 py-8 sm:py-12 flex-1 w-full">
        {/* Page title */}
        <div className="mb-8">
          <p className="text-xs font-bold text-[#0B5D46] uppercase tracking-widest mb-1">
            {isMl ? "100 സസ്യ ശേഖരം" : "100 Flora Collection"}
          </p>
          <h1 className="text-3xl sm:text-4xl font-black text-[#073B30]">
            {isMl ? "സസ്യ & സുഗന്ധ ലൈബ്രറി" : "Plant & Spice Library"}
          </h1>
        </div>

        <VedaVerseCatalog
          initialPlants={allPlants}
          isMl={isMl}
          initialQuery={initialQuery}
          initialCategory={initialCategory}
        />
      </main>

      <KioskFooter language={language} />
    </div>
  );
}

export default function VedaVerseLibraryPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAFAF7] flex items-center justify-center">
        <div className="text-[#0B5D46] font-bold text-lg animate-pulse">Loading Library…</div>
      </div>
    }>
      <LibraryContent />
    </Suspense>
  );
}
