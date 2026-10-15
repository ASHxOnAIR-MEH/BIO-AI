"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Sprout, FlaskConical, Users, UserCheck, ArrowRight } from "lucide-react";
import { KIOSK_CARDS } from "./kioskData";
import { KioskCardId, KioskLanguage, KioskNavigationCard } from "./types";
import { KIOSK_CATEGORY_ILLUSTRATIONS } from "@/lib/kioskAssets";

interface KioskCardGridProps {
  language: KioskLanguage;
  onSelectCard?: (cardId: KioskCardId) => void;
}

function CategoryIcon({ cardId }: { cardId: KioskCardId }) {
  switch (cardId) {
    case "arogyamithran":
      return <UserCheck className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2.2} />;
    case "vedaverse":
      return <Sprout className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2.2} />;
    case "innovations":
      return <FlaskConical className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2.2} />;
    case "ecosystem":
      return <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2.2} />;
    default:
      return <Sprout className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2.2} />;
  }
}

export default function KioskCardGrid({ language }: KioskCardGridProps) {
  const isMl = language === "ml";

  const getCardRoute = (id: KioskCardId) => {
    switch (id) {
      case "arogyamithran":
        return "/kiosk/arogyamithran/language";
      case "vedaverse":
        return "/kiosk/vedaverse";
      case "innovations":
        return "/kiosk/innovations";
      case "ecosystem":
        return "/kiosk/ecosystem";
      default:
        return "/kiosk";
    }
  };

  const getCardArtwork = (id: KioskCardId) => {
    switch (id) {
      case "arogyamithran":
        return KIOSK_CATEGORY_ILLUSTRATIONS.arogyamithran.path;
      case "vedaverse":
        return KIOSK_CATEGORY_ILLUSTRATIONS.vedaverse.path;
      case "innovations":
        return KIOSK_CATEGORY_ILLUSTRATIONS.innovations.path;
      case "ecosystem":
        return KIOSK_CATEGORY_ILLUSTRATIONS.ecosystem.path;
      default:
        return KIOSK_CATEGORY_ILLUSTRATIONS.arogyamithran.path;
    }
  };

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 z-10 bg-[#F0F7F2]">
      <div className="w-full max-w-5xl mx-auto">
        {/* Section label */}
        <p className="text-[11px] sm:text-xs font-bold text-[#0B5D46]/70 uppercase tracking-widest mb-3 sm:mb-4 text-center">
          {language === "ml" ? "ഒരെണ്ണം തിരഞ്ഞെടുക്കൂ" : "Choose your experience"}
        </p>
        {/* 2x2 Interactive Navigation Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {KIOSK_CARDS.map((card: KioskNavigationCard, idx: number) => {
            const title = isMl ? card.titleMl : card.title;
            const subtitle = isMl ? card.subtitleMl : card.subtitle;
            const description = isMl ? card.descriptionMl : card.description;
            const cardHref = getCardRoute(card.id);
            const artworkPath = getCardArtwork(card.id);

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.1 + idx * 0.08 }}
                className="h-full"
              >
                <Link
                  href={cardHref}
                  className="w-full h-full bg-white rounded-3xl border-2 border-[#0B5D46]/15 hover:border-[#55B96A] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group active:scale-[0.985] touch-manipulation focus:outline-none focus:ring-4 focus:ring-[#55B96A]/30 overflow-hidden"
                  aria-label={`${title} - ${subtitle}`}
                >
                  {/* Card Top: 16:9 High-Fidelity 3D Cartoon Artwork */}
                  <div className="relative w-full aspect-[16/9] bg-[#F0F7F1] overflow-hidden">
                    <Image
                      src={artworkPath}
                      alt={title}
                      fill
                      priority={idx < 2}
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 480px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Card Bottom: Icon + Typography + Action Button */}
                  <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
                    <div>
                      {/* Icon & Titles Row */}
                      <div className="flex items-start gap-3 mb-2.5">
                        {/* Circular Category Badge */}
                        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#0B5D46] group-hover:bg-[#073B30] flex items-center justify-center shrink-0 shadow-xs transition-colors duration-200">
                          <CategoryIcon cardId={card.id} />
                        </div>

                        {/* Text Group */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base sm:text-lg font-black text-[#073B30] tracking-tight leading-snug group-hover:text-[#0B5D46] transition-colors truncate">
                            {title}
                          </h3>
                          <p className="text-[11px] sm:text-xs font-semibold text-[#55B96A] tracking-tight truncate">
                            {subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-[11px] sm:text-xs text-[#244B3F]/90 leading-relaxed line-clamp-2 sm:line-clamp-3 font-normal">
                        {description}
                      </p>
                    </div>

                    {/* Bottom Action Row with Circular Arrow Button */}
                    <div className="mt-3 pt-2.5 flex items-center justify-end">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0B5D46] group-hover:bg-[#073B30] text-white flex items-center justify-center shadow-xs transition-all duration-200 group-hover:scale-105 shrink-0">
                        <ArrowRight className="w-4 h-4 text-white" strokeWidth={2.4} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
