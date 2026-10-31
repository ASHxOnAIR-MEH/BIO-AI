/**
 * SPICE QUEST – THE SIX SECRETS OF AYURVEDA
 * Master Verified Educational Dataset
 * 
 * Sources:
 * - Charaka Samhita (Sutrasthana & Vimanasthana)
 * - Sushruta Samhita (Sutrasthana)
 * - Ashtanga Hridaya (Sutrasthana)
 * - Bhavaprakasha Nighantu (Haritakyadi Varga)
 * - Plants of the World Online (POWO, Royal Botanic Gardens Kew)
 * - State Medicinal Plants Board (SMPB) Kerala
 * - Hortus Malabaricus (Hendrik van Rheede, 1678–1693)
 * 
 * Strictly educational and cultural history. No medical claims or disease treatment advice.
 */

export interface SpiceMonograph {
  id: string;
  plantId: string;
  commonName: string;
  commonNameMl: string;
  sanskritName: string;
  sanskritTranslit: string;
  botanicalName: string;
  family: string;
  plantPart: string;
  plantPartCategory: "rhizome" | "bark" | "dried_flower_bud" | "fruit_capsule" | "seed";
  image: string;
  keralaContext: string;
  classicalDescription: string;
  classicalSource: string;
  classicalCitation: string;
  tasteProperty: string; // Rasa, Virya
  historicalFact: string;
}

