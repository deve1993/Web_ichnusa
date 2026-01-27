import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import WeOffer from "@/components/sections/WeOffer";
import SpecialDish from "@/components/sections/SpecialDish";
import Menu from "@/components/sections/Menu";
import InfoCards from "@/components/sections/InfoCards";
import Testimonials from "@/components/sections/Testimonials";
import GoogleReviews from "@/components/sections/GoogleReviews";
import Reservation from "@/components/sections/Reservation";
import Footer from "@/components/Footer";
import { FAQJsonLd } from "@/components/seo";
import { getGoogleReviews } from "@/lib/google-places";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ichnusa.restaurant";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    it: "Ichnusa Botega & Bistro | Ristorante Sardo a Praga | Malá Strana",
    en: "Ichnusa Botega & Bistro | Sardinian Restaurant in Prague | Malá Strana",
    cs: "Ichnusa Botega & Bistro | Sardinská restaurace v Praze | Malá Strana",
  };

  const descriptions: Record<string, string> = {
    it: "Autentico ristorante sardo nel cuore di Praga, Malá Strana. Porceddu, culurgiones, pesce fresco e oltre 50 etichette di vini sardi. Prenota ora al +420 605 375 012.",
    en: "Authentic Sardinian restaurant in the heart of Prague, Malá Strana. Porceddu, culurgiones, fresh seafood and 50+ Sardinian wines. Book now at +420 605 375 012.",
    cs: "Autentická sardinská restaurace v srdci Prahy, Malá Strana. Porceddu, culurgiones, čerstvé mořské plody a 50+ sardinských vín. Rezervujte na +420 605 375 012.",
  };

  return {
    title: titles[locale] || titles.it,
    description: descriptions[locale] || descriptions.it,
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        it: `${baseUrl}/it`,
        en: `${baseUrl}/en`,
        cs: `${baseUrl}/cs`,
        "x-default": `${baseUrl}/it`,
      },
    },
    openGraph: {
      title: titles[locale] || titles.it,
      description: descriptions[locale] || descriptions.it,
      url: `${baseUrl}/${locale}`,
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: "Ichnusa Botega & Bistro",
        },
      ],
    },
  };
}

const homeFAQs = [
  {
    question: "Where is Ichnusa restaurant located?",
    answer: "Ichnusa Botega & Bistro is located at Plaská 623/5, Malá Strana, Prague 150 00, Czech Republic. We are in the heart of the historic Malá Strana district.",
  },
  {
    question: "What type of cuisine does Ichnusa serve?",
    answer: "We specialize in authentic Sardinian and Italian cuisine, featuring traditional dishes like Porceddu (slow-roasted suckling pig), Culurgiones (Sardinian pasta), fresh Mediterranean seafood, and over 50 labels of Sardinian wines including Cannonau and Vermentino.",
  },
  {
    question: "How can I make a reservation?",
    answer: "You can make a reservation by calling +420 605 375 012, via WhatsApp at the same number, or through our online booking system on the website. Reservations are recommended, especially for weekends.",
  },
  {
    question: "What are the opening hours?",
    answer: "We are open Monday to Saturday from 11:30 to 22:00, and Sunday from 11:00 to 15:00 for lunch service.",
  },
  {
    question: "Do you have a shop for Sardinian products?",
    answer: "Yes! La Bottega inside our restaurant offers authentic Sardinian products including DOP cheeses (Pecorino Sardo, Fiore Sardo), artisanal salumi, fresh pasta, wines, and traditional sweets to take home.",
  },
  {
    question: "Can you host private events?",
    answer: "Yes, we have a private room available for birthdays, anniversaries, corporate dinners, and wine tastings. We offer customized menus for groups. Contact us for more information.",
  },
];

export default async function Home({ params }: Props) {
  const { locale } = await params;
  const googleData = await getGoogleReviews();

  return (
    <>
      <FAQJsonLd faqs={homeFAQs} />
      <Header />
      <main>
        <Hero />
        <WeOffer />
        <SpecialDish />
        <Menu />
        <InfoCards />
        {googleData && googleData.reviews.length > 0 ? (
          <GoogleReviews
            reviews={googleData.reviews}
            rating={googleData.rating}
            totalReviews={googleData.user_ratings_total}
            googleMapsUrl={googleData.url}
          />
        ) : (
          <Testimonials />
        )}
        <Reservation />
      </main>
      <Footer />
    </>
  );
}
