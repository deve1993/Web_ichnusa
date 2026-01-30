"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { SardegnaDecoration } from "@/components/ui/SardegnaDecoration";
import { Reveal } from "@/components/ui/Reveal";

const valueIcons = ["🏺", "⭐", "❤️", "🤝"];
const valueKeys = ["tradition", "quality", "passion", "hospitality"] as const;

const journeyStats = ["stat1", "stat2", "stat3"] as const;

export default function ChiSiamoPage() {
  const t = useTranslations("about");
  const tCommon = useTranslations("common");
  const tNav = useTranslations("nav");

  return (
    <>
      <Header />
      <main>
        <PageHero
          title={t("pageTitle")}
          subtitle={t("pageSubtitle")}
          backgroundImage="/images/gallery/chi-siamo-hero.webp"
          breadcrumbs={[{ label: tNav("about"), href: "/chi-siamo" }]}
        />

        <section className="section-padding bg-[var(--color-background)] relative overflow-hidden">
          <SardegnaDecoration 
            className="top-20 left-0 -translate-x-1/3 w-[600px] h-[600px] rotate-[-15deg]" 
            opacity={0.1}
          />

          <div className="container-custom relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <Reveal direction="up" className="relative">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src="/images/restaurant/chi-siamo-story.webp"
                    alt="Interno del ristorante Ichnusa"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 border border-[var(--color-primary)]/20" />
                </div>
                <Reveal
                  direction="scale"
                  delay={0.5}
                  className="absolute -bottom-8 -right-8 bg-[var(--color-primary)] text-[var(--color-background)] p-6 md:p-8"
                >
                  <span className="block text-4xl md:text-5xl font-[var(--font-display)]">10+</span>
                  <span className="text-sm uppercase tracking-wider">{tCommon("yearsExperience")}</span>
                </Reveal>
              </Reveal>
              <Reveal direction="up" delay={0.15} className="lg:pl-8">
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
              </Reveal>
            </div>
          </div>
        </section>

        <section className="section-padding bg-[var(--color-surface)]">
          <div className="container-custom">
            <div className="text-center mb-16">
              <Reveal direction="up">
                <span className="subtitle-decorator justify-center mb-4">
                  {t("valuesSubtitle")}
                </span>
              </Reveal>
              <Reveal direction="up" delay={0.15}>
                <h2 className="font-[var(--font-display)] text-4xl md:text-5xl text-white">
                  {t("valuesTitle").split(" ").slice(0, 1).join(" ")} <span className="text-[var(--color-primary)]">{t("valuesTitle").split(" ").slice(1).join(" ")}</span>
                </h2>
              </Reveal>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {valueKeys.map((key, index) => (
                <Reveal
                  key={key}
                  direction="up"
                  delay={index * 0.1}
                >
                  <div className="group p-8 bg-[var(--color-background)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/50 transition-all duration-500">
                    <div className="text-4xl mb-4">{valueIcons[index]}</div>
                    <h3 className="font-[var(--font-display)] text-xl text-white mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                      {t(`values.${key}.title`)}
                    </h3>
                    <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">
                      {t(`values.${key}.description`)}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-[var(--color-background)] relative overflow-hidden">
          <SardegnaDecoration
            className="bottom-20 right-0 translate-x-1/3 w-[500px] h-[500px] rotate-[15deg]"
            opacity={0.07}
          />
          <div className="container-custom relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <Reveal direction="up">
                <span className="subtitle-decorator mb-4">{t("journeySubtitle")}</span>
                <h2 className="font-[var(--font-display)] text-4xl md:text-5xl text-white mb-6">
                  {t("journeyTitle").split(" ").slice(0, 1).join(" ")}{" "}
                  <span className="text-[var(--color-primary)]">{t("journeyTitle").split(" ").slice(1).join(" ")}</span>
                </h2>
                <div className="space-y-4 text-[var(--color-text-muted)]">
                  <p>{t("journeyP1")}</p>
                  <p>{t("journeyP2")}</p>
                  <p className="italic text-[var(--color-primary)]/80">{t("journeyP3")}</p>
                </div>
                <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-[var(--color-border)]">
                  {journeyStats.map((stat) => (
                    <div key={stat}>
                      <span className="text-2xl md:text-3xl font-[var(--font-display)] text-[var(--color-primary)]">
                        {t(`journey.${stat}.value`)}
                      </span>
                      <p className="text-sm text-[var(--color-text-muted)] mt-1">
                        {t(`journey.${stat}.label`)}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
              <Reveal direction="up" delay={0.15} className="relative">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src="/images/food/chi-siamo-journey.webp"
                    alt={t("journeySubtitle")}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 border border-[var(--color-primary)]/20" />
                </div>
                <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-[var(--color-primary)]/30" />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-[var(--color-primary)]/30" />
              </Reveal>
            </div>
          </div>
        </section>

        <section className="section-padding bg-[var(--color-surface)] relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{ backgroundImage: "url('/images/backgrounds/pattern.svg')" }} />
          </div>
          <div className="container-custom relative z-10">
            <Reveal direction="up" className="text-center max-w-3xl mx-auto">
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
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
