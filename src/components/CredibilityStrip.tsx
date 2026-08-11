import Image from "next/image";

export default function CredibilityStrip() {
  return (
    <section className="border-y border-gray-200 bg-white py-10 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-12">
        <p className="text-center text-[10px] sm:text-xs font-semibold text-text-secondary uppercase tracking-widest mb-8 sm:mb-10">
          An Ecosystem Initiative Backed By
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-6 sm:gap-10 md:gap-16 lg:gap-20 items-center justify-items-center">
          <div className="flex flex-col items-center gap-2 sm:gap-4">
            <Image
              src="/ksum-logo.png"
              alt="Kerala Startup Mission"
              width={192}
              height={80}
              style={{ width: "auto" }}
              className="object-contain h-10 sm:h-16 sm:h-20"
            />
            <span className="hidden sm:block text-[10px] md:text-xs font-bold text-text-secondary uppercase tracking-widest text-center">Kerala Startup Mission</span>
          </div>
          <div className="flex flex-col items-center gap-2 sm:gap-4">
            <Image
              src="/kerala-it.png"
              alt="Kerala IT"
              width={128}
              height={64}
              style={{ width: "auto" }}
              className="object-contain h-8 sm:h-12 md:h-16"
            />
            <span className="hidden sm:block text-[10px] md:text-xs font-bold text-text-secondary uppercase tracking-widest text-center">Kerala IT</span>
          </div>
          <div className="flex flex-col items-center gap-2 sm:gap-4">
            <Image
              src="/meity.png"
              alt="MeitY"
              width={128}
              height={64}
              loading="eager"
              style={{ width: "auto" }}
              className="object-contain h-8 sm:h-12 md:h-16"
            />
            <span className="hidden sm:block text-[10px] md:text-xs font-bold text-text-secondary uppercase tracking-widest text-center">MeitY</span>
          </div>
          <div className="flex flex-col items-center gap-2 sm:gap-4">
            <Image
              src="/india-ai.png"
              alt="IndiaAI"
              width={128}
              height={64}
              style={{ width: "auto" }}
              className="object-contain h-8 sm:h-12 md:h-16"
            />
            <span className="hidden sm:block text-[10px] md:text-xs font-bold text-text-secondary uppercase tracking-widest text-center">IndiaAI</span>
          </div>
          <div className="flex flex-col items-center gap-2 sm:gap-4">
            <Image
              src="/digital-india.png"
              alt="Digital India"
              width={128}
              height={64}
              style={{ width: "auto" }}
              className="object-contain h-8 sm:h-12 md:h-16"
            />
            <span className="hidden sm:block text-[10px] md:text-xs font-bold text-text-secondary uppercase tracking-widest text-center">Digital India</span>
          </div>
        </div>
      </div>
    </section>
  );
}
