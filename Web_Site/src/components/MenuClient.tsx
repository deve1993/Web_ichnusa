"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface MenuCategory {
  id: string;
  title: string;
  slug: string;
  description?: string;
  order: number;
}

interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: MenuCategory | string;
  allergens?: string[];
  isAvailable: boolean;
  isSpecial?: boolean;
}

interface MenuClientProps {
  categories: MenuCategory[];
  items: MenuItem[];
}

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

const categoryIcons: Record<string, string> = {
  antipasti: "🥗",
  "pasta-risotto": "🍝",
  secondi: "🥩",
  insalate: "🥬",
  dolci: "🍰",
  default: "🍽️",
};

const allergenLabels: Record<string, string> = {
  gluten: "Glutine",
  lactose: "Lattosio",
  eggs: "Uova",
  fish: "Pesce",
  shellfish: "Crostacei",
  nuts: "Frutta a guscio",
  peanuts: "Arachidi",
  soy: "Soia",
  celery: "Sedano",
  mustard: "Senape",
  sesame: "Sesamo",
  sulfites: "Solfiti",
  lupin: "Lupini",
  molluscs: "Molluschi",
};

export default function MenuClient({ categories, items }: MenuClientProps) {
  const t = useTranslations("menu");
  const tItems = useTranslations("menuItems");

  const getItemTranslation = (itemId: string) => {
    try {
      const name = tItems(`${itemId}.name`);
      if (!name || name.includes('.name')) return null;
      
      let description: string | undefined;
      try {
        const desc = tItems(`${itemId}.description`);
        if (desc && !desc.includes('.description')) {
          description = desc;
        }
      } catch {
        /* noop */
      }
      
      return { name, description };
    } catch {
      return null;
    }
  };

  const defaultCategory = categories[0]?.slug || "antipasti";
  const [activeCategory, setActiveCategory] = useState<string>(defaultCategory);

  const getItemsForCategory = (categorySlug: string) => {
    return items.filter((item) => {
      const cat = typeof item.category === "object" ? item.category.slug : item.category;
      return cat === categorySlug;
    });
  };

  const getCategoryIcon = (slug: string) => categoryIcons[slug] || categoryIcons.default;

  const formatPrice = (price: number) => {
    if (price === 0) return t("marketPrice");
    return `${price},-`;
  };

  const currentCategory = categories.find((c) => c.slug === activeCategory);
  const currentItems = getItemsForCategory(activeCategory);

  return (
    <section className="section-padding bg-[var(--color-background)]">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row gap-12">
          <aside className="lg:w-64 flex-shrink-0">
            <div className="lg:sticky lg:top-32">
              <h3 className="font-[var(--font-display)] text-xl text-white mb-6 hidden lg:block">
                {t("categories")}
              </h3>
              <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.slug)}
                    className={`flex items-center gap-3 px-4 py-3 text-left whitespace-nowrap transition-all duration-300 border ${
                      activeCategory === cat.slug
                        ? "bg-[var(--color-primary)] border-[var(--color-primary)] text-[var(--color-background)]"
                        : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-primary)] hover:text-white"
                    }`}
                  >
                    <span className="text-xl">{getCategoryIcon(cat.slug)}</span>
                    <span className="text-sm uppercase tracking-wider">{cat.title}</span>
                  </button>
                ))}
              </nav>

              <div className="hidden lg:block mt-8 p-6 bg-[var(--color-surface)] border border-[var(--color-border)]">
                <p className="text-sm text-[var(--color-text-muted)] mb-4">
                  <strong className="text-white">MP</strong> = {t("marketPrice")}
                </p>
                <p className="text-xs text-[var(--color-text-muted)]">
                  {t("priceNote")}
                </p>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <motion.div
              key={activeCategory}
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="mb-8"
            >
              <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-2">
                <span className="text-4xl">{getCategoryIcon(activeCategory)}</span>
                <h2 className="font-[var(--font-display)] text-4xl text-white">
                  {currentCategory?.title || activeCategory}
                </h2>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                className="h-[2px] w-24 bg-[var(--color-primary)]"
              />
              {currentCategory?.description && (
                <motion.p variants={fadeInUp} className="text-[var(--color-text-muted)] mt-4">
                  {currentCategory.description}
                </motion.p>
              )}
            </motion.div>

            {currentItems.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-[var(--color-text-muted)]">{t("noItems")}</p>
              </div>
            ) : (
              <motion.div
                key={`items-${activeCategory}`}
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="space-y-1"
              >
                {currentItems.map((item) => {
                  const translation = getItemTranslation(item.id);
                  
                  return (
                    <motion.div
                      key={item.id}
                      variants={fadeInUp}
                      className="group p-6 border-b border-[var(--color-border)] hover:bg-[var(--color-surface)]/50 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-[var(--font-display)] text-base text-white group-hover:text-[var(--color-primary)] transition-colors">
                              {item.name}
                            </h3>
                            {item.isSpecial && (
                              <span className="px-2 py-0.5 text-xs bg-[var(--color-primary)] text-[var(--color-background)]">
                                {t("special")}
                              </span>
                            )}
                          </div>
                          {translation?.description && (
                            <p className="text-[var(--color-text-muted)] text-sm mt-1">
                              {translation.description}
                            </p>
                          )}
                          {item.allergens && item.allergens.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {item.allergens.map((allergen) => (
                                <span
                                  key={allergen}
                                  className="text-xs px-2 py-0.5 bg-[var(--color-surface)] text-[var(--color-text-muted)] border border-[var(--color-border)]"
                                  title={allergenLabels[allergen] || allergen}
                                >
                                  {allergenLabels[allergen] || allergen}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex-shrink-0">
                          <span className="font-[var(--font-display)] text-xl text-[var(--color-primary)]">
                            {formatPrice(item.price)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
