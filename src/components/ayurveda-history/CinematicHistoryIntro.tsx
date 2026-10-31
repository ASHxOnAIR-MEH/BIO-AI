"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, MapPin, Compass, ChevronDown, Volume2, VolumeX, ArrowRight, BookOpen } from "lucide-react";

interface CinematicHistoryIntroProps {
  onBeginJourney: () => void;
  onExploreMap: () => void;
  onExploreLibrary: () => void;
  onExploreAshtavaidyas: () => void;
  isMalayalam?: boolean;
}

export default function CinematicHistoryIntro({
  onBeginJourney,
  onExploreMap,
  onExploreLibrary,
  onExploreAshtavaidyas,
  isMalayalam = false,
}: CinematicHistoryIntroProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [manuscriptOpened, setManuscriptOpened] = useState(false);

  return (
    <section className="relative min-h-[92vh] w-full flex flex-col justify-between p-4 sm:p-8 md:p-12 overflow-hidden bg-[#072820] text-[#FAF7EE] select-none">
      {/* ─── AMBIENT MANUSCRIPT PARCHMENT & BOTANICAL BACKDROP ─── */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:32px_32px] opacity-25" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[#124939] blur-[140px] opacity-70" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] rounded-full bg-[#8C6D1F] blur-[160px] opacity-40" />
      </div>

      {/* ─── TOP STATUS & AUDIO CONTROLS ─── */}
      <header className="relative z-20 flex items-center justify-between w-full max-w-6xl mx-auto border-b border-[#D4AF37]/20 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-pulse" />
          <span className="text-[11px] sm:text-xs font-mono tracking-widest text-[#E6C665] uppercase">
            {isMalayalam ? "ബയോ-എഐ പൈതൃക പ്രദർശനം" : "Bio-AI Heritage Exhibition • Digital Museum"}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-[#FAF7EE]/70 hidden sm:inline font-serif italic">
            {isMalayalam ? "വേദകാലം മുതൽ അഷ്ടവൈദ്യന്മാർ വരെ" : "1500 BCE — Contemporary Era"}
          </span>
          <button
            type="button"
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/80 transition-colors border border-white/10"
            title={isMuted ? "Enable ambient temple drone" : "Mute ambient audio"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#D4AF37]" />}
          </button>
        </div>
      </header>

      {/* ─── CENTRAL CINEMATIC HERO: 2-COLUMN WITH VEDA RESEARCHER ─── */}
      <div className="relative z-20 max-w-6xl mx-auto my-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-6 sm:py-10">
        {/* Left Column (7 cols): Titles & Historical Navigation */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Sanskrit Auspicious Invocation */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-3 sm:mb-4"
          >
            <span className="font-serif italic text-xs sm:text-sm md:text-base text-[#E6C665] tracking-wide drop-shadow-md">
              ॥ हिताहितं सुखं दुःखमायुस्तस्य हिताहितम्। मानं च तच्च यत्रोक्तमायुर्वेदः स उच്യते ॥
            </span>
            <p className="text-[10px] sm:text-xs text-[#FAF7EE]/60 mt-0.5 font-sans">
              {isMalayalam
                ? "ഹിതവും അഹിതവും, സുഖവും ദുഃഖവുമുള്ള ആയുസ്സിനെ നിർവ്വചിക്കുന്ന ശാസ്ത്രമാണ് ആയുർവേദം. (ചരകസംഹിത)"
                : "That science which elucidates the wholesome and unwholesome life, its measure and essence, is Ayurveda. (Charaka Samhita I.41)"}
            </p>
          </motion.div>

          {/* Grand Title */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#FAF7EE] leading-[1.08] mb-3"
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FAF7EE] via-[#F4DE97] to-[#D4AF37]">
              AYURVEDA
            </span>
            <span className="text-xl sm:text-2xl md:text-3xl font-normal tracking-[0.2em] text-[#C5A028] uppercase mt-1 block">
              THROUGH THE AGES
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-xs sm:text-sm md:text-base text-[#FAF7EE]/85 max-w-xl font-light leading-relaxed mb-6"
          >
            {isMalayalam
              ? "പ്രാചീന വൈദിക സ്രോതസ്സുകളിൽ നിന്നും ക്ലാസിക്കൽ സംഹിതകളിലൂടെയും കേരളത്തിന്റെ അഷ്ടവൈദ്യ പാരമ്പര്യത്തിലൂടെയും ആധുനിക ബയോ-എഐയിലേക്കുള്ള ചരിത്രയാത്ര."
              : "A Journey Through India's Ancient Medical Knowledge, Classical Texts and Living Traditions."}
          </motion.p>

          {/* ─── INTERACTIVE MANUSCRIPT OBJECT ─── */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="w-full max-w-lg mb-6 cursor-pointer group"
            onClick={() => setManuscriptOpened(!manuscriptOpened)}
          >
            <div className="relative bg-[#1A3F35]/70 border-2 border-[#D4AF37]/40 rounded-2xl p-4 shadow-[0_16px_40px_rgba(0,0,0,0.35)] backdrop-blur-md hover:border-[#D4AF37] transition-all group-hover:scale-[1.01]">
              <div className="flex items-center justify-between mb-2.5 border-b border-[#D4AF37]/20 pb-2">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-xs font-serif font-bold text-[#E6C665] tracking-wider uppercase">
                    {isMalayalam ? "പ്രാചീന ഗ്രന്ഥ പേടകം" : "Classical Palm-Leaf Codices"}
                  </span>
                </div>
                <span className="text-[10px] text-[#FAF7EE]/60 font-mono">
                  CCRAS / NCBS Archival Grounded
                </span>
              </div>

              <div className="flex items-center gap-3 text-left">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#8C6D1F] p-0.5 shrink-0 shadow-md">
                  <div className="w-full h-full rounded-[10px] bg-[#0A342B] flex flex-col items-center justify-center p-1 text-center">
                    <span className="text-[10px] font-bold text-[#D4AF37]">6 EPOCHS</span>
                    <span className="text-[7px] text-[#FAF7EE]/70 uppercase">3500+ Yrs</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-[#FAF7EE] leading-snug">
                    {manuscriptOpened
                      ? "Vedic Hymns ➔ Charaka & Sushruta ➔ Vagbhata's Ashtanga ➔ Later Lexicons ➔ Kerala Ashtavaidyas ➔ Modern Bio-AI"
                      : isMalayalam
                      ? "ഋഗ്വേദത്തിലെ ഓഷധി സൂക്തങ്ങൾ മുതൽ കേരളത്തിലെ അഷ്ടവൈദ്യന്മാർ വരെയുള്ള അറിവുകൾ ഇവിടെ തുറക്കപ്പെടുന്നു."
                      : "Touch to unfold the ancient manuscript timeline spanning 1500 BCE to contemporary genomic validation."}
                  </p>
                  <span className="inline-block mt-0.5 text-[11px] font-semibold text-[#D4AF37] group-hover:underline">
                    {manuscriptOpened ? "Tap to close summary" : "Tap to inspect the transmission lineage ➔"}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ─── PRIMARY ACTION BUTTONS (LARGE TOUCH TARGETS) ─── */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-xl"
          >
            {/* Primary Journey Button */}
            <button
              type="button"
              onClick={onBeginJourney}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#E5C358] to-[#C5A028] text-[#072820] font-serif font-bold text-sm sm:text-base shadow-[0_10px_30px_rgba(212,175,55,0.35)] hover:shadow-[0_15px_40px_rgba(212,175,55,0.5)] active:scale-95 transition-all touch-manipulation group"
            >
              <span>{isMalayalam ? "യാത്ര ആരംഭിക്കുക" : "BEGIN THE JOURNEY"}</span>
              <ArrowRight className="w-4 h-4 text-[#072820] group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Secondary Map Exploration Button */}
            <button
              type="button"
              onClick={onExploreMap}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#FAF7EE]/10 hover:bg-[#FAF7EE]/20 border border-[#D4AF37]/50 text-[#FAF7EE] font-serif font-semibold text-xs sm:text-sm backdrop-blur-md transition-all active:scale-95 touch-manipulation"
            >
              <Compass className="w-4 h-4 text-[#D4AF37]" />
              <span>{isMalayalam ? "ഭാരത ചരിത്ര ഭൂപടം" : "EXPLORE THE HISTORICAL MAP"}</span>
            </button>
          </motion.div>

          {/* Quick Nav Chips */}
          <div className="flex flex-wrap items-center gap-2 mt-5 text-xs text-[#FAF7EE]/80">
            <button
              type="button"
              onClick={onExploreAshtavaidyas}
              className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/15 border border-[#D4AF37]/30 text-[#E6C665] transition-colors"
            >
              🌿 {isMalayalam ? "കേരള അഷ്ടവൈദ്യ പാരമ്പര്യം" : "Kerala Ashtavaidya Heritage"}
            </button>
            <button
              type="button"
              onClick={onExploreLibrary}
              className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 text-white/90 hover:text-white transition-colors"
            >
              📜 {isMalayalam ? "പ്രാചീന ഗ്രന്ഥപ്പുര" : "Open Knowledge Library"}
            </button>
          </div>
        </div>

        {/* Right Column (5 cols): Veda, Young Ayurveda Researcher Welcome */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="lg:col-span-5 flex flex-col items-center justify-center relative"
        >
          {/* Botanical Aura */}
          <div className="absolute inset-0 rounded-full bg-radial from-[#55B96A]/30 via-[#D4AF37]/20 to-transparent blur-3xl pointer-events-none" />

          {/* VEDA Card */}
          <div className="relative w-full max-w-[380px] bg-gradient-to-b from-[#0A382C] via-[#072820] to-[#0A382C] rounded-3xl border-2 border-[#D4AF37]/50 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
            {/* Veda Master Image */}
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-[#D4AF37]/30 mb-3.5 shadow-inner">
              <Image
                src="/images/veda/01-young-ayurveda-researcher-guide.jpg"
                alt="Veda, Young Ayurveda Researcher & Digital Heritage Guide"
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 640px) 320px, 380px"
              />
              <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-[#072820]/80 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-[#D4AF37]/40 text-[10px] text-[#D4AF37] font-bold">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                <span>EXHIBITION GUIDE</span>
              </div>
            </div>

            {/* Speech Bubble from Veda */}
            <div className="relative bg-[#FAF7EE] text-[#072820] rounded-2xl p-4 shadow-sm border border-[#D4AF37]/40 text-left">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-[#55B96A]" />
                <span className="text-[11px] font-bold font-mono uppercase text-[#0B5D46]">
                  VEDA RESEARCHER
                </span>
              </div>
              <p className="font-serif text-xs sm:text-sm leading-relaxed text-[#072820] italic">
                {isMalayalam
                  ? "“നമസ്തേ! ഞാൻ വേദ. ഭാരതത്തിന്റെ പൗരാണിക ആയുർവേദ പൈതൃകത്തിലൂടെയുള്ള ഈ യാത്രയിലേക്ക് നിങ്ങളെ സ്വാഗതം ചെയ്യുന്നു. പ്രാചീന സംഹിതകളും, പ്രഗത്ഭരായ ആചാര്യന്മാരെയും, കേരളത്തിന്റെ സമ്പന്നമായ അഷ്ടവൈദ്യ പാരമ്പര്യവും നമുക്കൊന്നിച്ചു കണ്ടെത്താം.”"
                  : "“Namaste! I am Veda. Join me on a journey through India's ancient medical knowledge. Together, we will discover the classical texts, the scholars who shaped Ayurveda and Kerala's rich healing heritage.”"}
              </p>
            </div>

            {/* Badge label */}
            <div className="mt-3 text-center">
              <span className="text-[10px] sm:text-xs text-[#FAF7EE]/70 font-mono">
                Digital Heritage Guide • Bio-AI Centre of Excellence
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ─── BOTTOM PROMPT (SKIP INTRO & SCROLL INDICATOR) ─── */}
      <footer className="relative z-20 w-full max-w-6xl mx-auto flex items-center justify-between text-xs text-[#FAF7EE]/60 pt-4 border-t border-white/10">
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Takshashila • Varanasi • Nalanda • Nila Valley</span>
        </div>

        <button
          type="button"
          onClick={onBeginJourney}
          className="inline-flex items-center gap-1.5 text-[#D4AF37] hover:text-[#E6C665] font-semibold transition-colors active:scale-95 py-1 px-2"
        >
          <span>{isMalayalam ? "റോഡ്‌മാപ്പിലേക്ക് പോകുക" : "Skip Intro to Roadmap"}</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </button>
      </footer>
    </section>
  );
}
