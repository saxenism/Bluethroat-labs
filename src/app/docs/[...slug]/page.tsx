import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { client } from '@/lib/sanity/client'
import { urlFor } from '@/lib/sanity/image'
import { DocContentRenderer } from '@/components/docs/content-renderer'
import Image from 'next/image'

interface DocPageData {
  title: string
  heroImage?: { asset: { _ref: string; _type: string } }
  content?: string
  seo?: {
    title?: string
    description?: string
    keywords?: string[]
    bannerImage?: { asset: { _ref: string; _type: string } }
  }
}

type Props = { params: Promise<{ slug: string[] }> }

async function getDoc(slug: string): Promise<DocPageData | null> {
  const query = `*[_type == "doc" && slug.current == $slug][0] {
        title,
        heroImage,
        content,
        seo {
          title,
          description,
          keywords,
          bannerImage
        },
        relatedBlogs[]-> {
            title,
            "slug": slug.current,
            category,
            publishedAt
        }
    }`

  return client.fetch(query, { slug })
}

function getCurrentSlug(slugArray: string[]): string {
  return (slugArray || []).join('/') || ''
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const currentSlug = getCurrentSlug(slug ?? [])
  const doc = await getDoc(currentSlug)

  if (!doc) return { title: 'Docs | Bluethroat Labs' }

  const seoTitle = doc.seo?.title || doc.title
  const seoDescription = doc.seo?.description
  const seoKeywords = doc.seo?.keywords
  const ogImage = doc.seo?.bannerImage
    ? urlFor(doc.seo.bannerImage).url()
    : '/og-image.png'

  const canonicalUrl = `/docs/${currentSlug}`

  return {
    title: seoTitle,
    ...(seoDescription && { description: seoDescription }),
    ...(seoKeywords?.length && { keywords: seoKeywords }),
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: 'article',
      url: canonicalUrl,
      title: seoTitle,
      ...(seoDescription && { description: seoDescription }),
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      ...(seoDescription && { description: seoDescription }),
      images: [ogImage],
    },
  }
}

export default async function DocsPage({ params }: Props) {
  const { slug } = await params
  const currentSlug = getCurrentSlug(slug ?? [])
  const pageData = await getDoc(currentSlug)

  if (!pageData) {
    notFound()
  }

  return (
    <article>
      <Image
        src={
          pageData.heroImage
            ? urlFor(pageData.heroImage).url()
            : '/landing/hero-bg.png'
        }
        alt={pageData.title}
        width={1048}
        height={304}
        className="none h-[226px] w-full object-cover md:h-[304px]"
      />

      <div className="container mx-auto w-full px-6 py-12 md:px-8">
        <h1 className="mb-8 font-mono text-2xl font-bold tracking-tight sm:text-[32px]">
          {pageData.title}
        </h1>

        <DocContentRenderer markdown={pageData.content} />
      </div>
    </article>
  )
}

export async function generateStaticParams() {
  const query = `*[_type == "doc"] { "slug": slug.current }`
  const docs = await client.fetch<Array<{ slug: string }>>(query)

  return docs
    .filter((doc) => doc.slug)
    .map((doc) => ({ slug: doc.slug.split('/') }))
}
