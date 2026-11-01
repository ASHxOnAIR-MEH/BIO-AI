"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Focus Areas", href: "#focus-areas" },
    { name: "Programs", href: "#programs" },
    { name: "Partners", href: "#partners" },
    { name: "VedaVerse", href: "/kiosk/vedaverse", isPage: true },
    { name: "History", href: "/ayurveda-history", isPage: true },
    { name: "Contact", href: "#contact" },
  ];

  const closeMenu = () => setMenuOpen(false);

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
              <div className="flex items-center gap-4">
                <Image src="/ksum-logo.png"        alt="KSUM"          width={120} height={45} style={{ width: "auto" }} className="object-contain h-9" />
                <Image src="/kerala-startup.png"   alt="Kerala Startup" width={80}  height={40} style={{ width: "auto" }} className="object-contain h-8" />
              </div>
            </div>

            {/* Nav links + CTA */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-6">
                {navLinks.map((link) =>
                  link.isPage ? (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="text-sm font-semibold text-text-secondary hover:text-bio-green transition-colors"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <button
                      key={link.name}
                      onClick={() => handleNavClick(link.href)}
                      className="text-sm font-semibold text-text-secondary hover:text-bio-green transition-colors"
                    >
                      {link.name}
                    </button>
                  )
                )}
              </div>
              <Link
                href="/kiosk"
                className="inline-flex items-center px-3 py-1 rounded-full bg-[#0B5D46]/10 hover:bg-[#0B5D46]/20 text-sm font-bold text-[#073B30] hover:text-[#0B5D46] transition-all border border-[#55B96A]/30 group"
              >
                <span>Kiosk</span>
              </Link>
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

          {/* ── TABLET / LAPTOP layout (md to xl) ────────────────────────────── */}
          <div className="hidden md:flex xl:hidden items-center justify-between py-3">
            <div className="flex items-center gap-4">
              <Image src="/ksum-logo.png"   alt="KSUM"     width={110} height={40} style={{ width: "auto" }} className="object-contain h-8" />
              <div className="h-7 w-px bg-gray-300 shrink-0" />
              <Image src="/digital-india.png" alt="Digital India" width={80} height={32} style={{ width: "auto" }} className="object-contain h-6" />
              <Image src="/india-ai.png"      alt="IndiaAI"       width={70} height={28} style={{ width: "auto" }} className="object-contain h-5" />
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://zfrmz.com/Ene770rEwgTw2cP7chBH"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-xs font-bold text-white bg-text-primary rounded-full hover:bg-bio-green transition-colors"
              >
                Apply Now ↗
              </a>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 text-text-primary hover:text-bio-green transition-colors touch-manipulation focus:outline-none"
                aria-label="Toggle navigation menu"
                aria-expanded={menuOpen}
              >
                <div className="w-6 h-4 flex flex-col justify-between">
                  <span className={`block h-0.5 bg-current rounded-full transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
                  <span className={`block h-0.5 bg-current rounded-full transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
                  <span className={`block h-0.5 bg-current rounded-full transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
                </div>
              </button>
            </div>
          </div>

          {/* ── MOBILE layout (< md) ─────────────────────────────────────────── */}
          <div className="flex md:hidden items-center justify-between py-2.5">
            {/* Primary partner logo only on mobile */}
            <div className="flex items-center gap-2.5">
              <Image
                src="/ksum-logo.png"
                alt="Kerala Startup Mission"
                width={110}
                height={40}
                style={{ width: "auto" }}
                className="object-contain h-7"
                priority
              />
              <div className="h-5 w-px bg-gray-300" />
              <span className="text-[11px] font-black tracking-tight text-text-primary uppercase leading-tight">
                Bio-AI<br /><span className="text-bio-green font-normal text-[9px] tracking-normal">CoE</span>
              </span>
            </div>

            {/* Mobile actions: Apply Now pill + Hamburger button */}
            <div className="flex items-center gap-2">
              <a
                href="https://zfrmz.com/Ene770rEwgTw2cP7chBH"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 text-xs font-bold text-white bg-bio-green rounded-full active:scale-95 transition-all shadow-xs"
              >
                Apply ↗
              </a>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 rounded-lg text-text-primary hover:bg-black/5 active:bg-black/10 transition-colors touch-manipulation focus:outline-none"
                aria-label="Toggle navigation menu"
                aria-expanded={menuOpen}
              >
                <div className="w-5 h-3.5 flex flex-col justify-between">
                  <span className={`block h-0.5 bg-current rounded-full transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
                  <span className={`block h-0.5 bg-current rounded-full transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
                  <span className={`block h-0.5 bg-current rounded-full transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
                </div>
              </button>
            </div>
          </div>

        </div>
      </nav>

      {/* ─── MOBILE DRAWER MENU (below xl) ─────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
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

              {/* Panel body with navigation links */}
              <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col">
                <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-3">
                  Navigation
                </p>

                <ul className="space-y-1">
                  {navLinks.map((link, idx) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25, delay: idx * 0.05 }}
                    >
                      {link.isPage ? (
                        <Link
                          href={link.href}
                          onClick={closeMenu}
                          className="flex items-center justify-between w-full py-3.5 px-3 rounded-xl text-base font-semibold text-text-primary hover:bg-bio-green/10 hover:text-bio-green transition-colors text-left"
                        >
                          <span>{link.name}</span>
                          <span className="text-text-secondary">➔</span>
                        </Link>
                      ) : (
                        <button
                          onClick={() => handleNavClick(link.href)}
                          className="flex items-center justify-between w-full py-3.5 px-3 rounded-xl text-base font-semibold text-text-primary hover:bg-bio-green/10 hover:text-bio-green transition-colors text-left group"
                        >
                          <span className="group-hover:translate-x-1 transition-transform">
                            {link.name}
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
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
