import type { Metadata } from 'next'
import '@payloadcms/next/css'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export const metadata: Metadata = {
  title: 'Ichnusa CMS',
  description: 'Admin panel per Ichnusa Botega & Bistro',
}

export default function PayloadLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
