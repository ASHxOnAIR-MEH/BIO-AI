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

export const AROGYAMITHRAN_EXPRESSIONS: Record<string, KioskAssetItem> = {
  welcoming: {
    id: "arogya-welcome",
    name: "Arogyamithran Welcoming",
    path: "/assets/kiosk/arogyamithran/welcome.jpg",
    category: "character",
    purpose: "Main welcome screens, friendly waving greeting, language selection",
    altTextEn: "Arogyamithran, friendly 70-year-old Malayali sage with white beard, round glasses and mundu, waving warmly with his digital tablet",
    altTextMl: "ആരോഗ്യമിത്രൻ - സസ്നേഹം കൈവീശി സ്വാഗതം ചെയ്യുന്ന ഡിജിറ്റൽ കേരളീയ വഴികാട്ടി",
    aspectRatio: "3:4",
  },
  namaskaram: {
    id: "arogya-namaskaram",
    name: "Arogyamithran Namaskaram",
    path: "/assets/kiosk/arogyamithran/namaskaram.jpg",
    category: "character",
    purpose: "Respectful traditional greeting, community connection and language welcome",
    altTextEn: "Arogyamithran offering respectful Indian Namaskaram greeting with hands joined at chest",
    altTextMl: "ആരോഗ്യമിത്രൻ - കൈകൂപ്പി നമസ്കാരം പറയുന്ന രൂപം",
    aspectRatio: "3:4",
  },
  explaining: {
    id: "arogya-explaining",
    name: "Arogyamithran Explaining",
    path: "/assets/kiosk/arogyamithran/explaining.jpg",
    category: "character",
    purpose: "Quiz instructions, botanical explanations, interactive guide dialogues",
    altTextEn: "Arogyamithran in a teaching posture with open hand gesture and glowing tablet",
    altTextMl: "ആരോഗ്യമിത്രൻ - കാര്യങ്ങൾ വിശദീകരിച്ചു നൽകുന്ന ഭാവം",
    aspectRatio: "3:4",
  },
  thinking: {
    id: "arogya-thinking",
    name: "Arogyamithran Thinking",
    path: "/assets/kiosk/arogyamithran/thinking.jpg",
    category: "character",
    purpose: "Quiz challenge active question, pondering, scientific contemplation",
    altTextEn: "Arogyamithran thoughtfully stroking his beard while considering a question",
    altTextMl: "ആരോഗ്യമിത്രൻ - ചോദ്യത്തെക്കുറിച്ച് ചിന്തിക്കുന്ന ഭാവം",
    aspectRatio: "3:4",
  },
  correct: {
    id: "arogya-correct",
    name: "Arogyamithran Correct Answer",
    path: "/assets/kiosk/arogyamithran/correct-answer.jpg",
    category: "character",
    purpose: "Correct quiz answer feedback, congratulatory praise",
    altTextEn: "Arogyamithran delighted with a thumbs-up gesture for a correct answer",
    altTextMl: "ആരോഗ്യമിത്രൻ - ശരിയുത്തരത്തിൽ സന്തോഷിച്ച് തംസ്-അപ്പ് കാട്ടുന്നു",
    aspectRatio: "3:4",
  },
  incorrect: {
    id: "arogya-incorrect",
    name: "Arogyamithran Supportive Encouragement",
    path: "/assets/kiosk/arogyamithran/encouraging.jpg",
    category: "character",
    purpose: "Incorrect quiz answer feedback, comforting and encouraging",
    altTextEn: "Arogyamithran gently reassuring the visitor with hand on chest in an encouraging manner",
    altTextMl: "ആരോഗ്യമിത്രൻ - പ്രചോദനവും ആശ്വാസവും പകരുന്ന കാരുണ്യഭാവം",
    aspectRatio: "3:4",
  },
  encouraging: {
    id: "arogya-encouraging",
    name: "Arogyamithran Supportive",
    path: "/assets/kiosk/arogyamithran/encouraging.jpg",
    category: "character",
    purpose: "Supportive guidance, hints and retry states",
    altTextEn: "Arogyamithran offering warm encouragement with open hands",
    altTextMl: "ആരോഗ്യമിത്രൻ - പ്രോത്സാഹന ഭാവം",
    aspectRatio: "3:4",
  },
  final: {
    id: "arogya-final",
    name: "Arogyamithran Celebration",
    path: "/assets/kiosk/arogyamithran/celebration.jpg",
    category: "character",
    purpose: "Quiz completion, final score celebratory announcement",
    altTextEn: "Arogyamithran cheering victoriously with both arms raised in celebration",
    altTextMl: "ആരോഗ്യമിത്രൻ - ചലഞ്ച് വിജയകരമായി പൂർത്തിയാക്കിയതിൽ ആഹ്ലാദിക്കുന്നു",
    aspectRatio: "3:4",
  },
  celebration: {
    id: "arogya-celebration",
    name: "Arogyamithran Celebration",
    path: "/assets/kiosk/arogyamithran/celebration.jpg",
    category: "character",
    purpose: "Triumphant achievement and result celebration",
    altTextEn: "Arogyamithran cheering with arms raised in victory",
    altTextMl: "ആരോഗ്യമിത്രൻ - വിജയകരമായ ആഹ്ലാദം",
    aspectRatio: "3:4",
  },
  holding_plant: {
    id: "arogya-holding-plant",
    name: "Arogyamithran Holding Medicinal Plant",
    path: "/assets/kiosk/arogyamithran/holding-plant.jpg",
    category: "character",
    purpose: "VedaVerse flora library, plant profiles, botanical wisdom",
    altTextEn: "Arogyamithran presenting a healthy potted Ayurvedic medicinal plant",
    altTextMl: "ആരോഗ്യമിത്രൻ - ഔഷധസസ്യം കൈകളിൽ വഹിച്ചു നിൽക്കുന്നു",
    aspectRatio: "3:4",
  },
  holding_spice: {
    id: "arogya-holding-spice",
    name: "Arogyamithran Holding Spices",
    path: "/assets/kiosk/arogyamithran/holding-spice.jpg",
    category: "character",
    purpose: "VedaVerse spice heritage, cardamom, pepper, cinnamon showcase",
    altTextEn: "Arogyamithran proudly presenting a golden brass uruli containing Kerala spices",
    altTextMl: "ആരോഗ്യമിത്രൻ - കേരളീയ സുഗന്ധവ്യഞ്ജനങ്ങളടങ്ങിയ ഉരുളി കാണിക്കുന്നു",
    aspectRatio: "3:4",
  },
  reading_tablet: {
    id: "arogya-reading-tablet",
    name: "Arogyamithran with Bio-Data Tablet",
    path: "/assets/kiosk/arogyamithran/reading-tablet.jpg",
    category: "character",
    purpose: "Bio-AI Innovations, digital data analysis, biotechnology research",
    altTextEn: "Arogyamithran reviewing holographic scientific data on his glowing digital tablet",
    altTextMl: "ആരോഗ്യമിത്രൻ - ടാബ്‌ലെറ്റിലെ ഡിജിറ്റൽ ബയോ-ഡാറ്റ പരിശോധിക്കുന്നു",
    aspectRatio: "3:4",
  },
  pointing: {
    id: "arogya-pointing",
    name: "Arogyamithran Guiding & Pointing",
    path: "/assets/kiosk/arogyamithran/pointing.jpg",
    category: "character",
    purpose: "Directional visual cues towards buttons and touch interactions",
    altTextEn: "Arogyamithran smiling and pointing towards interactive screen options",
    altTextMl: "ആരോഗ്യമിത്രൻ - സ്ക്രീനിലെ ഓപ്ഷനുകളിലേക്ക് വിരൽചൂണ്ടി നയിക്കുന്നു",
    aspectRatio: "3:4",
  },
  neutral: {
    id: "arogya-neutral",
    name: "Arogyamithran Serene Standing",
    path: "/assets/kiosk/arogyamithran/neutral.jpg",
    category: "character",
    purpose: "Calm default guide posture, idle screens",
    altTextEn: "Arogyamithran standing serenely with his tablet at his side",
    altTextMl: "ആരോഗ്യമിത്രൻ - ശാന്തമായ സൗഹൃദ ഭാവം",
    aspectRatio: "3:4",
  },
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
    name: "Meet Arogyamithran",
    path: "/assets/kiosk/categories/card_arogyamithran.jpg",
    category: "category",
    purpose: "Homepage navigation card: Meet Arogyamithran interactive journey",
  },
  vedaverse: {
    id: "cat-vedaverse",
    name: "VedaVerse Flora Library",
    path: "/assets/kiosk/categories/card_vedaverse.jpg",
    category: "category",
    purpose: "Homepage navigation card: VedaVerse 100 plant and spice repository",
  },
  innovations: {
    id: "cat-innovations",
    name: "Bio-AI Innovations",
    path: "/assets/kiosk/categories/card_innovations.jpg",
    category: "category",
    purpose: "Homepage navigation card: Explore cutting-edge Bio-AI breakthroughs",
  },
  ecosystem: {
    id: "cat-ecosystem",
    name: "Connect with the Ecosystem",
    path: "/assets/kiosk/categories/card_ecosystem.jpg",
    category: "category",
    purpose: "Homepage navigation card: KSUM & Digital Hub innovation community",
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
 * Returns the appropriate Arogyamithran asset for a given expression
 */
export function getArogyamithranAsset(expression: string): KioskAssetItem {
  const normalized = expression.toLowerCase().replace(/[^a-z_]/g, "_");
  if (AROGYAMITHRAN_EXPRESSIONS[normalized]) {
    return AROGYAMITHRAN_EXPRESSIONS[normalized];
  }
  // Common aliases
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
