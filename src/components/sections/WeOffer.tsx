import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/Reveal";
import { SardegnaDecoration } from "@/components/ui/SardegnaDecoration";

export default async function WeOffer() {
  const t = await getTranslations("weOffer");

  const features = [
    {
      icon: "/images/icons/grano.svg",
      titleKey: "tradition.title" as const,
      descriptionKey: "tradition.description" as const,
    },
    {
      icon: "/images/icons/pesce.svg",
      titleKey: "fish.title" as const,
      descriptionKey: "fish.description" as const,
    },
    {
      icon: "/images/icons/vino.svg",
      titleKey: "wines.title" as const,
      descriptionKey: "wines.description" as const,
    },
  ];

  const menuCards = [
    {
      titleKey: "cards.kitchen" as const,
      image: "/images/gallery/27.webp",
    },
    {
      titleKey: "cards.wines" as const,
      image: "/images/gallery/17.webp",
    },
  ];
  return (
    <section className="section-padding bg-[var(--color-background)] relative overflow-hidden">
      <SardegnaDecoration 
        className="top-1/2 -right-32 -translate-y-1/2 w-[500px] h-[700px] rotate-12"
        opacity={0.08}
      />
      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <Reveal className="subtitle-decorator justify-center mb-4">
            {t("subtitle")}
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-white">
              {t("title")}
            </h2>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <Reveal
              key={feature.titleKey}
              delay={index * 0.1}
              className="text-center group"
            >
              <div className="relative inline-flex items-center justify-center w-40 h-52 mb-6">
                <Image
                  src="/images/siloutte-sar.svg"
                  alt=""
                  fill
                  sizes="160px"
                  className="object-contain opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                />
                <Image
                  src={feature.icon}
                  alt=""
                  width={50}
                  height={50}
                  className="relative z-10 -mt-2 ml-2"
                />
              </div>

              <h3 className="text-xl text-white mb-4 font-[var(--font-display)]">
                {t(feature.titleKey)}
              </h3>

              <p className="text-[var(--color-text-muted)] leading-relaxed">
                {t(feature.descriptionKey)}
              </p>
            </Reveal>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-20 max-w-4xl mx-auto">
          {menuCards.map((card, index) => (
            <Reveal
              key={card.titleKey}
              delay={index * 0.15}
            >
              <div className="group block relative overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={card.image}
                    alt={t(card.titleKey)}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:bg-black/60" />
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                    <h3 className="text-2xl text-white font-[var(--font-display)] mb-3">
                      {t(card.titleKey)}
                    </h3>
                  </div>

                  <div className="absolute inset-4 border border-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
