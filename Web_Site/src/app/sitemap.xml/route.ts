import { NextResponse } from "next/server";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ichnusa.restaurant";

const locales = ["it", "en", "cs"] as const;

// Pagine statiche con metadata SEO
const staticPages = [
  { url: "", priority: 1.0, changefreq: "daily", section: "Home" },
  { url: "/menu", priority: 0.9, changefreq: "daily", section: "Menu" },
  { url: "/chi-siamo", priority: 0.8, changefreq: "weekly", section: "About" },
  { url: "/contatti", priority: 0.8, changefreq: "weekly", section: "Contact" },

  { url: "/galleria", priority: 0.7, changefreq: "weekly", section: "Gallery" },
  { url: "/privacy", priority: 0.3, changefreq: "monthly", section: "Legal" },
  { url: "/termini", priority: 0.3, changefreq: "monthly", section: "Legal" },
] as const;

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const lastMod = new Date().toISOString().split("T")[0];

  // CRITICO: xml-stylesheet DEVE essere sulla riga 2
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

  for (const page of staticPages) {
    for (const locale of locales) {
      const url = `${baseUrl}/${locale}${page.url}`;

      xml += `
  <url>
    <loc>${escapeXml(url)}</loc>`;

      // hreflang alternates per ogni lingua
      for (const altLocale of locales) {
        const altUrl = `${baseUrl}/${altLocale}${page.url}`;
        xml += `
    <xhtml:link rel="alternate" hreflang="${altLocale}" href="${escapeXml(altUrl)}" />`;
      }

      // x-default per la lingua principale
      xml += `
    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(`${baseUrl}/it${page.url}`)}" />`;

      xml += `
    <lastmod>${lastMod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
    }
  }

  xml += `
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
