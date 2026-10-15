"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ExternalLink,
  BookOpen,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Info,
  Layers,
  CheckCircle2,
} from "lucide-react";
import {
  PlantRecord,
  KioskLanguage,
  VedaVerseSourceInfo,
} from "../types";
import {
  formatMalayalamName,
  getAdjacentPlants,
  getCategoryVisuals,
} from "@/lib/vedaverseEngine";
import BotanicalGlyph from "./BotanicalGlyph";
import VedaVerseDisclaimer from "./VedaVerseDisclaimer";
import KioskSubHeader from "../KioskSubHeader";
import KioskFooter from "../KioskFooter";

interface PlantMonographViewProps {
  plant: PlantRecord;
  sources: Record<string, VedaVerseSourceInfo>;
}

export default function PlantMonographView({
  plant,
  sources,
}: PlantMonographViewProps) {
  const [language, setLanguage] = useState<KioskLanguage>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = sessionStorage.getItem("kiosk_language");
        if (stored === "ml" || stored === "en") {
          return stored;
        }
      } catch {
        // ignore
      }
    }
    return "en";
  });
  const visuals = getCategoryVisuals(plant.category);
  const mlInfo = formatMalayalamName(plant.common_name_ml);
  const adjacent = getAdjacentPlants(plant.id);

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
        backHref="/kiosk/vedaverse"
        backLabel="Back to Library"
        backLabelMl="ലൈബ്രറിയിലേക്ക്"
        currentStepBadge={`Specimen #${plant.id}`}
        currentStepBadgeMl={`സസ്യം #${plant.id}`}
      />

      {/* ─── Specimen Identity Banner ─────────────────────────────────────────── */}
      <section className="w-full bg-gradient-to-b from-[#F0F7F1]/90 via-[#F0F7F1]/30 to-[#FAFAF7] border-b border-[#0B5D46]/10 pt-8 sm:pt-10 pb-6 sm:pb-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="space-y-3 flex-1 min-w-0">
              {/* Badges strip */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-white text-[#073B30] border border-[#0B5D46]/20 shadow-xs">
                  ID: {plant.id}
                </span>

                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border ${visuals.badgeBg} ${visuals.badgeText} ${visuals.badgeBorder} shadow-xs`}
                >
                  <span className="w-2 h-2 rounded-full bg-current" />
                  {isMl ? visuals.labelMl : visuals.labelEn}
                </span>

                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white text-[#244B3F]/80 border border-[#0B5D46]/15">
                  Family: {plant.family}
                </span>

                <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-[#E5EBE5] text-[#244B3F]/70">
                  Educational Reference Draft
                </span>
              </div>

              {/* English Common Name */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#073B30] tracking-tight leading-tight">
                {plant.common_name_en}
              </h1>

              {/* Malayalam Name */}
              <div className="flex items-center gap-2">
                {mlInfo.isVerified ? (
                  <p className="text-xl sm:text-2xl font-bold text-[#0B5D46] tracking-wide">
                    {mlInfo.displayText}
                  </p>
                ) : (
                  <span className="text-xs text-[#78350F] bg-[#FEF3C7] border border-[#F59E0B]/30 px-3 py-1 rounded-lg font-medium">
                    {isMl
                      ? "പ്രാദേശിക പേര് പരിശോധനയിലാണ്"
                      : "Malayalam vernacular under regional review"}
                  </span>
                )}
              </div>

              {/* Botanical Scientific Name (Strictly Italicized) */}
              <p className="text-lg sm:text-xl italic font-serif text-[#244B3F]/90 font-medium">
                {plant.scientific_name}
              </p>
            </div>

            {/* Botanical Glyph Foil Seal */}
            <div className="shrink-0 flex items-center justify-center p-4 bg-white rounded-3xl border-2 border-[#0B5D46]/15 shadow-sm">
              <BotanicalGlyph category={plant.category} size="xl" />
            </div>
          </div>

          {/* Quick Facts Strip (4 cards) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-6 border-t border-[#0B5D46]/10">
            <div className="bg-white rounded-xl sm:rounded-2xl p-3.5 border border-[#0B5D46]/15 shadow-2xs">
              <span className="text-[10px] sm:text-[11px] font-bold text-[#244B3F]/60 uppercase tracking-wider block">
                {isMl ? "സസ്യകുടുംബം" : "Botanical Family"}
              </span>
              <span className="text-sm sm:text-base font-bold text-[#073B30] mt-0.5 block truncate">
                {plant.family}
              </span>
            </div>

            <div className="bg-white rounded-xl sm:rounded-2xl p-3.5 border border-[#0B5D46]/15 shadow-2xs">
              <span className="text-[10px] sm:text-[11px] font-bold text-[#244B3F]/60 uppercase tracking-wider block">
                {isMl ? "ഉപയോഗിക്കുന്ന ഭാഗം" : "Part Documented"}
              </span>
              <span className="text-sm sm:text-base font-bold text-[#073B30] mt-0.5 block truncate">
                {plant.plant_part_or_spice_part}
              </span>
            </div>

            <div className="bg-white rounded-xl sm:rounded-2xl p-3.5 border border-[#0B5D46]/15 shadow-2xs">
              <span className="text-[10px] sm:text-[11px] font-bold text-[#244B3F]/60 uppercase tracking-wider block">
                {isMl ? "വിഭാഗം" : "Category"}
              </span>
              <span className="text-sm sm:text-base font-bold text-[#0B5D46] mt-0.5 block truncate">
                {isMl ? visuals.labelMl : plant.category}
              </span>
            </div>

            <div className="bg-white rounded-xl sm:rounded-2xl p-3.5 border border-[#0B5D46]/15 shadow-2xs">
              <span className="text-[10px] sm:text-[11px] font-bold text-[#244B3F]/60 uppercase tracking-wider block">
                {isMl ? "ഹെർബേറിയം ഇൻഡക്സ്" : "Herbarium Index"}
              </span>
              <span className="text-sm sm:text-base font-mono font-bold text-[#073B30] mt-0.5 block">
                {adjacent.currentIndex} of {adjacent.total}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Main Monograph Body ───────────────────────────────────────────────── */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-1 w-full space-y-6 sm:space-y-8">
        {/* Section 1: Traditional & Ethnobotanical Context */}
        <section className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 border-[#0B5D46]/15 shadow-sm space-y-3">
          <div className="flex items-center gap-2.5 text-[#0B5D46]">
            <BookOpen className="w-5 h-5 text-[#55B96A]" />
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#073B30]">
              {isMl
                ? "പരമ്പരാഗതവും ആയുർവേദപരവുമായ പശ്ചാത്തലം"
                : "Traditional & Ethnobotanical Context"}
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#244B3F]/90 leading-relaxed">
            {plant.traditional_or_general_context}
          </p>

          <div className="pt-2">
            <p className="text-xs text-[#244B3F]/70 italic bg-[#F0F7F1] p-3 rounded-xl border border-[#0B5D46]/10">
              {isMl
                ? "ശ്രദ്ധിക്കുക: പരമ്പരാഗത രേഖകൾ സാംസ്കാരിക വിവരങ്ങളാണ് നൽകുന്നത്; ഇത് പ്രത്യേക രോഗാവസ്ഥകൾക്കുള്ള ചികിത്സാ ശുപാർശയല്ല."
                : "Contextual Note: Traditional documentation reflects classical cultural usage and historical rasayana records; this is descriptive of heritage, not a therapeutic prescription."}
            </p>
          </div>
        </section>

        {/* Section 2: Culinary, Morphological & Ecological Context */}
        <section className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 border-[#0B5D46]/15 shadow-sm space-y-3">
          <div className="flex items-center gap-2.5 text-[#0B5D46]">
            <Layers className="w-5 h-5 text-[#55B96A]" />
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#073B30]">
              {isMl
                ? "പാചക, ജൈവ-ആവാസവ്യവസ്ഥാ വിവരങ്ങൾ"
                : "Culinary, Morphological & Ecological Profile"}
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#244B3F]/90 leading-relaxed">
            {plant.culinary_or_ecological_context}
          </p>
        </section>

        {/* Section 3: Scientific Evidence & Research Limitations */}
        <section className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 border-[#0B5D46]/15 shadow-sm space-y-3">
          <div className="flex items-center gap-2.5 text-[#0B5D46]">
            <Info className="w-5 h-5 text-[#55B96A]" />
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#073B30]">
              {isMl
                ? "ശാസ്ത്രീയ തെളിവുകളും ഗവേഷണ പരിമിതികളും"
                : "Scientific Evidence & Research Context"}
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#244B3F]/90 leading-relaxed">
            {plant.evidence_note}
          </p>

          <div className="pt-2">
            <div className="flex items-start gap-2.5 text-xs text-[#244B3F]/80 bg-[#F8FAF8] p-3.5 rounded-xl border border-[#0B5D46]/15">
              <CheckCircle2 className="w-4 h-4 text-[#55B96A] shrink-0 mt-0.5" />
              <span>
                {isMl
                  ? "ഭക്ഷണ ആവശ്യങ്ങൾക്കുള്ള സാധാരണ അളവുകൾ സാന്ദ്രീകൃത ഔഷധ സപ്ലിമെന്റുകളിൽ നിന്ന് തികച്ചും വ്യത്യസ്തമാണ്."
                  : "Important distinction: Normal culinary seasoning amounts differ substantially from concentrated dietary supplements, standardized extracts, or purified essential oils."}
              </span>
            </div>
          </div>
        </section>

        {/* Section 4: Safety Notes & Cautionary Warnings (Prominent Alert Box) */}
        <section
          className="bg-gradient-to-br from-[#FFFBEB] to-[#FEF3C7]/40 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 border-[#F59E0B]/40 shadow-sm space-y-3"
          role="alert"
        >
          <div className="flex items-center gap-2.5 text-[#B45309]">
            <AlertTriangle className="w-5 h-5 text-[#D97706]" />
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#78350F]">
              {isMl
                ? "സുരക്ഷാ മുന്നറിയിപ്പുകളും മുൻകരുതലുകളും"
                : "Safety Notes, Cautions & Interactions"}
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#92400E] font-medium leading-relaxed">
            {plant.safety_note}
          </p>

          <div className="pt-2">
            <p className="text-xs text-[#78350F] bg-white/70 p-3 rounded-xl border border-[#F59E0B]/30 font-semibold">
              {isMl
                ? "മരുന്നുകൾ കഴിക്കുന്നവരോ, ഗർഭിണികളോ, മുൻകൂട്ടി അസുഖമുള്ളവരോ സ്വന്തമായി സസ്യങ്ങൾ ചികിത്സയ്ക്കായി ഉപയോഗിക്കരുത്."
                : "Crucial guidance: Never self-prescribe or substitute herbal extracts for clinically prescribed therapy. Always consult healthcare practitioners before combining botanicals with pharmaceuticals."}
            </p>
          </div>
        </section>

        {/* Section 5: Verified Sources & References */}
        <section className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 border-[#0B5D46]/15 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-[#0B5D46]">
              <ShieldCheck className="w-5 h-5 text-[#55B96A]" />
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#073B30]">
                {isMl
                  ? "പരിശോധിച്ച ശാസ്ത്രീയ സ്രോതസ്സുകൾ"
                  : "Authoritative Reference Sources & Citations"}
              </h2>
            </div>
            <span className="text-xs font-mono font-bold text-[#0B5D46] bg-[#F0F7F1] px-2.5 py-1 rounded-md border border-[#0B5D46]/15">
              {plant.source_urls.length} Verified Sources
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {plant.source_urls.map((url, idx) => {
              // Extract domain label for clean kiosk presentation
              let domain = "Authoritative Source";
              try {
                const parsed = new URL(url);
                domain = parsed.hostname.replace("www.", "");
              } catch {
                // ignore
              }

              return (
                <a
                  key={idx}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link flex items-start justify-between gap-3 p-4 rounded-xl sm:rounded-2xl border border-[#0B5D46]/15 bg-[#F8FAF8] hover:bg-[#F0F7F1] hover:border-[#55B96A] transition-all touch-manipulation"
                >
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold text-[#0B5D46] uppercase tracking-wider block">
                      Source #{idx + 1} · {domain}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-[#073B30] group-hover/link:text-[#0B5D46] truncate block mt-0.5">
                      {url}
                    </span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#0B5D46]/60 group-hover/link:text-[#0B5D46] shrink-0 mt-1 transition-colors" />
                </a>
              );
            })}
          </div>

          {/* Source scope notes */}
          {plant.source_ids && plant.source_ids.length > 0 && (
            <div className="pt-3 border-t border-[#0B5D46]/10">
              <span className="text-xs font-bold text-[#244B3F]/70 uppercase tracking-wider block mb-2">
                Referenced Scientific Repositories:
              </span>
              <div className="flex flex-wrap gap-2">
                {plant.source_ids.map((sId) => {
                  const info = sources[sId];
                  return (
                    <span
                      key={sId}
                      className="text-xs bg-[#F0F7F1] text-[#073B30] px-3 py-1 rounded-full border border-[#0B5D46]/15 font-medium"
                      title={info?.scope || ""}
                    >
                      {info?.name || sId}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </section>

        {/* Section 6: Mandatory Educational Disclaimer */}
        <VedaVerseDisclaimer isMl={isMl} />

        {/* ─── Previous / Next Specimen Navigation Strip ───────────────────────── */}
        <nav
          aria-label="Specimen Sequential Navigation"
          className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border-2 border-[#0B5D46]/15 flex items-center justify-between gap-4"
        >
          {adjacent.prev ? (
            <Link
              href={`/kiosk/vedaverse/${adjacent.prev.id}`}
              className="inline-flex items-center gap-2 sm:gap-3 text-left p-2 sm:p-3 rounded-xl sm:rounded-2xl hover:bg-[#F0F7F1] transition-all touch-manipulation group active:scale-95"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#F0F7F1] group-hover:bg-[#0B5D46] text-[#073B30] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </div>
              <div className="min-w-0 hidden xs:block">
                <span className="text-[10px] font-bold text-[#244B3F]/60 uppercase tracking-wider block">
                  {isMl ? "മുമ്പത്തെ സസ്യം" : "Previous Specimen"}
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#073B30] truncate block max-w-[140px] sm:max-w-[200px]">
                  {adjacent.prev.common_name_en}
                </span>
              </div>
            </Link>
          ) : (
            <div className="w-20" />
          )}

          {/* Central Return to Library */}
          <Link
            href="/kiosk/vedaverse"
            className="inline-flex items-center gap-1.5 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#0B5D46] text-white text-xs sm:text-sm font-bold shadow-sm hover:bg-[#073B30] active:scale-95 transition-all touch-manipulation shrink-0"
          >
            <BookOpen className="w-4 h-4" />
            <span>{isMl ? "എല്ലാ സസ്യങ്ങളും" : "View All 100 Species"}</span>
          </Link>

          {adjacent.next ? (
            <Link
              href={`/kiosk/vedaverse/${adjacent.next.id}`}
              className="inline-flex items-center gap-2 sm:gap-3 text-right p-2 sm:p-3 rounded-xl sm:rounded-2xl hover:bg-[#F0F7F1] transition-all touch-manipulation group active:scale-95"
            >
              <div className="min-w-0 hidden xs:block">
                <span className="text-[10px] font-bold text-[#244B3F]/60 uppercase tracking-wider block">
                  {isMl ? "അടുത്ത സസ്യം" : "Next Specimen"}
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#073B30] truncate block max-w-[140px] sm:max-w-[200px]">
                  {adjacent.next.common_name_en}
                </span>
              </div>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#F0F7F1] group-hover:bg-[#0B5D46] text-[#073B30] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                <ChevronRight className="w-5 h-5" />
              </div>
            </Link>
          ) : (
            <div className="w-20" />
          )}
        </nav>
      </main>

      {/* ─── Kiosk Footer ──────────────────────────────────────────────────────── */}
      <KioskFooter language={language} />
    </div>
  );
}