export const SPICE_MONOGRAPHS: Record<string, SpiceMonograph> = {
  cardamom: {
    id: "cardamom",
    plantId: "PL051",
    commonName: "Small Cardamom",
    commonNameMl: "ഏലം",
    sanskritName: "एला (सूक्ष्म एला)",
    sanskritTranslit: "Ela / Sukshma Ela",
    botanicalName: "Elettaria cardamomum",
    family: "Zingiberaceae",
    plantPart: "Fruit / Dried seed capsule",
    plantPartCategory: "fruit_capsule",
    image: "/assets/kiosk/plants/PL051.jpg",
    keralaContext: "Known as the 'Queen of Spices', indigenous to the misty evergreen rainforests of the Western Ghats (Cardamom Hills) of Kerala.",
    classicalDescription: "Praised as Sugandhi (fragrant), Hridya (heart-pleasing), and Rochana (taste enhancer). Used traditionally in betel leaf preparations and digestive formulations.",
    classicalSource: "Sushruta Samhita",
    classicalCitation: "Sushruta Samhita, Sutrasthana Ch. 46 (Eladi Gana)",
    tasteProperty: "Madhura-Katu Rasa (Sweet-Pungent), Sheeta Virya (Cooling potency)",
    historicalFact: "Kerala's Cardamom was prized by ancient Greek and Roman traders and was recorded in Ptolemy's geography of the Malabar coast."
  },
  turmeric: {
    id: "turmeric",
    plantId: "PL057",
    commonName: "Turmeric",
    commonNameMl: "മഞ്ഞൾ",
    sanskritName: "हरिद्रा",
    sanskritTranslit: "Haridra",
    botanicalName: "Curcuma longa",
    family: "Zingiberaceae",
    plantPart: "Underground rhizome",
    plantPartCategory: "rhizome",
    image: "/assets/kiosk/plants/PL057.jpg",
    keralaContext: "Central to Kerala culture, temple rituals, and traditional culinary sciences; grown extensively throughout homestead gardens.",
    classicalDescription: "Documented as Varnya (complexion promoter), Vishaghna (purifying), and Kaphahara. Regarded as an auspicious botanical with deep golden curcuminoids.",
    classicalSource: "Charaka Samhita",
    classicalCitation: "Charaka Samhita, Sutrasthana Ch. 4 (Kusthaghna & Lekhaniya Mahakashaya)",
    tasteProperty: "Tikta-Katu Rasa (Bitter-Pungent), Ushna Virya (Heating potency)",
    historicalFact: "Revered in ancient Sanskrit literature as 'Gauri' (golden goddess) and listed among the sacred dyes of the Indus and Vedic eras."
  },
  black_pepper: {
    id: "black_pepper",
    plantId: "PL053",
    commonName: "Black Pepper",
    commonNameMl: "കുരുമുളക്",
    sanskritName: "मरिच",
    sanskritTranslit: "Maricha",
    botanicalName: "Piper nigrum",
    family: "Piperaceae",
    plantPart: "Dried unripe berry (Fruit)",
    plantPartCategory: "fruit_capsule",
    image: "/assets/kiosk/plants/PL053.jpg",
    keralaContext: "The 'King of Spices' and ancient 'Black Gold' of the Malabar coast; climbing perennial vine thriving on native Kerala shade trees.",
    classicalDescription: "Foundational ingredient of Trikatu (the three pungents with Sunthi and Pippali). Described as Deepana (kindling digestive fire) and Pramathi (clearing bodily channels).",
    classicalSource: "Charaka Samhita",
    classicalCitation: "Charaka Samhita, Vimanasthana Ch. 7 & Chikitsasthana",
    tasteProperty: "Katu Rasa (Pungent), Ushna Virya (Heating potency)",
    historicalFact: "Roman historian Pliny the Elder lamented the drainage of 50 million sesterces of Roman gold annually to purchase Malabar black pepper."
  },
  clove: {
    id: "clove",
    plantId: "PL082",
    commonName: "Clove",
    commonNameMl: "ഗ്രാമ്പൂ (കരയാമ്പൂ)",
    sanskritName: "लवङ्ग",
    sanskritTranslit: "Lavanga",
    botanicalName: "Syzygium aromaticum",
    family: "Myrtaceae",
    plantPart: "Dried unopened flower bud",
    plantPartCategory: "dried_flower_bud",
    image: "/assets/kiosk/plants/PL082.jpg",
    keralaContext: "Cultivated in the high-altitude spice estates of Idukki and Wayanad, celebrated for its intense essential oils (eugenol).",
    classicalDescription: "Praised as Mukha-vaishadya-kara (oral purifier and breath sweetener), Chakshushya (cooling to the senses), and Deepana (carminative).",
    classicalSource: "Ashtanga Hridaya",
    classicalCitation: "Ashtanga Hridaya, Sutrasthana Ch. 2 (Dinacharya - Daily Oral Care)",
    tasteProperty: "Tikta-Katu Rasa (Bitter-Pungent), Sheeta Virya (Cooling potency)",
    historicalFact: "Recorded in the Sushruta Samhita and exported along maritime Silk routes from India and the Spice Islands across the ancient world."
  },
  cinnamon: {
    id: "cinnamon",
    plantId: "PL067",
    commonName: "Ceylon Cinnamon",
    commonNameMl: "കറുവപ്പട്ട",
    sanskritName: "त्वक् (दारुसिता)",
    sanskritTranslit: "Tvak / Darusita",
    botanicalName: "Cinnamomum verum",
    family: "Lauraceae",
    plantPart: "Dried inner bark",
    plantPartCategory: "bark",
    image: "/assets/kiosk/plants/PL067.jpg",
    keralaContext: "Fragrant evergreen tree indigenous to Sri Lanka and Southern Western Ghats, harvested by delicately stripping the fragrant inner bark.",
    classicalDescription: "Integral component of the ancient Trijataka triad (Tvak, Ela, Patra). Documented as Sugandhi (aromatic), Hridya, and Vata-Kaphahara.",
    classicalSource: "Charaka Samhita & Bhavaprakasha",
    classicalCitation: "Bhavaprakasha Nighantu, Karpuradi Varga",
    tasteProperty: "Madhura-Tikta-Katu Rasa, Ushna Virya (Heating potency)",
    historicalFact: "Described in 17th-century Dutch botanical records of Malabar by Hendrik van Rheede in Hortus Malabaricus."
  },
  ginger: {
    id: "ginger",
    plantId: "PL056",
    commonName: "Ginger (Dry: Sunthi)",
    commonNameMl: "ഇഞ്ചി (ചുക്ക്)",
    sanskritName: "शुण्ठी / नागर",
    sanskritTranslit: "Shunthi / Nagara (Dry) | Ardraka (Fresh)",
    botanicalName: "Zingiber officinale",
    family: "Zingiberaceae",
    plantPart: "Underground rhizome",
    plantPartCategory: "rhizome",
    image: "/assets/kiosk/plants/PL056.jpg",
    keralaContext: "Known as Inchi when fresh and Chukku when dried; a cornerstone of traditional Kerala kashayams, festive sadhyas, and home remedies.",
    classicalDescription: "Acclaimed as 'Mahaushadha' (the universal sovereign medicine) and 'Vishwabhesheja'. Revered for promoting Agni (digestive fire) without aggravating Pitta.",
    classicalSource: "Bhavaprakasha Nighantu",
    classicalCitation: "Bhavaprakasha Nighantu, Haritakyadi Varga",
    tasteProperty: "Katu Rasa (Pungent), Snigdha Guna, Ushna Virya",
    historicalFact: "Kerala dried ginger (Cochin Ginger) was prized as the finest ginger in international commerce since early medieval spice voyages."
  },
  cumin: {
    id: "cumin",
    plantId: "PL059",
    commonName: "Cumin",
    commonNameMl: "ജീരകം",
    sanskritName: "जीरक",
    sanskritTranslit: "Jeeraka",
    botanicalName: "Cuminum cyminum",
    family: "Apiaceae",
    plantPart: "Dried fruit (commonly called seed)",
    plantPartCategory: "fruit_capsule",
    image: "/assets/kiosk/plants/PL059.jpg",
    keralaContext: "The essence of Kerala 'Jeeraka Vellam' (cumin water), an everyday Ayurvedic warm beverage served across households.",
    classicalDescription: "Derived from the root 'Jri' meaning 'that which aids digestion'. Documented as Deepana, Pachana, Ruchya, and Grahi.",
    classicalSource: "Charaka Samhita & Ashtanga Hridaya",
    classicalCitation: "Charaka Samhita, Sutrasthana Ch. 27",
    tasteProperty: "Katu Rasa (Pungent), Ushna Virya (Heating potency)",
    historicalFact: "Discovered in archaeological excavations of 4,000-year-old Indus Valley settlements and ancient Syrian trade depots."
  },
  nutmeg: {
    id: "nutmeg",
    plantId: "PL089",
    commonName: "Nutmeg & Mace",
    commonNameMl: "ജാതിക്ക",
    sanskritName: "जातीफल",
    sanskritTranslit: "Jatiphala",
    botanicalName: "Myristica fragrans",
    family: "Myristicaceae",
    plantPart: "Dried seed (Nutmeg) & Lacy Aril (Mace / Jatipatri)",
    plantPartCategory: "seed",
    image: "/assets/kiosk/plants/PL089.jpg",
    keralaContext: "Kerala is India's leading producer of nutmeg; grown in river valleys with rich alluvial soil under coconut and arecanut canopies.",
    classicalDescription: "Praised as Sugandhi (fragrant), Deepana, and Nidrajanana (promoting restful sleep). Used in pediatric digestive and aromatic lehyams.",
    classicalSource: "Dhanvantari Nighantu",
    classicalCitation: "Dhanvantari Nighantu, Chandanadi Varga",
    tasteProperty: "Tikta-Katu-Kashaya Rasa, Ushna Virya",
    historicalFact: "In the 16th and 17th centuries, nutmeg was one of the most valuable luxury commodities in the world, worth more than gold by weight."
  }
};

// =============================================================================
// LEVEL 1: THE SPICE DETECTIVE
// =============================================================================

export interface Level1Question {
  id: string;
  spiceKey: string;
  question: string;
  questionMl: string;
  image: string;
  correctAnswer: string;
  correctAnswerMl: string;
  options: { label: string; labelMl: string; isCorrect: boolean }[];
  botanicalName: string;
  family: string;
  vedaExplanation: string;
  vedaExplanationMl: string;
}

