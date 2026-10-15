"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { PlantRecord } from "../types";
import {
  formatMalayalamName,
  getCategoryVisuals,
} from "@/lib/vedaverseEngine";
import BotanicalGlyph from "./BotanicalGlyph";

interface PlantCardProps {
  plant: PlantRecord;
  isMl?: boolean;
}

export default function PlantCard({ plant, isMl = false }: PlantCardProps) {
  const visuals = getCategoryVisuals(plant.category);
  const mlInfo = formatMalayalamName(plant.common_name_ml);

  return (
    <Link
      href={`/kiosk/vedaverse/${plant.id}`}
      className="group relative bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border-2 border-[#0B5D46]/15 hover:border-[#55B96A] active:border-[#0B5D46] shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between active:scale-[0.985] touch-manipulation focus:outline-none focus:ring-2 focus:ring-[#55B96A]/50 overflow-hidden min-h-[300px]"
      aria-label={`View botanical monograph for ${plant.common_name_en} (${plant.scientific_name})`}
    >
      {/* Top right botanical ambient glow */}
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-bl-full pointer-events-none transition-opacity duration-300 opacity-30 group-hover:opacity-70"
        style={{
          background:
            plant.category === "Ayurvedic plant"
              ? "radial-gradient(circle at top right, rgba(11, 93, 70, 0.25), transparent 70%)"
              : plant.category === "Medicinal plant"
              ? "radial-gradient(circle at top right, rgba(8, 127, 140, 0.25), transparent 70%)"
              : "radial-gradient(circle at top right, rgba(194, 109, 0, 0.25), transparent 70%)",
        }}
      />

      {/* Card Header: Specimen ID + Category Badge */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#F0F7F1] text-[#073B30] border border-[#0B5D46]/15">
              {plant.id}
            </span>
            <span
              className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${visuals.badgeBg} ${visuals.badgeText} ${visuals.badgeBorder}`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              {isMl ? visuals.labelMl : visuals.labelEn}
            </span>
          </div>

          {/* Botanical glyph */}
          <div className="shrink-0 group-hover:scale-110 transition-transform duration-200">
            <BotanicalGlyph category={plant.category} size="sm" />
          </div>
        </div>

        {/* English Common Name */}
        <h3 className="text-lg sm:text-xl font-bold text-[#073B30] group-hover:text-[#0B5D46] transition-colors leading-snug tracking-tight">
          {plant.common_name_en}
        </h3>

        {/* Malayalam Name */}
        <div className="mt-1 flex items-center gap-1.5">
          {mlInfo.isVerified ? (
            <p className="text-sm font-semibold text-[#0B5D46] tracking-wide">
              {mlInfo.displayText}
            </p>
          ) : (
            <span className="text-[11px] text-[#78350F] bg-[#FEF3C7] px-2 py-0.5 rounded font-medium">
              {mlInfo.displayText}
            </span>
          )}
        </div>

        {/* Scientific Botanical Name (Strictly Italicized) */}
        <p className="text-xs sm:text-sm italic font-serif text-[#244B3F]/90 mt-2 font-medium">
          {plant.scientific_name}
        </p>

        {/* Quick Specs: Family & Part Used */}
        <div className="mt-4 pt-3 border-t border-[#0B5D46]/10 flex flex-wrap gap-2 text-xs">
          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F8FAF8] text-[#244B3F] border border-[#0B5D46]/10 font-medium">
            <span className="text-[10px] text-[#244B3F]/60 uppercase font-bold tracking-wider">
              {isMl ? "കുടുംബം:" : "Family:"}
            </span>
            <span>{plant.family}</span>
          </div>

          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F8FAF8] text-[#244B3F] border border-[#0B5D46]/10 font-medium truncate max-w-[200px]">
            <span className="text-[10px] text-[#244B3F]/60 uppercase font-bold tracking-wider">
              {isMl ? "ഭാഗം:" : "Part:"}
            </span>
            <span className="truncate">{plant.plant_part_or_spice_part}</span>
          </div>
        </div>

        {/* Safety excerpt note */}
        <div className="mt-3 text-[11px] text-[#244B3F]/75 line-clamp-2 leading-relaxed">
          {plant.traditional_or_general_context}
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="mt-5 pt-3.5 border-t border-[#0B5D46]/10 flex items-center justify-between">
        <span className="text-xs font-bold text-[#0B5D46] group-hover:text-[#073B30] flex items-center gap-1.5 transition-colors">
          <Sparkles className="w-3.5 h-3.5 text-[#55B96A]" />
          {isMl ? "വിശദാംശങ്ങൾ കാണുക" : "View Full Monograph"}
        </span>

        <div className="w-8 h-8 rounded-full bg-[#F0F7F1] group-hover:bg-[#0B5D46] text-[#073B30] group-hover:text-white flex items-center justify-center transition-all duration-200 shrink-0">
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
