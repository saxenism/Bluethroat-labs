import type { Metadata } from 'next'
import { Instrument_Serif, Geist_Mono, Bai_Jamjuree } from 'next/font/google'
import './globals.css'
import { HashLinkHandler } from '@/components/markdown/hash-link-handler'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ReactNode } from 'react'
import { BASE_URL } from '@/lib/constants'

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-instrumental',
  weight: ['400'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

const baiJamjuree = Bai_Jamjuree({
  subsets: ['latin'],
  variable: '--font-bai-jamjuree',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: { default: 'Bluethroat Labs', template: '%s | Bluethroat Labs' },
  description:
    'Security research collective focused on making TEE-heavy Web3 protocols secure, robust, and reliable.',
  alternates: { canonical: '/' },
  icons: { icon: '/favicon.svg', apple: '/apple-touch-icon.png' },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    url: BASE_URL,
    siteName: 'Bluethroat Labs',
    title: 'Bluethroat Labs',
    description:
      'Security research collective focused on making TEE-heavy Web3 protocols secure, robust, and reliable.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bluethroat Labs',
    description:
      'Security research collective focused on making TEE-heavy Web3 protocols secure, robust, and reliable.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${geistMono.variable} ${baiJamjuree.variable}`}
      suppressHydrationWarning
    >
      <body className="selection:bg-foreground selection:text-background font-mono antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <HashLinkHandler />
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
