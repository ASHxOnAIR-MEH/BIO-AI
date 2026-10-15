"use client";

import React, { createContext, useContext, useState } from "react";
import { KioskLanguage } from "./types";

interface ArogyamithranContextType {
  language: KioskLanguage | null;
  setLanguage: (lang: KioskLanguage) => void;
  clearLanguage: () => void;
}

const STORAGE_KEY = "kiosk_arogyamithran_lang";

const ArogyamithranContext = createContext<ArogyamithranContextType>({
  language: null,
  setLanguage: () => {},
  clearLanguage: () => {},
});

export function ArogyamithranProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [language, setLanguageState] = useState<KioskLanguage | null>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = sessionStorage.getItem(STORAGE_KEY) as KioskLanguage | null;
        if (stored === "en" || stored === "ml") {
          return stored;
        }
      } catch {
        // In case sessionStorage is blocked or unavailable
      }
    }
    return null;
  });

  const setLanguage = (lang: KioskLanguage) => {
    setLanguageState(lang);
    try {
      sessionStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Ignore sessionStorage errors
    }
  };

  const clearLanguage = () => {
    setLanguageState(null);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore sessionStorage errors
    }
  };

  return (
    <ArogyamithranContext.Provider
      value={{ language, setLanguage, clearLanguage }}
    >
      {children}
    </ArogyamithranContext.Provider>
  );
}

export function useArogyamithranLanguage() {
  const context = useContext(ArogyamithranContext);
  if (!context) {
    throw new Error(
      "useArogyamithranLanguage must be used within an ArogyamithranProvider"
    );
  }
  return context;
}
