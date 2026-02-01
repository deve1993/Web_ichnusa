import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Facebook, Instagram } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ContactFormClient from "@/components/ContactFormClient";
import ContactInfoCards from "@/components/ContactInfoCards";
import GoogleMapEmbed from "@/components/GoogleMapEmbed";
import { getOpeningHours, getSiteSettings } from "@/lib/payload";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ichnusa.restaurant'

interface ContattiPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ContattiPageProps): Promise<Metadata> {
  const { locale } = await params;
  
  const titles: Record<string, string> = {
    it: "Contatti e Prenotazioni",
    en: "Contact & Reservations", 
    cs: "Kontakt a Rezervace",
  };
  
  const descriptions: Record<string, string> = {
    it: "Contatta Ichnusa Botega & Bistro a Praga. Prenota un tavolo, richiedi informazioni. Plaská 623/5, Malá Strana. Tel: +420 605 375 012",
    en: "Contact Ichnusa Botega & Bistro in Prague. Book a table, request information. Plaská 623/5, Malá Strana. Tel: +420 605 375 012",
    cs: "Kontaktujte Ichnusa Botega & Bistro v Praze. Rezervujte stůl, požádejte o informace. Plaská 623/5, Malá Strana. Tel: +420 605 375 012",
  };

  return {
    title: titles[locale] || titles.it,
    description: descriptions[locale] || descriptions.it,
    alternates: {
      canonical: `${baseUrl}/${locale}/contatti`,
      languages: {
        'it': `${baseUrl}/it/contatti`,
        'en': `${baseUrl}/en/contatti`,
        'cs': `${baseUrl}/cs/contatti`,
      },
    },
    openGraph: {
      title: titles[locale] || titles.it,
      description: descriptions[locale] || descriptions.it,
      url: `${baseUrl}/${locale}/contatti`,
      type: 'website',
      siteName: 'Ichnusa Botega & Bistro',
      locale: locale === 'cs' ? 'cs_CZ' : locale === 'en' ? 'en_US' : 'it_IT',
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'Ichnusa Botega & Bistro',
        },
      ],
    },
  };
}

const fallbackContactInfo = {
  address: {
    street: "Plaská 623/5",
    city: "Malá Strana, Praha",
    postalCode: "150 00",
    country: "Czech Republic",
  },
  phone: "+420 605 375 012",
  email: "info@ichnusa.restaurant",
  reservationUrl: "https://reservation.dish.co/widget/hydra-7cc98a90-5678-11ec-bb8e-d7389d5eaae1",
  social: {
    facebook: "https://www.facebook.com/ichnusarestaurant",
    instagram: "https://www.instagram.com/ichnusa_official_prague/",
  },
  hours: "Lun - Sab: 11:00 - 23:30\nDom: Chiuso",
};

interface ScheduleDay {
  dayOfWeek: string;
  isClosed?: boolean;
  openTime?: string;
  closeTime?: string;
}

function formatOpeningHours(schedule: ScheduleDay[]): string {
  if (!schedule || schedule.length === 0) {
    return fallbackContactInfo.hours;
  }

  const dayNames: Record<string, string> = {
    monday: "Lun",
    tuesday: "Mar",
    wednesday: "Mer",
    thursday: "Gio",
    friday: "Ven",
    saturday: "Sab",
    sunday: "Dom",
  };

  const lines: string[] = [];
  let currentRange = { days: [] as string[], hours: "" };

  schedule.forEach((day) => {
    const dayName = dayNames[day.dayOfWeek] || day.dayOfWeek;
    const hours = day.isClosed
      ? "Chiuso"
      : `${day.openTime || "11:00"} - ${day.closeTime || "23:30"}`;

    if (hours === currentRange.hours && currentRange.days.length > 0) {
      currentRange.days.push(dayName);
    } else {
      if (currentRange.days.length > 0) {
        const rangeStr =
          currentRange.days.length > 1
            ? `${currentRange.days[0]} - ${currentRange.days[currentRange.days.length - 1]}`
            : currentRange.days[0];
        lines.push(`${rangeStr}: ${currentRange.hours}`);
      }
      currentRange = { days: [dayName], hours };
    }
  });

  if (currentRange.days.length > 0) {
    const rangeStr =
      currentRange.days.length > 1
        ? `${currentRange.days[0]} - ${currentRange.days[currentRange.days.length - 1]}`
        : currentRange.days[0];
    lines.push(`${rangeStr}: ${currentRange.hours}`);
  }

  return lines.join("\n");
}

