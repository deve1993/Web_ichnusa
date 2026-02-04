"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  breadcrumbs?: { label: string; href: string }[];
}

export default function PageHero({
  title,
  subtitle,
  backgroundImage = "/images/backgrounds/reservation-bg.jpg",
  breadcrumbs = [],
}: PageHeroProps) {
  return (
    <section className="relative h-[50vh] min-h-[400px] max-h-[500px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          quality={75}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-[var(--color-background)]" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-10 w-32 h-32 border border-[var(--color-primary)] rotate-45"
          style={{ opacity: 0, animation: "heroFadeIn 1s ease-out 0.5s forwards" }}
        />
        <div
          className="absolute bottom-20 right-10 w-24 h-24 border border-[var(--color-primary)] rotate-12"
          style={{ opacity: 0, animation: "heroFadeIn 1s ease-out 0.7s forwards" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20">
        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <nav
            className="hero-fade-up flex items-center justify-center gap-2 mb-6 text-sm"
            style={{ animationDelay: "0.2s" }}
          >
            <Link
              href="/"
              className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
            >
              Home
            </Link>
            {breadcrumbs.map((crumb, index) => (
              <span key={crumb.href} className="flex items-center gap-2">
                <ChevronRight size={14} className="text-[var(--color-primary)]" />
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-[var(--color-primary)]">{crumb.label}</span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
                  >
                    {crumb.label}
                  </Link>
                )}
              </span>
            ))}
          </nav>
        )}

        {/* Title */}
        <h1
          className="hero-fade-up font-[var(--font-display)] text-5xl md:text-6xl lg:text-7xl text-white mb-4"
          style={{ animationDelay: "0.3s" }}
        >
          {title.split(" ").map((word, i) => (
            <span key={i}>
              {i === 0 ? (
                <span className="text-[var(--color-primary)]">{word}</span>
              ) : (
                word
              )}{" "}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p
            className="hero-fade-up text-lg md:text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto"
            style={{ animationDelay: "0.5s" }}
          >
            {subtitle}
          </p>
        )}

        {/* Decorative Line */}
        <div
          className="mt-8 mx-auto w-24 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent"
          style={{ transform: "scaleX(0)", animation: "heroScaleIn 0.8s ease-out 0.7s forwards" }}
        />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes heroFadeIn {
          to { opacity: 0.1; }
        }
        @keyframes heroScaleIn {
          to { transform: scaleX(1); }
        }
      ` }} />
    </section>
  );
}
