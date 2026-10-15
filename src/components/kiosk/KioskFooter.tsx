"use client";

import Link from "next/link";
import { Globe } from "lucide-react";
import { KioskLanguage } from "./types";

interface KioskFooterProps {
  language?: KioskLanguage;
  onLanguageChange?: (lang: KioskLanguage) => void;
}

export default function KioskFooter({
  language = "en",
  onLanguageChange,
}: KioskFooterProps) {
  const isMl = language === "ml";

  return (
    <footer className="w-full mt-auto relative bg-gradient-to-r from-[#073B30] via-[#0B5D46] to-[#073B30] text-white py-4 sm:py-5 px-4 sm:px-8 border-t-2 border-[#D4AF37]/60 shadow-lg z-20">
      {/* Golden Floral Kasavu Motif at Top Center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full bg-[#073B30] border-2 border-[#D4AF37] flex items-center justify-center shadow-xs">
          <svg
            className="w-4 h-4 text-[#D4AF37]"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            {/* Elegant Lotus / Kasavu motif */}
            <path d="M12 2C12 2 10 7 10 10C10 13 12 15 12 15C12 15 14 13 14 10C14 7 12 2 12 2Z" />
            <path d="M7 6C7 6 7 11 8.5 13C10 15 12 15 12 15C12 15 11 12 10 10C9 8 7 6 7 6Z" opacity="0.8" />
            <path d="M17 6C17 6 17 11 15.5 13C14 15 12 15 12 15C12 15 13 12 14 10C15 8 17 6 17 6Z" opacity="0.8" />
            <path d="M3 12C3 12 5 15 8 16C10 16.5 12 15 12 15C12 15 9.5 14 8 12C6.5 10 3 12 3 12Z" opacity="0.6" />
            <path d="M21 12C21 12 19 15 16 16C14 16.5 12 15 12 15C12 15 14.5 14 16 12C17.5 10 21 12 21 12Z" opacity="0.6" />
          </svg>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        {/* Core Slogan matching reference image */}
        <div className="flex flex-col items-center sm:items-start">
          <p className="text-[11px] sm:text-xs md:text-sm font-extrabold tracking-widest text-[#FAFAF7] uppercase">
            {isMl
              ? "ആരോഗ്യകരവും ബുദ്ധിപരവും സുസ്ഥിരവുമായ നാളെയ്ക്കായി നവീകരണം"
              : "INNOVATION FOR A HEALTHIER, SMARTER AND SUSTAINABLE TOMORROW"}
          </p>
          <span className="text-[10px] text-[#55B96A] tracking-wider font-semibold">
            Bio-AI Centre of Excellence · KSUM Digital Hub, Kochi
          </span>
        </div>

        {/* Right side: White pill Language Selector matching reference */}
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center bg-white rounded-full px-3 py-1.5 shadow-md border border-[#0B5D46]/20 text-[#073B30] text-xs font-bold gap-2">
            <Globe className="w-3.5 h-3.5 text-[#0B5D46] shrink-0" />
            {onLanguageChange ? (
              <div className="flex items-center gap-1.5" role="group" aria-label="Language Selector">
                <button
                  type="button"
                  onClick={() => onLanguageChange("en")}
                  className={`px-2 py-0.5 rounded-full transition-all touch-manipulation ${
                    language === "en"
                      ? "bg-[#0B5D46] text-white font-black shadow-xs"
                      : "text-[#073B30] hover:text-[#0B5D46]"
                  }`}
                >
                  English
                </button>
                <span className="text-[#0B5D46]/30">|</span>
                <button
                  type="button"
                  onClick={() => onLanguageChange("ml")}
                  className={`px-2 py-0.5 rounded-full transition-all touch-manipulation font-malayalam ${
                    language === "ml"
                      ? "bg-[#0B5D46] text-white font-black shadow-xs"
                      : "text-[#073B30] hover:text-[#0B5D46]"
                  }`}
                >
                  മലയാളം
                </button>
              </div>
            ) : (
              <span className="font-bold text-[#073B30]">
                {isMl ? "മലയാളം" : "English"}
              </span>
            )}
          </div>

          {/* Quick Return to Main Website Link */}
          <Link
            href="/"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#073B30]/80 hover:bg-[#073B30] text-[#FAFAF7] text-[11px] font-bold border border-white/20 transition-all active:scale-95 touch-manipulation"
            title="Return to Main Website"
          >
            <span>Main Site</span>
            <span className="text-[#55B96A]">↗</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
