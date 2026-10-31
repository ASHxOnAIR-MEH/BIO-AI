"use client";

import React from "react";
import { SpiceQuestProvider, useSpiceQuest } from "./SpiceQuestContext";
import SpiceQuestHeader from "./SpiceQuestHeader";
import SpiceQuestLanding from "./SpiceQuestLanding";
import SpiceQuestLevelSelector from "./SpiceQuestLevelSelector";
import Level1SpiceDetective from "./levels/Level1SpiceDetective";
import Level2PlantPartMatch from "./levels/Level2PlantPartMatch";
import Level3SpiceMemoryGrid from "./levels/Level3SpiceMemoryGrid";
import Level4AyurvedaKnowledgeMatch from "./levels/Level4AyurvedaKnowledgeMatch";
import Level5SpiceJigsaw from "./levels/Level5SpiceJigsaw";
import Level6GrandSpiceMaster from "./levels/Level6GrandSpiceMaster";
import SpiceQuestResults from "./SpiceQuestResults";

function SpiceQuestContent() {
  const { state } = useSpiceQuest();

  const renderActiveView = () => {
    switch (state.currentView) {
      case "landing":
        return <SpiceQuestLanding />;
      case "selector":
        return <SpiceQuestLevelSelector />;
      case "level":
        switch (state.currentLevel) {
          case 1:
            return <Level1SpiceDetective />;
          case 2:
            return <Level2PlantPartMatch />;
          case 3:
            return <Level3SpiceMemoryGrid />;
          case 4:
            return <Level4AyurvedaKnowledgeMatch />;
          case 5:
            return <Level5SpiceJigsaw />;
          case 6:
            return <Level6GrandSpiceMaster />;
          default:
            return <Level1SpiceDetective />;
        }
      case "results":
        return <SpiceQuestResults />;
      default:
        return <SpiceQuestLanding />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6F3] text-[#072820] flex flex-col font-sans selection:bg-[#55B96A]/20">
      {/* Sticky Top Header */}
      <SpiceQuestHeader />

      {/* Main Game Surface */}
      <main className="flex-1 w-full flex flex-col justify-start">
        {renderActiveView()}
      </main>
    </div>
  );
}

export default function SpicePuzzleEngine() {
  return (
    <SpiceQuestProvider>
      <SpiceQuestContent />
    </SpiceQuestProvider>
  );
}

