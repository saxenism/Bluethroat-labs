import { urlFor } from '@/lib/sanity/image'
import { notFound } from 'next/navigation'
import { BlogRenderer } from '@/components/reveries/blog-renderer'
import { Metadata } from 'next'
import { StickyNavbar } from '@/components/layout/sticky-navbar'
import { Footer } from '@/components/layout/footer'
import { ImageWithBlur } from '@/components/ui/image-with-blur'
import { LandingStripImageWithBlur } from '@/components/ui/landing-strip-image-with-blur'
import { getPost } from './draftClient'

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ secret: string }>
}

export const metadata: Metadata = {
  title: 'Draft Reveries',
  description:
    'Research writings, security analyses, and technical deep-dives from the Bluethroat Labs team.',
}

export default async function BlogPostPage({ params, searchParams }: Props) {
  const { id } = await params
  const { secret } = await searchParams
  const post = await getPost(id, secret)

  if (!post) {
    notFound()
  }

  return (
    <div className="bg-background border-border relative container mx-auto min-h-screen border-x pt-12">
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
