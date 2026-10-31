"use client";

import VedaGuide, { VedaExpression, VedaSize } from "./VedaGuide";

export type ArogyamithranMascotExpression = VedaExpression;
export type MascotSize = VedaSize;

interface ArogyamithranMascotProps {
  expression?: ArogyamithranMascotExpression | string;
  size?: MascotSize;
  className?: string;
  language?: "en" | "ml" | null;
  dialogue?: string;
  supportingText?: string;
  showDialogue?: boolean;
  priority?: boolean;
}

export default function ArogyamithranMascot(props: ArogyamithranMascotProps) {
  return <VedaGuide {...props} />;
}
