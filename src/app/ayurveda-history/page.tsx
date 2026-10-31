import type { Metadata } from "next";
import AyurvedaHistoryLanding from "@/components/ayurveda-history/AyurvedaHistoryLanding";

export const metadata: Metadata = {
  title: "Ayurveda Through the Ages | Bio-AI Centre of Excellence",
  description:
    "An interactive journey through India's ancient medical knowledge, classical Samhita traditions, Kerala's Ashtavaidya heritage, and modern Bio-AI research.",
  keywords: [
    "Ayurveda History",
    "Charaka Samhita",
    "Sushruta Samhita",
    "Ashtanga Hridaya",
    "Ashtavaidya Kerala",
    "Bio-AI Centre of Excellence",
    "Kerala Startup Mission",
    "VedaVani",
  ],
};

export default function AyurvedaHistoryPage() {
  return <AyurvedaHistoryLanding isKioskMode={false} />;
}

