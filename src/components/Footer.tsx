import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-12 sm:py-16 px-5 sm:px-10 lg:px-12">
      <div className="max-w-7xl mx-auto">

        {/* Top grid: 2-col on mobile, 4-col on lg */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-10 sm:mb-16">

          {/* Brand — full width on mobile */}
          <div className="col-span-2 lg:col-span-1">
            <Image src="/ksum-logo.png" alt="Kerala Startup Mission" width={120} height={48} style={{ width: 'auto' }} className="object-contain h-10 mb-4" />
            <span className="font-heading font-bold text-base text-text-primary leading-tight tracking-tight block">BIO-AI CoE</span>
            <span className="text-[10px] sm:text-xs font-medium text-text-secondary uppercase tracking-widest mt-1 block">Kerala Startup Mission</span>
            <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-text-secondary leading-relaxed">
              3rd Floor, Digital Hub,<br />
              Kinfra Hi-Tech Park,<br />
              HMT Colony P.O.,<br />
              North Kalamassery,<br />
              Kochi, Kerala - 683503
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 lg:col-span-1">
            <h4 className="text-xs sm:text-sm font-semibold text-text-primary uppercase tracking-widest mb-4 sm:mb-6">Quick Links</h4>
            <ul className="space-y-3 sm:space-y-4">
              <li><Link href="/" className="text-xs sm:text-sm text-text-secondary hover:text-bio-green transition-colors">Home</Link></li>
              <li><Link href="/#about" className="text-xs sm:text-sm text-text-secondary hover:text-bio-green transition-colors">About</Link></li>
              <li><Link href="/#opportunity" className="text-xs sm:text-sm text-text-secondary hover:text-bio-green transition-colors">Incubation</Link></li>
              <li><Link href="/#contact" className="text-xs sm:text-sm text-text-secondary hover:text-bio-green transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div className="col-span-1 lg:col-span-1">
            <h4 className="text-xs sm:text-sm font-semibold text-text-primary uppercase tracking-widest mb-4 sm:mb-6">Connect</h4>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex flex-col">
                <span className="font-medium text-text-primary text-xs sm:text-sm mb-0.5">Website:</span>
                <a href="https://startupmission.kerala.gov.in/" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-text-secondary hover:text-bio-green transition-colors">
                  startupmission.kerala.gov.in
                </a>
              </li>
              <li className="flex flex-col">
                <span className="font-medium text-text-primary text-xs sm:text-sm mb-0.5">Instagram:</span>
                <a href="https://www.instagram.com/keralastartupmission/" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-text-secondary hover:text-bio-green transition-colors">
                  @keralastartupmission
                </a>
              </li>
              <li className="flex flex-col">
                <span className="font-medium text-text-primary text-xs sm:text-sm mb-0.5">LinkedIn:</span>
                <a href="https://www.linkedin.com/company/kerala-startup-mission" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-text-secondary hover:text-bio-green transition-colors">
                  Kerala Startup Mission
                </a>
              </li>
              <li className="flex flex-col">
                <span className="font-medium text-text-primary text-xs sm:text-sm mb-0.5">Facebook:</span>
                <a href="https://www.facebook.com/keralastartupmission/" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-text-secondary hover:text-bio-green transition-colors">
                  Kerala Startup Mission
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 sm:col-span-1 lg:col-span-1">
            <h4 className="text-xs sm:text-sm font-semibold text-text-primary uppercase tracking-widest mb-4 sm:mb-6">Contact</h4>
            <address className="not-italic text-xs sm:text-sm text-text-secondary leading-relaxed flex flex-col space-y-2">
              <a href="tel:08047180470" className="hover:text-bio-green transition-colors">
                08047180470
              </a>
              <span>8:00 AM - 8:00 PM</span>
              <a href="mailto:info@startupmission.in" className="hover:text-bio-green transition-colors">
                info@startupmission.in
              </a>
            </address>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 sm:pt-8 border-t border-gray-100 gap-3">
          <p className="text-[10px] sm:text-xs text-text-secondary text-center sm:text-left">
            &copy; {new Date().getFullYear()} Bio-AI Centre of Excellence, Kerala Startup Mission. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 sm:space-x-6">
            <Link href="#" className="text-[10px] sm:text-xs text-text-secondary hover:text-bio-green transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-[10px] sm:text-xs text-text-secondary hover:text-bio-green transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
