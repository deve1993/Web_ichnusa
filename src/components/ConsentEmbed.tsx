"use client";

import { useState, useEffect } from "react";
import { MapPin, Play, Cookie, ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";
import { COOKIE_CONSENT_KEY, type ConsentLevel } from "@/hooks/useCookieConsent";

type EmbedType = "map" | "video" | "generic";

interface ConsentEmbedProps {
  type: EmbedType;
  children: React.ReactNode;
  className?: string;
  fallbackImage?: string;
  externalUrl?: string;
}

const iconMap = {
  map: MapPin,
  video: Play,
  generic: Cookie,
};

export default function ConsentEmbed({
  type,
  children,
  className = "",
  fallbackImage,
  externalUrl,
}: ConsentEmbedProps) {
  const t = useTranslations("consentEmbed");
  const [hasConsent, setHasConsent] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const checkConsent = () => {
      const stored = localStorage.getItem(COOKIE_CONSENT_KEY) as ConsentLevel;
      setHasConsent(stored === "all");
      setIsLoaded(true);
    };

    checkConsent();

    const handleConsentChange = (e: CustomEvent<ConsentLevel>) => {
      setHasConsent(e.detail === "all");
    };

    window.addEventListener("cookie-consent-change", handleConsentChange as EventListener);
    return () => {
      window.removeEventListener("cookie-consent-change", handleConsentChange as EventListener);
    };
  }, []);

  const acceptCookies = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "all");
    setHasConsent(true);
    window.dispatchEvent(new CustomEvent("cookie-consent-change", { detail: "all" }));
  };

  if (!isLoaded) {
    return (
      <div className={`bg-[var(--color-surface)] animate-pulse ${className}`} />
    );
  }

  if (hasConsent) {
    return <>{children}</>;
  }

  const Icon = iconMap[type];

  return (
    <div
      className={`relative overflow-hidden bg-[var(--color-surface)] border border-[var(--color-border)] ${className}`}
      style={fallbackImage ? { backgroundImage: `url(${fallbackImage})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
    >
      {fallbackImage && (
        <div className="absolute inset-0 bg-[var(--color-background)]/80 backdrop-blur-sm" />
      )}
      
      <div
        className="relative z-10 flex flex-col items-center justify-center h-full min-h-[300px] p-6 text-center animate-[fadeInUp_0.5s_ease-out_both]"
      >
        <div className="w-16 h-16 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center mb-4">
          <Icon size={32} className="text-[var(--color-primary)]" />
        </div>

        <h3 className="text-lg font-semibold text-white mb-2">
          {t(`${type}.title`)}
        </h3>

        <p className="text-sm text-[var(--color-text-muted)] mb-6 max-w-md">
          {t(`${type}.description`)}
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={acceptCookies}
            className="px-6 py-3 bg-[var(--color-primary)] text-[var(--color-background)] font-medium text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <Cookie size={16} />
            {t("acceptCookies")}
          </button>

          {externalUrl && (
            <a
              href={externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-[var(--color-border)] text-white font-medium text-sm hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors flex items-center justify-center gap-2"
            >
              <ExternalLink size={16} />
              {t(`${type}.externalLink`)}
            </a>
          )}
        </div>

        <p className="text-xs text-[var(--color-text-muted)] mt-4">
          {t("privacyNote")}
        </p>
      </div>
    </div>
  );
}
