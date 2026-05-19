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
import { getBlurDataURL } from '@/lib/plaiceholder'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { Suspense } from 'react'
import type { Metadata } from 'next'
import { ImageWithBlur } from '@/components/ui/image-with-blur'
import { BASE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Reveries',
  description:
    'Research writings, security analyses, and technical deep-dives from the Bluethroat Labs team.',
  alternates: { canonical: '/reveries' },
  openGraph: {
    type: 'website',
    url: '/reveries',
    title: 'Reveries | Bluethroat Labs',
    description:
      'Research writings, security analyses, and technical deep-dives from the Bluethroat Labs team.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reveries | Bluethroat Labs',
    description:
      'Research writings, security analyses, and technical deep-dives from the Bluethroat Labs team.',
    images: ['/og-image.png'],
  },
}

export default async function ReveriesPage() {
  const posts = await client.fetch<SanityBlogPost[]>(REVERIES_LIST_QUERY)
  const items = (posts ?? []).map((post) =>
    mapSanityPostToBlogItem(post, (src) => urlFor(src as SanityImageSource))
  )
  const blogs = await Promise.all(
    items.map(async (blog) => ({
      ...blog,
      blurDataURL: blog.src
        ? await getBlurDataURL(blog.src, { size: 50 })
        : undefined,
    }))
  )

  const categories = [
    ...new Set(blogs.flatMap((b) => b.categories).filter(Boolean)),
  ]

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${BASE_URL}/reveries`,
    name: 'Reveries | Bluethroat Labs',
    url: `${BASE_URL}/reveries`,
    description:
      'Research writings, security analyses, and technical deep-dives from the Bluethroat Labs team.',
    publisher: {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: 'Bluethroat Labs',
    },
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      name: 'Bluethroat Labs',
      url: BASE_URL,
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: blogs.map((blog, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${BASE_URL}${blog.href}`,
        name: blog.title,
      })),
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <Suspense>
        <NuqsAdapter>
          <div className="bg-background border-border relative container mx-auto min-h-screen border-x pt-12">
            <StickyNavbar />
            <main>
              <ReveriesCatalog
                initialItems={blogs}
                categories={categories}
                bannerImage={
                  <ImageWithBlur
                    src="/reveries/bg.png"
                    alt="Reveries Background"
                    fill
                    className="none -z-1 object-cover max-lg:object-[75%]"
                    preload
                  />
                }
              />
              <Footer />
            </main>
          </div>
        </NuqsAdapter>
      </Suspense>
    </>
  )
}
