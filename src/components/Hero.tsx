"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <>
      <section className="relative pt-32 lg:pt-40 pb-16 px-6 sm:px-10 lg:px-12 max-w-7xl mx-auto overflow-hidden">
        
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-7 flex flex-col justify-center relative z-10">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-4 flex items-center space-x-3"
            >
              <div className="w-8 h-[2px] bg-bio-green"></div>
              <span className="text-xs md:text-sm font-semibold tracking-widest text-bio-green uppercase">
                CALL FOR BIO-AI INCUBATION PROGRAM
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="text-5xl md:text-6xl lg:text-[76px] font-heading font-semibold text-text-primary leading-[1.05] mb-6 tracking-tight"
            >
              Build the future<br/>of Bio-AI.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-lg md:text-xl text-text-secondary mb-4 leading-relaxed font-normal max-w-xl"
            >
              The Bio-AI Incubation Program is designed to support startups developing innovative solutions at the intersection of Artificial Intelligence, biotechnology, Ayurveda, spices, biodiversity, and life sciences.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="text-lg md:text-xl text-text-primary mb-8 leading-relaxed font-medium max-w-xl"
            >
              Selected startups receive incubation support at Bio-AI CoE, Digital Hub, Kochi.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="w-full max-w-xl mb-8"
            >
              <div className="h-px w-full bg-gray-300 mb-6"></div>
              <div className="flex flex-col sm:flex-row justify-between items-center text-sm md:text-base font-semibold text-text-primary uppercase tracking-wider space-y-4 sm:space-y-0 text-center sm:text-left">
                <span>Technology<br className="hidden sm:block"/>Development</span>
                <span className="hidden sm:block text-bio-green">•</span>
                <span>Validation</span>
                <span className="hidden sm:block text-bio-green">•</span>
                <span>Commercialisation</span>
              </div>
              <div className="h-px w-full bg-gray-300 mt-6"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              className="flex flex-col mb-8"
            >
              <span className="text-[10px] sm:text-xs font-semibold text-text-secondary uppercase tracking-widest mb-1">
                APPLICATION DEADLINE
              </span>
              <span className="text-xl sm:text-2xl font-bold text-text-primary">
                31 AUGUST 2026
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
            >
              <a
                href="https://zfrmz.com/Ene770rEwgTw2cP7chBH"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-white transition-colors bg-bio-green rounded-full hover:bg-deep-green shadow-lg shadow-bio-green/20"
              >
                APPLY FOR BIO-AI INCUBATION ↗
              </a>
            </motion.div>

          </div>

          {/* Right Column: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5 relative lg:-mr-12 xl:-mr-24 z-0 mt-12 lg:mt-0"
          >
            {/* The asymmetric rounded container inspired by the reference design */}
            <div className="relative w-full aspect-[4/5] rounded-[3rem] rounded-tr-none overflow-hidden shadow-2xl">
              <Image 
                src="/images/new_hero.jpg" 
                alt="Bio-AI Neural Network" 
                fill
                priority
                className="object-cover hover:scale-105 transition-transform duration-1000"
              />
            </div>
          </motion.div>
          
        </div>
      </section>

          
    </>
  );
}
