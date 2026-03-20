import { StickyNavbar } from '@/components/layout/sticky-navbar'
import { Footer } from '@/components/layout/footer'
import { JoinUsSection } from '@/components/sections/join-us-section'
import type { Metadata } from 'next'
import { BASE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Join Us',
  description:
    'Work with Bluethroat Labs — join our security research collective focused on TEE-heavy Web3 protocols.',
  alternates: { canonical: '/join' },
  openGraph: {
    type: 'website',
    url: '/join',
    title: 'Join Us | Bluethroat Labs',
    description:
      'Work with Bluethroat Labs — join our security research collective focused on TEE-heavy Web3 protocols.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Join Us | Bluethroat Labs',
    description:
      'Work with Bluethroat Labs — join our security research collective focused on TEE-heavy Web3 protocols.',
    images: ['/og-image.png'],
  },
}

const webPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${BASE_URL}/join`,
  name: 'Join Us | Bluethroat Labs',
  url: `${BASE_URL}/join`,
  description:
    'Work with Bluethroat Labs — join our security research collective focused on TEE-heavy Web3 protocols.',
  publisher: {
    '@type': 'Organization',
    '@id': `${BASE_URL}`,
    name: 'Bluethroat Labs',
  },
  isPartOf: {
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    name: 'Bluethroat Labs',
    url: BASE_URL,
  },
}

export default function JoinUsPage() {
  return (
    <div className="bg-background border-border relative container mx-auto min-h-screen border-x pt-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <StickyNavbar />
      <main>
        <JoinUsSection />
        <Footer />
      </main>
    </div>
  )
}
