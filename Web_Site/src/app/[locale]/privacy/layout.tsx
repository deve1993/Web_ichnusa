import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ichnusa.restaurant'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  const titles: Record<string, string> = {
    it: "Privacy Policy | Informativa sulla Privacy",
    en: "Privacy Policy",
    cs: "Zásady ochrany osobních údajů",
  };
  
  const descriptions: Record<string, string> = {
    it: "Informativa sulla privacy di Ichnusa Botega & Bistro. Come raccogliamo, utilizziamo e proteggiamo i tuoi dati personali.",
    en: "Privacy policy of Ichnusa Botega & Bistro. How we collect, use and protect your personal data.",
    cs: "Zásady ochrany osobních údajů Ichnusa Botega & Bistro. Jak shromažďujeme, používáme a chráníme vaše osobní údaje.",
  };

  return {
    title: titles[locale] || titles.it,
    description: descriptions[locale] || descriptions.it,
    alternates: {
      canonical: `${baseUrl}/${locale}/privacy`,
      languages: {
        'it': `${baseUrl}/it/privacy`,
        'en': `${baseUrl}/en/privacy`,
        'cs': `${baseUrl}/cs/privacy`,
      },
    },
    openGraph: {
      title: titles[locale] || titles.it,
      description: descriptions[locale] || descriptions.it,
      url: `${baseUrl}/${locale}/privacy`,
      type: 'website',
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
