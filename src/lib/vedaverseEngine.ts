import vedaverseRaw from "../data/vedaversePlantBank.json";
import {
  PlantRecord,
  VedaVerseCategory,
  VedaVerseDataset,
  VedaVerseSourceInfo,
} from "../components/kiosk/types";

const dataset = vedaverseRaw as unknown as VedaVerseDataset;

/** Returns the entire validated VedaVerse dataset */
export function getVedaVerseDataset(): VedaVerseDataset {
  return dataset;
}

/** Returns all 100 plant and spice records */
export function getAllPlants(): PlantRecord[] {
  return dataset.plants;
}

/** Looks up a single plant record by unique ID (e.g., 'PL001') */
export function getPlantById(id: string): PlantRecord | null {
  if (!id) return null;
  const normalizedId = id.trim().toUpperCase();
  const plant = dataset.plants.find((p) => p.id.toUpperCase() === normalizedId);
  return plant || null;
}

/** Returns the previous and next plants in the sequence for navigation */
export function getAdjacentPlants(id: string): {
  prev: PlantRecord | null;
  next: PlantRecord | null;
  currentIndex: number;
  total: number;
} {
  const normalizedId = id.trim().toUpperCase();
  const index = dataset.plants.findIndex(
    (p) => p.id.toUpperCase() === normalizedId
  );

  if (index === -1) {
    return {
      prev: null,
      next: null,
      currentIndex: -1,
      total: dataset.plants.length,
    };
  }

  const prev = index > 0 ? dataset.plants[index - 1] : null;
  const next =
    index < dataset.plants.length - 1 ? dataset.plants[index + 1] : null;

  return {
    prev,
    next,
    currentIndex: index + 1,
    total: dataset.plants.length,
  };
}

/** Returns category metadata with verified counts */
export function getCategoriesWithCounts() {
  const counts = {
    all: dataset.plants.length,
    ayurvedic: dataset.plants.filter((p) => p.category === "Ayurvedic plant")
      .length,
    medicinal: dataset.plants.filter((p) => p.category === "Medicinal plant")
      .length,
    spices: dataset.plants.filter(
      (p) => p.category === "Culinary spice / herb"
    ).length,
  };

  return [
    {
      id: "all" as const,
      labelEn: "All Flora & Spices",
      labelMl: "എല്ലാ സസ്യങ്ങളും",
      count: counts.all,
      badge: "Complete 100 Collection",
      color: "emerald",
    },
    {
      id: "Ayurvedic plant" as const,
      labelEn: "Ayurvedic Plants",
      labelMl: "ആയുർവേദ സസ്യങ്ങൾ",
      count: counts.ayurvedic,
      badge: "Classical Rasayana Heritage",
      color: "emerald",
    },
    {
      id: "Medicinal plant" as const,
      labelEn: "Medicinal Plants",
      labelMl: "ഔഷധ സസ്യങ്ങൾ",
      count: counts.medicinal,
      badge: "Therapeutic Botanical Flora",
      color: "teal",
    },
    {
      id: "Culinary spice / herb" as const,
      labelEn: "Culinary Spices & Herbs",
      labelMl: "സുഗന്ധവ്യഞ്ജനങ്ങളും ഔഷധികളും",
      count: counts.spices,
      badge: "Kerala & Global Spice Heritage",
      color: "amber",
    },
  ];
}

export interface PlantSearchFilters {
  query?: string;
  category?: VedaVerseCategory | "all";
  family?: string;
}

/**
 * Searches and filters plants across English name, Malayalam name,
 * scientific botanical name, family, and plant part.
 */
export function searchPlants(filters: PlantSearchFilters): PlantRecord[] {
  const { query, category } = filters;
  const normalizedQuery = (query || "").trim().toLowerCase();

  return dataset.plants.filter((plant) => {
    // 1. Category Filter
    if (category && category !== "all") {
      if (plant.category !== category) {
        return false;
      }
    }

    // 2. Text Query Filter
    if (normalizedQuery) {
      const matchEn = plant.common_name_en
        .toLowerCase()
        .includes(normalizedQuery);
      const matchMl = plant.common_name_ml
        .toLowerCase()
        .includes(normalizedQuery);
      const matchSci = plant.scientific_name
        .toLowerCase()
        .includes(normalizedQuery);
      const matchFamily = plant.family.toLowerCase().includes(normalizedQuery);
      const matchPart = plant.plant_part_or_spice_part
        .toLowerCase()
        .includes(normalizedQuery);
      const matchId = plant.id.toLowerCase().includes(normalizedQuery);

      if (
        !matchEn &&
        !matchMl &&
        !matchSci &&
        !matchFamily &&
        !matchPart &&
        !matchId
      ) {
        return false;
      }
    }

    return true;
  });
}

