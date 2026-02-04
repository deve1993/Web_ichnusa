import { Heart, Wheat, Wine, Store } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const features = [
  {
    icon: Heart,
    title: "Passione Autentica",
    description:
      "Amore per la cucina sarda trasmesso in ogni piatto. Ricette di famiglia preparate con dedizione.",
  },
  {
    icon: Wheat,
    title: "Ingredienti Sardi",
    description:
      "Prodotti importati direttamente dalla Sardegna: formaggi, salumi, pasta e olio extravergine.",
  },
  {
    icon: Wine,
    title: "Vini di Proprietà",
    description:
      "Selezione unica di vini sardi, incluso il nostro Cannonau coltivato nella nostra vigna in Sardegna.",
  },
  {
    icon: Store,
    title: "Bottega Interna",
    description:
      "Porta a casa i sapori della Sardegna: acquista pasta, sughi, salumi, formaggi e vini nel nostro shop.",
  },
];

export default function WhyUs() {
  return (
    <section id="about" className="section-padding bg-[var(--color-background)]">
      <div className="container-custom">
        <div className="text-center mb-16">
          <Reveal direction="up" className="subtitle-decorator justify-center mb-4">
            Perché Sceglierci
          </Reveal>
          <Reveal direction="up" delay={0.1}>
            <h2 className="text-white">
              I Nostri Valori
            </h2>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Reveal
              key={feature.title}
              direction="up"
              delay={index * 0.1}
              className="text-center group"
            >
              <div className="relative inline-flex items-center justify-center w-28 h-28 mb-6">
                <div className="absolute inset-0 border border-[var(--color-border)] transition-all duration-500 group-hover:border-[var(--color-primary)] group-hover:rotate-45" />
                <feature.icon
                  size={36}
                  className="text-[var(--color-primary)] relative z-10"
                />
              </div>

              <h3 className="font-[var(--font-display)] text-xl text-white mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                {feature.title}
              </h3>

              <p className="text-[var(--color-text-muted)] text-sm">
                {feature.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
