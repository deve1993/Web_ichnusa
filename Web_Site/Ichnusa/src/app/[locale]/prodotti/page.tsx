"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
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
    transition: { staggerChildren: 0.1 },
  },
};

const categories = [
  { id: "all", label: "Tutti" },
  { id: "formaggi", label: "Formaggi" },
  { id: "salumi", label: "Salumi" },
  { id: "pasta", label: "Pasta" },
  { id: "vini", label: "Vini" },
  { id: "dolci", label: "Dolci" },
];

const products = [
  {
    id: 1,
    name: "Pecorino Sardo DOP",
    category: "formaggi",
    description: "Formaggio stagionato di pecora, dal sapore intenso e leggermente piccante.",
    price: "Da €18/kg",
    image: "/images/food/greek-salad.jpg",
  },
  {
    id: 2,
    name: "Casu Marzu",
    category: "formaggi",
    description: "Il famoso formaggio sardo con larve, per i veri intenditori.",
    price: "Su richiesta",
    image: "/images/food/olivas.jpg",
  },
  {
    id: 3,
    name: "Prosciutto di Cinghiale",
    category: "salumi",
    description: "Stagionato 18 mesi, dal sapore selvatico e delicato.",
    price: "Da €35/kg",
    image: "/images/food/wagyu.jpg",
  },
  {
    id: 4,
    name: "Salsiccia Sarda",
    category: "salumi",
    description: "Preparata con carne di maiale sardo e finocchietto selvatico.",
    price: "Da €22/kg",
    image: "/images/food/fish.jpg",
  },
  {
    id: 5,
    name: "Malloreddus",
    category: "pasta",
    description: "Gli gnocchetti sardi tradizionali, perfetti con il ragù di salsiccia.",
    price: "€6.50/500g",
    image: "/images/food/lasagne.jpg",
  },
  {
    id: 6,
    name: "Fregola",
    category: "pasta",
    description: "Pasta di semola tostata, ideale con arselle e bottarga.",
    price: "€7.00/500g",
    image: "/images/food/pumpkin.jpg",
  },
  {
    id: 7,
    name: "Cannonau DOC",
    category: "vini",
    description: "Vino rosso corposo, prodotto nelle nostre vigne in Sardegna.",
    price: "Da €18/bottiglia",
    image: "/images/menu/drinks.jpg",
  },
  {
    id: 8,
    name: "Vermentino di Gallura",
    category: "vini",
    description: "Bianco fresco e minerale, perfetto con il pesce.",
    price: "Da €16/bottiglia",
    image: "/images/menu/appetizers.jpg",
  },
  {
    id: 9,
    name: "Seadas",
    category: "dolci",
    description: "Ravioli fritti ripieni di formaggio, con miele amaro.",
    price: "€12.00/4pz",
    image: "/images/menu/breakfast.jpg",
  },
  {
    id: 10,
    name: "Torrone Sardo",
    category: "dolci",
    description: "Con mandorle e miele di corbezzolo, ricetta tradizionale.",
    price: "€8.50/200g",
    image: "/images/food/special-dish.jpg",
  },
];

export default function ProdottiPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [introRef, introInView] = useInViewport({ threshold: 0.2 });
  const [productsRef, productsInView] = useInViewport({ threshold: 0.1 });

  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <>
      <Header />
      <main>
        <PageHero
          title="I Nostri Prodotti"
          subtitle="Autentici sapori sardi, importati direttamente dall'isola"
          backgroundImage="/images/food/special-dish.jpg"
          breadcrumbs={[{ label: "Prodotti", href: "/prodotti" }]}
        />

        <section ref={introRef} className="section-padding bg-[var(--color-background)]">
          <div className="container-custom">
            <motion.div
              initial="hidden"
              animate={introInView ? "visible" : "hidden"}
              variants={staggerContainer}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <motion.div variants={fadeInUp}>
                <span className="subtitle-decorator mb-4">La Nostra Bottega</span>
                <h2 className="font-[var(--font-display)] text-4xl md:text-5xl text-white mb-6">
                  Porta la <span className="text-[var(--color-primary)]">Sardegna</span> a Casa Tua
                </h2>
                <div className="space-y-4 text-[var(--color-text-muted)]">
                  <p>
                    All&apos;interno del nostro ristorante troverai una piccola bottega dove 
                    puoi acquistare tutti i prodotti che assaggi nel nostro menu.
                  </p>
                  <p>
                    Formaggi stagionati, salumi artigianali, pasta fresca, vini pregiati 
                    e dolci tradizionali: tutto importato direttamente dalla Sardegna, 
                    selezionato personalmente dai nostri chef.
                  </p>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src="/images/food/olivas.jpg"
                        alt="Prodotti sardi"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src="/images/food/wagyu.jpg"
                        alt="Salumi sardi"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="space-y-4 pt-8">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src="/images/menu/drinks.jpg"
                        alt="Vini sardi"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src="/images/food/greek-salad.jpg"
                        alt="Formaggi sardi"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section ref={productsRef} className="section-padding bg-[var(--color-surface)]">
          <div className="container-custom">
            <motion.div
              initial="hidden"
              animate={productsInView ? "visible" : "hidden"}
              variants={staggerContainer}
              className="text-center mb-12"
            >
              <motion.span variants={fadeInUp} className="subtitle-decorator justify-center mb-4">
                Catalogo
              </motion.span>
              <motion.h2 variants={fadeInUp} className="font-[var(--font-display)] text-4xl md:text-5xl text-white mb-8">
                Esplora i Nostri <span className="text-[var(--color-primary)]">Prodotti</span>
              </motion.h2>

              <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-6 py-2 text-sm uppercase tracking-wider transition-all duration-300 border ${
                      activeCategory === cat.id
                        ? "bg-[var(--color-primary)] border-[var(--color-primary)] text-[var(--color-background)]"
                        : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </motion.div>
            </motion.div>

            <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="group bg-[var(--color-background)] border border-[var(--color-border)] overflow-hidden hover:border-[var(--color-primary)]/50 transition-all duration-500"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute top-4 left-4">
                        <span className="bg-[var(--color-primary)] text-[var(--color-background)] text-xs uppercase tracking-wider px-3 py-1">
                          {categories.find(c => c.id === product.category)?.label}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-[var(--font-display)] text-xl text-white mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-[var(--color-text-muted)] text-sm mb-4 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-[var(--color-primary)] font-medium">
                          {product.price}
                        </span>
                        <button className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">
                          Dettagli →
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        <section className="section-padding bg-[var(--color-background)]">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-[var(--color-surface)] border border-[var(--color-border)] p-8 md:p-12 text-center"
            >
              <h3 className="font-[var(--font-display)] text-3xl text-white mb-4">
                Ordini Speciali
              </h3>
              <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto mb-6">
                Cerchi un prodotto specifico della Sardegna? Contattaci per ordini speciali 
                e importazioni su richiesta. Possiamo procurare qualsiasi specialità sarda.
              </p>
              <Link
                href="/contatti"
                className="btn-primary inline-flex"
              >
                Contattaci
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
