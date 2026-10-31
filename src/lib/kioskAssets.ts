/**
 * Master Asset Manifest & Configuration for Bio-AI Kiosk
 * Cartoon Illustration & Character Asset System
 */

export interface KioskAssetItem {
  id: string;
  name: string;
  path: string;
  category: "character" | "background" | "category" | "botanical" | "science";
  purpose: string;
  altTextEn: string;
  altTextMl: string;
  aspectRatio: string;
}

export const VEDA_EXPRESSIONS: Record<string, KioskAssetItem> = {
  hero: {
    id: "veda-hero",
    name: "Veda Hero Guide",
    path: "/images/veda/01-young-ayurveda-researcher-guide.jpg",
    category: "character",
    purpose: "Primary hero guide — Veda with glowing holographic tablet and laboratory coat",
    altTextEn: "Veda, young Indian Ayurveda researcher with lab coat and glowing Bio-AI leaf tablet",
    altTextMl: "വേദ - ബയോ-എഐ ഡിജിറ്റൽ ടാബ്‌ലെറ്റുമായി നിൽക്കുന്ന യുവ ആയുർവേദ ഗവേഷക",
    aspectRatio: "1:1",
  },
  avatar: {
    id: "veda-avatar",
    name: "Veda Face Avatar",
    path: "/images/veda/veda-avatar.png",
    category: "character",
    purpose: "Header, navbar and navigation badge face avatar",
    altTextEn: "Veda smiling researcher avatar",
    altTextMl: "വേദ - മുഖചിത്രം",
    aspectRatio: "1:1",
  },
  welcome: {
    id: "veda-welcome",
    name: "Veda Welcoming",
    path: "/images/veda/veda-welcome.png",
    category: "character",
    purpose: "Welcome screens, friendly greeting, language selection",
    altTextEn: "Veda welcoming visitors warmly",
    altTextMl: "വേദ - സൗഹൃദപൂർവ്വം സ്വാഗതം ചെയ്യുന്ന ഭാവം",
    aspectRatio: "1:1",
  },
  happy: {
    id: "veda-happy",
    name: "Veda Happy",
    path: "/images/veda/veda-happy.png",
    category: "character",
    purpose: "Correct answers and positive milestones",
    altTextEn: "Veda delighted with a correct answer",
    altTextMl: "വേദ - ശരിയുത്തരത്തിൽ സന്തോഷിക്കുന്ന ഭാവം",
    aspectRatio: "1:1",
  },
  thinking: {
    id: "veda-thinking",
    name: "Veda Thinking",
    path: "/images/veda/veda-thinking.png",
    category: "character",
    purpose: "Quiz challenge active question, contemplation of classical texts",
    altTextEn: "Veda analyzing historical sources thoughtfully",
    altTextMl: "വേദ - ചരിത്ര സ്രോതസ്സുകൾ ചിന്തിച്ചു പരിശോധിക്കുന്നു",
    aspectRatio: "1:1",
  },
  explaining: {
    id: "veda-explaining",
    name: "Veda Explaining",
    path: "/images/veda/veda-explaining.png",
    category: "character",
    purpose: "Explaining historical discoveries, manuscripts and botanical wisdom",
    altTextEn: "Veda explaining ancient medical knowledge",
    altTextMl: "വേദ - പ്രാചീന വൈദ്യജ്ഞാനം വിശദീകരിക്കുന്നു",
    aspectRatio: "1:1",
  },
  curious: {
    id: "veda-curious",
    name: "Veda Curious",
    path: "/images/veda/veda-curious.png",
    category: "character",
    purpose: "Introducing mysteries and botanical field discoveries",
    altTextEn: "Veda examining botanical discoveries with curiosity",
    altTextMl: "വേദ - സസ്യകൗതുകത്തോടെ വിവരങ്ങൾ പങ്കിടുന്നു",
    aspectRatio: "1:1",
  },
  celebrating: {
    id: "veda-celebrating",
    name: "Veda Celebrating",
    path: "/images/veda/veda-celebrating.png",
    category: "character",
    purpose: "Exhibition achievements and quiz completion",
    altTextEn: "Veda celebrating successful completion",
    altTextMl: "വേദ - വിജയകരമായ പൂർത്തീകരണത്തിൽ ആഹ്ലാദിക്കുന്നു",
    aspectRatio: "1:1",
  },
  concerned: {
    id: "veda-concerned",
    name: "Veda Concerned & Reassuring",
    path: "/images/veda/veda-concerned.png",
    category: "character",
    purpose: "Incorrect quiz feedback, comforting scientific guidance",
    altTextEn: "Veda offering supportive scientific reassurance",
    altTextMl: "വേദ - പ്രോത്സാഹനവും മാർഗ്ഗനിർദ്ദേശവും നൽകുന്നു",
    aspectRatio: "1:1",
  },
  neutral: {
    id: "veda-neutral",
    name: "Veda Professional Neutral",
    path: "/images/veda/veda-neutral.png",
    category: "character",
    purpose: "Calm professional researcher pose",
    altTextEn: "Veda standing calmly in research laboratory",
    altTextMl: "വേദ - ശാന്തവും പ്രൊഫഷണലുമായ ഗവേഷണ ഭാവം",
    aspectRatio: "1:1",
  },
};

