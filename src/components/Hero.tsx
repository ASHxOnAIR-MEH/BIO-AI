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
            
            {/* Removed subtitle to avoid repetition with Navbar */}

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="text-5xl md:text-6xl lg:text-[76px] font-heading font-semibold text-text-primary leading-[1.05] mb-6 tracking-tight"
            >
              Intelligence<br/>inspired by nature.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-lg md:text-xl text-text-secondary mb-10 leading-relaxed font-normal max-w-xl"
            >
              Building the next generation of Bio-AI innovation by bringing artificial intelligence and deep technologies together with Kerala's strengths in biodiversity, spices, Ayurveda and life sciences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-12"
            >
              <a
                href="https://zfrmz.com/Ene770rEwgTw2cP7chBH"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-white transition-colors bg-bio-green rounded-full hover:bg-deep-green shadow-lg shadow-bio-green/20"
              >
                Apply for Incubation ↗
              </a>
              <a
                href="#about"
                className="inline-flex items-center px-2 text-sm font-semibold text-text-primary hover:text-bio-green transition-colors"
              >
                Explore the Programme ↓
              </a>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6"
            >
              <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm w-max">
                 <span className="w-2 h-2 rounded-full bg-bio-green animate-pulse"></span>
                 <span className="text-[10px] sm:text-xs font-bold text-text-primary uppercase tracking-wider">CALL FOR APPLICATIONS</span>
              </div>
              <span className="text-[10px] sm:text-xs font-semibold text-text-secondary uppercase tracking-widest">
                Deadline: 31 AUGUST 2026
              </span>
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

      {/* Credibility Strip */}
      <section className="border-y border-gray-200 bg-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
          <p className="text-center text-xs font-semibold text-text-secondary uppercase tracking-widest mb-10">
            An Ecosystem Initiative Backed By
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20 lg:gap-24">
            <div className="relative w-48 h-24">
              <Image src="/ksum-logo.png" alt="Kerala Startup Mission" fill className="object-contain" />
            </div>
            <div className="relative w-40 h-16">
              <Image src="/kerala-it.png" alt="Kerala IT" fill className="object-contain" />
            </div>
            <div className="relative w-40 h-16">
              <Image src="/meity.png" alt="MeitY" fill className="object-contain" />
            </div>
            <div className="relative w-40 h-16">
              <Image src="/india-ai.png" alt="IndiaAI" fill className="object-contain" />
            </div>
            <div className="relative w-40 h-16">
              <Image src="/digital-india.png" alt="Digital India" fill className="object-contain" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
