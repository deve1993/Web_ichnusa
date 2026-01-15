"use client";

import { useState } from "react";
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
    transition: { staggerChildren: 0.08 },
  },
};

const menuCategories = [
  { id: "antipasti", label: "Antipasti", icon: "🥗" },
  { id: "primi", label: "Primi Piatti", icon: "🍝" },
  { id: "secondi", label: "Secondi", icon: "🥩" },
  { id: "pesce", label: "Pesce", icon: "🐟" },
  { id: "contorni", label: "Contorni", icon: "🥬" },
  { id: "dolci", label: "Dolci", icon: "🍰" },
];

const menuItems = {
  antipasti: [
    { name: "Antipasto Sardo Misto", description: "Selezione di salumi, formaggi, olive e pane carasau", price: "€18" },
    { name: "Culurgiones Fritti", description: "Ravioli sardi ripieni di patate, pecorino e menta", price: "€14" },
    { name: "Bottarga di Muggine", description: "Affettata sottile con olio EVO e crostini", price: "€16" },
    { name: "Porceddu al Taglio", description: "Maialino da latte arrosto, servito tiepido", price: "€15" },
    { name: "Cozze alla Marinara", description: "Cozze fresche con pomodoro, aglio e prezzemolo", price: "€13" },
    { name: "Carpaccio di Polpo", description: "Con patate, sedano e olive taggiasche", price: "€16" },
  ],
  primi: [
    { name: "Malloreddus alla Campidanese", description: "Gnocchetti sardi con ragù di salsiccia e zafferano", price: "€16" },
    { name: "Fregola con Arselle", description: "Pasta tostata con vongole veraci e pomodorini", price: "€18" },
    { name: "Culurgiones de Ogliastra", description: "Ravioli ripieni di patate, menta e pecorino", price: "€15" },
    { name: "Spaghetti alla Bottarga", description: "Con bottarga di muggine grattugiata", price: "€17" },
    { name: "Zuppa Gallurese", description: "Pane raffermo, brodo di carne e pecorino", price: "€14" },
    { name: "Ravioli di Ricotta e Spinaci", description: "Con burro fuso e salvia", price: "€14" },
  ],
  secondi: [
    { name: "Porceddu Arrosto", description: "Maialino da latte cotto al mirto, con patate", price: "€26" },
    { name: "Agnello al Cannonau", description: "Stufato lentamente nel vino rosso sardo", price: "€24" },
    { name: "Cinghiale in Umido", description: "Con olive nere e mirto selvatico", price: "€22" },
    { name: "Bistecca di Manzo Sardo", description: "Carne bovina sarda, 400g, con rosmarino", price: "€28" },
    { name: "Cordula con Piselli", description: "Interiora di agnello alla sarda", price: "€18" },
  ],
  pesce: [
    { name: "Pesce del Giorno", description: "Chiedi al cameriere la selezione di oggi", price: "€MP" },
    { name: "Grigliata Mista di Mare", description: "Gamberi, calamari, pesce spada e verdure", price: "€32" },
    { name: "Aragosta alla Catalana", description: "Con pomodori, cipolla e olive (min. 500g)", price: "€MP" },
    { name: "Zuppa di Pesce alla Sarda", description: "Con pane carasau tostato", price: "€24" },
    { name: "Tonno alla Carlofortina", description: "Stile San Pietro, con capperi e pomodori", price: "€22" },
    { name: "Burrida alla Cagliaritana", description: "Gattuccio marinato con salsa di noci", price: "€20" },
  ],
  contorni: [
    { name: "Patate al Forno", description: "Con rosmarino e aglio", price: "€6" },
    { name: "Verdure Grigliate", description: "Di stagione, con olio EVO", price: "€7" },
    { name: "Insalata Mista", description: "Pomodori, lattuga, carote", price: "€5" },
    { name: "Carciofi alla Sarda", description: "Trifolati con aglio e prezzemolo", price: "€8" },
    { name: "Fave con Lardo", description: "Fave fresche stufate con lardo di Colonnata", price: "€8" },
  ],
  dolci: [
    { name: "Seadas", description: "Ravioli fritti con formaggio e miele amaro", price: "€9" },
    { name: "Pardulas", description: "Dolcetti di ricotta con zafferano", price: "€7" },
    { name: "Tiramisù della Casa", description: "Ricetta tradizionale con mascarpone", price: "€8" },
    { name: "Sebadas al Mirto", description: "Variante con liquore al mirto", price: "€10" },
    { name: "Selezione di Formaggi", description: "Pecorino sardo DOP di diverse stagionature", price: "€14" },
    { name: "Gelato Artigianale", description: "Tre gusti a scelta", price: "€6" },
  ],
};

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("antipasti");
  const [headerRef, headerInView] = useInViewport({ threshold: 0.2 });

  return (
    <>
      <Header />
      <main>
        <PageHero
          title="Il Nostro Menu"
          subtitle="Piatti tradizionali sardi preparati con ingredienti autentici"
          backgroundImage="/images/food/lasagne.jpg"
          breadcrumbs={[{ label: "Menu", href: "/menu" }]}
        />

        <section className="section-padding bg-[var(--color-background)]">
          <div className="container-custom">
            <div className="flex flex-col lg:flex-row gap-12">
              <aside className="lg:w-64 flex-shrink-0">
                <div className="lg:sticky lg:top-32">
                  <h3 className="font-[var(--font-display)] text-xl text-white mb-6 hidden lg:block">
                    Categorie
                  </h3>
                  <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0">
                    {menuCategories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`flex items-center gap-3 px-4 py-3 text-left whitespace-nowrap transition-all duration-300 border ${
                          activeCategory === cat.id
                            ? "bg-[var(--color-primary)] border-[var(--color-primary)] text-[var(--color-background)]"
                            : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-primary)] hover:text-white"
                        }`}
                      >
                        <span className="text-xl">{cat.icon}</span>
                        <span className="text-sm uppercase tracking-wider">{cat.label}</span>
                      </button>
                    ))}
                  </nav>

                  <div className="hidden lg:block mt-8 p-6 bg-[var(--color-surface)] border border-[var(--color-border)]">
                    <p className="text-sm text-[var(--color-text-muted)] mb-4">
                      <strong className="text-white">MP</strong> = Prezzo di Mercato
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      I prezzi possono variare. Comunica allergie o intolleranze al personale.
                    </p>
                  </div>
                </div>
              </aside>

              <div className="flex-1">
                <motion.div
                  ref={headerRef}
                  initial="hidden"
                  animate={headerInView ? "visible" : "hidden"}
                  variants={staggerContainer}
                  className="mb-8"
                >
                  <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-2">
                    <span className="text-4xl">
                      {menuCategories.find(c => c.id === activeCategory)?.icon}
                    </span>
                    <h2 className="font-[var(--font-display)] text-4xl text-white">
                      {menuCategories.find(c => c.id === activeCategory)?.label}
                    </h2>
                  </motion.div>
                  <motion.div
                    variants={fadeInUp}
                    className="h-[2px] w-24 bg-[var(--color-primary)]"
                  />
                </motion.div>

                <motion.div
                  key={activeCategory}
                  initial="hidden"
                  animate="visible"
                  variants={staggerContainer}
                  className="space-y-1"
                >
                  {menuItems[activeCategory as keyof typeof menuItems]?.map((item, index) => (
                    <motion.div
                      key={item.name}
                      variants={fadeInUp}
                      className="group p-6 border-b border-[var(--color-border)] hover:bg-[var(--color-surface)]/50 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-[var(--font-display)] text-xl text-white group-hover:text-[var(--color-primary)] transition-colors mb-1">
                            {item.name}
                          </h3>
                          <p className="text-[var(--color-text-muted)] text-sm">
                            {item.description}
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          <span className="font-[var(--font-display)] text-xl text-[var(--color-primary)]">
                            {item.price}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-[var(--color-surface)]">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative aspect-[4/3] overflow-hidden"
              >
                <Image
                  src="/images/menu/drinks.jpg"
                  alt="Carta dei vini"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="font-[var(--font-display)] text-3xl text-white mb-2">
                    Carta dei Vini
                  </h3>
                  <p className="text-[var(--color-text-muted)] mb-4">
                    Oltre 50 etichette sarde, incluso il nostro vino prodotto in Sardegna.
                  </p>
                  <span className="text-[var(--color-primary)] text-sm uppercase tracking-wider">
                    Chiedi al sommelier →
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative aspect-[4/3] overflow-hidden"
              >
                <Image
                  src="/images/food/fish.jpg"
                  alt="Menu degustazione"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="font-[var(--font-display)] text-3xl text-white mb-2">
                    Menu Degustazione
                  </h3>
                  <p className="text-[var(--color-text-muted)] mb-4">
                    Un viaggio attraverso i sapori della Sardegna in 7 portate.
                  </p>
                  <span className="text-[var(--color-primary)] text-sm uppercase tracking-wider">
                    €65 a persona →
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-[var(--color-background)]">
          <div className="container-custom text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-[var(--color-text-muted)] mb-6">
                Per allergie o intolleranze alimentari, comunicalo al nostro staff. 
                Possiamo adattare molti piatti alle tue esigenze.
              </p>
              <a
                href="https://reservation.dish.co/widget/hydra-7cc98a90-5678-11ec-bb8e-d7389d5eaae1"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex"
              >
                Prenota il Tuo Tavolo
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
