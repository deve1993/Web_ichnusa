const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ichnusa.restaurant"

interface BreadcrumbItem {
  name: string
  href: string
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[]
  locale?: string
}

export function BreadcrumbJsonLd({ items, locale = "it" }: BreadcrumbJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.href.startsWith("http") ? item.href : `${baseUrl}/${locale}${item.href}`,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
