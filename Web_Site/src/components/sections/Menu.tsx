"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MenuItemCard } from "@/components/ui/AnimatedCard";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { useTranslations } from "next-intl";

interface MenuItemData {
  /** ID matching menuItems keys in translation files (a1, pr1, s1, d1, etc.) */
  id: string;
  price: string;
}

type MenuTabKey = "antipasti" | "pastaRisotto" | "secondi" | "dolci";

const menuTabKeys: MenuTabKey[] = ["antipasti", "pastaRisotto", "secondi", "dolci"];

const menuItems: Record<MenuTabKey, MenuItemData[]> = {
  antipasti: [
    { id: "a1", price: "535,-" },
    { id: "a2", price: "440,-" },
    { id: "a4", price: "470,-" },
    { id: "a5", price: "320,-" },
    { id: "a6", price: "455,-" },
    { id: "a3", price: "345,-" },
  ],
  pastaRisotto: [
    { id: "pr1", price: "620,-" },
    { id: "pr2", price: "430,-" },
    { id: "pr3", price: "390,-" },
    { id: "pr4", price: "425,-" },
    { id: "pr5", price: "450,-" },
    { id: "pr6", price: "375,-" },
  ],
  secondi: [
    { id: "s1", price: "635,-" },
    { id: "s2", price: "790,-" },
    { id: "s3", price: "655,-" },
    { id: "s4", price: "675,-" },
    { id: "s5", price: "690,-" },
  ],
  dolci: [
    { id: "d1", price: "255,-" },
    { id: "d2", price: "220,-" },
    { id: "d3", price: "215,-" },
    { id: "d4", price: "245,-" },
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
  const tItems = useTranslations("menuItems");
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
                key={item.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <MenuItemCard
                  title={tItems(`${item.id}.name`)}
                  description={tItems(`${item.id}.description`)}
                  price={item.price}
                  index={index}
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
