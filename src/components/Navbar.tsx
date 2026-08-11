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

          {/* --- DESKTOP LOGO GROUP --- */}
          <div className="hidden xl:flex items-center gap-6">
            {/* National Ecosystem */}
            <div className="flex items-center gap-5">
              <Image src="/meity.png" alt="MeitY" width={100} height={40} style={{ width: 'auto' }} className="object-contain h-8" />
              <Image src="/india-ai.png" alt="IndiaAI" width={100} height={40} style={{ width: 'auto' }} className="object-contain h-8" />
              <Image src="/digital-india.png" alt="Digital India" width={100} height={40} style={{ width: 'auto' }} className="object-contain h-8" />
            </div>

            {/* Separator */}
            <div className="h-12 w-px bg-gray-300 shrink-0"></div>

            {/* Kerala Ecosystem */}
            <div className="flex items-center gap-5">
              <Image src="/ksum-logo.png" alt="Kerala Startup Mission" width={256} height={104} style={{ width: 'auto' }} className="object-contain h-20 shrink-0" priority />
              <Image src="/kerala-it.png" alt="Kerala IT" width={100} height={40} style={{ width: 'auto' }} className="object-contain h-8" />
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden xl:flex items-center space-x-8 ml-10">
            <Link href="/" className="text-sm font-semibold text-text-primary hover:text-bio-green transition-colors">Home</Link>
            <Link href="#about" className="text-sm font-semibold text-text-primary hover:text-bio-green transition-colors">About</Link>
            <Link href="#opportunity" className="text-sm font-semibold text-text-primary hover:text-bio-green transition-colors">Incubation</Link>
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

          {/* --- MOBILE/TABLET HEADER --- */}
          <div className="flex xl:hidden flex-col w-full gap-3 sm:gap-4">
            {/* Top Row: KSUM + Controls */}
            <div className="flex items-center justify-between w-full">
              <Image src="/ksum-logo.png" alt="Kerala Startup Mission" width={200} height={80} style={{ width: 'auto' }} className="object-contain h-10 sm:h-12 shrink-0" priority />
              <div className="flex items-center gap-2 sm:gap-3">
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
                  className="text-text-primary p-1 sm:p-2 focus:outline-none touch-manipulation"
                  aria-label="Toggle menu"
                >
                  {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>

            {/* Bottom Row: Remaining Logos */}
            <div className="flex items-center gap-3 sm:gap-4 pb-1">
              <Image src="/meity.png" alt="MeitY" width={70} height={28} style={{ width: 'auto' }} className="object-contain h-4 sm:h-5 shrink-0" />
              <Image src="/india-ai.png" alt="IndiaAI" width={70} height={28} style={{ width: 'auto' }} className="object-contain h-4 sm:h-5 shrink-0" />
              <Image src="/digital-india.png" alt="Digital India" width={70} height={28} style={{ width: 'auto' }} className="object-contain h-4 sm:h-5 shrink-0" />
              
              <div className="h-4 sm:h-5 w-px bg-gray-300 shrink-0"></div>
              
              <Image src="/kerala-it.png" alt="Kerala IT" width={70} height={28} style={{ width: 'auto' }} className="object-contain h-4 sm:h-5 shrink-0" />
            </div>
          </div>

        </div>
      </nav>

      {/* Mobile Full-Screen Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-offwhite flex flex-col pt-32 px-6 pb-8 overflow-y-auto">
          <nav className="flex flex-col space-y-6 text-3xl font-heading font-semibold text-text-primary">
            <Link href="/" onClick={() => setIsOpen(false)} className="border-b border-gray-100 pb-6 hover:text-bio-green transition-colors">Home</Link>
            <Link href="#about" onClick={() => setIsOpen(false)} className="border-b border-gray-100 pb-6 hover:text-bio-green transition-colors">About</Link>
            <Link href="#opportunity" onClick={() => setIsOpen(false)} className="border-b border-gray-100 pb-6 hover:text-bio-green transition-colors">Incubation</Link>
            <Link href="#contact" onClick={() => setIsOpen(false)} className="border-b border-gray-100 pb-6 hover:text-bio-green transition-colors">Contact</Link>
          </nav>

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
