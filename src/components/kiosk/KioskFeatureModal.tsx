"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { KIOSK_CARDS } from "./kioskData";
import { KioskCardId, KioskLanguage } from "./types";
import { KIOSK_CATEGORY_ILLUSTRATIONS } from "@/lib/kioskAssets";

interface KioskFeatureModalProps {
  cardId: KioskCardId | null;
  language: KioskLanguage;
  onClose: () => void;
}

export default function KioskFeatureModal({
  cardId,
  language,
  onClose,
}: KioskFeatureModalProps) {
  if (!cardId) return null;

  const card = KIOSK_CARDS.find((c) => c.id === cardId);
  if (!card) return null;

  const isMl = language === "ml";
  const title = isMl ? card.titleMl : card.title;
  const subtitle = isMl ? card.subtitleMl : card.subtitle;
  const description = isMl ? card.descriptionMl : card.description;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#073B30]/75 backdrop-blur-md"
          aria-hidden="true"
        />

        {/* Modal Window */}
        <motion.div
          key="modal-content"
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-2xl bg-[#FAFAF7] rounded-3xl shadow-2xl border-2 border-[#0B5D46]/20 p-6 sm:p-8 md:p-10 z-10 overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Subtle botanical accent in corner */}
          <div
            className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none opacity-40"
            style={{
              background:
                "radial-gradient(circle, rgba(85, 185, 106, 0.4) 0%, transparent 70%)",
            }}
          />

          {/* Top Bar with Badge & Close Button */}
          <div className="flex items-start justify-between gap-4 mb-5">
            <div className="flex flex-col gap-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0F7F1] text-xs font-bold text-[#0B5D46] border border-[#0B5D46]/20 w-fit">
                <span className="w-2 h-2 rounded-full bg-[#55B96A] animate-pulse" />
                {isMl
                  ? "ഘട്ടം 1 ഫൗണ്ടേഷൻ · അടുത്ത ഘട്ടത്തിൽ ലഭ്യമാകും"
                  : "Phase 1 Foundation · Next Implementation Phase"}
              </span>
              <span className="text-[11px] font-semibold text-[#244B3F]/70 tracking-wide uppercase">
                Huddle Global Kiosk Experience
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-11 h-11 rounded-full bg-[#F0F7F1] border border-[#0B5D46]/20 text-[#073B30] hover:bg-[#073B30] hover:text-white flex items-center justify-center transition-colors active:scale-90 touch-manipulation focus:outline-none"
              aria-label="Close modal"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Cartoon Category Illustration Banner */}
          <div className="relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden border-2 border-[#0B5D46]/20 mb-5 shadow-sm bg-[#F0F7F1]">
            <Image
              src={
                cardId === "innovations"
                  ? KIOSK_CATEGORY_ILLUSTRATIONS.innovations.path
                  : cardId === "ecosystem"
                  ? KIOSK_CATEGORY_ILLUSTRATIONS.ecosystem.path
                  : cardId === "vedaverse"
                  ? KIOSK_CATEGORY_ILLUSTRATIONS.vedaverse.path
                  : KIOSK_CATEGORY_ILLUSTRATIONS.arogyamithran.path
              }
              alt={title}
              fill
              className="object-cover object-top"
              sizes="(max-width: 640px) 100vw, 640px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#073B30]/70 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
              <span className="text-xs font-bold tracking-wide uppercase bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-xs">
                {subtitle}
              </span>
            </div>
          </div>

          {/* Title Area */}
          <div className="mb-5">
            <h3
              id="modal-title"
              className="text-2xl sm:text-3xl font-extrabold text-[#073B30] tracking-tight mb-1"
            >
              {title}
            </h3>
            <p className="text-sm sm:text-base font-semibold text-[#0B5D46]">
              {subtitle}
            </p>
          </div>

          {/* Description */}
          <div className="p-4 rounded-2xl bg-[#F0F7F1]/80 border border-[#0B5D46]/10 mb-6">
            <p className="text-sm sm:text-[0.95rem] text-[#132E27] leading-relaxed">
              {description}
            </p>
          </div>

          {/* What's Coming in this Module */}
          <div className="mb-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#073B30] mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#55B96A]" />
              {isMl
                ? "അടുത്ത ഘട്ടത്തിൽ ഒരുക്കുന്ന പ്രധാന സവിശേഷതകൾ:"
                : "Upcoming Capabilities for this Experience:"}
            </h4>
            <ul className="space-y-2.5">
              {card.features.map((feat, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-[#244B3F]"
                >
                  <span className="w-5 h-5 rounded-full bg-[#0B5D46] text-white flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5">
                    ✓
                  </span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Transparency note */}
          <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200/60 mb-6 text-[11px] text-amber-900 leading-normal flex items-center gap-2.5">
            <span className="text-base shrink-0">ℹ️</span>
            <span>
              {isMl
                ? "ആദ്യ ഘട്ടത്തിൽ ടച്ച്സ്ക്രീൻ റൂട്ടും ഫൗണ്ടേഷൻ ഘടനയും സജ്ജമാക്കിയിരിക്കുന്നു. ഗെയിം എൻജിൻ, ക്വിസ് ഡാറ്റാബേസ്, തത്സമയ അന്വേഷണങ്ങൾ എന്നിവ അടുത്ത ഘട്ടത്തിൽ ലഭ്യമാകും."
                : "Step 1 establishes the route, design tokens, and touchscreen structure. Full interactive datasets, quiz flow, and live forms are scheduled for the next implementation phase."}
            </span>
          </div>

          {/* Bottom Action: Back to Kiosk */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#073B30] text-[#FAFAF7] hover:bg-[#0B5D46] active:scale-95 transition-all text-sm font-bold shadow-md touch-manipulation"
            >
              <span>{isMl ? "തിരികെ കിയോസ്കിലേക്ക്" : "Back to Kiosk Menu"}</span>
              <span className="text-[#55B96A]">→</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
