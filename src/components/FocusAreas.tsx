"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const domains = [
  {
    id: "01",
    title: "Ayurveda",
    description: "AI and deep-tech applications across Ayurveda.",
    image: "/images/new_ayurveda.jpg",
    hasImage: true,
  },
  {
    id: "02",
    title: "Spices",
    description: "AI and deep-tech innovation, value addition and technology development in the spices sector.",
    image: "/images/image3.jpg",
    hasImage: true,
  },
  {
    id: "03",
    title: "Biodiversity",
    description: "AI-enabled innovation connected to biodiversity.",
    image: "/images/new_biodiversity.jpg",
    hasImage: true,
  },
  {
    id: "04",
    title: "Biotechnology",
    description: "AI and deep technologies applied to biotechnology.",
    image: "/images/new_biotechnology.jpg",
    hasImage: true,
  },
  {
    id: "05",
    title: "Life Sciences",
    description: "AI applications across life-science innovation and research.",
    image: "/images/new_lifescience.jpg",
    hasImage: true,
  },
];

export default function FocusAreas() {
  return (
    <section id="focus-areas" className="py-24 lg:py-32 px-6 sm:px-10 lg:px-12 bg-offwhite overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20 md:mb-32"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-semibold text-text-primary tracking-tight">
            Five domains.<br />One intelligence layer.
          </h2>
        </motion.div>

        <div className="space-y-24 md:space-y-32">
          {domains.map((domain, index) => (
            <div 
              key={domain.id} 
              className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-10 md:gap-16 lg:gap-24`}
            >
              
              {/* Visual Side */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: 0.1 }}
                className="w-full md:w-1/2 relative aspect-square md:aspect-[4/5] lg:aspect-square rounded-[2rem] overflow-hidden shadow-xl"
              >
                {domain.hasImage ? (
                  <Image 
                    src={domain.image!} 
                    alt={domain.title} 
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-1000"
                  />
                ) : (
                  <div className={`w-full h-full ${domain.color} p-12 flex flex-col justify-between`}>
                    <div className="w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white animate-ping"></div>
                    </div>
                    <div className="space-y-4">
                      <div className="h-px w-full bg-white/20"></div>
                      <div className="h-px w-3/4 bg-white/20"></div>
                      <div className="h-px w-1/2 bg-white/20"></div>
                    </div>
                  </div>
                )}
                
                {/* ID Badge overlapping the image */}
                <div className={`absolute top-6 ${index % 2 !== 0 ? 'right-6' : 'left-6'} bg-white px-4 py-2 rounded-full shadow-sm`}>
                  <span className="text-xs font-bold text-text-primary">DOMAIN {domain.id}</span>
                </div>
              </motion.div>

              {/* Text Side */}
              <motion.div 
                initial={{ opacity: 0, x: index % 2 !== 0 ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full md:w-1/2 flex flex-col justify-center"
              >
                <div className="mb-4">
                  <span className="text-sm font-semibold tracking-widest text-text-secondary uppercase">
                    {domain.id}
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold text-text-primary mb-6 tracking-tight">
                  {domain.title}
                </h3>
                <p className="text-lg text-text-secondary leading-relaxed max-w-lg">
                  {domain.description}
                </p>
              </motion.div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
