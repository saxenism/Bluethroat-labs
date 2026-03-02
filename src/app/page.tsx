import { StickyNavbar } from '@/components/layout/sticky-navbar'
import { HeroSection } from '@/components/sections/hero-section'
import { MissionSection } from '@/components/sections/mission-section'
import { WorkSection } from '@/components/sections/work-section'
import { PhilosophySection } from '@/components/sections/philosophy-section'
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
import type { SanityImageSource } from '@sanity/image-url'

export default async function Home() {
  const posts = await client.fetch<SanityBlogPost[]>(REVERIES_PREVIEW_QUERY)
  const blogs = (posts ?? []).map((post) =>
    mapSanityPostToBlogItem(post, (src) => urlFor(src as SanityImageSource))
  )

  return (
    <div className="min-h-screen dark:bg-black">
      <div className="bg-background border-border relative mx-auto min-h-screen max-w-[1300px] border-x">
        <StickyNavbar />
        <main className="pt-24 font-mono">
          <HeroSection />
          <MissionSection />
          <TeeSection />
          <PhilosophySection />
          <WorkSection />
          <ReveriesSection blogs={blogs} />
          <TeamSection />
          <Footer />
        </main>
      </div>
    </div>
  )
}
