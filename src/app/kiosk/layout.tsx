import styles from "./kiosk.module.css";
import type { Metadata, Viewport } from "next";

export const viewport: Viewport = { width: "device-width", initialScale: 1, interactiveWidget: "resizes-content" };

export const metadata: Metadata = {
  title: "Touchscreen Kiosk | Bio-AI Centre of Excellence | KSUM",
  description:
    "Interactive touchscreen kiosk experience for Huddle Global — Bio-AI Centre of Excellence by Kerala Startup Mission, Digital Hub, Kochi.",
};

import { ArogyamithranProvider } from "@/components/kiosk/ArogyamithranContext";
import KioskInactivityMonitor from "@/components/kiosk/KioskInactivityMonitor";

export default function KioskLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ArogyamithranProvider>
      <div className={`${styles.shell} min-h-screen bg-[#FAFAF7] text-[#132E27] flex flex-col font-sans selection:bg-[#55B96A]/25 selection:text-[#073B30]`}>
        {children}
        <KioskInactivityMonitor />
      </div>
    </ArogyamithranProvider>
  );
}
