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
        <div className="max-w-[1400px] w-full mx-auto px-6 sm:px-10 lg:px-12 flex items-center justify-between xl:justify-start">
          
          {/* Logos */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <Image src="/ksum-logo.png" alt="Kerala Startup Mission" width={140} height={56} className="object-contain h-10 w-auto md:h-14 shrink-0" priority />
            <div className="hidden xl:flex items-center space-x-5 border-l border-gray-300 pl-5 ml-2">
              <Image src="/kerala-it.png" alt="Kerala IT" width={100} height={40} className="object-contain h-8 w-auto md:h-10" />
              <Image src="/meity.png" alt="MeitY" width={100} height={40} className="object-contain h-8 w-auto md:h-10" />
              <Image src="/india-ai.png" alt="IndiaAI" width={100} height={40} className="object-contain h-8 w-auto md:h-10" />
              <Image src="/digital-india.png" alt="Digital India" width={100} height={40} className="object-contain h-8 w-auto md:h-10" />
            </div>
          </div>

          {/* Desktop Links & Apply Button - Flowing from left */}
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

          {/* Mobile Menu Toggle */}
          <div className="flex xl:hidden items-center ml-auto">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-text-primary p-2 focus:outline-none"
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
            <Link href="#domains" onClick={() => setIsOpen(false)}>Domains</Link>
            <Link href="#contact" onClick={() => setIsOpen(false)}>Contact</Link>
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
