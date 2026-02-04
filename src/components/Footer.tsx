import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import {
  Facebook,
  Instagram,
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronRight,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import NewsletterForm from "@/components/NewsletterForm";

const emailAddresses = [
  { label: "General", email: "info@ichnusa.restaurant" },
  { label: "Reservations", email: "reservations@ichnusa.restaurant" },
];

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/ichnusarestaurant", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/ichnusa.bistro_prague/", label: "Instagram" },
];

export default async function Footer() {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");

  const quickLinks = [
    { label: tNav("home"), href: "/" },
    { label: tNav("about"), href: "/chi-siamo" },
    { label: tNav("menu"), href: "/menu" },
    { label: tNav("gallery"), href: "/galleria" },
    { label: tNav("contact"), href: "/contatti" },
  ];

  return (
    <footer id="contact" className="bg-[var(--color-background-alt)]">
      <div className="container-custom">
        <Reveal
          className="py-16 border-b border-[var(--color-border)]"
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

            <NewsletterForm />
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
          <Reveal>
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
          </Reveal>

          <Reveal delay={0.1}>
            <h3 className="font-[var(--font-display)] text-xl text-white mb-6">
              {t("quickLinks")}
            </h3>
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
          </Reveal>

          <Reveal delay={0.2}>
            <h3 className="font-[var(--font-display)] text-xl text-white mb-6">
              {t("contact")}
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-4">
                <MapPin
                  size={20}
                  className="text-[var(--color-primary)] flex-shrink-0 mt-1"
                />
                <a 
                  href="https://maps.google.com/?q=Plask%C3%A1+623/5,+150+00+Praha+5"
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
          </Reveal>

          <Reveal delay={0.3}>
            <h3 className="font-[var(--font-display)] text-xl text-white mb-6">
              {t("hours")}
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-4">
                <Clock
                  size={20}
                  className="text-[var(--color-primary)] flex-shrink-0 mt-1"
                />
                <div className="text-[var(--color-text-muted)]">
                  <span className="text-white block mb-1">Lunedi - Sabato</span>
                  11:00 - 23:30
                </div>
              </li>
              <li className="flex gap-4">
                <Clock
                  size={20}
                  className="text-[var(--color-primary)] flex-shrink-0 mt-1"
                />
                <div className="text-[var(--color-text-muted)]">
                  <span className="text-white block mb-1">Domenica</span>
                  Chiuso
                </div>
              </li>
            </ul>
          </Reveal>
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
