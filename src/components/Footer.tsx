import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer id="contact" className="bg-white border-t border-gray-200 py-10 sm:py-16 px-5 sm:px-10 lg:px-12 scroll-mt-24 sm:scroll-mt-32">
      <div className="max-w-7xl mx-auto">

        {/* Top grid: stacked on mobile, 2-col on sm, 4-col on lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-10 sm:mb-16">

          {/* Brand */}
          <div className="col-span-1">
            <Image
              src="/ksum-logo.png"
              alt="Kerala Startup Mission"
              width={120}
              height={48}
              style={{ width: "auto" }}
              className="object-contain h-10 mb-3"
            />
            <span className="font-heading font-bold text-base text-text-primary leading-tight tracking-tight block">
              BIO-AI CoE
            </span>
            <span className="text-[10px] sm:text-xs font-medium text-text-secondary uppercase tracking-widest mt-1 block">
              Kerala Startup Mission
            </span>
            <p className="mt-4 text-xs sm:text-sm text-text-secondary leading-relaxed">
              3rd Floor, Digital Hub,<br />
              Kinfra Hi-Tech Park,<br />
              HMT Colony P.O.,<br />
              North Kalamassery,<br />
              Kochi, Kerala - 683503
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="text-xs font-semibold text-text-primary uppercase tracking-widest mb-4 sm:mb-6">
              Quick Links
            </h4>
            <ul className="space-y-0">
              {[
                { label: "Home",       href: "/"            },
                { label: "About",      href: "/#about"      },
                { label: "Incubation", href: "/#opportunity"},
                { label: "Contact",    href: "/#contact"    },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-bio-green transition-colors flex items-center min-h-[40px] py-0.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="col-span-1">
            <h4 className="text-xs font-semibold text-text-primary uppercase tracking-widest mb-4 sm:mb-6">
              Connect
            </h4>
            <ul className="space-y-0">
              {[
                {
                  label: "Website",
                  href: "https://startupmission.kerala.gov.in/",
                  display: "startupmission.kerala.gov.in",
                },
                {
                  label: "Instagram",
                  href: "https://www.instagram.com/keralastartupmission/",
                  display: "@keralastartupmission",
                },
                {
                  label: "LinkedIn",
                  href: "https://www.linkedin.com/company/kerala-startup-mission",
                  display: "Kerala Startup Mission",
                },
                {
                  label: "Facebook",
                  href: "https://www.facebook.com/keralastartupmission/",
                  display: "Kerala Startup Mission",
                },
              ].map((item) => (
                <li key={item.label} className="flex flex-col min-h-[44px] justify-center py-0.5">
                  <span className="font-medium text-text-primary text-xs mb-0.5">{item.label}:</span>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm text-text-secondary hover:text-bio-green transition-colors break-all"
                  >
                    {item.display}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h4 className="text-xs font-semibold text-text-primary uppercase tracking-widest mb-4 sm:mb-6">
              Contact
            </h4>
            <address className="not-italic text-sm text-text-secondary flex flex-col space-y-1">
              <a
                href="tel:08047180470"
                className="hover:text-bio-green transition-colors font-medium text-text-primary flex items-center min-h-[44px]"
              >
                08047180470
              </a>
              <span className="text-xs text-text-secondary pb-2">8:00 AM – 8:00 PM</span>
              <a
                href="mailto:info@startupmission.in"
                className="hover:text-bio-green transition-colors text-sm flex items-center min-h-[44px]"
              >
                info@startupmission.in
              </a>
            </address>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 sm:pt-8 border-t border-gray-100 gap-3 text-center sm:text-left">
          <p className="text-[10px] sm:text-xs text-text-secondary">
            &copy; {new Date().getFullYear()} Bio-AI Centre of Excellence, Kerala Startup Mission. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 sm:space-x-6">
            <Link href="#" className="text-[10px] sm:text-xs text-text-secondary hover:text-bio-green transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-[10px] sm:text-xs text-text-secondary hover:text-bio-green transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
