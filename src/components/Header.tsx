"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { Menu, X, Phone, Mail, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

const PHONE = "+420 605 375 012";
const EMAIL = "reservations@ichnusa.restaurant";
const RESERVATION_URL = "https://reservation.dish.co/widget/hydra-7cc98a90-5678-11ec-bb8e-d7389d5eaae1";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef(0);
  const touchStartTimeRef = useRef(0);
  const pathname = usePathname();
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/chi-siamo", label: t("about") },
    { href: "/menu", label: t("menu") },
    { href: "/galleria", label: t("gallery") },
    { href: "/contatti", label: t("contact") },
  ];

  useEffect(() => {
    let rafId: number;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 50);
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  // Touch handlers for swipe-to-close
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartTimeRef.current = Date.now();
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartXRef.current;
    const deltaTime = Date.now() - touchStartTimeRef.current;
    const velocity = Math.abs(deltaX) / deltaTime;

    // Close if swiped left > 100px or velocity > 0.5px/ms
    if (deltaX < -100 || velocity > 0.5) {
      setIsMobileMenuOpen(false);
    }
  }, []);

  return (
    <>
      <div
        className={cn(
          "hidden lg:block border-b border-[var(--color-border)] py-3 fixed top-0 left-0 right-0 z-[51] transition-all duration-300",
          isScrolled
            ? "bg-[var(--color-background)]/95 backdrop-blur-sm -translate-y-full"
            : "bg-[var(--color-background)]"
        )}
      >
        <div className="container-custom flex justify-between items-center">
          <div className="flex items-center gap-6 text-sm text-[var(--color-text-muted)]">
            <a
              href={`tel:${PHONE.replace(/\s/g, "")}`}
              className="flex items-center gap-2 hover:text-[var(--color-primary)] transition-colors"
            >
              <Phone size={14} className="text-[var(--color-primary)]" />
              {PHONE}
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="flex items-center gap-2 hover:text-[var(--color-primary)] transition-colors"
            >
              <Mail size={14} className="text-[var(--color-primary)]" />
              {EMAIL}
            </a>
          </div>
          <div className="text-sm text-[var(--color-text-muted)]">
            Lun - Sab: 11:00 - 23:30 | Dom: Chiuso
          </div>
        </div>
      </div>

      <header
        className={cn(
          "fixed left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "top-0 bg-[var(--color-background)]/70 backdrop-blur-xl border-b border-white/5 shadow-2xl"
            : "top-0 lg:top-[52px] bg-transparent"
        )}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20 lg:h-24">
            <button
              className="lg:hidden text-white p-2 -ml-2 flex-shrink-0"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>

            <Link
              href="/"
              className="flex-1 lg:flex-none flex flex-col items-center lg:items-start"
            >
              <div className="font-[var(--font-display)] text-xl sm:text-2xl lg:text-3xl tracking-[0.15em] sm:tracking-[0.2em] text-white whitespace-nowrap">
                <span className="text-[var(--color-primary)]">I</span>CHNUSA
              </div>
              <div className="text-[8px] sm:text-[10px] lg:text-xs tracking-[0.2em] sm:tracking-[0.3em] text-[var(--color-text-muted)] -mt-1">
                BOTEGA & BISTRO
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative font-medium tracking-wide transition-colors py-2",
                    isActive(link.href)
                      ? "text-[var(--color-primary)]"
                      : "text-white hover:text-[var(--color-primary)]"
                  )}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--color-primary)]" />
                  )}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-4">
              <LanguageSwitcher variant="desktop" />
              <a
                href={RESERVATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm py-3 px-6"
              >
                {tCommon("bookNow")}
              </a>
            </div>

            <a
              href={RESERVATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="lg:hidden text-[var(--color-primary)] p-2 -mr-2 flex-shrink-0 font-[var(--font-display)] text-xs tracking-wider"
            >
              {tCommon("bookNow").toUpperCase().split(" ")[0]}
            </a>
          </div>
        </div>
      </header>

      {/* Mobile Menu Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/80 z-[60] transition-opacity duration-300",
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        ref={menuPanelRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className={cn(
          "fixed top-0 left-0 bottom-0 w-[300px] bg-[var(--color-background)] z-[70] overflow-y-auto touch-pan-y transition-transform duration-300 ease-out",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
              <div className="p-6">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="absolute top-4 right-4 text-white p-2"
                  aria-label="Close menu"
                >
                  <X size={28} />
                </button>

                <div className="mb-10 mt-4">
                  <div className="font-[var(--font-display)] text-2xl tracking-[0.2em] text-white">
                    <span className="text-[var(--color-primary)]">I</span>CHNUSA
                  </div>
                  <div className="text-[10px] tracking-[0.3em] text-[var(--color-text-muted)] -mt-1">
                    BOTEGA & BISTRO
                  </div>
                </div>

                <nav className="space-y-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "block text-xl transition-colors py-2 border-b border-[var(--color-border)]",
                        isActive(link.href)
                          ? "text-[var(--color-primary)] border-[var(--color-primary)]"
                          : "text-white hover:text-[var(--color-primary)]"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                <div className="mt-8 pt-6 border-t border-[var(--color-border)]">
                  <LanguageSwitcher variant="mobile" />
                </div>

                <div className="mt-8 space-y-4 text-[var(--color-text-muted)]">
                  <a
                    href={`tel:${PHONE.replace(/\s/g, "")}`}
                    className="flex items-center gap-3 hover:text-[var(--color-primary)]"
                  >
                    <Phone size={18} className="text-[var(--color-primary)]" />
                    {PHONE}
                  </a>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="flex items-center gap-3 hover:text-[var(--color-primary)]"
                  >
                    <Mail size={18} className="text-[var(--color-primary)]" />
                    {EMAIL}
                  </a>
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-[var(--color-primary)] mt-0.5" />
                    <span>
                      Plaska 623/5<br />
                      150 00 Mala Strana, Praha
                    </span>
                  </div>
                </div>

                <a
                  href={RESERVATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn-primary w-full mt-8 text-center"
                >
                  {tCommon("bookNow")}
                </a>
              </div>
            </div>
    </>
  );
}
