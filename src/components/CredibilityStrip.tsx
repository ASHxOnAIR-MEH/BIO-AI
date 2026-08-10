import Image from "next/image";

export default function CredibilityStrip() {
  return (
    <section className="border-y border-gray-200 bg-white py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <p className="text-center text-xs font-semibold text-text-secondary uppercase tracking-widest mb-10">
          An Ecosystem Initiative Backed By
        </p>
        <div className="flex flex-wrap items-end justify-center gap-12 md:gap-16 lg:gap-20">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-48 h-20">
              <Image src="/ksum-logo.png" alt="Kerala Startup Mission" fill className="object-contain" />
            </div>
            <span className="text-[10px] md:text-xs font-bold text-text-secondary uppercase tracking-widest text-center">Kerala Startup Mission</span>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-32 h-16">
              <Image src="/kerala-it.png" alt="Kerala IT" fill className="object-contain" />
            </div>
            <span className="text-[10px] md:text-xs font-bold text-text-secondary uppercase tracking-widest text-center">Kerala IT</span>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-32 h-16">
              <Image src="/meity.png" alt="MeitY" fill className="object-contain" />
            </div>
            <span className="text-[10px] md:text-xs font-bold text-text-secondary uppercase tracking-widest text-center">MeitY</span>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-32 h-16">
              <Image src="/india-ai.png" alt="IndiaAI" fill className="object-contain" />
            </div>
            <span className="text-[10px] md:text-xs font-bold text-text-secondary uppercase tracking-widest text-center">IndiaAI</span>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-32 h-16">
              <Image src="/digital-india.png" alt="Digital India" fill className="object-contain" />
            </div>
            <span className="text-[10px] md:text-xs font-bold text-text-secondary uppercase tracking-widest text-center">Digital India</span>
          </div>
        </div>
      </div>
    </section>
  );
}
