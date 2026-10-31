import type { Metadata } from "next";
import AyurvedaHistoryLanding from "@/components/ayurveda-history/AyurvedaHistoryLanding";

export const metadata: Metadata = {
  title: "Ayurveda Through the Ages | Bio-AI Kiosk Museum",
  description:
    "A Journey Through India's Ancient Medical Knowledge, Classical Texts and Living Traditions. Guided by VEDA, young Ayurveda researcher.",
};

export default function KioskAyurvedaThroughTheAgesPage() {
  return <AyurvedaHistoryLanding isKioskMode={true} />;
}

