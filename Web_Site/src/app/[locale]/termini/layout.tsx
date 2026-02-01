import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ichnusa.restaurant'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  const titles: Record<string, string> = {
    it: "Termini e Condizioni",
    en: "Terms and Conditions",
    cs: "Obchodní podmínky",
  };
  
  const descriptions: Record<string, string> = {
    it: "Termini e condizioni di utilizzo del sito web Ichnusa Botega & Bistro. Regole per l'uso del nostro servizio.",
    en: "Terms and conditions of use for the Ichnusa Botega & Bistro website. Rules for using our service.",
    cs: "Obchodní podmínky používání webových stránek Ichnusa Botega & Bistro. Pravidla pro používání našich služeb.",
  };

  return {
    title: titles[locale] || titles.it,
    description: descriptions[locale] || descriptions.it,
    alternates: {
      canonical: `${baseUrl}/${locale}/termini`,
      languages: {
        'it': `${baseUrl}/it/termini`,
        'en': `${baseUrl}/en/termini`,
        'cs': `${baseUrl}/cs/termini`,
      },
    },
    openGraph: {
      title: titles[locale] || titles.it,
      description: descriptions[locale] || descriptions.it,
      url: `${baseUrl}/${locale}/termini`,
      type: 'website',
      siteName: 'Ichnusa Botega & Bistro',
      locale: locale === 'cs' ? 'cs_CZ' : locale === 'en' ? 'en_US' : 'it_IT',
      images: [{
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Ichnusa Botega & Bistro',
      }],
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default function TerminiLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
