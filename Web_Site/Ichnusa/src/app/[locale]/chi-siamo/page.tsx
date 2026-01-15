"use client";

import { motion } from "framer-motion";
import Image from "next/image";
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

const values = [
  {
    title: "Tradizione",
    description: "Piatti tramandati di generazione in generazione, preparati con le ricette autentiche della Sardegna.",
    icon: "🏺",
  },
  {
    title: "Qualità",
    description: "Ingredienti selezionati e importati direttamente dalla Sardegna per garantire autenticità.",
    icon: "⭐",
  },
  {
    title: "Passione",
    description: "Ogni piatto è preparato con amore e dedizione, come se foste ospiti a casa nostra.",
    icon: "❤️",
  },
  {
    title: "Accoglienza",
    description: "L'atmosfera calda e familiare della Sardegna, nel cuore di Praga.",
    icon: "🤝",
  },
];

const team = [
  {
    name: "Marco Ferrara",
    role: "Executive Chef",
    image: "/images/chefs/chef-1.jpg",
    description: "Nato in Sardegna, porta 20 anni di esperienza nella cucina tradizionale sarda.",
  },
  {
    name: "Giuseppe Mura",
    role: "Sous Chef",
    image: "/images/chefs/chef-2.jpg",
    description: "Specializzato in pesce fresco e frutti di mare, con tecniche moderne e rispetto della tradizione.",
  },
  {
    name: "Anna Piras",
    role: "Pastry Chef",
    image: "/images/chefs/chef-3.jpg",
    description: "Maestra dei dolci sardi, dalle seadas ai pardulas, con un tocco di creatività contemporanea.",
  },
];

export default function ChiSiamoPage() {
  const [storyRef, storyInView] = useInViewport({ threshold: 0.2 });
  const [valuesRef, valuesInView] = useInViewport({ threshold: 0.2 });
  const [teamRef, teamInView] = useInViewport({ threshold: 0.2 });

  return (
    <>
      <Header />
      <main>
        <PageHero
          title="Chi Siamo"
          subtitle="La nostra storia, la nostra passione per la cucina sarda autentica"
          backgroundImage="/images/restaurant/interior.jpg"
          breadcrumbs={[{ label: "Chi Siamo", href: "/chi-siamo" }]}
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
                  <span className="text-sm uppercase tracking-wider">Anni di Esperienza</span>
                </motion.div>
              </motion.div>

              <motion.div variants={fadeInUp} className="lg:pl-8">
                <span className="subtitle-decorator mb-4">La Nostra Storia</span>
                <h2 className="font-[var(--font-display)] text-4xl md:text-5xl text-white mb-6">
                  Un Angolo di <span className="text-[var(--color-primary)]">Sardegna</span> a Praga
                </h2>
                <div className="space-y-4 text-[var(--color-text-muted)]">
                  <p>
                    Ichnusa Botega & Bistro nasce dalla passione per la cucina sarda e dal desiderio 
                    di portare i sapori autentici della nostra terra nel cuore di Praga.
                  </p>
                  <p>
                    Nel nostro ristorante troverete l&apos;atmosfera calda e accogliente tipica della 
                    Sardegna, dove ogni piatto racconta una storia di tradizione e territorio. 
                    Importiamo direttamente dall&apos;isola i migliori ingredienti: formaggi stagionati, 
                    salumi artigianali, pasta fresca e vini pregiati.
                  </p>
                  <p>
                    Il nostro locale si sviluppa su due piani, offrendo un&apos;atmosfera intima e 
                    rilassata, perfetta per una cena romantica o un pranzo in famiglia. 
                    All&apos;interno troverete anche una piccola bottega dove acquistare i prodotti 
                    sardi che potete assaggiare nel nostro menu.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6 mt-8 pt-8 border-t border-[var(--color-border)]">
                  <div>
                    <span className="text-3xl font-[var(--font-display)] text-[var(--color-primary)]">100%</span>
                    <p className="text-sm text-[var(--color-text-muted)] mt-1">Ingredienti Importati dalla Sardegna</p>
                  </div>
                  <div>
                    <span className="text-3xl font-[var(--font-display)] text-[var(--color-primary)]">50+</span>
                    <p className="text-sm text-[var(--color-text-muted)] mt-1">Etichette di Vini Sardi</p>
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
                I Nostri Valori
              </motion.span>
              <motion.h2 variants={fadeInUp} className="font-[var(--font-display)] text-4xl md:text-5xl text-white">
                Cosa Ci <span className="text-[var(--color-primary)]">Guida</span>
              </motion.h2>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={valuesInView ? "visible" : "hidden"}
              variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {values.map((value) => (
                <motion.div
                  key={value.title}
                  variants={fadeInUp}
                  className="group p-8 bg-[var(--color-background)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/50 transition-all duration-500"
                >
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="font-[var(--font-display)] text-xl text-white mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">
                    {value.description}
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
                Il Nostro Team
              </motion.span>
              <motion.h2 variants={fadeInUp} className="font-[var(--font-display)] text-4xl md:text-5xl text-white">
                I <span className="text-[var(--color-primary)]">Maestri</span> della Cucina
              </motion.h2>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={teamInView ? "visible" : "hidden"}
              variants={staggerContainer}
              className="grid md:grid-cols-3 gap-8"
            >
              {team.map((member) => (
                <motion.div
                  key={member.name}
                  variants={fadeInUp}
                  className="group"
                >
                  <div className="relative aspect-[3/4] overflow-hidden mb-6">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="h-1 w-12 bg-[var(--color-primary)] mb-4 transform origin-left transition-all duration-500 group-hover:w-20" />
                    </div>
                  </div>
                  <h3 className="font-[var(--font-display)] text-2xl text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-[var(--color-primary)] text-sm uppercase tracking-wider mb-3">
                    {member.role}
                  </p>
                  <p className="text-[var(--color-text-muted)] text-sm">
                    {member.description}
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
              <span className="subtitle-decorator justify-center mb-4">Vieni a Trovarci</span>
              <h2 className="font-[var(--font-display)] text-4xl md:text-5xl text-white mb-6">
                Prenota il Tuo <span className="text-[var(--color-primary)]">Tavolo</span>
              </h2>
              <p className="text-[var(--color-text-muted)] mb-8">
                Ti aspettiamo per farti vivere un&apos;esperienza culinaria unica, 
                dove ogni boccone ti trasporterà nelle terre della Sardegna.
              </p>
              <a
                href="https://reservation.dish.co/widget/hydra-7cc98a90-5678-11ec-bb8e-d7389d5eaae1"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex"
              >
                Prenota Ora
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
