"use client";

import { useTranslations } from "next-intl";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

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

export default function ContactInfoCards({ items }: ContactInfoCardsProps) {
  const t = useTranslations("contact");

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
      {items.map((info, index) => {
        const Icon = iconMap[info.iconName as keyof typeof iconMap] || MapPin;
        
        return (
          <Reveal key={info.labelKey} direction="up" delay={index * 0.1}>
            <div className="p-6 bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/50 transition-all duration-500 group">
              <div className="w-12 h-12 bg-[var(--color-primary)]/10 flex items-center justify-center mb-4 group-hover:bg-[var(--color-primary)]/20 transition-colors">
                <Icon className="w-6 h-6 text-[var(--color-primary)]" />
              </div>
              <h2 className="font-[var(--font-display)] text-lg text-white mb-2">
                {t(`info.${info.labelKey}`)}
              </h2>
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
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
