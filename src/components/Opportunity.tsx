"use client";

import { motion } from "framer-motion";

const steps = [
  {
    label: "PHASE 01 — PRE-INCUBATION",
    title: "Discover",
    description: "Identify high-impact use cases intersecting AI, Ayurveda, spices, biodiversity, and life sciences.",
  },
  {
    label: "PHASE 02 — INCUBATION",
    title: "Develop",
    description: "Build deep-tech solutions with access to high-performance computing, GPUs, and expert mentoring.",
  },
  {
    label: "PHASE 03 — INCUBATION",
    title: "Validate",
    description: "Test and validate your solutions with institutional partners, research labs, and industry experts.",
  },
  {
    label: "PHASE 04 — GRADUATION",
    title: "Commercialise",
    description: "Scale your Bio-AI venture with funding opportunities, market access, and ecosystem support.",
  },
];

export default function Opportunity() {
  return (
    <section id="opportunity" className="py-14 sm:py-24 lg:py-32 px-5 sm:px-10 lg:px-12 bg-white scroll-mt-24 sm:scroll-mt-32">
      <div className="max-w-7xl mx-auto">

        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="mb-6 sm:mb-8 md:mb-10"
        >
          <h2 className="text-[clamp(1.75rem,6vw,3.5rem)] font-heading font-semibold text-text-primary tracking-tight">
            The Incubation Opportunity
          </h2>
        </motion.div>

        {/* Phase cards — 1-col mobile, 2-col tablet, 4-col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-20 lg:mb-24">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="editorial-card flex flex-col h-full"
            >
              <div className="mb-4 sm:mb-8">
                <span className="text-[10px] sm:text-xs font-bold text-blue-bright tracking-widest uppercase">
                  {step.label}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-heading font-semibold text-text-primary mb-2 sm:mb-4">
                {step.title}
              </h3>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-normal mt-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── CALL FOR BIO-AI INCUBATION — STATUS STRIP (OPEN) ──────────────────── */}
        <motion.div
          id="incubation-call"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl relative scroll-mt-24 sm:scroll-mt-32"
          style={{
            background: "linear-gradient(135deg, #073B30 0%, #0B5D46 45%, #0a4a37 100%)",
          }}
        >
          {/* Decorative glows */}
          <div className="absolute -right-16 -top-16 w-72 h-72 bg-green-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-emerald-300/8 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 p-6 sm:p-8 lg:p-10">
            {/* Top row — badge + deadline */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-green-500/20 text-green-300 border border-green-400/35">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                NOW OPEN
              </span>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-400/15 border border-amber-400/30">
                <svg className="w-3.5 h-3.5 text-amber-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span className="text-[11px] sm:text-xs font-bold text-amber-200 uppercase tracking-wider">
                  Deadline: 30 November 2026
                </span>
              </div>
            </div>

            {/* Main content */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-10">
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-heading font-bold text-white tracking-tight mb-3 leading-tight">
                  BIO-AI INCUBATION APPLICATIONS{" "}
                  <span className="text-green-400">ARE NOW OPEN</span>
                </h3>
                <p className="text-sm sm:text-base text-white/75 leading-relaxed max-w-2xl">
                  Applications are open for the current Bio-AI incubation cohort. Submit your application before the deadline and become part of the Bio-AI innovation ecosystem.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 w-full sm:w-auto lg:w-auto">
                <a
                  href="https://zfrmz.com/Ene770rEwgTw2cP7chBH"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold text-white bg-green-500 hover:bg-green-400 rounded-full transition-all shadow-lg shadow-green-900/30 active:scale-95 touch-manipulation min-h-[48px] whitespace-nowrap"
                >
                  Apply for Incubation →
                </a>
                <a
                  href="#community"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-white/80 hover:text-white bg-white/8 hover:bg-white/15 border border-white/20 rounded-full transition-all active:scale-95 touch-manipulation min-h-[48px] whitespace-nowrap"
                >
                  Join Community ↓
                </a>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
