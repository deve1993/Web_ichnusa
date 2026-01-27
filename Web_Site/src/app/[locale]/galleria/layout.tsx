import { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ichnusa.restaurant'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  const titles: Record<string, string> = {
    it: "Galleria | Foto del Ristorante",
    en: "Gallery | Restaurant Photos",
    cs: "Galerie | Fotografie restaurace",
  };
  
  const descriptions: Record<string, string> = {
    it: "Esplora la galleria fotografica di Ichnusa Botega & Bistro. Immagini dei nostri piatti, dell'ambiente e dell'atmosfera del ristorante sardo a Praga.",
    en: "Explore the photo gallery of Ichnusa Botega & Bistro. Images of our dishes, ambiance and atmosphere of the Sardinian restaurant in Prague.",
    cs: "Prozkoumejte fotogalerii Ichnusa Botega & Bistro. Snímky našich pokrmů, prostředí a atmosféry sardinské restaurace v Praze.",
  };

  return {
    title: titles[locale] || titles.it,
    description: descriptions[locale] || descriptions.it,
    alternates: {
      canonical: `${baseUrl}/${locale}/galleria`,
      languages: {
        'it': `${baseUrl}/it/galleria`,
        'en': `${baseUrl}/en/galleria`,
        'cs': `${baseUrl}/cs/galleria`,
      },
    },
    openGraph: {
      title: titles[locale] || titles.it,
      description: descriptions[locale] || descriptions.it,
      url: `${baseUrl}/${locale}/galleria`,
      type: 'website',
    },
  };
}

export default function GalleriaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
