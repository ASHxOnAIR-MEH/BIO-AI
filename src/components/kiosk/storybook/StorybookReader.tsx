"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  List,
  Volume2,
  VolumeX,
  X,
  RotateCcw,
  Scroll,
  Layers,
  Sparkles,
  AlertCircle,
  FileQuestion,
} from "lucide-react";
import {
  STORYBOOK_META,
  STORYBOOK_PAGES,
  StorybookPage,
} from "@/lib/storybookData";

// ─── Sound System (Web Audio API) ─────────────────────────────────────────────

class SoundEffects {
  private ctx: AudioContext | null = null;
  private lastPlayTime = 0;

  private initCtx() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
  }

  playPageFlip() {
    const now = Date.now();
    if (now - this.lastPlayTime < 350) return;
    this.lastPlayTime = now;

    try {
      this.initCtx();
      if (!this.ctx) return;
      const ctx = this.ctx;
      const sampleRate = ctx.sampleRate;
      const duration = 0.16;
      const buffer = ctx.createBuffer(1, Math.floor(sampleRate * duration), sampleRate);
      const data = buffer.getChannelData(0);

      // Organic paper rustle noise synthesis
      for (let i = 0; i < data.length; i++) {
        const t = i / sampleRate;
        const envelope = Math.sin((Math.PI * t) / duration) * Math.exp(-t * 14);
        const noise = Math.random() * 2 - 1;
        data[i] = noise * envelope;
      }

      const source = ctx.createBufferSource();
      source.buffer = buffer;

      // Bandpass filter to match crisp paper sound
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1400, ctx.currentTime);
      filter.Q.setValueAtTime(2.2, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.22, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      source.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      source.start();
    } catch {
      // AudioContext unavailable or restricted
    }
  }
}

const sfx = new SoundEffects();

// ─── Cover Screen with Realistic 3D Opening Animation ─────────────────────────

