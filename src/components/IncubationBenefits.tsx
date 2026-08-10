"use client";

import { motion } from "framer-motion";

const benefits = [
  {
    id: "01",
    title: "Infrastructure",
    description: "Access to India's first Bio-AI CoE compute & GPU infrastructure.",
  },
  {
    id: "02",
    title: "Expertise",
    description: "Expert domain mentoring bridging Life Sciences and Artificial Intelligence.",
  },
  {
    id: "03",
    title: "Network",
    description: "Extensive industry and institutional linkages for validation and growth.",
  },
  {
    id: "04",
    title: "Acceleration",
    description: "Specialized incubation and acceleration programs tailored for Bio-AI startups.",
  },
  {
    id: "05",
    title: "Capital",
    description: "Tailored funding pathways for early-stage and growth-stage ventures.",
  }
];

export default function IncubationBenefits() {
  return (
    <section className="py-24 lg:py-32 px-6 sm:px-10 lg:px-12 bg-offwhite border-y border-gray-200">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
          
          <div className="lg:col-span-5">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="sticky top-32"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-semibold text-text-primary tracking-tight mb-6">
                What you get.
              </h2>
              <p className="text-lg text-text-secondary leading-relaxed font-normal">
                We provide the critical resources needed to turn complex biology into scalable technology.
              </p>
            </motion.div>
          </div>

          <div className="lg:col-span-7 space-y-0">
            {benefits.map((benefit, index) => (
              <motion.div 
                key={benefit.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group flex gap-6 md:gap-8 py-10 border-b border-gray-200 last:border-0"
              >
                <div className="text-xl md:text-2xl font-semibold text-text-secondary/50 group-hover:text-bio-green transition-colors mt-0.5">
                  {benefit.id}
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-heading font-semibold text-text-primary mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-base md:text-lg text-text-secondary font-normal max-w-lg">
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
