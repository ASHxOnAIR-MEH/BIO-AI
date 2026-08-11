"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <>
      <section className="relative pt-28 sm:pt-32 lg:pt-40 pb-12 sm:pb-16 px-5 sm:px-10 lg:px-12 max-w-7xl mx-auto overflow-hidden">

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-7 flex flex-col justify-center relative z-10">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-4 flex items-center space-x-3"
            >
              <div className="w-6 sm:w-8 h-[2px] bg-bio-green shrink-0"></div>
              <span className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-widest text-bio-green uppercase leading-tight">
                KERALA STARTUP MISSION · DIGITAL HUB, KOCHI
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-heading font-semibold text-text-primary leading-[1.05] mb-5 sm:mb-6 tracking-tight uppercase"
            >
              BIO-AI CENTRE OF EXCELLENCE
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-xl sm:text-2xl md:text-3xl text-text-primary font-medium mb-4 sm:mb-5 leading-tight"
            >
              Intelligence inspired by nature.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="text-base sm:text-lg md:text-xl text-text-secondary mb-8 sm:mb-10 leading-relaxed font-normal max-w-xl"
            >
              Bringing artificial intelligence and deep technologies together with Kerala's strengths in biodiversity, spices, Ayurveda and life sciences to enable innovation, research and entrepreneurship.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5"
            >
              <a
                href="#about"
                className="inline-flex items-center justify-center w-full sm:w-auto px-7 sm:px-8 py-4 text-sm font-bold text-white transition-colors bg-text-primary rounded-full hover:bg-bio-green shadow-lg active:scale-95"
              >
                EXPLORE THE BIO-AI CoE ↓
              </a>
              <a
                href="#opportunity"
                className="inline-flex items-center justify-center w-full sm:w-auto px-7 sm:px-8 py-4 text-sm font-bold text-text-primary bg-white border border-gray-200 transition-colors rounded-full hover:border-bio-green hover:text-bio-green shadow-sm active:scale-95"
              >
                BIO-AI INCUBATION PROGRAM ↗
              </a>
            </motion.div>

          </div>

          {/* Right Column: Image — hidden on small screens to keep hero clean */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5 relative lg:-mr-12 xl:-mr-24 z-0 hidden sm:block mt-8 lg:mt-0"
          >
            <div className="relative w-full aspect-[4/5] rounded-[2.5rem] sm:rounded-[3rem] rounded-tr-none overflow-hidden shadow-2xl">
              <Image
                src="/images/new_hero.jpg"
                alt="Bio-AI Neural Network"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 42vw"
                className="object-cover hover:scale-105 transition-transform duration-1000"
              />
            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
}
