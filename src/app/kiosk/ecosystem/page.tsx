"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Handshake,
  Rocket,
  Building2,
  GraduationCap,
  Microscope,
  HelpCircle,
  CheckCircle2,
  Send,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import KioskSubHeader from "@/components/kiosk/KioskSubHeader";
import KioskFooter from "@/components/kiosk/KioskFooter";
import ArogyamithranMascot from "@/components/kiosk/ArogyamithranMascot";
import { KioskLanguage } from "@/components/kiosk/types";
import { KIOSK_CATEGORY_ILLUSTRATIONS } from "@/lib/kioskAssets";

const INTEREST_CATEGORIES = [
  {
    id: "research_collaboration",
    icon: Microscope,
    titleEn: "Research Collaboration",
    titleMl: "ഗവേഷണ സഹകരണം",
    descEn: "Joint R&D, clinical validation, phytochemical analysis & AI model training.",
    descMl: "സംയുക്ത ഗവേഷണം, ക്ലിനിക്കൽ പരിശോധന, എഐ മോഡൽ വികസനം.",
  },
  {
    id: "startup_incubation",
    icon: Rocket,
    titleEn: "Startup & Incubation",
    titleMl: "സ്റ്റാർട്ടപ്പും ഇൻകുബേഷനും",
    descEn: "Incubation at Kochi Digital Hub, GPU compute access, seed grants & mentorship.",
    descMl: "കൊച്ചി ഡിജിറ്റൽ ഹബ്ബ് ഇൻകുബേഷൻ, ജിപിയു കമ്പ്യൂട്ടിംഗ്, ഗ്രാന്റുകൾ.",
  },
  {
    id: "industry_partnerships",
    icon: Building2,
    titleEn: "Industry Partnerships",
    titleMl: "വ്യവസായ പങ്കാളിത്തം",
    descEn: "Commercial pilots, technology licensing, spices supply chain & formulation R&D.",
    descMl: "വാണിജ്യ പൈലറ്റ് പ്രോജക്റ്റുകൾ, സാങ്കേതിക ലൈസൻസിങ്, വിതരണ ശൃംഖല.",
  },
  {
    id: "academic_internships",
    icon: GraduationCap,
    titleEn: "Academic Projects & Internships",
    titleMl: "അക്കാദമിക് പ്രോജക്റ്റുകളും ഇന്റേൺഷിപ്പും",
    descEn: "Student dissertation support, hackathons, bioinformatics student cohorts.",
    descMl: "വിദ്യാർത്ഥി പ്രോജക്റ്റുകൾ, ഹാക്കത്തോണുകൾ, ബയോഇൻഫർമാറ്റിക്സ് പരിശീലനം.",
  },
  {
    id: "technology_enquiry",
    icon: Handshake,
    titleEn: "Technology & Research Enquiries",
    titleMl: "സാങ്കേതിക അന്വേഷണങ്ങൾ",
    descEn: "Detailed queries regarding datasets, spectroscopy scanner & molecular pipelines.",
    descMl: "ഡാറ്റാസെറ്റുകൾ, സ്പെക്ട്രോസ്കോപ്പി സ്കാനർ, പൈപ്പ്‌ലൈൻ സംശയങ്ങൾ.",
  },
  {
    id: "general_enquiry",
    icon: HelpCircle,
    titleEn: "General Enquiries",
    titleMl: "പൊതുവായ അന്വേഷണങ്ങൾ",
    descEn: "General questions about Kerala Startup Mission, Digital Hub & Huddle Global.",
    descMl: "കേരള സ്റ്റാർട്ടപ്പ് മിഷൻ, ഡിജിറ്റൽ ഹബ്ബ് എന്നിവയെക്കുറിച്ചുള്ള അന്വേഷണങ്ങൾ.",
  },
];

