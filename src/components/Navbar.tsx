"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// ─── Nav Links ────────────────────────────────────────────────────────────────

const navLinks = [
  { label: "Home",       href: "/"            },
  { label: "About",      href: "#about"       },
  { label: "Incubation", href: "#opportunity" },
  { label: "Contact",    href: "#contact"     },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function Navbar() {
  const [isOpen, setIsOpen]       = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const navRef                    = useRef<HTMLElement>(null);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  const handleNavClick = (href: string) => {
    closeMenu();
    if (href === "/") {
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 400);
    } else if (href.startsWith("#")) {
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 400);
    }
  };

  return (
    <>
      {/* ─── NAVBAR ──────────────────────────────────────────────────────────── */}
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-offwhite/95 backdrop-blur-md border-b border-gray-200"
            : "bg-offwhite/90 backdrop-blur-sm"
        }`}
      >
        {/* ── Inner wrapper — constrained width, never wider than viewport ─── */}
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">

          {/* ── DESKTOP layout (xl+) ─────────────────────────────────────────── */}
          <div className="hidden xl:flex items-center justify-between py-4">
            {/* Logo group */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-5">
                <Image src="/meity.png"         alt="MeitY"         width={100} height={40} style={{ width: "auto" }} className="object-contain h-8" />
                <Image src="/india-ai.png"      alt="IndiaAI"       width={100} height={40} style={{ width: "auto" }} className="object-contain h-8" />
                <Image src="/digital-india.png" alt="Digital India" width={100} height={40} style={{ width: "auto" }} className="object-contain h-8" />
              </div>
              <div className="h-10 w-px bg-gray-300 shrink-0" />
              <div className="flex items-center gap-5">
                <Image src="/ksum-logo.png" alt="Kerala Startup Mission" width={220} height={88} style={{ width: "auto" }} className="object-contain h-16 shrink-0" priority />
                <Image src="/kerala-it.png" alt="Kerala IT"              width={100} height={40} style={{ width: "auto" }} className="object-contain h-8" />
              </div>
            </div>

            {/* Nav links + CTA */}
            <div className="flex items-center gap-8">
              <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="text-sm font-semibold text-text-primary hover:text-bio-green transition-colors">Home</button>
              <a href="#about" className="text-sm font-semibold text-text-primary hover:text-bio-green transition-colors">About</a>
              <a href="#opportunity" className="text-sm font-semibold text-text-primary hover:text-bio-green transition-colors">Incubation</a>
              <a href="#contact" className="text-sm font-semibold text-text-primary hover:text-bio-green transition-colors">Contact</a>
              <a
                href="https://zfrmz.com/Ene770rEwgTw2cP7chBH"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold text-white bg-text-primary rounded-full hover:bg-bio-green transition-colors"
              >
                Apply Now ↗
              </a>
            </div>
          </div>

          {/* ── MOBILE / TABLET layout (< xl) ────────────────────────────────── */}
          <div className="xl:hidden flex flex-col py-3">

            {/* Row 1 — Central Govt / IndiaAI Ecosystem */}
            <div className="flex items-center gap-4 sm:gap-6 pb-3">
              <Image src="/meity.png"         alt="MeitY"         width={76} height={30} style={{ width: "auto" }} className="object-contain h-[22px] sm:h-[24px] shrink-0" />
              <Image src="/india-ai.png"      alt="IndiaAI"       width={76} height={30} style={{ width: "auto" }} className="object-contain h-[22px] sm:h-[24px] shrink-0" />
              <Image src="/digital-india.png" alt="Digital India" width={76} height={30} style={{ width: "auto" }} className="object-contain h-[22px] sm:h-[24px] shrink-0" />
            </div>

            {/* Row 2 — Kerala Ecosystem + Hamburger */}
            <div className="flex items-center justify-between border-t border-gray-200/80 pt-3">
              <div className="flex items-center gap-3 sm:gap-4">
                <Image
                  src="/ksum-logo.png"
                  alt="Kerala Startup Mission"
                  width={140}
                  height={56}
                  style={{ width: "auto" }}
                  className="object-contain h-[34px] sm:h-[38px] shrink-0"
                  priority
                />
                <div className="h-5 w-px bg-gray-300 shrink-0" />
                <Image src="/kerala-it.png" alt="Kerala IT" width={68} height={28} style={{ width: "auto" }} className="object-contain h-[22px] sm:h-[24px] shrink-0" />
              </div>

              <div className="flex items-center gap-2">
                {/* Apply — visible on sm tablet, hidden on phone (CTA is in Hero) */}
                <a
                  href="https://zfrmz.com/Ene770rEwgTw2cP7chBH"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-bold text-white bg-bio-green rounded-full hover:bg-deep-green transition-colors active:scale-95"
                >
                  Apply Now ↗
                </a>

                {/* Hamburger button */}
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="w-10 h-10 flex flex-col items-center justify-center gap-[5px] focus:outline-none touch-manipulation rounded-lg hover:bg-black/5 transition-colors"
                  aria-label={isOpen ? "Close menu" : "Open menu"}
                  aria-expanded={isOpen}
                >
                  <motion.span
                    animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="block h-[2px] bg-text-primary rounded-full origin-center"
                    style={{ width: "22px" }}
                  />
                  <motion.span
                    animate={isOpen ? { opacity: 0, x: -6 } : { opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="block h-[2px] bg-text-primary rounded-full"
                    style={{ width: "16px" }}
                  />
                  <motion.span
                    animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="block h-[2px] bg-text-primary rounded-full origin-center"
                    style={{ width: "22px" }}
                  />
                </button>
              </div>
            </div>

          </div>

        </div>
      </nav>

      {/* ─── MOBILE SLIDE-IN MENU ────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[55] bg-black/40 backdrop-blur-[2px]"
              onClick={closeMenu}
              aria-hidden="true"
            />

            {/* Panel */}
            <motion.div
              key="menu-panel"
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.38, ease: "easeInOut" }}
              className="fixed top-0 left-0 bottom-0 z-[60] w-[82vw] max-w-[340px] bg-offwhite shadow-2xl flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation"
            >
              {/* Panel header */}
              <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-100">
                <Image
                  src="/ksum-logo.png"
                  alt="Kerala Startup Mission"
                  width={150}
                  height={60}
                  style={{ width: "auto" }}
                  className="object-contain h-9"
                />
                <button
                  onClick={closeMenu}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/8 transition-colors touch-manipulation focus:outline-none"
                  aria-label="Close menu"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="1" y1="1" x2="15" y2="15" />
                    <line x1="15" y1="1" x2="1" y2="15" />
                  </svg>
                </button>
              </div>

              {/* Nav list */}
              <nav className="flex-1 flex flex-col overflow-y-auto px-5 pt-3 pb-5">
                <ul className="flex flex-col">
                  {navLinks.map((link, i) => (
                    <motion.li
                      key={link.label}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 + i * 0.06 }}
                    >
                      {link.href === "/" ? (
                        <button
                          onClick={() => handleNavClick(link.href)}
                          className="flex items-center justify-between w-full py-[14px] border-b border-gray-100 group min-h-[52px] text-left"
                        >
                          <span className="text-2xl font-heading font-semibold text-text-primary group-hover:text-bio-green transition-colors">
                            {link.label}
                          </span>
                          <span className="text-text-secondary group-hover:text-bio-green transition-colors">↗</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleNavClick(link.href)}
                          className="flex items-center justify-between w-full py-[14px] border-b border-gray-100 group min-h-[52px] text-left"
                        >
                          <span className="text-2xl font-heading font-semibold text-text-primary group-hover:text-bio-green transition-colors">
                            {link.label}
                          </span>
                          <span className="text-text-secondary group-hover:text-bio-green transition-colors">↗</span>
                        </button>
                      )}
                    </motion.li>
                  ))}
                </ul>

                <div className="flex-1 min-h-[24px]" />

                {/* CTA */}
                <motion.div
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.35, delay: 0.42 }}
                >
                  <a
                    href="https://zfrmz.com/Ene770rEwgTw2cP7chBH"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMenu}
                    className="flex items-center justify-center w-full px-5 py-4 text-sm font-bold text-white bg-bio-green rounded-2xl hover:bg-deep-green active:scale-95 transition-all shadow-md min-h-[52px]"
                  >
                    Apply for Bio-AI Incubation ↗
                  </a>
                </motion.div>

                {/* Institutional logos */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.52 }}
                  className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-center gap-4 flex-wrap"
                >
                  <Image src="/meity.png"         alt="MeitY"         width={44} height={18} style={{ width: "auto" }} className="object-contain h-[14px] opacity-50" />
                  <Image src="/india-ai.png"      alt="IndiaAI"       width={44} height={18} style={{ width: "auto" }} className="object-contain h-[14px] opacity-50" />
                  <Image src="/digital-india.png" alt="Digital India" width={44} height={18} style={{ width: "auto" }} className="object-contain h-[14px] opacity-50" />
                  <Image src="/kerala-it.png"     alt="Kerala IT"     width={44} height={18} style={{ width: "auto" }} className="object-contain h-[14px] opacity-50" />
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
