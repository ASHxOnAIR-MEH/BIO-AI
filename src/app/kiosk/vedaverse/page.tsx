"use client";

import React, { useState } from "react";
import { Sprout } from "lucide-react";
import { KioskLanguage } from "@/components/kiosk/types";
import { getAllPlants } from "@/lib/vedaverseEngine";
import VedaVerseCatalog from "@/components/kiosk/vedaverse/VedaVerseCatalog";
import ArogyamithranMascot from "@/components/kiosk/ArogyamithranMascot";
import KioskSubHeader from "@/components/kiosk/KioskSubHeader";
import KioskFooter from "@/components/kiosk/KioskFooter";

export default function VedaVerseLibraryPage() {
  const [language, setLanguage] = useState<KioskLanguage>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = sessionStorage.getItem("kiosk_language");
        if (stored === "ml" || stored === "en") {
          return stored;
        }
      } catch {
        // sessionStorage unavailable
      }
    }
    return "en";
  });
  const allPlants = getAllPlants();

  const handleLanguageChange = (newLang: KioskLanguage) => {
    setLanguage(newLang);
    try {
      sessionStorage.setItem("kiosk_language", newLang);
    } catch {
      // ignore
    }
  };

  const isMl = language === "ml";

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#073B30] flex flex-col font-sans selection:bg-[#55B96A]/20">
      {/* ─── KIOSK SUB HEADER ─────────────────────────────────────────────────── */}
      <KioskSubHeader
        language={language}
        onLanguageChange={handleLanguageChange}
        showLanguageToggle={true}
        currentStepBadge="VedaVerse 100 Flora Library"
        currentStepBadgeMl="വേദവേഴ്സ് 100 സസ്യ ലൈബ്രറി"
        backHref="/kiosk"
      />

      {/* ─── Hero Section ──────────────────────────────────────────────────────── */}
      <section className="w-full bg-gradient-to-b from-[#F0F7F1]/90 via-[#F0F7F1]/40 to-[#FAFAF7] border-b border-[#0B5D46]/10 pt-8 sm:pt-12 pb-6 sm:pb-8">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#0B5D46]/20 text-[#0B5D46] text-xs font-bold shadow-xs">
                <Sprout className="w-4 h-4 text-[#55B96A]" />
                <span>
                  {isMl
                    ? "വേദവേഴ്സ് · ഡിജിറ്റൽ സസ്യവിജ്ഞാന ലൈബ്രറി"
                    : "VedaVerse · Interactive Botanical & Spice Library"}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#55B96A]" />
                <span className="text-[11px] font-mono">100 Species</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#073B30] tracking-tight leading-tight">
                {isMl ? (
                  <>
                    സസ്യങ്ങളും സുഗന്ധവ്യഞ്ജനങ്ങളും{" "}
                    <span className="text-[#0B5D46]">തത്സമയം കണ്ടെത്തൂ</span>
                  </>
                ) : (
                  <>
                    Sacred Flora & Spices{" "}
                    <span className="text-[#0B5D46]">Knowledge Library</span>
                  </>
                )}
              </h1>

              {/* Subtitle description */}
              <p className="text-sm sm:text-base text-[#244B3F]/85 leading-relaxed">
                {isMl
                  ? "കേരള സ്റ്റാർട്ടപ്പ് മിഷന്റെ ബയോ-എഐ സെന്റർ ഓഫ് എക്സലൻസ് വികസിപ്പിച്ച 100 ഔഷധ-സുഗന്ധ സസ്യങ്ങളുടെ ആധികാരിക ഡിജിറ്റൽ ശേഖരം. 25 ആയുർവേദ സസ്യങ്ങൾ, 25 ഔഷധ സസ്യങ്ങൾ, 50 കേരളീയ/ആഗോള സുഗന്ധവ്യഞ്ജനങ്ങൾ എന്നിവയുടെ സസ്യശാസ്ത്ര വിവരങ്ങളും ശാസ്ത്രീയ കണ്ടെത്തലുകളും കാണാം."
                  : "Explore 100 documented botanical and spice records curated for the Bio-AI Centre of Excellence, Digital Hub, Kochi. Discover botanical taxonomy, classical Rasayana traditions, culinary applications, scientific evidence notes, safety alerts, and authoritative references."}
              </p>
            </div>

            {/* Quick stats counter and Mascot box */}
            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <ArogyamithranMascot
                expression="holding_plant"
                size="sm"
                language={language}
                showDialogue={false}
              />
              <div className="flex items-center gap-3 bg-white p-3.5 sm:p-4 rounded-2xl border-2 border-[#0B5D46]/15 shadow-sm shrink-0">
              <div className="text-center px-3 border-r border-[#0B5D46]/10">
                <div className="text-xl sm:text-2xl font-black font-mono text-[#0B5D46]">
                  25
                </div>
                <div className="text-[10px] sm:text-xs font-bold text-[#244B3F]/70 uppercase">
                  {isMl ? "ആയുർവേദം" : "Ayurvedic"}
                </div>
              </div>
              <div className="text-center px-3 border-r border-[#0B5D46]/10">
                <div className="text-xl sm:text-2xl font-black font-mono text-[#087F8C]">
                  25
                </div>
                <div className="text-[10px] sm:text-xs font-bold text-[#244B3F]/70 uppercase">
                  {isMl ? "ഔഷധം" : "Medicinal"}
                </div>
              </div>
              <div className="text-center px-3 border-r border-[#0B5D46]/10">
                <div className="text-xl sm:text-2xl font-black font-mono text-[#C26D00]">
                  50
                </div>
                <div className="text-[10px] sm:text-xs font-bold text-[#244B3F]/70 uppercase">
                  {isMl ? "സുഗന്ധം" : "Spices"}
                </div>
              </div>
              <div className="text-center px-3 bg-[#F0F7F1] rounded-xl py-1">
                <div className="text-xl sm:text-2xl font-black font-mono text-[#073B30]">
                  100
                </div>
                <div className="text-[10px] sm:text-xs font-bold text-[#0B5D46] uppercase">
                  {isMl ? "ആകെ" : "Total"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

      {/* ─── Main Interactive Catalog ──────────────────────────────────────────── */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-8 py-8 sm:py-12 flex-1 w-full">
        <VedaVerseCatalog initialPlants={allPlants} isMl={isMl} />
      </main>

      {/* ─── Kiosk Footer ──────────────────────────────────────────────────────── */}
      <KioskFooter language={language} />
    </div>
  );
}
