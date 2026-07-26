import { client } from '@/lib/sanity/client'
import { urlFor } from '@/lib/sanity/image'
import { notFound } from 'next/navigation'
import { BlogRenderer } from '@/components/reveries/blog-renderer'
import { Metadata } from 'next'
import { StickyNavbar } from '@/components/layout/sticky-navbar'
import { Footer } from '@/components/layout/footer'
import { ImageWithBlur } from '@/components/ui/image-with-blur'
import { LandingStripImageWithBlur } from '@/components/ui/landing-strip-image-with-blur'
import { BASE_URL } from '@/lib/constants'

type Props = { params: Promise<{ slug: string }> }

async function getPost(slug: string) {
  const query = `*[_type == "blog" && slug.current == $slug][0] {
        title,
        seriesLabel,
        bannerImage,
        content,
        "categories": categories[]->title,
        publishedAt,
        _updatedAt,
        "author": author->{
          name,
          socialHandle,
          socialLink
        },
        seo {
          title,
          description,
          keywords,
          bannerImage
        }
    }`
  return await client.fetch(query, { slug })
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) return { title: 'Blog' }

  const seoTitle = post.seo?.title || post.title
  const seoDescription = post.seo?.description
  const seoKeywords = post.seo?.keywords
  const ogImage = post.seo?.bannerImage
    ? urlFor(post.seo.bannerImage).url()
    : '/og-image.png'

  const canonicalUrl = `/reveries/${slug}`

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

function buildArticleJsonLd(post: Record<string, unknown>, slug: string) {
  const canonicalUrl = `${BASE_URL}/reveries/${slug}`
  const image = post.bannerImage
    ? urlFor(post.bannerImage as Parameters<typeof urlFor>[0]).url()
    : `${BASE_URL}/og-image.png`

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': canonicalUrl,
    headline: post.title,
    description: (post.seo as Record<string, unknown>)?.description || '',
    url: canonicalUrl,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
      name: (post.seo as Record<string, unknown>)?.title || post.title,
    },
    image: { '@type': 'ImageObject', url: image, width: 1200, height: 630 },
    datePublished: post.publishedAt || undefined,
    dateModified: post._updatedAt || post.publishedAt || undefined,
    author: (post.author as Record<string, unknown>)?.name
      ? {
          '@type': 'Person',
          name: (post.author as Record<string, unknown>).name,
          ...((post.author as Record<string, unknown>).socialLink
            ? { url: (post.author as Record<string, unknown>).socialLink }
            : {}),
        }
      : undefined,
    publisher: {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: 'Bluethroat Labs',
      logo: `${BASE_URL}/favicon.svg`,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  const articleJsonLd = buildArticleJsonLd(post, slug)

  return (
    <div className="bg-background border-border relative container mx-auto min-h-screen border-x pt-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <StickyNavbar />
      <main>
        <div className="w-full pt-12 pb-8 md:py-12">
          <div className="none relative h-56.5 w-full overflow-hidden md:h-100">
            {post.bannerImage ? (
              <ImageWithBlur
                src={urlFor(post.bannerImage).url()}
                alt={post.title}
                fill
                className="object-cover"
                preload
              />
            ) : (
              <LandingStripImageWithBlur />
            )}
          </div>
        </div>

        <article>
          <BlogRenderer
            markdown={post.content}
            metadata={{
              title: post.title,
              seriesLabel: post.seriesLabel ?? undefined,
              categories: post.categories ?? [],
              date: post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: '2-digit',
                    year: 'numeric',
                  })
                : undefined,
              author: post.author ?? undefined,
            }}
          />
        </article>

        <Footer />
      </main>
    </div>
  )
}

export async function generateStaticParams() {
  const query = `*[_type == "blog"] { "slug": slug.current }`
  const posts = await client.fetch<Array<{ slug: string }>>(query)
  return posts.map((post) => ({ slug: post.slug }))
}
