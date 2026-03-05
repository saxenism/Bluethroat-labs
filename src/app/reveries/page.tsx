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
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { Suspense } from 'react'

export default async function ReveriesPage() {
  const posts = await client.fetch<SanityBlogPost[]>(REVERIES_LIST_QUERY)

  const blogs = (posts ?? []).map((post) =>
    mapSanityPostToBlogItem(post, (src) => urlFor(src as SanityImageSource))
  )

  const categories = [...new Set(blogs.map((b) => b.category).filter(Boolean))]

  return (
    <Suspense>
      <NuqsAdapter>
        <div className="bg-background border-border relative container mx-auto min-h-screen border-x pt-12">
          <StickyNavbar />
          <main>
            <ReveriesCatalog initialItems={blogs} categories={categories} />
            <Footer />
          </main>
        </div>
      </NuqsAdapter>
    </Suspense>
  )
}
