import { Link } from "@/i18n/navigation";
import { ChevronRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

interface CardData {
  titleKey: string;
  subtitleKey: string;
  descriptionKey: string;
  buttonKey: string;
  href: string;
  image: string;
}

function EventCard({ card, t }: { card: CardData; t: (key: string) => string }) {
  return (
    <Reveal
      className="relative h-[800px] flex items-center justify-center overflow-hidden"
    >
      <Image
        src={card.image}
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
        quality={80}
      />

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 flex items-center justify-center w-full h-full py-12">
        <Reveal
          direction="scale"
          delay={0.2}
          className="relative group transition-[filter,transform] duration-500 hover:scale-[1.03] hover:[filter:drop-shadow(0_30px_60px_rgba(0,0,0,0.6))]"
        >
          <div 
            className="relative flex flex-col items-center justify-center text-center transition-transform duration-500 group-hover:scale-105"
            style={{
              width: "720px",
              height: "980px",
            }}
          >
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: "url(/images/decorations/sard-clean.svg)",
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                filter: "brightness(0) opacity(0.75)",
              }}
            />

            <div className="relative z-10 px-20 py-12 flex flex-col items-center justify-center h-full translate-x-6">
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="w-6 h-[1px] bg-[var(--color-primary)]" />
                <span className="text-[var(--color-primary)] text-[11px] tracking-[0.25em] uppercase font-light">
                  {t(card.subtitleKey)}
                </span>
                <span className="w-6 h-[1px] bg-[var(--color-primary)]" />
              </div>

              <h3 className="text-2xl md:text-3xl text-white font-[var(--font-display)] mb-4 leading-tight">
                {t(card.titleKey)}
              </h3>

              <p className="text-[var(--color-text-muted)] text-sm leading-relaxed mb-6 max-w-[220px]">
                {t(card.descriptionKey)}
              </p>

              <Link
                href={card.href}
                className="inline-flex items-center gap-1.5 text-[var(--color-primary)] border border-[var(--color-primary)] px-5 py-2 hover:bg-[var(--color-primary)] hover:text-[var(--color-background)] transition-all duration-300 group/btn text-sm"
              >
                <span className="tracking-wider uppercase">
                  {t(card.buttonKey)}
                </span>
                <ChevronRight
                  size={14}
                  className="group-hover/btn:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </Reveal>
  );
}

export default async function InfoCards() {
  const t = await getTranslations("infoCards");
  const tCommon = await getTranslations("common");

  const cards: CardData[] = [
    {
      titleKey: "events.title",
      subtitleKey: "events.subtitle",
      descriptionKey: "events.description",
      buttonKey: "bookEvent",
      href: "/contatti",
      image: "/images/events/private-event.webp",
    },
  ];

  const getTranslation = (key: string) => {
    const commonKeys = ["bookEvent"];
    return commonKeys.includes(key) ? tCommon(key) : t(key);
  };

  return (
    <section className="py-0">
      <div className="grid">
        {cards.map((card) => (
          <EventCard key={card.titleKey} card={card} t={getTranslation} />
        ))}
      </div>
    </section>
  );
}
