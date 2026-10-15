"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { KioskLanguage } from "./types";
import { KIOSK_BRANDING } from "@/lib/kioskAssets";

interface KioskHeaderProps {
  language: KioskLanguage;
  onLanguageChange?: (lang: KioskLanguage) => void;
}

export default function KioskHeader({
  language,
}: KioskHeaderProps) {
  const isMl = language === "ml";

  return (
    <header className="w-full bg-[#073B30]/95 backdrop-blur-md border-b border-[#0B5D46]/30 sticky top-0 z-40 shadow-sm transition-colors">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-3 sm:gap-4">
        {/* ─── DEDICATED INSTITUTIONAL BRANDING AREA (KSUM | Kerala IT | Huddle Global) ─── */}
        <div className="flex items-center gap-2.5 sm:gap-4 md:gap-5 bg-white rounded-2xl sm:rounded-full px-3.5 sm:px-5 py-1.5 sm:py-2 border border-[#0B5D46]/20 shadow-xs">
          {/* 1. Official Kerala Startup Mission (KSUM) Logo */}
          <div className="flex items-center shrink-0">
            <Image
              src={KIOSK_BRANDING.ksum.path}
              alt={isMl ? KIOSK_BRANDING.ksum.altTextMl : KIOSK_BRANDING.ksum.altTextEn}
              width={160}
              height={55}
              priority
              className="h-7 sm:h-9 md:h-10 w-auto object-contain select-none"
            />
          </div>

          {/* Divider */}
          <div className="h-5 sm:h-7 w-px bg-[#0B5D46]/20 shrink-0" />

          {/* 2. Official Kerala IT Logo (Center Position) */}
          <div className="flex items-center shrink-0">
            <Image
              src={KIOSK_BRANDING.keralaIt.path}
              alt={isMl ? KIOSK_BRANDING.keralaIt.altTextMl : KIOSK_BRANDING.keralaIt.altTextEn}
              width={150}
              height={50}
              priority
              className="h-6 sm:h-8 md:h-9 w-auto object-contain select-none"
            />
          </div>

          {/* Divider */}
          <div className="h-5 sm:h-7 w-px bg-[#0B5D46]/20 shrink-0" />

          {/* 3. Official Huddle Global Logo */}
          <div className="flex items-center shrink-0">
            <Image
              src={KIOSK_BRANDING.huddleGlobal.path}
              alt={isMl ? KIOSK_BRANDING.huddleGlobal.altTextMl : KIOSK_BRANDING.huddleGlobal.altTextEn}
              width={140}
              height={50}
              priority
              className="h-7 sm:h-9 md:h-10 w-auto object-contain select-none"
            />
          </div>
        </div>

        {/* ─── SINGLE CLEAR RETURN-TO-MAIN-WEBSITE ACTION ───────────────── */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 min-h-[42px] px-3.5 sm:px-4 py-2 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#073B30] active:scale-95 transition-all text-xs sm:text-sm font-bold shadow-xs border border-white/20 touch-manipulation group"
            title="Return to Bio-AI main website"
          >
            <ArrowLeft className="w-4 h-4 text-[#55B96A] group-hover:text-[#073B30] group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden sm:inline">Main Website</span>
            <span className="sm:hidden">Exit</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
