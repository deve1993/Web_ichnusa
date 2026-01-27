"use client";

import { useState, useEffect, useCallback } from "react";

export const COOKIE_CONSENT_KEY = "ichnusa-cookie-consent";

export type ConsentLevel = "all" | "necessary" | null;

export function useCookieConsent() {
  const [consent, setConsent] = useState<ConsentLevel>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY) as ConsentLevel;
    setConsent(stored);
    setIsLoaded(true);
  }, []);

  const updateConsent = useCallback((level: ConsentLevel) => {
    if (level) {
      localStorage.setItem(COOKIE_CONSENT_KEY, level);
    } else {
      localStorage.removeItem(COOKIE_CONSENT_KEY);
    }
    setConsent(level);
    // Dispatch event for other components to react
    window.dispatchEvent(new CustomEvent("cookie-consent-change", { detail: level }));
  }, []);

  const hasMarketingConsent = consent === "all";
  const hasAnalyticsConsent = consent === "all";
  const hasNecessaryConsent = consent === "all" || consent === "necessary";

  return {
    consent,
    isLoaded,
    updateConsent,
    hasMarketingConsent,
    hasAnalyticsConsent,
    hasNecessaryConsent,
  };
}
