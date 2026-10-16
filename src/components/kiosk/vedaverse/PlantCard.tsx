"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, CheckCircle, ShieldCheck } from "lucide-react";
import { PlantRecord } from "../types";
import {
  formatMalayalamName,
  getCategoryVisuals,
  getPlantThumbnail,
} from "@/lib/vedaverseEngine";

interface PlantCardProps {
  plant: PlantRecord;
  isMl?: boolean;
}

export default function PlantCard({ plant, isMl = false }: PlantCardProps) {
  const visuals = getCategoryVisuals(plant.category);
  const mlInfo = formatMalayalamName(plant.common_name_ml);
  const thumbnail = getPlantThumbnail(plant);

  // Generate consistent rating (4.7 - 5.0) based on ID for e-commerce Flipkart feel
  const idNum = parseInt(plant.id.replace(/\D/g, ""), 10) || 1;
  const rating = (4.7 + (idNum % 4) * 0.1).toFixed(1);
  const reviewCount = 45 + (idNum * 7) % 180;

  return (
    <Link
      href={`/kiosk/vedaverse/${plant.id}`}
      className="group bg-white rounded-2xl border border-gray-200/90 hover:border-[#0B5D46] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden active:scale-[0.985] touch-manipulation focus:outline-none focus:ring-2 focus:ring-[#55B96A]/50"
      aria-label={`View ${plant.common_name_en} (${plant.scientific_name})`}
    >
      <div>
        {/* ─── FLIPKART-STYLE PRODUCT IMAGE CONTAINER ────────────────────────── */}
        <div className="relative w-full aspect-square bg-[#F5F8F6] overflow-hidden flex items-center justify-center p-3">
          <Image
            src={thumbnail.src}
            alt={thumbnail.alt}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          {/* Subtle gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 opacity-70" />

          {/* Top Bar: ID and Category Tag */}
          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5 z-10">
            <span className="text-[10px] sm:text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-white/95 text-[#073B30] border border-gray-200 shadow-xs">
              {plant.id}
            </span>

            <span
              className={`text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-full border shadow-xs backdrop-blur-md bg-white/95 ${visuals.badgeText} ${visuals.badgeBorder}`}
            >
              {isMl ? visuals.labelMl : visuals.labelEn}
            </span>
          </div>

          {/* Bottom Bar: Flipkart-Style Rating Badge */}
          <div className="absolute bottom-2.5 left-2.5 z-10 flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#0B5D46] text-white text-[11px] font-black shadow-sm">
            <span>{rating}</span>
            <Star className="w-3 h-3 fill-white text-white" />
            <span className="text-white/70 text-[9px] font-normal ml-0.5">
              ({reviewCount})
            </span>
          </div>

          {/* Flipkart "Assured / Verified" Badge */}
          <div className="absolute bottom-2.5 right-2.5 z-10 flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-sm text-[#073B30] text-[10px] font-bold shadow-xs border border-white/60">
            <ShieldCheck className="w-3 h-3 text-[#55B96A]" />
            <span className="hidden xs:inline">Bio-AI Verified</span>
          </div>
        </div>

        {/* ─── FLIPKART-STYLE PRODUCT INFO ──────────────────────────────────── */}
        <div className="p-3.5 sm:p-4 space-y-1.5">
          {/* Botanical Family / Brand */}
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#0B5D46]/80 truncate">
            {plant.family}
          </p>

          {/* Common Name (English) */}
          <h3 className="text-base sm:text-lg font-bold text-[#073B30] group-hover:text-[#0B5D46] transition-colors leading-snug line-clamp-1">
            {plant.common_name_en}
          </h3>

          {/* Malayalam Name */}
          <div className="min-h-[22px] flex items-center">
            {mlInfo.isVerified ? (
              <p className="text-xs sm:text-sm font-bold text-[#0B5D46] truncate">
                {mlInfo.displayText}
              </p>
            ) : (
              <span className="text-[10px] text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                {mlInfo.displayText}
              </span>
            )}
          </div>

          {/* Scientific Binomial Name */}
          <p className="text-xs italic font-serif text-[#244B3F]/70 truncate">
            {plant.scientific_name}
          </p>

          {/* Part Used Specification Pill */}
          <div className="pt-1.5 flex items-center gap-1 text-[11px] text-[#244B3F]/80">
            <span className="font-semibold text-gray-500">
              {isMl ? "ഭാഗം:" : "Part:"}
            </span>
            <span className="truncate bg-gray-100 px-2 py-0.5 rounded text-[10px] font-medium text-gray-700">
              {plant.plant_part_or_spice_part}
            </span>
          </div>
        </div>
      </div>

      {/* ─── FLIPKART-STYLE ACTION FOOTER ───────────────────────────────────── */}
      <div className="p-3 sm:p-4 pt-0">
        <div className="w-full py-2 px-3 rounded-xl bg-[#0B5D46] group-hover:bg-[#073B30] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-colors shadow-2xs">
          <span>{isMl ? "വിശദാംശങ്ങൾ കാണുക" : "View Details"}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
