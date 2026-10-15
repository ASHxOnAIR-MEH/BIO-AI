"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { PlantRecord } from "../types";
import {
  formatMalayalamName,
  getCategoryVisuals,
  getPlantThumbnail,
} from "@/lib/vedaverseEngine";
import BotanicalGlyph from "./BotanicalGlyph";

interface PlantCardProps {
  plant: PlantRecord;
  isMl?: boolean;
}

export default function PlantCard({ plant, isMl = false }: PlantCardProps) {
  const visuals = getCategoryVisuals(plant.category);
  const mlInfo = formatMalayalamName(plant.common_name_ml);
  const thumbnail = getPlantThumbnail(plant);

  return (
    <Link
      href={`/kiosk/vedaverse/${plant.id}`}
      className="group relative bg-white rounded-2xl sm:rounded-3xl border-2 border-[#0B5D46]/15 hover:border-[#55B96A] active:border-[#0B5D46] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between active:scale-[0.985] touch-manipulation focus:outline-none focus:ring-2 focus:ring-[#55B96A]/50 overflow-hidden"
      aria-label={`View botanical monograph for ${plant.common_name_en} (${plant.scientific_name})`}
    >
      {/* ─── Card Visual Banner ──────────────────────────────────────────────── */}
      <div className="relative w-full h-40 sm:h-44 bg-[#073B30] overflow-hidden">
        <Image
          src={thumbnail.src}
          alt={thumbnail.alt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Gradients over image for high readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#073B30]/90 via-[#073B30]/30 to-transparent" />

        {/* Top Badges Floating Over Image */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
          <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-sm text-[#073B30] border border-white/40 shadow-xs">
            {plant.id}
          </span>

          <span
            className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md bg-white/90 ${visuals.badgeText} border border-white/40 shadow-xs`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            {isMl ? visuals.labelMl : visuals.labelEn}
          </span>
        </div>

        {/* Floating Botanical Glyph in bottom-right of image */}
        <div className="absolute bottom-2.5 right-3 z-10 shrink-0 p-1.5 rounded-xl bg-white/80 backdrop-blur-md border border-white/50 shadow-sm group-hover:scale-110 transition-transform duration-300">
          <BotanicalGlyph category={plant.category} size="sm" />
        </div>
      </div>

      {/* ─── Card Body ───────────────────────────────────────────────────────── */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
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

          {/* Excerpt context note */}
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

          <div className="w-8 h-8 rounded-full bg-[#F0F7F1] group-hover:bg-[#0B5D46] text-[#073B30] group-hover:text-white flex items-center justify-center transition-all duration-200 shrink-0 shadow-2xs">
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}
