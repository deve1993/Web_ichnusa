const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ichnusa.restaurant"

interface RestaurantJsonLdProps {
  locale?: string
}

export function RestaurantJsonLd({ locale = "it" }: RestaurantJsonLdProps) {
  const restaurantSchema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${baseUrl}/#restaurant`,
    name: "Ichnusa Botega & Bistro",
    alternateName: "Ichnusa Praha",
    description: "Authentic Sardinian restaurant in the heart of Prague, Malá Strana. Traditional dishes, fine wines from Sardinia, fresh fish and seafood.",
    image: [
      `${baseUrl}/og-image.jpg`,
      `${baseUrl}/images/restaurant/interior.jpg`,
    ],
    url: baseUrl,
    telephone: "+420605375012",
    email: "reservations@ichnusa.restaurant",
    priceRange: "$$-$$$",
    servesCuisine: ["Italian", "Sardinian", "Mediterranean", "Seafood"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Plaská 623/5",
      addressLocality: "Praha 5 - Malá Strana",
      postalCode: "150 00",
      addressRegion: "Prague",
      addressCountry: "CZ",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 50.0815,
      longitude: 14.4073,
    },
    hasMap: "https://maps.google.com/?q=Ichnusa+Botega+Bistro+Prague",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "11:00",
        closes: "23:30",
      },
    ],
    acceptsReservations: true,
    reservations: {
      "@type": "ReservationAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/${locale}#reservation`,
        inLanguage: locale,
        actionPlatform: ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"],
      },
    },
    menu: `${baseUrl}/${locale}/menu`,
    hasMenu: {
      "@type": "Menu",
      name: "Main Menu",
      url: `${baseUrl}/${locale}/menu`,
      hasMenuSection: [
        {
          "@type": "MenuSection",
          name: "Antipasti",
          hasMenuItem: [
            {
              "@type": "MenuItem",
              name: "Culurgiones",
              description: "Traditional Sardinian pasta from Ogliastra",
            },
          ],
        },
        {
          "@type": "MenuSection",
          name: "Secondi",
          hasMenuItem: [
            {
              "@type": "MenuItem",
              name: "Porceddu",
              description: "Slow-roasted suckling pig with myrtle wood (for 2-4 persons)",
              offers: {
                "@type": "Offer",
                availability: "https://schema.org/PreOrder",
              },
            },
          ],
        },
      ],
    },
    paymentAccepted: ["Cash", "Credit Card", "Debit Card"],
    currenciesAccepted: "CZK, EUR",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "150",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        author: {
          "@type": "Person",
          name: "Marco B.",
        },
        reviewBody: "Un angolo di Sardegna nel cuore di Praga. I culurgiones sono identici a quelli che mangiavo da bambino in Ogliastra.",
        datePublished: "2024-12-15",
      },
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        author: {
          "@type": "Person",
          name: "Jana K.",
        },
        reviewBody: "Atmosfera intima, servizio impeccabile e vini sardi eccezionali. Il Cannonau consigliato dallo staff era perfetto con l'agnello.",
        datePublished: "2024-11-20",
      },
    ],
    sameAs: [
      "https://www.facebook.com/ichnusapraha",
      "https://www.instagram.com/ichnusapraha",
    ],
    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/${locale}#reservation`,
      },
      result: {
        "@type": "FoodEstablishmentReservation",
        name: "Table Reservation",
      },
    },
  }

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    name: "Ichnusa Botega & Bistro",
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    sameAs: [
      "https://www.facebook.com/ichnusapraha",
      "https://www.instagram.com/ichnusapraha",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+420605375012",
      contactType: "reservations",
      availableLanguage: ["Italian", "English", "Czech"],
    },
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    name: "Ichnusa Botega & Bistro",
    url: baseUrl,
    publisher: {
      "@id": `${baseUrl}/#organization`,
    },
    inLanguage: ["it", "en", "cs"],
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/${locale}/menu?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }

  const schemas = [restaurantSchema, organizationSchema, websiteSchema]

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
    />
  )
}
