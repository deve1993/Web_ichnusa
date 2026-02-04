# SEO & GEO Checklist 2025 - Ichnusa Botega & Bistro

## Stato: COMPLETATO

---

## 1. Technical SEO Foundation

| Item | Status | File/Location |
|------|--------|---------------|
| robots.txt con AI crawlers | ✅ | `src/app/robots.ts` |
| Sitemap dinamica con hreflang | ✅ | `src/app/sitemap.ts` |
| MetadataBase configurata | ✅ | `src/app/[locale]/layout.tsx` |
| Canonical URLs corretti | ✅ | Layout + pages |
| Mobile-friendly | ✅ | Tailwind responsive |
| HTTPS ready | ✅ | Coolify config |

## 2. GEO (Generative Engine Optimization)

| Item | Status | Details |
|------|--------|---------|
| llms.txt | ✅ | `public/llms.txt` |
| GPTBot allowed in robots | ✅ | robots.ts |
| ClaudeBot allowed | ✅ | robots.ts |
| PerplexityBot allowed | ✅ | robots.ts |
| Google-Extended allowed | ✅ | robots.ts |
| FAQ structured for AI | ✅ | FAQJsonLd in home |
| Direct answers in content | ✅ | Hero, descriptions |

## 3. Structured Data (JSON-LD)

| Schema | Status | Component |
|--------|--------|-----------|
| Restaurant | ✅ | `RestaurantJsonLd.tsx` |
| Organization | ✅ | `RestaurantJsonLd.tsx` |
| WebSite + SearchAction | ✅ | `RestaurantJsonLd.tsx` |
| FAQPage | ✅ | `FAQJsonLd.tsx` |
| BreadcrumbList | ✅ | `BreadcrumbJsonLd.tsx` |
| AggregateRating | ✅ | In Restaurant schema |
| Review | ✅ | In Restaurant schema |
| Menu/MenuItem | ✅ | In Restaurant schema |
| OpeningHours | ✅ | In Restaurant schema |
| GeoCoordinates | ✅ | In Restaurant schema |
| ReservationAction | ✅ | In Restaurant schema |

## 4. On-Page SEO

| Item | Status | Implementation |
|------|--------|----------------|
| Title tags dinamici | ✅ | generateMetadata per page |
| Meta descriptions | ✅ | Uniche per lingua/pagina |
| OG tags | ✅ | Layout metadata |
| Twitter cards | ✅ | Layout metadata |
| Hreflang | ✅ | alternates.languages |
| H1 unici per pagina | ✅ | Semantic HTML |
| Image alt tags | ✅ | Componenti Image |

## 5. International SEO (i18n)

| Item | Status | Details |
|------|--------|---------|
| IT (default) | ✅ | /it/* |
| EN | ✅ | /en/* |
| CS | ✅ | /cs/* |
| x-default hreflang | ✅ | Points to /it |
| Locale in sitemap | ✅ | All 3 languages |
| Translated metadata | ✅ | generateMetadata |

## 6. Local SEO

| Item | Status | Details |
|------|--------|---------|
| NAP consistency | ✅ | Schema + footer |
| Geo meta tags | ✅ | Layout other metadata |
| Google Maps coords | ✅ | Schema geo |
| Local business schema | ✅ | RestaurantJsonLd |
| Opening hours | ✅ | Schema + footer |

## 7. Indexing & Crawling

| Item | Status | Implementation |
|------|--------|----------------|
| IndexNow API | ✅ | `/api/indexnow` |
| Sitemap submission | ⏳ | Submit to GSC |
| Google Search Console | ⏳ | Add verification |
| Bing Webmaster Tools | ⏳ | Add verification |

## 8. Performance (Core Web Vitals)

| Metric | Target | Status |
|--------|--------|--------|
| LCP | < 2.5s | ✅ next/image, preload |
| INP | < 200ms | ✅ React 19 optimizations |
| CLS | < 0.1 | ✅ Explicit dimensions |

---

## Environment Variables Required

```env
NEXT_PUBLIC_SITE_URL=https://ichnusa.restaurant
GOOGLE_SITE_VERIFICATION=your-code  # <-- DA OTTENERE DA GOOGLE SEARCH CONSOLE
INDEXNOW_KEY=d3d7a4950f5ffff0a2bae128ab27d60f
INDEXNOW_SECRET=4ac8c9bf77a926456d4faabd55344889764ce30a27675112c8626a5a634ce0f6
```

## Post-Deploy Actions

1. [x] Create IndexNow key file at /[key].txt ✅ FATTO
2. [x] Create og-image.jpg ✅ FATTO (copiato da hero-poster.jpg)
3. [ ] Add GOOGLE_SITE_VERIFICATION to env (DA FARE - richiede login GSC)
4. [ ] Submit sitemap to Google Search Console (DA FARE - richiede login)
5. [ ] Submit sitemap to Bing Webmaster (DA FARE - richiede login)
6. [ ] Test structured data with Google Rich Results Test (DOPO DEPLOY)
7. [ ] Monitor Core Web Vitals in GSC (DOPO DEPLOY)

## Files Created/Modified

### New Files
- `public/llms.txt` - LLM info file for AI crawlers
- `src/components/seo/BreadcrumbJsonLd.tsx` - Breadcrumb schema
- `src/components/seo/FAQJsonLd.tsx` - FAQ schema
- `src/components/seo/index.ts` - SEO exports
- `src/lib/indexnow.ts` - IndexNow utility
- `src/app/api/indexnow/route.ts` - IndexNow API endpoint
- `SEO-CHECKLIST-2025.md` - This checklist

### Modified Files
- `src/app/robots.ts` - Added AI crawlers
- `src/app/[locale]/layout.tsx` - Enhanced metadata
- `src/app/[locale]/page.tsx` - Dynamic metadata + FAQ
- `src/components/seo/RestaurantJsonLd.tsx` - Full schema
- `.env.example` - SEO variables

---

**Last Updated**: January 2025
**Version**: 1.0
