import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { SerwistProvider } from '@serwist/turbopack/react'

import { CartDrawer } from '@/components/cart/cart-drawer'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { MobileMenu } from '@/components/layout/mobile-menu'
import { MobileTabBar } from '@/components/layout/mobile-tab-bar'
import { OfflineIndicator } from '@/components/layout/offline-indicator'
import { Toaster } from '@/components/ui/toast'
import { ThemeProvider, themeScript } from '@/components/theme-provider'
import { SITE } from '@/lib/constants'

import './globals.css'

const fontSans = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

const fontDisplay = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    'clothing',
    'womenswear',
    'menswear',
    'kids clothing',
    'sneakers',
    'accessories',
    'activewear',
    'E-Closh Shop',
  ],
  openGraph: {
    type: 'website',
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
      { url: '/icon.png', sizes: 'any', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: SITE.themeColor },
    { media: '(prefers-color-scheme: dark)', color: '#0c0a09' },
  ],
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontDisplay.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <SerwistProvider swUrl="/serwist/sw.js">
          <ThemeProvider>
            <Header />
            <main className="flex-1 pb-20 lg:pb-0">{children}</main>
            <Footer />
            <MobileTabBar />
            <MobileMenu />
            <CartDrawer />
            <OfflineIndicator />
            <Toaster />
          </ThemeProvider>
        </SerwistProvider>
      </body>
    </html>
  )
}