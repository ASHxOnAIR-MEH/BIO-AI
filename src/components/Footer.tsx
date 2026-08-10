import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-16 px-6 sm:px-10 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="lg:col-span-1">
            <span className="font-heading font-bold text-lg text-text-primary leading-tight tracking-tight block">BIO-AI CoE</span>
            <span className="text-xs font-medium text-text-secondary uppercase tracking-widest mt-1 block">Kerala Startup Mission</span>
            <p className="mt-6 text-sm text-text-secondary leading-relaxed max-w-sm">
              Accelerating deep-tech innovation at the intersection of AI, biodiversity, and life sciences.
            </p>
          </div>
          
          <div className="lg:col-span-1">
            <h4 className="text-sm font-semibold text-text-primary uppercase tracking-widest mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link href="/" className="text-sm text-text-secondary hover:text-bio-green transition-colors">Home</Link></li>
              <li><Link href="#about" className="text-sm text-text-secondary hover:text-bio-green transition-colors">About the CoE</Link></li>
              <li><Link href="#focus-areas" className="text-sm text-text-secondary hover:text-bio-green transition-colors">Focus Areas</Link></li>
              <li><Link href="#incubation" className="text-sm text-text-secondary hover:text-bio-green transition-colors">Incubation</Link></li>
            </ul>
          </div>
          
          <div className="lg:col-span-1">
            <h4 className="text-sm font-semibold text-text-primary uppercase tracking-widest mb-6">Connect</h4>
            <ul className="space-y-4">
              <li>
                <a 
                  href="https://zfrmz.com/Ene770rEwgTw2cP7chBH" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-text-secondary hover:text-bio-green transition-colors"
                >
                  Apply for Incubation
                </a>
              </li>
              <li><a href="#" className="text-sm text-text-secondary hover:text-bio-green transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-sm text-text-secondary hover:text-bio-green transition-colors">LinkedIn</a></li>
              <li><a href="#" className="text-sm text-text-secondary hover:text-bio-green transition-colors">Twitter</a></li>
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h4 className="text-sm font-semibold text-text-primary uppercase tracking-widest mb-6">Location</h4>
            <address className="not-italic text-sm text-text-secondary leading-relaxed">
              3rd Floor, Digital Hub,<br />
              Kerala Startup Mission,<br />
              Kalamassery, Kochi,<br />
              Kerala, India.
            </address>
          </div>

        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-100">
          <p className="text-xs text-text-secondary mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Bio-AI Centre of Excellence, Kerala Startup Mission. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <Link href="#" className="text-xs text-text-secondary hover:text-bio-green transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-xs text-text-secondary hover:text-bio-green transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
