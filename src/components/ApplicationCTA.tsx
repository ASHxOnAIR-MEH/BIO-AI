"use client";

import { motion } from "framer-motion";

export default function ApplicationCTA() {
  return (
    <section className="py-8 sm:py-16 lg:py-24 px-4 sm:px-10 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto bg-text-primary rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-2xl relative">

        {/* Background glow */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-bio-green blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-deep-green blur-3xl"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-0 relative z-10">

          {/* Left: Who Can Apply */}
          <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16 xl:p-24">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8 }}
              className="text-2xl sm:text-3xl md:text-4xl font-heading font-semibold text-white tracking-tight mb-4 sm:mb-8"
            >
              Who Can Apply?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-base sm:text-lg text-white/80 mb-6 sm:mb-8"
            >
              Bio-AI CoE invites applications from:
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white/90 text-base sm:text-lg lg:text-xl leading-relaxed"
            >
              Startups working on innovative solutions in the Bio-AI domain, particularly those leveraging AI and deep technologies for applications in Ayurveda, spices, biodiversity, biotechnology, and life sciences.
            </motion.p>
          </div>

          {/* Right: CTA — separated by top border on mobile */}
          <div className="flex flex-col justify-center items-start lg:items-end text-left lg:text-right border-t border-white/10 lg:border-t-0 lg:border-l p-8 sm:p-12 lg:p-16 xl:p-24">

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8 }}
              className="mb-6 sm:mb-8"
            >
              <div className="inline-flex flex-col lg:items-end gap-2">
                <span className="inline-block bg-white/10 text-white text-[10px] sm:text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest backdrop-blur-md">
                  Applications Open
                </span>
                <span className="text-bio-green text-xs sm:text-sm font-semibold uppercase tracking-widest">
                  Deadline: 31 August 2026
                </span>
              </div>
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-2xl sm:text-3xl lg:text-5xl font-heading font-semibold text-white leading-tight mb-8 sm:mb-10"
            >
              Build the future of<br/>Bio-AI in Kerala.
            </motion.h3>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full lg:w-auto"
            >
              <a
                href="https://zfrmz.com/Ene770rEwgTw2cP7chBH"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full lg:w-auto inline-flex items-center justify-center px-8 sm:px-10 py-4 sm:py-5 text-sm sm:text-base font-bold text-text-primary bg-bio-green rounded-full hover:bg-white transition-all shadow-[0_0_40px_rgba(111,174,36,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] active:scale-95"
              >
                Apply for Incubation ↗
              </a>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
