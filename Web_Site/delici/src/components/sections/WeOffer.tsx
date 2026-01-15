"use client";

import { motion } from "framer-motion";
import { Wheat, Fish, Wine } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function WeOffer() {
  const t = useTranslations("weOffer");

  const features = [
    {
      icon: Wheat,
      titleKey: "tradition.title" as const,
      descriptionKey: "tradition.description" as const,
    },
    {
      icon: Fish,
      titleKey: "fish.title" as const,
      descriptionKey: "fish.description" as const,
    },
    {
      icon: Wine,
      titleKey: "wines.title" as const,
      descriptionKey: "wines.description" as const,
    },
  ];

  const menuCards = [
    {
      titleKey: "cards.kitchen" as const,
      image: "/images/menu/breakfast.jpg",
      href: "/menu" as const,
    },
    {
      titleKey: "cards.bottega" as const,
      image: "/images/menu/appetizers.jpg",
      href: "/prodotti" as const,
    },
    {
      titleKey: "cards.wines" as const,
      image: "/images/menu/drinks.jpg",
      href: "/menu#vini" as const,
    },
  ];
  return (
    <section className="section-padding bg-[var(--color-background)]">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="subtitle-decorator justify-center mb-4"
          >
            {t("subtitle")}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white"
          >
            {t("title")}
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.titleKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="relative inline-flex items-center justify-center w-24 h-24 mb-6">
                <div className="absolute inset-0 border border-[var(--color-primary)] rotate-45 transition-transform group-hover:rotate-0" />
                <feature.icon
                  size={40}
                  className="text-[var(--color-primary)] relative z-10"
                />
              </div>

              <h3 className="text-xl text-white mb-4 font-[var(--font-display)]">
                {t(feature.titleKey)}
              </h3>

              <p className="text-[var(--color-text-muted)] leading-relaxed">
                {t(feature.descriptionKey)}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 flex justify-center"
        >
          <img
            src="/images/separator.svg"
            alt="Separator"
            className="opacity-60"
          />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mt-20">
          {menuCards.map((card, index) => (
            <motion.div
              key={card.titleKey}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Link href={card.href} className="group block relative overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={card.image}
                    alt={t(card.titleKey)}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:bg-black/60" />
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                    <h3 className="text-2xl text-white font-[var(--font-display)] mb-3 transition-transform duration-300 group-hover:-translate-y-2">
                      {t(card.titleKey)}
                    </h3>
                    <span className="text-[var(--color-primary)] font-[var(--font-display)] text-sm uppercase tracking-widest opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                      {t("cards.discover")}
                    </span>
                  </div>

                  <div className="absolute inset-4 border border-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
