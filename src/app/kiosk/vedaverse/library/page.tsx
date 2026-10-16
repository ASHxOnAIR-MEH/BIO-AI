"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function VedaVerseLibraryRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/kiosk/vedaverse");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#F5F7F6] flex items-center justify-center">
      <div className="text-[#0B5D46] font-bold text-base animate-pulse">
        Loading VedaVerse Catalog…
      </div>
    </div>
  );
}
