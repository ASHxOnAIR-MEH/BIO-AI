"use client";

import React from "react";
import { VedaVerseCategory } from "../types";

interface BotanicalGlyphProps {
  category: VedaVerseCategory;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function BotanicalGlyph({
  category,
  className = "",
  size = "md",
}: BotanicalGlyphProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  }[size];

  if (category === "Ayurvedic plant") {
    return (
      <svg
        className={`${sizeClasses} ${className}`}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="32" cy="32" r="30" fill="#0B5D46" fillOpacity="0.08" />
        <circle cx="32" cy="32" r="29" stroke="#0B5D46" strokeOpacity="0.2" strokeWidth="1.5" strokeDasharray="3 3" />
        {/* Classical Ayurvedic Leaf and Rasayana Sprout */}
        <path
          d="M32 12C21 21 16 33 22 46C24 50 28 53 32 54C36 53 40 50 42 46C48 33 43 21 32 12Z"
          fill="#0B5D46"
          fillOpacity="0.18"
          stroke="#0B5D46"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* Central rib */}
        <path d="M32 14V52" stroke="#0B5D46" strokeWidth="2" strokeLinecap="round" />
        {/* Secondary veins */}
        <path d="M32 24C28 27 25 31 23 36" stroke="#0B5D46" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M32 24C36 27 39 31 41 36" stroke="#0B5D46" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M32 34C28 37 26 41 25 45" stroke="#0B5D46" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M32 34C36 37 38 41 39 45" stroke="#0B5D46" strokeWidth="1.5" strokeLinecap="round" />
        {/* Golden Herbarium Accent Dot */}
        <circle cx="32" cy="12" r="2.5" fill="#55B96A" />
      </svg>
    );
  }

  if (category === "Medicinal plant") {
    return (
      <svg
        className={`${sizeClasses} ${className}`}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="32" cy="32" r="30" fill="#087F8C" fillOpacity="0.08" />
        <circle cx="32" cy="32" r="29" stroke="#087F8C" strokeOpacity="0.2" strokeWidth="1.5" strokeDasharray="3 3" />
        {/* Medicinal Blossom & Molecular Node */}
        <path
          d="M32 20C28 14 20 16 20 23C20 30 32 38 32 38C32 38 44 30 44 23C44 16 36 14 32 20Z"
          fill="#087F8C"
          fillOpacity="0.18"
          stroke="#087F8C"
          strokeWidth="2"
        />
        {/* Stem and Rootlets */}
        <path d="M32 38V52" stroke="#087F8C" strokeWidth="2" strokeLinecap="round" />
        <path d="M32 44C27 46 24 50 22 52" stroke="#087F8C" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M32 47C37 49 40 51 42 52" stroke="#087F8C" strokeWidth="1.5" strokeLinecap="round" />
        {/* Molecular Hex Nodes */}
        <circle cx="20" cy="23" r="2.5" fill="#087F8C" />
        <circle cx="44" cy="23" r="2.5" fill="#087F8C" />
        <circle cx="32" cy="26" r="2" fill="#55B96A" />
      </svg>
    );
  }

  // Culinary spice / herb
  return (
    <svg
      className={`${sizeClasses} ${className}`}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="32" cy="32" r="30" fill="#C26D00" fillOpacity="0.08" />
      <circle cx="32" cy="32" r="29" stroke="#C26D00" strokeOpacity="0.2" strokeWidth="1.5" strokeDasharray="3 3" />
      {/* Spice Seed Pod / Cardamom capsule & Anise cluster */}
      <path
        d="M32 14C23 20 21 34 26 44C29 49 35 51 38 49C44 44 45 28 38 18C36 15 34 14 32 14Z"
        fill="#C26D00"
        fillOpacity="0.18"
        stroke="#C26D00"
        strokeWidth="2"
      />
      <path d="M32 14C31 24 33 36 37 48" stroke="#C26D00" strokeWidth="1.8" strokeLinecap="round" />
      {/* Seed dots */}
      <circle cx="28" cy="32" r="2" fill="#C26D00" />
      <circle cx="34" cy="27" r="2" fill="#C26D00" />
      <circle cx="32" cy="38" r="2" fill="#C26D00" />
      <circle cx="32" cy="14" r="2.5" fill="#F59E0B" />
    </svg>
  );
}
