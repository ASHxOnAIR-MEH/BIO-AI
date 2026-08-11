"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const domains = [
  {
    id: "01",
    title: "Ayurveda",
    description: "AI and deep-tech applications across Ayurveda.",
    image: "/images/new_ayurveda.jpg",
  },
  {
    id: "02",
    title: "Spices",
    description: "AI and deep-tech innovation, value addition and technology development in the spices sector.",
    image: "/images/image3.jpg",
  },
];

export default function FocusAreas() {
  return (
    <section id="domains" className="py-16 sm:py-24 lg:py-32 px-5 sm:px-10 lg:px-12 bg-offwhite overflow-hidden">
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="mb-10 sm:mb-16 md:mb-20 text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-semibold text-text-primary tracking-tight mb-4 sm:mb-6 uppercase">
            Two domains.<br />One intelligence layer.
          </h2>
          <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto">
            Uniting deep technologies with Kerala's core ecosystem strengths.
          </p>
        </motion.div>

        {/* 2-Card Asymmetric Layout */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
          {domains.map((domain, index) => (
            <motion.div
              key={domain.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative group overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] shadow-lg
                h-[300px] sm:h-[400px] lg:h-[480px]
                ${index === 0 ? 'md:col-span-3' : 'md:col-span-2'}`}
            >
              <Image
                src={domain.image}
                alt={domain.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

              <div className="absolute inset-0 p-6 sm:p-10 lg:p-12 flex flex-col justify-between text-white">
                <div className="w-10 h-10 sm:w-14 sm:h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-sm sm:text-base font-bold border border-white/30">
                  {domain.id}
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-semibold mb-2 sm:mb-4">
                    {domain.title}
                  </h3>
                  <p className="text-sm sm:text-base lg:text-lg text-white/90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500 leading-snug max-w-sm">
                    {domain.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