export const AROGYAMITHRAN_EXPRESSIONS: Record<string, KioskAssetItem> = {
  hero: VEDA_EXPRESSIONS.hero,
  transparent: VEDA_EXPRESSIONS.hero,
  avatar: VEDA_EXPRESSIONS.avatar,
  welcoming: VEDA_EXPRESSIONS.welcome,
  namaskaram: VEDA_EXPRESSIONS.welcome,
  explaining: VEDA_EXPRESSIONS.explaining,
  thinking: VEDA_EXPRESSIONS.thinking,
  correct: VEDA_EXPRESSIONS.happy,
  incorrect: VEDA_EXPRESSIONS.concerned,
  encouraging: VEDA_EXPRESSIONS.concerned,
  final: VEDA_EXPRESSIONS.celebrating,
  celebration: VEDA_EXPRESSIONS.celebrating,
  holding_plant: {
    id: "veda-plant",
    name: "Veda Holding Medicinal Plant",
    path: "/images/veda/02-spice-garden-researcher.jpg",
    category: "character",
    purpose: "VedaVerse flora library and botanical wisdom",
    altTextEn: "Veda examining fresh medicinal herbs and spices",
    altTextMl: "വേദ - ഔഷധസസ്യങ്ങൾ പരിശോധിക്കുന്നു",
    aspectRatio: "16:9",
  },
  holding_spice: {
    id: "veda-spice",
    name: "Veda with Kerala Spices",
    path: "/images/veda/02-spice-garden-researcher.jpg",
    category: "character",
    purpose: "Spice heritage, cardamom, pepper, turmeric",
    altTextEn: "Veda examining authentic Kerala spices",
    altTextMl: "വേദ - കേരളീയ സുഗന്ധവ്യഞ്ജനങ്ങൾ പരിശോധിക്കുന്നു",
    aspectRatio: "16:9",
  },
  reading_tablet: {
    id: "veda-tablet",
    name: "Veda Reviewing Holographic Data",
    path: "/images/veda/01-young-ayurveda-researcher-guide.jpg",
    category: "character",
    purpose: "Bio-AI Innovations, digital botanical analysis",
    altTextEn: "Veda analyzing Bio-AI data on glowing tablet",
    altTextMl: "വേദ - ഡിജിറ്റൽ ബയോ-ഡാറ്റ പരിശോധിക്കുന്നു",
    aspectRatio: "16:9",
  },
  pointing: VEDA_EXPRESSIONS.explaining,
  neutral: VEDA_EXPRESSIONS.neutral,
};

