"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function KioskAutoRedirect() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const host = window.location.hostname.toLowerCase();
      // If deployed under any kiosk domain (e.g. kikos-bio-ai-*.vercel.app or *kiosk*)
      if (host.includes("kiko") || host.includes("kiosk")) {
        router.replace("/kiosk");
      }
    }
  }, [router]);

  return null;
}
