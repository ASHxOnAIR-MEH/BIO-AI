"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-16 sm:py-24 lg:py-32 px-5 sm:px-10 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 lg:gap-24 items-center">

          {/* Image — shows first on mobile for visual impact */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="order-1 lg:order-2 relative h-[260px] sm:h-[380px] md:h-[500px] lg:h-[700px] w-full rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
          >
            <Image
              src="/images/image4.jpg"
              alt="Kerala Biodiversity Ecosystem"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover hover:scale-105 transition-transform duration-1000"
            />
          </motion.div>

          {/* Text Content */}
          <div className="order-2 lg:order-1 flex flex-col justify-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8 }}
              className="text-3xl sm:text-4xl md:text-5xl font-heading font-semibold text-text-primary mb-6 sm:mb-8 leading-tight tracking-tight"
            >
              Where biology meets intelligence.
            </motion.h2>

            <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-text-secondary leading-relaxed font-normal">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                The Bio-AI Centre of Excellence (Bio-AI CoE) is a flagship initiative of the Kerala Startup Mission under the Department of Electronics & Information Technology, Government of Kerala.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                The project has been sanctioned by the Ministry of Electronics & Information Technology (MeitY), Government of India, under the IndiaAI Mission – Startup Financing Pillar.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Bio-AI CoE is a cross-domain initiative combining artificial intelligence with Kerala's distinctive strengths in biodiversity, spices, and Ayurveda to enable innovation, research, and entrepreneurship.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                The CoE provides startups with access to incubation support, compute and GPU infrastructure, specialised mentoring, industry and institutional linkages, and funding opportunities to accelerate the development and commercialisation of Bio-AI solutions.
              </motion.p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
