"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { KioskLanguage } from "./types";
import KioskBranding from "./KioskBranding";

interface KioskSubHeaderProps {
  language?: KioskLanguage;
  onLanguageChange?: (lang: KioskLanguage) => void;
  backHref?: string;
  backLabel?: string;
  backLabelMl?: string;
  currentStepBadge?: string;
  currentStepBadgeMl?: string;
  showLanguageToggle?: boolean;
}

export default function KioskSubHeader({
  language = "en",
  onLanguageChange,
  backHref = "/kiosk",
  backLabel = "Back to Home",
  backLabelMl = "പ്രധാന പേജ്",
  currentStepBadge,
  currentStepBadgeMl,
  showLanguageToggle = false,
}: KioskSubHeaderProps) {
  const isMl = language === "ml";

  return (
    <header className="kiosk-header w-full bg-[#073B30]/95 backdrop-blur-md border-b border-[#0B5D46]/30 sticky top-0 z-40 shadow-sm transition-colors">
      <div className="kiosk-header-inner">
        <KioskBranding language={language} />

        {/* ─── RIGHT CONTROLS: STEP BADGE / BACK BUTTON ─── */}
        <div className="kiosk-header-controls">
          {currentStepBadge && (
            <div className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[11px] font-bold text-[#DDEFE3] border border-white/15">
              <span className="w-1.5 h-1.5 rounded-full bg-[#55B96A] animate-pulse" />
              <span>{isMl ? (currentStepBadgeMl || currentStepBadge) : currentStepBadge}</span>
            </div>
          )}

          {showLanguageToggle && onLanguageChange && (
            <div
              className="flex items-center bg-white/10 border border-white/20 rounded-full p-0.5"
              role="group"
              aria-label="Language selection"
            >
              <button
                type="button"
                onClick={() => onLanguageChange("en")}
                className={`min-h-[28px] px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all ${
                  language === "en"
                    ? "bg-[#55B96A] text-white shadow-xs"
                    : "text-white/80 hover:text-white"
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange("ml")}
                className={`min-h-[28px] px-2.5 py-0.5 rounded-full text-[11px] font-bold font-malayalam transition-all ${
                  language === "ml"
                    ? "bg-[#55B96A] text-white shadow-xs"
                    : "text-white/80 hover:text-white"
                }`}
              >
                മലയാളം
              </button>
            </div>
          )}

          <Link
            href={backHref}
            className="inline-flex items-center justify-center gap-1.5 min-h-[38px] px-3 sm:px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#073B30] active:scale-95 transition-all text-xs font-bold border border-white/20 touch-manipulation group"
            title={isMl ? backLabelMl : backLabel}
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#55B96A] group-hover:text-[#073B30] group-hover:-translate-x-0.5 transition-transform" />
            <span className={isMl ? "font-malayalam" : ""}>
              {isMl ? backLabelMl : backLabel}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