export const LEVEL_1_QUESTIONS: Level1Question[] = [
  {
    id: "l1_cardamom",
    spiceKey: "cardamom",
    question: "Which royal spice am I? Look closely at my green pod and delicate ridges.",
    questionMl: "ഞാൻ ഏത് സുഗന്ധവ്യഞ്ജനമാണ്? പച്ച നിറമുള്ള ഈ കായ് സൂക്ഷിച്ചു നോക്കൂ.",
    image: "/assets/kiosk/plants/PL051.jpg",
    correctAnswer: "Cardamom",
    correctAnswerMl: "ഏലം",
    options: [
      { label: "Turmeric", labelMl: "മഞ്ഞൾ", isCorrect: false },
      { label: "Cardamom", labelMl: "ഏലം", isCorrect: true },
      { label: "Cinnamon", labelMl: "കറുവപ്പട്ട", isCorrect: false },
      { label: "Clove", labelMl: "ഗ്രാമ്പൂ", isCorrect: false }
    ],
    botanicalName: "Elettaria cardamomum",
    family: "Zingiberaceae",
    vedaExplanation: "Correct! That is Cardamom (Elettaria cardamomum), praised as the 'Queen of Spices'. Indigenous to Kerala's Western Ghats rainforests.",
    vedaExplanationMl: "ശരിയുത്തരം! ഇത് ഏലം (Elettaria cardamomum) ആണ്. പശ്ചിമഘട്ട വനങ്ങളിൽ തനതായി വളരുന്ന സുഗന്ധവ്യഞ്ജനങ്ങളുടെ രാജ്ഞി."
  },
  {
    id: "l1_turmeric",
    spiceKey: "turmeric",
    question: "Which vibrant golden spice am I? I grow underground as a sacred rhizome.",
    questionMl: "തിളങ്ങുന്ന മഞ്ഞ നിറമുള്ള ഈ സുഗന്ധവ്യഞ്ജനം ഏതാണ്? മണ്ണടിയിൽ കിഴങ്ങായി വളരുന്നു.",
    image: "/assets/kiosk/plants/PL057.jpg",
    correctAnswer: "Turmeric",
    correctAnswerMl: "മഞ്ഞൾ",
    options: [
      { label: "Ginger", labelMl: "ഇഞ്ചി", isCorrect: false },
      { label: "Nutmeg", labelMl: "ജാതിക്ക", isCorrect: false },
      { label: "Turmeric", labelMl: "മഞ്ഞൾ", isCorrect: true },
      { label: "Cumin", labelMl: "ജീരകം", isCorrect: false }
    ],
    botanicalName: "Curcuma longa",
    family: "Zingiberaceae",
    vedaExplanation: "Excellent! You identified Turmeric (Curcuma longa), revered in Ayurveda as 'Haridra' for its natural golden curcuminoids.",
    vedaExplanationMl: "അതിശയകരം! ഇത് മഞ്ഞൾ (Curcuma longa) ആണ്. ആയുർവേദത്തിൽ 'ഹരിദ്ര' എന്ന് ആദരിക്കപ്പെടുന്ന പവിത്ര സസ്യം."
  },
  {
    id: "l1_black_pepper",
    spiceKey: "black_pepper",
    question: "Which legendary spice am I? Known worldwide as 'Black Gold' and 'King of Spices'.",
    questionMl: "കറുത്ത പൊന്ന് എന്നും സുഗന്ധവ്യഞ്ജനങ്ങളുടെ രാജാവ് എന്നും അറിയപ്പെടുന്നത് ഏതാണ്?",
    image: "/assets/kiosk/plants/PL053.jpg",
    correctAnswer: "Black Pepper",
    correctAnswerMl: "കുരുമുളക്",
    options: [
      { label: "Clove", labelMl: "ഗ്രാമ്പൂ", isCorrect: false },
      { label: "Black Pepper", labelMl: "കുരുമുളക്", isCorrect: true },
      { label: "Cumin", labelMl: "ജീരകം", isCorrect: false },
      { label: "Mustard", labelMl: "കടുക്", isCorrect: false }
    ],
    botanicalName: "Piper nigrum",
    family: "Piperaceae",
    vedaExplanation: "Spot on! That is Black Pepper (Piper nigrum). Malabar black pepper pioneered early maritime spice routes between Kerala and the Roman Empire.",
    vedaExplanationMl: "തികച്ചും ശരി! ഇത് കുരുമുളക് (Piper nigrum) ആണ്. പുരാതന റോമാ സാമ്രാജ്യവുമായി വ്യാപാരബന്ധം സൃഷ്ടിച്ച മലബാർ കുരുമുളക്."
  },
  {
    id: "l1_clove",
    spiceKey: "clove",
    question: "Which aromatic spice am I? I resemble a tiny hand-carved floral nail.",
    questionMl: "ചെറിയൊരു ആണി പോലെ കാണപ്പെടുന്ന സുഗന്ധം നിറഞ്ഞ ഈ പൂമൊട്ട് ഏതാണ്?",
    image: "/assets/kiosk/plants/PL082.jpg",
    correctAnswer: "Clove",
    correctAnswerMl: "ഗ്രാമ്പൂ",
    options: [
      { label: "Cinnamon", labelMl: "കറുവപ്പട്ട", isCorrect: false },
      { label: "Cardamom", labelMl: "ഏലം", isCorrect: false },
      { label: "Clove", labelMl: "ഗ്രാമ്പൂ", isCorrect: true },
      { label: "Star Anise", labelMl: "തക്കോലം", isCorrect: false }
    ],
    botanicalName: "Syzygium aromaticum",
    family: "Myrtaceae",
    vedaExplanation: "Brilliant! You identified Clove (Syzygium aromaticum), called 'Lavanga' in classical Ayurveda. It is the dried unopened flower bud of an evergreen tree.",
    vedaExplanationMl: "മികച്ച ഉത്തരം! ഇത് ഗ്രാമ്പൂ (Syzygium aromaticum) ആണ്. ആയുർവേദത്തിൽ 'ലവംഗം' എന്ന് അറിയപ്പെടുന്ന സുഗന്ധ പൂമൊട്ട്."
  }
];

