"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useArogyamithranLanguage } from "./ArogyamithranContext";

// Configurable defaults for kiosk deployment at Huddle Global
// Note: Organizers can adjust this based on hall foot traffic
const DEFAULT_INACTIVITY_LIMIT_MS = 150 * 1000; // 2.5 minutes before warning
const COUNTDOWN_WARNING_SECONDS = 30; // 30 seconds polite warning before reset

interface KioskInactivityMonitorProps {
  inactivityLimitMs?: number;
  warningSeconds?: number;
  enabled?: boolean;
}

export default function KioskInactivityMonitor({
  inactivityLimitMs = DEFAULT_INACTIVITY_LIMIT_MS,
  warningSeconds = COUNTDOWN_WARNING_SECONDS,
  enabled = true,
}: KioskInactivityMonitorProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { clearLanguage, language } = useArogyamithranLanguage();

  const [showWarning, setShowWarning] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(warningSeconds);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const isMl = language === "ml";

  // Only run monitor on sub-routes, not on root kiosk home page
  const isKioskRoot = pathname === "/kiosk" || pathname === "/";

  const clearAllTimers = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
  }, []);

  const handleResetSession = useCallback(() => {
    clearAllTimers();
    setShowWarning(false);
    clearLanguage();
    try {
      sessionStorage.removeItem("kiosk_language");
      sessionStorage.removeItem("kiosk_arogyamithran_lang");
    } catch {
      // ignore
    }
    router.push("/kiosk");
  }, [clearAllTimers, clearLanguage, router]);

  const startCountdown = useCallback(() => {
    setShowWarning(true);
    setSecondsRemaining(warningSeconds);

    countdownIntervalRef.current = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          handleResetSession();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [handleResetSession, warningSeconds]);

  const resetActivityTimer = useCallback(() => {
    if (showWarning) {
      // If warning is already showing, wait for user to touch "Continue" or "Return"
      return;
    }
    clearAllTimers();
    if (enabled && !isKioskRoot) {
      timerRef.current = setTimeout(() => {
        startCountdown();
      }, inactivityLimitMs);
    }
  }, [clearAllTimers, enabled, isKioskRoot, inactivityLimitMs, showWarning, startCountdown]);

  const handleKeepExploring = () => {
    clearAllTimers();
    setShowWarning(false);
    setSecondsRemaining(warningSeconds);
    // Restart timer
    if (enabled && !isKioskRoot) {
      timerRef.current = setTimeout(() => {
        startCountdown();
      }, inactivityLimitMs);
    }
  };

  useEffect(() => {
    if (!enabled || isKioskRoot) {
      clearAllTimers();
      return;
    }

    const activityEvents = ["touchstart", "pointerdown", "mousemove", "keydown", "scroll"];
    const handleActivity = () => {
      resetActivityTimer();
    };

    activityEvents.forEach((event) => {
      window.addEventListener(event, handleActivity, { passive: true });
    });

    // Start initial timer
    resetActivityTimer();

    return () => {
      clearAllTimers();
      activityEvents.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [enabled, isKioskRoot, resetActivityTimer, clearAllTimers]);

  if (!showWarning || isKioskRoot) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#073B30]/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#0B5D46]/20 shadow-2xl text-center relative overflow-hidden"
          role="alertdialog"
          aria-labelledby="inactivity-title"
          aria-describedby="inactivity-desc"
        >
          {/* Friendly Guide Avatar & Countdown */}
          <div className="relative w-20 h-20 mx-auto mb-3">
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#0B5D46]/20 shadow-sm bg-[#F0F7F1]">
              <Image
                src="/assets/kiosk/arogyamithran/neutral.jpg"
                alt="Arogyamithran"
                fill
                className="object-cover object-top"
                sizes="80px"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-[#0B5D46] text-white font-mono font-bold text-xs shadow-md border-2 border-white">
              {secondsRemaining}s
            </div>
          </div>

          <h3
            id="inactivity-title"
            className="text-xl sm:text-2xl font-extrabold text-[#073B30] mb-2"
          >
            {isMl ? "താങ്കൾ ഇപ്പോഴും ഇവിടെയുണ്ടോ?" : "Are you still exploring?"}
          </h3>

          <p
            id="inactivity-desc"
            className="text-xs sm:text-sm text-[#244B3F]/85 leading-relaxed mb-6"
          >
            {isMl
              ? `ടച്ച് ചെയ്തില്ലെങ്കിൽ ${secondsRemaining} സെക്കൻഡിനുള്ളിൽ കിയോസ്ക് ഹോം സ്ക്രീനിലേക്ക് മടങ്ങും.`
              : `To protect your session and prepare for the next visitor, this screen will reset to the main menu in ${secondsRemaining} seconds.`}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={handleKeepExploring}
              className="flex-1 min-h-[50px] px-5 py-3 rounded-xl bg-[#073B30] text-white hover:bg-[#0B5D46] font-bold text-sm transition-all active:scale-95 shadow-md touch-manipulation"
            >
              {isMl ? "തുടരുക ✓" : "Keep Exploring ✓"}
            </button>

            <button
              type="button"
              onClick={handleResetSession}
              className="flex-1 min-h-[50px] px-5 py-3 rounded-xl bg-[#F0F7F1] text-[#073B30] border border-[#0B5D46]/20 hover:bg-gray-100 font-bold text-sm transition-all active:scale-95 touch-manipulation"
            >
              {isMl ? "ഹോമിലേക്ക് മടങ്ങുക" : "Return to Home"}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
