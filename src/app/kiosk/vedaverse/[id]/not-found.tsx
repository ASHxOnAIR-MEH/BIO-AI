import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";

export default function PlantNotFound() {
  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#073B30] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border-2 border-[#0B5D46]/20 shadow-lg space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-[#F0F7F1] text-[#0B5D46] flex items-center justify-center mx-auto">
          <BookOpen className="w-8 h-8" />
        </div>

        <h2 className="text-2xl font-black text-[#073B30]">
          Specimen Not Found
        </h2>

        <p className="text-sm text-[#244B3F]/80 leading-relaxed">
          The requested botanical record does not exist in the VedaVerse 100-species library or the ID is invalid.
        </p>

        <div className="pt-2">
          <Link
            href="/kiosk/vedaverse"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0B5D46] text-white font-bold text-sm shadow-sm hover:bg-[#073B30] active:scale-95 transition-all touch-manipulation"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to VedaVerse Library</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