// =============================================================================
// LEVEL 2: FIND THE PLANT PART
// =============================================================================

export interface PlantPartCategory {
  id: "rhizome" | "bark" | "flower_bud" | "fruit";
  labelEn: string;
  labelMl: string;
  description: string;
  iconName: string;
}

export const PLANT_PART_CATEGORIES: PlantPartCategory[] = [
  {
    id: "rhizome",
    labelEn: "Rhizome (Underground Stem)",
    labelMl: "ഭൂകാണ്ഡം (റൈസോം)",
    description: "Modified underground plant stem sending out roots and shoots.",
    iconName: "sprout"
  },
  {
    id: "bark",
    labelEn: "Inner Bark",
    labelMl: "മരത്തൊലി (ബാപ്പ)",
    description: "The aromatic inner layer stripped from the branches of the tree.",
    iconName: "layers"
  },
  {
    id: "flower_bud",
    labelEn: "Dried Flower Bud",
    labelMl: "ഉണങ്ങിയ പൂമൊട്ട്",
    description: "Unopened aromatic floral blossom dried prior to blooming.",
    iconName: "flower2"
  },
  {
    id: "fruit",
    labelEn: "Fruit / Seed Capsule",
    labelMl: "ഫലം / വിത്തുസഞ്ചി",
    description: "The mature ovary of a flowering plant carrying nutrient-rich seeds.",
    iconName: "cherry"
  }
];

export interface Level2Item {
  id: string;
  nameEn: string;
  nameMl: string;
  botanicalName: string;
  correctCategory: "rhizome" | "bark" | "flower_bud" | "fruit";
  image: string;
  explanation: string;
}

export const LEVEL_2_ITEMS: Level2Item[] = [
  {
    id: "l2_turmeric",
    nameEn: "Turmeric",
    nameMl: "മഞ്ഞൾ",
    botanicalName: "Curcuma longa",
    correctCategory: "rhizome",
    image: "/assets/kiosk/plants/PL057.jpg",
    explanation: "Turmeric grows as an underground swollen stem (rhizome) storing curcumin and essential oleoresins."
  },
  {
    id: "l2_ginger",
    nameEn: "Ginger",
    nameMl: "ഇഞ്ചി",
    botanicalName: "Zingiber officinale",
    correctCategory: "rhizome",
    image: "/assets/kiosk/plants/PL056.jpg",
    explanation: "Ginger is an aromatic underground rhizome, harvested fresh as Inchi or sun-dried as Chukku."
  },
  {
    id: "l2_cinnamon",
    nameEn: "Cinnamon",
    nameMl: "കറുവപ്പട്ട",
    botanicalName: "Cinnamomum verum",
    correctCategory: "bark",
    image: "/assets/kiosk/plants/PL067.jpg",
    explanation: "Cinnamon is the delicate inner bark peeled from pruned shoots and dried into fragrant quills."
  },
  {
    id: "l2_clove",
    nameEn: "Clove",
    nameMl: "ഗ്രാമ്പൂ",
    botanicalName: "Syzygium aromaticum",
    correctCategory: "flower_bud",
    image: "/assets/kiosk/plants/PL082.jpg",
    explanation: "Cloves are unopened flower buds picked by hand just as they turn pinkish-red, then sun-dried."
  },
  {
    id: "l2_cardamom",
    nameEn: "Cardamom",
    nameMl: "ഏലം",
    botanicalName: "Elettaria cardamomum",
    correctCategory: "fruit",
    image: "/assets/kiosk/plants/PL051.jpg",
    explanation: "Cardamom is a three-sided, papery capsule (fruit) encasing intensely aromatic dark seeds."
  },
  {
    id: "l2_pepper",
    nameEn: "Black Pepper",
    nameMl: "കുരുമുളക്",
    botanicalName: "Piper nigrum",
    correctCategory: "fruit",
    image: "/assets/kiosk/plants/PL053.jpg",
    explanation: "Black pepper is the drupe (berry fruit) plucked just before ripening and sun-dried until wrinkled and dark."
  }
];

// =============================================================================
// LEVEL 3: THE SPICE MEMORY GRID (3x4 Grid = 6 Pairs = 12 Cards)
// =============================================================================

export interface MemorySpiceCard {
  id: string; // unique card instance id
  pairId: string;
  name: string;
  nameMl: string;
  botanicalName: string;
  image: string;
  fact: string;
}

export const MEMORY_SPICE_PAIRS = [
  {
    pairId: "turmeric",
    name: "Turmeric",
    nameMl: "മഞ്ഞൾ",
    botanicalName: "Curcuma longa",
    image: "/assets/kiosk/plants/PL057.jpg",
    fact: "Haridra (Turmeric) is celebrated in classical texts for its golden beauty and purifying character."
  },
  {
    pairId: "ginger",
    name: "Ginger",
    nameMl: "ഇഞ്ചി",
    botanicalName: "Zingiber officinale",
    image: "/assets/kiosk/plants/PL056.jpg",
    fact: "Dry Ginger (Sunthi) is hailed as 'Mahaushadha'—the great universal botanical digestive."
  },
  {
    pairId: "cardamom",
    name: "Cardamom",
    nameMl: "ഏലം",
    botanicalName: "Elettaria cardamomum",
    image: "/assets/kiosk/plants/PL051.jpg",
    fact: "Ela (Cardamom) is native to Kerala's Western Ghats and balances Kapha and Vata."
  },
  {
    pairId: "pepper",
    name: "Black Pepper",
    nameMl: "കുരുമുളക്",
    botanicalName: "Piper nigrum",
    image: "/assets/kiosk/plants/PL053.jpg",
    fact: "Maricha (Black Pepper) stimulates digestive Agni and was known as Malabar's Black Gold."
  },
  {
    pairId: "cinnamon",
    name: "Cinnamon",
    nameMl: "കറുവപ്പട്ട",
    botanicalName: "Cinnamomum verum",
    image: "/assets/kiosk/plants/PL067.jpg",
    fact: "Tvak (Cinnamon bark) forms the famed classical aromatic triad known as Trijataka."
  },
  {
    pairId: "clove",
    name: "Clove",
    nameMl: "ഗ്രാമ്പൂ",
    botanicalName: "Syzygium aromaticum",
    image: "/assets/kiosk/plants/PL082.jpg",
    fact: "Lavanga (Clove bud) is recommended in Ashtanga Hridaya for daily mouth and breath freshness."
  }
];

