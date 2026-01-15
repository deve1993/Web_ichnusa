"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

interface CardData {
  titleKey: string;
  subtitleKey: string;
  descriptionKey: string;
  buttonKey: string;
  href: string;
  image: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function ParallaxCard({ card, t }: { card: CardData; t: (key: string) => string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      className="relative min-h-[500px] md:min-h-[600px] flex items-center justify-center overflow-hidden group"
    >
      <motion.div
        className="absolute inset-[-20%] bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{
          backgroundImage: `url(${card.image})`,
          y,
          scale,
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/40" />

      <div className="absolute inset-8 md:inset-12 border border-[var(--color-primary)]/30 pointer-events-none" />

      <div className="relative z-10 text-center px-8 md:px-16 max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-3 mb-4"
        >
          <span className="w-8 h-[1px] bg-[var(--color-primary)]" />
          <span className="text-[var(--color-primary)] text-sm tracking-[0.3em] uppercase font-light">
            {t(card.subtitleKey)}
          </span>
          <span className="w-8 h-[1px] bg-[var(--color-primary)]" />
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-4xl lg:text-5xl text-white font-[var(--font-display)] mb-6"
        >
          {t(card.titleKey)}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-[var(--color-text-muted)] leading-relaxed mb-8"
        >
          {t(card.descriptionKey)}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link
            href={card.href}
            className="inline-flex items-center gap-2 text-[var(--color-primary)] border border-[var(--color-primary)] px-8 py-3 hover:bg-[var(--color-primary)] hover:text-[var(--color-background)] transition-all duration-300 group/btn"
          >
            <span className="text-sm tracking-wider uppercase">
              {t(card.buttonKey)}
            </span>
            <ChevronRight
              size={16}
              className="group-hover/btn:translate-x-1 transition-transform"
            />
          </Link>
        </motion.div>
      </div>

      <div className="absolute top-12 left-12 w-6 h-6 border-t border-l border-[var(--color-primary)]/50" />
      <div className="absolute top-12 right-12 w-6 h-6 border-t border-r border-[var(--color-primary)]/50" />
      <div className="absolute bottom-12 left-12 w-6 h-6 border-b border-l border-[var(--color-primary)]/50" />
      <div className="absolute bottom-12 right-12 w-6 h-6 border-b border-r border-[var(--color-primary)]/50" />
    </motion.div>
  );
}

export default function InfoCards() {
  const t = useTranslations("infoCards");
  const tCommon = useTranslations("common");

  const cards: CardData[] = [
    {
      titleKey: "bottega.title",
      subtitleKey: "bottega.subtitle",
      descriptionKey: "bottega.description",
      buttonKey: "viewProducts",
      href: "/prodotti",
      image: "/images/food/special-dish.jpg",
    },
    {
      titleKey: "events.title",
      subtitleKey: "events.subtitle",
      descriptionKey: "events.description",
      buttonKey: "bookEvent",
      href: "/contatti",
      image: "/images/events/event-1.jpg",
    },
  ];

  const getTranslation = (key: string) => {
    const commonKeys = ["viewProducts", "bookEvent"];
    return commonKeys.includes(key) ? tCommon(key) : t(key);
  };

  return (
    <section className="py-0">
      <motion.div
        className="grid md:grid-cols-2"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {cards.map((card) => (
          <ParallaxCard key={card.titleKey} card={card} t={getTranslation} />
        ))}
      </motion.div>
    </section>
  );
}
