"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { COOKIE_CONSENT_KEY, type ConsentLevel } from "@/hooks/useCookieConsent";

export default function CookieBanner() {
  const t = useTranslations("cookieBanner");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const setConsent = (level: ConsentLevel) => {
    if (level) {
      localStorage.setItem(COOKIE_CONSENT_KEY, level);
      window.dispatchEvent(new CustomEvent("cookie-consent-change", { detail: level }));
    }
    setIsVisible(false);
  };

  const acceptAll = () => setConsent("all");
  const acceptNecessary = () => setConsent("necessary");

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 transition-all duration-300 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="max-w-4xl mx-auto bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg shadow-2xl p-4 md:p-6">
        <button
          onClick={acceptNecessary}
          className="absolute top-3 right-3 text-[var(--color-text-muted)] hover:text-white transition-colors"
          aria-label={t("close")}
        >
          <X size={20} />
        </button>

        <div className="pr-8">
          <h3 className="text-lg font-semibold text-white mb-2">
            {t("title")}
          </h3>
          <p className="text-sm text-[var(--color-text-muted)] mb-4">
            {t("description")}{" "}
            <Link href="/privacy" className="text-[var(--color-primary)] underline underline-offset-2 hover:opacity-80">
              {t("privacyLink")}
            </Link>.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={acceptAll}
              className="flex-1 bg-[var(--color-primary)] text-[var(--color-background)] py-2.5 px-4 text-sm font-medium rounded hover:opacity-90 transition-opacity"
            >
              {t("acceptAll")}
            </button>
            <button
              onClick={acceptNecessary}
              className="flex-1 border border-[var(--color-border)] text-white py-2.5 px-4 text-sm font-medium rounded hover:bg-white/5 transition-colors"
            >
              {t("acceptNecessary")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