/** Returns source information by source key */
export function getSourceInfo(sourceId: string): VedaVerseSourceInfo | null {
  return dataset.sources[sourceId] || null;
}

/** Formats Malayalam common name safely, handling unverified markers */
export function formatMalayalamName(nameMl: string): {
  displayText: string;
  isVerified: boolean;
} {
  if (!nameMl) {
    return { displayText: "പ്രാദേശിക പേര് രേഖപ്പെടുത്തിയിട്ടില്ല", isVerified: false };
  }

  if (nameMl.toLowerCase().includes("not verified")) {
    return { displayText: "പ്രാദേശിക പരിശോധന ആവശ്യമാണ്", isVerified: false };
  }

  return { displayText: nameMl, isVerified: true };
}

/** Returns visual color tokens based on plant category */
export function getCategoryVisuals(category: VedaVerseCategory) {
  switch (category) {
    case "Ayurvedic plant":
      return {
        badgeBg: "bg-[#0B5D46]/10",
        badgeText: "text-[#0B5D46]",
        badgeBorder: "border-[#0B5D46]/25",
        accentBg: "bg-[#0B5D46]",
        pillBg: "bg-[#EBF7F2]",
        pillText: "text-[#0B5D46]",
        labelEn: "Ayurvedic Plant",
        labelMl: "ആയുർവേദ സസ്യം",
        themeGradient: "from-[#0B5D46] to-[#073B30]",
      };
    case "Medicinal plant":
      return {
        badgeBg: "bg-[#087F8C]/10",
        badgeText: "text-[#087F8C]",
        badgeBorder: "border-[#087F8C]/25",
        accentBg: "bg-[#087F8C]",
        pillBg: "bg-[#E6F7F9]",
        pillText: "text-[#087F8C]",
        labelEn: "Medicinal Plant",
        labelMl: "ഔഷധ സസ്യം",
        themeGradient: "from-[#087F8C] to-[#055159]",
      };
    case "Culinary spice / herb":
      return {
        badgeBg: "bg-[#C26D00]/10",
        badgeText: "text-[#C26D00]",
        badgeBorder: "border-[#C26D00]/25",
        accentBg: "bg-[#C26D00]",
        pillBg: "bg-[#FFF6E5]",
        pillText: "text-[#C26D00]",
        labelEn: "Culinary Spice / Herb",
        labelMl: "സുഗന്ധവ്യഞ്ജനം / ഔഷധി",
        themeGradient: "from-[#C26D00] to-[#7E4300]",
      };
    default:
      return {
        badgeBg: "bg-[#0B5D46]/10",
        badgeText: "text-[#0B5D46]",
        badgeBorder: "border-[#0B5D46]/25",
        accentBg: "bg-[#0B5D46]",
        pillBg: "bg-[#F0F7F1]",
        pillText: "text-[#0B5D46]",
        labelEn: "Botanical Specimen",
        labelMl: "സസ്യം",
        themeGradient: "from-[#0B5D46] to-[#073B30]",
      };
  }
}

/** Returns plant thumbnail image and accessible alt text */
export function getPlantThumbnail(plant: PlantRecord): { src: string; alt: string } {
  const norm = plant.common_name_en.toLowerCase();
  if (norm.includes("tulsi") || norm.includes("holy basil")) {
    return { src: "/assets/kiosk/questions/tulsi.jpg", alt: `${plant.common_name_en} (${plant.scientific_name})` };
  }
  if (norm.includes("pepper") || norm.includes("black pepper")) {
    return { src: "/assets/kiosk/questions/pepper.jpg", alt: `${plant.common_name_en} (${plant.scientific_name})` };
  }
  if (norm.includes("turmeric") || norm.includes("curcuma")) {
    return { src: "/assets/kiosk/questions/turmeric.jpg", alt: `${plant.common_name_en} (${plant.scientific_name})` };
  }
  if (plant.category === "Ayurvedic plant") {
    return { src: "/assets/kiosk/categories/ayurvedic-plants.jpg", alt: `${plant.common_name_en} - Classical Ayurvedic Plant` };
  }
  if (plant.category === "Medicinal plant") {
    return { src: "/assets/kiosk/categories/medicinal-plants.jpg", alt: `${plant.common_name_en} - Medicinal Botanical Flora` };
  }
  return { src: "/assets/kiosk/categories/spices.jpg", alt: `${plant.common_name_en} - Kerala Herb & Spice Heritage` };
}
