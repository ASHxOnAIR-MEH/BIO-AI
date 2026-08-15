"use client";

import { motion } from "framer-motion";
import Image from "next/image";

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
            className="text-sm sm:text-[0.95rem] lg:text-base text-text-secondary leading-relaxed font-normal max-w-[340px] sm:max-w-[400px] mb-6 sm:mb-8 text-justify"
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

    </section>
  );
}