// =============================================================================
// LEVEL 4: AYURVEDA KNOWLEDGE MATCH
// =============================================================================

export interface Level4AyurvedaMatch {
  id: string;
  spiceKey: string;
  commonName: string;
  commonNameMl: string;
  sanskritName: string;
  sanskritMeaning: string;
  botanicalName: string;
  image: string;
  classicalConcept: string;
  classicalSource: string;
  fullQuote: string;
  educationalNote: string;
}

export const LEVEL_4_MATCHES: Level4AyurvedaMatch[] = [
  {
    id: "l4_haridra",
    spiceKey: "turmeric",
    commonName: "Turmeric",
    commonNameMl: "മഞ്ഞൾ",
    sanskritName: "हरिद्रा (Haridra)",
    sanskritMeaning: "The golden/yellow botanical of auspicious purity",
    botanicalName: "Curcuma longa",
    image: "/assets/kiosk/plants/PL057.jpg",
    classicalConcept: "Varnya (Complexion enhancing) & Vishaghna",
    classicalSource: "Charaka Samhita, Sutrasthana",
    fullQuote: "Haridra kaphapittaghni varnya tvagdosha-nashani...",
    educationalNote: "Charaka categorizes Haridra among the prime Lekhaniya and Kusthaghna groups, honoring its traditional skin and metabolic support."
  },
  {
    id: "l4_shunthi",
    spiceKey: "ginger",
    commonName: "Dry Ginger",
    commonNameMl: "ചുക്ക്",
    sanskritName: "शुण्ठी (Shunthi / Nagara)",
    sanskritMeaning: "The great universal sovereign medicine (Mahaushadha)",
    botanicalName: "Zingiber officinale",
    image: "/assets/kiosk/plants/PL056.jpg",
    classicalConcept: "Deepana (Kindles Agni) & Pachana (Digestive)",
    classicalSource: "Bhavaprakasha Nighantu",
    fullQuote: "Nagara deepani vrishya grahini kaphavaatajit...",
    educationalNote: "Bhavaprakasha notes that dry ginger stimulates the digestive fire without aggravating Pitta due to its sweet post-digestive taste (Madhura Vipaka)."
  },
  {
    id: "l4_maricha",
    spiceKey: "black_pepper",
    commonName: "Black Pepper",
    commonNameMl: "കുരുമുളക്",
    sanskritName: "मरिच (Maricha)",
    sanskritMeaning: "The sun-powered cleanser of body pathways",
    botanicalName: "Piper nigrum",
    image: "/assets/kiosk/plants/PL053.jpg",
    classicalConcept: "Pramathi & Trikatu Component",
    classicalSource: "Charaka Samhita, Vimanasthana",
    fullQuote: "Maricham katukam tiktam kaphavaata haram param...",
    educationalNote: "Together with Shunthi and Pippali, Maricha constitutes the revered Trikatu compound, used to clear respiratory and digestive channels."
  },
  {
    id: "l4_ela",
    spiceKey: "cardamom",
    commonName: "Cardamom",
    commonNameMl: "ഏലം",
    sanskritName: "एला (Ela / Sukshma Ela)",
    sanskritMeaning: "The sweet-scented heart-delighting seed pod",
    botanicalName: "Elettaria cardamomum",
    image: "/assets/kiosk/plants/PL051.jpg",
    classicalConcept: "Hridya (Heart-pleasing) & Sugandhi",
    classicalSource: "Sushruta Samhita, Sutrasthana",
    fullQuote: "Ela katu rasa sheetala sugandhadya kaphavatajit...",
    educationalNote: "Sushruta lists Ela at the head of the Eladi Gana group, commending its pleasing natural fragrance and soothing cooling aftertaste."
  },
  {
    id: "l4_lavanga",
    spiceKey: "clove",
    commonName: "Clove",
    commonNameMl: "ഗ്രാമ്പൂ",
    sanskritName: "लवङ्ग (Lavanga / Devakusuma)",
    sanskritMeaning: "Divine flower of soothing aromatic clarity",
    botanicalName: "Syzygium aromaticum",
    image: "/assets/kiosk/plants/PL082.jpg",
    classicalConcept: "Mukha-vaishadya (Oral purity) & Chakshushya",
    classicalSource: "Ashtanga Hridaya, Sutrasthana",
    fullQuote: "Lavangam katukam tiktam sheetalam chakshusham param...",
    educationalNote: "Vagbhata's Ashtanga Hridaya instructs the chewing of Lavanga with betel leaf in Dinacharya (daily lifestyle) to cleanse palate and senses."
  },
  {
    id: "l4_tvak",
    spiceKey: "cinnamon",
    commonName: "Ceylon Cinnamon",
    commonNameMl: "കറുവപ്പട്ട",
    sanskritName: "त्वक् (Tvak / Darusita)",
    sanskritMeaning: "The sweet fragrant sacred inner tree bark",
    botanicalName: "Cinnamomum verum",
    image: "/assets/kiosk/plants/PL067.jpg",
    classicalConcept: "Trijataka Component & Sugandhi",
    classicalSource: "Charaka Samhita & Bhavaprakasha",
    fullQuote: "Tvak katukam tiktam madhuram laghu vanhitrit...",
    educationalNote: "Classical texts integrate Tvak with Ela and Tejpatra into the famous Trijataka aromatic blend that balances Kapha and Vata."
  }
];

