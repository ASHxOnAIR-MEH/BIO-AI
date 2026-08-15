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
          className="mb-8 sm:mb-16 md:mb-20"
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
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-normal mt-auto text-justify">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── UNIFIED CALL FOR BIO-AI INCUBATION PROGRAM & APPLICATION CARD ──────── */}
        <motion.div
          id="incubation-call"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="bg-primary rounded-[1.5rem] sm:rounded-[2.5rem] p-7 sm:p-12 lg:p-16 text-white shadow-2xl relative overflow-hidden scroll-mt-24 sm:scroll-mt-32"
        >
          {/* Subtle background glow */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute -top-24 -right-24 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-blue-bright blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-blue blur-3xl" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">

            {/* Left Column: Program Description & Who Can Apply */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                {/* Highlighted programme announcement label */}
                <span className="inline-block text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-3 px-3 py-1.5 rounded-full border border-blue-bright/40 bg-blue-bright/15 text-blue-bright">
                  CALL FOR BIO-AI INCUBATION PROGRAM
                </span>
                <h3 className="text-[clamp(1.75rem,5vw,3rem)] font-heading font-semibold text-white tracking-tight mb-4 leading-tight">
                  Build the future of Bio-AI
                </h3>
                <p className="text-sm sm:text-base lg:text-lg text-white/85 leading-relaxed font-normal text-justify">
                  The Bio-AI Incubation Program is designed to support startups developing innovative solutions at the intersection of Artificial Intelligence, biotechnology, Ayurveda, spices, biodiversity, and life sciences.
                </p>
              </div>

              <div className="pt-2 border-t border-white/10">
                <h4 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider mb-3">
                  Who Can Apply?
                </h4>
                <p className="text-xl sm:text-2xl font-bold text-blue-bright tracking-wider uppercase">
                  STARTUPS
                </p>
              </div>
            </div>

            {/* Right Column: Application Deadline & CTA Box */}
            <div className="lg:col-span-5">
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-6 sm:p-8 flex flex-col items-start lg:items-center text-left lg:text-center space-y-6">
                <span className="inline-block bg-blue-bright/20 text-blue-bright border border-blue-bright/30 text-[10px] sm:text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
                  APPLICATIONS OPEN
                </span>

                <div className="space-y-1 w-full">
                  <span className="text-[10px] sm:text-xs font-semibold text-white/70 uppercase tracking-widest block">
                    APPLICATION DEADLINE
                  </span>
                  <span className="text-2xl sm:text-3xl font-bold text-white block">
                    10 SEPTEMBER 2026
                  </span>
                </div>

                <a
                  href="https://zfrmz.com/Ene770rEwgTw2cP7chBH"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center px-6 sm:px-8 py-4 text-sm font-bold text-white bg-blue-bright hover:bg-white hover:text-primary transition-all rounded-full shadow-[0_0_30px_rgba(59,130,246,0.35)] active:scale-95 touch-manipulation min-h-[52px]"
                >
                  APPLY FOR BIO-AI INCUBATION ↗
                </a>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
