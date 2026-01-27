import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, Locale } from "@/i18n/routing";
import Preloader from "@/components/Preloader";
import ScrollToTop from "@/components/ScrollToTop";
import MobileCTA from "@/components/MobileCTA";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import CookieBanner from "@/components/CookieBanner";
import { RestaurantJsonLd } from "@/components/seo";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ichnusa.restaurant";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Ichnusa Botega & Bistro | Ristorante Sardo a Praga",
    template: "%s | Ichnusa Botega & Bistro",
  },
  description: "Autentico ristorante sardo nel cuore di Praga, Malá Strana. Porceddu, culurgiones, pesce fresco, oltre 50 vini sardi. Prenota ora al +420 605 375 012.",
  keywords: [
    "ristorante sardo Praga",
    "Ichnusa",
    "cucina sarda",
    "ristorante italiano Praga",
    "Malá Strana ristorante",
    "pesce fresco Praga",
    "vini sardi",
    "porceddu Praga",
    "culurgiones",
    "seadas",
    "Sardinian restaurant Prague",
    "Italian restaurant Prague",
    "restaurace Praha",
    "italská restaurace Praha",
  ],
  authors: [{ name: "Ichnusa Botega & Bistro" }],
  creator: "Ichnusa Botega & Bistro",
  publisher: "Ichnusa Botega & Bistro",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Ichnusa",
    startupImage: [
      {
        url: "/apple-splash-2048-2732.png",
        media: "(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)",
      },
      {
        url: "/apple-splash-1170-2532.png",
        media: "(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3)",
      },
      {
        url: "/apple-splash-1125-2436.png",
        media: "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)",
      },
    ],
  },
  applicationName: "Ichnusa Botega & Bistro",
  manifest: "/manifest.webmanifest",
  // Open Graph
  openGraph: {
    title: "Ichnusa Botega & Bistro | Ristorante Sardo a Praga",
    description: "Autentico ristorante sardo nel cuore di Praga. Porceddu, pesce fresco, 50+ vini sardi. Malá Strana.",
    type: "website",
    locale: "it_IT",
    alternateLocale: ["en_US", "cs_CZ"],
    siteName: "Ichnusa Botega & Bistro",
    url: baseUrl,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ichnusa Botega & Bistro - Ristorante Sardo a Praga",
      },
    ],
  },
  // Twitter/X
  twitter: {
    card: "summary_large_image",
    title: "Ichnusa Botega & Bistro | Ristorante Sardo a Praga",
    description: "Autentico ristorante sardo nel cuore di Praga. Prenota ora!",
    images: ["/og-image.jpg"],
    creator: "@ichnusaprague",
    site: "@ichnusaprague",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "./",
    languages: {
      "it": `${baseUrl}/it`,
      "en": `${baseUrl}/en`,
      "cs": `${baseUrl}/cs`,
      "x-default": `${baseUrl}/it`,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || "",
  },
  category: "restaurant",
  other: {
    "geo.region": "CZ-10",
    "geo.placename": "Prague",
    "geo.position": "50.0815;14.4073",
    "ICBM": "50.0815, 14.4073",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "msapplication-TileColor": "#0C0B09",
    "msapplication-config": "/browserconfig.xml",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#C9A96E" },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#C9A96E" },
    { media: "(prefers-color-scheme: dark)", color: "#0C0B09" },
  ],
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
    <>
      <RestaurantJsonLd locale={locale} />
      <NextIntlClientProvider messages={messages}>
        <Preloader />
        {children}
        <ScrollToTop />
        <MobileCTA />
        <WhatsAppWidget />
        <CookieBanner />
      </NextIntlClientProvider>
    </>
  );
}
