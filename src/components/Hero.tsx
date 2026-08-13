"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// ─── Bio-AI CoE Pillars strip ──────────────────────────────────────────────────

const coePillars = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="2"/>
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
      </svg>
    ),
    label: "01 — RESEARCH",
    sub: "Advancing Bio-AI research and deep-tech innovation",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
        <line x1="6" y1="6" x2="6.01" y2="6"/>
        <line x1="6" y1="18" x2="6.01" y2="18"/>
      </svg>
    ),
    label: "02 — INFRASTRUCTURE",
    sub: "Access to compute, GPU infrastructure and advanced facilities",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z"/>
        <path d="M9 21h6"/>
      </svg>
    ),
    label: "03 — EXPERTISE",
    sub: "Domain mentoring connecting AI, biotechnology and life sciences",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="18" cy="5" r="3"/>
        <circle cx="6" cy="12" r="3"/>
        <circle cx="18" cy="19" r="3"/>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
      </svg>
    ),
    label: "04 — ECOSYSTEM",
    sub: "Connecting startups, researchers, institutions and industry",
  },
];

// ─── Hero ─────────────────────────────────────────────────────────────────────

export default function Hero() {
  return (
    <section className="relative w-full bg-offwhite overflow-x-hidden">

      <div className="flex flex-col lg:flex-row w-full min-h-[auto] lg:min-h-[78vh] xl:min-h-[82vh]">

        {/* ── LEFT / TEXT COLUMN ─────────────────────────────────────────── */}
        <div
          className={`
            relative z-10 flex flex-col justify-center
            w-full lg:w-[46%] xl:w-[44%]
            shrink-0
            pt-32 sm:pt-36 lg:pt-36 xl:pt-40
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

          {/* Heading */}
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
          {/* Subtle left-fade only on desktop */}
          <div
            className="absolute inset-y-0 left-0 hidden lg:block pointer-events-none"
            style={{ width: "10%", background: "linear-gradient(to right, #F6F8FC, transparent)" }}
          />
        </motion.div>

      </div>

      {/* ── BIO-AI COE PILLARS STRIP ───────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
        className="px-4 sm:px-8 lg:px-12 pb-8 sm:pb-10 lg:pb-12 pt-4 sm:pt-5"
      >
        <div className="bg-primary rounded-2xl px-5 sm:px-8 lg:px-10 py-5 sm:py-6 shadow-xl border border-white/10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-5 sm:gap-x-6 lg:gap-x-8 sm:gap-y-0">
            {coePillars.map((item) => (
              <div key={item.label} className="flex items-start gap-3">
                {/* Icon bubble */}
                <div className="shrink-0 w-8 h-8 rounded-full bg-blue-bright/15 flex items-center justify-center text-blue-bright mt-0.5">
                  {item.icon}
                </div>
                {/* Text */}
                <div className="min-w-0">
                  <p className="text-[11px] font-bold text-white uppercase tracking-wider leading-none mb-1 select-none">
                    {item.label}
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-white/70 leading-snug select-none">
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
