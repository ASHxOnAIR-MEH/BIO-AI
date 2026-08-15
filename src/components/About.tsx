"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// ─── Bio-AI CoE Pillars — now displayed inside About ─────────────────────────

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

export default function About() {
  return (
    <section id="about" className="py-14 sm:py-20 lg:py-28 px-5 sm:px-8 lg:px-12 bg-white scroll-mt-24 sm:scroll-mt-32">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">

          {/* ── Text — left on desktop, first on mobile ──────────────────── */}
          <div className="order-1 flex flex-col justify-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.75 }}
              className="font-heading font-semibold text-text-primary leading-tight tracking-tight mb-5 sm:mb-7"
              style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
            >
              Where biology meets intelligence
            </motion.h2>

            <div className="space-y-4 sm:space-y-5 text-sm sm:text-base lg:text-[1.02rem] text-text-secondary leading-relaxed font-normal max-w-lg">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-justify"
              >
                The Bio-AI Centre of Excellence (Bio-AI CoE) is a flagship initiative of the Kerala Startup Mission under the Department of Electronics &amp; Information Technology, Government of Kerala.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.18 }}
                className="text-justify"
              >
                The project has been sanctioned by the Ministry of Electronics &amp; Information Technology (MeitY), Government of India, under the IndiaAI Mission – Startup Financing Pillar.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.26 }}
                className="text-justify"
              >
                Bio-AI CoE is a cross-domain initiative combining artificial intelligence with Kerala&apos;s distinctive strengths in biodiversity, spices, and Ayurveda to enable innovation, research, and entrepreneurship.
              </motion.p>
            </div>

            {/* ── Four Capability Cards ──────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.34 }}
              className="mt-8 sm:mt-10"
            >
              <div className="bg-primary rounded-2xl px-5 sm:px-6 py-5 sm:py-6 shadow-xl border border-white/10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5 sm:gap-x-5 sm:gap-y-6">
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
          </div>

          {/* ── Image — right on desktop, below text on mobile ───────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.0, ease: "easeOut" }}
            className="order-2 relative w-full rounded-2xl sm:rounded-[1.75rem] overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.09)]"
            style={{ height: "clamp(240px, 45vw, 640px)" }}
          >
            <Image
              src="/images/new_hero.jpg"
              alt="Bio-AI visual representing the intersection of biology and artificial intelligence"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover hover:scale-[1.03] transition-transform duration-1000"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
