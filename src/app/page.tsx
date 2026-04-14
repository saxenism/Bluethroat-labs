import { StickyNavbar } from '@/components/layout/sticky-navbar'
import { HeroSection } from '@/components/sections/hero-section'
import { MissionSection } from '@/components/sections/mission-section'
import { WorkSection } from '@/components/sections/work-section'
import { ReveriesSection } from '@/components/sections/reveries-section'
import { TeamSection } from '@/components/sections/team-section'
import { Footer } from '@/components/layout/footer'
import { TeeSection } from '@/components/sections/tee-section'
import { client } from '@/lib/sanity/client'
import { urlFor } from '@/lib/sanity/image'
import {
  REVERIES_PREVIEW_QUERY,
  mapSanityPostToBlogItem,
  type SanityBlogPost,
} from '@/lib/sanity/reveries'
import {
  WRITEUPS_QUERY,
  mapSanityWriteupToItem,
  type SanityWriteup,
} from '@/lib/sanity/writeups'
import type { SanityImageSource } from '@sanity/image-url'
import { BASE_URL } from '@/lib/constants'

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${BASE_URL}/#organization`,
  name: 'Bluethroat Labs',
  url: BASE_URL,
  logo: `${BASE_URL}/favicon.svg`,
  description:
    'We build domain-specific AI security agents for complex protocol architectures. One agent per domain. All of them sharing intelligence to stop cascading failures.',
  sameAs: [
    'https://x.com/bluethroat_labs',
    'https://www.linkedin.com/company/bluethroat-labs',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'saxenism@bluethroatlabs.com',
    contactType: 'general',
  },
}

export default async function Home() {
  const posts = await client.fetch<SanityBlogPost[]>(REVERIES_PREVIEW_QUERY)
  const writeups = await client.fetch<SanityWriteup[]>(WRITEUPS_QUERY)

  const blogs = (posts ?? []).map((post) =>
    mapSanityPostToBlogItem(post, (src) => urlFor(src as SanityImageSource))
  )
  const writeupItems = (writeups ?? []).map((writeup) =>
    mapSanityWriteupToItem(writeup, (src) => urlFor(src as SanityImageSource))
  )

  return (
    <div className="bg-background border-border relative container mx-auto min-h-screen border-x pt-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <StickyNavbar />
      <main>
        <HeroSection />
        <MissionSection />
        <TeeSection />
        <WorkSection writeups={writeupItems} />
        <ReveriesSection blogs={blogs} />
        <TeamSection />
        <Footer />
      </main>
    </div>
  )
}
