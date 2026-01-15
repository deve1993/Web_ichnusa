"use client";

import { useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";

const REFERRAL_STORAGE_KEY = "ichnusa_referral";
const REFERRAL_EXPIRY_DAYS = 30;

interface ReferralData {
  source: string;
  timestamp: number;
  landingPage: string;
  utmParams?: {
    campaign?: string;
    medium?: string;
    content?: string;
  };
}

export function useReferralTracking() {
  const searchParams = useSearchParams();

  const saveReferral = useCallback((data: ReferralData) => {
    try {
      localStorage.setItem(REFERRAL_STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn("Failed to save referral data:", e);
    }
  }, []);

  const getReferral = useCallback((): ReferralData | null => {
    try {
      const stored = localStorage.getItem(REFERRAL_STORAGE_KEY);
      if (!stored) return null;

      const data: ReferralData = JSON.parse(stored);
      const expiryTime = REFERRAL_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
      
      if (Date.now() - data.timestamp > expiryTime) {
        localStorage.removeItem(REFERRAL_STORAGE_KEY);
        return null;
      }

      return data;
    } catch (e) {
      return null;
    }
  }, []);

  const clearReferral = useCallback(() => {
    try {
      localStorage.removeItem(REFERRAL_STORAGE_KEY);
    } catch (e) {
      console.warn("Failed to clear referral data:", e);
    }
  }, []);

  useEffect(() => {
    const ref = searchParams.get("ref");
    const utmSource = searchParams.get("utm_source");
    const utmCampaign = searchParams.get("utm_campaign");
    const utmMedium = searchParams.get("utm_medium");
    const utmContent = searchParams.get("utm_content");

    const source = ref || utmSource;
    
    if (!source) return;

    const existingReferral = getReferral();
    if (existingReferral) return;

    const referralData: ReferralData = {
      source,
      timestamp: Date.now(),
      landingPage: typeof window !== "undefined" ? window.location.pathname : "/",
      utmParams: {
        campaign: utmCampaign || undefined,
        medium: utmMedium || undefined,
        content: utmContent || undefined,
      },
    };

    saveReferral(referralData);
  }, [searchParams, getReferral, saveReferral]);

  return {
    getReferral,
    clearReferral,
  };
}

export function getReferralSource(): string | null {
  if (typeof window === "undefined") return null;
  
  try {
    const stored = localStorage.getItem(REFERRAL_STORAGE_KEY);
    if (!stored) return null;
    
    const data: ReferralData = JSON.parse(stored);
    return data.source;
  } catch {
    return null;
  }
}

export function getReferralDataForSubmission(): Record<string, string> | null {
  if (typeof window === "undefined") return null;
  
  try {
    const stored = localStorage.getItem(REFERRAL_STORAGE_KEY);
    if (!stored) return null;
    
    const data: ReferralData = JSON.parse(stored);
    
    return {
      referral_source: data.source,
      referral_landing_page: data.landingPage,
      referral_campaign: data.utmParams?.campaign || "",
      referral_medium: data.utmParams?.medium || "",
    };
  } catch {
    return null;
  }
}