function StorybookCoverScreen({ onOpen }: { onOpen: () => void }) {
  const [isOpening, setIsOpening] = useState(false);
  const prefersReduced = useReducedMotion();

  const handleOpenClick = () => {
    setIsOpening(true);
    sfx.playPageFlip();
    setTimeout(onOpen, prefersReduced ? 200 : 950);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 sm:py-12 bg-gradient-to-b from-[#071F17] via-[#092B21] to-[#051711] overflow-hidden select-none">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(85,185,106,0.18),transparent_65%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center max-w-lg w-full text-center"
      >
        {/* Storybook Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 mb-6 shadow-sm">
          <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-widest">
            Interactive Digital Manga Storybook
          </span>
        </div>

        {/* 3D Realistic Book Cover Presentation */}
        <div
          className="relative mb-8 cursor-pointer group"
          style={{ perspective: "1800px" }}
          onClick={handleOpenClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleOpenClick()}
          aria-label="Open VEDA – The Lost Leaves Storybook"
        >
          {/* Underlying First Page Peek effect */}
          <div className="absolute inset-0 w-[240px] sm:w-[290px] aspect-[2/3] rounded-2xl bg-[#FAF7EE] shadow-2xl translate-x-2 translate-y-2 border border-[#0B5D46]/30 overflow-hidden">
            <div className="relative w-full h-full opacity-60">
              <Image
                src={STORYBOOK_PAGES[0]?.imageWebp || "/storybook/pages/page-01.png"}
                alt="Page 1 preview"
                fill
                className="object-cover"
                sizes="290px"
              />
            </div>
          </div>

          {/* Realistic Hardcover */}
          <motion.div
            animate={
              isOpening && !prefersReduced
                ? {
                    rotateY: -130,
                    x: -24,
                    boxShadow: "0 25px 50px -12px rgba(0,0,0,0.8)",
                  }
                : {
                    rotateY: 0,
                    x: 0,
                    boxShadow: "0 20px 45px -10px rgba(0,0,0,0.7), 10px 10px 0px rgba(7,37,28,0.5)",
                  }
            }
            transition={{ duration: 0.95, ease: [0.45, 0.05, 0.22, 1] }}
            style={{
              transformOrigin: "left center",
              transformStyle: "preserve-3d",
            }}
            className="relative w-[240px] sm:w-[290px] aspect-[2/3] rounded-2xl overflow-hidden border-2 border-[#D4AF37]/50 group-hover:border-[#D4AF37] transition-colors duration-300"
          >
            {/* High-fidelity Cover Art */}
            <picture>
              <source srcSet={STORYBOOK_META.coverWebp} type="image/webp" />
              <img
                src={STORYBOOK_META.coverPng}
                alt={STORYBOOK_META.coverAlt}
                className="w-full h-full object-cover select-none"
              />
            </picture>

            {/* Book Spine Leather Edge */}
            <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/60 via-black/30 to-transparent pointer-events-none" />

            {/* Foil Gilding Sheen */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Book crease shadow */}
            <div className="absolute inset-y-0 left-3 w-1 bg-black/40 blur-[1px] pointer-events-none" />
          </motion.div>
        </div>

        {/* Title & Metadata */}
        <h1 className="text-2xl sm:text-4xl font-serif font-black text-[#FAF7EE] tracking-tight leading-snug mb-2">
          {STORYBOOK_META.title}
        </h1>
        <p className="text-sm sm:text-base font-semibold text-[#D4AF37] mb-2">
          {STORYBOOK_META.volume}
        </p>
        <p className="text-xs sm:text-sm text-white/70 max-w-md mx-auto leading-relaxed mb-6 font-normal">
          {STORYBOOK_META.description}
        </p>

        {/* Feature Highlights Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <span className="px-3 py-1 rounded-full bg-white/10 text-white/90 text-[11px] font-medium border border-white/15">
            30 Illustrated Pages
          </span>
          <span className="px-3 py-1 rounded-full bg-white/10 text-white/90 text-[11px] font-medium border border-white/15">
            History of Ayurveda
          </span>
          <span className="px-3 py-1 rounded-full bg-white/10 text-white/90 text-[11px] font-medium border border-white/15">
            Ashtanga Tradition
          </span>
        </div>

        {/* Action Button: OPEN THE BOOK */}
        <motion.button
          onClick={handleOpenClick}
          disabled={isOpening}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#E2C366] to-[#C5A028] text-[#072820] font-black text-sm sm:text-base uppercase tracking-wider shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-70 focus:outline-none focus:ring-4 focus:ring-[#D4AF37]/50"
        >
          <BookOpen className="w-5 h-5 text-[#072820]" />
          <span>{isOpening ? "Opening Storybook…" : "OPEN THE BOOK →"}</span>
        </motion.button>

        <Link
          href="/kiosk"
          className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-white/50 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Kiosk Menu</span>
        </Link>
      </motion.div>
    </div>
  );
}

// ─── Contents Panel ───────────────────────────────────────────────────────────

function ContentsPanel({
  currentPage,
  onSelectPage,
  onClose,
}: {
  currentPage: number;
  onSelectPage: (n: number) => void;
  onClose: () => void;
}) {
  return (
    <motion.aside
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 320, damping: 32 }}
      className="fixed inset-y-0 right-0 w-[300px] sm:w-[360px] bg-[#0A1F17] border-l border-[#55B96A]/20 z-50 flex flex-col shadow-2xl"
      aria-label="Storybook Table of Contents"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-2">
          <List className="w-4 h-4 text-[#55B96A]" />
          <h2 className="text-sm font-bold text-white tracking-wide">
            Book Contents (30 Leaves)
          </h2>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close table of contents"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Pages List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {STORYBOOK_PAGES.map((page: StorybookPage) => {
          const isCurrent = page.pageNumber === currentPage;
          return (
            <button
              key={page.pageNumber}
              onClick={() => {
                onSelectPage(page.pageNumber);
                onClose();
              }}
              className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-left transition-all duration-200 border ${
                isCurrent
                  ? "bg-[#55B96A]/20 border-[#55B96A] text-white shadow-sm"
                  : page.isAvailable
                  ? "bg-white/5 border-white/10 hover:bg-white/10 text-white/90"
                  : "bg-white/[0.02] border-dashed border-white/10 text-white/50"
              }`}
            >
              {/* Thumbnail */}
              <div className="relative w-12 h-16 rounded-md overflow-hidden shrink-0 bg-[#071812] border border-white/10">
                {page.isAvailable ? (
                  <picture>
                    <source srcSet={page.imageWebp} type="image/webp" />
                    <img
                      src={page.imagePng}
                      alt={`Page ${page.pageNumber}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </picture>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-1 bg-[#12241C] text-center">
                    <FileQuestion className="w-4 h-4 text-[#D4AF37]/60 mb-0.5" />
                    <span className="text-[8px] font-mono text-[#D4AF37]/60">PENDING</span>
                  </div>
                )}
              </div>

              {/* Text details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <span className="text-xs font-mono font-bold text-[#D4AF37]">
                    PAGE {String(page.pageNumber).padStart(2, "0")}
                  </span>
                  {!page.isAvailable && (
                    <span className="text-[9px] uppercase font-bold text-[#D4AF37]/80 bg-[#D4AF37]/15 px-1.5 py-0.5 rounded">
                      Restoration
                    </span>
                  )}
                </div>
                <div className="text-[11px] font-semibold text-white truncate">
                  {page.title}
                </div>
                <div className="text-[10px] text-white/45 truncate">
                  {page.chapter}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </motion.aside>
  );
}

// ─── Missing Page Archival Notice Card ────────────────────────────────────────

function ArchivalRestorationPlate({ page, onNext }: { page: StorybookPage; onNext: () => void }) {
  return (
    <div className="w-full max-w-[500px] aspect-[2/3] mx-auto rounded-2xl bg-gradient-to-b from-[#FAF7EE] via-[#F4EEDC] to-[#EBE2CA] p-6 sm:p-8 flex flex-col justify-between items-center text-center shadow-2xl border-4 border-[#C8B88A] relative overflow-hidden select-none">
      {/* Classical Decorative Corners */}
      <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-[#8A6D3B]" />
      <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[#8A6D3B]" />
      <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-[#8A6D3B]" />
      <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-[#8A6D3B]" />

      {/* Top Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8A6D3B]/15 border border-[#8A6D3B]/40 mb-3">
          <AlertCircle className="w-3.5 h-3.5 text-[#8A6D3B]" />
          <span className="text-[10px] font-serif font-bold text-[#694E21] uppercase tracking-widest">
            Classical Manuscript Archive
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-serif font-black text-[#2A1E0D]">
          MANUSCRIPT LEAF {String(page.pageNumber).padStart(2, "0")}
        </h3>
        <p className="text-xs font-mono font-medium text-[#7D6136] mt-0.5">
          {page.filename}
        </p>
      </div>

      {/* Center Motif */}
      <div className="my-auto flex flex-col items-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#E4D8BE] border-2 border-[#8A6D3B]/50 flex items-center justify-center mb-4 shadow-inner">
          <Sparkles className="w-8 h-8 text-[#8A6D3B]" />
        </div>
        <h4 className="text-base sm:text-lg font-serif font-bold text-[#3D2C16] mb-2">
          {page.title}
        </h4>
        <p className="text-xs sm:text-sm text-[#4D3C26] max-w-xs leading-relaxed font-serif">
          This historical palm-leaf illustration is currently undergoing non-invasive botanical multispectral imaging for the Bio-AI Digital Herbarium repository.
        </p>
      </div>

      {/* Bottom Action */}
      <button
        onClick={onNext}
        className="w-full max-w-xs py-3 rounded-full bg-[#0B5D46] hover:bg-[#073B30] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-colors"
      >
        <span>Continue to Next Leaf</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}

// ─── Single Page Render Component (2:3 Aspect Ratio) ──────────────────────────

const StorybookPageCard = React.memo(function StorybookPageCard({
  page,
  priority = false,
  onNext,
}: {
  page: StorybookPage;
  priority?: boolean;
  onNext: () => void;
}) {
  if (!page.isAvailable) {
    return <ArchivalRestorationPlate page={page} onNext={onNext} />;
  }

  return (
    <div
      className="relative w-full max-w-[540px] aspect-[2/3] mx-auto rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl bg-[#FAF7EE] select-none"
      style={{
        boxShadow:
          "0 15px 45px rgba(0,0,0,0.7), 4px 4px 0px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.1)",
      }}
    >
      {/* Picture tag with WebP + PNG fallback */}
      <picture>
        <source srcSet={page.imageWebp} type="image/webp" />
        <img
          src={page.imagePng}
          alt={page.altText}
          className="w-full h-full object-contain bg-[#FAF7EE] select-none pointer-events-none"
          loading={priority ? "eager" : "lazy"}
        />
      </picture>

      {/* Subtle organic paper texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 mix-blend-multiply"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, transparent 60%, rgba(139,115,85,0.15) 100%)",
        }}
      />
    </div>
  );
});

// ─── Completion Screen ────────────────────────────────────────────────────────

function CompletionScreen({ onRestart }: { onRestart: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center bg-gradient-to-b from-[#071F17] via-[#092B21] to-[#051711] select-none"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mb-8 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#8A6D3B] p-1 flex items-center justify-center shadow-2xl"
      >
        <div className="w-full h-full rounded-full bg-[#072820] flex items-center justify-center">
          <BookOpen className="w-10 h-10 text-[#D4AF37]" />
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.5 }}
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest">
            Journey Complete
          </span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-serif font-black text-white mb-2 leading-tight">
          YOU HAVE COMPLETED
          <br />
          <span className="text-[#D4AF37]">VEDA – THE LOST LEAVES</span>
        </h2>

        <p className="text-sm font-semibold text-[#55B96A] mb-4">
          Volume One – Beyond the Eight Paths
        </p>

        <p className="text-xs sm:text-sm text-white/70 max-w-md mx-auto leading-relaxed mb-8 italic font-serif">
          “PRESERVE THE PAST. UNDERSTAND THE PRESENT. INSPIRE THE FUTURE.”
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="flex flex-col sm:flex-row gap-3 w-full max-w-xs"
      >
        <button
          onClick={onRestart}
          className="flex-1 py-3.5 rounded-full bg-[#55B96A] hover:bg-[#0B5D46] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Read Again</span>
        </button>
        <Link
          href="/kiosk"
          className="flex-1 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border border-white/20 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Kiosk</span>
        </Link>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Storybook Reader ────────────────────────────────────────────────────

export default function StorybookReader() {
  const [mode, setMode] = useState<"cover" | "reading" | "complete">("cover");
  const [viewStyle, setViewStyle] = useState<"flip" | "scroll">("flip");
  const [currentPage, setCurrentPage] = useState(1);
  const [soundOn, setSoundOn] = useState(false);
  const [showContents, setShowContents] = useState(false);
  const [flipDirection, setFlipDirection] = useState<1 | -1>(1);

  const prefersReduced = useReducedMotion();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Navigation handlers
  const handleNext = useCallback(() => {
    if (currentPage < STORYBOOK_META.totalPages) {
      setFlipDirection(1);
      if (soundOn) sfx.playPageFlip();
      setCurrentPage((p) => p + 1);
    } else if (currentPage === STORYBOOK_META.totalPages) {
      setMode("complete");
    }
  }, [currentPage, soundOn]);

  const handlePrev = useCallback(() => {
    if (currentPage > 1) {
      setFlipDirection(-1);
      if (soundOn) sfx.playPageFlip();
      setCurrentPage((p) => p - 1);
    }
  }, [currentPage, soundOn]);

  const handleSelectPage = useCallback(
    (pageNumber: number) => {
      setFlipDirection(pageNumber >= currentPage ? 1 : -1);
      if (soundOn) sfx.playPageFlip();
      setCurrentPage(pageNumber);

      if (viewStyle === "scroll") {
        const el = pageRefs.current[pageNumber - 1];
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    },
    [currentPage, soundOn, viewStyle]
  );

  // Keyboard Navigation
  useEffect(() => {
    if (mode !== "reading") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "Escape") {
        setShowContents(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mode, handleNext, handlePrev]);

  // Touch Swipe Gesture Detection for Flipbook mode
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (viewStyle !== "flip") return;
    const diffX = e.changedTouches[0].clientX - touchStartX.current;
    const diffY = e.changedTouches[0].clientY - touchStartY.current;

    // Trigger horizontal page flip if horizontal swipe exceeds 45px and dominates vertical movement
    if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  // Scroll Spy for Vertical Scroll Mode
  useEffect(() => {
    if (viewStyle !== "scroll" || mode !== "reading") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const pageNum = Number(entry.target.getAttribute("data-page-number"));
            if (pageNum && pageNum !== currentPage) {
              setCurrentPage(pageNum);
            }
          }
        });
      },
      {
        root: scrollContainerRef.current,
        threshold: 0.55,
      }
    );

    pageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [viewStyle, mode, currentPage]);

  const activePageData = STORYBOOK_PAGES[currentPage - 1];
  const progressPercent = (currentPage / STORYBOOK_META.totalPages) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-[#071912] text-white overflow-hidden select-none">
      {/* ── Top Bar ── */}
      {mode !== "cover" && (
        <header className="flex flex-wrap gap-3 items-center justify-between px-3 sm:px-6 py-2.5 bg-[#04120D] border-b border-white/10 shrink-0 z-30">
          {/* Left: Back + Book Identity */}
          <div className="flex items-center gap-3">
            <Link
              href="/kiosk"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors text-xs font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kiosk</span>
            </Link>

            <div className="h-4 w-px bg-white/15 hidden sm:block" />

            <div className="hidden sm:flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-xs font-serif font-black tracking-wide text-white/90">
                VEDA – THE LOST LEAVES
              </span>
            </div>
          </div>

          {/* Center: Current Chapter & Leaf Name */}
          <div className="hidden xl:flex flex-col items-center max-w-sm truncate text-center">
            <span className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase tracking-wider">
              {activePageData?.chapter}
            </span>
            <span className="text-[11px] font-medium text-white/80 truncate">
              {activePageData?.title}
            </span>
          </div>

          {/* Right: Controls (View Style, Audio, Contents) */}
          <div className="flex items-center gap-2">
            {/* View Mode Toggle: 3D Flip vs Continuous Scroll */}
            <button
              onClick={() => setViewStyle((s) => (s === "flip" ? "scroll" : "flip"))}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors text-xs font-medium border border-white/10"
              title={viewStyle === "flip" ? "Switch to Scroll Mode" : "Switch to 3D Flip Mode"}
            >
              {viewStyle === "flip" ? (
                <>
                  <Layers className="w-3.5 h-3.5 text-[#55B96A]" />
                  <span className="hidden sm:inline">Flip View</span>
                </>
              ) : (
                <>
                  <Scroll className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span className="hidden sm:inline">Scroll View</span>
                </>
              )}
            </button>

            {/* Sound Toggle (Off by default) */}
            <button
              onClick={() => {
                const nextState = !soundOn;
                setSoundOn(nextState);
                if (nextState) sfx.playPageFlip();
              }}
              className={`p-2 rounded-full transition-colors border ${
                soundOn
                  ? "bg-[#55B96A]/20 border-[#55B96A] text-[#55B96A]"
                  : "bg-white/5 border-white/10 text-white/50 hover:text-white"
              }`}
              title={soundOn ? "Sound Effects Enabled" : "Sound Effects Muted"}
              aria-label="Toggle Page Flip Sound"
            >
              {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Contents Drawer Trigger */}
            <button
              onClick={() => setShowContents(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0B5D46] hover:bg-[#073B30] text-white text-xs font-bold transition-colors shadow-xs"
              aria-label="Open Table of Contents"
            >
              <List className="w-4 h-4" />
              <span className="hidden sm:inline">Contents</span>
            </button>
          </div>
        </header>
      )}

      {/* ── Main View Area ── */}
      <AnimatePresence mode="wait">
        {mode === "cover" && (
          <StorybookCoverScreen
            key="cover"
            onOpen={() => {
              setMode("reading");
              setCurrentPage(1);
            }}
          />
        )}

        {mode === "reading" && (
          <div
            key="reading"
            className="flex-1 flex flex-col min-h-0 relative"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* 3D Animated Page Flip Mode */}
            {viewStyle === "flip" && (
              <div
                className="flex-1 flex items-center justify-center p-3 sm:p-6 overflow-hidden"
                style={{ perspective: "1800px" }}
              >
                <AnimatePresence mode="wait" custom={flipDirection}>
                  <motion.div
                    key={currentPage}
                    custom={flipDirection}
                    initial={
                      prefersReduced
                        ? { opacity: 0 }
                        : {
                            rotateY: flipDirection > 0 ? 80 : -80,
                            opacity: 0,
                            scale: 0.94,
                          }
                    }
                    animate={{
                      rotateY: 0,
                      opacity: 1,
                      scale: 1,
                    }}
                    exit={
                      prefersReduced
                        ? { opacity: 0 }
                        : {
                            rotateY: flipDirection > 0 ? -80 : 80,
                            opacity: 0,
                            scale: 0.94,
                          }
                    }
                    transition={{
                      duration: prefersReduced ? 0.2 : 0.45,
                      ease: [0.25, 1, 0.5, 1],
                    }}
                    style={{
                      transformOrigin: flipDirection > 0 ? "left center" : "right center",
                      transformStyle: "preserve-3d",
                    }}
                    className="w-full flex justify-center"
                  >
                    <StorybookPageCard
                      page={activePageData}
                      priority
                      onNext={handleNext}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            )}

            {/* Continuous Vertical Snap Scroll Mode */}
            {viewStyle === "scroll" && (
              <div
                ref={scrollContainerRef}
                className="flex-1 overflow-y-auto px-4 py-6 space-y-8 scroll-smooth"
                style={{ scrollSnapType: "y mandatory" }}
              >
                {STORYBOOK_PAGES.map((page, idx) => (
                  <div
                    key={page.pageNumber}
                    ref={(el) => {
                      pageRefs.current[idx] = el;
                    }}
                    data-page-number={page.pageNumber}
                    className="w-full flex flex-col items-center justify-center py-2"
                    style={{ scrollSnapAlign: "center" }}
                  >
                    <div className="w-full max-w-[540px] mb-2 flex items-center justify-between text-xs text-white/50 px-2 font-mono">
                      <span>PAGE {String(page.pageNumber).padStart(2, "0")}</span>
                      <span>{page.chapter}</span>
                    </div>

                    <StorybookPageCard
                      page={page}
                      priority={Math.abs(page.pageNumber - currentPage) <= 1}
                      onNext={handleNext}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* ── Bottom Reading Controls Bar ── */}
            <div className="bg-[#04120D] border-t border-white/10 px-4 py-3 shrink-0 z-20">
              {/* Progress Bar & Page Counter */}
              <div className="w-full max-w-xl mx-auto mb-2">
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#55B96A] via-[#D4AF37] to-[#C5A028] rounded-full"
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <div className="flex items-center justify-between mt-1 text-[11px] font-mono text-white/60">
                  <span>VOL. 1: BEYOND THE EIGHT PATHS</span>
                  <span className="font-bold text-[#D4AF37]">
                    PAGE {String(currentPage).padStart(2, "0")} / {STORYBOOK_META.totalPages}
                  </span>
                </div>
              </div>

              {/* Action Buttons: Prev / Page Indicator / Next */}
              <div className="flex items-center justify-between max-w-xl mx-auto">
                <button
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:pointer-events-none text-white text-xs font-bold transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <div className="text-center">
                  <span className="text-xs font-serif font-bold text-white/90 block truncate max-w-[180px] sm:max-w-xs">
                    {activePageData?.title}
                  </span>
                </div>

                {currentPage < STORYBOOK_META.totalPages ? (
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#55B96A] hover:bg-[#0B5D46] text-white text-xs font-bold transition-all shadow-sm"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => setMode("complete")}
                    className="flex items-center gap-1.5 px-6 py-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-[#072820] text-xs font-black uppercase tracking-wider shadow-md hover:opacity-95 transition-opacity"
                  >
                    <span>Finish</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {mode === "complete" && (
          <CompletionScreen
            key="complete"
            onRestart={() => {
              setCurrentPage(1);
              setMode("cover");
            }}
          />
        )}
      </AnimatePresence>

      {/* ── Contents Overlay Drawer ── */}
      <AnimatePresence>
        {showContents && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowContents(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40"
            />
            <ContentsPanel
              key="contents-panel"
              currentPage={currentPage}
              onSelectPage={handleSelectPage}
              onClose={() => setShowContents(false)}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
