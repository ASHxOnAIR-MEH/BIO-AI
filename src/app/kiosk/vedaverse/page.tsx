"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Leaf,
  ArrowRight,
  Sparkles,
  BookOpen,
  ChevronRight,
  X,
} from "lucide-react";
import { KioskLanguage } from "@/components/kiosk/types";
import { getCategoriesWithCounts } from "@/lib/vedaverseEngine";
import KioskSubHeader from "@/components/kiosk/KioskSubHeader";
import KioskFooter from "@/components/kiosk/KioskFooter";
import { useRouter } from "next/navigation";

export default function VedaVerseLibraryPage() {
  const router = useRouter();
  const [language, setLanguage] = useState<KioskLanguage>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = sessionStorage.getItem("kiosk_language");
        if (stored === "ml" || stored === "en") return stored;
      } catch {
        // sessionStorage unavailable
      }
    }
    return "en";
  });

  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const handleLanguageChange = (newLang: KioskLanguage) => {
    setLanguage(newLang);
    try {
      sessionStorage.setItem("kiosk_language", newLang);
    } catch {
      // ignore
    }
  };

  const isMl = language === "ml";
  const categories = getCategoriesWithCounts();
  const ayurvedicCount =
    categories.find((c) => c.id === "Ayurvedic plant")?.count ?? 25;
  const medicinalCount =
    categories.find((c) => c.id === "Medicinal plant")?.count ?? 25;
  const spicesCount =
    categories.find((c) => c.id === "Culinary spice / herb")?.count ?? 50;
  const totalCount = categories.find((c) => c.id === "all")?.count ?? 100;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(
        `/kiosk/vedaverse/library?q=${encodeURIComponent(searchQuery.trim())}`
      );
    } else {
      router.push("/kiosk/vedaverse/library");
    }
  };

  const CATEGORY_CARDS = [
    {
      id: "Ayurvedic plant",
      titleEn: "Ayurvedic Plants",
      titleMl: "ആയുർവേദ സസ്യങ്ങൾ",
      descEn:
        "Explore plants associated with documented Ayurvedic traditions — Ashwagandha, Brahmi, Shatavari, Triphala and 21 more classical Rasayana botanicals.",
      descMl:
        "അശ്വഗന്ധ, ബ്രാഹ്മി, ശതാവരി, ത്രിഫല ഉൾപ്പെടെ 25 ക്ലാസിക്കൽ ആയുർവേദ സസ്യങ്ങൾ.",
      count: ayurvedicCount,
      image: "/assets/kiosk/categories/ayurvedic-plants.jpg",
      imageAlt: "Ayurvedic plants including Ashwagandha and Brahmi",
      accent: "#0B5D46",
      accentBadge: "bg-[#0B5D46]",
      border: "border-[#0B5D46]/20",
      hoverBorder: "hover:border-[#0B5D46]",
      tagline: isMl ? "ക്ലാസിക്കൽ രസായന ഹെറിറ്റേജ്" : "Classical Rasayana Heritage",
      href: "/kiosk/vedaverse/library?category=Ayurvedic+plant",
    },
    {
      id: "Medicinal plant",
      titleEn: "Medicinal Plants",
      titleMl: "ഔഷധ സസ്യങ്ങൾ",
      descEn:
        "Discover medicinal plants, their traditional contexts and available scientific information — Aloe Vera, Neem, Moringa, Tulsi and more.",
      descMl:
        "കറ്റാർവാഴ, വേപ്പ്, മുരിങ്ങ, തുളസി ഉൾപ്പെടെ 25 ഔഷധ സസ്യങ്ങളുടെ ആധികാരിക വിവരങ്ങൾ.",
      count: medicinalCount,
      image: "/assets/kiosk/categories/medicinal-plants.jpg",
      imageAlt: "Medicinal flora including Aloe vera and Neem",
      accent: "#087F8C",
      accentBadge: "bg-[#087F8C]",
      border: "border-[#087F8C]/20",
      hoverBorder: "hover:border-[#087F8C]",
      tagline: isMl ? "തെറാപ്യൂട്ടിക് ബൊട്ടാണിക്കൽ ഫ്ലോറ" : "Therapeutic Botanical Flora",
      href: "/kiosk/vedaverse/library?category=Medicinal+plant",
    },
    {
      id: "Culinary spice / herb",
      titleEn: "Herbs & Spices",
      titleMl: "സുഗന്ധവ്യഞ്ജനങ്ങളും ഔഷധികളും",
      descEn:
        "Explore Kerala's spice heritage, aromatic herbs and culinary botanicals — Black Pepper, Cardamom, Turmeric, Ginger, Cinnamon and 45 more.",
      descMl:
        "കുരുമുളക്, ഏലം, മഞ്ഞൾ, ഇഞ്ചി, ദാൽചിനി ഉൾപ്പെടെ 50 കേരളീയ/ആഗോള സുഗന്ധവ്യഞ്ജനങ്ങൾ.",
      count: spicesCount,
      image: "/assets/kiosk/categories/spices.jpg",
      imageAlt: "Kerala spices including cardamom, turmeric and black pepper",
      accent: "#C26D00",
      accentBadge: "bg-[#C26D00]",
      border: "border-[#C26D00]/20",
      hoverBorder: "hover:border-[#C26D00]",
      tagline: isMl ? "കേരള & ആഗോള സ്പൈസ് ഹെറിറ്റേജ്" : "Kerala & Global Spice Heritage",
      href: "/kiosk/vedaverse/library?category=Culinary+spice+%2F+herb",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#073B30] flex flex-col font-sans selection:bg-[#55B96A]/20">
      {/* ─── KIOSK SUB HEADER ──────────────────────────────────────────────────── */}
      <KioskSubHeader
        language={language}
        onLanguageChange={handleLanguageChange}
        showLanguageToggle={true}
        currentStepBadge="VedaVerse · 100 Flora Library"
        currentStepBadgeMl="വേദവേഴ്സ് · 100 സസ്യ ലൈബ്രറി"
        backHref="/kiosk"
      />

      {/* ─── HERO SECTION ──────────────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden" style={{ minHeight: "520px" }}>
        {/* Botanical background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/kiosk/categories/vedaverse-botanical-bg.jpg"
            alt="Kerala botanical landscape"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#073B30]/96 via-[#0B5D46]/82 to-[#073B30]/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#073B30]/85 via-transparent to-transparent" />
        </div>

        {/* Kasavu gold accent top band */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent z-10" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 pt-10 pb-16 sm:pt-14 sm:pb-20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
            {/* Left: Content */}
            <div className="flex-1 max-w-2xl space-y-5">
              {/* Section label badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold">
                <Leaf className="w-3.5 h-3.5" />
                <span>
                  {isMl
                    ? "ബയോ-എഐ സസ്യ ജ്ഞാന ലൈബ്രറി"
                    : "BIO-AI BOTANICAL KNOWLEDGE LIBRARY"}
                </span>
              </div>

              {/* Heading */}
              <div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-[#FAFAF7] tracking-tight leading-none">
                  VedaVerse
                </h1>
                <p className="text-xl sm:text-2xl font-bold text-[#D4AF37] mt-1">
                  {isMl
                    ? "ആയുർവേദ, ഔഷധ & സുഗന്ധ സസ്യ ജ്ഞാനം"
                    : "Ayurveda, Herbs & Spices"}
                </p>
              </div>

              {/* Supporting text */}
              <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-xl">
                {isMl
                  ? "കേരള സ്റ്റാർട്ടപ്പ് മിഷന്റെ ബയോ-എഐ സെന്ററിൽ നിന്ന്, 100 ഔഷധ-സുഗന്ധ സസ്യങ്ങളുടെ ആധികാരിക ഡിജിറ്റൽ ശേഖരം."
                  : "Explore traditional plant knowledge, medicinal plants, Kerala's spice heritage and relevant scientific research. 100 documented records curated for Bio-AI Centre of Excellence, Digital Hub, Kochi."}
              </p>

              {/* Stat pills */}
              <div className="flex items-center gap-3 flex-wrap">
                {[
                  { n: ayurvedicCount, label: isMl ? "ആയുർവേദം" : "Ayurvedic", color: "#55B96A" },
                  { n: medicinalCount, label: isMl ? "ഔഷധം" : "Medicinal", color: "#3ABFCC" },
                  { n: spicesCount, label: isMl ? "സുഗന്ധം" : "Spices", color: "#F59E0B" },
                  { n: totalCount, label: isMl ? "ആകെ" : "Total", color: "#D4AF37" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-xl px-3 py-2 border border-white/15"
                  >
                    <span className="text-xl font-black font-mono" style={{ color: stat.color }}>
                      {stat.n}
                    </span>
                    <span className="text-xs font-bold text-white/70 uppercase tracking-wider">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Search bar */}
              <form onSubmit={handleSearch} className="relative max-w-xl">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#55B96A]">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    isMl
                      ? "ഇംഗ്ലീഷ്, മലയാളം അല്ലെങ്കിൽ ശാസ്ത്രനാമം തിരയുക…"
                      : "Search by English, Malayalam or scientific name…"
                  }
                  className="w-full pl-12 pr-28 py-4 rounded-2xl border-2 border-white/20 bg-white/10 backdrop-blur-md text-white placeholder-white/50 text-base font-medium focus:outline-none focus:border-[#D4AF37] focus:bg-white/15 transition-all touch-manipulation"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute inset-y-0 right-[84px] flex items-center px-2 text-white/60 hover:text-white"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 mr-1.5 my-1.5 px-4 rounded-xl bg-[#D4AF37] text-[#073B30] font-bold text-sm hover:bg-[#E8C547] active:scale-95 transition-all touch-manipulation"
                >
                  {isMl ? "തിരയുക" : "Search"}
                </button>
              </form>
            </div>

            {/* Right: Mascot image */}
            <div className="hidden lg:flex shrink-0 items-end justify-center">
              <div className="relative" style={{ width: "288px", height: "340px" }}>
                <div className="absolute -inset-3 rounded-3xl border-2 border-[#D4AF37]/30" />
                <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/assets/kiosk/categories/vedaverse-hero-mascot.jpg"
                    alt="Arogyamithran presenting medicinal plants in Kerala garden"
                    fill
                    className="object-cover object-top"
                    priority
                    sizes="288px"
                  />
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37] text-[#073B30] text-xs font-black shadow-lg whitespace-nowrap">
                  <Sparkles className="w-3.5 h-3.5" />
                  {isMl ? "അരോഗ്യമിത്രൻ · AI ഗൈഡ്" : "Arogyamithran · AI Guide"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Smooth wave into white */}
        <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
          <svg viewBox="0 0 1440 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-10 sm:h-14">
            <path d="M0 56 L0 28 Q360 0 720 28 Q1080 56 1440 28 L1440 56 Z" fill="#FAFAF7" />
          </svg>
        </div>
      </section>

      {/* ─── MAIN CONTENT ──────────────────────────────────────────────────────── */}
      <main className="flex-1 max-w-[1440px] mx-auto w-full px-4 sm:px-8 py-8 sm:py-12 space-y-10">

        {/* Section header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-[#0B5D46] uppercase tracking-widest mb-1">
              {isMl ? "ഒരു വിഭാഗം തിരഞ്ഞെടുക്കുക" : "Browse by Category"}
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-[#073B30]">
              {isMl ? "100 സസ്യ ശേഖരം" : "100 Flora Collection"}
            </h2>
          </div>
          <Link
            href="/kiosk/vedaverse/library"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F0F7F1] text-[#0B5D46] border border-[#0B5D46]/20 text-sm font-bold hover:bg-[#0B5D46] hover:text-white transition-all active:scale-95 touch-manipulation"
          >
            <BookOpen className="w-4 h-4" />
            {isMl ? "എല്ലാം കാണുക" : "View All"}
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Three large category cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {CATEGORY_CARDS.map((card) => (
            <Link
              key={card.id}
              href={card.href}
              className={`group relative bg-white rounded-3xl border-2 ${card.border} ${card.hoverBorder} shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col active:scale-[0.98] touch-manipulation focus:outline-none`}
              aria-label={`Browse ${card.titleEn}, ${card.count} species`}
            >
              {/* Hero image */}
              <div className="relative w-full overflow-hidden" style={{ height: "208px" }}>
                <Image
                  src={card.image}
                  alt={card.imageAlt}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Color gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to top, ${card.accent}ee 0%, ${card.accent}55 45%, transparent 100%)`,
                  }}
                />
                {/* Count badge */}
                <div
                  className="absolute top-3 right-3 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-sm shadow text-xs font-black font-mono"
                  style={{ color: card.accent }}
                >
                  {card.count}{" "}
                  <span className="font-bold opacity-70">{isMl ? "സസ്യം" : "Species"}</span>
                </div>
                {/* Title overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className={`inline-block text-[10px] font-black px-2.5 py-1 rounded-full mb-2 ${card.accentBadge} text-white`}>
                    {card.tagline}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white leading-tight drop-shadow-md">
                    {isMl ? card.titleMl : card.titleEn}
                  </h3>
                </div>
              </div>

              {/* Card body */}
              <div className="flex-1 flex flex-col p-5">
                <p className="text-sm text-[#244B3F]/80 leading-relaxed flex-1">
                  {isMl ? card.descMl : card.descEn}
                </p>

                {/* CTA footer */}
                <div
                  className="mt-4 pt-4 border-t flex items-center justify-between"
                  style={{ borderColor: `${card.accent}20` }}
                >
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: card.accent }}>
                    {isMl ? "ടച്ച് ചെയ്ത് പര്യവേക്ഷണം ചെയ്യൂ" : "Tap to Explore"}
                  </span>
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shrink-0"
                    style={{ backgroundColor: `${card.accent}18` }}
                  >
                    <ArrowRight className="w-4 h-4" style={{ color: card.accent }} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Full library CTA bar */}
        <div className="bg-gradient-to-r from-[#073B30] to-[#0B5D46] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
          <div className="flex-1 text-white space-y-1.5">
            <p className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              {isMl ? "സസ്യ ഡാറ്റാബേസ്" : "Full Plant Database"}
            </p>
            <h3 className="text-xl sm:text-2xl font-black">
              {isMl
                ? "ഇംഗ്ലീഷ്, മലയാളം അല്ലെങ്കിൽ ശാസ്ത്രനാമം അനുസരിച്ച് തിരയൂ"
                : "Search by English, Malayalam or Scientific Name"}
            </h3>
            <p className="text-sm text-white/70">
              {isMl
                ? `${totalCount} സസ്യങ്ങൾ — ഭാഗികമായ പൊരുത്തം, ശാസ്ത്രീയ ഇറ്റാലിക് ഫോർമാറ്റ്`
                : `${totalCount} species with partial-match and scientific name search`}
            </p>
          </div>
          <Link
            href="/kiosk/vedaverse/library"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#D4AF37] text-[#073B30] font-black text-sm hover:bg-[#E8C547] active:scale-95 transition-all shadow-md touch-manipulation shrink-0"
          >
            <Search className="w-4 h-4" />
            {isMl ? "ലൈബ്രറി തുറക്കുക" : "Open Full Library"}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Disclaimer */}
        <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#FFF6E5] border border-[#C26D00]/20 text-xs text-[#7E4300]">
          <span className="text-[#C26D00] mt-0.5 shrink-0">⚠</span>
          <p className="leading-relaxed">
            {isMl
              ? "ഈ ലൈബ്രറി വിദ്യാഭ്യാസ ആവശ്യങ്ങൾക്ക് മാത്രമുള്ളതാണ്. പരമ്പരാഗത ഉപയോഗം ക്ലിനിക്കൽ ഫലപ്രാപ്തി തെളിയിക്കുന്നില്ല."
              : "Educational reference only — not medical advice. Traditional use does not prove clinical effectiveness. Consult a qualified health professional for medical guidance."}
          </p>
        </div>
      </main>

      {/* ─── KIOSK FOOTER ──────────────────────────────────────────────────────── */}
      <KioskFooter language={language} />
    </div>
  );
}
