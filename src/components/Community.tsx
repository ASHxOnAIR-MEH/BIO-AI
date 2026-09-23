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
        {/* Kerala Bio-AI Background Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="rounded-[1.5rem] sm:rounded-[2.5rem] p-7 sm:p-12 lg:p-16 text-white shadow-2xl relative overflow-hidden bg-[#0A2164]"
        >
          {/* Responsive Kerala Bio-AI Background Image */}
          <Image
            src="/images/community-bg.png"
            alt=""
            fill
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 95vw, 1280px"
            className="object-cover object-center pointer-events-none select-none"
            aria-hidden="true"
          />

          {/* Responsive Gradient Overlays for Maximum Readability & Scenery Visibility */}
          {/* Mobile Overlay: Balanced top-to-bottom tint */}
          <div
            className="absolute inset-0 pointer-events-none lg:hidden"
            style={{
              background:
                "linear-gradient(180deg, rgba(6, 21, 58, 0.85) 0%, rgba(6, 21, 58, 0.60) 55%, rgba(6, 21, 58, 0.25) 100%)",
            }}
          />

          {/* Desktop Overlay: Left-to-right gradient protecting text while showcasing Kerala scenery on the right */}
          <div
            className="absolute inset-0 pointer-events-none hidden lg:block"
            style={{
              background:
                "linear-gradient(90deg, rgba(6, 21, 58, 0.84) 0%, rgba(6, 21, 58, 0.58) 48%, rgba(6, 21, 58, 0.20) 100%)",
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center relative z-10">
            {/* Left Column: Community Details & Content */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                {/* KSUM-inspired Orange Accent Eyebrow Pill */}
                <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-4 px-3.5 py-1.5 rounded-full border border-orange-400/50 bg-black/40 backdrop-blur-md text-orange-400 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                  JOIN OUR COMMUNITY
                </span>

                <h2 className="text-[clamp(1.75rem,5vw,3rem)] font-heading font-semibold text-white tracking-tight leading-tight mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
                  Be part of Kerala&apos;s Bio-AI revolution
                </h2>

                <p className="text-sm sm:text-base lg:text-lg text-white/95 leading-relaxed font-normal text-justify drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]">
                  Join a thriving ecosystem of innovators, researchers, clinicians, founders, and industry leaders working at the convergence of Artificial Intelligence, biology, and deep technology.
                </p>
              </div>

              {/* Highlight Perks with solid glassmorphism */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-2">
                {communityHighlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl flex flex-col justify-between shadow-lg"
                    style={{
                      background: "rgba(6, 21, 58, 0.72)",
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                      border: "1px solid rgba(255, 255, 255, 0.20)",
                    }}
                  >
                    <div className="w-2 h-2 rounded-full bg-orange-400 mb-2 shadow-[0_0_8px_rgba(255,107,0,0.8)]" />
                    <h3 className="text-xs sm:text-sm font-semibold text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-white/85 leading-relaxed">
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
