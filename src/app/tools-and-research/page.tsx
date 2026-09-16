import type { Metadata } from 'next'
import { Suspense } from 'react'
import { StickyNavbar } from '@/components/layout/sticky-navbar'
import { Footer } from '@/components/layout/footer'
import { ToolsResearchHub } from '@/components/tools-and-research/tools-research-hub'
import { BASE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Tools & Research',
  description:
    'Free tools and practical research from Bluethroat Labs for safer work in Web3.',
  alternates: { canonical: '/tools-and-research' },
  openGraph: {
    type: 'website',
    url: '/tools-and-research',
    title: 'Tools & Research | Bluethroat Labs',
    description:
      'Free tools and practical research from Bluethroat Labs for safer work in Web3.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tools & Research | Bluethroat Labs',
    description:
      'Free tools and practical research from Bluethroat Labs for safer work in Web3.',
    images: ['/og-image.png'],
  },
}

const collectionJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${BASE_URL}/tools-and-research`,
  name: 'Tools & Research | Bluethroat Labs',
  url: `${BASE_URL}/tools-and-research`,
  description:
    'Free tools and practical research from Bluethroat Labs for safer work in Web3.',
  publisher: {
    '@type': 'Organization',
    '@id': `${BASE_URL}/#organization`,
    name: 'Bluethroat Labs',
  },
}

export default function ToolsAndResearchPage() {
  return (
    <div className="bg-background border-border relative container mx-auto min-h-screen border-x pt-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <StickyNavbar />
      <main>
        <Suspense fallback={<div className="min-h-[70vh]" />}>
          <ToolsResearchHub />
        </Suspense>
        <Footer />
      </main>
    </div>
  )
}
