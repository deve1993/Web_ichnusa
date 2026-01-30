"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

function FlagIT({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 16" className={className} aria-hidden="true">
      <rect width="8" height="16" fill="#009246" />
      <rect x="8" width="8" height="16" fill="#fff" />
      <rect x="16" width="8" height="16" fill="#ce2b37" />
    </svg>
  );
}

function FlagGB({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 16" className={className} aria-hidden="true">
      <rect width="24" height="16" fill="#012169" />
      <path d="M0 0L24 16M24 0L0 16" stroke="#fff" strokeWidth="2.5" />
      <path d="M0 0L24 16M24 0L0 16" stroke="#C8102E" strokeWidth="1.5" />
      <path d="M12 0V16M0 8H24" stroke="#fff" strokeWidth="4" />
      <path d="M12 0V16M0 8H24" stroke="#C8102E" strokeWidth="2.5" />
    </svg>
  );
}

function FlagCZ({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 16" className={className} aria-hidden="true">
      <rect width="24" height="8" fill="#fff" />
      <rect y="8" width="24" height="8" fill="#d7141a" />
      <polygon points="0,0 12,8 0,16" fill="#11457e" />
    </svg>
  );
}

const languages = [
  { code: "it", label: "Italiano", Flag: FlagIT },
  { code: "en", label: "English", Flag: FlagGB },
  { code: "cs", label: "Čeština", Flag: FlagCZ },
] as const;

interface LanguageSwitcherProps {
  variant?: "desktop" | "mobile";
  className?: string;
}

export default function LanguageSwitcher({ variant = "desktop", className }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (langCode: string) => {
    router.replace(pathname, { locale: langCode as "it" | "en" | "cs" });
    setIsOpen(false);
  };

  const currentLanguage = languages.find(l => l.code === locale) || languages[0];

  if (variant === "mobile") {
    return (
      <div className={cn("space-y-2", className)}>
        <div className="text-xs uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
          Lingua / Language
        </div>
        <div className="flex gap-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded border transition-all",
                locale === lang.code
                  ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                  : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-primary)]/50"
              )}
            >
              <lang.Flag className="w-6 h-4 rounded-sm shadow-sm" />
              <span className="text-sm">{lang.code.toUpperCase()}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={dropdownRef} className={cn("relative", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-white hover:text-[var(--color-primary)] transition-colors py-2 px-1"
        aria-label="Change language"
      >
        <currentLanguage.Flag className="w-6 h-4 rounded-sm shadow-sm ring-1 ring-white/20" />
        <ChevronDown 
          size={14} 
          className={cn(
            "transition-transform duration-200",
            isOpen && "rotate-180"
          )} 
        />
      </button>

      <div
        className={cn(
          "absolute top-full right-0 mt-2 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg shadow-xl overflow-hidden min-w-[160px] z-50 transition-all duration-150",
          isOpen
            ? "opacity-100 scale-100 pointer-events-auto translate-y-0"
            : "opacity-0 scale-95 pointer-events-none -translate-y-2"
        )}
      >
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 text-left transition-colors",
              locale === lang.code
                ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                : "text-white hover:bg-white/5"
            )}
          >
            <lang.Flag className="w-7 h-5 rounded-sm shadow-sm ring-1 ring-white/10" />
            <div className="flex flex-col">
              <span className="text-sm font-medium">{lang.label}</span>
            </div>
            {locale === lang.code && (
              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
