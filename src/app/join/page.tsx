import { StickyNavbar } from '@/components/layout/sticky-navbar'
import { Footer } from '@/components/layout/footer'
import { LandingStripImage } from '@/components/ui/landing-strip-image'
import { JoinUsSection } from '@/components/sections/join-us-section'
import type { Metadata } from 'next'

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

export default function JoinUsPage() {
  return (
    <div className="bg-background border-border relative container mx-auto min-h-screen border-x pt-12">
      <StickyNavbar />
      <main>
        <JoinUsSection />
        <Footer stripImage={<LandingStripImage />} />
      </main>
    </div>
  )
}
