"use client";

import { useTranslations } from "next-intl";
import PageHero from "@/components/PageHero";

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
      <main>
        <PageHero
          title={t("pageTitle")}
          subtitle={t("pageSubtitle")}
          backgroundImage="/images/restaurant/interior.jpg"
        />

        <section className="py-20 bg-[var(--color-background)]">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-[var(--color-text-muted)] text-lg mb-12">
                {t("lastUpdated")}: Gennaio 2026
              </p>

              {sections.map((section, index) => (
                <div
                  key={section}
                  className="mb-12"
                  style={{ opacity: 0, animation: `termsFadeInUp 0.5s ease-out ${index * 0.1}s forwards` }}
                >
                  <h2 className="font-[var(--font-display)] text-2xl text-white mb-4">
                    {index + 1}. {t(`sections.${section}.title`)}
                  </h2>
                  <div className="text-[var(--color-text-muted)] space-y-4">
                    <p>{t(`sections.${section}.content`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes termsFadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        ` }} />
      </main>
    </>
  );
}
