"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const iconMap = {
  map: MapPin,
  phone: Phone,
  mail: Mail,
  clock: Clock,
};

interface ContactInfoItem {
  iconName: string;
  labelKey: string;
  content: string;
  link: string | null;
}

interface ContactInfoCardsProps {
  items: ContactInfoItem[];
}

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

export default function ContactInfoCards({ items }: ContactInfoCardsProps) {
  const t = useTranslations("contact");

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
    >
      {items.map((info) => {
        const Icon = iconMap[info.iconName as keyof typeof iconMap] || MapPin;
        
        return (
          <motion.div
            key={info.labelKey}
            variants={fadeInUp}
            className="p-6 bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/50 transition-all duration-500 group"
          >
            <div className="w-12 h-12 bg-[var(--color-primary)]/10 flex items-center justify-center mb-4 group-hover:bg-[var(--color-primary)]/20 transition-colors">
              <Icon className="w-6 h-6 text-[var(--color-primary)]" />
            </div>
            <h3 className="font-[var(--font-display)] text-lg text-white mb-2">
              {t(`info.${info.labelKey}`)}
            </h3>
            {info.link ? (
              <a
                href={info.link}
                target={info.link.startsWith("http") ? "_blank" : undefined}
                rel={info.link.startsWith("http") ? "noopener noreferrer" : undefined}
                className="text-[var(--color-text-muted)] text-sm whitespace-pre-line hover:text-[var(--color-primary)] transition-colors"
              >
                {info.content}
              </a>
            ) : (
              <p className="text-[var(--color-text-muted)] text-sm whitespace-pre-line">
                {info.content}
              </p>
            )}
          </motion.div>
        );
      })}
    </motion.div>
  );
}
