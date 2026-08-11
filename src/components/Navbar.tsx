"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-offwhite/95 backdrop-blur-md border-b border-gray-200 py-3 sm:py-4" : "bg-transparent py-4 sm:py-6"}`}>
        <div className="max-w-[1400px] w-full mx-auto px-5 sm:px-10 lg:px-12 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center space-x-3 sm:space-x-4 md:space-x-6">
            <Image
              src="/ksum-logo.png"
              alt="Kerala Startup Mission"
              width={140}
              height={56}
              style={{ width: 'auto' }}
              className="object-contain h-8 sm:h-10 md:h-12 shrink-0"
              priority
            />
            {/* Partner logos — only shown on very wide screens */}
            <div className="hidden xl:flex items-center space-x-5 border-l border-gray-300 pl-5 ml-2">
              <Image src="/kerala-it.png" alt="Kerala IT" width={100} height={40} style={{ width: 'auto' }} className="object-contain h-8 w-auto md:h-10" />
              <Image src="/meity.png" alt="MeitY" width={100} height={40} style={{ width: 'auto' }} className="object-contain h-8 w-auto md:h-10" />
              <Image src="/india-ai.png" alt="IndiaAI" width={100} height={40} style={{ width: 'auto' }} className="object-contain h-8 w-auto md:h-10" />
              <Image src="/digital-india.png" alt="Digital India" width={100} height={40} style={{ width: 'auto' }} className="object-contain h-8 w-auto md:h-10" />
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden xl:flex items-center space-x-8 ml-10">
            <Link href="/" className="text-sm font-semibold text-text-primary hover:text-bio-green transition-colors">Home</Link>
            <Link href="#about" className="text-sm font-semibold text-text-primary hover:text-bio-green transition-colors">About</Link>
            <Link href="#domains" className="text-sm font-semibold text-text-primary hover:text-bio-green transition-colors">Domains</Link>
            <Link href="#contact" className="text-sm font-semibold text-text-primary hover:text-bio-green transition-colors">Contact</Link>
            <a
              href="https://zfrmz.com/Ene770rEwgTw2cP7chBH"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-7 py-2.5 text-sm font-bold text-white bg-text-primary rounded-full hover:bg-bio-green transition-colors"
            >
              Apply Now ↗
            </a>
          </div>

          {/* Mobile: Apply button + Hamburger */}
          <div className="flex xl:hidden items-center gap-3">
            <a
              href="https://zfrmz.com/Ene770rEwgTw2cP7chBH"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 text-xs font-bold text-white bg-bio-green rounded-full hover:bg-deep-green transition-colors active:scale-95"
            >
              Apply ↗
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-text-primary p-2 focus:outline-none touch-manipulation"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Full-Screen Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-offwhite flex flex-col pt-24 px-6 pb-8 overflow-y-auto">
          <nav className="flex flex-col space-y-6 text-3xl font-heading font-semibold text-text-primary">
            <Link href="/" onClick={() => setIsOpen(false)} className="border-b border-gray-100 pb-6 hover:text-bio-green transition-colors">Home</Link>
            <Link href="#about" onClick={() => setIsOpen(false)} className="border-b border-gray-100 pb-6 hover:text-bio-green transition-colors">About</Link>
            <Link href="#domains" onClick={() => setIsOpen(false)} className="border-b border-gray-100 pb-6 hover:text-bio-green transition-colors">Domains</Link>
            <Link href="#contact" onClick={() => setIsOpen(false)} className="border-b border-gray-100 pb-6 hover:text-bio-green transition-colors">Contact</Link>
          </nav>

          {/* Partner logos in mobile menu */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-[10px] font-semibold text-text-secondary uppercase tracking-widest mb-5">Backed by</p>
            <div className="flex flex-wrap items-center gap-6">
              <Image src="/ksum-logo.png" alt="KSUM" width={100} height={40} style={{ width: 'auto' }} className="object-contain h-8 w-auto" />
              <Image src="/kerala-it.png" alt="Kerala IT" width={80} height={32} style={{ width: 'auto' }} className="object-contain h-7 w-auto" />
              <Image src="/meity.png" alt="MeitY" width={80} height={32} style={{ width: 'auto' }} className="object-contain h-7 w-auto" />
              <Image src="/india-ai.png" alt="IndiaAI" width={80} height={32} style={{ width: 'auto' }} className="object-contain h-7 w-auto" />
            </div>
          </div>

          {/* Sticky CTA */}
          <div className="mt-auto pt-8 w-full">
            <a
              href="https://zfrmz.com/Ene770rEwgTw2cP7chBH"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center px-8 py-5 text-base font-bold text-white bg-bio-green rounded-full shadow-lg active:scale-95 transition-transform"
            >
              Apply for Incubation ↗
            </a>
          </div>
        </div>
      )}
    </>
  );
}
