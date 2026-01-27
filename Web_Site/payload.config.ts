import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { Users } from './src/collections/Users'
import { Media } from './src/collections/Media'
import { MenuCategories } from './src/collections/MenuCategories'
import { MenuItems } from './src/collections/MenuItems'
import { Events } from './src/collections/Events'
import { Pages } from './src/collections/Pages'

import { OpeningHours } from './src/globals/OpeningHours'
import { SiteSettings } from './src/globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' - Ichnusa CMS',
    },
  },

  editor: lexicalEditor(),

  collections: [
    Users,
    Media,
    MenuCategories,
    MenuItems,
    Events,
    Pages,
  ],

  globals: [
    OpeningHours,
    SiteSettings,
  ],

  secret: process.env.PAYLOAD_SECRET || 'CHANGE-ME-IN-PRODUCTION',

  db: mongooseAdapter({
    url: process.env.MONGODB_URI || 'mongodb://localhost:27017/ichnusa',
  }),

  typescript: {
    outputFile: path.resolve(dirname, 'src/payload-types.ts'),
  },

  localization: {
    locales: [
      { label: 'Italiano', code: 'it' },
      { label: 'English', code: 'en' },
      { label: 'Čeština', code: 'cs' },
    ],
    defaultLocale: 'it',
    fallback: true,
  },

  sharp,
})
