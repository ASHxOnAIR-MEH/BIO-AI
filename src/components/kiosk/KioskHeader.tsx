"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { KioskLanguage } from "./types";
import KioskBranding from "./KioskBranding";

interface KioskHeaderProps {
  language: KioskLanguage;
  onLanguageChange?: (lang: KioskLanguage) => void;
}

export default function KioskHeader({
  language,
}: KioskHeaderProps) {
  const isMl = language === "ml";

  return (
    <header className="kiosk-header w-full bg-[#073B30]/95 backdrop-blur-md border-b border-[#0B5D46]/30 sticky top-0 z-40 shadow-sm transition-colors">
      <div className="kiosk-header-inner">
        <KioskBranding language={language} />

        {/* ─── RIGHT CONTROLS: RETURN-TO-MAIN-WEBSITE ─── */}
        <div className="kiosk-header-controls">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 min-h-[40px] px-3.5 sm:px-4 py-2 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#073B30] active:scale-95 transition-all text-xs sm:text-sm font-bold shadow-xs border border-white/20 touch-manipulation group"
            title="Return to Bio-AI main website"
          >
            <ArrowLeft className="w-4 h-4 text-[#55B96A] group-hover:text-[#073B30] group-hover:-translate-x-0.5 transition-transform" />
            <span>{isMl ? "പ്രധാന വെബ്സൈറ്റ്" : "Main Website"}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
