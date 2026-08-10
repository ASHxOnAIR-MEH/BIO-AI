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

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-offwhite/90 backdrop-blur-md border-b border-gray-200 py-4" : "bg-transparent py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex items-center justify-between">
          {/* Left: Branding */}
          <div className="flex items-center space-x-4">
            <Image src="/ksum-logo.png" alt="Kerala Startup Mission" width={140} height={56} className="object-contain h-10 w-auto md:h-14" priority />
            <span className="font-heading font-semibold text-xs md:text-sm text-text-primary leading-snug tracking-wide max-w-[120px] md:max-w-none">BIO-AI CENTRE OF EXCELLENCE</span>
          </div>

          {/* Center: Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-10">
            <Link href="/" className="text-sm font-medium text-text-primary hover:text-bio-green transition-colors">Home</Link>
            <Link href="#about" className="text-sm font-medium text-text-primary hover:text-bio-green transition-colors">About</Link>
            <Link href="#focus-areas" className="text-sm font-medium text-text-primary hover:text-bio-green transition-colors">Focus Areas</Link>
            <Link href="#incubation" className="text-sm font-medium text-text-primary hover:text-bio-green transition-colors">Incubation</Link>
          </div>

          {/* Right: CTA & Mobile Toggle */}
          <div className="flex items-center space-x-4">
            <a 
              href="https://zfrmz.com/Ene770rEwgTw2cP7chBH" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center justify-center px-7 py-2.5 text-sm font-bold text-white bg-text-primary rounded-full hover:bg-bio-green transition-colors"
            >
              Apply Now ↗
            </a>
            
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-text-primary p-2 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-offwhite pt-28 px-8 md:hidden flex flex-col">
          <div className="flex flex-col space-y-8 text-3xl font-heading font-semibold text-text-primary">
            <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
            <Link href="#about" onClick={() => setIsOpen(false)}>About</Link>
            <Link href="#focus-areas" onClick={() => setIsOpen(false)}>Focus Areas</Link>
            <Link href="#incubation" onClick={() => setIsOpen(false)}>Incubation</Link>
          </div>
          
          {/* Mobile Sticky CTA */}
          <div className="mt-auto pb-12 w-full">
            <a 
              href="https://zfrmz.com/Ene770rEwgTw2cP7chBH" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center px-8 py-5 text-lg font-bold text-white bg-bio-green rounded-full shadow-lg"
            >
              Apply Now ↗
            </a>
          </div>
        </div>
      )}
    </>
  );
}
