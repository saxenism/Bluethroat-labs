import { StickyNavbar } from '@/components/layout/sticky-navbar'
import { Footer } from '@/components/layout/footer'
import { ReveriesCatalog } from '@/components/sections/reveries-catalog'
import { client } from '@/lib/sanity/client'
import { urlFor } from '@/lib/sanity/image'
import {
  REVERIES_LIST_QUERY,
  mapSanityPostToBlogItem,
  type SanityBlogPost,
} from '@/lib/sanity/reveries'
import type { SanityImageSource } from '@sanity/image-url'

export default async function ReveriesPage() {
  const posts = await client.fetch<SanityBlogPost[]>(REVERIES_LIST_QUERY)
  const blogs = (posts ?? []).map((post) =>
    mapSanityPostToBlogItem(post, (src) => urlFor(src as SanityImageSource))
  )

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="bg-background border-border relative mx-auto min-h-screen max-w-[1300px] border-x">
        <StickyNavbar />
        <main className="pt-24 font-mono">
          <ReveriesCatalog initialItems={blogs} />
          <Footer />
        </main>
      </div>
    </div>
  )
}
