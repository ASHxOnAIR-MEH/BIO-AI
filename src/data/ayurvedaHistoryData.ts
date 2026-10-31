/**
 * AYURVEDA THROUGH THE AGES — MASTER HISTORICAL DATASET
 *
 * Sourced and verified against:
 * 1. CCRAS (Central Council for Research in Ayurvedic Sciences) — "Ayurveda: The Science of Life" Dossier
 * 2. NCBS (National Centre for Biological Sciences, TIFR) — "The Ashtavaidya Physicians of Kerala: A Tradition in Transition"
 * 3. NCBS — Ashtavaidya Archives (P. Ram Manohar, Indira Vaidyanathan)
 * 4. CCRAS — Literary Research & Classical Text Publications
 * 5. SAMHiTA (South Asian Manuscript Histories and Textual Archive)
 * 6. Ayurvedagranthasamuccaya Digital Classical Corpus
 */

export interface HistoricalDestination {
  id: string;
  order: number;
  periodName: string;
  periodNameSanskrit: string;
  periodNameMl: string;
  dateRange: string;
  approxEra: string;
  tagline: string;
  taglineMl: string;
  summary: string;
  summaryMl: string;
  narrative: string[];
  narrativeMl?: string[];
  survivingSources: string[];
  coreConcepts: {
    title: string;
    description: string;
    sanskritTerm?: string;
  }[];
  featuredArtifact: {
    name: string;
    type: "manuscript" | "herb" | "instrument" | "inscription" | "wheel";
    description: string;
    quoteSanskrit?: string;
    quoteTranslation?: string;
  };
  sourcesAndCitations: {
    source: string;
    institution: string;
    citation: string;
  }[];
  challenge: {
    question: string;
    questionMl: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface ClassicalBook {
  id: string;
  title: string;
  titleSanskrit: string;
  titleMl: string;
  traditionalAuthor: string;
  redactorCommentator?: string;
  historicalPeriod: string;
  dateRangeApprox: string;
  dateUncertaintyNote: string;
  branch: "Kayachikitsa" | "Shalyatantra" | "Samgraha" | "Nidana" | "Bhaishajya" | "Nighantu" | "Regional Compendium";
  licenseType?: "Public Domain" | "Open Access / Academic" | "Preservation Archive" | "Copyright-Protected";
  editionInfo?: string;
  sourceInstitution?: string;
  originalSourceLink?: string;
  readOnlineAvailable?: boolean;
  downloadAvailable?: boolean;
  sthanaStructure: {
    name: string;
    nameSanskrit: string;
    chapters: number;
    description: string;
  }[];
  totalChapters: number;
  totalVersesApprox: string;
  coreContributions: string[];
  verifiedExcerpt: {
    sanskrit: string;
    transliteration: string;
    english: string;
    context: string;
    reference: string;
  };
  manuscriptDetails: {
    primaryScript: string;
    material: string;
    preservationCenters: string[];
    firstPrintedEdition?: string;
  };
  historicalSignificance: string;
  ccrasReference: string;
}

export interface EightBranchInfo {
  branchNumber: number;
  name: string;
  sanskritName: string;
  sanskritScript: string;
  englishTitle: string;
  classicalScope: string;
  classicalAuthority: string;
  keyConditions: string[];
  foundationalSutra: {
    sanskrit: string;
    transliteration: string;
    translation: string;
    source: string;
  };
  modernBioAiConnection: string;
}

export interface AshtavaidyaFamily {
  id: string;
  name: string;
  nameMl: string;
  location: string;
  district: string;
  riverValley: string;
  specialization: string;
  specializationMl: string;
  historicalDocumentation: string;
  oralTraditionNote: string;
  historicalLineageDetails: string;
  classicalPractices: string[];
  ncbsArchiveReference: string;
}

export interface GurukulaStage {
  stageNumber: number;
  title: string;
  titleMl: string;
  subtitle: string;
  sanskritTerm: string;
  durationApprox: string;
  description: string;
  learningMethods: string[];
  practicalExercises: string[];
  historicalNotes: string;
}

export interface RegionalKeralaText {
  id: string;
  title: string;
  titleMl: string;
  approximatePeriod: string;
  authorship: string;
  languageAndScript: string;
  structure: string;
  keyContributions: string[];
  sampleFormulationType: string;
  historicalContext: string;
  referenceSource: string;
}

export interface IndiaMapLocation {
  id: string;
  name: string;
  sanskritName: string;
  modernState: string;
  coordinates: { x: number; y: number }; // percentage on map [0-100]
  historicalEra: string;
  tradition: string;
  associatedScholars: string[];
  associatedTexts: string[];
  historicalContext: string;
  referenceSource: string;
  isKeralaRoute?: boolean;
}

export interface HistoricalBadge {
  id: string;
  title: string;
  titleMl: string;
  description: string;
  iconName: string;
  criteria: string;
  unlockedAt: string;
}

export interface VedavaniQnAPair {
  id: string;
  question: string;
  aliases: string[];
  category: "Charaka" | "Sushruta" | "Vagbhata" | "Ashtanga" | "Ashtavaidya" | "Kerala Texts" | "Modern Research" | "Vedic";
  answer: string;
  citation: string;
  verifiedSource: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// 1. HISTORICAL DESTINATIONS (THE 6 ROADMAP EPOCHS)
// ═══════════════════════════════════════════════════════════════════════════

export const HISTORICAL_DESTINATIONS: HistoricalDestination[] = [
  {
    id: "vedic-foundations",
    order: 1,
    periodName: "Vedic Foundations",
    periodNameSanskrit: "वैदिक मूलानि (Vaidika Mūlāni)",
    periodNameMl: "വേദകാല അടിത്തറ",
    dateRange: "~1500 BCE – ~800 BCE",
    approxEra: "Early Vedic & Later Vedic Literature",
    tagline: "The Primordial Invocations of Healing & Botanical Wisdom",
    taglineMl: "ചികിത്സാ ജ്ഞാനത്തിന്റെയും ഔഷധ സസ്യങ്ങളുടെയും ആദിമ സ്രോതസ്സുകൾ",
    summary:
      "The earliest documented references to Indian healing practices, cosmic balance, and curative herbs appear in the Rigveda and Atharvaveda, laying the spiritual and conceptual matrix for classical Ayurveda.",
    summaryMl:
      "ഋഗ്വേദത്തിലും അഥർവ്വവേദത്തിലുമായി പ്രത്യക്ഷപ്പെടുന്ന ഔഷധസസ്യ പ്രാർത്ഥനകളും രോഗശാന്തി സങ്കൽപ്പങ്ങളും പിൽക്കാല ആയുർവേദത്തിന്റെ അടിസ്ഥാന ശിലകളായി മാറി.",
    narrative: [
      "In the antiquity of the Indo-Gangetic river valleys, observation of seasons (Ritu), botanical lifecycles, and bodily vitality gave rise to the earliest healing verses in world literature.",
      "The Rigveda contains the venerable 'Oshadhi Sukta' (Hymn to Medicinal Plants, X.97), venerating over a hundred botanical species with maternal reverence: 'O plants, with hundred homes and thousand sprouts, relieve this sufferer.'",
      "The Atharvaveda (also celebrated as Bhaishajya Veda) marks the operational transition into therapeutic practice, categorizing herbs into curative (Bhaishajyani) and longevity-promoting (Ayushyani).",
      "During this epoch, physiological harmony was linked to cosmic forces: Agni (cellular/metabolic heat), Vayu/Prana (vital movement), and Soma/Ap (cooling fluid nourishment) — the primordial seeds that later evolved into the Tridosha doctrine (Vata, Pitta, Kapha)."
    ],
    survivingSources: [
      "Rigveda Samhita (Mandala X, Sukta 97: Oshadhi Sukta)",
      "Atharvaveda Shaunaka Samhita (Kandas 1–8: Bhaishajya Suktas)",
      "Paippalada Samhita recension",
      "Kaushika Sutra (Atharvan therapeutic rituals and herbal applications)"
    ],
    coreConcepts: [
      {
        title: "Oshadhi Sukta",
        sanskritTerm: "ओषधि सूक्तम्",
        description: "Earliest systematic Vedic panegyric to healing flora, personifying plants as mothers endowed with cosmic vitality."
      },
      {
        title: "Tridhatu Precursors",
        sanskritTerm: "त्रिधातु (वात-पित्त-कफ मूलानि)",
        description: "Early conceptualization of bodily humors mapped to elemental forces: Vayu (air/motion), Agni (fire/transformation), and Jala (water/cohesion)."
      },
      {
        title: "Bhaishajya & Ayushya",
        sanskritTerm: "भैषज्यम् एवं आयुष्यम्",
        description: "Dual classification of therapeutics: eliminating acute disease (Bhaishajya) versus fostering longevity and vitality (Ayushya)."
      }
    ],
    featuredArtifact: {
      name: "Birch-Bark Atharvan Foliant",
      type: "manuscript",
      description: "Reconstructed Kashmirian Sharada birch-bark manuscript excerpt demonstrating Atharvaveda botanical incantations.",
      quoteSanskrit: "या ओषधीः पूर्वा जाता देवेभ्यस्त्रियुगं पुरा। मनै नु बभ्रूणामहं शतं धामानि सप्त च॥",
      quoteTranslation: "The plants that were born thrice three ages before the gods, of those brown ones I praise the hundred and seven abodes. (Rigveda X.97.1)"
    },
    sourcesAndCitations: [
      {
        source: "Ayurveda: The Science of Life Dossier",
        institution: "CCRAS, Ministry of Ayush, Government of India",
        citation: "Section 1.1: Historical Evolution from Vedic Literature (pp. 4–9)"
      },
      {
        source: "A History of Indian Medical Literature (HIML)",
        institution: "G.J. Meulenbeld (Groningen Oriental Studies)",
        citation: "Vol. IA, Introduction: Vedic Medicine & Atharvan Healing"
      }
    ],
    challenge: {
      question: "Which Vedic hymn is historically celebrated as the earliest systematic poetic address to medicinal plants?",
      questionMl: "ഔഷധസസ്യങ്ങളെക്കുറിച്ചുള്ള ഏറ്റവും പുരാതനമായ വൈദിക സൂക്തം ഏതാണ്?",
      options: [
        "Purusha Sukta",
        "Oshadhi Sukta (Rigveda X.97)",
        "Nasadiya Sukta",
        "Shri Sukta"
      ],
      correctIndex: 1,
      explanation:
        "The Oshadhi Sukta (Rigveda Mandala X, Sukta 97) is world-renowned as the earliest recorded hymn honoring medicinal flora and their therapeutic virtues."
    }
  },
  {
    id: "classical-samhita",
    order: 2,
    periodName: "Classical Samhita Tradition",
    periodNameSanskrit: "संहिता कालः (Saṃhitā Kālaḥ)",
    periodNameMl: "സംഹിതാ കാലഘട്ടം",
    dateRange: "~600 BCE – ~400 CE",
    approxEra: "Golden Era of Systematic Medical Compendia",
    tagline: "The Codification of Internal Medicine, Surgery & Clinical Philosophy",
    taglineMl: "കായചികിത്സ, ശസ്ത്രക്രിയ, ക്ലിനിക്കൽ ദർശനം എന്നിവയുടെ സുവർണ്ണ കാലം",
    summary:
      "The codification of medical wisdom into monumental Sanskrit treatises: the Charaka Samhita of internal medicine and the Sushruta Samhita of surgery and anatomy, defining the philosophical, diagnostic, and ethical foundations of Ayurveda.",
    summaryMl:
      "ആയുർവേദത്തെ ശാസ്ത്രീയമായി ചിട്ടപ്പെടുത്തിയ ചരകസംഹിതയും സുശ്രുതസംഹിതയും രചിക്കപ്പെട്ട സുവർണ്ണ കാലഘട്ടം.",
    narrative: [
      "Between the 6th century BCE and the 4th century CE, Indian medical thought detached from exclusively ritual contexts into an empirical, observational, and philosophically rigorous science of life.",
      "The Atreya school of physicians, recorded through Agnivesha and redacted by Master Charaka (and later supplemented by Dridhabala in Kashmir), produced the monumental Charaka Samhita. It articulated the Tridosha doctrine, Srotas (micro-channels), Prakriti (individual constitution), and the ethics of the physician.",
      "Concurrently at Kashi (Varanasi), the surgical school of Divodasa Dhanvantari culminated in the Sushruta Samhita. Sushruta documented anatomical dissection of human cadavers, 121+ surgical instruments (Yantras and Shastras), reconstructive rhinoplasty, cataract couching, and trauma management.",
      "Other major contemporaneous works such as the Bhela Samhita, Kashyapa Samhita (pediatrics), and Harita Samhita expanded specialized branches across ancient university centers like Takshashila and Kashi."
    ],
    survivingSources: [
      "Charaka Samhita (Agnivesha Tantra, redacted by Charaka & Dridhabala, 8 Sthanas, 120 Chapters)",
      "Sushruta Samhita (Dhanvantari School, redacted by Sushruta, revised by Nagarjuna, 6 Sthanas, 186 Chapters)",
      "Bhela Samhita (Preserved primarily in a rare Tanjore palm-leaf manuscript)",
      "Kashyapa Samhita (Vridha Jivakiya Tantra, surviving in incomplete palm-leaf folios from Nepal)"
    ],
    coreConcepts: [
      {
        title: "Tridosha & Panchamahabhuta",
        sanskritTerm: "त्रिदोष एवं पञ्चमहाभूत सिद्धान्तः",
        description: "The structural foundation of living organisms composed of Akasha, Vayu, Tejas, Jala, and Prithvi, regulated through Vata, Pitta, and Kapha."
      },
      {
        title: "Shalya & Shalakya Tantra",
        sanskritTerm: "शल्य एवं शालाक्य तन्त्रम्",
        description: "Advanced surgical techniques, anatomical dissection, bone setting, wound debridement, and sensory organ care pioneered by Sushruta."
      },
      {
        title: "Yukti-Vyapashraya Chikitsa",
        sanskritTerm: "युक्तिव्यपाश्रय चिकित्सा",
        description: "Rational, evidence-based clinical therapeutics employing tailored diet, drug combinations (Dravya-Guna), and detoxification procedures (Panchakarma)."
      }
    ],
    featuredArtifact: {
      name: "Sushruta's Surgical Armamentarium",
      type: "instrument",
      description: "Reconstruction of Sushruta's 101 blunt instruments (Yantras) and 20 sharp surgical instruments (Shastras) modeled after animal beaks and claws.",
      quoteSanskrit: "यतो हि शस्त्रं सम्यक् प्रयुक्तं प्राणरक्षणाय भवति, असम्यक् प्रयुक्तं तु प्राणहरणाय।",
      quoteTranslation: "For an instrument properly applied preserves life; applied improperly, it takes life away. (Sushruta Samhita, Sutrasthana)"
    },
    sourcesAndCitations: [
      {
        source: "Charaka Samhita Critical Edition & English Commentary",
        institution: "P.V. Sharma / Chaukhambha Orientalia",
        citation: "Sutrasthana Chapters 1–30; Vimanasthana Section 8 (pp. 3–240)"
      },
      {
        source: "Sushruta Samhita: The Medical and Surgical Heritage",
        institution: "M.S. Valiathan / Universities Press",
        citation: "Anatomy, Surgical Instruments & Operative Procedures (Chapters 1–8)"
      }
    ],
    challenge: {
      question: "Which classical author is celebrated in world medical history for pioneering reconstructive rhinoplasty and cadaveric dissection?",
      questionMl: "പ്ലാസ്റ്റിക് സർജറിയുടെയും ശരീരശാസ്ത്ര വിച്ഛേദനത്തിന്റെയും പിതാവായി ലോകം ആദരിക്കുന്ന ആചാര്യൻ ആര്?",
      options: [
        "Charaka",
        "Sushruta",
        "Vagbhata",
        "Madhavakara"
      ],
      correctIndex: 1,
      explanation:
        "Master Sushruta of Kashi is universally recognized for establishing surgical principles, nasal reconstruction (rhinoplasty), and systematic human anatomical study."
    }
  },
  {
    id: "vagbhata-ashtanga",
    order: 3,
    periodName: "Vagbhata & Ashtanga Tradition",
    periodNameSanskrit: "वाग्भटः अष्टाङ्ग परम्परा च (Vāgbhaṭaḥ Aṣṭāṅga Paramparā)",
    periodNameMl: "വാഗ്ഭടനും അഷ്ടാംഗ പാരമ്പര്യവും",
    dateRange: "~6th Century – ~7th Century CE",
    approxEra: "Synthetic Mastery & The Eight-Fold Canon",
    tagline: "The Masterful Synthesis of Charaka and Sushruta in Lyrical Verse",
    taglineMl: "ചരകന്റെയും സുശ്രുതന്റെയും ശാസ്ത്രസാരം കാവ്യരൂപത്തിൽ സമന്വയിപ്പിച്ച യുഗം",
    summary:
      "Vagbhata unified the vast medical libraries of Charaka and Sushruta into lucid, memorable Sanskrit poetry: the Ashtanga Sangraha and Ashtanga Hridaya, which became the living textbook of Kerala physicians.",
    summaryMl:
      "അഷ്ടാംഗഹൃദയവും അഷ്ടാംഗസംഗ്രഹവും രചിച്ച് ആയുർവേദത്തെ എട്ട് ശാഖകളായി ക്രമീകരിച്ച ആചാര്യ വാഗ്ഭടന്റെ കാലഘട്ടം.",
    narrative: [
      "By the early medieval era, the encyclopedic prose of Charaka and the intricate surgical treatises of Sushruta were difficult for students to memorize in gurukula settings.",
      "A towering polymath named Vagbhata (historically acknowledged through Vagbhata the Elder and Vagbhata the Younger) accomplished a monumental synthesis. He extracted the essence of both traditions, reconciling their divergences into harmonious verse.",
      "His two magnum opuses — the Ashtanga Sangraha (prose and verse) and the Ashtanga Hridaya (wholly composed in melodious Anushtubh meter, containing 7,120 verses across 120 chapters) — achieved unprecedented popularity across the Indian subcontinent.",
      "The Ashtanga Hridaya organized medicine decisively into the Eight Branches (Ashtanga Ayurveda), striking an ideal balance between theoretical clarity and practical bedside efficacy. It became the undisputed master textbook for physicians in southern India, particularly in Kerala."
    ],
    survivingSources: [
      "Ashtanga Hridaya (6 Sthanas, 120 Chapters, 7,120 verses)",
      "Ashtanga Sangraha (Comprehensive encyclopedic precursor in prose and verse)",
      "Sarvangasundara Commentary by Arunadatta (~1200 CE)",
      "Ayurvedarasayana Commentary by Hemadri (~1300 CE)",
      "Hridyabodhika (Anonymous ancient Kerala commentary in Malayalam Grantha script)"
    ],
    coreConcepts: [
      {
        title: "Ashtanga Ayurveda (Eight Branches)",
        sanskritTerm: "अष्टाङ्ग आयुर्वेदः",
        description: "The definitive eight-fold division: Kaya (Medicine), Bala (Pediatrics), Graha (Psychiatry), Urdhvanga (ENT/Opthalmology), Shalya (Surgery), Damstra (Toxicology), Jara (Geriatrics/Rejuvenation), and Vrsha (Aphrodisiac/Fertility)."
      },
      {
        title: "Dinacharya & Ritucharya",
        sanskritTerm: "दिनचर्या एवं ऋतुचर्या",
        description: "Lyrical, practical codification of daily routines, seasonal regimens, sleep cycles, and ethical mental conduct (Sadvritta) for disease prevention."
      },
      {
        title: "Doshapratyanika vs Vyadhipratyanika",
        sanskritTerm: "दोष-व्याधि प्रत्यनीक चिकित्सा",
        description: "Precision treatment logic opposing the aggravated dosha, the disease pathology, or both concurrently."
      }
    ],
    featuredArtifact: {
      name: "The Ashtanga Eight-Spoke Knowledge Mandala",
      type: "wheel",
      description: "Interactive Eight-Branch wheel representing the complete holistic scope of Ashtanga Ayurveda.",
      quoteSanskrit: "कायबालग्रहोर्ध्वाङ्गशल्यदंष्ट्राजरावृषान्। अष्टावङ्गानि तस्याहुश्चिकित्सा येषु संश्रिता॥",
      quoteTranslation: "Internal medicine, pediatrics, psychiatry, diseases of the head/ENT, surgery, toxicology, rejuvenation, and virility — these are its eight branches in which therapy is grounded. (Ashtanga Hridaya, Sutrasthana 1.5)"
    },
    sourcesAndCitations: [
      {
        source: "The Legacy of Vagbhata",
        institution: "M.S. Valiathan / Universities Press",
        citation: "Chapters 1–5: Introduction, Authorship & Textual Synthesis"
      },
      {
        source: "NCBS Ashtavaidya Archives",
        institution: "National Centre for Biological Sciences, Bangalore",
        citation: "The Centrality of Ashtanga Hridaya in the Kerala Medical Curriculum"
      }
    ],
    challenge: {
      question: "How many verses and chapters compose Master Vagbhata's classic poetic compendium, the Ashtanga Hridaya?",
      questionMl: "അഷ്ടാംഗഹൃദയത്തിൽ ആകെ എത്ര അധ്യായങ്ങളും ശ്ലോകങ്ങളുമുണ്ട്?",
      options: [
        "100 Chapters, 5,000 Verses",
        "120 Chapters, 7,120 Verses across 6 Sthanas",
        "150 Chapters, 10,000 Verses",
        "80 Chapters, 3,500 Verses"
      ],
      correctIndex: 1,
      explanation:
        "The Ashtanga Hridaya is meticulously organized into 6 Sthanas containing exactly 120 chapters and 7,120 lyrical Sanskrit verses."
    }
  },
  {
    id: "classical-expansion",
    order: 4,
    periodName: "Expansion of Classical Literature",
    periodNameSanskrit: "शास्त्रविस्तार कालः (Śāstravistāra Kālaḥ)",
    periodNameMl: "ശാസ്ത്ര വികാസ കാലഘട്ടം",
    dateRange: "~8th Century – ~16th Century CE",
    approxEra: "Pathology, Pharmacy & Botanical Materia Medica",
    tagline: "The Specialization of Diagnosis, Alchemy, and Materia Medica",
    taglineMl: "രോഗനിർണ്ണയം, രസശാസ്ത്രം, ഔഷധ നിർമ്മാണം എന്നിവ വികസിച്ച കാലം",
    summary:
      "A profound era of specialized literature: Madhavakara refined pathology, Sharngadhara advanced pharmaceutical chemistry and pulse examination, and Bhavamishra broadened global botanical materia medica.",
    summaryMl:
      "മാധവനിദാനം, ശാർങ്ഗധരസംഹിത, ഭാവപ്രകാശം തുടങ്ങിയ പ്രമുഖ ഗ്രന്ഥങ്ങളിലൂടെ ആയുർവേദം കൂടുതൽ ശാഖകളിലേക്ക് വളർന്ന ഘട്ടം.",
    narrative: [
      "Following the classical Samhita epoch, scholars recognized the need for targeted clinical handbooks tailored to diagnostic specificity and complex pharmaceutical processing.",
      "In the 8th century, Master Madhavakara authored the Rogavinishchaya (popularly revered as Madhava Nidana). Concentrating solely on etiology (Nidana), prodromal signs (Purvarupa), symptoms (Rupa), and pathogenesis (Samprapti), it coined the medical adage: 'In pathology, Madhava stands supreme.'",
      "During the 14th century, Sharngadhara composed the Sharngadhara Samhita, introducing rigorous standards for pharmaceutical chemistry (Bhaishajya Kalpana). He formally articulated pulse diagnosis (Nadi Pariksha), anatomical respiration, and purification of minerals and mercury (Rasa-shastra).",
      "In the 16th century, Bhavamishra published the comprehensive Bhava Prakasha and its seminal Nighantu (lexicon). He introduced new botanicals brought by transcontinental maritime commerce and documented the newly arrived disease Syphilis (termed 'Phiranga Roga'), prescribing Chopachini (Smilax china) for its alleviation."
    ],
    survivingSources: [
      "Madhava Nidana (Rogavinishchaya by Madhavakara, 8th century, 69 chapters)",
      "Sharngadhara Samhita (by Sharngadhara, 14th century, 3 Khandas, 32 chapters)",
      "Bhava Prakasha & Bhava Prakasha Nighantu (by Bhavamishra, 16th century)",
      "Chakradatta (by Chakrapanidatta, 11th century clinical compendium)",
      "Dhanvantari Nighantu & Rajanighantu (Botanical encyclopedias)"
    ],
    coreConcepts: [
      {
        title: "Nidana Panchaka",
        sanskritTerm: "निदान पञ्चकम्",
        description: "The 5-fold scientific diagnostic methodology refined by Madhavakara: Cause (Nidana), Pre-signs (Purvarupa), Symptoms (Linga), Exploratory therapy (Upashaya), and Pathogenesis (Samprapti)."
      },
      {
        title: "Nadi Pariksha & Bhaishajya Kalpana",
        sanskritTerm: "नाडी परीक्षा एवं भैषज्य कल्पना",
        description: "Radial arterial pulse palpation and standardized preparation of decoctions (Kashaya), fermented elixirs (Asava/Arishta), and calcined bio-minerals (Bhasma)."
      },
      {
        title: "Materia Medica & Botanical Additions",
        sanskritTerm: "द्रव्यगुण एवं निघण्टु विस्तारः",
        description: "Systematic botanical documentation incorporating regional herbs, maritime trade spices, and newly documented pathological conditions."
      }
    ],
    featuredArtifact: {
      name: "Sharngadhara's Nadi Palpation Manuscript",
      type: "manuscript",
      description: "Foliant depicting the three-finger radial pulse examination matching Vata, Pitta, and Kapha arterial waveforms.",
      quoteSanskrit: "अङ्गुष्ठमूलस्य मरुद्गतो यो जीवस्य साक्षिणी सा हि नाडी।",
      quoteTranslation: "The pulse positioned at the root of the thumb bears witness to the life force within the living organism. (Sharngadhara Samhita, Purva Khanda 3.1)"
    },
    sourcesAndCitations: [
      {
        source: "History of Indian Pharmacy & Bhaishajya Kalpana",
        institution: "CCRAS / Ravindra Angadi",
        citation: "Evolution of Pharmaceutical Dosage Forms from Sharngadhara to Modern Era"
      },
      {
        source: "Madhava Nidanam Critical Translation",
        institution: "K.R. Srikantha Murthy / Chaukhambha",
        citation: "Introduction & Historical Position of Rogavinishchaya"
      }
    ],
    challenge: {
      question: "Which 8th-century master authored the specialized pathology handbook celebrated by the proverb 'In pathology, he stands supreme'?",
      questionMl: "നിദാനശാസ്ത്രത്തിൽ അദ്വിതീയനായ 8-ാം നൂറ്റാണ്ടിലെ ആയുർവേദ ആചാര്യൻ ആര്?",
      options: [
        "Chakrapanidatta",
        "Madhavakara (Madhava Nidana)",
        "Bhavamishra",
        "Dalhana"
      ],
      correctIndex: 1,
      explanation:
        "Madhavakara authored the Rogavinishchaya (Madhava Nidana), renowned in traditional scholarship: 'Nidane Madhavah Shreshthah' (Madhava is supreme in diagnostics)."
    }
  },
  {
    id: "regional-traditions",
    order: 5,
    periodName: "Regional Knowledge Traditions",
    periodNameSanskrit: "प्रादेशिक ज्ञान परम्पराः (Prādeśika Jñāna Paramparāḥ)",
    periodNameMl: "പ്രാദേശിക ചികിത്സാ ധാരകൾ",
    dateRange: "~10th Century – ~18th Century CE",
    approxEra: "Diversification, Ecosystem Adaptation & Vernacular Literature",
    tagline: "The Convergence of Classical Sanskrit Scholarship with Regional Biodiversity",
    taglineMl: "സംസ്കൃത ജ്ഞാനവും ഭാരതീയ പ്രാദേശിക സസ്യ സമ്പത്തും സംയോജിച്ച ഘട്ടം",
    summary:
      "Ayurveda branched into rich, geographically adapted lineages across India — from Kashmirian commentaries and Bengal's alchemical laboratories to the profound living Ashtavaidya tradition of Kerala.",
    summaryMl:
      "ഭാരതത്തിന്റെ വിവിധ പ്രദേശങ്ങളിലെ കാലാവസ്ഥയ്ക്കും സസ്യസമ്പത്തിനും അനുസൃതമായി ആയുർവേദം പ്രാദേശികമായി വികസിച്ച കാലം.",
    narrative: [
      "Rather than a monolithic dogma, Ayurveda thrived as a dynamic, regionally grounded knowledge system adapting to local ecologies, climate realities, and floristic abundance.",
      "In Kashmir, commentators like Dridhabala, Bhattotpala, and later Shivadasa Sen preserved the northern transmission. In Eastern India, scholarly courts across Bengal and Odisha developed Rasa-shastra, producing legendary commentators like Chakrapanidatta (who illuminated Charaka and Sushruta).",
      "In Western India, scholarly monastic repositories at Valabhi and Gujarat preserved rare Samhita recensions and standardized trading routes for aromatic resins and arid-zone botanicals (like Guggulu and Kumari).",
      "Most magnificently, South India — and specifically the lush, monsoon-fed Western Ghats of Kerala — birthed an unparalleled living tradition. Here, physician-philosophers integrated Ashtanga Hridaya into daily clinical practice, resulting in the unique Ashtavaidya heritage and seminal vernacular treatises like Sahasrayogam."
    ],
    survivingSources: [
      "Sahasrayogam (Kerala's celebrated compendium of 1,000+ classical formulations)",
      "Chikitsamanjari by Sreeneelakantha Kavi (Kerala practical bedside treatise)",
      "Alattur Manipravalam (Early Malayalam-Sanskrit medical treatise)",
      "Bhaishajya Ratnavali by Govinda Das (Bengal alchemical compendium)"
    ],
    coreConcepts: [
      {
        title: "Desha-Kala Satmya (Ecosystem Adaptation)",
        sanskritTerm: "देश-काल सात्म्यम्",
        description: "The classical doctrine asserting that medical therapy and botanical selection must directly reflect the patient's native terrain (Desha) and seasonal climate (Kala)."
      },
      {
        title: "Abhava Dravya (Rational Substitution)",
        sanskritTerm: "अभाव द्रव्य विमर्शः",
        description: "The documented scholarly mechanism allowing physicians to substitute locally available therapeutic plants of identical pharmacological potency (Rasa-Guna-Virya-Vipaka)."
      },
      {
        title: "Vernacularization of Sanskrit Lore",
        sanskritTerm: "देशभाषा रूपान्तरणम्",
        description: "Translation and condensation of dense Sanskrit verses into Manipravalam and regional vernacular verse for practical apprenticeship."
      }
    ],
    featuredArtifact: {
      name: "Kerala Palm-Leaf Grantha Medical Bundle",
      type: "manuscript",
      description: "Historic palm-leaf (Taliyola) manuscript etched with iron stylus (Ezhuthani), preserving hereditary formulations from the Nila River basin.",
      quoteSanskrit: "यस्मिन् देशे हि यो जातः तस्य तद् भेषजं हितम्।",
      quoteTranslation: "For a person born in a specific ecosystem, the remedies indigenous to that same land are exceptionally beneficial. (Classical Medical Canon)"
    },
    sourcesAndCitations: [
      {
        source: "The Ashtavaidya Physicians of Kerala: A Tradition in Transition",
        institution: "Journal of Ayurveda & Integrative Medicine / NCBS",
        citation: "Section: Regional Ecologies & Textual Evolution in Malabar"
      },
      {
        source: "SAMHiTA Manuscript Archive",
        institution: "India International Centre / Ministry of Culture",
        citation: "Survey of Grantha and Malayalam Medical Manuscripts"
      }
    ],
    challenge: {
      question: "What is the famous Kerala practical Ayurvedic compendium compiling over one thousand verified clinical formulations?",
      questionMl: "ആയിരത്തിലധികം പ്രായോഗിക ആയുർവേദ യോഗങ്ങൾ ഉൾക്കൊള്ളുന്ന കേരളീയ ഗ്രന്ഥമേത്?",
      options: [
        "Sushruta Samhita",
        "Sahasrayogam",
        "Kashyapa Samhita",
        "Harita Samhita"
      ],
      correctIndex: 1,
      explanation:
        "Sahasrayogam (literally 'The Thousand Formulations') is the celebrated anonymous Kerala clinical compendium indispensable to southern physicians."
    }
  },
  {
    id: "modern-ayurveda",
    order: 6,
    periodName: "Modern Ayurveda & Research",
    periodNameSanskrit: "आधुनिक आयुर्वेदः अनुसन्धानं च (Ādhunika Āyurvedaḥ)",
    periodNameMl: "ആധുനിക ആയുർവേദവും ഗവേഷണവും",
    dateRange: "19th Century – Contemporary Era",
    approxEra: "Scientific Validation, Pharmacopoeias & Bio-AI Integration",
    tagline: "The Renaissance of Evidence-Based Botanical Discovery & Digital Heritage",
    taglineMl: "ശാസ്ത്രീയ പരീക്ഷണങ്ങളും ആധുനിക ബയോ-എഐ സാങ്കേതികവിദ്യയും സംയോജിക്കുന്ന നവയുഗം",
    summary:
      "From the first printed Sanskrit editions in 1832 to the establishment of CCRAS, the Ayurvedic Pharmacopoeia of India, and modern AI molecular docking, Ayurveda now bridges centuries of empirical heritage with genomic biology.",
    summaryMl:
      "പ്രിന്റഡ് ഗ്രന്ഥങ്ങൾ, ഗവേഷണ സ്ഥാപനങ്ങൾ, ആധുനിക ലാബുകൾ, ബയോ-എഐ ഡിജിറ്റൽ സാങ്കേതികവിദ്യ എന്നിവയിലൂടെ ആയുർവേദം ആഗോള ശാസ്ത്രമായി മാറിയ യുഗം.",
    narrative: [
      "The 19th century witnessed a critical inflection: the transition from fragile palm-leaf folios to scholarly printed editions. In 1832, the first printed Sanskrit edition of Charaka Samhita was published in Calcutta, igniting an academic renaissance.",
      "Visionary scholar-physicians like Vaidyaratnam P.S. Varier (founder of Kottakkal Arya Vaidya Sala in 1902) standardized manufacturing, established charitable hospitals, and authored comparative anatomical works like Brihatchariram.",
      "Post-independence India formalized academic oversight with the Central Council for Research in Ayurvedic Sciences (CCRAS) in 1969/1978, codifying the multi-volume Ayurvedic Pharmacopoeia of India (API) and Ayurvedic Formulary of India (AFI).",
      "Today at centers like Kerala Startup Mission Digital Hub Kochi, this ancient knowledge enters its boldest frontier: Bio-AI. Contemporary computational biology validates classical Rasayana herbs through molecular docking, multi-spectral adulteration detection, and genomic profiling, honoring the timeless truth: 'Knowledge survives when it is studied, documented and passed on.'"
    ],
    survivingSources: [
      "The Ayurvedic Pharmacopoeia of India (API, Parts I & II, multi-volume statutory standard)",
      "CCRAS Research Journals & Monograph Series",
      "SAMHiTA Digital Textual Archive (e-Grantha corpus)",
      "Traditional Knowledge Digital Library (TKDL, CSIR-Ayush joint repository)",
      "Bio-AI Centre of Excellence Pharmacoinformatic Data Models"
    ],
    coreConcepts: [
      {
        title: "Standardization & Quality Assurance",
        sanskritTerm: "भेषज मानकीकरणम्",
        description: "High-Performance Thin-Layer Chromatography (HPTLC), marker compound quantification, and microbial safety benchmarks codified in the API."
      },
      {
        title: "Reverse Pharmacology",
        sanskritTerm: "प्रत्यक् भेषज विज्ञानम्",
        description: "Modern clinical translation pipeline: beginning with documented historical human efficacy, moving backward to mechanistic in-vitro and molecular validation."
      },
      {
        title: "Bio-AI Pharmacoinformatics",
        sanskritTerm: "जैव-संगणक आयुर्विज्ञानम्",
        description: "Employing machine learning, computational molecular docking, and genomic profiling to explore synergy in multi-herb classical formulations."
      }
    ],
    featuredArtifact: {
      name: "Bio-AI Spectral & Genomic Model",
      type: "instrument",
      description: "Digital visualization combining high-throughput near-infrared spectral fingerprinting with classical Ayurvedic herbal profiles.",
      quoteSanskrit: "ज्ञानं यदा प्रवर्धेत तदा लोकस्य संस्थितिः।",
      quoteTranslation: "When knowledge is continuously nurtured and expanded, the well-being of the world is secured. (Contemporary Scientific Dedication)"
    },
    sourcesAndCitations: [
      {
        source: "CCRAS Literary Research & Evidence Dossier",
        institution: "Ministry of Ayush, Government of India",
        citation: "National Standards, Digitization Initiatives & Research Infrastructure"
      },
      {
        source: "Reverse Pharmacology & Botanical Drug Discovery",
        institution: "Dr. Ashok Vaidya / ICMR-Ayush Joint Research Protocols",
        citation: "From Ancient Wisdom to Molecular Target Validation"
      }
    ],
    challenge: {
      question: "Which statutory apex council under the Ministry of Ayush leads classical Ayurvedic literary research, clinical trials, and drug standardization across India?",
      questionMl: "ഭാരതത്തിൽ ആയുർവേദ ഗവേഷണങ്ങൾക്കും ഔഷധ നിലവാര നിർണ്ണയത്തിനും നേതൃത്വം നൽകുന്ന കേന്ദ്ര കൗൺസിൽ ഏതാണ്?",
      options: [
        "ICMR (Indian Council of Medical Research)",
        "CCRAS (Central Council for Research in Ayurvedic Sciences)",
        "CSIR (Council of Scientific & Industrial Research)",
        "UGC (University Grants Commission)"
      ],
      correctIndex: 1,
      explanation:
        "CCRAS (Central Council for Research in Ayurvedic Sciences) is the apex autonomous research body under the Ministry of Ayush, Government of India."
    }
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// 2. THE EIGHT BRANCHES (ASHTANGA AYURVEDA)
// ═══════════════════════════════════════════════════════════════════════════

export const EIGHT_BRANCHES_DATA: EightBranchInfo[] = [
  {
    branchNumber: 1,
    name: "Kaya Chikitsa",
    sanskritName: "कायचिकित्सा",
    sanskritScript: "कायचिकित्सा",
    englishTitle: "Internal Medicine & Systemic Therapeutics",
    classicalScope:
      "Treatment of diseases affecting the entire physical organism (Kaya), particularly metabolic, digestive (Agni), chronic febrile, and humoral imbalances through rational pharmacotherapy and lifestyle.",
    classicalAuthority: "Master Charaka (Charaka Samhita)",
    keyConditions: [
      "Jvara (Metabolic fevers)",
      "Prameha (Metabolic syndrome & diabetes)",
      "Grahani (Digestive & malabsorption disorders)",
      "Kasa & Shwasa (Respiratory pathology)",
      "Vatarakta (Rheumatologic conditions)"
    ],
    foundationalSutra: {
      sanskrit: "कायोऽग्निस्तन्निमित्ता ये रोगास्ते कायजा मताः। तेषां प्रशमनं यत्र सा कायचिकित्सिता॥",
      transliteration: "Kāyo'gnis-tannimittā ye rogās-te kāyajā matāḥ | Teṣāṃ praśamanaṃ yatra sā kāyacikitsitā ||",
      translation: "Kaya represents the internal metabolic fire (Agni); diseases arising from its impairment are metabolic disorders. The branch dedicated to their cure is Kaya Chikitsa.",
      source: "Dalhana Commentary on Sushruta Samhita"
    },
    modernBioAiConnection:
      "Bio-AI models analyze microbiome health, gut-brain axis interactions, and systemic inflammation biomarkers correlating to Agni and Ama status."
  },
  {
    branchNumber: 2,
    name: "Bala Chikitsa (Kaumarabhritya)",
    sanskritName: "कौमारभृत्यम् (बालचिकित्सा)",
    sanskritScript: "कौमारभृत्यम्",
    englishTitle: "Pediatrics, Obstetrics & Neonatal Care",
    classicalScope:
      "Comprehensive care of the infant, child, and mother: neonatal resuscitation, lactation management, developmental milestones, pediatric formulations, and obstetric guidance.",
    classicalAuthority: "Master Kashyapa (Kashyapa Samhita)",
    keyConditions: [
      "Stanyadosha (Breastmilk vitiations & purification)",
      "Kukunaka (Neonatal ophthalmia)",
      "Phakka Roga (Nutritional rickets & deficiency)",
      "Balagraha (Infantile acute neuropsychiatric states)",
      "Suvarnaprashana (Pediatric immunomodulation)"
    ],
    foundationalSutra: {
      sanskrit: "कुमारभरणे धात्रीक्षीरदोषविशोधने। ये च दोषाः समुत्पन्नास्तेषां शमनमुच्यते॥",
      transliteration: "Kumāra-bharaṇe dhātrī-kṣīra-doṣa-viśodhane | Ye ca doṣāḥ samutpannās-teṣāṃ śamanam-ucyate ||",
      translation: "The science concerning the nourishment of the child, the purification of nurse's milk, and the eradication of infantile diseases.",
      source: "Sushruta Samhita, Sutrasthana 1.7"
    },
    modernBioAiConnection:
      "Neonatal monitoring, developmental AI milestone screening, and pediatric botanical safety dosage calculations."
  },
  {
    branchNumber: 3,
    name: "Graha Chikitsa (Bhuta Vidya)",
    sanskritName: "ग्रहचिकित्सा (भूतविद्या)",
    sanskritScript: "ग्रहचिकित्सा",
    englishTitle: "Psychiatry, Neuropsychology & Psychosomatics",
    classicalScope:
      "Management of cognitive, emotional, idiopathic, and behavioral syndromes attributed to psychic shock, subtle environmental pathogens, or neurological imbalances through psychotropics (Medhya Rasayana), counseling (Ashwasana), and Daivavyapashraya.",
    classicalAuthority: "Charaka & Sushruta (Nidanasthana & Uttaratantra)",
    keyConditions: [
      "Unmada (Psychosis & schizophrenia spectrum)",
      "Apasmara (Epilepsy & seizure disorders)",
      "Atatvabhinivesha (Obsessive delusion & cognitive distortion)",
      "Mada & Murcha (Altered states of consciousness)",
      "Smriti Bhramsha (Memory deficits)"
    ],
    foundationalSutra: {
      sanskrit: "भूतविद्या नाम देवादिग्रहोपसृष्टचेतसां शान्तिकर्मबलिहरणादिप्रशमनार्थम्।",
      transliteration: "Bhūtavidyā nāma devādi-grahopasṛṣṭa-cetasāṃ śāntikarma-bali-haraṇādi-praśamanārtham |",
      translation: "The branch dealing with mind afflictions from subtle disruptive influences, pacified through psychological calming, environmental purification, and rational remedies.",
      source: "Sushruta Samhita, Sutrasthana 1.8"
    },
    modernBioAiConnection:
      "Neurocomputational stress assessment, cognitive vocal biomarkers, and EEG mapping of Medhya botanicals like Brahmi and Shankhapushpi."
  },
  {
    branchNumber: 4,
    name: "Urdhvanga Chikitsa (Shalakya Tantra)",
    sanskritName: "ऊर्ध्वाङ्गचिकित्सा (शालाक्यतन्त्रम्)",
    sanskritScript: "शालाक्यतन्त्रम्",
    englishTitle: "Ophthalmology & ENT (Diseases Above the Clavicle)",
    classicalScope:
      "Precision diagnosis and management of 72+ eye diseases, 28 ear disorders, 31 nasal diseases, and 67 oral/dental diseases using micro-instruments (Shalakas) and topical procedures (Netra Tarpana, Nasya, Kavala).",
    classicalAuthority: "King Nimi of Videha / Sushruta (Uttaratantra)",
    keyConditions: [
      "Linga-nasha (Cataract & lens opacification)",
      "Timira (Refractive errors & retinopathy)",
      "Karna Nada (Tinnitus & auditory dysfunction)",
      "Dushta Pratishyaya (Chronic sinusitis)",
      "Mukha Roga (Oral mucosal and gingival disorders)"
    ],
    foundationalSutra: {
      sanskrit: "शालाक्यं नामोर्ध्वजत्रुगतानां श्रवणनयनवदनघ्राणादिसंश्रितानां व्याधीनां शमनार्थम्।",
      transliteration: "Śālākyaṃ nāmo'rdhva-jatrugatānāṃ śravaṇa-nayana-vadana-ghrāṇādi-saṃśritānāṃ vyādhīnāṃ śamanārtham |",
      translation: "Shalakya is the branch for the relief of disorders situated above the clavicles, affecting ears, eyes, mouth, and nose.",
      source: "Sushruta Samhita, Sutrasthana 1.9"
    },
    modernBioAiConnection:
      "Computer-vision retinal imaging, digital ear canal otoscopy, and micro-flow simulation of nasal drug delivery (Nasya) across the blood-brain barrier."
  },
  {
    branchNumber: 5,
    name: "Shalya Tantra",
    sanskritName: "शल्यतन्त्रम्",
    sanskritScript: "शल्यतन्त्रम्",
    englishTitle: "Surgery, Orthopedics & Trauma Management",
    classicalScope:
      "The paramount surgical discipline: extraction of foreign bodies (Shalya), trauma repair, fracture management (Bhagna), surgical excisions, fistula-in-ano cure using medicated seton (Ksharasutra), and reconstructive tissue grafting.",
    classicalAuthority: "Master Sushruta (Sushruta Samhita)",
    keyConditions: [
      "Arshas & Bhagandara (Hemorrhoids & complex anal fistulae)",
      "Ashmari (Urolithiasis / bladder and kidney calculi)",
      "Bhagna (Bone fractures and joint dislocations)",
      "Vrana (Chronic non-healing and surgical wounds)",
      "Vidradhi (Deep tissue abscesses)"
    ],
    foundationalSutra: {
      sanskrit: "शल्यं नाम विविधतृणकाष्ठपाषाणपांशुलोहास्थिबालनखपूयास्रावदुष्टव्रणान्तर्गर्भशल्योद्धरणार्थम्।",
      transliteration: "Śalyaṃ nāma vividha-tṛṇa-kāṣṭha-pāṣāṇa-pāṃśu-lohāsthi-bāla-nakha-pūyāsrāva-duṣṭavraṇāntargarbha-śalyoddharaṇārtham |",
      translation: "Shalya encompasses the extraction of grass, wood, stone, iron, bone fragments, hair, nails, and foreign bodies, as well as the repair of corrupted wounds.",
      source: "Sushruta Samhita, Sutrasthana 1.6"
    },
    modernBioAiConnection:
      "Surgical robotics trajectory modeling, image-guided wound depth analysis, and standardized biochemical validation of Ksharasutra collagen remodeling."
  },
  {
    branchNumber: 6,
    name: "Damstra Chikitsa (Agada Tantra)",
    sanskritName: "दंष्ट्राचिकित्सा (अगदतन्त्रम् / विषविद्या)",
    sanskritScript: "अगदतन्त्रम्",
    englishTitle: "Toxicology, Envenomation & Environmental Poisons",
    classicalScope:
      "Management of animal envenomation (snakebites, spider bites, scorpion stings), vegetable poisons, mineral toxins, food adulteration (Gara Visha), and cumulative chemical toxins (Dushi Visha).",
    classicalAuthority: "Kashyapa / Sushruta (Kalpasthana) / Kerala Visha Vaidyas",
    keyConditions: [
      "Sarpa Damsha (Viperine, elapid, and colubrid snakebite)",
      "Vrischika & Kita Damsha (Scorpion stings and venomous insects)",
      "Dushi Visha (Latent, cumulative bio-toxins)",
      "Gara Visha (Artificially concocted poisons and food toxins)",
      "Jangama & Sthavara Visha (Animate and inanimate toxic substances)"
    ],
    foundationalSutra: {
      sanskrit: "दंष्ट्राचिकित्सा नाम सर्पकीटलूतामूषिकादिदष्टविषसंशमनार्थम्।",
      transliteration: "Daṃṣṭrācikitsā nāma sarpa-kīṭa-lūtā-mūṣikādi-daṣṭa-viṣa-saṃśamanārtham |",
      translation: "Damstra Chikitsa is the science designated for pacifying poisons introduced by bites of snakes, insects, spiders, and rodents.",
      source: "Sushruta Samhita, Sutrasthana 1.10"
    },
    modernBioAiConnection:
      "AI venom proteomic identification, high-throughput antivenom peptide screening, and environmental toxin biosensors."
  },
  {
    branchNumber: 7,
    name: "Jara Chikitsa (Rasayana)",
    sanskritName: "जराचिकित्सा (रसायनतन्त्रम्)",
    sanskritScript: "रसायनतन्त्रम्",
    englishTitle: "Geriatrics, Cellular Rejuvenation & Longevity",
    classicalScope:
      "Therapeutics aimed at slowing cellular degeneration, extending cognitive acuity, boosting immunomodulation (Ojas), and revitalizing tissue nutrition (Dhatus) through nutritional protocols, mental rejuvenation (Achara Rasayana), and special phytomedicines.",
    classicalAuthority: "Charaka Samhita (Chikitsasthana, Adhyaya 1)",
    keyConditions: [
      "Jara (Premature cellular and biological aging)",
      "Dhatu Kshaya (Tissue depletion and frailty)",
      "Ojakshaya (Compromised immunity & vitality)",
      "Smriti & Medha Kshaya (Cognitive decline and dementia)",
      "Karshya (Cachexia and involuntary weight loss)"
    ],
    foundationalSutra: {
      sanskrit: "लाभोपायो हि शस्तानां रसादीनां रसायनम्। दीर्घमायुः स्मृतिं मेधामारोग्यं तरुणं वयः॥",
      transliteration: "Lābhopāyo hi śastānāṃ rasādīnāṃ rasāyanam | Dīrgham-āyuḥ smṛtiṃ medhām-ārogyaṃ taruṇaṃ vayaḥ ||",
      translation: "Rasayana denotes the optimal means of obtaining superlative nutritional fluids and bodily tissues; it confers longevity, memory, intellect, health, and youthful vitality.",
      source: "Charaka Samhita, Chikitsasthana 1.1.7–8"
    },
    modernBioAiConnection:
      "Telomere biology, cellular autophagy quantification, and AI network pharmacology of adaptogenic Rasayanas (Ashwagandha, Amalaki, Guduchi)."
  },
  {
    branchNumber: 8,
    name: "Vrsha Chikitsa (Vajikarana)",
    sanskritName: "वृषचिकित्सा (वाजीकरणतन्त्रम्)",
    sanskritScript: "वाजीकरणतन्त्रम्",
    englishTitle: "Reproductive Biology, Fertility & Eugenics",
    classicalScope:
      "Enhancement of reproductive cellular tissue (Shukra/Artava), management of male and female infertility, promoting healthy conception (Suprajanana), and rejuvenating sexual vitality.",
    classicalAuthority: "Charaka Samhita (Chikitsasthana, Adhyaya 2)",
    keyConditions: [
      "Klaibya (Erectile dysfunction and sexual asthenia)",
      "Shukradosha (Oligospermia and abnormal semen parameters)",
      "Vandhyatva (Infertility of male and female etiologies)",
      "Artavadosha (Ovarian and uterine menstrual pathology)",
      "Garbhini Paricharya (Prenatal maternal and fetal nurture)"
    ],
    foundationalSutra: {
      sanskrit: "वाजीकरणतन्त्रं नामोल्पदुष्टक्षीणाविशुद्धरेतसामाप्यायनप्रसादोपचयजनननिमित्तम्।",
      transliteration: "Vājīkaraṇatantraṃ nāmā'lpa-duṣṭa-kṣīṇāviśuddha-retasām-āpyāyana-prasādopacaya-janana-nimittam |",
      translation: "Vajikarana is the branch devoted to augmenting, purifying, and vitalizing seminal and reproductive fluids in cases of deficiency or vitiation.",
      source: "Sushruta Samhita, Sutrasthana 1.12"
    },
    modernBioAiConnection:
      "Sperm motility computer analysis, hormone receptor docking, and botanical safety profiles for reproductive health (Kapikacchu, Shatavari, Safed Musli)."
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// 3. CLASSICAL TEXTS IN THE ANCIENT KNOWLEDGE LIBRARY
// ═══════════════════════════════════════════════════════════════════════════

export const CLASSICAL_BOOKS_DATA: ClassicalBook[] = [
  {
    id: "charaka-samhita",
    licenseType: "Public Domain",
    editionInfo: "Yadavji Trikamji Acharya Critical Edition (Nirnaya Sagar, 1941) and CCRAS Digital Library",
    sourceInstitution: "CCRAS / SAMHiTA Sanskrit Manuscript Initiative",
    originalSourceLink: "https://samhitadev.iicdelhi.in/",
    readOnlineAvailable: true,
    downloadAvailable: true,
    title: "Charaka Samhita",
    titleSanskrit: "चरकसंहिता",
    titleMl: "ചരകസംഹിത",
    traditionalAuthor: "Sage Agnivesha (composed Agnivesha Tantra)",
    redactorCommentator: "Master Charaka (redacted), supplemented by Dridhabala (~4th c. CE)",
    historicalPeriod: "Classical Antiquity",
    dateRangeApprox: "~2nd Century BCE – ~2nd Century CE (Core redaction)",
    dateUncertaintyNote:
      "Scholarship places the Agnivesha precursor in ~6th c. BCE, Charaka's foundational redaction around 100 BCE – 100 CE, and Dridhabala's addition of the final 41 chapters in ~400 CE.",
    branch: "Kayachikitsa",
    totalChapters: 120,
    totalVersesApprox: "9,295 prose aphorisms & metric verses",
    sthanaStructure: [
      {
        name: "Sutrasthana",
        nameSanskrit: "सूत्रस्थानम्",
        chapters: 30,
        description: "Foundational philosophy, principles of pharmacology, dietetics, seasons, and physician ethics."
      },
      {
        name: "Nidanasthana",
        nameSanskrit: "निदानस्थानम्",
        chapters: 8,
        description: "Detailed etiology and diagnosis of eight major diseases (Jvara, Raktapitta, Gulma, Prameha, Kushta, Shosha, Unmada, Apasmara)."
      },
      {
        name: "Vimanasthana",
        nameSanskrit: "विमानस्थानम्",
        chapters: 8,
        description: "Measurement of doshas, pharmacology, research debate methodology (Sambhhasha Parishad), and epidemics (Janapadoddhvamsa)."
      },
      {
        name: "Sharirasthana",
        nameSanskrit: "शारीरस्थानम्",
        chapters: 8,
        description: "Human embryology, anatomy, mind-body metaphysics, and psycho-somatic typology (Prakriti)."
      },
      {
        name: "Indriyasthana",
        nameSanskrit: "इन्द्रियस्थानम्",
        chapters: 12,
        description: "Prognostic clinical signs, sensory changes indicating approaching demise (Arishta Lakshana)."
      },
      {
        name: "Chikitsasthana",
        nameSanskrit: "चिकित्सास्थानम्",
        chapters: 30,
        description: "Comprehensive therapeutics for all systemic disorders, Rasayana, and Vajikarana."
      },
      {
        name: "Kalpasthana",
        nameSanskrit: "कल्पस्थानम्",
        chapters: 12,
        description: "Pharmacy of emetic and purgative plants (Madanaphala, Trivrit) for Panchakarma."
      },
      {
        name: "Siddhisthana",
        nameSanskrit: "सिद्धिस्थानम्",
        chapters: 12,
        description: "Successful administration and management of enema therapies (Basti) and procedural complications."
      }
    ],
    coreContributions: [
      "Rigorous articulation of the Tridosha doctrine (Vata, Pitta, Kapha) and individual biological constitution (Prakriti).",
      "Srotas theory: the human body as an interconnected matrix of micro-channels transporting nutrients and waste.",
      "Codification of clinical ethics: the physician's quad of treatment (Bhishak, Dravya, Upasthata, Rogi).",
      "Panchakarma: comprehensive systemic detoxification protocol (Vamana, Virechana, Basti, Nasya, Raktamokshana)."
    ],
    verifiedExcerpt: {
      sanskrit: "धर्मार्थकाममोक्षाणामारोग्यं मूलमुत्तमम्। रोगास्तस्यापहर्तारः श्रेयसो जीवितस्य च॥",
      transliteration: "Dharmārtha-kāma-mokṣāṇām-ārogyaṃ mūlam-uttamam | Rogās-tasyāpahartāraḥ śreyaso jīvitasya ca ||",
      english: "Health is the supreme foundation for achieving righteousness (Dharma), prosperity (Artha), joyful living (Kama), and ultimate liberation (Moksha). Diseases destroy both well-being and life itself.",
      context: "Opening chapter on the divine origin of medical science and its necessity for human realization.",
      reference: "Charaka Samhita, Sutrasthana 1.15"
    },
    manuscriptDetails: {
      primaryScript: "Sharada, Devanagari, Grantha, Bengali",
      material: "Birch bark, Palm leaf, Handmade paper",
      preservationCenters: ["Bhandarkar Oriental Research Institute (Pune)", "Nepal National Archives", "Saraswathi Mahal Library (Thanjavur)"],
      firstPrintedEdition: "Calcutta, 1832 (Ed. Madhusudan Gupta, Sanskrit Press)"
    },
    historicalSignificance:
      "Universally acknowledged as the premier authoritative manual of Indian internal medicine, integrating empirical medical logic with Nyaya-Vaisheshika epistemology.",
    ccrasReference: "CCRAS Literary Research Monograph: Critical Editions of Classical Ayurvedic Literature, Vol. I (Charaka)"
  },
  {
    id: "sushruta-samhita",
    licenseType: "Public Domain",
    editionInfo: "Kaviraj Kunjalal Bhishagratna Translation (1907) and Chaukhambha Orientalia Edition",
    sourceInstitution: "CCRAS Digital e-Books Repository",
    originalSourceLink: "https://ccras.res.in/ccras_ebooks/",
    readOnlineAvailable: true,
    downloadAvailable: true,
    title: "Sushruta Samhita",
    titleSanskrit: "सुश्रुतसंहिता",
    titleMl: "സുശ്രുതസംഹിത",
    traditionalAuthor: "Master Sushruta (Pupil of Divodasa Dhanvantari)",
    redactorCommentator: "Revised by alchemist Nagarjuna (~2nd c. CE), commentary by Dalhana (~12th c. CE)",
    historicalPeriod: "Classical Antiquity",
    dateRangeApprox: "~6th Century BCE – ~3rd Century CE",
    dateUncertaintyNote:
      "Core Dhanvantari surgical teachings date to ~600 BCE; major redaction consolidated by 2nd century BCE, with Nagarjuna's supplement (Uttaratantra) added by ~300 CE.",
    branch: "Shalyatantra",
    totalChapters: 186,
    totalVersesApprox: "1,120 pages across 6 sections",
    sthanaStructure: [
      {
        name: "Sutrasthana",
        nameSanskrit: "सूत्रस्थानम्",
        chapters: 46,
        description: "Surgical initiation, 121 instruments, pre- and post-operative procedures, bloodletting, cauterization."
      },
      {
        name: "Nidanasthana",
        nameSanskrit: "निदानस्थानम्",
        chapters: 16,
        description: "Surgical pathology: fractures, dislocations, urinary calculi (Ashmari), fistulae, and hernias."
      },
      {
        name: "Sharirasthana",
        nameSanskrit: "शारीरस्थानम्",
        chapters: 10,
        description: "Embryology, human cadaveric dissection, 107 vital energy points (Marmas), and osteology."
      },
      {
        name: "Chikitsasthana",
        nameSanskrit: "चिकित्सास्थानम्",
        chapters: 40,
        description: "Surgical treatment of wounds, fractures, reconstructive rhinoplasty, burns, and rejuvenation."
      },
      {
        name: "Kalpasthana",
        nameSanskrit: "कल्पस्थानम्",
        chapters: 8,
        description: "Toxicology: snakebite management, vegetal and mineral poisons, and water de-contamination."
      },
      {
        name: "Uttaratantra",
        nameSanskrit: "उत्तरतन्त्रम्",
        chapters: 66,
        description: "Supplemental treatise covering Shalakya (eye/ENT), Kaumarabhritya (pediatrics), and Bhutavidya (psychiatry)."
      }
    ],
    coreContributions: [
      "Pioneered reconstructive pedicle-flap rhinoplasty, ear lobe reconstruction (Karnabandha), and labioplasty.",
      "Codified human cadaveric water-immersion dissection methodology for authentic surgical training.",
      "Classification of 101 blunt instruments (Yantras) and 20 sharp surgical instruments (Shastras).",
      "Documented 107 vulnerable anatomical junctions (Marmas) where injury causes shock or death."
    ],
    verifiedExcerpt: {
      sanskrit: "शस्त्रं शस्त्रविदा ज्ञेयं यथोक्तं लक्षणान्वितम्। अप्रयुक्तं सुसंस्कारैर्दुष्प्रयुक्तं तु हन्त्यसून्॥",
      transliteration: "Śastraṃ śastravidā jñeyaṃ yathoktaṃ lakṣaṇānvitam | Aprayuktaṃ susaṃskārair-duṣprayuktaṃ tu hanty-asūn ||",
      english: "A surgical instrument must be thoroughly mastered by the surgeon in accordance with its prescribed characteristics. Improperly tempered or inexpertly handled, it destroys life.",
      context: "Instruction on the craftsmanship, sharpening, and ethical deployment of surgical blades.",
      reference: "Sushruta Samhita, Sutrasthana 8.1"
    },
    manuscriptDetails: {
      primaryScript: "Devanagari, Newari, Grantha",
      material: "Palm leaf, Nepali paper",
      preservationCenters: ["Bower Manuscript collection (Oxford)", "National Archives of Nepal", "Asiatic Society (Kolkata)"],
      firstPrintedEdition: "Calcutta, 1835 (Ed. Madhusudan Gupta, Education Press)"
    },
    historicalSignificance:
      "World medicine's foundational surgical treatise, translated into Arabic in the 8th century as 'Kitab-i-Susrud' under Caliph Harun al-Rashid in Baghdad.",
    ccrasReference: "CCRAS Literary Research Series: Critical Editions of the Sushruta Samhita (Vol. II)"
  },
  {
    id: "ashtanga-hridaya",
    licenseType: "Public Domain",
    editionInfo: "Hari Sadasiva Sastri Paradakara Edition and K.R. Srikantha Murthy Translation",
    sourceInstitution: "NCBS Ashtavaidya Archives and SAMHiTA",
    originalSourceLink: "https://www.ncbs.res.in/HistoryScienceSociety/ashtavaidya-archives",
    readOnlineAvailable: true,
    downloadAvailable: true,
    title: "Ashtanga Hridaya",
    titleSanskrit: "अष्टाङ्गहृदयम्",
    titleMl: "അഷ്ടാംഗഹൃദയം",
    traditionalAuthor: "Master Vagbhata (Son of Simhagupta)",
    redactorCommentator: "Commentaries by Arunadatta (Sarvangasundara) and Hemadri (Ayurvedarasayana)",
    historicalPeriod: "Early Medieval Era",
    dateRangeApprox: "~6th – ~7th Century CE",
    dateUncertaintyNote:
      "Firm consensus among modern scholars places Vagbhata around 600–650 CE, shortly after the Gupta epoch.",
    branch: "Samgraha",
    totalChapters: 120,
    totalVersesApprox: "7,120 verses in Anushtubh meter",
    sthanaStructure: [
      {
        name: "Sutrasthana",
        nameSanskrit: "सूत्रस्थानम्",
        chapters: 30,
        description: "The core foundational textbook: daily regimens (Dinacharya), seasons, diet, basic pharmacology, and panchakarma principles."
      },
      {
        name: "Sharirasthana",
        nameSanskrit: "शारीरस्थानम्",
        chapters: 6,
        description: "Embryology, physical anatomy, constitution types, and prognostic signs."
      },
      {
        name: "Nidanasthana",
        nameSanskrit: "निदानस्थानम्",
        chapters: 16,
        description: "Systematic pathology and diagnosis of internal and systemic diseases."
      },
      {
        name: "Chikitsasthana",
        nameSanskrit: "चिकित्सास्थानम्",
        chapters: 22,
        description: "Clinical therapeutics for fever, metabolic disorders, tuberculosis, abdominal swelling, and bleeding."
      },
      {
        name: "Kalpasthana",
        nameSanskrit: "कल्पस्थानम्",
        chapters: 6,
        description: "Formulation chemistry of emetics, purgatives, and medicated enemas."
      },
      {
        name: "Uttarasthana",
        nameSanskrit: "उत्तरस्थानम्",
        chapters: 40,
        description: "Specialized coverage of pediatrics, mental health, eye, ear, nose, head, surgery, toxicology, and rejuvenation."
      }
    ],
    coreContributions: [
      "Masterful lyrical synthesis uniting Charaka's internal medicine and Sushruta's surgical precision.",
      "Composed in fluid Sanskrit meter designed for oral recitation and reliable memorization.",
      "The undisputed primary manual for Kerala's physician lineages, generating dozens of indigenous commentaries.",
      "Streamlined, highly practical clinical formulations with minimal ambiguity."
    ],
    verifiedExcerpt: {
      sanskrit: "रागादिरोगान् सततानुषक्तानशेषकायप्रसृतानशेषान्। औत्सुक्यमोहारतिदान् जघान योऽपूर्ववैद्याय नमोऽस्तु तस्मै॥",
      transliteration: "Rāgādi-rogān satatānuṣaktān-aśeṣa-kāya-prasṛtān-aśeṣān | Autsukya-mohāratidān jaghāna yo'pūrva-vaidyāya namo'stu tasmai ||",
      english: "Salutations to that Unprecedented Divine Physician who destroyed all diseases like attachment and passion, which are continuously clinging, pervasive throughout the body, and cause longing, delusion, and restlessness.",
      context: "Mangalacharana — opening auspicious benediction of the Ashtanga Hridaya.",
      reference: "Ashtanga Hridaya, Sutrasthana 1.1"
    },
    manuscriptDetails: {
      primaryScript: "Malayalam Grantha, Devanagari, Nandinagari, Tigalari",
      material: "Palm leaf (Talapatra)",
      preservationCenters: ["NCBS Ashtavaidya Archives (Bangalore)", "Oriental Research Institute & Manuscripts Library (Trivandrum)", "Kottakkal Arya Vaidya Sala Archives"],
      firstPrintedEdition: "Bombay, 1880 (Ed. Anna Moreshwar Kunte, Ganpat Krishnaji Press)"
    },
    historicalSignificance:
      "The single most studied medical text in peninsular India and Tibet (translated into Tibetan as 'rGyud-bzhi' components). It forms the living pedagogical core of Kerala's Ashtavaidya gurukulas.",
    ccrasReference: "CCRAS Translation & Reprint Monograph: Ashtanga Hridaya with Sarvangasundara Commentary"
  },
  {
    id: "madhava-nidana",
    licenseType: "Public Domain",
    editionInfo: "Madhukosha Commentary by Vijayarakshita and Srikanthadatta (Chaukhambha Sanskrit Sansthan)",
    sourceInstitution: "CCRAS Literary Research Documentation",
    originalSourceLink: "https://ccras.nic.in/",
    readOnlineAvailable: true,
    downloadAvailable: false,
    title: "Madhava Nidana",
    titleSanskrit: "माधवनिदानम् (रोगविनिश्चयः)",
    titleMl: "മാധവനിദാനം",
    traditionalAuthor: "Master Madhavakara (Son of Indukara)",
    redactorCommentator: "Commentaries: Madhukosha by Vijayarakshita & Srikanthadatta; Atankadarpana by Vachaspati",
    historicalPeriod: "Early Medieval Era",
    dateRangeApprox: "~8th Century CE",
    dateUncertaintyNote: "Generally dated between 700 CE and 800 CE, preceding Vrinda and Chakrapanidatta.",
    branch: "Nidana",
    totalChapters: 69,
    totalVersesApprox: "1,554 verses detailing 79 distinct diseases",
    sthanaStructure: [
      {
        name: "Purva & Uttara Vibhaga",
        nameSanskrit: "पूर्व-उत्तर विभागौ",
        chapters: 69,
        description: "Exhaustive nosology starting with Jvara (fevers) and proceeding through metabolic, cutaneous, surgical, and pediatric conditions."
      }
    ],
    coreContributions: [
      "The first specialized, independent treatise dedicated solely to disease diagnosis and clinical pathology.",
      "Codified the Nidana Panchaka (Etiology, Prodromes, Symptoms, Exploratory trial, Pathogenesis).",
      "First documented description of Medoroga (pathological lipid accumulation and obesity) as an independent disorder.",
      "Established the clinical aphorism: 'Nidane Madhavah Shreshthah' (In diagnostic pathology, Madhava is supreme)."
    ],
    verifiedExcerpt: {
      sanskrit: "निदानं पूर्वरूपाणि रूपाण्युपशयस्तथा। सम्प्राप्तिश्चेति विज्ञानं रोगाणां पञ्चधा स्मृतम्॥",
      transliteration: "Nidānaṃ pūrvarūpāṇi rūpāṇy-upaśayas-tathā | Samprāptiś-ceti vijñānaṃ rogāṇāṃ pañcadhā smṛtam ||",
      english: "Etiology (Nidana), prodromal symptoms (Purvarupa), manifested clinical signs (Rupa), therapeutic exploratory trial (Upashaya), and full pathogenesis (Samprapti) — thus is diagnostic knowledge categorized into five folds.",
      context: "The fundamental five-fold diagnostic canon opening the Rogavinishchaya.",
      reference: "Madhava Nidana, Chapter 1, Verse 4"
    },
    manuscriptDetails: {
      primaryScript: "Devanagari, Bengali, Grantha",
      material: "Palm leaf, Paper",
      preservationCenters: ["Bhandarkar Oriental Research Institute (Pune)", "Calcutta Sanskrit College", "Adyar Library (Chennai)"],
      firstPrintedEdition: "Calcutta, 1867"
    },
    historicalSignificance:
      "Became the universal clinical diagnostic standard across medieval India, translated into Arabic in the 9th century under the title 'Kitab al-Numudhar'.",
    ccrasReference: "CCRAS Literary Research Publication: Critical Analysis of Madhava Nidana"
  },
  {
    id: "sharngadhara-samhita",
    licenseType: "Public Domain",
    editionInfo: "Dipika Commentary by Adhamalla and Kasiram Vaidya Gudhartha-Dipika (Khemraj Edition)",
    sourceInstitution: "Traditional Knowledge Digital Library (TKDL) and CCRAS",
    originalSourceLink: "https://ccras.nic.in/",
    readOnlineAvailable: true,
    downloadAvailable: false,
    title: "Sharngadhara Samhita",
    titleSanskrit: "शार्ङ्गधरसंहिता",
    titleMl: "ശാർങ്ഗധരസംഹിത",
    traditionalAuthor: "Master Sharngadhara (Son of Damodara)",
    redactorCommentator: "Commentaries: Dipika by Adhamalla and Gudhartha-dipika by Kashirama",
    historicalPeriod: "Late Medieval Era",
    dateRangeApprox: "~14th Century CE (~1300–1350 CE)",
    dateUncertaintyNote: "Internal evidence places Sharngadhara firmly in 14th century Rajasthan / Western India.",
    branch: "Bhaishajya",
    totalChapters: 32,
    totalVersesApprox: "2,600 verses across 3 Khandas (Sections)",
    sthanaStructure: [
      {
        name: "Prathama Khanda (Purva)",
        nameSanskrit: "प्रथम खण्डः (पूर्व)",
        chapters: 7,
        description: "Metrology, pharmaceutical weights and measures, Nadi Pariksha (pulse examination), anatomy, respiration."
      },
      {
        name: "Madhyama Khanda",
        nameSanskrit: "मध्यम खण्डः",
        chapters: 12,
        description: "The core pharmaceutical manual: preparation of Swarasa (juices), Kwatha (decoctions), Asava/Arishta (fermentations), Taila, Ghrita, and Bhasmas."
      },
      {
        name: "Uttara Khanda",
        nameSanskrit: "उत्तर खण्डः",
        chapters: 13,
        description: "Procedural therapeutics: Panchakarma, bloodletting, eye washes, nasal medication, and leeches."
      }
    ],
    coreContributions: [
      "The definitive manual of Bhaishajya Kalpana (classical Ayurvedic pharmaceutical formulation chemistry).",
      "Formal textual documentation of Nadi Pariksha (radial pulse diagnosis) with Vata, Pitta, Kapha animal-movement descriptors.",
      "Clear explanation of respiratory physiology: the role of Prana Vayu drawing external nectar-air (Ambarapiyusha) into the heart.",
      "Systematization of metallic and mineral calcination techniques (Bhasmas and Rasoushadhis)."
    ],
    verifiedExcerpt: {
      sanskrit: "नाभिस्थः प्राणपवनः स्पृष्ट्वा हृत्कमलान्तरम्। कण्ठाद्बहिर्विनिर्याति पातुं विष्णुपदामृतम्॥",
      transliteration: "Nābhisthaḥ prāṇa-pavanaḥ spṛṣṭvā hṛt-kamalāntaram | Kaṇṭhād-bahir-viniryāti pātuṃ viṣṇupadāmṛtam ||",
      english: "The vital air (Prana) stationed in the navel, having touched the lotus of the heart, issues out through the throat to drink the life-giving nectar of the external atmosphere (oxygen/air).",
      context: "Pioneering medieval description of external and internal pulmonary respiration.",
      reference: "Sharngadhara Samhita, Purva Khanda 5.48"
    },
    manuscriptDetails: {
      primaryScript: "Devanagari, Sharada",
      material: "Handmade paper, Palm leaf",
      preservationCenters: ["Rajasthan Oriental Research Institute (Jodhpur)", "Varanasi Sanskrit University"],
      firstPrintedEdition: "Bombay, 1891 (Nirnaya Sagar Press)"
    },
    historicalSignificance:
      "Transformed Ayurvedic pharmaceutical preparation from domestic art to standardized science; essential for modern GMP manufacturing of classical drugs.",
    ccrasReference: "CCRAS Literary Research Monograph: Bhaishajya Kalpana Standards in Sharngadhara"
  },
  {
    id: "bhava-prakasha",
    licenseType: "Public Domain",
    editionInfo: "Bhava Prakasha Nighantu by Dr. K.C. Chunekar and Dr. G.S. Pandey (Chaukhambha Bharati Academy)",
    sourceInstitution: "CCRAS Ayurvedic Pharmacopoeia of India (API)",
    originalSourceLink: "https://ccras.nic.in/",
    readOnlineAvailable: true,
    downloadAvailable: false,
    title: "Bhava Prakasha",
    titleSanskrit: "भावप्रकाशः",
    titleMl: "ഭാവപ്രകാശം",
    traditionalAuthor: "Master Bhavamishra (Son of Latakamishra)",
    redactorCommentator: "Self-contained lexicon and clinical compendium; extensive glosses by Varanasi scholars",
    historicalPeriod: "Late Medieval Era",
    dateRangeApprox: "~16th Century CE (~1550–1600 CE)",
    dateUncertaintyNote: "Bhavamishra's mention of Phiranga Roga (Syphilis) confirms post-Portuguese contact date (~1500–1550 CE).",
    branch: "Nighantu",
    totalChapters: 3,
    totalVersesApprox: "10,278 verses across Purva, Madhyama, and Uttara Khandas",
    sthanaStructure: [
      {
        name: "Purva Khanda",
        nameSanskrit: "पूर्व खण्डः",
        chapters: 7,
        description: "Creation cosmology, embryology, pediatric regimens, Dinacharya, and the renowned Bhava Prakasha Nighantu (herbal lexicon)."
      },
      {
        name: "Madhyama Khanda",
        nameSanskrit: "मध्यम खण्डः",
        chapters: 71,
        description: "Pathology and clinical treatment of systemic diseases across 4 sections."
      },
      {
        name: "Uttara Khanda",
        nameSanskrit: "उत्तर खण्डः",
        chapters: 2,
        description: "Comprehensive formulations for Rasayana (rejuvenation) and Vajikarana (reproductive health)."
      }
    ],
    coreContributions: [
      "The definitive botanical and dietary encyclopedia (Bhava Prakasha Nighantu), classifying hundreds of herbs, fruits, spices, and foods.",
      "First classical Ayurvedic documentation of Syphilis, named Phiranga Roga ('disease of the Franks/Portuguese').",
      "Documented newly introduced exotic medicinal plants, notably Chopachini (Smilax china) and Parasika Yavani (Hyoscyamus niger).",
      "Unified the Brihat Trayi (Great Three) and Laghu Trayi (Lesser Three) into a single cohesive reference work."
    ],
    verifiedExcerpt: {
      sanskrit: "गन्धेन कटुतीक्ष्णेन बाह्यदोषविनाशिनी। फिरङ्गरोगशमनी चोपचीनी प्रकीर्तिता॥",
      transliteration: "Gandhena kaṭu-tīkṣṇena bāhya-doṣa-vināśinī | Phiraṅga-roga-śamanī copacīnī prakīrtitā ||",
      english: "Endowed with pungent aroma and sharp potency, Chopachini destroys external afflictions and is celebrated as the pacifier of Phiranga Roga (Syphilis).",
      context: "Documentation of Chopachini (China root) for newly observed contact infections.",
      reference: "Bhava Prakasha, Purva Khanda, Haritakyadi Varga"
    },
    manuscriptDetails: {
      primaryScript: "Devanagari, Maithili, Bengali",
      material: "Paper folios, Palm leaf",
      preservationCenters: ["Sampurnanand Sanskrit University (Varanasi)", "National Museum (New Delhi)"],
      firstPrintedEdition: "Calcutta, 1875"
    },
    historicalSignificance:
      "A monument of botanical pharmacognosy, demonstrating Ayurveda's continuous ability to absorb new plants, diseases, and global pharmacological knowledge.",
    ccrasReference: "CCRAS Literary Research Monograph: Botanical Lexicons of Ayurveda (Bhava Prakasha Nighantu)"
  },
  {
    id: "sahasrayogam",
    licenseType: "Open Access / Academic",
    editionInfo: "Malayalam Grantha Translation by Vaidyaratnam K.V. Krishnan Vaidyan and Dr. S. Suresh Babu",
    sourceInstitution: "NCBS Ashtavaidya Archives Project and Kerala Health Heritage",
    originalSourceLink: "https://www.ncbs.res.in/HistoryScienceSociety/ashtavaidya-tradition",
    readOnlineAvailable: true,
    downloadAvailable: false,
    title: "Sahasrayogam",
    titleSanskrit: "सहस्रयोगम्",
    titleMl: "സഹസ്രയോഗം",
    traditionalAuthor: "Traditional Kerala Physician Lineages (Anonymous compilation)",
    redactorCommentator: "Later redacted with Malayalam commentary by various Ashtavaidyas",
    historicalPeriod: "Medieval / Traditional Kerala",
    dateRangeApprox: "~15th – ~17th Century CE",
    dateUncertaintyNote: "Originated as hereditary palm-leaf clinical recipe compendia; compiled into standardized manuscript by 16th century.",
    branch: "Regional Compendium",
    totalChapters: 12,
    totalVersesApprox: "1,000+ formulations categorized by pharmaceutical dosage form",
    sthanaStructure: [
      {
        name: "Kashaya Prakarana",
        nameSanskrit: "कषाय प्रकरणम्",
        chapters: 1,
        description: "Over 200+ specialized decoctions (Kashayas) for fevers, joint disorders, and chronic inflammation."
      },
      {
        name: "Taila & Ghrita Prakarana",
        nameSanskrit: "तैल-घृत प्रकरणम्",
        chapters: 2,
        description: "Medicated oils and ghees (Ksheerabala, Dhanwantharam, Sahacharadi, Mahatiktaka Ghrita)."
      },
      {
        name: "Choorna & Gulika Prakarana",
        nameSanskrit: "चूर्ण-गुलिका प्रकरणम्",
        chapters: 2,
        description: "Herbal powders, gutikas (pills), and compressed tablets."
      },
      {
        name: "Asava & Arishta Prakarana",
        nameSanskrit: "आसव-अरिष्ट प्रकरणम्",
        chapters: 1,
        description: "Fermented biomedical tonics facilitating rapid bio-absorption."
      },
      {
        name: "Lehya & Rasayoga Prakarana",
        nameSanskrit: "लेह्य-रसयोग प्रकरणम्",
        chapters: 2,
        description: "Semi-solid herbal jams (Agastya Rasayana) and mineral-herbal preparations."
      }
    ],
    coreContributions: [
      "The undisputed pharmaceutical bible of Kerala Ayurveda, serving as the basis for over 80% of formulations manufactured today.",
      "Codified world-renowned compound preparations including Dhanwantharam Taila, Ksheerabala, and Amrutarishtam.",
      "Harmonized classical Sanskrit verses with practical regional plant availability of the Western Ghats.",
      "Structured purely by dosage form (Kashaya, Taila, Choorna, Gulika), making it extraordinarily functional for clinical practice."
    ],
    verifiedExcerpt: {
      sanskrit: "दशमूलबलाकुल्थयवक्वाथसमायुतैः। तैलं सिद्धं पयःयुक्तं वातरोगविनाशनम्॥",
      transliteration: "Daśamūla-balā-kulattha-yava-kvātha-samāyutaiḥ | Tailaṃ siddhaṃ payaḥ-yuktaṃ vātaroga-vināśanam ||",
      english: "Oil prepared with the decoction of Dashamula, Bala, Kulattha, and Yava, boiled alongside pure milk, swiftly eradicates all obstinate Vata disorders.",
      context: "Classical formulation instructions for Dhanwantharam Taila, Kerala's signature therapeutic oil.",
      reference: "Sahasrayogam, Taila Prakarana"
    },
    manuscriptDetails: {
      primaryScript: "Malayalam script, Grantha script",
      material: "Palm-leaf bundles (Talapatra)",
      preservationCenters: ["NCBS Ashtavaidya Archives", "Arya Vaidya Sala Kottakkal Library", "Vaidyamadham Illam Archives"],
      firstPrintedEdition: "Kollam, 1890 (Malayalam print edition)"
    },
    historicalSignificance:
      "The practical clinical backbone of Kerala's globally famous Panchakarma and herbal therapy centers; statutory recognized in the Ayurvedic Formulary of India (AFI).",
    ccrasReference: "Ayurvedic Formulary of India (AFI), Ministry of Ayush — Formulations Sourced from Sahasrayogam"
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// 4. KERALA ASHTAVAIDYA HERITAGE (THE EIGHT GUARDIANS)
// ═══════════════════════════════════════════════════════════════════════════

export const ASHTAVAIDYA_FAMILIES_DATA: AshtavaidyaFamily[] = [
  {
    id: "vaidyamadham",
    name: "Vaidyamadham",
    nameMl: "വൈദ്യമഠം",
    location: "Mezhathur, Trithala (Palakkad)",
    district: "Palakkad",
    riverValley: "Nila River (Bharathapuzha) Basin",
    specialization: "General Medicine (Kayachikitsa), Non-toxic Bhasma Preparation & Classical Panchakarma",
    specializationMl: "കായചികിത്സ, ശാസ്ത്രീയ ഭസ്മ നിർമ്മാണം, പഞ്ചകർമ്മം",
    historicalDocumentation:
      "Vaidyamadham is uniquely documented as an 'Asamanya' (exceptional) family possessing hereditary scholarly mastery over both classical Sanskrit Ayurveda and Brahminical ritual tradition. The late Ashtavaidyan Vaidyamadham Cheriya Narayanan Namboodiri was an internationally recognized authority documented in NCBS archives.",
    oralTraditionNote:
      "Oral tradition links the family's lineage directly to sage Parashurama's mythical consecration of eight physician lineages, though historical records confirm continuous documented practice from at least the 16th century CE along the Nila River.",
    historicalLineageDetails:
      "Maintains an intact traditional Oushadhashala, extensive family library of palm-leaf manuscripts, and clinical care center preserving authentic Panchakarma protocols.",
    classicalPractices: [
      "Kashaya and Lehya preparations according to Sahasrayogam and Ashtanga Hridaya",
      "Classical Shodhana (Purification) for chronic metabolic disorders",
      "Rigorous Sanskrit recitation training for apprentice physicians"
    ],
    ncbsArchiveReference: "NCBS Ashtavaidya Archives: Oral History Interview with Vaidyamadham Cheriya Narayanan Namboodiri"
  },
  {
    id: "alathiyur-nambi",
    name: "Alathiyur Nambi",
    nameMl: "ആലാത്തിയൂർ നമ്പി",
    location: "Alathiyur, Tirur (Malappuram)",
    district: "Malappuram",
    riverValley: "Nila River Basin",
    specialization: "Toxicology (Visha Chikitsa), Ophthalmology (Netra Chikitsa) & Mental Health",
    specializationMl: "വിഷചികിത്സ, നേത്രരോഗ ചികിത്സ, മനോരോഗ ചികിത്സ",
    historicalDocumentation:
      "Historically celebrated across Kerala literature as the master diagnosticians for acute envenomation (snakebite, insect poison) and eye diseases. Their clinical methodology combined oral herbal antidotes with specialized ocular collyriums (Anjana).",
    oralTraditionNote:
      "Folk traditions recount legends of Ashwini Kumaras (the celestial physicians) appearing disguised to test the integrity and diagnostic prowess of the early Alathiyur Nambi masters.",
    historicalLineageDetails:
      "Historically associated with the Alathiyur Hanuman Temple region; held hereditary rights for emergency envenomation care across South Malabar.",
    classicalPractices: [
      "Visha Chikitsa: Immediate pulse reading to identify serpent species",
      "Application of specialized botanical pastes over the fontanelle (Thalam)",
      "Traditional Netra Tarpana for sight preservation"
    ],
    ncbsArchiveReference: "NCBS Oral History Collection: The Toxicological Traditions of Alathiyur Nambi"
  },
  {
    id: "pulamanthol-mooss",
    name: "Pulamanthol Mooss",
    nameMl: "പുലാമന്തോൾ മൂസ്സ്",
    location: "Pulamanthol, Perinthalmanna (Malappuram)",
    district: "Malappuram",
    riverValley: "Kunthipuzha / Bharathapuzha Tributary",
    specialization: "Internal Medicine (Kayachikitsa), Neuromuscular Rehabilitation & Rasayana",
    specializationMl: "കായചികിത്സ, വാത-പക്ഷാഘാത ചികിത്സ, രസായനം",
    historicalDocumentation:
      "Documented in Malabar colonial medical surveys and NCBS interviews as exceptional masters of neuromuscular conditions, stroke rehabilitation (Pakshaghata), and spinal disorders through localized oil-pooling therapies (Kati Basti, Pizhichil).",
    oralTraditionNote:
      "The Pulamanthol Illam holds hereditary veneration of Lord Rudradhanvantari, whose temple forms the spiritual epicentre of their medicinal preparation.",
    historicalLineageDetails:
      "The late Ashtavaidyan Pulamanthol Sankaran Mooss was revered for diagnosing deep-seated pathology using radial pulse inspection and abdominal palpation.",
    classicalPractices: [
      "Navarakizhi (Shashtika Shali Pinda Sweda) for muscular dystrophy",
      "Pizhichil (Medicated oil bath) for paralytic recovery",
      "Customised Rasayana therapy for elderly revitalization"
    ],
    ncbsArchiveReference: "NCBS Archives: Pulamanthol Mooss Manuscript Collection & Therapeutic Case Histories"
  },
  {
    id: "vayaskara-mooss",
    name: "Vayaskara Mooss",
    nameMl: "വയസ്കര മൂസ്സ്",
    location: "Vayaskara, Kottayam",
    district: "Kottayam",
    riverValley: "Meenachil River Basin",
    specialization: "Clinical Scholarship, Literary Exposition & Royal Court Medicine",
    specializationMl: "ആയുർവേദ ഗ്രന്ഥരചന, കായചികിത്സ, തിരുവിതാംകൂർ രാജസദസ്സിലെ ചികിത്സ",
    historicalDocumentation:
      "Vayaskara Mooss family produced illustrious scholar-physicians including Ashtavaidyan Vayaskara N.S. Mooss, a pioneering author who published critical editions, Sanskrit commentaries, and anatomical works during the early 20th century.",
    oralTraditionNote:
      "Served as court physicians to the Travancore Royal Family, blending hereditary Ashtavaidya scholarship with classical Sanskrit literary patronage.",
    historicalLineageDetails:
      "Maintained one of central Kerala's richest private collections of botanical manuscripts, providing invaluable primary documents for NCBS archival research.",
    classicalPractices: [
      "Rigorous Sanskrit commentary on Ashtanga Hridaya",
      "Identification and botanical verification of controversial medicinal plants",
      "Advanced clinical protocols for metabolic and cardiac disorders"
    ],
    ncbsArchiveReference: "NCBS Literary Archives: Contributions of Vayaskara N.S. Mooss to Ayurvedic Historiography"
  },
  {
    id: "eledathu-thaikkattu-mooss",
    name: "Eledathu Thaikkattu Mooss",
    nameMl: "എളേടത്ത് തൈക്കാട്ട് മൂസ്സ്",
    location: "Thaikkattussery, Ollur (Thrissur)",
    district: "Thrissur",
    riverValley: "Central Kerala",
    specialization: "Panchakarma, Classical Pharmacy (SNA Oushadhasala) & Toxicological Care",
    specializationMl: "പഞ്ചകർമ്മം, ഔഷധ നിർമ്മാണം, കായചികിത്സ",
    historicalDocumentation:
      "One of the most prominent lineages in modern Kerala Ayurveda. In 1923, Ashtavaidyan E.T. Narayanan Mooss established the S.N.A. Oushadhasala, bridging hereditary illam medicine with standardized pharmaceutical production.",
    oralTraditionNote:
      "Family history records continuous teacher-student transmissions across over twenty documented generations of certified physicians.",
    historicalLineageDetails:
      "Pioneered structured clinical education and research institutions while preserving the sanctified hereditary gurukula in Thaikkattussery.",
    classicalPractices: [
      "Standardization of classical Kashayas and Tailas",
      "Strict fidelity to Vagbhata's Panchakarma regimens",
      "Charitable clinical dispensaries for rural communities"
    ],
    ncbsArchiveReference: "NCBS Oral History: The Transformation of Thaikkattu Mooss from Gurukula to Modern Institution"
  },
  {
    id: "chirattamannu-olassa",
    name: "Chirattamannu Olassa Mooss",
    nameMl: "ചിരട്ടമൺ ഒളശ്ശ മൂസ്സ്",
    location: "Olassa, Kottayam",
    district: "Kottayam",
    riverValley: "Vembanad Lake Basin",
    specialization: "Marma Chikitsa (Vital Spot Therapeutics), Bone Setting & Toxicology",
    specializationMl: "മർമ്മചികിത്സ, അസ്ഥിബന്ധം, വിഷചികിത്സ",
    historicalDocumentation:
      "Specialized in the treatment of trauma to the Marmas (the 107 vital anatomical intersections), fracture setting, and toxicological emergencies across Travancore.",
    oralTraditionNote:
      "The family is historically remembered for treating traumatic injuries suffered by martial artists (Kalari Payattu practitioners) and agricultural workers.",
    historicalLineageDetails:
      "Maintained secret hereditary formulation formulas for deep musculoskeletal trauma and rapid bone reunion (Asthi-sandhana).",
    classicalPractices: [
      "Murivenna and specialized trauma oils application",
      "Precision manual manipulation of displaced Marmas",
      "Immobilization techniques using indigenous wooden and bamboo splints"
    ],
    ncbsArchiveReference: "NCBS Archives: Marma and Trauma Traditions of Chirattamannu Olassa"
  }
];

export const GURUKULA_STAGES_DATA: GurukulaStage[] = [
  {
    stageNumber: 1,
    title: "Classical Text Study",
    titleMl: "ഗ്രന്ഥാഭ്യാസം",
    subtitle: "Rote Memorization, Meter & Hermeneutics",
    sanskritTerm: "अध्ययनम् (Adhyayanam)",
    durationApprox: "3 to 5 Years",
    description:
      "The apprentice entered the Guru's illam at a young age. The training commenced with absolute memorization of the entire Ashtanga Hridaya (7,120 verses) through musical meter (Chandas), accompanied by Sanskrit grammar (Vyakarana) and epistemology (Nyaya).",
    learningMethods: [
      "Dawn recitation of Sanskrit verses under the teacher's auditory supervision",
      "Strict grammatical parsing (Pada Chheda and Anvaya) of complex poetic verses",
      "Daily dialectical debate (Vada) with fellow disciples to clarify ambiguous aphorisms"
    ],
    practicalExercises: [
      "Reciting entire Sthanas from memory without a single hesitation",
      "Explaining a verse through three classical commentaries (Arunadatta, Hemadri, Hridyabodhika)",
      "Composing spontaneous medical mnemonics in Sanskrit Anushtubh meter"
    ],
    historicalNotes:
      "A student was not permitted to touch a patient until every verse of the Ashtanga Hridaya was fixed irrevocably in memory, ensuring that clinical knowledge was instantly accessible without reference books."
  },
  {
    stageNumber: 2,
    title: "Medicinal Plant Knowledge",
    titleMl: "ഔഷധ സസ്യ പരിചയം",
    subtitle: "Botanical Immersion & Ecosystem Literacy",
    sanskritTerm: "द्रव्यज्ञानम् (Dravyajñānam)",
    durationApprox: "2 to 3 Years",
    description:
      "Leaving the classroom, the apprentice accompanied the Guru and local tribal herbalists through the forests of the Western Ghats and the floodplains of the Nila River to identify, harvest, and test living botanicals in their natural habitats.",
    learningMethods: [
      "Field identification through taste (Rasa), smell (Gandha), and morphological texture (Rupa)",
      "Harvesting according to lunar phases, seasons, and ecological maturity",
      "Mastery of local Malayalam nomenclature versus classical Sanskrit botanical synonyms"
    ],
    practicalExercises: [
      "Identifying 100 living medicinal herbs in a wild forest trail within two hours",
      "Selecting valid botanical substitutes (Abhava Dravyas) when an alpine species was unobtainable",
      "Preparing freshly expressed plant juices (Swarasa) and decoctions (Kashayas) at dawn"
    ],
    historicalNotes:
      "Kerala's tropical biodiversity required Ashtavaidyas to be world-class field botanists. Their deep engagement with local flora later profoundly informed the Dutch botanist Hendrik van Rheede's 12-volume *Hortus Malabaricus* (1678–1693)."
  },
  {
    stageNumber: 3,
    title: "Apprenticeship Under a Guru",
    titleMl: "ഗുരുകുല ക്ലിനിക്കൽ പരിശീലനം",
    subtitle: "Bedside Diagnosis, Formulation & Compassionate Service",
    sanskritTerm: "गुरुशुश्रूषा एवं चिकित्साभ्यासः (Cikitsābhyāsaḥ)",
    durationApprox: "4 to 7 Years",
    description:
      "The apprentice observed the Guru during live patient consultations: inspecting facial contours (Darshana), palpating radial pulses (Sparshana), and questioning symptoms (Prashna). Under direct guidance, the disciple prepared complex oils, administered Panchakarma, and internalized medical ethics.",
    learningMethods: [
      "Constant bedside observation of the Guru's diagnostic reasoning and intuitive insight",
      "Hands-on supervision in the family pharmacy (Oushadhashala), boiling medicated oils for days",
      "Accompanying the Guru on emergency house visits for acute snakebite or fever"
    ],
    practicalExercises: [
      "Correctly distinguishing Vata-Pitta vs Pitta-Kapha pulse waveforms under Guru's verification",
      "Directly supervising a 14-day Pizhichil or Navarakizhi procedural cycle from start to finish",
      "Taking full independent responsibility for patient diet, medicine timing, and post-cleansing recovery"
    ],
    historicalNotes:
      "The graduation was not marked by a written diploma, but by the Guru's sacred blessing and the presentation of an iron stylus (Ezhuthani) to author new case folios."
  }
];

export const REGIONAL_KERALA_TEXTS_DATA: RegionalKeralaText[] = [
  {
    id: "sahasrayogam",
    title: "Sahasrayogam",
    titleMl: "സഹസ്രയോഗം",
    approximatePeriod: "~16th Century CE",
    authorship: "Anonymous synthesis by Kerala Ashtavaidya lineages",
    languageAndScript: "Sanskrit verses with Malayalam commentaries; Grantha & Malayalam scripts",
    structure: "12 chapters categorized by pharmaceutical dosage form (Kashaya, Taila, Ghrita, Choorna, Gulika, Asava)",
    keyContributions: [
      "Compiles over 1,000 clinically tested practical formulations perfected in Kerala.",
      "Primary source for internationally acclaimed medicines: Dhanwantharam, Ksheerabala, Sahacharadi, and Mahatiktaka.",
      "Statutory authority recognized in the Ayurvedic Formulary of India (AFI)."
    ],
    sampleFormulationType: "Kashayas (Decoctions) and Medicated Oils (Tailas)",
    historicalContext:
      "Created to provide busy practitioners with a rapid, unambiguous formulary index uncluttered by theoretical philosophy.",
    referenceSource: "NCBS Archives & Central Council for Research in Ayurvedic Sciences (CCRAS)"
  },
  {
    id: "chikitsamanjari",
    title: "Chikitsamanjari",
    titleMl: "ചികിത്സാമഞ്ജരി",
    approximatePeriod: "~17th Century CE",
    authorship: "Attributed to Sreeneelakantha Kavi of Kerala",
    languageAndScript: "Sanskrit and Malayalam verse",
    structure: "Comprehensive clinical handbook arranged disease by disease (Jvara, Shwasa, Grahani, Pakshaghata)",
    keyContributions: [
      "The definitive bedside clinical manual for Kerala physicians, outlining pragmatic home and clinic remedies.",
      "Integrates indigenous Kerala dietary practices, gruels (Kanjis), and herbal steam baths.",
      "Popularized clear, rhyming Malayalam mnemonics for complicated disease treatments."
    ],
    sampleFormulationType: "Medicinal gruels (Marunnu Kanji), herbal poultices, and regional decoctions",
    historicalContext:
      "Brought classical Sanskrit scholarship into direct dialogue with Kerala's rural health realities and household medicine.",
    referenceSource: "University of Kerala Manuscripts Library / NCBS Literary Survey"
  },
  {
    id: "alattur-manipravalam",
    title: "Alattur Manipravalam",
    titleMl: "ആലാത്തൂർ മണിപ്രവാളം",
    approximatePeriod: "~15th – ~16th Century CE",
    authorship: "Attributed to the Alathiyur (Alattur) physician school",
    languageAndScript: "Manipravalam (poetic hybrid of Malayalam and Sanskrit)",
    structure: "Foliant poems describing botanical identification, herbal properties, and pediatric remedies",
    keyContributions: [
      "One of the earliest medical works composed in Manipravalam literature.",
      "Democratized medical learning beyond exclusive Sanskrit-literate circles to broader apprentice communities.",
      "Preserves rare Dravidian botanical names and regional Western Ghats clinical uses."
    ],
    sampleFormulationType: "Pediatric tonics, collyriums (Anjana), and wound-healing pastes",
    historicalContext:
      "A landmark in linguistic history, illustrating how scientific literature transitioned from elite Sanskrit into regional literary dialects.",
    referenceSource: "SAMHiTA Archive & Sukumar Azhicode Literary Studies"
  },
  {
    id: "sindhuramanjari",
    title: "Sindhuramanjari",
    titleMl: "സിന്ദൂരമഞ്ജരി",
    approximatePeriod: "~17th Century CE",
    authorship: "Kerala alchemical and pharmaceutical masters",
    languageAndScript: "Sanskrit in Malayalam Grantha script",
    structure: "Specialized treatise on mineral sublimation, metallic calcinations (Bhasmas), and red mercuric preparations (Sindhuras)",
    keyContributions: [
      "Codified safe processing of bio-minerals and trace metals in Kerala's humidity-controlled subterranean kilns (Puta).",
      "Emphasized rigorous botanical detoxification (Shodhana) using plant juices prior to high-heat calcination.",
      "Ensured metallic medicines achieved absolute non-toxicity and microscopic bio-availability."
    ],
    sampleFormulationType: "Makara Dhwaja, Rasa Sindhura, and Swarna Bhasma formulations",
    historicalContext:
      "Demonstrates that Kerala physicians were not merely herbalists, but sophisticated practitioners of high-temperature iatrochemistry.",
    referenceSource: "Kerala Traditional Pharmacopoeia Research / CCRAS Mineral Studies"
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// 5. INTERACTIVE INDIA MAP LOCATIONS
// ═══════════════════════════════════════════════════════════════════════════

export const INDIA_MAP_LOCATIONS: IndiaMapLocation[] = [
  {
    id: "takshashila",
    name: "Takshashila (Taxila)",
    sanskritName: "तक्षशिला",
    modernState: "Gandhara (Punjab Region)",
    coordinates: { x: 26, y: 16 },
    historicalEra: "~6th Century BCE – ~3rd Century CE",
    tradition: "Atreya School of Internal Medicine & International Academic Exchange",
    associatedScholars: ["Atreya Punarvasu", "Agnivesha", "Jivaka Kumarabhacca (Physician to the Buddha)"],
    associatedTexts: ["Agnivesha Tantra (Early Charaka)", "Jivaka Medical Anecdotes"],
    historicalContext:
      "The great northwestern university city where students from across Asia studied medicine under Master Atreya for seven rigorous years, culminating in the famous botanical graduation test: 'Bring back a plant that has no medicinal virtue.'",
    referenceSource: "Buddhist Vinaya Pitaka / HIML Vol. IA / CCRAS Historical Dossier"
  },
  {
    id: "varanasi",
    name: "Varanasi (Kashi)",
    sanskritName: "वाराणसी (काशी)",
    modernState: "Uttar Pradesh",
    coordinates: { x: 58, y: 39 },
    historicalEra: "~6th Century BCE – Present",
    tradition: "Dhanvantari Surgical School & Classical Academic Conclaves",
    associatedScholars: ["Divodasa Dhanvantari", "Sushruta", "Bhavamishra (16th c.)"],
    associatedTexts: ["Sushruta Samhita", "Bhava Prakasha"],
    historicalContext:
      "The intellectual capital along the sacred Ganges where King Divodasa Dhanvantari imparted surgical, anatomical, and operative knowledge to his pupils, establishing the bedrock of world surgical history.",
    referenceSource: "Sushruta Samhita, Sutrasthana / Archaeological Survey of India (Kashi)"
  },
  {
    id: "pataliputra-nalanda",
    name: "Nalanda & Pataliputra",
    sanskritName: "नालन्दा एवं पाटलिपुत्रम्",
    modernState: "Bihar",
    coordinates: { x: 67, y: 43 },
    historicalEra: "~3rd Century BCE – ~12th Century CE",
    tradition: "Monastic Medical Colleges, Free Public Hospitals & Alchemical Science",
    associatedScholars: ["Nagarjuna (Alchemist-Redactor)", "Emperor Ashoka", "Xuanzang (Historical chronicler)"],
    associatedTexts: ["Sushruta Samhita (Nagarjuna revision)", "Rasaratnakara"],
    historicalContext:
      "Pioneered state-sponsored public hospitals during Ashoka's reign and developed the world's premier residential Buddhist university at Nalanda, where medical sciences, pharmacy, and alchemy were taught to thousands of international scholars.",
    referenceSource: "Ashokan Rock Edict II (Botanical and Medical Welfare) / Xuanzang's Records"
  },
  {
    id: "ujjayini",
    name: "Ujjayini (Ujjain)",
    sanskritName: "उज्जयिनी (अवन्ती)",
    modernState: "Madhya Pradesh",
    coordinates: { x: 41, y: 50 },
    historicalEra: "~4th Century BCE – ~10th Century CE",
    tradition: "Classical Sciences, Astronomy & Botanical Trading Crossroad",
    associatedScholars: ["Varahamihira (Botanical phenology)", "Scholarly Physicians of Avanti"],
    associatedTexts: ["Brihat Samhita (Vrikshayurveda section)"],
    historicalContext:
      "A prime astronomical meridian and cultural crossroad connecting northern, southern, and maritime trade routes, fostering research on plant life (Vrikshayurveda), rainfall cycles, and drug storage.",
    referenceSource: "Brihat Samhita / Indian Science Congress Historical Reviews"
  },
  {
    id: "valabhi",
    name: "Valabhi",
    sanskritName: "वलभी",
    modernState: "Gujarat",
    coordinates: { x: 28, y: 54 },
    historicalEra: "~5th Century – ~8th Century CE",
    tradition: "Western Medical Learning Center & Maritime Resin Trade",
    associatedScholars: ["Maitraka Court Physicians", "Buddhist Medical Commentators"],
    associatedTexts: ["Ancient Guggulu and Kumari Formularies"],
    historicalContext:
      "Major maritime and monastic university that preserved early medical manuscripts and dominated the maritime trade of dry-zone therapeutic resins, incense, and aloes.",
    referenceSource: "Yijing's Travelogues / Epigraphia Indica (Maitraka Dynasties)"
  },
  {
    id: "navadvipa-bengal",
    name: "Navadvipa & Bengal Region",
    sanskritName: "नवद्वीपः (गौड देशः)",
    modernState: "West Bengal",
    coordinates: { x: 74, y: 48 },
    historicalEra: "~11th Century – ~18th Century CE",
    tradition: "Rasa-shastra (Alchemical Medicine) & Commentary Heritage",
    associatedScholars: ["Chakrapanidatta", "Govinda Das", "Madhusudan Gupta (1836 modern dissector)"],
    associatedTexts: ["Chakradatta", "Bhaishajya Ratnavali", "Ayurvedadipika (Commentary on Charaka)"],
    historicalContext:
      "Renowned center of profound scholarly commentaries and advanced mercurial and mineral pharmacy (Rasa-shastra), also producing the first modern Sanskrit print editions.",
    referenceSource: "HIML Vol. IA / Calcutta Sanskrit College Historical Archives"
  },
  {
    id: "kerala-nila",
    name: "Kerala Nila Valley & Malabar",
    sanskritName: "केरले निलातीरम् (भरतपुഴ)",
    modernState: "Kerala",
    coordinates: { x: 38, y: 84 },
    historicalEra: "~13th Century CE – Present",
    tradition: "Ashtavaidya Gurukulas, Living Ashtanga Hridaya & Western Ghats Biodiversity",
    associatedScholars: ["The Eight Ashtavaidya Families", "Vaidyaratnam P.S. Varier", "Kerala Grantha Scribes"],
    associatedTexts: ["Sahasrayogam", "Chikitsamanjari", "Hridyabodhika", "Ashtanga Hridaya (Living Tradition)"],
    historicalContext:
      "The undisputed living sanctuary of classical Ayurveda. Along the Nila River, hereditary physician lineages developed world-famous therapies (Pizhichil, Navarakizhi, Shirodhara), preserved rare palm-leaf folios, and now integrate with Bio-AI research.",
    referenceSource: "NCBS Ashtavaidya Archives / CCRAS / Hortus Malabaricus",
    isKeralaRoute: true
  },
  {
    id: "thanjavur",
    name: "Thanjavur (Tanjore)",
    sanskritName: "तञ्जावूरु",
    modernState: "Tamil Nadu",
    coordinates: { x: 44, y: 88 },
    historicalEra: "~16th Century – ~19th Century CE",
    tradition: "Royal Palm-Leaf Manuscript Conservation & Maratha Court Medicine",
    associatedScholars: ["King Serfoji II", "Dhanvantari Mahal Physicians"],
    associatedTexts: ["Saraswathi Mahal Palm-Leaf Manuscripts", "Bhela Samhita (Unique copy)"],
    historicalContext:
      "King Serfoji II established the royal Dhanvantari Mahal, meticulously collecting, copying, and preserving thousands of endangered medical palm-leaf manuscripts, including the world's sole surviving codex of the ancient Bhela Samhita.",
    referenceSource: "Thanjavur Maharaja Serfoji's Saraswathi Mahal Library Catalogues"
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// 6. GAMIFICATION BADGES
// ═══════════════════════════════════════════════════════════════════════════

export const HISTORICAL_BADGES_DATA: HistoricalBadge[] = [
  {
    id: "vedic-explorer",
    title: "Vedic Explorer",
    titleMl: "വേദകാല അറിവന്വേഷകൻ",
    description: "Uncovered the ancient botanical hymns of Rigveda and therapeutic foundations of Atharvaveda.",
    iconName: "Flame",
    criteria: "Complete the Vedic Foundations chapter and quiz",
    unlockedAt: "Destination 01"
  },
  {
    id: "samhita-scholar",
    title: "Samhita Scholar",
    titleMl: "സംഹിതാ പണ്ഡിതൻ",
    description: "Explored Charaka's internal medicine philosophy and Sushruta's surgical armamentarium.",
    iconName: "BookOpen",
    criteria: "Examine Charaka and Sushruta Samhitas in the classical library",
    unlockedAt: "Destination 02"
  },
  {
    id: "vagbhata-explorer",
    title: "Vagbhata Explorer",
    titleMl: "അഷ്ടാംഗ വിശാരദൻ",
    description: "Mastered the Eight Branches of Ashtanga Ayurveda through the interactive knowledge mandala.",
    iconName: "Compass",
    criteria: "Interact with all 8 branches of the Ashtanga Knowledge Wheel",
    unlockedAt: "Destination 03"
  },
  {
    id: "manuscript-detective",
    title: "Manuscript Detective",
    titleMl: "താളിയോല രഹസ്യങ്ങൾ",
    description: "Investigated ancient palm-leaf folios, Grantha scripts, and medieval diagnostic texts.",
    iconName: "Scroll",
    criteria: "Open and read at least 3 books in the Digital Knowledge Library",
    unlockedAt: "Destination 04"
  },
  {
    id: "kerala-heritage-explorer",
    title: "Kerala Heritage Explorer",
    titleMl: "കേരള പൈതൃക സഞ്ചാരി",
    description: "Discovered the living Nila River Ashtavaidya tradition and Kerala's seminal Sahasrayogam.",
    iconName: "Shield",
    criteria: "Complete the Kerala Ashtavaidya Heritage deep dive",
    unlockedAt: "Special Kerala Route"
  },
  {
    id: "ashtavaidya-apprentice",
    title: "Ashtavaidya Apprentice",
    titleMl: "ഗുരുകുല ശിഷ്യൻ",
    description: "Successfully navigated the 3-stage traditional Gurukula apprenticeship simulator.",
    iconName: "Award",
    criteria: "Complete text study, plant identification, and clinical stages",
    unlockedAt: "Gurukula Experience"
  },
  {
    id: "ayurveda-history-master",
    title: "Ayurveda History Master",
    titleMl: "ആയുർവേദ ചരിത്ര സാർവ്വഭൗമൻ",
    description: "Achieved full journey mastery across all 6 epochs, from Vedic origins to modern Bio-AI.",
    iconName: "Crown",
    criteria: "Complete all destinations, quizzes, map hubs, and heritage chapters",
    unlockedAt: "Journey Completion"
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// 7. VEDAVANI AI GUIDE GROUNDED Q&A ENGINE
// ═══════════════════════════════════════════════════════════════════════════

export const VEDAVANI_KNOWLEDGE_BASE: VedavaniQnAPair[] = [
  {
    id: "who-was-charaka",
    question: "Who was Charaka and what is his contribution?",
    aliases: ["who is charaka", "charaka contribution", "about charaka", "tell me about charaka"],
    category: "Charaka",
    answer:
      "Master Charaka (~2nd century BCE to 2nd century CE) was the towering redactor of the Charaka Samhita, the foundational treatise of Indian internal medicine (Kaya Chikitsa). Based on the earlier Agnivesha Tantra (~6th c. BCE), Charaka articulated the Tridosha doctrine (Vata, Pitta, Kapha), individual biological constitution (Prakriti), the micro-channel system (Srotas), rational pharmacotherapy, and timeless medical ethics.",
    citation: "Charaka Samhita, Sutrasthana Ch. 1 & Vimanasthana Ch. 8",
    verifiedSource: "CCRAS Literary Research Dossier & P.V. Sharma Critical Edition"
  },
  {
    id: "charaka-vs-sushruta",
    question: "What is the difference between Charaka Samhita and Sushruta Samhita?",
    aliases: ["difference between charaka and sushruta", "charaka vs sushruta", "charaka sushruta comparison"],
    category: "Charaka",
    answer:
      "The fundamental distinction lies in clinical specialization and academic lineage:\n\n1. **Charaka Samhita** belongs to the Atreya school of physicians, focusing primarily on **Internal Medicine (Kaya Chikitsa)**, metabolic health (Agni), internal pharmacotherapy, and medical philosophy.\n\n2. **Sushruta Samhita** belongs to the Dhanvantari school of surgeons at Kashi, focusing primarily on **Surgery (Shalya Tantra)**, anatomical dissection, bone setting, 121+ surgical instruments, and reconstructive plastic surgery (rhinoplasty).",
    citation: "Sushruta Samhita Sutrasthana Ch. 1 vs Charaka Samhita Sutrasthana Ch. 1",
    verifiedSource: "M.S. Valiathan's 'The Legacy of Charaka' and 'The Legacy of Sushruta'"
  },
  {
    id: "who-was-sushruta",
    question: "Who was Sushruta and why is he called the Father of Surgery?",
    aliases: ["who is sushruta", "father of surgery", "about sushruta", "sushruta surgical contributions"],
    category: "Sushruta",
    answer:
      "Master Sushruta (~6th century BCE) studied in ancient Varanasi under Divodasa Dhanvantari. He is internationally recognized as the 'Father of Surgery' for pioneering human cadaveric dissection, classifying 121 surgical instruments modeled after nature, detailing 107 vital points (Marmas), inventing reconstructive flap rhinoplasty (plastic surgery of the nose), cataract couching, and complex trauma management.",
    citation: "Sushruta Samhita, Sharirasthana Ch. 5 (Anatomy) & Sutrasthana Ch. 8–16 (Surgery)",
    verifiedSource: "Universities Press: The Legacy of Sushruta"
  },
  {
    id: "who-was-vagbhata",
    question: "Who was Vagbhata and what did he write?",
    aliases: ["who is vagbhata", "about vagbhata", "ashtanga hridaya author", "vagbhata contribution"],
    category: "Vagbhata",
    answer:
      "Master Vagbhata (~6th–7th century CE) was an extraordinary scholar-physician who unified the vast, complex libraries of Charaka and Sushruta into harmonious, memorable Sanskrit poetry. He authored the Ashtanga Sangraha and the world-renowned **Ashtanga Hridaya** (7,120 verses in 120 chapters), which organized medicine into the Eight Branches and became the primary curriculum of Kerala's physicians.",
    citation: "Ashtanga Hridaya, Sutrasthana Ch. 1",
    verifiedSource: "NCBS Ashtavaidya Archives & M.S. Valiathan's 'The Legacy of Vagbhata'"
  },
  {
    id: "what-are-eight-branches",
    question: "What are the Eight Branches of Ayurveda (Ashtanga)?",
    aliases: ["what is ashtanga ayurveda", "eight branches of ayurveda", "name eight branches", "ashtanga branches"],
    category: "Ashtanga",
    answer:
      "Ashtanga Ayurveda comprises eight specialized clinical disciplines:\n1. **Kaya Chikitsa**: Internal medicine & metabolic disorders\n2. **Bala Chikitsa (Kaumarabhritya)**: Pediatrics, obstetrics & neonatal care\n3. **Graha Chikitsa (Bhuta Vidya)**: Psychiatry & psychosomatics\n4. **Urdhvanga Chikitsa (Shalakya)**: Ophthalmology & ENT (above the clavicle)\n5. **Shalya Tantra**: Surgery & trauma\n6. **Damstra Chikitsa (Agada Tantra)**: Toxicology & envenomation\n7. **Jara Chikitsa (Rasayana)**: Geriatrics, cellular rejuvenation & longevity\n8. **Vrsha Chikitsa (Vajikarana)**: Fertility, reproductive biology & vitality.",
    citation: "Ashtanga Hridaya, Sutrasthana 1.5 & Charaka Samhita, Sutrasthana 30.28",
    verifiedSource: "CCRAS National Medical Curriculum Standards"
  },
  {
    id: "ashtavaidya-tradition-history",
    question: "How did the Ashtavaidya tradition develop in Kerala?",
    aliases: ["how did ashtavaidya develop", "ashtavaidya history", "ashtavaidyas of kerala", "kerala ashtavaidya origin"],
    category: "Ashtavaidya",
    answer:
      "According to groundbreaking NCBS historical research, the Ashtavaidya tradition consolidated in Kerala between the 13th and 17th centuries CE, predominantly along the fertile Nila (Bharathapuzha) River basin. Brahmin physician households ('Illams') integrated deep Sanskrit scholarship centered on Vagbhata's *Ashtanga Hridaya* with the extraordinary botanical wealth of the Western Ghats and indigenous clinical therapies, creating an unbroken living transmission of eight-branch mastery.",
    citation: "The Ashtavaidya Physicians of Kerala: A Tradition in Transition (J-AIM / NCBS)",
    verifiedSource: "NCBS Ashtavaidya Archives (P. Ram Manohar & Indira Vaidyanathan)"
  },
  {
    id: "which-are-ashtavaidya-families",
    question: "Which are the documented Ashtavaidya families of Kerala?",
    aliases: ["ashtavaidya family names", "who are the eight families", "list ashtavaidya families"],
    category: "Ashtavaidya",
    answer:
      "While oral tradition speaks of eighteen original families, NCBS historical archives document prominent surviving and historic lineages, notably:\n1. **Vaidyamadham** (Mezhathur, Palakkad — general medicine & non-toxic Bhasma)\n2. **Alathiyur Nambi** (Malappuram — toxicology & ophthalmology)\n3. **Pulamanthol Mooss** (Malappuram — neuromuscular & rehabilitation)\n4. **Vayaskara Mooss** (Kottayam — scholarship & clinical research)\n5. **Eledathu Thaikkattu Mooss** (Thrissur — Panchakarma & SNA Oushadhasala)\n6. **Chirattamannu Olassa Mooss** (Kottayam — Marma trauma & bone setting)\n7. **Kuttancherry Mooss** (Thrissur — surgery & clinical practice).",
    citation: "NCBS Oral History Archives: Lineages of the Ashtavaidya Physicians",
    verifiedSource: "NCBS Research Database & TIFR Archives"
  },
  {
    id: "significance-of-sahasrayogam",
    question: "What is the historical significance of Sahasrayogam?",
    aliases: ["what is sahasrayogam", "sahasrayogam significance", "importance of sahasrayogam"],
    category: "Kerala Texts",
    answer:
      "Sahasrayogam (~16th century CE) is Kerala's celebrated anonymous clinical formulary compiling over one thousand verified medicinal recipes categorized strictly by pharmaceutical dosage form (Kashayas, Tailas, Ghritas, Choorna, Gulika, Asavas). It serves as the practical clinical backbone of Kerala Ayurveda, providing the authentic recipes for world-famous formulations such as Dhanwantharam Taila, Ksheerabala, and Amrutarishtam.",
    citation: "Sahasrayogam, Taila and Kashaya Prakaranas",
    verifiedSource: "Ayurvedic Formulary of India (AFI) & CCRAS Documentation"
  },
  {
    id: "what-is-chikitsamanjari",
    question: "What is Chikitsamanjari and how is it used?",
    aliases: ["what is chikitsamanjari", "chikitsamanjari", "about chikitsamanjari"],
    category: "Kerala Texts",
    answer:
      "Chikitsamanjari is a renowned 17th-century Kerala bedside clinical manual attributed to Sreeneelakantha Kavi. Written in accessible Sanskrit-Malayalam verse, it details practical treatments for diseases prevalent in tropical climates (fevers, respiratory issues, arthritis), integrating regional medicated gruels (Kanjis), local herbs, and poultices.",
    citation: "Chikitsamanjari, Jvara and Vatavyadhi Adhyayas",
    verifiedSource: "University of Kerala Oriental Research Manuscripts Library"
  },
  {
    id: "how-ayurveda-relates-to-ai",
    question: "How does modern Bio-AI connect with ancient Ayurveda?",
    aliases: ["ayurveda and ai", "bio-ai connection to ayurveda", "modern science and ayurveda", "why bio-ai"],
    category: "Modern Research",
    answer:
      "At centers like the Bio-AI Centre of Excellence (KSUM Digital Hub Kochi), modern artificial intelligence bridges empirical ancient knowledge with genomic science:\n\n1. **Molecular Docking**: AI simulates how bioactive molecules in classical herbs bind to human disease receptors.\n2. **Spectral Authentication**: Near-infrared and spectroscopic AI algorithms detect herbal adulteration in seconds.\n3. **Network Pharmacology**: Machine learning deconstructs the multi-herb synergies in classical formulations like Dashamula or Triphala, confirming their biological mechanisms while respecting holistic principles.",
    citation: "Bio-AI Centre of Excellence Research Framework",
    verifiedSource: "Kerala Startup Mission Digital Hub Kochi & Reverse Pharmacology Protocols"
  },
  {
    id: "vedic-origins-of-ayurveda",
    question: "Did Ayurveda originate in the Vedas?",
    aliases: ["is ayurveda from vedas", "vedic roots of ayurveda", "rigveda atharvaveda healing"],
    category: "Vedic",
    answer:
      "Yes, historically Ayurveda's conceptual roots lie in the Vedas. The Rigveda (X.97, the Oshadhi Sukta) contains the earliest panegyric to healing flora, while the Atharvaveda is venerated as the primary medical precursor ('Bhaishajya Veda'), documenting therapeutic incantations, herbal classifications, and the elemental concepts of Agni, Vayu, and Soma that later matured into the Tridosha doctrine.",
    citation: "Rigveda X.97 & Atharvaveda Shaunaka Samhita Kandas 1–8",
    verifiedSource: "CCRAS 'Ayurveda: The Science of Life' Dossier (pp. 4–9)"
  },
  {
    id: "how-manuscripts-are-preserved",
    question: "How were ancient Ayurvedic manuscripts preserved in Kerala?",
    aliases: ["palm leaf preservation", "taliyola preservation", "how manuscripts survived"],
    category: "Kerala Texts",
    answer:
      "In Kerala's humid monsoon climate, paper would quickly disintegrate. Physicians utilized specially treated palmyra palm leaves (Taliyola). Scribes etched verses using a sharp iron stylus (Ezhuthani), then rubbed charcoal or charred dravya oil mixed with lemongrass or camphor into the incisions to blacken the letters and deter wood-boring insects. These bundles were re-copied every few generations, ensuring unbroken transmission.",
    citation: "NCBS Archives & SAMHiTA Conservation Studies",
    verifiedSource: "National Mission for Manuscripts (NMM) & NCBS TIFR"
  }
];

export const VEDA_KNOWLEDGE_BASE = VEDAVANI_KNOWLEDGE_BASE;

