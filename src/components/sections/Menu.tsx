"use client";

import { useState } from "react";
import { MenuItemCard } from "@/components/ui/AnimatedCard";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";

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

export default function Menu() {
  const t = useTranslations("menu");
  const tItems = useTranslations("menuItems");
  const [activeTab, setActiveTab] = useState<MenuTabKey>("antipasti");

  return (
    <section id="menu" className="section-padding bg-[var(--color-background-alt)]">
      <div className="container-custom">
        <Reveal direction="up">
          <div className="text-center mb-12">
            <div className="subtitle-decorator justify-center mb-4">
              {t("subtitle")}
            </div>
            <h2 className="text-white">
              {t("title")}
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
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
          </div>
        </Reveal>

        <div
          key={activeTab}
          className="grid md:grid-cols-2 gap-x-16 gap-y-8"
          style={{ animation: "menuFadeIn 0.3s ease-out" }}
        >
          {menuItems[activeTab].map((item, index) => (
            <div
              key={item.id}
              style={{ opacity: 0, animation: `menuFadeIn 0.3s ease-out ${index * 0.1}s forwards` }}
            >
              <MenuItemCard
                title={tItems(`${item.id}.name`)}
                description={tItems(`${item.id}.description`)}
                price={item.price}
                index={index}
              />
            </div>
          ))}
        </div>

        <Reveal direction="up" className="text-center mt-16">
          <div className="text-[var(--color-text-muted)] mb-6 font-[var(--font-display)]">
            {t("openDaily")}
          </div>
          <AnimatedButton href="/menu" variant="doubleText">
            {t("fullMenu")}
          </AnimatedButton>
        </Reveal>
      </div>


    </section>
  );
}
