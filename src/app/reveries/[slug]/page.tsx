import { client } from '@/lib/sanity/client'
import { urlFor } from '@/lib/sanity/image'
import { notFound } from 'next/navigation'
import { BlogRenderer } from '@/components/reveries/blog-renderer'
import { Metadata } from 'next'
import { StickyNavbar } from '@/components/layout/sticky-navbar'
import { Footer } from '@/components/layout/footer'
import Image from 'next/image'

type Props = { params: Promise<{ slug: string }> }

async function getPost(slug: string) {
  const query = `*[_type == "blog" && slug.current == $slug][0] {
        title,
        bannerImage,
        content,
        "category": category->title,
        publishedAt,
        "author": author->name
    }`
  return await client.fetch(query, { slug })
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  return { title: post ? `${post.title} | Bluethroat Labs` : 'Blog' }
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
              <Image
                src={urlFor(post.bannerImage).url()}
                alt={post.title}
                fill
                className="object-cover"
              />
            ) : (
              <>
                <Image
                  src="/landing/footer-bg-light.png"
                  alt="Footer"
                  fill
                  className="object-cover dark:hidden"
                />
                <Image
                  src="/landing/footer-bg-dark.png"
                  alt="Footer"
                  fill
                  className="hidden object-cover dark:block"
                />
              </>
            )}
          </div>
        </div>

        <article>
          <BlogRenderer
            markdown={post.content}
            metadata={{
              title: post.title,
              category: post.category,
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
