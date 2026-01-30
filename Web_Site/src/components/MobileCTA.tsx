"use client";

import { useState, useEffect } from "react";
import { Calendar, Phone, X } from "lucide-react";
import { useMobileCTADispatcher } from "@/hooks/useMobileCTAVisibility";

export default function MobileCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const dispatchVisibility = useMobileCTADispatcher();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      const showThreshold = heroHeight * 0.5;
      const hideThreshold = heroHeight * 0.3;
      
      if (scrollY > showThreshold && !isDismissed) {
        setIsVisible(true);
      } else if (scrollY <= hideThreshold) {
        setIsVisible(false);
        setIsDismissed(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

  useEffect(() => {
    dispatchVisibility(isVisible);
  }, [isVisible, dispatchVisibility]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-all duration-300 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="absolute inset-0 bg-[var(--color-background)]/95 backdrop-blur-xl border-t border-[var(--color-border)]" />
      
      <div className="relative px-4 py-3 safe-area-bottom">
        <button
          onClick={handleDismiss}
          className="absolute -top-10 right-4 w-8 h-8 rounded-full bg-[var(--color-background)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-white transition-colors"
          aria-label="Dismiss"
        >
          <X size={16} />
        </button>

        <div className="flex gap-3">
          <a
            href="https://reservation.dish.co/widget/hydra-7cc98a90-5678-11ec-bb8e-d7389d5eaae1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-[var(--color-primary)] text-[var(--color-background)] py-3.5 px-4 font-[var(--font-display)] text-sm uppercase tracking-wider"
          >
            <Calendar size={18} />
            Prenota
          </a>

          <a
            href="tel:+420605375012"
            className="flex items-center justify-center gap-2 border border-[var(--color-primary)] text-[var(--color-primary)] py-3.5 px-5 font-[var(--font-display)] text-sm uppercase tracking-wider hover:bg-[var(--color-primary)] hover:text-[var(--color-background)] transition-colors"
            aria-label="Chiama Ora"
          >
            <Phone size={18} />
          </a>
        </div>
      </div>
    </div>
  );
}
