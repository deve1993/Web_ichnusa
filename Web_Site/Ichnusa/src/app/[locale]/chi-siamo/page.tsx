"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { useInViewport } from "@/hooks";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const valueIcons = ["🏺", "⭐", "❤️", "🤝"];
const valueKeys = ["tradition", "quality", "passion", "hospitality"] as const;

const teamImages = [
  "/images/chefs/chef-1.jpg",
  "/images/chefs/chef-2.jpg",
  "/images/chefs/chef-3.jpg",
];
const teamKeys = ["chef1", "chef2", "chef3"] as const;

export default function ChiSiamoPage() {
  const t = useTranslations("about");
  const tCommon = useTranslations("common");
  const tNav = useTranslations("nav");

  const [storyRef, storyInView] = useInViewport({ threshold: 0.2 });
  const [valuesRef, valuesInView] = useInViewport({ threshold: 0.2 });
  const [teamRef, teamInView] = useInViewport({ threshold: 0.2 });

  return (
    <>
      <Header />
      <main>
        <PageHero
          title={t("pageTitle")}
          subtitle={t("pageSubtitle")}
          backgroundImage="/images/restaurant/interior.jpg"
          breadcrumbs={[{ label: tNav("about"), href: "/chi-siamo" }]}
        />

        <section ref={storyRef} className="section-padding bg-[var(--color-background)]">
          <div className="container-custom">
            <motion.div
              initial="hidden"
              animate={storyInView ? "visible" : "hidden"}
              variants={staggerContainer}
              className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
            >
              <motion.div variants={fadeInUp} className="relative">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src="/images/restaurant/interior.jpg"
                    alt="Interno del ristorante Ichnusa"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 border border-[var(--color-primary)]/20" />
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={storyInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="absolute -bottom-8 -right-8 bg-[var(--color-primary)] text-[var(--color-background)] p-6 md:p-8"
                >
                  <span className="block text-4xl md:text-5xl font-[var(--font-display)]">10+</span>
                  <span className="text-sm uppercase tracking-wider">{tCommon("yearsExperience")}</span>
                </motion.div>
              </motion.div>

              <motion.div variants={fadeInUp} className="lg:pl-8">
                <span className="subtitle-decorator mb-4">{t("storySubtitle")}</span>
                <h2 className="font-[var(--font-display)] text-4xl md:text-5xl text-white mb-6">
                  {t("storyTitle").split("Sardegna")[0]}
                  <span className="text-[var(--color-primary)]">Sardegna</span>
                  {t("storyTitle").split("Sardegna")[1]}
                </h2>
                <div className="space-y-4 text-[var(--color-text-muted)]">
                  <p>{t("storyP1")}</p>
                  <p>{t("storyP2")}</p>
                  <p>{t("storyP3")}</p>
                </div>

                <div className="grid grid-cols-2 gap-6 mt-8 pt-8 border-t border-[var(--color-border)]">
                  <div>
                    <span className="text-3xl font-[var(--font-display)] text-[var(--color-primary)]">100%</span>
                    <p className="text-sm text-[var(--color-text-muted)] mt-1">{tCommon("importedIngredients")}</p>
                  </div>
                  <div>
                    <span className="text-3xl font-[var(--font-display)] text-[var(--color-primary)]">50+</span>
                    <p className="text-sm text-[var(--color-text-muted)] mt-1">{tCommon("wineLabels")}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section ref={valuesRef} className="section-padding bg-[var(--color-surface)]">
          <div className="container-custom">
            <motion.div
              initial="hidden"
              animate={valuesInView ? "visible" : "hidden"}
              variants={staggerContainer}
              className="text-center mb-16"
            >
              <motion.span variants={fadeInUp} className="subtitle-decorator justify-center mb-4">
                {t("valuesSubtitle")}
              </motion.span>
              <motion.h2 variants={fadeInUp} className="font-[var(--font-display)] text-4xl md:text-5xl text-white">
                {t("valuesTitle").split(" ")[0]} <span className="text-[var(--color-primary)]">{t("valuesTitle").split(" ").slice(1).join(" ")}</span>
              </motion.h2>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={valuesInView ? "visible" : "hidden"}
              variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {valueKeys.map((key, index) => (
                <motion.div
                  key={key}
                  variants={fadeInUp}
                  className="group p-8 bg-[var(--color-background)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/50 transition-all duration-500"
                >
                  <div className="text-4xl mb-4">{valueIcons[index]}</div>
                  <h3 className="font-[var(--font-display)] text-xl text-white mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                    {t(`values.${key}.title`)}
                  </h3>
                  <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">
                    {t(`values.${key}.description`)}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section ref={teamRef} className="section-padding bg-[var(--color-background)]">
          <div className="container-custom">
            <motion.div
              initial="hidden"
              animate={teamInView ? "visible" : "hidden"}
              variants={staggerContainer}
              className="text-center mb-16"
            >
              <motion.span variants={fadeInUp} className="subtitle-decorator justify-center mb-4">
                {t("teamSubtitle")}
              </motion.span>
              <motion.h2 variants={fadeInUp} className="font-[var(--font-display)] text-4xl md:text-5xl text-white">
                {t("teamTitle").split(" ").slice(0, 1).join(" ")} <span className="text-[var(--color-primary)]">{t("teamTitle").split(" ").slice(1).join(" ")}</span>
              </motion.h2>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={teamInView ? "visible" : "hidden"}
              variants={staggerContainer}
              className="grid md:grid-cols-3 gap-8"
            >
              {teamKeys.map((key, index) => (
                <motion.div
                  key={key}
                  variants={fadeInUp}
                  className="group"
                >
                  <div className="relative aspect-[3/4] overflow-hidden mb-6">
                    <Image
                      src={teamImages[index]}
                      alt={t(`team.${key}.name`)}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="h-1 w-12 bg-[var(--color-primary)] mb-4 transform origin-left transition-all duration-500 group-hover:w-20" />
                    </div>
                  </div>
                  <h3 className="font-[var(--font-display)] text-2xl text-white mb-1">
                    {t(`team.${key}.name`)}
                  </h3>
                  <p className="text-[var(--color-primary)] text-sm uppercase tracking-wider mb-3">
                    {t(`team.${key}.role`)}
                  </p>
                  <p className="text-[var(--color-text-muted)] text-sm">
                    {t(`team.${key}.description`)}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="section-padding bg-[var(--color-surface)] relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{ backgroundImage: "url('/images/backgrounds/pattern.svg')" }} />
          </div>
          <div className="container-custom relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto"
            >
              <span className="subtitle-decorator justify-center mb-4">{t("ctaSubtitle")}</span>
              <h2 className="font-[var(--font-display)] text-4xl md:text-5xl text-white mb-6">
                {t("ctaTitle").split(" ").slice(0, -1).join(" ")} <span className="text-[var(--color-primary)]">{t("ctaTitle").split(" ").slice(-1)}</span>
              </h2>
              <p className="text-[var(--color-text-muted)] mb-8">
                {t("ctaDescription")}
              </p>
              <a
                href="https://reservation.dish.co/widget/hydra-7cc98a90-5678-11ec-bb8e-d7389d5eaae1"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex"
              >
                {tCommon("bookNow")}
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
