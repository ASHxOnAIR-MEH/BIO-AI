"use client";

import { motion } from "framer-motion";
import Image from "next/image";

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
              Where biology meets intelligence.
            </motion.h2>

            <div className="space-y-4 sm:space-y-5 text-sm sm:text-base lg:text-[1.02rem] text-text-secondary leading-relaxed font-normal max-w-lg">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                The Bio-AI Centre of Excellence (Bio-AI CoE) is a flagship initiative of the Kerala Startup Mission under the Department of Electronics &amp; Information Technology, Government of Kerala.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.18 }}
              >
                The project has been sanctioned by the Ministry of Electronics &amp; Information Technology (MeitY), Government of India, under the IndiaAI Mission – Startup Financing Pillar.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.26 }}
              >
                Bio-AI CoE is a cross-domain initiative combining artificial intelligence with Kerala&apos;s distinctive strengths in biodiversity, spices, and Ayurveda to enable innovation, research, and entrepreneurship.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.34 }}
              >
                The CoE provides startups with access to incubation support, compute and GPU infrastructure, specialised mentoring, industry and institutional linkages, and funding opportunities to accelerate the development and commercialisation of Bio-AI solutions.
              </motion.p>
            </div>
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
