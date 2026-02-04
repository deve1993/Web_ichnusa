import { getTranslations } from "next-intl/server";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { LineReveal } from "@/components/ui/TextReveal";
import HeroVideo from "./HeroVideo";

const RESERVATION_URL = "https://reservation.dish.co/widget/hydra-7cc98a90-5678-11ec-bb8e-d7389d5eaae1";

export default async function Hero() {
  const t = await getTranslations("hero");
  const tCommon = await getTranslations("common");

  return (
    <section id="home" className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <picture>
          <source media="(min-width: 768px)" srcSet="/images/hero-poster.webp" />
          <img
            src="/images/gallery/09.webp"
            alt="Ichnusa Restaurant Interior"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </picture>
        <HeroVideo />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div
          className="hero-fade-up subtitle-decorator justify-center mb-6"
          style={{ animationDelay: "0.2s" }}
        >
          {t("subtitle")}
        </div>

        <h1 className="font-[var(--font-display)] text-white mb-6">
          <LineReveal delay={0.4}>
            {t("title1")}
          </LineReveal>
          <LineReveal delay={0.5}>
            <span className="text-[var(--color-primary)]">{t("title2")}</span>
          </LineReveal>
        </h1>

        <p
          className="hero-fade-up text-xl text-[var(--color-text-muted)] mb-10 max-w-xl mx-auto"
          style={{ animationDelay: "0.6s" }}
        >
          {t("description")}
        </p>

        <div
          className="hero-fade-up flex flex-col sm:flex-row gap-4 justify-center items-center"
          style={{ animationDelay: "0.8s" }}
        >
          <AnimatedButton href={RESERVATION_URL} variant="doubleText" target="_blank">
            {tCommon("bookNow")}
          </AnimatedButton>
          <AnimatedButton href="#menu" variant="outline">
            {tCommon("viewMenu")}
          </AnimatedButton>
        </div>
      </div>

      <div
        className="hero-fade-in absolute bottom-10 left-1/2 -translate-x-1/2"
        style={{ animationDelay: "1.5s" }}
      >
        <div className="flex flex-col items-center gap-2 text-[var(--color-text-muted)]">
          <span className="text-sm tracking-widest uppercase">{t("scroll")}</span>
          <div className="scroll-bounce w-6 h-10 border-2 border-[var(--color-primary)] rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-[var(--color-primary)] rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