export const KIOSK_BRANDING = {
  ksum: {
    id: "brand-ksum",
    name: "Kerala Startup Mission",
    path: "/assets/kiosk/branding/ksum-logo.png",
    altTextEn: "Kerala Startup Mission official logo",
    altTextMl: "കേരള സ്റ്റാർട്ടപ്പ് മിഷൻ ഔദ്യോഗിക ലോഗോ",
  },
  keralaIt: {
    id: "brand-kerala-it",
    name: "Kerala IT - Empowering the Future",
    path: "/assets/kiosk/branding/kerala-it.png",
    altTextEn: "Kerala IT official logo",
    altTextMl: "കേരള ഐടി ഔദ്യോഗിക ലോഗോ",
  },
  huddleGlobal: {
    id: "brand-huddle-global",
    name: "Huddle Global",
    path: "/assets/kiosk/branding/huddle-global.png",
    altTextEn: "Huddle Global official logo",
    altTextMl: "ഹഡിൽ ഗ്ലോബൽ ഔദ്യോഗിക ലോഗോ",
  },
};

export const KIOSK_BACKGROUNDS = {
  hero: {
    id: "bg-kiosk-hero",
    name: "Kerala Startup Mission Digital Hub Building",
    path: "/assets/kiosk/backgrounds/hero.webp",
    category: "background",
    purpose: "Kiosk homepage, hero section, real Digital Hub building photograph with Kerala tropical environment",
    aspectRatio: "16:9",
  },
  digitalHub: {
    id: "bg-digital-hub",
    name: "Digital Hub Building Kochi",
    path: "/assets/kiosk/backgrounds/digital-hub.jpg",
    category: "background",
    purpose: "Official photograph of Kerala Startup Mission Digital Hub building",
    aspectRatio: "16:9",
  },
  heroPortrait: {
    id: "bg-kiosk-hero-portrait",
    name: "Kerala Digital Hub & Bio-AI Portrait Canvas",
    path: "/assets/kiosk/backgrounds/kiosk_master_portrait_bg.jpg",
    category: "background",
    purpose: "Kiosk portrait homepage master background with Digital Hub, palms, sunrise, and botanical framing",
    aspectRatio: "9:16",
  },
  heroCustom: {
    id: "bg-kiosk-hero-custom",
    name: "Kerala Digital Hub Kochi with Coconut Palms and Arogyamithran",
    path: "/assets/kiosk/backgrounds/hero_kiosk_custom.jpg",
    category: "background",
    purpose: "Kiosk homepage hero section with Digital Hub building, coconut trees, and Arogyamithran AI guide",
    aspectRatio: "9:16",
  },
};

export const KIOSK_CATEGORY_ILLUSTRATIONS = {
  arogyamithran: {
    id: "cat-arogyamithran",
    name: "Meet VEDA",
    path: "/images/veda/01-young-ayurveda-researcher-guide.jpg",
    category: "category",
    purpose: "Homepage navigation card: Meet VEDA, young Ayurveda research guide",
  },
  vedaverse: {
    id: "cat-vedaverse",
    name: "VedaVerse Flora Library",
    path: "/images/veda/02-spice-garden-researcher.jpg",
    category: "category",
    purpose: "Homepage navigation card: VedaVerse 100 plant and spice repository",
  },
  innovations: {
    id: "cat-innovations",
    name: "Ayurveda Through the Ages",
    path: "/images/veda/ayurveda-through-the-ages-card.jpg",
    category: "category",
    purpose: "Homepage navigation card: Ayurveda Through the Ages ancient Indian medical history and classical texts",
  },
  ecosystem: {
    id: "cat-ecosystem",
    name: "Connect with the Ecosystem",
    path: "/images/veda/04-ayurveda-research-collaboration.jpg",
    category: "category",
    purpose: "Homepage navigation card: KSUM & Digital Hub innovation community and research collaboration",
  },
  ayurvedicPlants: {
    id: "cat-ayurvedic-plants",
    name: "Ayurvedic Plants Category",
    path: "/assets/kiosk/categories/ayurvedic-plants.jpg",
    category: "category",
    purpose: "VedaVerse category filter: 25 Ayurvedic medicinal plants",
  },
  medicinalPlants: {
    id: "cat-medicinal-plants",
    name: "Medicinal Plants Category",
    path: "/assets/kiosk/categories/medicinal-plants.jpg",
    category: "category",
    purpose: "VedaVerse category filter: 25 botanical medicinal species",
  },
  spices: {
    id: "cat-spices",
    name: "Kerala Spices Category",
    path: "/assets/kiosk/categories/spices.jpg",
    category: "category",
    purpose: "VedaVerse category filter: 50 culinary spice and herb species",
  },
};