// =============================================================================
// LEVEL 5: REBUILD THE SPICE COLLECTION (JIGSAW + BOTANICAL DISCOVERY)
// =============================================================================

export interface Level5DiscoveryItem {
  id: string;
  name: string;
  nameMl: string;
  botanicalName: string;
  family: string;
  bowlLocation: string;
  keyFeature: string;
  image: string;
}

export const LEVEL_5_DISCOVERIES: Level5DiscoveryItem[] = [
  {
    id: "d_cardamom",
    name: "Green Cardamom Pods",
    nameMl: "പച്ച ഏലക്കായ്",
    botanicalName: "Elettaria cardamomum",
    family: "Zingiberaceae",
    bowlLocation: "Upper brass bowl with fresh green pods",
    keyFeature: "Three-sided capsules sun-dried on curing kilns",
    image: "/assets/kiosk/plants/PL051.jpg"
  },
  {
    id: "d_pepper",
    name: "Malabar Tellicherry Pepper",
    nameMl: "തലശ്ശേരി കുരുമുളക്",
    botanicalName: "Piper nigrum",
    family: "Piperaceae",
    bowlLocation: "Carved wooden bowl with dark wrinkled berries",
    keyFeature: "Sun-cured bold berries known for intense piperine aroma",
    image: "/assets/kiosk/plants/PL053.jpg"
  },
  {
    id: "d_turmeric",
    name: "Golden Turmeric Fingers",
    nameMl: "മഞ്ഞൾ വിരലുകൾ",
    botanicalName: "Curcuma longa",
    family: "Zingiberaceae",
    bowlLocation: "Traditional brass bell-metal uruli",
    keyFeature: "Boiled and sun-polished finger rhizomes rich in curcumin",
    image: "/assets/kiosk/plants/PL057.jpg"
  },
  {
    id: "d_clove",
    name: "Aromatic Cloves",
    nameMl: "സുഗന്ധ ഗ്രാമ്പൂ",
    botanicalName: "Syzygium aromaticum",
    family: "Myrtaceae",
    bowlLocation: "Polished teak spice dish",
    keyFeature: "Crown-shaped dried flower buds loaded with eugenol",
    image: "/assets/kiosk/plants/PL082.jpg"
  }
];

// =============================================================================
// LEVEL 6: THE GRAND SPICE MASTER CHALLENGE (5 INTENSE STAGES)
// =============================================================================

export interface StageAQuestion {
  id: string;
  spiceKey: string;
  image: string;
  correctAnswer: string;
  options: string[];
}

export const STAGE_A_QUESTIONS: StageAQuestion[] = [
  {
    id: "sa_1",
    spiceKey: "cardamom",
    image: "/assets/kiosk/plants/PL051.jpg",
    correctAnswer: "Cardamom",
    options: ["Cardamom", "Cumin", "Clove", "Ginger"]
  },
  {
    id: "sa_2",
    spiceKey: "turmeric",
    image: "/assets/kiosk/plants/PL057.jpg",
    correctAnswer: "Turmeric",
    options: ["Nutmeg", "Turmeric", "Cinnamon", "Pepper"]
  },
  {
    id: "sa_3",
    spiceKey: "pepper",
    image: "/assets/kiosk/plants/PL053.jpg",
    correctAnswer: "Black Pepper",
    options: ["Mustard", "Cumin", "Black Pepper", "Clove"]
  },
  {
    id: "sa_4",
    spiceKey: "clove",
    image: "/assets/kiosk/plants/PL082.jpg",
    correctAnswer: "Clove",
    options: ["Star Anise", "Clove", "Cinnamon", "Cardamom"]
  },
  {
    id: "sa_5",
    spiceKey: "cinnamon",
    image: "/assets/kiosk/plants/PL067.jpg",
    correctAnswer: "Cinnamon",
    options: ["Cinnamon", "Ginger", "Nutmeg", "Turmeric"]
  }
];

export interface StageBClassificationItem {
  id: string;
  commonName: string;
  botanicalName: string;
  family: string;
  plantPart: string;
}

export const STAGE_B_ITEMS: StageBClassificationItem[] = [
  {
    id: "sb_cardamom",
    commonName: "Cardamom",
    botanicalName: "Elettaria cardamomum",
    family: "Zingiberaceae",
    plantPart: "Fruit / Seed Capsule"
  },
  {
    id: "sb_pepper",
    commonName: "Black Pepper",
    botanicalName: "Piper nigrum",
    family: "Piperaceae",
    plantPart: "Dried Fruit (Drupe)"
  },
  {
    id: "sb_cinnamon",
    commonName: "Cinnamon",
    botanicalName: "Cinnamomum verum",
    family: "Lauraceae",
    plantPart: "Inner Bark"
  },
  {
    id: "sb_clove",
    commonName: "Clove",
    botanicalName: "Syzygium aromaticum",
    family: "Myrtaceae",
    plantPart: "Unopened Flower Bud"
  },
  {
    id: "sb_turmeric",
    commonName: "Turmeric",
    botanicalName: "Curcuma longa",
    family: "Zingiberaceae",
    plantPart: "Underground Rhizome"
  }
];

export interface StageCSanskritItem {
  id: string;
  commonName: string;
  sanskritName: string;
  sanskritMeaning: string;
}

export const STAGE_C_ITEMS: StageCSanskritItem[] = [
  { id: "sc_turmeric", commonName: "Turmeric", sanskritName: "Haridra (हरिद्रा)", sanskritMeaning: "The golden sacred cleanser" },
  { id: "sc_pepper", commonName: "Black Pepper", sanskritName: "Maricha (मरिच)", sanskritMeaning: "The solar pungent digestive" },
  { id: "sc_cardamom", commonName: "Cardamom", sanskritName: "Sukshma Ela (एला)", sanskritMeaning: "The sweet cooling heart-pleaser" },
  { id: "sc_clove", commonName: "Clove", sanskritName: "Lavanga (लवङ्ग)", sanskritMeaning: "The divine floral breath purifier" },
  { id: "sc_cinnamon", commonName: "Cinnamon", sanskritName: "Tvak (त्वक्)", sanskritMeaning: "The fragrant inner bark of Trijataka" }
];

