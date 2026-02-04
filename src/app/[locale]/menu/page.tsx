import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { unstable_cache } from "next/cache";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import MenuClient from "@/components/MenuClient";
import { SardegnaDecoration } from "@/components/ui/SardegnaDecoration";
import { getMenu } from "@/lib/payload";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ichnusa.restaurant'

const getCachedMenu = unstable_cache(
  async (locale: string) => getMenu(locale),
  ['menu-data'],
  { revalidate: 300, tags: ['menu'] }
)

interface MenuPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: MenuPageProps): Promise<Metadata> {
  const { locale } = await params;
  
  const titles: Record<string, string> = {
    it: "Menu | Cucina Sarda Autentica",
    en: "Menu | Authentic Sardinian Cuisine",
    cs: "Menu | Autentická sardinská kuchyně",
  };
  
  const descriptions: Record<string, string> = {
    it: "Scopri il menu di Ichnusa: antipasti sardi, malloreddus, culurgiones, porceddu, pesce fresco e vini dalla Sardegna. Prezzi e piatti del giorno.",
    en: "Discover Ichnusa menu: Sardinian appetizers, malloreddus, culurgiones, porceddu, fresh fish and wines from Sardinia. Prices and daily specials.",
    cs: "Objevte menu Ichnusa: sardinské předkrmy, malloreddus, culurgiones, porceddu, čerstvé ryby a vína ze Sardinie. Ceny a denní speciality.",
  };

