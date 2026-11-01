import type { Metadata } from "next";
import StorybookReader from "@/components/kiosk/storybook/StorybookReader";

export const metadata: Metadata = {
  title: "VEDA – The Lost Leaves | Bio-AI Kiosk",
  description:
    "An Interactive Illustrated Journey Through the History of Ayurveda. Volume One – Beyond the Eight Paths.",
};

export default function StorybookPage() {
  return <StorybookReader />;
}

