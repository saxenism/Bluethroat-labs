import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { client } from '@/lib/sanity/client'
import { urlFor } from '@/lib/sanity/image'
import { DocContentRenderer } from '@/components/docs/content-renderer'

interface RelatedBlog {
  title: string
  slug: string
  category?: string
  publishedAt?: string
}

interface DocPageData {
  title: string
  heroImage?: { asset: { _ref: string; _type: string } }
  /** Markdown string (doc schema "content" field). */
  content?: string
  relatedBlogs?: RelatedBlog[]
}

type Props = { params: Promise<{ slug: string[] }> }

async function getDoc(slug: string): Promise<DocPageData | null> {
  const query = `*[_type == "doc" && slug.current == $slug][0] {
        title,
        heroImage,
        content,
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

  if (!doc) {
    return { title: 'Docs | Bluethroat Labs' }
  }

  return { title: `${doc.title} | Bluethroat Labs` }
}

export default async function DocsPage({ params }: Props) {
  const { slug } = await params
  const currentSlug = getCurrentSlug(slug ?? [])
  const pageData = await getDoc(currentSlug)

  if (!pageData) {
    notFound()
  }

  return (
    <article className="prose prose-invert max-w-none">
      {/* Header / Banner Image */}
      {pageData.heroImage && (
        <div className="bg-muted relative aspect-21/6 w-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={urlFor(pageData.heroImage).url()}
            alt={pageData.title}
            className="h-full w-full object-cover opacity-50 grayscale transition-opacity duration-700 hover:opacity-70"
          />
          <div className="absolute inset-0" />
        </div>
      )}

      <div className="mx-auto w-full max-w-5xl px-6 py-12 md:px-12 lg:px-20">
        <h1 className="mb-8 font-mono text-3xl font-bold tracking-tight sm:text-4xl">
          {pageData.title}
        </h1>

        <DocContentRenderer markdown={pageData.content} />

        {/* Blog Highlights Section */}
        {pageData.relatedBlogs && pageData.relatedBlogs.length > 0 && (
          <div className="border-border mt-16 border-t pt-16">
            <h2 className="text-muted-foreground mb-8 font-mono text-xl tracking-widest uppercase">
              Featured Reveries
            </h2>
            <div className="grid gap-6">
              {pageData.relatedBlogs.map((blog) => (
                <Link
                  key={blog.slug}
                  href={`/reveries/${blog.slug}`}
                  className="group border-border hover:bg-muted flex items-center justify-between border p-6 transition-all duration-300"
                >
                  <div className="space-y-2">
                    <div className="text-muted-foreground font-mono text-xs uppercase">
                      {blog.category}
                    </div>
                    <h3 className="font-mono text-lg font-bold transition-transform group-hover:translate-x-1">
                      {blog.title}
                    </h3>
                  </div>
                  <div className="border-border group-hover:bg-foreground group-hover:text-background flex h-10 w-10 items-center justify-center border transition-all">
                    →
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
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
