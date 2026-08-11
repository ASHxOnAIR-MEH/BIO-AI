import Image from "next/image";

export default function CredibilityStrip() {
  return (
    <section className="border-y border-gray-200 bg-white py-10 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-12">
        <p className="text-center text-[10px] sm:text-xs font-semibold text-text-secondary uppercase tracking-widest mb-8 sm:mb-10">
          An Ecosystem Initiative Backed By
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16">
          {/* National Ecosystem */}
          <div className="flex items-center justify-center gap-6 sm:gap-10 md:gap-12">
            <a
              href="https://xn--m1bdba5a7gresc7dsa.xn--11b7cb3a6a.xn--h2brj9c/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit MeitY"
              className="group flex flex-col items-center gap-2 sm:gap-4 cursor-pointer hover:opacity-90 hover:scale-[1.02] transition-all duration-300"
            >
              <Image
                src="/meity.png"
                alt="MeitY"
                width={128}
                height={64}
                loading="eager"
                style={{ width: "auto" }}
                className="object-contain h-8 sm:h-10 md:h-12"
              />
              <span className="hidden sm:block text-[10px] md:text-xs font-bold text-text-secondary group-hover:text-text-primary uppercase tracking-widest text-center transition-colors">MeitY</span>
            </a>
            <a
              href="https://indiaai.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit IndiaAI"
              className="group flex flex-col items-center gap-2 sm:gap-4 cursor-pointer hover:opacity-90 hover:scale-[1.02] transition-all duration-300"
            >
              <Image
                src="/india-ai.png"
                alt="IndiaAI"
                width={128}
                height={64}
                style={{ width: "auto" }}
                className="object-contain h-8 sm:h-10 md:h-12"
              />
              <span className="hidden sm:block text-[10px] md:text-xs font-bold text-text-secondary group-hover:text-text-primary uppercase tracking-widest text-center transition-colors">IndiaAI</span>
            </a>
            <a
              href="https://www.digitalindia.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Digital India"
              className="group flex flex-col items-center gap-2 sm:gap-4 cursor-pointer hover:opacity-90 hover:scale-[1.02] transition-all duration-300"
            >
              <Image
                src="/digital-india.png"
                alt="Digital India"
                width={128}
                height={64}
                style={{ width: "auto" }}
                className="object-contain h-8 sm:h-10 md:h-12"
              />
              <span className="hidden sm:block text-[10px] md:text-xs font-bold text-text-secondary group-hover:text-text-primary uppercase tracking-widest text-center transition-colors">Digital India</span>
            </a>
          </div>

          {/* Separator */}
          <div className="hidden md:block w-px h-16 lg:h-20 bg-gray-300"></div>
          <div className="block md:hidden w-32 h-px bg-gray-300"></div>

          {/* Kerala Ecosystem */}
          <div className="flex items-center justify-center gap-6 sm:gap-10 md:gap-12">
            <a
              href="https://startupmission.kerala.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Kerala Startup Mission"
              className="group flex flex-col items-center gap-2 sm:gap-4 cursor-pointer hover:opacity-90 hover:scale-[1.02] transition-all duration-300"
            >
              <Image
                src="/ksum-logo.png"
                alt="Kerala Startup Mission"
                width={192}
                height={80}
                style={{ width: "auto" }}
                className="object-contain h-12 sm:h-14 md:h-16 lg:h-20"
              />
              <span className="hidden sm:block text-[10px] md:text-xs font-bold text-text-secondary group-hover:text-text-primary uppercase tracking-widest text-center transition-colors">Kerala Startup Mission</span>
            </a>
            <a
              href="https://itmission.kerala.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Kerala IT"
              className="group flex flex-col items-center gap-2 sm:gap-4 cursor-pointer hover:opacity-90 hover:scale-[1.02] transition-all duration-300"
            >
              <Image
                src="/kerala-it.png"
                alt="Kerala IT"
                width={128}
                height={64}
                style={{ width: "auto" }}
                className="object-contain h-8 sm:h-10 md:h-12"
              />
              <span className="hidden sm:block text-[10px] md:text-xs font-bold text-text-secondary group-hover:text-text-primary uppercase tracking-widest text-center transition-colors">Kerala IT</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
