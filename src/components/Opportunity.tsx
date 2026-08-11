"use client";

import { motion } from "framer-motion";

const steps = [
  {
    label: "Phase 01",
    title: "Discover",
    description: (
      <>
        <span className="font-semibold text-text-primary block mb-1">Pre-Incubation</span>
        Identify high-impact use cases intersecting AI, Ayurveda, biodiversity, and life sciences.
      </>
    ),
  },
  {
    label: "Phase 02",
    title: "Develop",
    description: (
      <>
        <span className="font-semibold text-text-primary block mb-1">Incubation</span>
        Build deep-tech solutions with access to high-performance computing, GPUs, and expert mentoring.
      </>
    ),
  },
  {
    label: "Phase 03",
    title: "Validate",
    description: "Test and validate your solutions with institutional partners, research labs, and industry experts.",
  },
  {
    label: "Phase 04",
    title: "Commercialise",
    description: "Scale your Bio-AI venture with funding opportunities, market access, and ecosystem support.",
  },
];

export default function Opportunity() {
  return (
    <section id="opportunity" className="py-16 sm:py-24 lg:py-32 px-5 sm:px-10 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="mb-10 sm:mb-16 md:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-semibold text-text-primary tracking-tight">
            The Incubation Opportunity.
          </h2>
        </motion.div>

        {/* 1-col on mobile, 2-col on tablet, 4-col on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-16 sm:mb-24 lg:mb-32">
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
                <span className="text-[10px] sm:text-xs font-bold text-bio-green tracking-widest uppercase">
                  {step.label}
                </span>
              </div>
              <h3 className="text-lg sm:text-2xl font-heading font-semibold text-text-primary mb-2 sm:mb-4">
                {step.title}
              </h3>
              <p className="text-xs sm:text-base text-text-secondary leading-relaxed font-normal mt-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Incubation Highlight Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="bg-gray-50/80 border border-gray-100 rounded-[2rem] sm:rounded-[2.5rem] p-8 sm:p-12 md:p-16"
        >
          <h2 className="text-[10px] sm:text-xs font-bold text-bio-green tracking-widest uppercase mb-4">
            CALL FOR BIO-AI INCUBATION PROGRAM
          </h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-heading font-semibold text-text-primary tracking-tight mb-6">
            Build the future of Bio-AI.
          </h3>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-normal max-w-2xl mb-4">
            The Bio-AI Incubation Program is designed to support startups developing innovative solutions at the intersection of Artificial Intelligence, biotechnology, Ayurveda, spices, biodiversity, and life sciences.
          </p>
          <p className="text-base sm:text-lg text-text-primary font-medium max-w-2xl mb-8">
            Selected startups receive incubation support at Bio-AI CoE, Digital Hub, Kochi.
          </p>

          {/* Programme Journey */}
          <div className="w-full max-w-xl mb-8">
            <div className="h-px w-full bg-gray-200 mb-4 sm:mb-5"></div>
            <div className="flex items-center justify-between gap-2 text-[10px] sm:text-xs md:text-sm font-semibold text-text-primary uppercase tracking-wider text-center">
              <span className="flex-1">Technology<br/>Development</span>
              <span className="text-bio-green text-base leading-none">•</span>
              <span className="flex-1">Validation</span>
              <span className="text-bio-green text-base leading-none">•</span>
              <span className="flex-1">Commercialisation</span>
            </div>
            <div className="h-px w-full bg-gray-200 mt-4 sm:mt-5"></div>
          </div>

          {/* Deadline */}
          <div className="flex flex-col mb-8">
            <span className="text-[10px] sm:text-xs font-semibold text-text-secondary uppercase tracking-widest mb-1">
              APPLICATION DEADLINE
            </span>
            <span className="text-xl sm:text-2xl font-bold text-text-primary">
              31 AUGUST 2026
            </span>
          </div>

          {/* CTA */}
          <div>
            <a
              href="https://zfrmz.com/Ene770rEwgTw2cP7chBH"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full sm:w-auto px-7 sm:px-8 py-4 text-sm font-bold text-white transition-colors bg-bio-green rounded-full hover:bg-deep-green shadow-lg shadow-bio-green/20 active:scale-95"
            >
              APPLY FOR BIO-AI INCUBATION ↗
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
