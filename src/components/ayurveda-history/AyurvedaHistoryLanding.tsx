"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Globe, Compass, BookOpen, TreePine, Award, MapPin } from "lucide-react";
import CinematicHistoryIntro from "./CinematicHistoryIntro";
import HistoricalRoadmap from "./HistoricalRoadmap";
import HistoricalChapterModal from "./HistoricalChapterModal";
import EightBranchesWheel from "./EightBranchesWheel";
import IndiaHistoryMap from "./IndiaHistoryMap";
import AshtavaidyaHeritageSection from "./AshtavaidyaHeritageSection";
import DigitalTextExplorer from "./DigitalTextExplorer";
import VedavaniAIGuide from "./VedavaniAIGuide";
import AchievementPanel from "./AchievementPanel";
import { HistoricalDestination, HISTORICAL_DESTINATIONS } from "@/data/ayurvedaHistoryData";

interface AyurvedaHistoryLandingProps {
  isKioskMode?: boolean;
}

export default function AyurvedaHistoryLanding({
  isKioskMode = false,
}: AyurvedaHistoryLandingProps) {
  const [isMalayalam, setIsMalayalam] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<HistoricalDestination | null>(null);
  const [isEightBranchesModalOpen, setIsEightBranchesModalOpen] = useState(false);
  const [completedDestinationIds, setCompletedDestinationIds] = useState<string[]>([
    "vedic-foundations", // Seed initial progress
  ]);
  const [unlockedBadgeIds, setUnlockedBadgeIds] = useState<string[]>([
    "vedic-explorer",
  ]);

  // Inactivity timeout for public touchscreens (2 minutes)
  const lastInteractionRef = useRef<number>(Date.now());

  useEffect(() => {
    const handleUserActivity = () => {
      lastInteractionRef.current = Date.now();
    };

    window.addEventListener("pointerdown", handleUserActivity, { passive: true });
    window.addEventListener("keydown", handleUserActivity, { passive: true });
    window.addEventListener("scroll", handleUserActivity, { passive: true });

    const interval = setInterval(() => {
      // 120 seconds of total inactivity
      if (Date.now() - lastInteractionRef.current > 120000) {
        // Softly reset modals without reloading page
        setSelectedDestination(null);
        setIsEightBranchesModalOpen(false);
      }
    }, 10000);

    return () => {
      window.removeEventListener("pointerdown", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
      window.removeEventListener("scroll", handleUserActivity);
      clearInterval(interval);
    };
  }, []);

  const handleDestinationComplete = (destId: string) => {
    if (!completedDestinationIds.includes(destId)) {
      setCompletedDestinationIds((prev) => [...prev, destId]);
    }

    // Award badges based on completed destination
    if (destId === "classical-samhita" && !unlockedBadgeIds.includes("samhita-scholar")) {
      setUnlockedBadgeIds((prev) => [...prev, "samhita-scholar"]);
    } else if (destId === "vagbhata-ashtanga" && !unlockedBadgeIds.includes("vagbhata-explorer")) {
      setUnlockedBadgeIds((prev) => [...prev, "vagbhata-explorer"]);
    } else if (destId === "classical-expansion" && !unlockedBadgeIds.includes("manuscript-detective")) {
      setUnlockedBadgeIds((prev) => [...prev, "manuscript-detective"]);
    } else if (destId === "modern-ayurveda" && !unlockedBadgeIds.includes("ayurveda-history-master")) {
      setUnlockedBadgeIds((prev) => [...prev, "ayurveda-history-master"]);
    }
  };

  const handleUnlockKeralaHeritageBadge = () => {
    if (!unlockedBadgeIds.includes("kerala-heritage-explorer")) {
      setUnlockedBadgeIds((prev) => [...prev, "kerala-heritage-explorer", "ashtavaidya-apprentice"]);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FAF7EE] text-[#072820] flex flex-col selection:bg-[#D4AF37]/30 overflow-x-hidden font-sans">
      {/* ─── STICKY TOP NAVIGATION BAR ─── */}
      <nav className="sticky top-0 z-40 w-full bg-[#072820]/95 backdrop-blur-md border-b border-[#D4AF37]/30 text-[#FAF7EE] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: Back Link & Exhibition Branding */}
          <div className="flex items-center gap-3">
            <Link
              href={isKioskMode ? "/kiosk" : "/"}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all active:scale-95"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="hidden sm:inline">
                {isKioskMode ? "Kiosk Home" : "Main Website"}
              </span>
              <span className="sm:hidden">Back</span>
            </Link>

            <div className="h-4 w-px bg-white/20 hidden sm:block" />

            <div className="flex flex-col">
              <span className="font-serif font-bold text-xs sm:text-sm text-white tracking-wide truncate max-w-[180px] sm:max-w-none">
                AYURVEDA THROUGH THE AGES
              </span>
              <span className="text-[10px] text-[#D4AF37] font-mono leading-none hidden md:inline">
                Bio-AI Centre of Excellence
              </span>
            </div>
          </div>

          {/* Center: Quick Section Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-1 text-xs font-semibold">
            <button
              type="button"
              onClick={() => scrollToSection("historical-roadmap")}
              className="px-3 py-1 rounded-full hover:bg-white/10 transition-colors"
            >
              Roadmap
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("eight-branches-section")}
              className="px-3 py-1 rounded-full hover:bg-white/10 transition-colors"
            >
              8 Branches
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("india-historical-map")}
              className="px-3 py-1 rounded-full hover:bg-white/10 transition-colors"
            >
              India Map
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("kerala-ashtavaidya")}
              className="px-3 py-1 rounded-full hover:bg-white/10 text-[#E6C665] transition-colors"
            >
              Kerala Ashtavaidyas
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("ancient-library")}
              className="px-3 py-1 rounded-full hover:bg-white/10 transition-colors"
            >
              Library
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("historical-achievements")}
              className="px-3 py-1 rounded-full hover:bg-white/10 transition-colors"
            >
              Badges
            </button>
          </div>

          {/* Right: Bilingual Switcher */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-white/10 border border-white/20 rounded-full p-0.5">
              <button
                type="button"
                onClick={() => setIsMalayalam(false)}
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold transition-all ${
                  !isMalayalam ? "bg-[#D4AF37] text-[#072820] shadow-xs" : "text-white/80 hover:text-white"
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setIsMalayalam(true)}
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold transition-all ${
                  isMalayalam ? "bg-[#D4AF37] text-[#072820] shadow-xs" : "text-white/80 hover:text-white"
                }`}
              >
                മലയാളം
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ─── 1. MAIN EXPERIENCE: CINEMATIC INTRODUCTION ─── */}
      <CinematicHistoryIntro
        onBeginJourney={() => scrollToSection("historical-roadmap")}
        onExploreMap={() => scrollToSection("india-historical-map")}
        onExploreLibrary={() => scrollToSection("ancient-library")}
        onExploreAshtavaidyas={() => scrollToSection("kerala-ashtavaidya")}
        isMalayalam={isMalayalam}
      />

      {/* ─── 2. INTERACTIVE HISTORICAL ROADMAP (6 DESTINATIONS) ─── */}
      <HistoricalRoadmap
        onSelectDestination={(dest) => setSelectedDestination(dest)}
        onOpenEightBranchesWheel={() => setIsEightBranchesModalOpen(true)}
        onOpenAshtavaidyaHeritage={() => scrollToSection("kerala-ashtavaidya")}
        completedDestinationIds={completedDestinationIds}
        isMalayalam={isMalayalam}
      />

      {/* ─── 3. EIGHT BRANCHES MANDALA WHEEL (INLINE SECTION) ─── */}
      <div id="eight-branches-section">
        <EightBranchesWheel isModal={false} isMalayalam={isMalayalam} />
      </div>

      {/* ─── 4. INTERACTIVE INDIA HISTORICAL MAP ─── */}
      <IndiaHistoryMap
        onNavigateToKeralaHeritage={() => scrollToSection("kerala-ashtavaidya")}
        isMalayalam={isMalayalam}
      />

      {/* ─── 5. SPECIAL KERALA ASHTAVAIDYA HERITAGE (6 CHAPTERS) ─── */}
      <AshtavaidyaHeritageSection
        onUnlockHeritageBadge={handleUnlockKeralaHeritageBadge}
        isMalayalam={isMalayalam}
      />

      {/* ─── 6. DIGITAL CLASSICAL TEXT LIBRARY (CODICES & PREVIEWS) ─── */}
      <DigitalTextExplorer isMalayalam={isMalayalam} />

      {/* ─── 7. GAMIFICATION & BADGES (WITH QR SOUVENIR) ─── */}
      <AchievementPanel
        unlockedBadgeIds={unlockedBadgeIds}
        isMalayalam={isMalayalam}
      />

      {/* ─── 8. PERSISTENT AI HERITAGE GUIDE (VEDAVANI) ─── */}
      <VedavaniAIGuide isMalayalam={isMalayalam} />

      {/* ─── MODAL: HISTORICAL CHAPTER THEATER (WHEN DESTINATION IS TOUCHED) ─── */}
      <HistoricalChapterModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
        onCompleteDestination={handleDestinationComplete}
        onNextDestination={(nextDest) => setSelectedDestination(nextDest)}
        isMalayalam={isMalayalam}
      />

      {/* ─── MODAL: EIGHT BRANCHES WHEEL (WHEN TRIGGERED AS POPUP) ─── */}
      {isEightBranchesModalOpen && (
        <EightBranchesWheel
          isModal={true}
          onClose={() => setIsEightBranchesModalOpen(false)}
          isMalayalam={isMalayalam}
        />
      )}
    </div>
  );
}

