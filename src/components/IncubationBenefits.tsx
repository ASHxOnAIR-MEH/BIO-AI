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
    <section className="py-14 sm:py-20 lg:py-24 px-5 sm:px-10 lg:px-12 bg-offwhite border-y border-gray-200/80">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-8 sm:mb-12 max-w-3xl"
        >
          <h2 className="text-[clamp(1.85rem,5vw,3.25rem)] font-heading font-semibold text-text-primary tracking-tight mb-3">
            What you get
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-text-secondary leading-relaxed font-normal text-justify">
            We provide the critical resources needed to turn complex biology into scalable technology.
          </p>
        </motion.div>

        {/* 5-Item Compact Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="group p-6 sm:p-7 rounded-2xl bg-white border border-gray-200/80 hover:border-blue/30 shadow-[0_4px_20px_rgba(10,33,100,0.03)] hover:shadow-[0_8px_30px_rgba(27,77,155,0.08)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs sm:text-sm font-bold text-blue-bright tracking-widest uppercase">
                    {benefit.id}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-blue/20 group-hover:bg-blue transition-colors" />
                </div>
                <h3 className="text-lg sm:text-xl font-heading font-semibold text-text-primary mb-2 group-hover:text-blue transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-normal">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