export interface StageDHistoricalRiddle {
  id: string;
  clue: string;
  clueMl: string;
  sourceCodex: string;
  correctSpice: string;
  options: string[];
  historicalContext: string;
}

export const STAGE_D_RIDDLES: StageDHistoricalRiddle[] = [
  {
    id: "sd_1",
    clue: "Which spice unites with Sunthi (Ginger) and Pippali (Long Pepper) to form the revered 'Trikatu' in the Charaka Samhita?",
    clueMl: "ചരകസംഹിതയിലെ വിഖ്യാതമായ ത്രികടുകു യോഗത്തിൽ ചുക്കിനും തിപ്പലിക്കും ഒപ്പം ചേരുന്ന സുഗന്ധവ്യഞ്ജനം ഏതാണ്?",
    sourceCodex: "Charaka Samhita, Vimanasthana",
    correctSpice: "Black Pepper",
    options: ["Black Pepper", "Cardamom", "Clove", "Turmeric"],
    historicalContext: "Trikatu is the premier bioavailability enhancer and digestive catalyst in traditional Ayurvedic pharmaceutics."
  },
  {
    id: "sd_2",
    clue: "Which 17th-century Latin treatise compiled in Kochi under Hendrik van Rheede documented Kerala's indigenous spices and botanical taxonomy?",
    clueMl: "17-ാം നൂറ്റാണ്ടിൽ കൊച്ചിയിൽ വെച്ച് രചിക്കപ്പെട്ട കേരളീയ സസ്യങ്ങളെക്കുറിച്ചുള്ള പ്രശസ്തമായ ഗ്രന്ഥം ഏതാണ്?",
    sourceCodex: "Hortus Malabaricus (1678–1693)",
    correctSpice: "Hortus Malabaricus",
    options: ["Hortus Malabaricus", "Codex Sinaiticus", "De Materia Medica", "Historia Naturalis"],
    historicalContext: "Hortus Malabaricus (12 folio volumes) drew heavily on the hereditary knowledge of Ezhava physician Itty Achudan and Brahmin scholars."
  },
  {
    id: "sd_3",
    clue: "Which spice is specified in Vagbhata's Ashtanga Hridaya as essential for daily morning oral gargling and breath freshening (Dinacharya)?",
    clueMl: "അഷ്ടാംഗഹൃദയത്തിലെ ദിനചര്യയിൽ മുഖശുദ്ധിക്കും വായ്നാറ്റമകറ്റാനും ശുപാർശ ചെയ്യുന്ന പൂമൊട്ട് ഏതാണ്?",
    sourceCodex: "Ashtanga Hridaya, Sutrasthana",
    correctSpice: "Clove",
    options: ["Clove", "Cinnamon", "Ginger", "Nutmeg"],
    historicalContext: "Vagbhata praised Lavanga for clarifying taste perception and pacifying excessive oral Kapha."
  }
];

export interface StageEMatrixItem {
  id: string;
  spiceName: string;
  botanical: string;
  part: string;
  sanskrit: string;
  sourceText: string;
  image: string;
}

export const STAGE_E_MATRIX: StageEMatrixItem[] = [
  {
    id: "se_cardamom",
    spiceName: "Cardamom",
    botanical: "Elettaria cardamomum",
    part: "Fruit / Capsule",
    sanskrit: "Ela (एला)",
    sourceText: "Sushruta Samhita",
    image: "/assets/kiosk/plants/PL051.jpg"
  },
  {
    id: "se_pepper",
    spiceName: "Black Pepper",
    botanical: "Piper nigrum",
    part: "Berry (Fruit)",
    sanskrit: "Maricha (मरिच)",
    sourceText: "Charaka Samhita",
    image: "/assets/kiosk/plants/PL053.jpg"
  },
  {
    id: "se_turmeric",
    spiceName: "Turmeric",
    botanical: "Curcuma longa",
    part: "Rhizome",
    sanskrit: "Haridra (हरिद्रा)",
    sourceText: "Charaka Samhita",
    image: "/assets/kiosk/plants/PL057.jpg"
  },
  {
    id: "se_clove",
    spiceName: "Clove",
    botanical: "Syzygium aromaticum",
    part: "Flower Bud",
    sanskrit: "Lavanga (लवङ्ग)",
    sourceText: "Ashtanga Hridaya",
    image: "/assets/kiosk/plants/PL082.jpg"
  },
  {
    id: "se_cinnamon",
    spiceName: "Cinnamon",
    botanical: "Cinnamomum verum",
    part: "Inner Bark",
    sanskrit: "Tvak (त्वक्)",
    sourceText: "Bhavaprakasha",
    image: "/assets/kiosk/plants/PL067.jpg"
  }
];

// =============================================================================
// LEVEL METADATA DEFINITIONS
// =============================================================================

export interface LevelInfo {
  levelNumber: 1 | 2 | 3 | 4 | 5 | 6;
  id: string;
  title: string;
  titleMl: string;
  subtitle: string;
  subtitleMl: string;
  difficulty: "Very Easy" | "Easy" | "Medium" | "Medium–Hard" | "Hard" | "Expert";
  difficultyMl: string;
  difficultyColor: string;
  description: string;
  descriptionMl: string;
  iconName: string;
  estimatedTime: string;
  basePoints: number;
}

