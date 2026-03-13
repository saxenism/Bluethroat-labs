import { client } from '@/lib/sanity/client'
import { urlFor } from '@/lib/sanity/image'
import { notFound } from 'next/navigation'
import { BlogRenderer } from '@/components/reveries/blog-renderer'
import { Metadata } from 'next'
import { StickyNavbar } from '@/components/layout/sticky-navbar'
import { Footer } from '@/components/layout/footer'
import { ImageWithBlur } from '@/components/ui/image-with-blur'
import { LandingStripImage } from '@/components/ui/landing-strip-image'

type Props = { params: Promise<{ slug: string }> }

async function getPost(slug: string) {
  const query = `*[_type == "blog" && slug.current == $slug][0] {
        title,
        bannerImage,
        content,
        "categories": categories[]->title,
        publishedAt,
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

  if (!post) return { title: 'Blog | Bluethroat Labs' }

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

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="bg-background border-border relative container mx-auto min-h-screen border-x pt-12">
      <StickyNavbar />
      <main>
        <div className="w-full pt-12 pb-8 md:py-12">
          <div className="none relative h-[226px] w-full overflow-hidden md:h-[400px]">
            {post.bannerImage ? (
              <ImageWithBlur
                src={urlFor(post.bannerImage).url()}
                alt={post.title}
                fill
                className="object-cover"
                preload
              />
            ) : (
              <LandingStripImage />
            )}
          </div>
        </div>

        <article>
          <BlogRenderer
            markdown={post.content}
            metadata={{
              title: post.title,
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

        <Footer stripImage={<LandingStripImage />} />
      </main>
    </div>
  )
}

export async function generateStaticParams() {
  const query = `*[_type == "blog"] { "slug": slug.current }`
  const posts = await client.fetch<Array<{ slug: string }>>(query)
  return posts.map((post) => ({ slug: post.slug }))
}
