"use client";

import { Suspense, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, User, Phone, Mail, Award, Building2, AlertCircle } from "lucide-react";
import KioskSubHeader from "@/components/kiosk/KioskSubHeader";
import PrivacyNoticeModal from "@/components/kiosk/PrivacyNoticeModal";
import { useArogyamithranLanguage } from "@/components/kiosk/ArogyamithranContext";
import { KioskLanguage } from "@/components/kiosk/types";

interface FormState {
  fullName: string;
  mobile: string;
  email: string;
  designation: string;
  organisation: string;
  consentPrivacy: boolean;
  consentChallenge: boolean;
}

interface FormErrors {
  fullName?: string;
  mobile?: string;
  email?: string;
  consentPrivacy?: string;
  consentChallenge?: string;
  general?: string;
}

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlLang = searchParams.get("lang") as KioskLanguage | null;
  const { language, setLanguage } = useArogyamithranLanguage();

  const activeLang: KioskLanguage =
    urlLang === "ml" || urlLang === "en"
      ? urlLang
      : language === "ml"
      ? "ml"
      : "en";

  useEffect(() => {
    if (urlLang && (urlLang === "en" || urlLang === "ml") && urlLang !== language) {
      setLanguage(urlLang);
    }
  }, [urlLang, language, setLanguage]);

  const isMl = activeLang === "ml";

  const [formData, setFormData] = useState<FormState>({
    fullName: "",
    mobile: "",
    email: "",
    designation: "",
    organisation: "",
    consentPrivacy: false,
    consentChallenge: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  const handleChange = (field: keyof FormState, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    const name = formData.fullName.trim();
    if (!name) {
      newErrors.fullName = isMl ? "പൂർണ്ണനാമം നൽകുക." : "Please enter your full name.";
    } else if (name.length < 2) {
      newErrors.fullName = isMl ? "കുറഞ്ഞത് 2 അക്ഷരങ്ങൾ നൽകുക." : "Minimum 2 characters required.";
    }

    const rawMobile = formData.mobile.trim().replace(/\D/g, "");
    if (!rawMobile) {
      newErrors.mobile = isMl ? "മൊബൈൽ നമ്പർ നൽകുക." : "Mobile number is required.";
    } else if (!/^[6-9]\d{9}$/.test(rawMobile)) {
      newErrors.mobile = isMl ? "സാധുവായ 10 അക്ക മൊബൈൽ നമ്പർ നൽകുക." : "Enter a valid 10-digit Indian mobile.";
    }

    const email = formData.email.trim();
    if (!email) {
      newErrors.email = isMl ? "ഇമെയിൽ വിലാസം നൽകുക." : "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = isMl ? "സാധുവായ ഇമെയിൽ നൽകുക." : "Enter a valid email address.";
    }

    if (!formData.consentPrivacy) {
      newErrors.consentPrivacy = isMl ? "സമ്മതം നൽകേണ്ടതുണ്ട്." : "You must agree to the privacy notice.";
    }

    if (!formData.consentChallenge) {
      newErrors.consentChallenge = isMl ? "സമ്മതം നൽകേണ്ടതുണ്ട്." : "Please confirm your consent.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch("/api/kiosk/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          mobile: formData.mobile.trim().replace(/\D/g, ""),
          email: formData.email.trim().toLowerCase(),
          designation: formData.designation.trim() || undefined,
          organisation: formData.organisation.trim() || undefined,
          consent: formData.consentPrivacy && formData.consentChallenge,
          language: activeLang,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || (isMl ? "രജിസ്ട്രേഷൻ പരാജയപ്പെട്ടു." : "Registration failed."));
      }

      router.push(
        `/kiosk/arogyamithran/instructions?regId=${encodeURIComponent(
          data.registrationId
        )}&lang=${activeLang}`
      );
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : isMl ? "സെർവർ പിശക് സംഭവിച്ചു." : "An error occurred.";
      setErrors({ general: msg });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F0F7F2] text-[#132E27] relative flex flex-col justify-between items-center selection:bg-[#55B96A]/25 overflow-x-hidden">
      <main className="w-full max-w-[820px] min-h-screen flex flex-col justify-between relative shadow-[0_0_60px_rgba(0,0,0,0.18)] overflow-hidden bg-[#F0F7F2]">
        {/* 1. Header with official KSUM | Kerala IT | Huddle Global branding */}
        <KioskSubHeader
          language={activeLang}
          backHref={`/kiosk/arogyamithran/welcome?lang=${activeLang}`}
          backLabel="Back"
          backLabelMl="പിന്നിലേക്ക്"
        />

        {/* 2. Content with Botanical Background */}
        <div className="relative flex-1 flex flex-col justify-between px-4 sm:px-6 py-4 sm:py-6 overflow-y-auto">
          {/* Botanical Background Framing */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <Image
              src="/assets/kiosk/backgrounds/hero_portrait.jpg"
              alt="Bio-AI botanical background frame"
              fill
              priority
              className="object-cover object-center opacity-40 select-none"
              sizes="820px"
            />
            {/* Spices footer background as seen in Screen 3 */}
            <div className="absolute inset-x-0 bottom-0 h-44 opacity-25">
              <Image
                src="/assets/kiosk/categories/card_vedaverse.jpg"
                alt="Kerala spices and botanical heritage"
                fill
                className="object-cover object-bottom"
                sizes="820px"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#F0F7F2]/90 via-[#F0F7F2]/80 to-[#F0F7F2]/95" />
          </div>

          {/* Form Container */}
          <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center">
            {/* Headings */}
            <div className="text-center mb-4">
              <h1 className={`text-2xl sm:text-3xl font-black text-[#073B30] tracking-tight ${isMl ? "font-malayalam" : ""}`}>
                {isMl ? "സന്ദർശക രജിസ്ട്രേഷൻ" : "Visitor Registration"}
              </h1>
              <p className={`text-xs sm:text-sm font-semibold text-[#0B5D46] mt-0.5 ${isMl ? "font-malayalam" : ""}`}>
                {isMl
                  ? "ബയോ-എഐ ചലഞ്ച് ആരംഭിക്കുന്നതിനുള്ള ലളിതമായ രജിസ്ട്രേഷൻ."
                  : "A quick registration to start your Bio-AI Challenge."}
              </p>
            </div>

            {/* Error Banner */}
            {errors.general && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full mb-3 p-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{errors.general}</span>
              </motion.div>
            )}

            {/* Registration Form Card matching Storyboard */}
            <motion.form
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              onSubmit={handleSubmit}
              className="w-full bg-white rounded-3xl p-5 sm:p-6 shadow-xl border-2 border-[#0B5D46]/15 flex flex-col gap-3.5"
            >
              {/* Field 1: Full Name */}
              <div>
                <label className="block text-[11px] sm:text-xs font-bold text-[#073B30] mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#55B96A]" />
                  <span>{isMl ? "പൂർണ്ണനാമം *" : "Full Name *"}</span>
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  placeholder={isMl ? "നിങ്ങളുടെ പൂർണ്ണനാമം" : "Your full name"}
                  className={`w-full h-11 px-3.5 rounded-xl border text-sm font-medium transition-all outline-none ${
                    errors.fullName
                      ? "border-red-400 bg-red-50/30 ring-2 ring-red-200"
                      : "border-gray-200 focus:border-[#55B96A] focus:ring-2 focus:ring-[#55B96A]/20"
                  }`}
                  disabled={isSubmitting}
                />
                {errors.fullName && (
                  <p className="text-[11px] text-red-500 font-semibold mt-0.5">{errors.fullName}</p>
                )}
              </div>

              {/* Field 2: Mobile Number */}
              <div>
                <label className="block text-[11px] sm:text-xs font-bold text-[#073B30] mb-1 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#55B96A]" />
                  <span>{isMl ? "മൊബൈൽ നമ്പർ *" : "Mobile Number *"}</span>
                </label>
                <div className="flex gap-2">
                  <div className="h-11 px-3 rounded-xl border border-gray-200 bg-gray-50 flex items-center gap-1 text-xs font-bold text-gray-700 shrink-0">
                    <span>+91</span>
                    <span className="text-[10px] text-gray-400">▼</span>
                  </div>
                  <input
                    type="tel"
                    maxLength={10}
                    value={formData.mobile}
                    onChange={(e) => handleChange("mobile", e.target.value)}
                    placeholder="98765 43210"
                    className={`flex-1 h-11 px-3.5 rounded-xl border text-sm font-medium transition-all outline-none ${
                      errors.mobile
                        ? "border-red-400 bg-red-50/30 ring-2 ring-red-200"
                        : "border-gray-200 focus:border-[#55B96A] focus:ring-2 focus:ring-[#55B96A]/20"
                    }`}
                    disabled={isSubmitting}
                  />
                </div>
                {errors.mobile && (
                  <p className="text-[11px] text-red-500 font-semibold mt-0.5">{errors.mobile}</p>
                )}
              </div>

              {/* Field 3: Email Address */}
              <div>
                <label className="block text-[11px] sm:text-xs font-bold text-[#073B30] mb-1 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#55B96A]" />
                  <span>{isMl ? "ഇമെയിൽ വിലാസം *" : "Email Address *"}</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="yourname@example.com"
                  className={`w-full h-11 px-3.5 rounded-xl border text-sm font-medium transition-all outline-none ${
                    errors.email
                      ? "border-red-400 bg-red-50/30 ring-2 ring-red-200"
                      : "border-gray-200 focus:border-[#55B96A] focus:ring-2 focus:ring-[#55B96A]/20"
                  }`}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-[11px] text-red-500 font-semibold mt-0.5">{errors.email}</p>
                )}
              </div>

              {/* Field 4: Designation (Optional) */}
              <div>
                <label className="block text-[11px] sm:text-xs font-bold text-[#073B30] mb-1 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-gray-400" />
                  <span>{isMl ? "പദവി (ഐച്ഛികം)" : "Designation"}</span>
                </label>
                <input
                  type="text"
                  value={formData.designation}
                  onChange={(e) => handleChange("designation", e.target.value)}
                  placeholder={isMl ? "നിങ്ങളുടെ പദവി (ഐച്ഛികം)" : "Your designation (optional)"}
                  className="w-full h-11 px-3.5 rounded-xl border border-gray-200 focus:border-[#55B96A] focus:ring-2 focus:ring-[#55B96A]/20 text-sm font-medium transition-all outline-none"
                  disabled={isSubmitting}
                />
              </div>

              {/* Field 5: Organisation (Optional) */}
              <div>
                <label className="block text-[11px] sm:text-xs font-bold text-[#073B30] mb-1 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-gray-400" />
                  <span>{isMl ? "സ്ഥാപനം (ഐച്ഛികം)" : "Organisation"}</span>
                </label>
                <input
                  type="text"
                  value={formData.organisation}
                  onChange={(e) => handleChange("organisation", e.target.value)}
                  placeholder={isMl ? "നിങ്ങളുടെ സ്ഥാപനം (ഐച്ഛികം)" : "Your organisation (optional)"}
                  className="w-full h-11 px-3.5 rounded-xl border border-gray-200 focus:border-[#55B96A] focus:ring-2 focus:ring-[#55B96A]/20 text-sm font-medium transition-all outline-none"
                  disabled={isSubmitting}
                />
              </div>

              {/* Checkbox 1: Privacy notice & Email result */}
              <div className="pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer touch-manipulation">
                  <input
                    type="checkbox"
                    checked={formData.consentPrivacy}
                    onChange={(e) => handleChange("consentPrivacy", e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-[#0B5D46] focus:ring-[#55B96A] accent-[#0B5D46] shrink-0"
                    disabled={isSubmitting}
                  />
                  <span className={`text-[11px] sm:text-xs text-[#244B3F] font-medium leading-relaxed ${isMl ? "font-malayalam" : ""}`}>
                    {isMl ? (
                      <>
                        ഞാൻ{" "}
                        <button
                          type="button"
                          onClick={() => setIsPrivacyModalOpen(true)}
                          className="text-[#0B5D46] underline font-bold"
                        >
                          സ്വകാര്യതാ നയം
                        </button>{" "}
                        വായിച്ചു സമ്മതിക്കുന്നു. ഫലം ഇമെയിലിൽ സ്വീകരിക്കാൻ സമ്മതിക്കുന്നു.
                      </>
                    ) : (
                      <>
                        I agree to the{" "}
                        <button
                          type="button"
                          onClick={() => setIsPrivacyModalOpen(true)}
                          className="text-[#0B5D46] underline font-bold"
                        >
                          privacy notice
                        </button>{" "}
                        and consent to receive my quiz result via email.
                      </>
                    )}
                  </span>
                </label>
                {errors.consentPrivacy && (
                  <p className="text-[11px] text-red-500 font-semibold mt-0.5 pl-6">{errors.consentPrivacy}</p>
                )}
              </div>

              {/* Checkbox 2: Limited Purpose */}
              <div>
                <label className="flex items-start gap-2.5 cursor-pointer touch-manipulation">
                  <input
                    type="checkbox"
                    checked={formData.consentChallenge}
                    onChange={(e) => handleChange("consentChallenge", e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-[#0B5D46] focus:ring-[#55B96A] accent-[#0B5D46] shrink-0"
                    disabled={isSubmitting}
                  />
                  <span className={`text-[11px] sm:text-xs text-[#244B3F] font-medium leading-relaxed ${isMl ? "font-malayalam" : ""}`}>
                    {isMl
                      ? "എന്റെ വിവരങ്ങൾ ഈ ബയോ-എഐ ചലഞ്ചിനായി മാത്രം ഉപയോഗിക്കുമെന്ന് ഞാൻ മനസ്സിലാക്കുന്നു."
                      : "I understand that my information will be used only for this Bio-AI Challenge."}
                  </span>
                </label>
                {errors.consentChallenge && (
                  <p className="text-[11px] text-red-500 font-semibold mt-0.5 pl-6">{errors.consentChallenge}</p>
                )}
              </div>

              {/* Submit Button: Start Challenge */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                className="w-full min-h-[50px] sm:min-h-[54px] mt-2 rounded-2xl bg-gradient-to-r from-[#073B30] to-[#0B5D46] hover:from-[#0B5D46] hover:to-[#55B96A] text-[#FAFAF7] font-black text-base sm:text-lg shadow-lg border border-white/20 flex items-center justify-center gap-2 touch-manipulation active:scale-95 transition-all disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>{isMl ? "രജിസ്റ്റർ ചെയ്യുന്നു..." : "Registering..."}</span>
                  </span>
                ) : (
                  <>
                    <span className={isMl ? "font-malayalam" : ""}>
                      {isMl ? "ചലഞ്ച് ആരംഭിക്കുക" : "Start Challenge"}
                    </span>
                    <span className="text-xl">→</span>
                  </>
                )}
              </motion.button>
            </motion.form>

            {/* Back to Home Button */}
            <div className="mt-3">
              <Link
                href="/kiosk"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-full bg-white/90 hover:bg-white text-[#073B30] text-xs font-bold shadow-xs border border-[#0B5D46]/20 transition-all active:scale-95 touch-manipulation"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-[#55B96A]" />
                <span className={isMl ? "font-malayalam" : ""}>
                  {isMl ? "പ്രധാന പേജിലേക്ക് മടങ്ങുക" : "Back to Home"}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Privacy Notice Modal */}
      <PrivacyNoticeModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
        language={activeLang}
      />
    </div>
  );
}

export default function ArogyamithranRegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F0F7F2]" />}>
      <RegisterContent />
    </Suspense>
  );
}
