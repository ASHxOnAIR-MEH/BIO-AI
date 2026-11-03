import Image from "next/image";
import { KIOSK_BRANDING } from "@/lib/kioskAssets";
import { KioskLanguage } from "./types";

export default function KioskBranding({ language }: { language: KioskLanguage }) {
  return (
    <div className="kiosk-branding" aria-label="Institutional partners">
      {[KIOSK_BRANDING.ksum, KIOSK_BRANDING.keralaIt, KIOSK_BRANDING.huddleGlobal].map((logo) => (
        <div key={logo.path} className="kiosk-brand">
          <Image src={logo.path} alt={language === "ml" ? logo.altTextMl : logo.altTextEn}
            width={160} height={56} sizes="(max-width: 639px) 26vw, 160px"
            className="w-full h-full object-contain" />
        </div>
      ))}
    </div>
  );
}