export default async function ContattiPage({ params }: ContattiPageProps) {
  const { locale } = await params;
  const t = await getTranslations("contact");
  const tNav = await getTranslations("nav");

  let contactInfo = fallbackContactInfo;
  let formattedHours = fallbackContactInfo.hours;

  try {
    const [settings, openingHours] = await Promise.all([
      getSiteSettings(),
      getOpeningHours(),
    ]);

    if (settings) {
      contactInfo = {
        address: settings.address || fallbackContactInfo.address,
        phone: settings.phone || fallbackContactInfo.phone,
        email: settings.email || fallbackContactInfo.email,
        reservationUrl: settings.reservationUrl || fallbackContactInfo.reservationUrl,
        social: settings.social || fallbackContactInfo.social,
        hours: fallbackContactInfo.hours,
      };
    }

    if (openingHours?.schedule) {
      formattedHours = formatOpeningHours(openingHours.schedule);
    }
  } catch {
    console.log("Using fallback contact data - CMS not connected");
  }

  const addressDisplay = `${contactInfo.address.street}\n${contactInfo.address.postalCode} ${contactInfo.address.city}`;
  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(
    `${contactInfo.address.street}, ${contactInfo.address.postalCode} ${contactInfo.address.city}, ${contactInfo.address.country}`
  )}`;

  const contactInfoData = [
    {
      iconName: "map",
      labelKey: "address",
      content: addressDisplay,
      link: mapsUrl,
    },
    {
      iconName: "phone",
      labelKey: "phone",
      content: contactInfo.phone,
      link: `tel:${contactInfo.phone.replace(/\s/g, "")}`,
    },
    {
      iconName: "mail",
      labelKey: "email",
      content: contactInfo.email,
      link: `mailto:${contactInfo.email}`,
    },
    {
      iconName: "clock",
      labelKey: "hours",
      content: formattedHours,
      link: null,
    },
  ];

  return (
    <>
      <Header />
      <main>
        <PageHero
          title={t("pageTitle")}
          subtitle={t("pageSubtitle")}
          backgroundImage="/images/gallery/chi-siamo-hero.webp"
          breadcrumbs={[{ label: tNav("contact"), href: "/contatti" }]}
        />

        <section className="section-padding bg-[var(--color-background)]">
          <div className="container-custom">
            <ContactInfoCards items={contactInfoData} />

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              <ContactFormClient />

              <div className="space-y-6">
                <GoogleMapEmbed
                  embedUrl={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2560.3847395445163!2d14.40348731571859!3d50.08370197942542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b94f1f6b5c1a7%3A0x8b7a3b6b7f8b7a3b!2sPlas%C3%A1%20623%2F5%2C%20150%2000%20Praha%205-Mal%C3%A1%20Strana!5e0!3m2!1s${locale}!2scz!4v1620000000000!5m2!1s${locale}!2scz`}
                  externalUrl={mapsUrl}
                  className="aspect-[4/3] overflow-hidden border border-[var(--color-border)]"
                />

                <div className="p-6 bg-[var(--color-surface)] border border-[var(--color-border)]">
                  <h3 className="font-[var(--font-display)] text-xl text-white mb-4">
                    {t("quickBooking.title")}
                  </h3>
                  <p className="text-[var(--color-text-muted)] text-sm mb-4">
                    {t("quickBooking.description")}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={contactInfo.reservationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary text-center"
                    >
                      {t("quickBooking.bookOnline")}
                    </a>
                    <a
                      href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                      className="px-6 py-3 border border-[var(--color-border)] text-white inline-flex items-center justify-center hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
                    >
                      {t("quickBooking.callNow")}
                    </a>
                  </div>
                </div>

                <div className="p-6 bg-[var(--color-surface)] border border-[var(--color-border)]">
                  <h3 className="font-[var(--font-display)] text-xl text-white mb-4">
                    {t("followUs.title")}
                  </h3>
                  <p className="text-[var(--color-text-muted)] text-sm mb-4">
                    {t("followUs.description")}
                  </p>
                  <div className="flex gap-4">
                    {contactInfo.social?.facebook && (
                      <a
                        href={contactInfo.social.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
                        aria-label="Facebook"
                      >
                        <Facebook size={20} />
                      </a>
                    )}
                    {contactInfo.social?.instagram && (
                      <a
                        href={contactInfo.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
                        aria-label="Instagram"
                      >
                        <Instagram size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
