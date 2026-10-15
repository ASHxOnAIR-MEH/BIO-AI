"use client";

import ArogyamithranMascot, { ArogyamithranMascotExpression } from "./ArogyamithranMascot";

export type ArogyamithranExpression =
  | "welcoming"
  | "thinking"
  | "correct"
  | "incorrect"
  | "final"
  | "encouraging"
  | "talking"
  | "listening"
  | "holding_plant"
  | "holding_spice"
  | "reading_tablet"
  | "pointing"
  | "namaskaram"
  | "neutral";

interface ArogyamithranCharacterFrameProps {
  compact?: boolean;
  selectedLanguage?: "en" | "ml" | null;
  dialogue?: string;
  supportingText?: string;
  expression?: ArogyamithranExpression;
}

export default function ArogyamithranCharacterFrame({
  compact = false,
  selectedLanguage,
  dialogue,
  supportingText,
  expression = "welcoming",
}: ArogyamithranCharacterFrameProps) {
  // Map older expressions to new mascot expressions
  let mascotExpr: ArogyamithranMascotExpression = "welcoming";
  if (expression === "thinking") mascotExpr = "thinking";
  else if (expression === "correct") mascotExpr = "correct";
  else if (expression === "incorrect") mascotExpr = "incorrect";
  else if (expression === "final") mascotExpr = "final";
  else if (expression === "encouraging") mascotExpr = "encouraging";
  else if (expression === "talking") mascotExpr = "explaining";
  else if (expression === "listening") mascotExpr = "thinking";
  else if (expression === "namaskaram") mascotExpr = "namaskaram";
  else if (expression === "holding_plant") mascotExpr = "holding_plant";
  else if (expression === "holding_spice") mascotExpr = "holding_spice";
  else if (expression === "reading_tablet") mascotExpr = "reading_tablet";
  else if (expression === "pointing") mascotExpr = "pointing";
  else if (expression === "neutral") mascotExpr = "neutral";

  return (
    <div
      className={`relative w-full ${
        compact ? "max-w-md py-2" : "max-w-2xl py-4"
      } mx-auto flex flex-col items-center text-center`}
    >
      <ArogyamithranMascot
        expression={mascotExpr}
        size={compact ? "sm" : "lg"}
        language={selectedLanguage || "en"}
        dialogue={dialogue}
        supportingText={supportingText}
        showDialogue={!!dialogue}
        priority={true}
      />

      {/* Supporting text below frame if no dialogue was passed */}
      {!dialogue && (
        <div className="mt-3 max-w-sm px-2">
          <p className="text-xs font-bold text-[#073B30] leading-snug">
            {selectedLanguage === "ml"
              ? "ആരോഗ്യമിത്രൻ · എഐ സസ്യശാസ്ത്ര ഗുരു"
              : "Arogyamithran · AI Botanical Sage"}
          </p>
          <p className="text-[11px] text-[#244B3F]/75 mt-0.5 leading-relaxed">
            {selectedLanguage === "ml"
              ? "സൗഹൃദപരമായ കേരളീയ ആയുർവേദ അറിവുകളുമായി നിങ്ങളെ സ്വാഗതം ചെയ്യുന്നു."
              : "Your friendly Ayurvedic mentor and interactive guide."}
          </p>
        </div>
      )}
    </div>
  );
}
