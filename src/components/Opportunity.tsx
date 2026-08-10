"use client";

import { motion } from "framer-motion";

const steps = [
  {
    title: "Discover",
    description: "Identify high-impact use cases intersecting AI, Ayurveda, biodiversity, and life sciences.",
  },
  {
    title: "Develop",
    description: "Build deep-tech solutions with access to high-performance computing, GPUs, and expert mentoring.",
  },
  {
    title: "Validate",
    description: "Test and validate your solutions with institutional partners, research labs, and industry experts.",
  },
  {
    title: "Commercialise",
    description: "Scale your Bio-AI venture with funding opportunities, market access, and ecosystem support.",
  },
];

export default function Opportunity() {
  return (
    <section id="opportunity" className="py-24 lg:py-32 px-6 sm:px-10 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-semibold text-text-primary tracking-tight">
            The Incubation Opportunity.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div 
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="editorial-card flex flex-col h-full"
            >
              <div className="mb-8">
                <span className="text-xs font-bold text-bio-green tracking-widest uppercase">
                  Phase 0{index + 1}
                </span>
              </div>
              <h3 className="text-2xl font-heading font-semibold text-text-primary mb-4">
                {step.title}
              </h3>
              <p className="text-base text-text-secondary leading-relaxed font-normal mt-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
