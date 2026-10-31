import type { Metadata } from "next";
import AyurvedaHistoryLanding from "@/components/ayurveda-history/AyurvedaHistoryLanding";

export const metadata: Metadata = {
  title: "Ayurveda Through the Ages | Kiosk Exhibition",
  description:
    "Interactive touchscreen exhibition on the evolution of classical Indian medicine, Samhita codices, and Kerala's Ashtavaidya tradition.",
};

export default function KioskAyurvedaHistoryPage() {
  return <AyurvedaHistoryLanding isKioskMode={true} />;
}

