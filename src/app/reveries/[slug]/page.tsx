import { client } from '@/lib/sanity/client'
import { urlFor } from '@/lib/sanity/image'
import { notFound } from 'next/navigation'
import { BlogRenderer } from '@/components/reveries/blog-renderer'
import { Metadata } from 'next'
import { StickyNavbar } from '@/components/layout/sticky-navbar'
import { Footer } from '@/components/layout/footer'

type Props = { params: Promise<{ slug: string }> }

async function getPost(slug: string) {
  const query = `*[_type == "blog" && slug.current == $slug][0] {
        title,
        bannerImage,
        content,
        "category": category->title,
        publishedAt
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
      <main className="">
        {/* Banner Area */}
        <div className="w-full">
          <div className="border-border relative aspect-video w-full overflow-hidden border-b bg-zinc-100 transition-all duration-700 sm:aspect-30/9 dark:bg-zinc-900">
            {post.bannerImage ? (
              <div
                className="absolute inset-0 scale-110 bg-cover bg-center grayscale transition-transform duration-1000 hover:scale-100"
                style={{
                  backgroundImage: `url(${urlFor(post.bannerImage).url()})`,
                }}
              />
            ) : (
              <div
                className="absolute inset-0 scale-110 bg-cover bg-center grayscale transition-transform duration-1000 hover:scale-100"
                style={{ backgroundImage: 'url(/dark-mode/dark-footer.png)' }}
              />
            )}
            <div className="absolute inset-0 bg-black/20" />
          </div>
        </div>

        <article className="border-border bg-background border-b">
          <BlogRenderer
            blocks={[]}
            markdown={post.content}
            metadata={{
              category: post.category,
              date: post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: '2-digit',
                    year: 'numeric',
                  })
                : undefined,
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
