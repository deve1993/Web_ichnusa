"use client";

import { useTranslations } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function TermsPage() {
  const t = useTranslations("terms");

  const sections = [
    "general",
    "services",
    "reservations",
    "intellectualProperty",
    "liability",
    "modifications",
    "jurisdiction",
  ] as const;

  return (
    <>
      <Header />
      <main>
        <PageHero
          title={t("pageTitle")}
          subtitle={t("pageSubtitle")}
          backgroundImage="/images/restaurant/interior.jpg"
        />

        <section className="py-20 bg-[var(--color-background)]">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="prose prose-invert prose-lg max-w-none"
            >
              <p className="text-[var(--color-text-muted)] text-lg mb-12">
                {t("lastUpdated")}: Gennaio 2026
              </p>

              {sections.map((section, index) => (
                <motion.div
                  key={section}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="mb-12"
                >
                  <h2 className="font-[var(--font-display)] text-2xl text-white mb-4">
                    {index + 1}. {t(`sections.${section}.title`)}
                  </h2>
                  <div className="text-[var(--color-text-muted)] space-y-4">
                    <p>{t(`sections.${section}.content`)}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