/**
 * Returns the appropriate Veda asset for a given expression
 */
export function getVedaAsset(expression: string): KioskAssetItem {
  const normalized = expression.toLowerCase().replace(/[^a-z_]/g, "_");
  if (VEDA_EXPRESSIONS[normalized]) {
    return VEDA_EXPRESSIONS[normalized];
  }
  if (normalized.includes("avatar") || normalized.includes("icon")) return VEDA_EXPRESSIONS.avatar;
  if (normalized.includes("welcome")) return VEDA_EXPRESSIONS.welcome;
  if (normalized.includes("happy") || normalized.includes("correct")) return VEDA_EXPRESSIONS.happy;
  if (normalized.includes("think")) return VEDA_EXPRESSIONS.thinking;
  if (normalized.includes("explain")) return VEDA_EXPRESSIONS.explaining;
  if (normalized.includes("curious")) return VEDA_EXPRESSIONS.curious;
  if (normalized.includes("celeb") || normalized.includes("final")) return VEDA_EXPRESSIONS.celebrating;
  if (normalized.includes("concern") || normalized.includes("wrong") || normalized.includes("encourage")) return VEDA_EXPRESSIONS.concerned;
  return VEDA_EXPRESSIONS.welcome;
}

/**
 * Returns the appropriate Arogyamithran asset for a given expression
 */
export function getArogyamithranAsset(expression: string): KioskAssetItem {
  const normalized = expression.toLowerCase().replace(/[^a-z_]/g, "_");
  if (AROGYAMITHRAN_EXPRESSIONS[normalized]) {
    return AROGYAMITHRAN_EXPRESSIONS[normalized];
  }
  // Common aliases
  if (normalized.includes("avatar") || normalized.includes("icon") || normalized.includes("badge")) return AROGYAMITHRAN_EXPRESSIONS.avatar;
  if (normalized.includes("transparent") || normalized.includes("png")) return AROGYAMITHRAN_EXPRESSIONS.transparent;
  if (normalized.includes("hero") || normalized.includes("mascot")) return AROGYAMITHRAN_EXPRESSIONS.hero;
  if (normalized.includes("welcome")) return AROGYAMITHRAN_EXPRESSIONS.welcoming;
  if (normalized.includes("think")) return AROGYAMITHRAN_EXPRESSIONS.thinking;
  if (normalized.includes("correct")) return AROGYAMITHRAN_EXPRESSIONS.correct;
  if (normalized.includes("incorrect") || normalized.includes("wrong")) return AROGYAMITHRAN_EXPRESSIONS.incorrect;
  if (normalized.includes("encourage")) return AROGYAMITHRAN_EXPRESSIONS.encouraging;
  if (normalized.includes("celeb") || normalized.includes("final") || normalized.includes("congrat")) return AROGYAMITHRAN_EXPRESSIONS.celebration;
  if (normalized.includes("plant")) return AROGYAMITHRAN_EXPRESSIONS.holding_plant;
  if (normalized.includes("spice")) return AROGYAMITHRAN_EXPRESSIONS.holding_spice;
  if (normalized.includes("tablet") || normalized.includes("read")) return AROGYAMITHRAN_EXPRESSIONS.reading_tablet;
  if (normalized.includes("point")) return AROGYAMITHRAN_EXPRESSIONS.pointing;
  if (normalized.includes("namask")) return AROGYAMITHRAN_EXPRESSIONS.namaskaram;
  if (normalized.includes("explain") || normalized.includes("talk")) return AROGYAMITHRAN_EXPRESSIONS.explaining;

  return AROGYAMITHRAN_EXPRESSIONS.welcoming;
}
