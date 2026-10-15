import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  getAllPlants,
  getPlantById,
  getVedaVerseDataset,
} from "@/lib/vedaverseEngine";
import PlantMonographView from "@/components/kiosk/vedaverse/PlantMonographView";

interface PlantPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const plants = getAllPlants();
  return plants.map((p) => ({
    id: p.id,
  }));
}

export async function generateMetadata({
  params,
}: PlantPageProps): Promise<Metadata> {
  const { id } = await params;
  const plant = getPlantById(id);

  if (!plant) {
    return {
      title: "Specimen Not Found — VedaVerse Library",
      description: "Botanical specimen not found in VedaVerse library.",
    };
  }

  return {
    title: `${plant.common_name_en} (${plant.scientific_name}) — VedaVerse Library | Bio-AI`,
    description: `Botanical profile of ${plant.common_name_en} (${plant.scientific_name}, ${plant.family}) in VedaVerse Plant & Spice Library, Bio-AI Centre of Excellence, Digital Hub, Kochi.`,
  };
}

export default async function PlantDetailPage({ params }: PlantPageProps) {
  const { id } = await params;
  const plant = getPlantById(id);

  if (!plant) {
    notFound();
  }

  const dataset = getVedaVerseDataset();

  return <PlantMonographView plant={plant} sources={dataset.sources} />;
}
