"use client";

import { motion, AnimatePresence } from "framer-motion";
import { KioskLanguage } from "./types";

interface PrivacyNoticeModalProps {
  isOpen: boolean;
  language: KioskLanguage;
  onClose: () => void;
}

export default function PrivacyNoticeModal({
  isOpen,
  language,
  onClose,
}: PrivacyNoticeModalProps) {
  if (!isOpen) return null;

  const isMl = language === "ml";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#073B30]/75 backdrop-blur-md"
          aria-hidden="true"
        />

        {/* Modal Window */}
        <motion.div
          key="modal-content"
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-xl bg-[#FAFAF7] rounded-3xl shadow-2xl border-2 border-[#0B5D46]/20 p-6 sm:p-8 z-10 overflow-hidden text-left"
          role="dialog"
          aria-modal="true"
          aria-labelledby="privacy-modal-title"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#F0F7F1] text-[10px] font-bold text-[#0B5D46] border border-[#0B5D46]/15 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#55B96A]" />
                KSUM Digital Hub · Kochi
              </span>
              <h3
                id="privacy-modal-title"
                className={`text-xl sm:text-2xl font-extrabold text-[#073B30] ${
                  isMl ? "font-malayalam leading-snug" : ""
                }`}
              >
                {isMl ? "സ്വകാര്യതാ അറിയിപ്പ്" : "Kiosk Privacy Notice"}
              </h3>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-[#F0F7F1] border border-[#0B5D46]/20 text-[#073B30] hover:bg-[#073B30] hover:text-white flex items-center justify-center transition-colors active:scale-95 touch-manipulation"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {/* Body Content */}
          <div
            className={`space-y-3.5 text-xs sm:text-sm text-[#244B3F]/90 leading-relaxed max-h-[60vh] overflow-y-auto pr-1 ${
              isMl ? "font-malayalam leading-relaxed" : ""
            }`}
          >
            <div className="p-3.5 rounded-2xl bg-white border border-[#0B5D46]/10">
              <h4 className="font-bold text-[#073B30] mb-1">
                {isMl ? "1. ശേഖരിക്കുന്ന വിവരങ്ങൾ" : "1. Information Collected"}
              </h4>
              <p>
                {isMl
                  ? "പൂർണ്ണനാമം, മൊബൈൽ നമ്പർ, ഇമെയിൽ വിലാസം, ഓപ്ഷണൽ പദവി, സ്ഥാപനം എന്നിവ മാത്രമാണ് ഈ കിയോസ്ക് ചലഞ്ചിൽ ശേഖരിക്കുന്നത്."
                  : "We only collect your Full Name, 10-digit Mobile Number, Email Address, and optional Designation/Organisation for the interactive challenge."}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-[#0B5D46]/10">
              <h4 className="font-bold text-[#073B30] mb-1">
                {isMl ? "2. ഉപയോഗ ഉദ്ദേശ്യം" : "2. Purpose of Use"}
              </h4>
              <p>
                {isMl
                  ? "നിങ്ങളുടെ Bio-AI Challenge സ്കോറും സർട്ടിഫിക്കറ്റും നിങ്ങളുടെ രജിസ്ട്രേഷനുമായി ബന്ധിപ്പിക്കുന്നതിനും വ്യക്തിഗത QR ലിങ്ക് നിങ്ങളുടെ ഇമെയിൽ വഴി അയയ്ക്കുന്നതിനും മാത്രമാണ് ഈ വിവരങ്ങൾ ഉപയോഗിക്കുന്നത്."
                  : "Your details are used exclusively to associate your quiz score with your profile and deliver your personal QR souvenir link via email."}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-[#0B5D46]/10">
              <h4 className="font-bold text-[#073B30] mb-1">
                {isMl ? "3. അനൗദ്യോഗിക പരസ്യങ്ങൾ ഇല്ല" : "3. No Marketing Spam"}
              </h4>
              <p>
                {isMl
                  ? "നിങ്ങളുടെ സമ്മതമില്ലാതെ ഈ വിവരങ്ങൾ മൂന്നാം കക്ഷികൾക്ക് കൈമാറുകയോ അനാവശ്യ പരസ്യങ്ങൾക്കായി ഉപയോഗിക്കുകയോ ചെയ്യില്ല."
                  : "We do not sell your personal information or add you to unsolicited marketing mailing lists."}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#F0F7F1] border border-[#0B5D46]/15 text-center">
              <a
                href="https://policy.ksum.in/privacy_policy.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#0B5D46] hover:underline inline-flex items-center gap-1"
              >
                <span>
                  {isMl
                    ? "കേരള സ്റ്റാർട്ടപ്പ് മിഷന്റെ ഔദ്യോഗിക സ്വകാര്യതാ നയം കാണുക ↗"
                    : "View Official Kerala Startup Mission Privacy Policy ↗"}
                </span>
              </a>
            </div>
          </div>

          {/* Footer Action */}
          <div className="mt-5 pt-3 border-t border-[#0B5D46]/15 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-[#073B30] text-[#FAFAF7] hover:bg-[#0B5D46] active:scale-95 text-xs sm:text-sm font-bold shadow-sm touch-manipulation"
            >
              {isMl ? "മനസ്സിലായി / അടയ്ക്കുക" : "I Understand / Close"}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
