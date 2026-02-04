import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Ichnusa Botega & Bistro',
    short_name: 'Ichnusa',
    description: 'Autentico ristorante sardo nel cuore di Praga, Mala Strana. Porceddu, culurgiones, pesce fresco, oltre 50 vini sardi.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0C0B09',
    theme_color: '#C9A96E',
    orientation: 'portrait-primary',
    scope: '/',
    lang: 'it',
    dir: 'ltr',
    categories: ['food', 'restaurant', 'lifestyle'],
    icons: [
      {
        src: '/favicons/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/favicons/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/favicons/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/favicons/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/favicons/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/favicons/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    screenshots: [
      {
        src: '/og-image.jpg',
        sizes: '1200x630',
        type: 'image/jpeg',
        label: 'Ichnusa Botega & Bistro - Homepage',
      },
    ],
    shortcuts: [
      {
        name: 'Prenota un tavolo',
        short_name: 'Prenota',
        description: 'Prenota subito il tuo tavolo da Ichnusa',
        url: '/it/contatti#reservation',
        icons: [{ src: '/favicons/web-app-manifest-192x192.png', sizes: '192x192' }],
      },
      {
        name: 'Menu',
        short_name: 'Menu',
        description: 'Scopri il nostro menu',
        url: '/it/menu',
        icons: [{ src: '/favicons/web-app-manifest-192x192.png', sizes: '192x192' }],
      },
      {
        name: 'Contatti',
        short_name: 'Contatti',
        description: 'Contattaci',
        url: '/it/contatti',
        icons: [{ src: '/favicons/web-app-manifest-192x192.png', sizes: '192x192' }],
      },
    ],
    related_applications: [],
    prefer_related_applications: false,
  }
}
