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
                CALL FOR BIO-AI INCUBATION PROGRAM
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[76px] font-heading font-semibold text-text-primary leading-[1.05] mb-5 sm:mb-6 tracking-tight"
            >
              Build the future<br/>of Bio-AI.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-base sm:text-lg md:text-xl text-text-secondary mb-3 sm:mb-4 leading-relaxed font-normal max-w-xl"
            >
              The Bio-AI Incubation Program is designed to support startups developing innovative solutions at the intersection of Artificial Intelligence, biotechnology, Ayurveda, spices, biodiversity, and life sciences.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="text-base sm:text-lg md:text-xl text-text-primary mb-6 sm:mb-8 leading-relaxed font-medium max-w-xl"
            >
              Selected startups receive incubation support at Bio-AI CoE, Digital Hub, Kochi.
            </motion.p>

            {/* Pillars row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="w-full max-w-xl mb-6 sm:mb-8"
            >
              <div className="h-px w-full bg-gray-200 mb-4 sm:mb-5"></div>
              <div className="flex items-center justify-between gap-2 text-[10px] sm:text-xs md:text-sm font-semibold text-text-primary uppercase tracking-wider text-center">
                <span className="flex-1">Technology<br/>Development</span>
                <span className="text-bio-green text-base leading-none">•</span>
                <span className="flex-1">Validation</span>
                <span className="text-bio-green text-base leading-none">•</span>
                <span className="flex-1">Commercialisation</span>
              </div>
              <div className="h-px w-full bg-gray-200 mt-4 sm:mt-5"></div>
            </motion.div>

            {/* Deadline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              className="flex flex-col mb-6 sm:mb-8"
            >
              <span className="text-[10px] sm:text-xs font-semibold text-text-secondary uppercase tracking-widest mb-1">
                APPLICATION DEADLINE
              </span>
              <span className="text-xl sm:text-2xl font-bold text-text-primary">
                31 AUGUST 2026
              </span>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              <a
                href="https://zfrmz.com/Ene770rEwgTw2cP7chBH"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full sm:w-auto px-7 sm:px-8 py-4 text-sm font-semibold text-white transition-colors bg-bio-green rounded-full hover:bg-deep-green shadow-lg shadow-bio-green/20 active:scale-95"
              >
                APPLY FOR BIO-AI INCUBATION ↗
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
