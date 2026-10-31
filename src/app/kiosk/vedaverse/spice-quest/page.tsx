import type { Metadata } from "next";
import SpicePuzzleEngine from "@/components/kiosk/spice-quest/SpicePuzzleEngine";

export const metadata: Metadata = {
  title: "Spice Quest: The Six Secrets of Ayurveda | Bio-AI Kiosk",
  description:
    "Interactive six-level spice puzzle game for the Bio-AI Centre of Excellence kiosk. Discover botanical taxonomy, morphology, classical Sanskrit codices, and Kerala spice heritage.",
};

export default function SpiceQuestPage() {
  return <SpicePuzzleEngine />;
}

