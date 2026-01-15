"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MenuItemCard } from "@/components/ui/AnimatedCard";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { useTranslations } from "next-intl";

interface MenuItem {
  name: string;
  description: string;
  price: string;
  image: string;
  badge?: string;
}

type MenuTabKey = "antipasti" | "primi" | "secondi" | "wines";

const menuTabKeys: MenuTabKey[] = ["antipasti", "primi", "secondi", "wines"];

const menuItems: Record<MenuTabKey, MenuItem[]> = {
  antipasti: [
    {
      name: "Tagliere Sardo",
      description: "Selezione di salumi e formaggi sardi: prosciutto crudo, salsiccia sarda, pecorino stagionato e fresco.",
      price: "320 Kč",
      image: "/images/food/greek-salad.jpg",
      badge: "Da Condividere",
    },
    {
      name: "Pane Frattau",
      description: "Pane carasau ammorbidito con brodo, pomodoro, uovo in camicia e pecorino grattugiato.",
      price: "195 Kč",
      image: "/images/food/lasagne.jpg",
    },
    {
      name: "Bottarga di Muggine",
      description: "Bottarga di Cabras affettata sottile con carciofi freschi e olio extravergine sardo.",
      price: "285 Kč",
      image: "/images/food/pumpkin.jpg",
      badge: "Specialità",
    },
    {
      name: "Polpo alla Griglia",
      description: "Polpo grigliato con patate, olive taggiasche e prezzemolo fresco.",
      price: "265 Kč",
      image: "/images/food/wagyu.jpg",
    },
    {
      name: "Culurgiones Fritti",
      description: "Ravioli sardi fritti ripieni di patate, menta e pecorino, serviti con salsa al pomodoro.",
      price: "185 Kč",
      image: "/images/food/olivas.jpg",
    },
    {
      name: "Bruschetta Sarda",
      description: "Pane carasau croccante con pomodorini, bottarga e basilico fresco.",
      price: "145 Kč",
      image: "/images/food/fish.jpg",
    },
  ],
  primi: [
    {
      name: "Malloreddus alla Campidanese",
      description: "Gnocchetti sardi con ragù di salsiccia, zafferano e pecorino. Il piatto simbolo della Sardegna.",
      price: "245 Kč",
      image: "/images/food/lasagne.jpg",
      badge: "Tradizionale",
    },
    {
      name: "Spaghetti alla Bottarga",
      description: "Spaghetti con bottarga di muggine, aglio, olio extravergine e prezzemolo.",
      price: "285 Kč",
      image: "/images/food/fish.jpg",
    },
    {
      name: "Culurgiones de Ogliastra",
      description: "Ravioli sardi DOP ripieni di patate, pecorino e menta, conditi con sugo di pomodoro fresco.",
      price: "235 Kč",
      image: "/images/food/pumpkin.jpg",
      badge: "DOP",
    },
    {
      name: "Fregola con Arselle",
      description: "Pasta sarda tostata con vongole fresche, pomodorini e prezzemolo.",
      price: "275 Kč",
      image: "/images/food/greek-salad.jpg",
    },
  ],
  secondi: [
    {
      name: "Porceddu Arrosto",
      description: "Maialino sardo arrosto lentamente con mirto e erbe aromatiche. Croccante fuori, tenero dentro.",
      price: "385 Kč",
      image: "/images/food/wagyu.jpg",
      badge: "Chef Consiglia",
    },
    {
      name: "Pesce del Giorno",
      description: "Pesce fresco alla griglia con verdure di stagione e patate al forno. Chiedere al cameriere.",
      price: "345 Kč",
      image: "/images/food/fish.jpg",
    },
    {
      name: "Agnello con Carciofi",
      description: "Costolette di agnello sardo con carciofi alla romana e patate arrosto.",
      price: "365 Kč",
      image: "/images/food/olivas.jpg",
    },
    {
      name: "Filetto al Cannonau",
      description: "Filetto di manzo con riduzione di Cannonau, funghi porcini e polenta cremosa.",
      price: "425 Kč",
      image: "/images/food/wagyu.jpg",
      badge: "Premium",
    },
  ],
  wines: [
    {
      name: "Cannonau di Sardegna DOC",
      description: "Vino rosso corposo con note di frutti di bosco e spezie. Perfetto con carni e formaggi stagionati.",
      price: "95 Kč / calice",
      image: "/images/food/pumpkin.jpg",
      badge: "Nostro Vino",
    },
    {
      name: "Vermentino di Gallura DOCG",
      description: "Vino bianco fresco e minerale, ideale con pesce e antipasti di mare.",
      price: "85 Kč / calice",
      image: "/images/food/olivas.jpg",
    },
    {
      name: "Carignano del Sulcis DOC",
      description: "Rosso intenso con note di ciliegia matura e macchia mediterranea.",
      price: "90 Kč / calice",
      image: "/images/food/greek-salad.jpg",
    },
    {
      name: "Mirto di Sardegna",
      description: "Liquore tradizionale sardo a base di bacche di mirto. Digestivo perfetto.",
      price: "75 Kč",
      image: "/images/food/lasagne.jpg",
      badge: "Digestivo",
    },
  ],
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Menu() {
  const t = useTranslations("menu");
  const [activeTab, setActiveTab] = useState<MenuTabKey>("antipasti");

  return (
    <section id="menu" className="section-padding bg-[var(--color-background-alt)]">
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <motion.div variants={itemVariants} className="subtitle-decorator justify-center mb-4">
              {t("subtitle")}
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-white">
              {t("title")}
            </motion.h2>
          </div>

          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-12">
            {menuTabKeys.map((tabKey) => (
              <button
                key={tabKey}
                onClick={() => setActiveTab(tabKey)}
                className={`px-6 py-3 font-[var(--font-display)] text-lg tracking-wide uppercase transition-all duration-300 border relative overflow-hidden ${
                  activeTab === tabKey
                    ? "bg-[var(--color-primary)] text-[var(--color-background)] border-[var(--color-primary)]"
                    : "text-white border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                }`}
              >
                {t(tabKey)}
              </button>
            ))}
          </motion.div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 gap-x-16 gap-y-8"
          >
            {menuItems[activeTab].map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <MenuItemCard
                  title={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                  badge={item.badge}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="text-[var(--color-text-muted)] mb-6 font-[var(--font-display)]">
            {t("openDaily")}
          </div>
          <AnimatedButton href="/menu" variant="doubleText">
            {t("fullMenu")}
          </AnimatedButton>
        </motion.div>
      </div>
    </section>
  );
}
