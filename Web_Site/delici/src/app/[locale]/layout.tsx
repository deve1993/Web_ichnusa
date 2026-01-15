import type { Metadata } from "next";
import { DM_Sans, Forum } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, Locale } from "@/i18n/routing";
import "../globals.css";
import Preloader from "@/components/Preloader";
import ScrollToTop from "@/components/ScrollToTop";
import MobileCTA from "@/components/MobileCTA";
import WhatsAppWidget from "@/components/WhatsAppWidget";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const forum = Forum({
  variable: "--font-forum",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: {
    default: "Ichnusa Botega & Bistro | Ristorante Sardo a Praga",
    template: "%s | Ichnusa Botega & Bistro",
  },
  description: "Autentico ristorante sardo nel cuore di Praga. Piatti tradizionali, vini pregiati dalla Sardegna, pesce fresco e frutti di mare. Malá Strana.",
  keywords: [
    "ristorante sardo Praga",
    "Ichnusa",
    "cucina sarda",
    "ristorante italiano Praga",
    "Malá Strana ristorante",
    "pesce fresco Praga",
    "vini sardi",
    "Sardinian restaurant Prague",
    "Italian restaurant Prague",
  ],
  authors: [{ name: "Ichnusa Botega & Bistro" }],
  creator: "Ichnusa Botega & Bistro",
  openGraph: {
    title: "Ichnusa Botega & Bistro | Ristorante Sardo a Praga",
    description: "Autentico ristorante sardo nel cuore di Praga. Piatti tradizionali, vini pregiati, pesce fresco.",
    type: "website",
    locale: "it_IT",
    alternateLocale: ["en_US", "cs_CZ"],
    siteName: "Ichnusa Botega & Bistro",
    url: "https://ichnusa.restaurant",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ichnusa Botega & Bistro | Ristorante Sardo a Praga",
    description: "Autentico ristorante sardo nel cuore di Praga.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://ichnusa.restaurant",
    languages: {
      "it": "https://ichnusa.restaurant/it",
      "en": "https://ichnusa.restaurant/en",
      "cs": "https://ichnusa.restaurant/cs",
    },
  },
  verification: {
    google: "add-your-google-verification-code",
  },
  category: "restaurant",
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth">
      <body className={`${dmSans.variable} ${forum.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <Preloader />
          {children}
          <ScrollToTop />
          <MobileCTA />
          <WhatsAppWidget />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
