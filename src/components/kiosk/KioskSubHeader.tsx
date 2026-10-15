"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Home, X } from "lucide-react";
import { KioskLanguage } from "./types";
import { KIOSK_BRANDING } from "@/lib/kioskAssets";

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
  backLabel = "Back to Kiosk",
  backLabelMl = "കിയോസ്ക് മെനു",
  currentStepBadge,
  currentStepBadgeMl,
  showLanguageToggle = false,
}: KioskSubHeaderProps) {
  const isMl = language === "ml";

  return (
    <header className="w-full bg-[#FAFAF7]/95 backdrop-blur-md border-b border-[#0B5D46]/15 sticky top-0 z-40 transition-colors">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-2.5 sm:py-3.5 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left: Back Button + Institutional Branding Card */}
        <div className="flex items-center flex-wrap justify-center sm:justify-start gap-2.5 sm:gap-4">
          {/* Back Navigation Link */}
          <Link
            href={backHref}
            className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-3.5 sm:px-4 py-2 rounded-full bg-[#F0F7F1] text-[#073B30] hover:bg-[#0B5D46] hover:text-white active:scale-95 transition-all text-xs sm:text-sm font-bold border border-[#0B5D46]/20 touch-manipulation group shrink-0"
            aria-label={isMl ? backLabelMl : backLabel}
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform text-[#55B96A] group-hover:text-white" />
            <span className={isMl ? "font-malayalam" : ""}>
              {isMl ? backLabelMl : backLabel}
            </span>
          </Link>

          {/* Dedicated Institutional Branding Badge */}
          <div className="flex items-center gap-2 sm:gap-3 bg-white/95 rounded-2xl px-3 sm:px-4 py-1.5 border border-[#0B5D46]/15 shadow-xs">
            {/* 1. Official Kerala Startup Mission (KSUM) Logo */}
            <div className="flex items-center shrink-0">
              <Image
                src={KIOSK_BRANDING.ksum.path}
                alt={isMl ? KIOSK_BRANDING.ksum.altTextMl : KIOSK_BRANDING.ksum.altTextEn}
                width={125}
                height={45}
                priority
                className="h-6 sm:h-8 w-auto object-contain select-none"
              />
            </div>

            <div className="h-5 sm:h-6 w-px bg-[#0B5D46]/20 shrink-0" />

            {/* 2. Bio-AI Centre of Excellence Identity */}
            <div className="hidden sm:flex flex-col justify-center min-w-0 px-0.5">
              <span className="text-[10px] sm:text-xs font-extrabold tracking-wider text-[#073B30] uppercase truncate">
                Bio-AI Centre of Excellence
              </span>
              <span className="text-[9px] text-[#0B5D46]/80 tracking-tight truncate">
                Digital Hub, Kochi
              </span>
            </div>

            <div className="h-5 sm:h-6 w-px bg-[#0B5D46]/20 shrink-0" />

            {/* 3. Official Huddle Global Logo */}
            <div className="flex items-center shrink-0">
              <Image
                src={KIOSK_BRANDING.huddleGlobal.path}
                alt={isMl ? KIOSK_BRANDING.huddleGlobal.altTextMl : KIOSK_BRANDING.huddleGlobal.altTextEn}
                width={105}
                height={40}
                priority
                className="h-5 sm:h-7 w-auto object-contain select-none"
              />
            </div>
          </div>

          {/* Optional Current Step / Mode Badge */}
          {currentStepBadge && (
            <div className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0F7F1] text-[11px] font-bold text-[#0B5D46] border border-[#0B5D46]/15">
              <span className="w-1.5 h-1.5 rounded-full bg-[#55B96A] animate-pulse" />
              <span>{isMl ? (currentStepBadgeMl || currentStepBadge) : currentStepBadge}</span>
            </div>
          )}
        </div>

        {/* Right: Controls & Exit Buttons */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
          {/* Optional Language Switcher */}
          {showLanguageToggle && onLanguageChange && (
            <div
              className="flex items-center bg-[#F0F7F1] border border-[#0B5D46]/20 rounded-full p-1"
              role="group"
              aria-label="Language selection"
            >
              <button
                type="button"
                onClick={() => onLanguageChange("en")}
                className={`min-h-[34px] px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  language === "en"
                    ? "bg-[#0B5D46] text-white shadow-xs"
                    : "text-[#073B30] hover:text-[#0B5D46]"
                }`}
                aria-pressed={language === "en"}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange("ml")}
                className={`min-h-[34px] px-3 py-1 rounded-full text-xs font-bold transition-all font-malayalam ${
                  language === "ml"
                    ? "bg-[#0B5D46] text-white shadow-xs"
                    : "text-[#073B30] hover:text-[#0B5D46]"
                }`}
                aria-pressed={language === "ml"}
              >
                മലയാളം
              </button>
            </div>
          )}

          {/* Return to Main Website */}
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-3 sm:px-4 py-2 rounded-full bg-[#F0F7F1] text-[#073B30] hover:bg-white text-xs font-bold border border-[#0B5D46]/20 shadow-xs transition-all active:scale-95 touch-manipulation"
            title="Return to Main Bio-AI Website"
          >
            <Home className="w-4 h-4 text-[#55B96A]" />
            <span className="hidden sm:inline">Main Site</span>
          </Link>

          {/* Exit to Kiosk Menu Button */}
          <Link
            href="/kiosk"
            className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-3.5 sm:px-4 py-2 rounded-full bg-[#073B30] text-[#FAFAF7] hover:bg-[#0B5D46] active:scale-95 transition-all text-xs sm:text-sm font-bold shadow-sm border border-[#0B5D46]/30 touch-manipulation group"
            aria-label="Exit to Kiosk Main Screen"
          >
            <span>{isMl ? "കിയോസ്ക്" : "Exit"}</span>
            <X className="w-4 h-4 text-[#55B96A] group-hover:rotate-90 transition-transform" />
          </Link>
        </div>
      </div>
    </header>
  );
}
