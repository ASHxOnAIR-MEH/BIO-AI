"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const criteria = [
  "Startups innovating in Bio-AI (across Ayurveda, Spices, Biodiversity, Life Sciences, etc.).",
  "Deep-tech ventures leveraging AI for biological and healthcare solutions.",
  "Researchers and entrepreneurs with scalable Bio-AI ideas."
];

export default function ApplicationCTA() {
  return (
    <section className="py-24 lg:py-32 px-6 sm:px-10 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto bg-text-primary rounded-[3rem] overflow-hidden shadow-2xl relative">
        
        {/* Abstract Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-bio-green blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-deep-green blur-3xl"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 p-12 lg:p-24 relative z-10">
          
          {/* Left Column: Who Can Apply */}
          <div className="flex flex-col justify-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-4xl font-heading font-semibold text-white tracking-tight mb-8"
            >
              Who Can Apply?
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-lg text-white/80 mb-8"
            >
              Bio-AI CoE invites applications from:
            </motion.p>
            
            <ul className="space-y-6">
              {criteria.map((item, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.2 + (index * 0.1) }}
                  className="flex items-start gap-4"
                >
                  <CheckCircle2 className="w-6 h-6 text-bio-green shrink-0 mt-0.5" />
                  <span className="text-white/90 text-base lg:text-lg leading-relaxed">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
          
          {/* Right Column: CTA */}
          <div className="flex flex-col justify-center items-start lg:items-end text-left lg:text-right border-t lg:border-t-0 lg:border-l border-white/10 pt-12 lg:pt-0 lg:pl-16">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="inline-flex flex-col lg:items-end gap-2">
                <span className="inline-block bg-white/10 text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest backdrop-blur-md">
                  Applications Open
                </span>
                <span className="text-bio-green text-sm font-semibold uppercase tracking-widest">
                  Deadline: 31 August 2026
                </span>
              </div>
            </motion.div>
            
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-3xl lg:text-5xl font-heading font-semibold text-white leading-tight mb-10"
            >
              Build the future of <br/> Bio-AI in Kerala.
            </motion.h3>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <a
                href="https://zfrmz.com/Ene770rEwgTw2cP7chBH"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-10 py-5 text-base font-bold text-text-primary bg-bio-green rounded-full hover:bg-white transition-all shadow-[0_0_40px_rgba(111,174,36,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)]"
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
