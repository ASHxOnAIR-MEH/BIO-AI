"use client";

import { motion } from "framer-motion";

const benefits = [
  {
    id: "01",
    title: "Infrastructure",
    description: "Compute & GPU Infrastructure through KSUM and partner institutions",
  },
  {
    id: "02",
    title: "Expertise",
    description: "Specialised mentoring and technical guidance",
  },
  {
    id: "03",
    title: "Network",
    description: "Extensive industry and institutional linkages for validation and growth.",
  },
  {
    id: "04",
    title: "Incubation",
    description: "Incubation at Bio-AI CoE, Digital Hub, Kochi",
  },
  {
    id: "05",
    title: "Capital",
    description: "Tailored funding pathways for early-stage and growth-stage ventures.",
  },
];

export default function IncubationBenefits() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 px-5 sm:px-10 lg:px-12 bg-offwhite border-y border-gray-200">
      <div className="max-w-7xl mx-auto">

        <div className="grid lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-24">

          {/* Sticky heading — stacks on top on mobile */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8 }}
              className="lg:sticky lg:top-32"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-semibold text-text-primary tracking-tight mb-3 sm:mb-6">
                What you get.
              </h2>
              <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-normal">
                We provide the critical resources needed to turn complex biology into scalable technology.
              </p>
            </motion.div>
          </div>

          {/* Benefits list */}
          <div className="lg:col-span-7 space-y-0">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: index * 0.08 }}
                className="group flex gap-4 sm:gap-6 md:gap-8 py-6 sm:py-8 lg:py-10 border-b border-gray-200 last:border-0"
              >
                <div className="text-lg sm:text-xl md:text-2xl font-semibold text-text-secondary/40 group-hover:text-bio-green transition-colors mt-0.5 shrink-0 w-8">
                  {benefit.id}
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-heading font-semibold text-text-primary mb-1 sm:mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg text-text-secondary font-normal max-w-lg">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
