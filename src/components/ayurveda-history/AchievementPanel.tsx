"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HISTORICAL_BADGES_DATA, HistoricalBadge } from "@/data/ayurvedaHistoryData";
import QRCode from "qrcode";
import {
  Award,
  Crown,
  Sparkles,
  CheckCircle2,
  Lock,
  QrCode,
  Download,
  Share2,
  X,
  Flame,
  BookOpen,
  Compass,
  Scroll,
  Shield,
} from "lucide-react";

interface AchievementPanelProps {
  unlockedBadgeIds: string[];
  isMalayalam?: boolean;
}

export default function AchievementPanel({
  unlockedBadgeIds,
  isMalayalam = false,
}: AchievementPanelProps) {
  const [showQrModal, setShowQrModal] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");

  const totalBadges = HISTORICAL_BADGES_DATA.length;
  const unlockedCount = unlockedBadgeIds.length;
  const progressPercent = Math.round((unlockedCount / totalBadges) * 100);

  // Generate QR code with achievement token / verification URL
  useEffect(() => {
    if (showQrModal) {
      const shareUrl = typeof window !== "undefined"
        ? `${window.location.origin}/ayurveda-history?badges=${unlockedBadgeIds.join(",")}&score=${unlockedCount}`
        : "https://bio-ai-five.vercel.app/ayurveda-history";

      QRCode.toDataURL(shareUrl, {
        width: 320,
        margin: 2,
        color: {
          dark: "#072820",
          light: "#FAF7EE",
        },
      })
        .then((url) => setQrDataUrl(url))
        .catch(() => {});
    }
  }, [showQrModal, unlockedBadgeIds, unlockedCount]);

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case "Flame":
        return <Flame className="w-5 h-5 text-[#E6C665]" />;
      case "BookOpen":
        return <BookOpen className="w-5 h-5 text-[#E6C665]" />;
      case "Compass":
        return <Compass className="w-5 h-5 text-[#E6C665]" />;
      case "Scroll":
        return <Scroll className="w-5 h-5 text-[#E6C665]" />;
      case "Shield":
        return <Shield className="w-5 h-5 text-[#E6C665]" />;
      case "Crown":
        return <Crown className="w-5 h-5 text-[#E6C665]" />;
      default:
        return <Award className="w-5 h-5 text-[#E6C665]" />;
    }
  };

  return (
    <section
      id="historical-achievements"
      className="relative w-full py-16 sm:py-20 px-4 sm:px-6 md:px-12 bg-[#072820] text-[#FAF7EE] overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#D4AF37]/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-[#55B96A]/10 blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-2">
              <Award className="w-3.5 h-3.5" />
              <span>{isMalayalam ? "യാത്രാ പുരസ്കാരങ്ങൾ" : "Historical Journey Badges"}</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              {isMalayalam ? "നിങ്ങളുടെ പൈതൃക നേട്ടങ്ങൾ" : "Your Heritage Milestones"}
            </h2>
            <p className="text-xs sm:text-sm text-white/75 mt-1">
              {isMalayalam
                ? "ഓരോ യുഗവും പര്യവേക്ഷണം ചെയ്ത് ആയുർവേദ ചരിത്ര ബാഡ്ജുകൾ നേടൂ."
                : "Earn verified discovery badges as you travel through 3,500 years of medical evolution."}
            </p>
          </div>

          {/* Progress & QR CTA */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-xs text-white/70 block">Overall Mastery</span>
              <span className="text-xl sm:text-2xl font-mono font-bold text-[#D4AF37]">
                {unlockedCount} / {totalBadges} Badges
              </span>
            </div>

            <button
              type="button"
              onClick={() => setShowQrModal(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-[#072820] font-serif font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              <QrCode className="w-4 h-4 text-[#072820]" />
              <span>{isMalayalam ? "ക്യുആർ സർട്ടിഫിക്കറ്റ്" : "Generate QR Card"}</span>
            </button>
          </div>
        </div>

        {/* ─── BADGES GRID ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {HISTORICAL_BADGES_DATA.map((badge) => {
            const isUnlocked = unlockedBadgeIds.includes(badge.id);

            return (
              <div
                key={badge.id}
                className={`p-5 rounded-3xl border-2 transition-all flex flex-col justify-between relative overflow-hidden ${
                  isUnlocked
                    ? "bg-gradient-to-br from-white/15 to-white/5 border-[#D4AF37] shadow-md"
                    : "bg-white/5 border-white/10 opacity-70"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                        isUnlocked ? "bg-[#D4AF37]/20 border border-[#D4AF37]" : "bg-black/30 border border-white/10"
                      }`}
                    >
                      {isUnlocked ? getBadgeIcon(badge.iconName) : <Lock className="w-4 h-4 text-white/40" />}
                    </div>

                    <span className="text-[10px] font-mono text-[#D4AF37] uppercase">
                      {badge.unlockedAt}
                    </span>
                  </div>

                  <h4 className="font-serif text-base font-bold text-white mb-1">
                    {isMalayalam ? badge.titleMl : badge.title}
                  </h4>
                  <p className="text-xs text-white/80 leading-relaxed font-sans">
                    {badge.description}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-[11px]">
                  <span className="text-white/60 truncate">{badge.criteria}</span>
                  {isUnlocked && <CheckCircle2 className="w-4 h-4 text-[#55B96A] shrink-0" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── QR SOUVENIR MODAL ─── */}
      <AnimatePresence>
        {showQrModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-[#FAF7EE] text-[#072820] rounded-3xl p-6 sm:p-8 border-2 border-[#D4AF37] shadow-2xl text-center space-y-4"
            >
              <button
                type="button"
                onClick={() => setShowQrModal(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B5D46]/10 text-xs font-bold text-[#0B5D46] uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Exhibition Souvenir Certificate</span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#072820]">
                AYURVEDA THROUGH THE AGES
              </h3>
              <p className="text-xs text-[#244B3F]/80">
                Scan with any smartphone camera to open and retain your verified exhibition journey record.
              </p>

              {/* QR Image */}
              <div className="p-4 bg-white rounded-2xl border-2 border-[#D4AF37]/50 inline-block shadow-sm">
                {qrDataUrl ? (
                  <img
                    src={qrDataUrl}
                    alt="Ayurveda History Journey QR Card"
                    className="w-48 h-48 sm:w-56 sm:h-56 mx-auto object-contain"
                  />
                ) : (
                  <div className="w-48 h-48 flex items-center justify-center text-xs text-gray-400">
                    Generating certificate QR...
                  </div>
                )}
              </div>

              <div className="text-xs text-[#072820] font-mono">
                Badges Mastered: {unlockedCount} of {totalBadges} • Certified at KSUM Digital Hub
              </div>

              <button
                type="button"
                onClick={() => setShowQrModal(false)}
                className="w-full py-3 rounded-full bg-[#0B5D46] text-white text-xs sm:text-sm font-bold hover:bg-[#072820] transition-colors"
              >
                Close Certificate
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

