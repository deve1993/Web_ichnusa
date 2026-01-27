"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import {
  Facebook,
  Instagram,
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronRight,
  Send,
} from "lucide-react";

const emailAddresses = [
  { label: "General", email: "info@ichnusa.restaurant" },
  { label: "Reservations", email: "reservations@ichnusa.restaurant" },
  { label: "Admin", email: "administrativa@ichnusa.restaurant" },
];

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/ichnusarestaurant", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/ichnusa_official_prague/", label: "Instagram" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  const quickLinks = [
    { label: tNav("home"), href: "/" },
    { label: tNav("about"), href: "/chi-siamo" },
    { label: tNav("menu"), href: "/menu" },
    { label: tNav("gallery"), href: "/galleria" },
    { label: tNav("contact"), href: "/contatti" },
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  return (
    <footer id="contact" className="bg-[var(--color-background-alt)]">
      <div className="container-custom">
        <motion.div
          className="py-16 border-b border-[var(--color-border)]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl md:text-3xl text-white font-[var(--font-display)] mb-2">
                Ricevi Novita e Offerte
              </h3>
              <p className="text-[var(--color-text-muted)]">
                Iscriviti alla newsletter per offerte esclusive
              </p>
            </div>

            <form
              onSubmit={handleNewsletterSubmit}
              className="flex w-full max-w-md"
            >
              <input
                type="email"
                placeholder="La tua email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-transparent border border-[var(--color-border)] border-r-0 px-6 py-4 text-white placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)]"
              />
              <button
                type="submit"
                className="bg-[var(--color-primary)] px-8 py-4 text-[var(--color-background)] hover:bg-[var(--color-primary-dark)] transition-colors flex items-center gap-2"
              >
                <span className="hidden sm:inline uppercase tracking-wider text-sm font-medium">
                  Iscriviti
                </span>
                <Send size={18} />
              </button>
            </form>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link href="/" className="inline-block mb-6">
              <div className="font-[var(--font-display)] text-2xl tracking-[0.15em] text-white">
                <span className="text-[var(--color-primary)]">ICHNUSA</span>
                <span className="block text-sm tracking-[0.3em] text-[var(--color-text-muted)] mt-1">
                  BOTEGA & BISTRO
                </span>
              </div>
            </Link>
            <p className="text-[var(--color-text-muted)] mb-6 leading-relaxed">
              {t("description")}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:bg-[var(--color-primary)] hover:text-[var(--color-background)] hover:border-[var(--color-primary)] transition-all"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-[var(--font-display)] text-xl text-white mb-6">
              {t("quickLinks")}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors group"
                  >
                    <ChevronRight
                      size={14}
                      className="text-[var(--color-primary)] group-hover:translate-x-1 transition-transform"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-[var(--font-display)] text-xl text-white mb-6">
              {t("contact")}
            </h4>
            <ul className="space-y-4">
              <li className="flex gap-4">
                <MapPin
                  size={20}
                  className="text-[var(--color-primary)] flex-shrink-0 mt-1"
                />
                <a 
                  href="https://maps.google.com/?q=Plaská+623/5,+150+00+Praha+5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
                >
                  Plaska 623/5
                  <br />
                  150 00 Mala Strana, Praha
                </a>
              </li>
              <li className="flex gap-4">
                <Phone
                  size={20}
                  className="text-[var(--color-primary)] flex-shrink-0"
                />
                <a
                  href="tel:+420605375012"
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
                >
                  +420 605 375 012
                </a>
              </li>
              {emailAddresses.map((item) => (
                <li key={item.email} className="flex gap-4">
                  <Mail
                    size={20}
                    className="text-[var(--color-primary)] flex-shrink-0"
                  />
                  <a
                    href={`mailto:${item.email}`}
                    className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors text-sm"
                  >
                    {item.email}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-[var(--font-display)] text-xl text-white mb-6">
              {t("hours")}
            </h4>
            <ul className="space-y-4">
              <li className="flex gap-4">
                <Clock
                  size={20}
                  className="text-[var(--color-primary)] flex-shrink-0 mt-1"
                />
                <div className="text-[var(--color-text-muted)]">
                  <span className="text-white block mb-1">Lunedi - Sabato</span>
                  11:30 - 15:00
                  <br />
                  16:00 - 22:00
                </div>
              </li>
              <li className="flex gap-4">
                <Clock
                  size={20}
                  className="text-[var(--color-primary)] flex-shrink-0 mt-1"
                />
                <div className="text-[var(--color-text-muted)]">
                  <span className="text-white block mb-1">Domenica</span>
                  11:00 - 15:00
                </div>
              </li>
            </ul>
          </motion.div>
        </div>

        <div className="border-t border-[var(--color-border)] py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[var(--color-text-muted)] text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} Ichnusa Botega & Bistro. {t("rights")}.
            </p>
            <div className="flex gap-6 text-sm text-[var(--color-text-muted)]">
              <Link
                href="/privacy"
                className="hover:text-[var(--color-primary)] transition-colors"
              >
                {t("privacy")}
              </Link>
              <Link
                href="/termini"
                className="hover:text-[var(--color-primary)] transition-colors"
              >
                {t("terms")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
