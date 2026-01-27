import { getPayload as getPayloadInstance, type Payload } from 'payload'
import config from '@payload-config'

type PayloadCache = {
  client: Payload | null
  promise: Promise<Payload> | null
}

declare global {
  var payloadCache: PayloadCache | undefined
}

const cached: PayloadCache = global.payloadCache ?? { client: null, promise: null }

if (!global.payloadCache) {
  global.payloadCache = cached
}

export async function getPayload(): Promise<Payload> {
  if (cached.client) return cached.client

  if (!cached.promise) {
    cached.promise = getPayloadInstance({ config })
  }

  cached.client = await cached.promise
  return cached.client
}

const withTimeout = <T>(promise: Promise<T>, ms: number): Promise<T> => {
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error('CMS timeout')), ms)
  )
  return Promise.race([promise, timeout])
}

export async function getMenu(locale: string = 'it') {
  const payload = await withTimeout(getPayload(), 3000)

  const [categories, items] = await Promise.all([
    payload.find({
      collection: 'menu-categories',
      sort: 'order',
      locale,
    }),
    payload.find({
      collection: 'menu-items',
      where: {
        isAvailable: { equals: true },
      },
      locale,
      depth: 2,
    }),
  ])

  return {
    categories: categories.docs,
    items: items.docs,
  }
}

export async function getEvents(locale: string = 'it') {
  const payload = await getPayload()

  const events = await payload.find({
    collection: 'events',
    where: {
      isActive: { equals: true },
      date: { greater_than_equal: new Date().toISOString() },
    },
    sort: 'date',
    locale,
    depth: 1,
  })

  return events.docs
}

export async function getPage(slug: string, locale: string = 'it') {
  const payload = await getPayload()

  const pages = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: slug },
    },
    locale,
    depth: 1,
    limit: 1,
  })

  return pages.docs[0] || null
}

export async function getOpeningHours() {
  const payload = await getPayload()

  const hours = await payload.findGlobal({
    slug: 'opening-hours',
  })

  return hours
}

export async function getSiteSettings() {
  const payload = await getPayload()

  const settings = await payload.findGlobal({
    slug: 'site-settings',
  })

  return settings
}
