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

        {/* ── CALL FOR BIO-AI INCUBATION — STATUS STRIP (CURRENTLY CLOSED) ──────── */}
        <motion.div
          id="incubation-call"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="bg-primary border border-blue-bright/30 rounded-2xl sm:rounded-3xl p-5 sm:p-7 lg:px-9 text-white shadow-xl relative overflow-hidden scroll-mt-24 sm:scroll-mt-32"
          style={{
            background: "linear-gradient(90deg, #0A2164 0%, #0F2D80 50%, #0A2164 100%)",
          }}
        >
          {/* Subtle accent glow */}
          <div className="absolute -right-12 -top-12 w-48 h-48 bg-blue-bright/15 rounded-full blur-2xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-5 text-center md:text-left relative z-10">
            <div className="flex flex-col sm:flex-row items-center sm:items-start md:items-center gap-3.5 sm:gap-5">
              <span className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-red-500/20 text-red-300 border border-red-400/35">
                <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                CLOSED
              </span>
              <div>
                <h3 className="text-base sm:text-lg lg:text-xl font-heading font-semibold text-white tracking-tight">
                  CALL FOR BIO-AI INCUBATION IS CURRENTLY <span className="text-red-400 font-bold">CLOSED</span>
                </h3>
                <p className="text-xs sm:text-sm text-white/75 mt-1">
                  Applications for the current cohort are closed. Join our community to get notified for upcoming rounds and challenges.
                </p>
              </div>
            </div>

            <a
              href="#community"
              className="shrink-0 inline-flex items-center justify-center px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-blue-bright/25 hover:bg-blue-bright border border-blue-bright/50 hover:border-blue-bright rounded-full transition-all shadow-sm active:scale-95 touch-manipulation min-h-[44px]"
            >
              Join Community for Updates ↓
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