  return {
    title: titles[locale] || titles.it,
    description: descriptions[locale] || descriptions.it,
    alternates: {
      canonical: `${baseUrl}/${locale}/menu`,
      languages: {
        'it': `${baseUrl}/it/menu`,
        'en': `${baseUrl}/en/menu`,
        'cs': `${baseUrl}/cs/menu`,
      },
    },
    openGraph: {
      title: titles[locale] || titles.it,
      description: descriptions[locale] || descriptions.it,
      url: `${baseUrl}/${locale}/menu`,
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

interface MenuCategory {
  id: string;
  title: string;
  slug: string;
  description?: string;
  order: number;
}

interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  allergens?: string[];
  isAvailable: boolean;
  isSpecial?: boolean;
}

const fallbackCategories: MenuCategory[] = [
  { id: "1", title: "Antipasti", slug: "antipasti", order: 0 },
  { id: "2", title: "Pasta e Risotto", slug: "pasta-risotto", order: 1 },
  { id: "3", title: "Secondi Piatti", slug: "secondi", order: 2 },
  { id: "4", title: "Insalate", slug: "insalate", description: "+ burrata 120,- | +3 gamberi 245,- | +3 calamari 280,- | + tentacolo polpo 390,-", order: 3 },
  { id: "5", title: "Dolci", slug: "dolci", order: 4 },
];

const fallbackItems: MenuItem[] = [
  // Antipasti
  { id: "a1", name: "Tagliere di salumi e formaggi con olive e giardiniera", price: 535, category: "antipasti", isAvailable: true },
  { id: "a2", name: "Polpo fritto in s'Azzada con lattuga di mare", price: 440, category: "antipasti", isAvailable: true },
  { id: "a3", name: "Melanzane alla sulcitana", price: 345, category: "antipasti", isAvailable: true },
  { id: "a4", name: "Sashimi di tonno cotto-crudo in riduzione di Vermentino, granella di nocciola tostata e emulsione di plancton marino", price: 470, category: "antipasti", isAvailable: true },
  { id: "a5", name: "Burrata con pomodorini confit, acciughe del Cantabrico e basilico croccante", price: 320, category: "antipasti", isAvailable: true },
  { id: "a6", name: "Tartare di Fassona piemontese con senape in grani, cialda croccante, gocce di tuorlo d'uovo affumicato e salsa di soia al mirto", price: 455, category: "antipasti", isAvailable: true },
  // Pasta e Risotto
  { id: "pr1", name: "Risotto al tartufo", price: 620, category: "pasta-risotto", isAvailable: true },
  { id: "pr2", name: "Passatelli in brodo di crostacei", price: 430, category: "pasta-risotto", isAvailable: true },
  { id: "pr3", name: "Spaghetti alla bottarga", price: 390, category: "pasta-risotto", isAvailable: true },
  { id: "pr4", name: "Culurgiones ripieni di stracotto di cinghiale al cannonau", price: 425, category: "pasta-risotto", isAvailable: true },
  { id: "pr5", name: "Tortelli ripieni di cacio e pepe con crudité di gambero rosso", price: 450, category: "pasta-risotto", isAvailable: true },
  { id: "pr6", name: "Malloreddus alla campidanese", price: 375, category: "pasta-risotto", isAvailable: true },
  // Secondi Piatti
  { id: "s1", name: "Maialetto arrosto con la sua riduzione e la nostra giardiniera", price: 635, category: "secondi", isAvailable: true },
  { id: "s2", name: "Grigliata di pesce con insalatina di stagione", description: "Scampo, spiedino di calamaro, spiedino di gambero, tonno, polpo, cappasanta", price: 790, category: "secondi", isAvailable: true },
  { id: "s3", name: "Fritto misto di mare e alghe", price: 655, category: "secondi", isAvailable: true },
  { id: "s4", name: "Tataki di ricciola su medaglione di cavolfiore arrostito con salsa all'aglio confit e foglie di cavolo croccante", price: 675, category: "secondi", isAvailable: true },
  { id: "s5", name: "Tagliata di manzo con patate novelle al burro e rosmarino", price: 690, category: "secondi", isAvailable: true },
  // Insalate
  { id: "i1", name: "Insalatina tiepida alla mediterranea con patate, pomodorini e olive", price: 125, category: "insalate", isAvailable: true },
  { id: "i2", name: "Insalata di Panzanella, pomodorini, cetrioli, crostoni aromatizzati e cavolfiore", price: 125, category: "insalate", isAvailable: true },
  { id: "i3", name: "Insalata mista di stagione con carote e finocchio", price: 125, category: "insalate", isAvailable: true },
  // Dolci
  { id: "d1", name: "Seadas", price: 255, category: "dolci", isAvailable: true },
  { id: "d2", name: "Tiramisù al bicchiere", price: 220, category: "dolci", isAvailable: true },
  { id: "d3", name: "Babà al mirto servito con zabaione caldo", price: 215, category: "dolci", isAvailable: true },
  { id: "d4", name: "Millefoglie, crema di cioccolato, amaretti, amarene", price: 245, category: "dolci", isAvailable: true },
];

export default async function MenuPage({ params }: MenuPageProps) {
  const { locale } = await params;
  const t = await getTranslations("menu");
  const tNav = await getTranslations("nav");
  const tCommon = await getTranslations("common");

  let categories: MenuCategory[] = fallbackCategories;
  let items: MenuItem[] = fallbackItems;

  try {
    const menuData = await getCachedMenu(locale);
    if (menuData.categories.length > 0) {
      categories = menuData.categories.map((cat) => ({
        id: String(cat.id),
        title: String(cat.title || ""),
        slug: String(cat.slug || ""),
        description: cat.description ? String(cat.description) : undefined,
        order: Number(cat.order) || 0,
      }));
    }
    if (menuData.items.length > 0) {
      items = menuData.items.map((item) => {
        const categoryData = item.category;
        const categorySlug = typeof categoryData === "object" && categoryData !== null && "slug" in categoryData
          ? String(categoryData.slug)
          : String(categoryData || "");
        return {
          id: String(item.id),
          name: String(item.name || ""),
          description: item.description ? String(item.description) : undefined,
          price: Number(item.price) || 0,
          category: categorySlug,
          allergens: Array.isArray(item.allergens) ? item.allergens.map(String) : undefined,
          isAvailable: Boolean(item.isAvailable),
          isSpecial: Boolean(item.isSpecial),
        };
      });
    }
  } catch {
    console.log("Using fallback menu data - CMS not connected");
  }

  return (
    <>
      <Header />
      <main>
        <PageHero
          title={t("title")}
          subtitle={t("subtitle")}
          backgroundImage="/images/food/lasagne.jpg"
          breadcrumbs={[{ label: tNav("menu"), href: "/menu" }]}
        />

        <MenuClient categories={categories} items={items} />

        <section className="section-padding bg-[var(--color-surface)] relative overflow-hidden">
          <SardegnaDecoration 
            className="top-1/2 -right-32 -translate-y-1/2 w-[500px] h-[700px] rotate-12"
            opacity={0.05}
          />
          <div className="container-custom relative z-10">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/menu/wine-selection.webp"
                  alt={t("wineList")}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="font-[var(--font-display)] text-3xl text-white mb-2">
                    {t("wineList")}
                  </h3>
                  <p className="text-[var(--color-text-muted)] mb-4">
                    {t("wineListDesc")}
                  </p>

                </div>
              </div>

              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/menu/fish-booking.webp"
                  alt={t("fishBooking")}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="font-[var(--font-display)] text-3xl text-white mb-2">
                    {t("fishBooking")}
                  </h3>
                  <p className="text-[var(--color-text-muted)]">
                    {t("fishBookingDesc")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-[var(--color-background)]">
          <div className="container-custom text-center">
            <p className="text-[var(--color-text-muted)] mb-6">
              {t("allergyNote")}
            </p>
            <a
              href="https://reservation.dish.co/widget/hydra-7cc98a90-5678-11ec-bb8e-d7389d5eaae1"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex"
            >
              {tCommon("bookNow")}
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
