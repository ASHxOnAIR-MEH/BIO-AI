"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import KioskHeader from "@/components/kiosk/KioskHeader";
import KioskWelcome from "@/components/kiosk/KioskWelcome";
import KioskCardGrid from "@/components/kiosk/KioskCardGrid";
import KioskFooter from "@/components/kiosk/KioskFooter";
import { KioskLanguage } from "@/components/kiosk/types";

export default function KioskPage() {
  const [language, setLanguage] = useState<KioskLanguage>("en");

  return (
    <div className="min-h-screen w-full bg-[#F0F7F2] text-[#132E27] relative flex flex-col justify-center items-center selection:bg-[#55B96A]/25 overflow-x-hidden">
      {/* ─── DESKTOP AMBIENT CANVAS CONTROLS (VISIBLE ONLY ON WIDESCREEN) ─── */}
      <div className="hidden xl:flex fixed top-4 left-6 z-50 items-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#073B30]/90 hover:bg-[#0B5D46] text-[#FAFAF7] text-xs font-bold shadow-lg border border-[#55B96A]/30 backdrop-blur-md transition-all active:scale-95 group"
          title="Return to Bio-AI Website"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#55B96A] group-hover:-translate-x-0.5 transition-transform" />
          <span>Return to Main Website</span>
        </Link>

        <span className="text-[11px] font-semibold text-[#55B96A]/80 bg-[#073B30]/70 px-3 py-1.5 rounded-full border border-white/10">
          Kiosk Portrait Display (9:16)
        </span>
      </div>

      {/* ─── MAIN PORTRAIT KIOSK CANVAS (1080x1920 Reference) ─────────────── */}
      <main
        id="kiosk-portrait-canvas"
        className="w-full max-w-[820px] min-h-screen flex flex-col justify-between relative shadow-[0_0_60px_rgba(0,0,0,0.18)] overflow-x-hidden bg-[#F0F7F2]"
      >

        {/* ─── 1. INSTITUTIONAL HEADER (KSUM | Kerala IT | Huddle Global) ──── */}
        <KioskHeader
          language={language}
          onLanguageChange={setLanguage}
        />

        {/* ─── 2. HERO SECTION (BIO-AI CENTRE OF EXCELLENCE + AROGYAMITHRAN) ─ */}
        <div className="flex-1 flex flex-col justify-between">
          <KioskWelcome language={language} />

          {/* ─── 3. FOUR 16:9 ILLUSTRATED INTERACTIVE NAVIGATION CARDS ────── */}
          <KioskCardGrid language={language} />
        </div>

        {/* ─── 4. KIOSK FOOTER WITH KASAVU MOTIF & BILINGUAL TOGGLE ────────── */}
        <KioskFooter
          language={language}
          onLanguageChange={setLanguage}
        />
      </main>
    </div>
  );
}
