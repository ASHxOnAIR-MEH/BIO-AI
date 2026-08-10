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
  {
    id: "03",
    title: "Biodiversity",
    description: "AI-enabled innovation connected to biodiversity.",
    image: "/images/new_biodiversity.jpg",
  },
  {
    id: "04",
    title: "Biotechnology",
    description: "AI and deep technologies applied to biotechnology.",
    image: "/images/new_biotechnology.jpg",
  },
  {
    id: "05",
    title: "Life Sciences",
    description: "AI applications across life-science innovation and research.",
    image: "/images/new_lifescience.jpg",
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-semibold text-text-primary tracking-tight mb-4 sm:mb-6">
            Five domains.<br />One intelligence layer.
          </h2>
          <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto">
            Uniting deep technologies with Kerala's core ecosystem strengths.
          </p>
        </motion.div>

        {/* Mobile: stacked cards with horizontal scroll feel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {domains.map((domain, index) => (
            <motion.div
              key={domain.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className={`relative group overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] shadow-lg
                h-[220px] sm:h-[300px] lg:h-[380px]
                ${index === 0 ? 'sm:col-span-2 lg:col-span-2' : 'col-span-1'}`}
            >
              <Image
                src={domain.image}
                alt={domain.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

              <div className="absolute inset-0 p-5 sm:p-8 flex flex-col justify-between text-white">
                <div className="w-9 h-9 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-xs sm:text-sm font-bold border border-white/30">
                  {domain.id}
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-heading font-semibold mb-1 sm:mb-3">
                    {domain.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500 leading-snug max-w-xs">
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
