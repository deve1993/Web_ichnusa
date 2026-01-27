"use client";

import { motion } from "framer-motion";
import Link from "next/link";
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
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-[var(--color-background)]" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-20 left-10 w-32 h-32 border border-[var(--color-primary)] rotate-45"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="absolute bottom-20 right-10 w-24 h-24 border border-[var(--color-primary)] rotate-12"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20">
        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center gap-2 mb-6 text-sm"
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
          </motion.nav>
        )}

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-[var(--font-display)] text-5xl md:text-6xl lg:text-7xl text-white mb-4"
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
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg md:text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}

        {/* Decorative Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-8 mx-auto w-24 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent"
        />
      </div>
    </section>
  );
}
