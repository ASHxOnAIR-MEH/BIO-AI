"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { INDIA_MAP_LOCATIONS, IndiaMapLocation } from "@/data/ayurvedaHistoryData";
import {
  Compass,
  MapPin,
} from "lucide-react";

interface IndiaHistoryMapProps {
  onNavigateToKeralaHeritage?: () => void;
  isMalayalam?: boolean;
}

export default function IndiaHistoryMap({
  onNavigateToKeralaHeritage,
  isMalayalam = false,
}: IndiaHistoryMapProps) {
  const [selectedLocation, setSelectedLocation] = useState<IndiaMapLocation>(
    INDIA_MAP_LOCATIONS[0]
  );

  const handleSelectLocation = (loc: IndiaMapLocation) => {
    setSelectedLocation(loc);
  };

  return (
    <section
      id="india-historical-map"
      className="relative w-full py-16 sm:py-24 px-4 sm:px-6 md:px-12 bg-gradient-to-b from-[#FAF7EE] via-[#F3EDE2] to-[#FAF7EE] text-[#072820] overflow-hidden select-none"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#0B5D46_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-[#D4AF37]/10 blur-[130px] pointer-events-none" />

      {/* ─── SECTION HEADER ─── */}
      <div className="relative z-10 max-w-4xl mx-auto text-center mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#072820]/10 border border-[#0B5D46]/20 text-[#072820] text-xs font-bold tracking-wider uppercase mb-3">
          <Compass className="w-3.5 h-3.5 text-[#0B5D46]" />
          <span>{isMalayalam ? "ഭാരത ചരിത്ര ഭൂപടം" : "Geographic Lineages & Universities"}</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#072820] tracking-tight">
          {isMalayalam ? "പ്രാചീന ഭാരതത്തിലെ ആയുർവേദ കേന്ദ്രങ്ങൾ" : "Historical Knowledge Centers of India"}
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-[#244B3F]/85 max-w-2xl mx-auto mt-2 font-sans leading-relaxed">
          {isMalayalam
            ? "തക്ഷശില, കാശി, നാലന്ദ എന്നിവ മുതൽ കേരളത്തിന്റെ നിളാനദീ തടം വരെയുള്ള ആധികാരിക ചരിത്ര കേന്ദ്രങ്ങൾ ഭൂപടത്തിൽ സ്പർശിച്ച് കണ്ടെത്തൂ."
            : "From Takshashila and Kashi to Nalanda and the Nila Valley in Kerala — touch any geographic center on the antique map to inspect historical scholarship and documented traditions."}
        </p>
      </div>

      {/* ─── MAIN MAP & DETAIL DOSSIER LAYOUT ─── */}
      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ─── LEFT: INTERACTIVE PARCHMENT MAP CANVAS (7 COLS) ─── */}
        <div className="lg:col-span-7 bg-[#EFE8DA] rounded-3xl p-4 sm:p-6 border-2 border-[#D4AF37]/50 shadow-lg relative overflow-hidden flex flex-col items-center">
          {/* Map Compass Rose Ornament */}
          <div className="absolute top-4 right-4 text-xs font-serif font-bold text-[#7A622A] flex items-center gap-1.5 opacity-80 z-20">
            <Compass className="w-5 h-5 text-[#0B5D46] animate-spin-slow" />
            <span>NORTH ↑</span>
          </div>

          <p className="text-[11px] font-mono uppercase tracking-wider text-[#0B5D46] mb-2 self-start font-bold z-20">
            {isMalayalam ? "ഭൂപടത്തിലെ കേന്ദ്രങ്ങളിൽ സ്പർശിക്കൂ:" : "Touch a Knowledge Center:"}
          </p>

          {/* Authentic Illustrated Map Canvas Representation */}
          <div className="relative w-full max-w-[480px] aspect-[4/5] rounded-2xl border-2 border-[#D4AF37]/50 shadow-inner overflow-hidden">
            {/* Illustrated Map Artwork from Veda Package */}
            <Image
              src="/images/veda/07-india-ayurveda-history-map.jpg"
              alt="Ancient Indian Medical Knowledge Centers Map"
              fill
              className="object-cover object-center opacity-85 select-none"
              sizes="(max-width: 640px) 100vw, 480px"
            />

            {/* Subtle Parchment Overlay */}
            <div className="absolute inset-0 bg-[#FAF7EE]/20 mix-blend-overlay pointer-events-none" />

            {/* Pulsing Interactive Markers for all 8 Locations */}
            {INDIA_MAP_LOCATIONS.map((loc) => {
              const isSelected = selectedLocation.id === loc.id;
              const leftPercent = `${loc.coordinates.x}%`;
              const topPercent = `${loc.coordinates.y}%`;

              return (
                <div
                  key={loc.id}
                  style={{ left: leftPercent, top: topPercent }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  <button
                    type="button"
                    onClick={() => handleSelectLocation(loc)}
                    className="relative flex items-center justify-center p-1 group/marker focus:outline-none"
                    aria-label={`Select ${loc.name}`}
                  >
                    {/* Pulsing Ripple Effect */}
                    <span
                      className={`absolute w-8 h-8 rounded-full ${
                        isSelected
                          ? "bg-[#D4AF37] animate-ping opacity-60"
                          : "bg-[#0B5D46] animate-pulse opacity-40"
                      }`}
                    />

                    {/* Core Pin Icon */}
                    <div
                      className={`relative z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover/marker:scale-125 ${
                        isSelected
                          ? "bg-gradient-to-br from-[#D4AF37] to-[#B38F24] text-[#072820] ring-4 ring-white"
                          : "bg-[#072820] text-[#D4AF37] border-2 border-[#D4AF37]/60 group-hover/marker:bg-[#0B5D46]"
                      }`}
                    >
                      <MapPin className="w-4 h-4" />
                    </div>

                    {/* Location Tooltip Pill */}
                    <span
                      className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap shadow-md pointer-events-none transition-all ${
                        isSelected
                          ? "bg-[#072820] text-[#D4AF37] border border-[#D4AF37]/40 opacity-100 scale-100"
                          : "bg-white/95 text-[#072820] opacity-0 group-hover/marker:opacity-100 group-hover/marker:scale-100"
                      }`}
                    >
                      {loc.name}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>

          <p className="text-[10px] text-gray-500 font-mono mt-3 text-center z-20">
            Coordinates calibrated from verified archaeological and classical manuscript evidence.
          </p>
        </div>

        {/* ─── RIGHT: DETAIL DOSSIER CARD (5 COLS) ─── */}
        <div className="lg:col-span-5 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedLocation.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#D4AF37]/50 shadow-xl space-y-5"
            >
              {/* Card Header */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0B5D46] bg-[#0B5D46]/10 px-2.5 py-0.5 rounded-full">
                    Academic Hub
                  </span>
                  <span className="text-xs font-mono text-gray-500">
                    {selectedLocation.historicalEra}
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#072820]">
                  {selectedLocation.name}
                </h3>
                <p className="text-xs font-serif italic text-[#7A622A]">
                  {selectedLocation.sanskritName} • {selectedLocation.tradition}
                </p>
              </div>

              {/* Historical Context */}
              <div>
                <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-[#072820] mb-1">
                  Historical Context & Academic Standing:
                </h4>
                <p className="text-xs sm:text-sm text-[#244B3F]/90 leading-relaxed font-sans">
                  {selectedLocation.historicalContext}
                </p>
              </div>

              {/* Associated Scholars */}
              <div>
                <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-[#072820] mb-1.5">
                  Prominent Associated Scholars:
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedLocation.associatedScholars.map((sch, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded-full bg-[#FAF7EE] border border-[#0B5D46]/20 text-[#072820] text-xs font-medium"
                    >
                      {sch}
                    </span>
                  ))}
                </div>
              </div>

              {/* Associated Texts */}
              <div>
                <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-[#072820] mb-1.5">
                  Associated Classical Texts:
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedLocation.associatedTexts.map((txt, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded-full bg-[#0B5D46]/10 text-[#0B5D46] text-xs font-bold"
                    >
                      {txt}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verified Reference */}
              <div className="pt-2 border-t border-gray-100 text-[11px] text-[#0B5D46] font-mono">
                Source: {selectedLocation.referenceSource}
              </div>

              {/* Special Action if Kerala Route is selected */}
              {selectedLocation.isKeralaRoute && onNavigateToKeralaHeritage && (
                <div className="pt-3">
                  <button
                    type="button"
                    onClick={onNavigateToKeralaHeritage}
                    className="w-full inline-flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-[#072820] font-serif font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all active:scale-95"
                  >
                    <span>Follow Kerala Ashtavaidya Heritage Route ➔</span>
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
