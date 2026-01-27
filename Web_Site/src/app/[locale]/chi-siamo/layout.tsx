import { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ichnusa.restaurant'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  const titles: Record<string, string> = {
    it: "Chi Siamo | La Nostra Storia",
    en: "About Us | Our Story",
    cs: "O nás | Náš příběh",
  };
  
  const descriptions: Record<string, string> = {
    it: "Scopri la storia di Ichnusa Botega & Bistro. La passione per la Sardegna, i nostri chef, i valori e la tradizione culinaria sarda nel cuore di Praga.",
    en: "Discover the story of Ichnusa Botega & Bistro. Our passion for Sardinia, our chefs, values and Sardinian culinary tradition in the heart of Prague.",
    cs: "Objevte příběh Ichnusa Botega & Bistro. Naše vášeň pro Sardinii, naši kuchaři, hodnoty a sardinská kulinářská tradice v srdci Prahy.",
  };

  return {
    title: titles[locale] || titles.it,
    description: descriptions[locale] || descriptions.it,
    alternates: {
      canonical: `${baseUrl}/${locale}/chi-siamo`,
      languages: {
        'it': `${baseUrl}/it/chi-siamo`,
        'en': `${baseUrl}/en/chi-siamo`,
        'cs': `${baseUrl}/cs/chi-siamo`,
      },
    },
    openGraph: {
      title: titles[locale] || titles.it,
      description: descriptions[locale] || descriptions.it,
      url: `${baseUrl}/${locale}/chi-siamo`,
      type: 'website',
    },
  };
}

export default function ChiSiamoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
