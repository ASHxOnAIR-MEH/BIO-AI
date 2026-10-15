"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useArogyamithranLanguage } from "@/components/kiosk/ArogyamithranContext";
import ArogyamithranMascot from "@/components/kiosk/ArogyamithranMascot";
import KioskSubHeader from "@/components/kiosk/KioskSubHeader";
import KioskFooter from "@/components/kiosk/KioskFooter";
import PrivacyNoticeModal from "@/components/kiosk/PrivacyNoticeModal";
import { KioskLanguage } from "@/components/kiosk/types";

interface FormState {
  fullName: string;
  mobile: string;
  email: string;
  designation: string;
  organisation: string;
  consent: boolean;
}

interface FormErrors {
  fullName?: string;
  mobile?: string;
  email?: string;
  consent?: string;
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

  // In-memory form state (Never stored in localStorage/sessionStorage)
  const [formData, setFormData] = useState<FormState>({
    fullName: "",
    mobile: "",
    email: "",
    designation: "",
    organisation: "",
    consent: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  // Field change handler
  const handleChange = (
    field: keyof FormState,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear field-specific error as user types
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // Client-side validation
  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    // 1. Full Name
    const name = formData.fullName.trim();
    if (!name) {
      newErrors.fullName = isMl
        ? "പൂർണ്ണനാമം നൽകേണ്ടത് നിർബന്ധമാണ്."
        : "Full name is required.";
    } else if (name.length < 2) {
      newErrors.fullName = isMl
        ? "സാധുവായ പൂർണ്ണനാമം നൽകുക (കുറഞ്ഞത് 2 അക്ഷരങ്ങൾ)."
        : "Please enter a valid full name (minimum 2 characters).";
    }

    // 2. Mobile Number (10-digit Indian Mobile)
    const rawMobile = formData.mobile.trim().replace(/\D/g, "");
    if (!rawMobile) {
      newErrors.mobile = isMl
        ? "മൊബൈൽ നമ്പർ നൽകേണ്ടത് നിർബന്ധമാണ്."
        : "Mobile number is required.";
    } else if (!/^[6-9]\d{9}$/.test(rawMobile)) {
      newErrors.mobile = isMl
        ? "സാധുവായ 10 അക്ക മൊബൈൽ നമ്പർ നൽകുക (6, 7, 8, അല്ലെങ്കിൽ 9-ൽ തുടങ്ങുന്നത്)."
        : "Please enter a valid 10-digit Indian mobile number (starts with 6-9).";
    }

    // 3. Email Address
    const email = formData.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!email) {
      newErrors.email = isMl
        ? "ഇമെയിൽ വിലാസം നൽകേണ്ടത് നിർബന്ധമാണ്."
        : "Email address is required.";
    } else if (!emailRegex.test(email)) {
      newErrors.email = isMl
        ? "ശരിയായ ഇമെയിൽ വിലാസം നൽകുക (ഉദാ: name@example.com)."
        : "Please enter a valid email address (e.g. name@example.com).";
    }

    // 4. Consent (Must be explicitly checked)
    if (!formData.consent) {
      newErrors.consent = isMl
        ? "തുടരുന്നതിനായി വിവര ശേഖരണ സമ്മതം രേഖപ്പെടുത്തേണ്ടത് നിർബന്ധമാണ്."
        : "Consent is required before proceeding with registration.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setErrors((prev) => ({ ...prev, general: undefined }));

    try {
      const response = await fetch("/api/kiosk/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          mobile: formData.mobile.trim().replace(/\D/g, ""),
          email: formData.email.trim(),
          designation: formData.designation.trim(),
          organisation: formData.organisation.trim(),
          consent: formData.consent,
          language: activeLang,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setErrors({
          general:
            data?.message ||
            (isMl
              ? "രജിസ്ട്രേഷൻ പ്രക്രിയയിൽ തടസ്സം നേരിട്ടു. വീണ്ടും ശ്രമിക്കുക."
              : "Unable to complete registration. Please check your details and try again."),
        });
        setIsSubmitting(false);
        return;
      }

      // Success: Navigate to Registration Completion Screen
      // Clear sensitive state from memory upon successful transition
      const regId = data.registrationId;
      router.push(
        `/kiosk/arogyamithran/completed?regId=${encodeURIComponent(
          regId
        )}&lang=${activeLang}`
      );
    } catch {
      setErrors({
        general: isMl
          ? "നെറ്റ്‌വർക്ക് കണക്ഷനിൽ പ്രശ്നം നേരിട്ടു. വീണ്ടും ശ്രമിക്കുക."
          : "Network connection error. Please try submitting again.",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col justify-between bg-[#FAFAF7] text-[#132E27] relative selection:bg-[#55B96A]/20">
      {/* ─── KIOSK SUB HEADER ────────────────────────────────────────── */}
      <KioskSubHeader
        language={activeLang}
        backHref={`/kiosk/arogyamithran/welcome?lang=${activeLang}`}
        backLabel="Back"
        backLabelMl="തിരികെ"
        currentStepBadge="Step 3: Registration & Consent"
        currentStepBadgeMl="ഘട്ടം 3: സന്ദർശക രജിസ്ട്രേഷൻ"
      />

      {/* ─── REGISTRATION FORM CONTENT ─────────────────────────────────── */}
      <div className="flex-1 max-w-2xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex flex-col justify-center">
        {/* Step indicator */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F0F7F1] border border-[#0B5D46]/15 mb-3 shadow-xs w-fit mx-auto">
          <span className="w-2 h-2 rounded-full bg-[#55B96A]" />
          <span className="text-[11px] sm:text-xs font-bold text-[#0B5D46] uppercase tracking-wider">
            {isMl
              ? "ഘട്ടം 2: സന്ദർശക രജിസ്ട്രേഷൻ"
              : "Step 2: Visitor Registration"}
          </span>
        </div>

        {/* Headings */}
        <div className="text-center mb-6 sm:mb-8">
          <h1
            className={`text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#073B30] tracking-tight mb-2 ${
              isMl ? "font-malayalam leading-snug" : ""
            }`}
          >
            {isMl ? "നമുക്ക് തുടങ്ങുന്നതിന് മുമ്പ്" : "Before We Begin"}
          </h1>
          <p
            className={`text-xs sm:text-sm md:text-base text-[#244B3F]/90 leading-relaxed max-w-xl mx-auto ${
              isMl ? "font-malayalam" : ""
            }`}
          >
            {isMl
              ? "നിങ്ങളുടെ ചലഞ്ച് ഫലം നിങ്ങളുമായി ബന്ധിപ്പിക്കുന്നതിനും വ്യക്തിഗത ഫലത്തിന്റെ QR ലിങ്ക് ഇമെയിൽ വഴി അയയ്ക്കുന്നതിനുമായി ദയവായി വിവരങ്ങൾ പങ്കിടുക."
              : "Please share a few details so we can associate your challenge result with you and send your personal result QR link to your email."}
          </p>
        </div>

        {/* General Error Banner */}
        {errors.general && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border-2 border-red-200 text-red-800 text-xs sm:text-sm flex items-center gap-3">
            <span className="text-lg shrink-0">⚠️</span>
            <span>{errors.general}</span>
          </div>
        )}

        {/* Mascot Guiding Visitor */}
        <div className="mb-6 flex justify-center">
          <ArogyamithranMascot
            expression="pointing"
            size="sm"
            language={activeLang}
            dialogue={
              isMl
                ? "നിങ്ങളുടെ വിവരങ്ങൾ നൽകൂ, ചലഞ്ച് ഫലവും QR കോഡും ഇമെയിലിൽ അയച്ചുതരാം!"
                : "Enter your details so I can prepare your personalized Bio-AI results and QR code!"
            }
            showDialogue={true}
          />
        </div>

        {/* Form Container */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border-2 border-[#0B5D46]/15 shadow-sm space-y-5"
        >
          {/* 1. Full Name / പൂർണ്ണനാമം (Required) */}
          <div>
            <label
              htmlFor="field-fullName"
              className={`block text-xs sm:text-sm font-bold text-[#073B30] mb-1.5 ${
                isMl ? "font-malayalam" : ""
              }`}
            >
              {isMl ? "പൂർണ്ണനാമം" : "Full Name"}{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              id="field-fullName"
              type="text"
              autoComplete="name"
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              placeholder={isMl ? "നിങ്ങളുടെ പേര് നൽകുക" : "Enter your full name"}
              className={`w-full min-h-[52px] sm:min-h-[56px] px-4 py-3 rounded-xl border-2 text-sm sm:text-base text-[#132E27] bg-[#FAFAF7] transition-all focus:outline-none focus:ring-2 focus:ring-[#55B96A]/40 ${
                errors.fullName
                  ? "border-red-400 bg-red-50/20"
                  : "border-[#0B5D46]/20 focus:border-[#0B5D46]"
              }`}
            />
            {errors.fullName && (
              <p
                className={`mt-1.5 text-xs font-semibold text-red-600 flex items-center gap-1 ${
                  isMl ? "font-malayalam" : ""
                }`}
              >
                <span>⚠</span>
                <span>{errors.fullName}</span>
              </p>
            )}
          </div>

          {/* 2. Mobile Number / മൊബൈൽ നമ്പർ (Required) */}
          <div>
            <label
              htmlFor="field-mobile"
              className={`block text-xs sm:text-sm font-bold text-[#073B30] mb-1.5 ${
                isMl ? "font-malayalam" : ""
              }`}
            >
              {isMl ? "മൊബൈൽ നമ്പർ" : "Mobile Number"}{" "}
              <span className="text-red-500">*</span>
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-xs sm:text-sm font-bold text-[#244B3F]/70 select-none">
                +91
              </span>
              <input
                id="field-mobile"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                maxLength={10}
                value={formData.mobile}
                onChange={(e) =>
                  handleChange(
                    "mobile",
                    e.target.value.replace(/\D/g, "").slice(0, 10)
                  )
                }
                placeholder={isMl ? "10 അക്ക മൊബൈൽ നമ്പർ" : "10-digit mobile number"}
                className={`w-full min-h-[52px] sm:min-h-[56px] pl-14 pr-4 py-3 rounded-xl border-2 text-sm sm:text-base text-[#132E27] bg-[#FAFAF7] transition-all focus:outline-none focus:ring-2 focus:ring-[#55B96A]/40 tracking-wider ${
                  errors.mobile
                    ? "border-red-400 bg-red-50/20"
                    : "border-[#0B5D46]/20 focus:border-[#0B5D46]"
                }`}
              />
            </div>
            {errors.mobile && (
              <p
                className={`mt-1.5 text-xs font-semibold text-red-600 flex items-center gap-1 ${
                  isMl ? "font-malayalam" : ""
                }`}
              >
                <span>⚠</span>
                <span>{errors.mobile}</span>
              </p>
            )}
          </div>

          {/* 3. Email Address / ഇമെയിൽ വിലാസം (Required) */}
          <div>
            <label
              htmlFor="field-email"
              className={`block text-xs sm:text-sm font-bold text-[#073B30] mb-1.5 ${
                isMl ? "font-malayalam" : ""
              }`}
            >
              {isMl ? "ഇമെയിൽ വിലാസം" : "Email Address"}{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              id="field-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="name@example.com"
              className={`w-full min-h-[52px] sm:min-h-[56px] px-4 py-3 rounded-xl border-2 text-sm sm:text-base text-[#132E27] bg-[#FAFAF7] transition-all focus:outline-none focus:ring-2 focus:ring-[#55B96A]/40 ${
                errors.email
                  ? "border-red-400 bg-red-50/20"
                  : "border-[#0B5D46]/20 focus:border-[#0B5D46]"
              }`}
            />
            {errors.email && (
              <p
                className={`mt-1.5 text-xs font-semibold text-red-600 flex items-center gap-1 ${
                  isMl ? "font-malayalam" : ""
                }`}
              >
                <span>⚠</span>
                <span>{errors.email}</span>
              </p>
            )}
          </div>

          {/* 4. Designation / പദവി (Optional) */}
          <div>
            <label
              htmlFor="field-designation"
              className={`block text-xs sm:text-sm font-bold text-[#073B30] mb-1.5 ${
                isMl ? "font-malayalam" : ""
              }`}
            >
              {isMl ? "പദവി" : "Designation"}{" "}
              <span className="text-xs font-normal text-[#244B3F]/70">
                ({isMl ? "ഓപ്ഷണൽ" : "Optional"})
              </span>
            </label>
            <input
              id="field-designation"
              type="text"
              value={formData.designation}
              onChange={(e) => handleChange("designation", e.target.value)}
              placeholder={
                isMl
                  ? "ഉദാ: വിദ്യാർത്ഥി / ഗവേഷകൻ / സ്ഥാപകൻ"
                  : "e.g. Student / Researcher / Founder"
              }
              className="w-full min-h-[52px] sm:min-h-[56px] px-4 py-3 rounded-xl border-2 border-[#0B5D46]/20 text-sm sm:text-base text-[#132E27] bg-[#FAFAF7] transition-all focus:outline-none focus:border-[#0B5D46] focus:ring-2 focus:ring-[#55B96A]/40"
            />
          </div>

          {/* 5. Organisation / സ്ഥാപനം അല്ലെങ്കിൽ സംഘടന (Optional) */}
          <div>
            <label
              htmlFor="field-organisation"
              className={`block text-xs sm:text-sm font-bold text-[#073B30] mb-1.5 ${
                isMl ? "font-malayalam" : ""
              }`}
            >
              {isMl ? "സ്ഥാപനം അല്ലെങ്കിൽ സംഘടന" : "Organisation"}{" "}
              <span className="text-xs font-normal text-[#244B3F]/70">
                ({isMl ? "ഓപ്ഷണൽ" : "Optional"})
              </span>
            </label>
            <input
              id="field-organisation"
              type="text"
              value={formData.organisation}
              onChange={(e) => handleChange("organisation", e.target.value)}
              placeholder={
                isMl
                  ? "നിങ്ങളുടെ കോളേജ് / കമ്പനി / സംഘടന"
                  : "e.g. College / Company / Institution"
              }
              className="w-full min-h-[52px] sm:min-h-[56px] px-4 py-3 rounded-xl border-2 border-[#0B5D46]/20 text-sm sm:text-base text-[#132E27] bg-[#FAFAF7] transition-all focus:outline-none focus:border-[#0B5D46] focus:ring-2 focus:ring-[#55B96A]/40"
            />
          </div>

          {/* ─── CONSENT CHECKBOX (UNCHECKED BY DEFAULT) ──────────────────── */}
          <div className="pt-2">
            <label
              htmlFor="field-consent"
              className="flex items-start gap-3.5 cursor-pointer group p-3 rounded-2xl bg-[#F0F7F1]/70 border border-[#0B5D46]/15 hover:bg-[#F0F7F1] transition-colors"
            >
              <input
                id="field-consent"
                type="checkbox"
                checked={formData.consent}
                onChange={(e) => handleChange("consent", e.target.checked)}
                className="mt-1 w-5 h-5 rounded border-2 border-[#0B5D46]/40 text-[#0B5D46] focus:ring-[#55B96A] shrink-0 cursor-pointer accent-[#0B5D46]"
              />
              <span
                className={`text-xs sm:text-sm text-[#244B3F] leading-relaxed select-none ${
                  isMl ? "font-malayalam" : ""
                }`}
              >
                {isMl ? (
                  <>
                    എന്റെ Bio-AI Challenge നടത്തുന്നതിനും ക്വിസ് ഫലം എന്റെ
                    രജിസ്ട്രേഷനുമായി ബന്ധിപ്പിക്കുന്നതിനും വ്യക്തിഗത ഫല ലിങ്ക്
                    ഇമെയിൽ വഴി അയയ്ക്കുന്നതിനുമായി ഞാൻ നൽകുന്ന വിവരങ്ങൾ
                    ശേഖരിക്കുകയും ഉപയോഗിക്കുകയും ചെയ്യുന്നതിന് ഞാൻ
                    സമ്മതിക്കുന്നു.{" "}
                    <button
                      type="button"
                      onClick={(ev) => {
                        ev.preventDefault();
                        setIsPrivacyModalOpen(true);
                      }}
                      className="text-[#0B5D46] font-bold underline underline-offset-2 hover:text-[#073B30]"
                    >
                      സ്വകാര്യതാ അറിയിപ്പ് ഞാൻ വായിച്ചിട്ടുണ്ട്.
                    </button>
                  </>
                ) : (
                  <>
                    I agree to the collection and use of the details I provide to
                    conduct my Bio-AI Challenge, associate my quiz result with my
                    registration, and send my personal result link by email.{" "}
                    <button
                      type="button"
                      onClick={(ev) => {
                        ev.preventDefault();
                        setIsPrivacyModalOpen(true);
                      }}
                      className="text-[#0B5D46] font-bold underline underline-offset-2 hover:text-[#073B30]"
                    >
                      I have read the privacy notice.
                    </button>
                  </>
                )}
              </span>
            </label>
            {errors.consent && (
              <p
                className={`mt-1.5 ml-2 text-xs font-semibold text-red-600 flex items-center gap-1 ${
                  isMl ? "font-malayalam" : ""
                }`}
              >
                <span>⚠</span>
                <span>{errors.consent}</span>
              </p>
            )}
          </div>

          {/* ─── SUBMIT BUTTON (TOUCH TARGET 56-64PX HEIGHT) ─────────────── */}
          <div className="pt-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full min-h-[58px] sm:min-h-[64px] px-8 py-4 rounded-2xl bg-[#073B30] text-[#FAFAF7] hover:bg-[#0B5D46] active:scale-95 transition-all text-base sm:text-lg font-bold shadow-lg flex items-center justify-center gap-3 touch-manipulation focus:outline-none focus-visible:ring-4 focus-visible:ring-[#55B96A] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <span className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                  <span>
                    {isMl ? "രജിസ്റ്റർ ചെയ്യുന്നു..." : "Submitting Details..."}
                  </span>
                </>
              ) : (
                <>
                  <span className={isMl ? "font-malayalam" : ""}>
                    {isMl ? "സമർപ്പിച്ചു തുടരുക" : "SUBMIT & CONTINUE"}
                  </span>
                  <span className="text-[#55B96A] text-xl font-bold">→</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* ─── KIOSK FOOTER ──────────────────────────────────────────────── */}
      <KioskFooter language={activeLang} />

      {/* ─── PRIVACY NOTICE MODAL ─────────────────────────────────────── */}
      <PrivacyNoticeModal
        isOpen={isPrivacyModalOpen}
        language={activeLang}
        onClose={() => setIsPrivacyModalOpen(false)}
      />
    </main>
  );
}

export default function ArogyamithranRegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FAFAF7] text-[#073B30]">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#55B96A] animate-ping" />
            <span className="text-sm font-bold">Loading Registration...</span>
          </div>
        </div>
      }
    >
      <RegisterContent />
    </Suspense>
  );
}