export default function KioskEcosystemPage() {
  const [language, setLanguage] = useState<KioskLanguage>("en");
  const isMl = language === "ml";

  // Form State
  const [selectedCategory, setSelectedCategory] = useState<string>("research_collaboration");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submissionResult, setSubmissionResult] = useState<{
    success: boolean;
    enquiryId?: string;
    message?: string;
  } | null>(null);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      errs.fullName = isMl
        ? "പൂർണ്ണനാമം നൽകുക (കുറഞ്ഞത് 2 അക്ഷരങ്ങൾ)."
        : "Please enter your full name (at least 2 characters).";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      errs.email = isMl
        ? "സാധുവായ ഇമെയിൽ വിലാസം നൽകുക."
        : "Please enter a valid email address.";
    }

    const cleanMobile = mobile.replace(/\D/g, "");
    if (!cleanMobile || !/^[6-9]\d{9}$/.test(cleanMobile)) {
      errs.mobile = isMl
        ? "സാധുവായ 10 അക്ക മൊബൈൽ നമ്പർ നൽകുക."
        : "Please enter a valid 10-digit Indian mobile number.";
    }

    if (!selectedCategory) {
      errs.category = isMl
        ? "ഒരു താല്പര്യ വിഭാഗം തിരഞ്ഞെടുക്കുക."
        : "Please select an interest category.";
    }

    if (!consent) {
      errs.consent = isMl
        ? "തുടരുന്നതിന് വിവര ശേഖരണ സമ്മതം രേഖപ്പെടുത്തുക."
        : "Consent is required to submit your enquiry.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const res = await fetch("/api/kiosk/ecosystem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          mobile: mobile.replace(/\D/g, ""),
          category: selectedCategory,
          organisation: organisation.trim(),
          message: message.trim(),
          consent,
          language,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrors({
          general:
            data.message ||
            (isMl
              ? "അന്വേഷണം രേഖപ്പെടുത്താൻ കഴിഞ്ഞില്ല. ദയവായി വിവരങ്ങൾ പരിശോധിച്ച് വീണ്ടും ശ്രമിക്കുക."
              : "Unable to record enquiry. Please verify details and try again."),
        });
        setIsSubmitting(false);
        return;
      }

      setSubmissionResult({
        success: true,
        enquiryId: data.enquiryId,
        message: data.message,
      });
    } catch {
      setErrors({
        general: isMl
          ? "നെറ്റ്‌വർക്ക് കണക്ഷനിൽ പ്രശ്നം നേരിട്ടു. വീണ്ടും ശ്രമിക്കുക."
          : "Network connection error. Please try submitting again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFullName("");
    setEmail("");
    setMobile("");
    setOrganisation("");
    setMessage("");
    setConsent(false);
    setSubmissionResult(null);
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#073B30] flex flex-col font-sans selection:bg-[#55B96A]/20">
      {/* ─── KIOSK SUB HEADER ────────────────────────────────────────── */}
      <KioskSubHeader
        language={language}
        onLanguageChange={setLanguage}
        showLanguageToggle={true}
        currentStepBadge="Connect with Ecosystem"
        currentStepBadgeMl="ഇക്കോസിസ്റ്റവുമായി ബന്ധപ്പെടുക"
        backHref="/kiosk"
      />

      {/* ─── HERO SECTION ────────────────────────────────────────────── */}
      <section className="relative w-full bg-gradient-to-b from-[#F0F7F1] via-[#FAFAF7] to-white border-b border-[#0B5D46]/10 pt-6 sm:pt-10 pb-6 sm:pb-8 px-4 sm:px-8">
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
          <div className="max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#0B5D46]/20 text-[#0B5D46] text-xs font-bold shadow-2xs mb-3">
              <Handshake className="w-3.5 h-3.5 text-[#55B96A]" />
              <span>
                {isMl
                  ? "ഗവേഷണവും സ്റ്റാർട്ടപ്പ് സഹകരണവും"
                  : "Research & Startup Collaboration"}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#073B30] tracking-tight leading-tight mb-3">
              {isMl ? (
                <>
                  കേരളത്തിന്റെ ബയോ-എഐ{" "}
                  <span className="text-[#0B5D46]">ഇക്കോസിസ്റ്റത്തിൽ പങ്കാളിയാകൂ</span>
                </>
              ) : (
                <>
                  Connect with the Kerala{" "}
                  <span className="text-[#0B5D46]">Bio-AI Innovation Ecosystem</span>
                </>
              )}
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-[#244B3F]/85 leading-relaxed font-medium">
              {isMl
                ? "കേരള സ്റ്റാർട്ടപ്പ് മിഷന്റെ ഡിജിറ്റൽ ഹബ്ബ്, കൊച്ചിയിൽ ഒരുക്കുന്ന ആഗോള ഇന്നൊവേഷൻ സൗകര്യങ്ങളിലേക്ക് ഗവേഷകർക്കും സംരംഭകർക്കും വിദ്യാർത്ഥികൾക്കും സ്വാഗതം."
                : "Explore opportunities for collaborative research, incubation support, GPU computing access, industry partnerships, and student internships at Digital Hub, Kochi."}
            </p>
          </div>

          {/* Arogyamithran Mascot in Welcoming Namaskaram posture */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-[#0B5D46]/20 shadow-md bg-white shrink-0 hidden sm:block">
              <Image
                src={KIOSK_CATEGORY_ILLUSTRATIONS.ecosystem.path}
                alt="Connect with Ecosystem"
                fill
                className="object-cover object-top"
              />
            </div>
            <ArogyamithranMascot
              expression="namaskaram"
              size="sm"
              language={language}
              showDialogue={false}
              priority
            />
          </div>
        </div>
      </section>

      {/* ─── MAIN CONTENT AREA ───────────────────────────────────────── */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-8 py-8 sm:py-12 flex-1 w-full">
        {submissionResult?.success ? (
          /* ─── GENUINE BACKEND SUCCESS CONFIRMATION ─────────────────── */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border-2 border-[#0B5D46]/20 shadow-xl text-center"
          >
            <div className="w-20 h-20 rounded-full bg-[#0B5D46] text-white flex items-center justify-center mx-auto mb-6 shadow-lg">
              <CheckCircle2 className="w-10 h-10 text-[#55B96A]" />
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F0F7F1] border border-[#0B5D46]/20 text-xs font-bold text-[#073B30] mb-4">
              <span>{isMl ? "അന്വേഷണ ഐഡി:" : "Enquiry Reference:"}</span>
              <span className="font-mono text-[#0B5D46]">{submissionResult.enquiryId}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#073B30] mb-3">
              {isMl ? "അന്വേഷണം വിജയകരമായി ലഭിച്ചു!" : "Enquiry Successfully Submitted!"}
            </h2>

            <p className="text-sm sm:text-base text-[#244B3F]/90 leading-relaxed mb-6 max-w-lg mx-auto">
              {isMl
                ? "ബയോ-എഐ സെന്റർ ഓഫ് എക്സലൻസ് ടീം നിങ്ങളുടെ അന്വേഷണം പരിശോധിച്ച ശേഷം ഉടൻ തന്നെ ബന്ധപ്പെടുന്നതായിരിക്കും."
                : "Thank you for reaching out to the Bio-AI Centre of Excellence. Our incubation & research coordination team at KSUM Digital Hub, Kochi will review your submission and contact you shortly."}
            </p>

            <div className="p-4 rounded-2xl bg-[#F0F7F1] border border-[#0B5D46]/15 text-xs text-[#073B30] max-w-md mx-auto mb-8 text-left">
              <p className="font-bold mb-1">Confirmation Details:</p>
              <p>• Contact: {fullName} ({email})</p>
              <p>• Department: Kerala Startup Mission Bio-AI Coordination Desk</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={resetForm}
                className="w-full sm:w-auto min-h-[50px] px-6 py-2.5 rounded-full bg-[#F0F7F1] text-[#073B30] hover:bg-[#0B5D46] hover:text-white font-bold text-xs sm:text-sm border border-[#0B5D46]/20 transition-all active:scale-95 touch-manipulation flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Submit Another Enquiry</span>
              </button>

              <a
                href="/kiosk"
                className="w-full sm:w-auto min-h-[50px] px-8 py-2.5 rounded-full bg-[#073B30] text-white hover:bg-[#0B5D46] font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 touch-manipulation flex items-center justify-center gap-2"
              >
                <span>Back to Kiosk Home</span>
                <span>→</span>
              </a>
            </div>
          </motion.div>
        ) : (
          /* ─── INTERACTION INTERFACE ───────────────────────────────── */
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Step 1: Select Interest Category */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-[#0B5D46] text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-[#073B30]">
                  {isMl
                    ? "നിങ്ങളുടെ താല്പര്യ വിഭാഗം തിരഞ്ഞെടുക്കുക:"
                    : "Select Your Collaboration Interest Area:"}
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
                {INTEREST_CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`text-left p-4 sm:p-5 rounded-2xl border-2 transition-all active:scale-[0.985] touch-manipulation flex flex-col justify-between min-h-[140px] ${
                        isSelected
                          ? "bg-white border-[#0B5D46] ring-4 ring-[#55B96A]/20 shadow-md"
                          : "bg-white/80 border-[#0B5D46]/15 hover:border-[#55B96A] hover:bg-white"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                            isSelected ? "bg-[#0B5D46] text-white" : "bg-[#F0F7F1] text-[#0B5D46]"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        {isSelected && (
                          <span className="text-xs font-bold text-[#0B5D46] bg-[#F0F7F1] px-2 py-0.5 rounded-full border border-[#0B5D46]/20">
                            Selected ✓
                          </span>
                        )}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-[#073B30] mb-1">
                          {isMl ? cat.titleMl : cat.titleEn}
                        </h3>
                        <p className="text-[11px] text-[#244B3F]/75 leading-snug">
                          {isMl ? cat.descMl : cat.descEn}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Details & Contact Form */}
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border-2 border-[#0B5D46]/15 shadow-md"
            >
              <div className="flex items-center gap-2 mb-6">
                <span className="w-6 h-6 rounded-full bg-[#0B5D46] text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-[#073B30]">
                  {isMl
                    ? "നിങ്ങളുടെ വിവരങ്ങൾ നൽകുക:"
                    : "Enter Your Contact & Enquiry Details:"}
                </h2>
              </div>

              {errors.general && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm mb-6 flex items-start gap-2.5">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <span>{errors.general}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-[#073B30] uppercase mb-1.5">
                    {isMl ? "പൂർണ്ണനാമം *" : "Full Name *"}
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Dr. Anand Nair / Priya Mohan"
                    className={`w-full min-h-[48px] px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#55B96A] ${
                      errors.fullName ? "border-red-400 bg-red-50/50" : "border-[#0B5D46]/20 bg-[#FAFAF7]"
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-red-600 font-semibold mt-1">{errors.fullName}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-[#073B30] uppercase mb-1.5">
                    {isMl ? "ഇമെയിൽ വിലാസം *" : "Email Address *"}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. name@organisation.org"
                    className={`w-full min-h-[48px] px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#55B96A] ${
                      errors.email ? "border-red-400 bg-red-50/50" : "border-[#0B5D46]/20 bg-[#FAFAF7]"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-red-600 font-semibold mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-xs font-bold text-[#073B30] uppercase mb-1.5">
                    {isMl ? "മൊബൈൽ നമ്പർ *" : "Mobile Number *"}
                  </label>
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="10-digit Indian Mobile"
                    maxLength={10}
                    className={`w-full min-h-[48px] px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#55B96A] ${
                      errors.mobile ? "border-red-400 bg-red-50/50" : "border-[#0B5D46]/20 bg-[#FAFAF7]"
                    }`}
                  />
                  {errors.mobile && (
                    <p className="text-[11px] text-red-600 font-semibold mt-1">{errors.mobile}</p>
                  )}
                </div>

                {/* Organisation */}
                <div>
                  <label className="block text-xs font-bold text-[#073B30] uppercase mb-1.5">
                    {isMl ? "സ്ഥാപനം / സ്റ്റാർട്ടപ്പ് (ഓപ്ഷണൽ)" : "Organisation / Startup (Optional)"}
                  </label>
                  <input
                    type="text"
                    value={organisation}
                    onChange={(e) => setOrganisation(e.target.value)}
                    placeholder="e.g. Research Lab / Startup / College"
                    className="w-full min-h-[48px] px-4 py-2.5 rounded-xl border border-[#0B5D46]/20 bg-[#FAFAF7] text-sm focus:outline-none focus:ring-2 focus:ring-[#55B96A]"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="mb-5">
                <label className="block text-xs font-bold text-[#073B30] uppercase mb-1.5">
                  {isMl
                    ? "അന്വേഷണത്തിന്റെ ലഘുവിവരണം (ഓപ്ഷണൽ)"
                    : "Brief Proposal or Question (Optional)"}
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share a brief overview of your startup, research interest, or inquiry..."
                  className="w-full p-4 rounded-xl border border-[#0B5D46]/20 bg-[#FAFAF7] text-sm focus:outline-none focus:ring-2 focus:ring-[#55B96A]"
                />
              </div>

              {/* Explicit Consent Checkbox */}
              <div className="mb-6 p-4 rounded-2xl bg-[#F0F7F1] border border-[#0B5D46]/15">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="w-5 h-5 rounded border-[#0B5D46]/40 text-[#0B5D46] focus:ring-[#55B96A] mt-0.5 shrink-0"
                  />
                  <span className="text-xs text-[#244B3F]/90 leading-relaxed font-medium">
                    {isMl
                      ? "കേരള സ്റ്റാർട്ടപ്പ് മിഷൻ ബയോ-എഐ സെന്റർ ഓഫ് എക്സലൻസ് ടീമിന് എന്റെ അന്വേഷണവുമായി ബന്ധപ്പെട്ട് എന്നെ ബന്ധപ്പെടാൻ ഞാൻ സമ്മതം നൽകുന്നു."
                      : "I agree that Kerala Startup Mission and the Bio-AI Centre of Excellence may securely process my details to respond to this collaboration enquiry."}
                  </span>
                </label>
                {errors.consent && (
                  <p className="text-[11px] text-red-600 font-semibold mt-2 pl-8">{errors.consent}</p>
                )}
              </div>

              {/* Submit Button (Target min 56px height) */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full min-h-[56px] px-8 py-4 rounded-2xl bg-[#073B30] text-[#FAFAF7] hover:bg-[#0B5D46] active:scale-[0.985] transition-all text-base font-bold shadow-lg flex items-center justify-center gap-3 touch-manipulation focus:outline-none focus-visible:ring-4 focus-visible:ring-[#55B96A] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Submitting Enquiry...</span>
                ) : (
                  <>
                    <span>{isMl ? "അന്വേഷണം അയയ്ക്കുക" : "Submit Collaboration Enquiry"}</span>
                    <Send className="w-5 h-5 text-[#55B96A]" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </main>

      {/* ─── KIOSK FOOTER ────────────────────────────────────────────── */}
      <KioskFooter language={language} />
    </div>
  );
}
