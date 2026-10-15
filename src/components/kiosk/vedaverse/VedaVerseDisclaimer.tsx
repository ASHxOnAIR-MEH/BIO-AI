"use client";

import React from "react";
import { AlertTriangle, ShieldCheck } from "lucide-react";

interface VedaVerseDisclaimerProps {
  compact?: boolean;
  className?: string;
  isMl?: boolean;
}

export default function VedaVerseDisclaimer({
  compact = false,
  className = "",
  isMl = false,
}: VedaVerseDisclaimerProps) {
  if (compact) {
    return (
      <div
        className={`w-full bg-[#FFFBEB] border border-[#F59E0B]/30 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 flex items-center gap-3 text-xs sm:text-sm text-[#92400E] ${className}`}
        role="note"
        aria-label="Educational Disclaimer"
      >
        <div className="w-8 h-8 rounded-lg bg-[#FEF3C7] flex items-center justify-center shrink-0 text-[#D97706]">
          <AlertTriangle className="w-4 h-4" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-[#78350F] leading-snug">
            {isMl
              ? "വിദ്യാഭ്യാസ ആവശ്യങ്ങൾക്ക് മാത്രം · വൈദ്യോപദേശമല്ല"
              : "Educational Information Only · Not Medical Advice"}
          </p>
          <p className="text-[11px] sm:text-xs text-[#92400E]/90 mt-0.5 leading-normal">
            {isMl
              ? "വിദ്യാഭ്യാസ ആവശ്യങ്ങൾക്ക് മാത്രം. പരമ്പരാഗത ഉപയോഗങ്ങളും ഗവേഷണ കണ്ടെത്തലുകളും വിദഗ്ദ്ധ വൈദ്യോപദേശത്തിന് പകരമാവില്ല."
              : "Educational information only. Traditional uses and research findings do not replace professional medical advice."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-full bg-gradient-to-br from-[#FFFBEB] to-[#FEF3C7]/40 border-2 border-[#F59E0B]/40 rounded-2xl sm:rounded-3xl p-5 sm:p-6 text-[#92400E] shadow-sm ${className}`}
      role="note"
      aria-label="Full Educational Disclaimer"
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#FEF3C7] border border-[#F59E0B]/40 flex items-center justify-center shrink-0 text-[#D97706] shadow-sm">
          <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider bg-[#FDE68A] text-[#78350F] px-2.5 py-0.5 rounded-full">
              {isMl ? "നിയമപരമായ പ്രസ്താവന" : "Mandatory Educational Disclaimer"}
            </span>
          </div>

          <h4 className="text-base sm:text-lg font-bold text-[#78350F] leading-snug">
            {isMl
              ? "വിദ്യാഭ്യാസ റഫറൻസ് മാത്രം — ഔദ്യോഗിക മെഡിക്കൽ ഉപദേശമല്ല"
              : "Educational Reference Only — Not Professional Medical Advice"}
          </h4>

          <div className="mt-2 text-xs sm:text-sm text-[#92400E] space-y-1.5 leading-relaxed">
            <p>
              {isMl
                ? "ഈ ഡിജിറ്റൽ ഹെർബേറിയത്തിലെ വിവരങ്ങൾ സസ്യശാസ്ത്രപരവും സാംസ്കാരികവുമായ വിദ്യാഭ്യാസത്തിനായി മാത്രമാണ് നൽകിയിട്ടുള്ളത്. പരമ്പരാഗത അല്ലെങ്കിൽ ആയുർവേദ പരാമർശങ്ങൾ നേരിട്ട് ക്ലിനിക്കൽ ഫലപ്രാപ്തി തെളിയിക്കുന്നതല്ല."
                : "The botanical records and phytochemical contexts presented in this digital library are for educational, cultural, and botanical reference only. Historical, traditional, or classical Ayurvedic use does not by itself establish clinical efficacy or safety for any medical condition."}
            </p>
            <p className="font-semibold text-[#78350F]">
              {isMl
                ? "ഏതെങ്കിലും സസ്യമരുന്നോ ഉൽപന്നമോ ഉപയോഗിക്കുന്നതിന് മുൻപ് യോഗ്യതയുള്ള ആയുർവേദ ഡോക്ടറുടെയോ ആധുനിക ആരോഗ്യവിദഗ്ദ്ധരുടെയോ നിർദ്ദേശം തേടേണ്ടതാണ്."
                : "Dietary and culinary use differs substantially from concentrated herbal extracts or supplements. Always consult a qualified physician, Ayurvedic practitioner, or botanical expert before therapeutic use."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
