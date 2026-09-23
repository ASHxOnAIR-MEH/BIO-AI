"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfrzu4jrRD17m7w-nH5AQjcz6wZ-bBM-WNVA3rqolXHRDMLOw/viewform";

const communityHighlights = [
  {
    title: "Ecosystem Collaboration",
    description: "Connect with startups, researchers, and institutions across Bio-AI, Ayurveda, spices, and life sciences.",
  },
  {
    title: "Knowledge & Innovation",
    description: "Access curated expert sessions, deep-tech discussions, compute resources, and collaborative pilots.",
  },
  {
    title: "Workshops & Initiatives",
    description: "Stay informed about upcoming incubation calls, challenge grants, and ecosystem meetups.",
  },
];

export default function Community() {
  return (
    <section
      id="community"
      className="py-14 sm:py-20 lg:py-28 px-5 sm:px-10 lg:px-12 bg-offwhite scroll-mt-24 sm:scroll-mt-32"
    >
      <div className="max-w-7xl mx-auto">
        {/* Navy Container with KSUM-inspired orange accents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="bg-primary rounded-[1.5rem] sm:rounded-[2.5rem] p-7 sm:p-12 lg:p-16 text-white shadow-2xl relative overflow-hidden"
        >
          {/* Subtle background ambient glow */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute -top-24 -right-24 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-blue-bright blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-[#FF6B00] blur-3xl opacity-30" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center relative z-10">
            {/* Left Column: Community Details & Content */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                {/* KSUM-inspired Orange Accent Eyebrow Pill */}
                <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-4 px-3.5 py-1.5 rounded-full border border-orange-400/40 bg-orange-500/15 text-orange-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                  JOIN OUR COMMUNITY
                </span>

                <h2 className="text-[clamp(1.75rem,5vw,3rem)] font-heading font-semibold text-white tracking-tight leading-tight mb-4">
                  Be part of Kerala&apos;s Bio-AI revolution
                </h2>

                <p className="text-sm sm:text-base lg:text-lg text-white/85 leading-relaxed font-normal text-justify">
                  Join a thriving ecosystem of innovators, researchers, clinicians, founders, and industry leaders working at the convergence of Artificial Intelligence, biology, and deep technology.
                </p>
              </div>

              {/* Highlight Perks */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-2">
                {communityHighlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm flex flex-col justify-between"
                  >
                    <div className="w-2 h-2 rounded-full bg-orange-400 mb-2" />
                    <h3 className="text-xs sm:text-sm font-semibold text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-white/70 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Clean White QR Card */}
            <div className="lg:col-span-5 flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="w-full max-w-[360px] bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl text-center flex flex-col items-center border border-gray-100/90"
              >
                {/* Small Label Above QR */}
                <span className="text-[11px] sm:text-xs font-bold tracking-widest text-primary uppercase mb-4 block">
                  SCAN TO JOIN
                </span>

                {/* Scannable QR Container with generous quiet zone on pure white */}
                <a
                  href={GOOGLE_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Scan or tap to open Bio-AI Community Registration Google Form"
                  title="Open Bio-AI Community Registration Form"
                  className="group relative block bg-white p-3 sm:p-4 rounded-xl border border-gray-200/80 shadow-sm transition-all hover:shadow-md hover:border-blue/30 active:scale-[0.99] touch-manipulation"
                >
                  <Image
                    src="/images/community-qr.png"
                    alt="Scan QR code to join the Bio-AI Community"
                    width={200}
                    height={200}
                    priority
                    className="w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                  {/* Subtle hover prompt on desktop */}
                  <span className="sr-only">Open Google Form in a new tab</span>
                </a>

                {/* Supporting Text Below QR */}
                <p className="text-xs sm:text-sm font-medium text-text-secondary mt-3 sm:mt-4 leading-snug">
                  Scan the QR code to join the Bio-AI Community
                </p>

                {/* Alternative CTA Button below QR */}
                <a
                  href={GOOGLE_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 w-full inline-flex items-center justify-center px-6 py-3.5 text-xs sm:text-sm font-bold text-white bg-[#FF6B00] hover:bg-[#E05D00] rounded-full transition-all shadow-[0_4px_18px_rgba(255,107,0,0.32)] hover:shadow-[0_6px_24px_rgba(255,107,0,0.45)] active:scale-95 touch-manipulation min-h-[48px]"
                >
                  JOIN THE BIO-AI COMMUNITY ↗
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
