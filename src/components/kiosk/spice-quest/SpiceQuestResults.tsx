"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import QRCode from "qrcode";
import { motion } from "framer-motion";
import {
  Trophy,
  CheckCircle2,
  RotateCcw,
  ArrowRight,
  BookOpen
} from "lucide-react";
import { useSpiceQuest } from "./SpiceQuestContext";
import { QRResultData } from "./types";

export default function SpiceQuestResults() {
  const { state, resetGame, setView } = useSpiceQuest();
  const isMl = state.language === "ml";

  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);

  // Total time taken across all completed levels
  const totalTimeSeconds = Object.values(state.levels).reduce(
    (acc, lvl) => acc + (lvl.timeSpentSeconds || 0),
    0
  );

  const minutes = Math.floor(totalTimeSeconds / 60);
  const seconds = totalTimeSeconds % 60;

  // Generate verified QR result payload
  useEffect(() => {
    const payload: QRResultData = {
      title: "SPICE MASTER - Six Secrets of Ayurveda",
      score: state.totalScore,
      maxScore: 680,
      levelsCompleted: 6,
      timestamp: new Date().toISOString(),
      rank: "Grand Master of Ayurvedic Botany",
      kioskVenue: "Bio-AI Centre of Excellence, Digital Hub Kochi"
    };

    const qrText = `https://bioai.kerala.gov.in/achievements/spice-quest?score=${state.totalScore}&completed=6&rank=GrandSpiceMaster&ts=${Date.now()}`;

    QRCode.toDataURL(qrText, {
      width: 220,
      margin: 1.5,
      color: {
        dark: "#072820",
        light: "#FAF7EE"
      }
    })
      .then((url) => setQrCodeDataUrl(url))
      .catch(() => {});
  }, [state.totalScore]);

  return (
    <div className="w-full max-w-4xl mx-auto py-6 px-3 sm:px-6 flex flex-col gap-6">
      {/* ─── 1. CELEBRATION HERO BANNER ───────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-[#072820] via-[#0A382C] to-[#041D16] rounded-3xl p-6 sm:p-10 border-4 border-[#D4AF37] text-center text-[#FAF7EE] shadow-2xl relative overflow-hidden"
      >
        {/* Golden celebratory aura */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#10B981]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          {/* VEDA Celebrating Character (veda-celebrating.png) */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-36 h-48 sm:w-44 sm:h-56 rounded-3xl bg-gradient-to-b from-[#F0F7F1]/20 via-[#FAF7EE]/10 to-transparent border-2 border-[#D4AF37] p-2 flex items-end justify-center mb-4 shadow-xl"
          >
            <Image
              src="/images/veda/veda-celebrating.png"
              alt="Veda Celebrating"
              width={180}
              height={220}
              className="object-contain max-h-full drop-shadow-2xl select-none pointer-events-none"
              priority
            />
          </motion.div>

          {/* Achievement Title Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37] text-[#072820] text-xs font-black uppercase tracking-widest mb-3 shadow-md">
            <Trophy className="w-4 h-4" />
            <span>{isMl ? "വിജയകരമായ പൂർത്തീകരണം" : "GRAND ACHIEVEMENT"}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight text-[#FAF7EE] mb-2">
            SPICE MASTER ACHIEVEMENT
          </h1>

          <p className="text-sm sm:text-base text-[#D4AF37] font-semibold max-w-xl mx-auto mb-6">
            {isMl
              ? "അഭിനന്ദനങ്ങൾ! നിങ്ങൾ ആയുർവേദത്തിലെ ആറ് രഹസ്യങ്ങളും വിജയകരമായി വെളിപ്പെടുത്തി ഗ്രാൻഡ് സ്പൈസ് മാസ്റ്റർ പദവി കരസ്ഥമാക്കിയിരിക്കുന്നു!"
              : "Congratulations! You have conquered all Six Secrets of Ayurveda and earned the highest honor of Grand Spice Master!"}
          </p>

          {/* Score & Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-2xl mb-6">
            <div className="bg-white/10 rounded-2xl p-3.5 border border-white/15 backdrop-blur-xs">
              <span className="text-[10px] text-white/70 uppercase font-bold block mb-1">
                {isMl ? "ആകെ സ്കോർ" : "Final Score"}
              </span>
              <span className="text-2xl sm:text-3xl font-black text-[#D4AF37]">
                {state.totalScore}
              </span>
            </div>

            <div className="bg-white/10 rounded-2xl p-3.5 border border-white/15 backdrop-blur-xs">
              <span className="text-[10px] text-white/70 uppercase font-bold block mb-1">
                {isMl ? "ലെവലുകൾ" : "Challenges"}
              </span>
              <span className="text-2xl sm:text-3xl font-black text-[#10B981]">
                6 / 6
              </span>
            </div>

            <div className="bg-white/10 rounded-2xl p-3.5 border border-white/15 backdrop-blur-xs">
              <span className="text-[10px] text-white/70 uppercase font-bold block mb-1">
                {isMl ? "എടുത്ത സമയം" : "Total Time"}
              </span>
              <span className="text-2xl sm:text-3xl font-black text-white font-mono">
                {minutes}m {seconds}s
              </span>
            </div>

            <div className="bg-white/10 rounded-2xl p-3.5 border border-white/15 backdrop-blur-xs">
              <span className="text-[10px] text-white/70 uppercase font-bold block mb-1">
                {isMl ? "പദവി" : "Title Rank"}
              </span>
              <span className="text-sm font-black text-[#F59E0B] leading-tight block mt-1">
                Grand Master
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ─── 2. CERTIFICATE QR CODE CARD ───────────────────────────────────────── */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#0B5D46]/20 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold mb-2">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isMl ? "സ്ഥിരീകരിച്ച ഡിജിറ്റൽ സർട്ടിഫിക്കറ്റ്" : "Verified Bio-AI Certificate"}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-serif font-black text-[#072820] mb-2">
            {isMl ? "സ്പൈസ് മാസ്റ്റർ സുവനീർ ക്യുആർ" : "Scan to Save Your Spice Master Souvenir"}
          </h2>

          <p className="text-xs sm:text-sm text-[#244B3F]/85 leading-relaxed mb-4 max-w-md">
            {isMl
              ? "നിങ്ങളുടെ മൊബൈൽ ഫോണിൽ ഈ ക്യുആർ കോഡ് സ്കാൻ ചെയ്ത് നേട്ടത്തിന്റെ സർട്ടിഫിക്കറ്റ് സ്വന്തമാക്കാം."
              : "Scan this verified QR code with your mobile camera to take home your official Spice Master certificate and score breakdown."}
          </p>

          <div className="text-[11px] text-gray-500">
            <span>Bio-AI Centre of Excellence • Digital Hub Kochi</span>
          </div>
        </div>

        {/* QR Code Canvas */}
        <div className="shrink-0 p-3 bg-[#FAF7EE] rounded-2xl border-2 border-[#D4AF37]/50 shadow-md flex flex-col items-center">
          {qrCodeDataUrl ? (
            <div className="relative w-44 h-44 rounded-xl overflow-hidden shadow-xs">
              <Image
                src={qrCodeDataUrl}
                alt="Spice Master Certificate QR"
                width={176}
                height={176}
                className="object-contain"
                priority
              />
            </div>
          ) : (
            <div className="w-44 h-44 flex items-center justify-center text-xs text-gray-400">
              Generating QR…
            </div>
          )}
          <span className="mt-2 text-[10px] font-bold text-[#072820] uppercase tracking-wider">
            Official Souvenir QR
          </span>
        </div>
      </div>

      {/* ─── 3. ACTION BUTTONS ─────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-center gap-4 py-2">
        <Link
          href="/kiosk/vedaverse"
          className="px-6 py-3.5 rounded-full bg-[#0B5D46] hover:bg-[#073B30] text-white font-black text-sm flex items-center gap-2 shadow-md active:scale-95 transition-all touch-manipulation cursor-pointer"
        >
          <BookOpen className="w-4 h-4 text-[#D4AF37]" />
          <span>{isMl ? "വേദവേഴ്സ് കാറ്റലോഗ് കാണുക" : "Explore VedaVerse Flora"}</span>
        </Link>

        <button
          type="button"
          onClick={() => {
            resetGame();
            setView("landing");
          }}
          className="px-6 py-3.5 rounded-full bg-white hover:bg-gray-50 text-[#072820] font-black text-sm flex items-center gap-2 border-2 border-gray-200 shadow-sm active:scale-95 transition-all touch-manipulation cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-gray-500" />
          <span>{isMl ? "വീണ്ടും കളിക്കുക" : "Play Quest Again"}</span>
        </button>

        <Link
          href="/kiosk"
          className="px-6 py-3.5 rounded-full bg-gray-100 hover:bg-gray-200 text-[#072820] font-bold text-sm flex items-center gap-2 transition-all touch-manipulation cursor-pointer"
        >
          <span>{isMl ? "കിയോസ്ക് ഹോം" : "Return to Kiosk Home"}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
