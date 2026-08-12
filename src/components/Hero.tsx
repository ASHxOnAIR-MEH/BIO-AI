"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// ─── Journey strip ────────────────────────────────────────────────────────────

const journey = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22C6.5 22 2 17.5 2 12S6.5 2 12 2s10 4.5 10 10"/><path d="M12 6v6l4 2"/><circle cx="19" cy="5" r="3" fill="currentColor" stroke="none"/>
      </svg>
    ),
    label: "INNOVATE",
    sub: "Build deep-tech bio-AI solutions",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/>
      </svg>
    ),
    label: "INCUBATE",
    sub: "Access infrastructure & mentorship",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 3H5a2 2 0 0 0-2 2v4"/><path d="M9 3h10a2 2 0 0 1 2 2v10"/><path d="M3 9v10a2 2 0 0 0 2 2h10"/><circle cx="15" cy="15" r="3"/>
      </svg>
    ),
    label: "VALIDATE",
    sub: "Collaborate with labs & experts",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="22,7 13.5,15.5 8.5,10.5 2,17"/><polyline points="16,7 22,7 22,13"/>
      </svg>
    ),
    label: "COMMERCIALISE",
    sub: "Scale with funding & ecosystem",
  },
];

// ─── Hero ─────────────────────────────────────────────────────────────────────

export default function Hero() {
  return (
    <section className="relative w-full bg-offwhite overflow-x-hidden">

      {/*
       * ── HERO MAIN AREA ─────────────────────────────────────────────────────
       *
       * Desktop (xl+):
       *   Flex row — text left ~45%, image right ~55%
       *   Navbar on desktop is ~88px tall (logo h-16 + py-4 × 2).
       *   padding-top on the text column must be ≥ navbar height + breathing room.
       *   We use pt-28 on xl (112px) which safely clears the ~88px navbar.
       *
       * Tablet (lg–xl):
       *   Same flex-row but slightly less pt.
       *
       * Mobile (< lg):
       *   Stacked: text block first, then image below, then journey strip.
       *   Mobile navbar is ~88px (KSUM row ~48px + logo row ~28px + py-3 ~12px).
       *   pt-24 (96px) on mobile safely clears it.
       */}

      <div className="flex flex-col lg:flex-row w-full min-h-[auto] lg:min-h-[78vh] xl:min-h-[82vh]">

        {/* ── LEFT / TEXT COLUMN ─────────────────────────────────────────── */}
        <div
          className={`
            relative z-10 flex flex-col justify-center
            w-full lg:w-[46%] xl:w-[44%]
            shrink-0
            pt-24 sm:pt-28 lg:pt-32 xl:pt-36
            pb-8 sm:pb-10 lg:pb-14
            px-5 sm:px-8 lg:px-12 xl:px-14
          `}
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="flex items-center gap-2.5 mb-3 sm:mb-4"
          >
            <span className="w-5 h-[2px] bg-bio-green shrink-0" />
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.16em] text-bio-green uppercase select-none">
              KERALA STARTUP MISSION · DIGITAL HUB, KOCHI
            </span>
          </motion.div>

          {/* Heading: "BIO-AI CENTRE OF" black / "EXCELLENCE" green */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: "easeOut" }}
            className="font-heading font-bold uppercase leading-[1.0] tracking-tight mb-4 sm:mb-5 select-none"
            style={{ fontSize: "clamp(2.4rem, 5.8vw, 5.2rem)" }}
          >
            <span className="block text-text-primary">BIO-AI CENTRE OF</span>
            <span className="block text-bio-green">EXCELLENCE</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: "easeOut" }}
            className="text-sm sm:text-[0.95rem] lg:text-base text-text-secondary leading-relaxed font-normal max-w-[340px] sm:max-w-[400px] mb-6 sm:mb-8"
          >
            Bringing artificial intelligence and deep technologies together with Kerala&apos;s strengths in biodiversity, spices, Ayurveda and life sciences to enable innovation, research and entrepreneurship.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3, ease: "easeOut" }}
          >
            <a
              href="#incubation-call"
              className="inline-flex items-center justify-center w-full sm:w-auto px-7 py-3.5 text-sm font-bold text-text-primary bg-white border border-gray-300 rounded-full hover:border-bio-green hover:text-bio-green transition-colors shadow-sm active:scale-95 touch-manipulation select-none"
            >
              BIO-AI INCUBATION PROGRAM ↗
            </a>
          </motion.div>
        </div>

        {/* ── RIGHT / IMAGE COLUMN ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.1, ease: "easeOut" }}
          className="
            relative flex-1
            w-full
            h-[55vw] sm:h-[48vw] lg:h-auto
            min-h-[220px] lg:min-h-0
          "
        >
          <Image
            src="/images/digital-hub-hero.jpg"
            alt="Kerala Startup Mission Digital Hub, Kochi"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover object-[55%_center]"
          />
          {/* Subtle left-fade only on desktop — keeps building fully visible */}
          <div
            className="absolute inset-y-0 left-0 hidden lg:block pointer-events-none"
            style={{ width: "10%", background: "linear-gradient(to right, #F4F4F1, transparent)" }}
          />
        </motion.div>

      </div>

      {/* ── JOURNEY STRIP ─────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
        className="px-4 sm:px-8 lg:px-12 pb-8 sm:pb-10 lg:pb-12 pt-4 sm:pt-5"
      >
        <div className="bg-text-primary rounded-2xl px-5 sm:px-8 lg:px-10 py-5 sm:py-6">
          {/*
           * Mobile: 2 × 2 grid
           * Desktop: 4-column row
           */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-5 sm:gap-x-6 sm:gap-y-0">
            {journey.map((item) => (
              <div key={item.label} className="flex items-start gap-3">
                {/* Icon bubble */}
                <div className="shrink-0 w-8 h-8 rounded-full bg-bio-green/15 flex items-center justify-center text-bio-green mt-0.5">
                  {item.icon}
                </div>
                {/* Text */}
                <div className="min-w-0">
                  <p className="text-[11px] font-bold text-white uppercase tracking-wider leading-none mb-1 select-none">
                    {item.label}
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-white/55 leading-snug select-none">
                    {item.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

    </section>
  );
}
