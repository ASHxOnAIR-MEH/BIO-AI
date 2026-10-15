"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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
  backLabel = "Back to Home",
  backLabelMl = "പ്രധാന പേജ്",
  currentStepBadge,
  currentStepBadgeMl,
  showLanguageToggle = false,
}: KioskSubHeaderProps) {
  const isMl = language === "ml";

  return (
    <header className="w-full bg-[#073B30]/95 backdrop-blur-md border-b border-[#0B5D46]/30 sticky top-0 z-40 shadow-sm transition-colors">
      <div className="max-w-[820px] mx-auto px-3 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between gap-2 sm:gap-4">
        {/* ─── DEDICATED INSTITUTIONAL BRANDING PILL (KSUM | Kerala IT | Huddle Global) ─── */}
        <div className="flex items-center gap-2 sm:gap-3 bg-white rounded-full px-3 sm:px-4 py-1 sm:py-1.5 border border-white/20 shadow-xs">
          {/* 1. Official Kerala Startup Mission (KSUM) Logo */}
          <div className="flex items-center shrink-0">
            <Image
              src={KIOSK_BRANDING.ksum.path}
              alt={isMl ? KIOSK_BRANDING.ksum.altTextMl : KIOSK_BRANDING.ksum.altTextEn}
              width={140}
              height={45}
              priority
              className="h-5 sm:h-7 w-auto object-contain select-none"
            />
          </div>

          <div className="h-4 sm:h-5 w-px bg-gray-200 shrink-0" />

          {/* 2. Official Kerala IT Logo */}
          <div className="flex items-center shrink-0">
            <Image
              src={KIOSK_BRANDING.keralaIt.path}
              alt={isMl ? KIOSK_BRANDING.keralaIt.altTextMl : KIOSK_BRANDING.keralaIt.altTextEn}
              width={130}
              height={40}
              priority
              className="h-4.5 sm:h-6 w-auto object-contain select-none"
            />
          </div>

          <div className="h-4 sm:h-5 w-px bg-gray-200 shrink-0" />

          {/* 3. Official Huddle Global Logo */}
          <div className="flex items-center shrink-0">
            <Image
              src={KIOSK_BRANDING.huddleGlobal.path}
              alt={isMl ? KIOSK_BRANDING.huddleGlobal.altTextMl : KIOSK_BRANDING.huddleGlobal.altTextEn}
              width={120}
              height={40}
              priority
              className="h-5 sm:h-7 w-auto object-contain select-none"
            />
          </div>
        </div>

        {/* ─── RIGHT CONTROLS: STEP BADGE / BACK BUTTON ─────────────────── */}
        <div className="flex items-center gap-2 shrink-0">
          {currentStepBadge && (
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[11px] font-bold text-[#DDEFE3] border border-white/15">
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
