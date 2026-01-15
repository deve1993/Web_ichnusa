"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { useTranslations } from "next-intl";

export default function SpecialDish() {
  const t = useTranslations("specialDish");
  const tCommon = useTranslations("common");

  return (
    <section className="section-padding bg-[#1A1816] relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "url('/images/backgrounds/pattern.svg')",
          backgroundRepeat: "repeat",
        }}
      />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[90%] h-[90%] rounded-full border border-[var(--color-primary)] opacity-20" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[80%] h-[80%] rounded-full border border-dashed border-[var(--color-primary)] opacity-10" />
            </div>
            
            <div className="relative aspect-square max-w-[500px] mx-auto">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative w-full h-full rounded-full overflow-hidden border-4 border-[var(--color-primary)]"
              >
                <Image
                  src="/images/food/special-dish.jpg"
                  alt="Porceddu - Maialino Sardo"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 500px"
                />
              </motion.div>
              
              <motion.div
                initial={{ scale: 0, rotate: -10 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute -right-4 top-10 bg-[var(--color-primary)] text-[var(--color-background)] px-4 py-2 font-[var(--font-display)] text-sm uppercase tracking-wider"
              >
                {t("badge")}
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <div className="subtitle-decorator mb-4 justify-center lg:justify-start">
              {t("subtitle")}
            </div>

            <h2 className="text-white mb-6">
              {t("title")}
            </h2>

            <p className="text-[var(--color-text-muted)] mb-8 text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
              {t("description")}
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-4 justify-center lg:justify-start mb-10"
            >
              <span className="text-[var(--color-text-muted)] text-lg font-[var(--font-display)]">
                {t("reservation")}
              </span>
              <span className="text-[var(--color-primary)] text-3xl font-[var(--font-display)]">
                {t("serves")}
              </span>
            </motion.div>

            <AnimatedButton href="/menu" variant="doubleText">
              {tCommon("viewMenu")}
            </AnimatedButton>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-32 h-32 border-l border-b border-[var(--color-primary)] opacity-20" />
      <div className="absolute top-0 right-0 w-32 h-32 border-r border-t border-[var(--color-primary)] opacity-20" />
    </section>
  );
}
