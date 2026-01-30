"use client";

import { useTranslations } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";

export default function PrivacyPage() {
  const t = useTranslations("privacy");

  const sections = [
    "controller",
    "dataCollected",
    "purposes",
    "legalBasis",
    "cookies",
    "thirdParties",
    "retention",
    "rights",
    "contact",
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
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-[var(--color-text-muted)] text-lg mb-12">
                {t("lastUpdated")}: Gennaio 2026
              </p>

              {sections.map((section, index) => (
                <div
                  key={section}
                  className="mb-12"
                  style={{ opacity: 0, animation: `privacyFadeInUp 0.5s ease-out ${index * 0.1}s forwards` }}
                >
                  <h2 className="font-[var(--font-display)] text-2xl text-white mb-4">
                    {index + 1}. {t(`sections.${section}.title`)}
                  </h2>
                  <div className="text-[var(--color-text-muted)] space-y-4">
                    <p>{t(`sections.${section}.content`)}</p>
                    {section === "cookies" && (
                      <div className="mt-6">
                        <h3 className="text-white text-lg mb-3">{t("cookieTypes.title")}</h3>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>
                            <strong className="text-white">{t("cookieTypes.necessary.name")}:</strong>{" "}
                            {t("cookieTypes.necessary.desc")}
                          </li>
                          <li>
                            <strong className="text-white">{t("cookieTypes.functional.name")}:</strong>{" "}
                            {t("cookieTypes.functional.desc")}
                          </li>
                        </ul>
                      </div>
                    )}
                    {section === "rights" && (
                      <ul className="list-disc pl-6 space-y-2 mt-4">
                        <li>{t("rightsList.access")}</li>
                        <li>{t("rightsList.rectification")}</li>
                        <li>{t("rightsList.deletion")}</li>
                        <li>{t("rightsList.restriction")}</li>
                        <li>{t("rightsList.portability")}</li>
                        <li>{t("rightsList.objection")}</li>
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes privacyFadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        ` }} />
      </main>
      <Footer />
    </>
  );
}
