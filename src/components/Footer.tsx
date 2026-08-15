import Image from "next/image";

const socialLinks = [
  {
    name: "Website",
    href: "https://startupmission.kerala.gov.in/",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/keralastartupmission/",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/kerala-startup-mission",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/keralastartupmission/",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-white border-t border-gray-200 py-10 sm:py-16 px-5 sm:px-10 lg:px-12 scroll-mt-24 sm:scroll-mt-32">
      <div className="max-w-7xl mx-auto">

        {/* Main Grid: Info Left, Map Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 mb-10 sm:mb-16 items-start">

          {/* Left Column (Brand, Address, Contact, Socials) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <Image
                src="/ksum-logo.png"
                alt="Kerala Startup Mission"
                width={140}
                height={56}
                style={{ width: "auto" }}
                className="object-contain h-10 mb-3"
              />
              <span className="font-heading font-bold text-lg text-text-primary leading-tight tracking-tight block">
                BIO-AI CoE
              </span>
              <span className="text-xs font-semibold text-text-secondary uppercase tracking-widest mt-1 block">
                Kerala Startup Mission
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 text-sm text-text-secondary">
              <div>
                <h4 className="text-xs font-bold text-text-primary uppercase tracking-widest mb-2">
                  Location
                </h4>
                <p className="leading-relaxed">
                  3rd Floor, Digital Hub,<br />
                  Kinfra Hi-Tech Park,<br />
                  HMT Colony P.O., North Kalamassery,<br />
                  Kochi, Kerala - 683503
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-text-primary uppercase tracking-widest mb-2">
                  Contact
                </h4>
                <address className="not-italic space-y-1">
                  <a
                    href="tel:08047180470"
                    className="hover:text-bio-green transition-colors font-medium text-text-primary block"
                  >
                    08047180470
                  </a>
                  <span className="text-xs text-text-secondary block">8:00 AM – 8:00 PM</span>
                  <a
                    href="mailto:bioai@startupmission.in"
                    className="hover:text-bio-green transition-colors block pt-1"
                  >
                    bioai@startupmission.in
                  </a>
                </address>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="pt-2">
              <h4 className="text-xs font-bold text-text-primary uppercase tracking-widest mb-3">
                Connect With Us
              </h4>
              <div className="flex items-center gap-3">
                {socialLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                    className="w-10 h-10 rounded-full bg-blue-light/70 text-blue flex items-center justify-center hover:bg-blue hover:text-white transition-all shadow-sm active:scale-95"
                    title={item.name}
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Google Maps Embed */}
          <div className="lg:col-span-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-text-primary uppercase tracking-widest">
                Location Map
              </h4>
              <a
                href="https://www.google.com/maps/search/Kerala+Technology+Innovation+Zone+-+Cochin++Kinfra+Hi-Tech+Park,+HMT+Colony+P.O.,+Kalamassery,+HMT+Colony,+North+Kalamassery,+HMT+Kalamassery,+Kochi,+Kerala+683503/@10.055025,76.353902,10z"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-blue hover:underline flex items-center gap-1"
              >
                Open in Google Maps ↗
              </a>
            </div>
            <div className="w-full h-64 sm:h-72 md:h-80 rounded-2xl overflow-hidden shadow-md border border-gray-200 relative bg-surface-secondary">
              <iframe
                title="Kerala Technology Innovation Zone Location Map"
                src="https://maps.google.com/maps?q=Kerala+Technology+Innovation+Zone+-+Cochin++Kinfra+Hi-Tech+Park,+HMT+Colony+P.O.,+Kalamassery,+Kochi,+Kerala+683503&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 sm:pt-8 border-t border-gray-200 gap-3 text-center sm:text-left">
          <p className="text-[10px] sm:text-xs text-text-secondary">
            &copy; {new Date().getFullYear()} Bio-AI Centre of Excellence, Kerala Startup Mission. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 sm:space-x-6">
            <a
              href="https://policy.ksum.in/privacy_policy.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] sm:text-xs text-text-secondary hover:text-bio-green transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="https://policy.ksum.in/terms.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] sm:text-xs text-text-secondary hover:text-bio-green transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