export const SPICE_QUEST_LEVELS: LevelInfo[] = [
  {
    levelNumber: 1,
    id: "spice_detective",
    title: "Level 1: The Spice Detective",
    titleMl: "ലെവൽ 1: സുഗന്ധ ഡിറ്റക്ടീവ്",
    subtitle: "Visual Spice Identification",
    subtitleMl: "ഫോട്ടോ നോക്കി തിരിച്ചറിയൂ",
    difficulty: "Very Easy",
    difficultyMl: "വളരെ എളുപ്പം",
    difficultyColor: "#10B981",
    description: "Identify mysterious Kerala spices by studying high-resolution botanical photographs.",
    descriptionMl: "ഉയർന്ന റെസല്യൂഷൻ ഫോട്ടോകൾ കണ്ട് പ്രധാന സുഗന്ധവ്യഞ്ജനങ്ങളെ കൃത്യമായി തിരിച്ചറിയുക.",
    iconName: "search",
    estimatedTime: "1-2 mins",
    basePoints: 70
  },
  {
    levelNumber: 2,
    id: "plant_part",
    title: "Level 2: Find the Plant Part",
    titleMl: "ലെവൽ 2: സസ്യ ഭാഗം കണ്ടെത്തൂ",
    subtitle: "Botanical Morphology Matching",
    subtitleMl: "സസ്യശാസ്ത്ര ഭാഗങ്ങൾ പൊരുത്തപ്പെടുത്തൂ",
    difficulty: "Easy",
    difficultyMl: "എളുപ്പം",
    difficultyColor: "#34D399",
    description: "Discover which morphological organ of the living plant gives us each precious spice.",
    descriptionMl: "വേരുകൾ, കാണ്ഡം, പൂമൊട്ട്, വിത്ത് എന്നിവയിൽ നിന്നാണോ ഓരോ സുഗന്ധവ്യഞ്ജനവും ലഭിക്കുന്നതെന്ന് കണ്ടെത്തൂ.",
    iconName: "sprout",
    estimatedTime: "2-3 mins",
    basePoints: 90
  },
  {
    levelNumber: 3,
    id: "memory_grid",
    title: "Level 3: The Spice Memory Grid",
    titleMl: "ലെവൽ 3: സുഗന്ധ മെമ്മറി ഗ്രിഡ്",
    subtitle: "Parchment Card Memory Puzzle",
    subtitleMl: "കാർഡുകൾ മറിച്ചു പൊരുത്തം കണ്ടെത്തൂ",
    difficulty: "Medium",
    difficultyMl: "ഇടത്തരം",
    difficultyColor: "#FBBF24",
    description: "Test your botanical memory by revealing and matching identical ancient spice cards in a 3×4 grid.",
    descriptionMl: "12 കാർഡുകളുള്ള ഗ്രിഡിൽ ഒരേപോലെയുള്ള സുഗന്ധവ്യഞ്ജന ജോടികളെ കണ്ടെത്തി വിജയകരമായി പൂർത്തിയാക്കുക.",
    iconName: "grid",
    estimatedTime: "2-3 mins",
    basePoints: 100
  },
  {
    levelNumber: 4,
    id: "ayurveda_match",
    title: "Level 4: Ayurveda Knowledge Match",
    titleMl: "ലെവൽ 4: ആയുർവേദ ജ്ഞാന പൊരുത്തം",
    subtitle: "Classical Sanskrit Codices & Properties",
    subtitleMl: "സംസ്കൃത നാമങ്ങളും പ്രാചീന ഗ്രന്ഥങ്ങളും",
    difficulty: "Medium–Hard",
    difficultyMl: "ഇടത്തരം കാഠിന്യം",
    difficultyColor: "#F59E0B",
    description: "Connect spices with their documented Sanskrit names and traditional Ayurvedic properties from classical codices.",
    descriptionMl: "ചരക-സുശ്രുത-വാഗ്ഭട ഗ്രന്ഥങ്ങളിലെ സംസ്കൃത നാമങ്ങളും പരമ്പരാഗത വിശേഷണങ്ങളും സുഗന്ധവ്യഞ്ജനങ്ങളുമായി ബന്ധിപ്പിക്കുക.",
    iconName: "book-open",
    estimatedTime: "3-4 mins",
    basePoints: 120
  },
  {
    levelNumber: 5,
    id: "spice_jigsaw",
    title: "Level 5: Rebuild the Spice Collection",
    titleMl: "ലെവൽ 5: സുഗന്ധ ശേഖരം പുനർനിർമ്മിക്കൂ",
    subtitle: "Visual Jigsaw Puzzle & Botanical Discovery",
    subtitleMl: "ജിഗ്‌സോ പസിൽ & സസ്യ ഗവേഷണം",
    difficulty: "Hard",
    difficultyMl: "കഠിനം",
    difficultyColor: "#EA580C",
    description: "Assemble a high-resolution Kerala spice collection visual puzzle, then identify the hidden ingredients inside.",
    descriptionMl: "കേരളീയ സുഗന്ധവ്യഞ്ജന ശേഖരത്തിന്റെ ജിഗ്‌സോ പസിൽ പൂർത്തിയാക്കി അതിലെ ചേരുവകൾ കണ്ടെത്തുക.",
    iconName: "puzzle",
    estimatedTime: "4-5 mins",
    basePoints: 150
  },
  {
    levelNumber: 6,
    id: "grand_master",
    title: "Level 6: The Grand Spice Master",
    titleMl: "ലെവൽ 6: ഗ്രാൻഡ് സ്പൈസ് മാസ്റ്റർ",
    subtitle: "The Ultimate 5-Stage Expert Synthesis Challenge",
    subtitleMl: "അന്തിമ 5-ഘട്ട എക്സ്പെർട്ട് ചലഞ്ച്",
    difficulty: "Expert",
    difficultyMl: "വിദഗ്ദ്ധ തലം",
    difficultyColor: "#DC2626",
    description: "The supreme trial: conquer Mystery Identification, Classification, Sanskrit, Ancient Codices, and the Grand Matrix before time runs out!",
    descriptionMl: "ഒരു യഥാർത്ഥ സ്പൈസ് മാസ്റ്റർക്ക് മാത്രമേ ഈ 5 ഘട്ടങ്ങളുള്ള അന്തിമ വിദഗ്ദ്ധ പരീക്ഷണം വിജയകരമായി പൂർത്തിയാക്കാൻ സാധിക്കൂ!",
    iconName: "award",
    estimatedTime: "2.5 mins (Timed)",
    basePoints: 250
  }
];

