'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { client } from '@/lib/sanity/client'
import { urlFor } from '@/lib/sanity/image'
import { BlogRenderer } from '@/components/reveries/blog-renderer'
import { IS_DEV, MOCK_DOCS } from '@/lib/mock-data'

export default function DocsPage() {
  const params = useParams()
  const slugArray = params.slug as string[]
  const currentSlug = slugArray?.join('/') || ''
  const [pageData, setPageData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
    const fetchDoc = async () => {
      if (IS_DEV && MOCK_DOCS[currentSlug as keyof typeof MOCK_DOCS]) {
        const data = MOCK_DOCS[currentSlug as keyof typeof MOCK_DOCS]
        console.log('DocsPage Mock Data:', { slug: currentSlug, data })
        setPageData(data)
        setLoading(false)
        return
      }

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
      const data = await client.fetch(query, { slug: currentSlug })
      console.log('DocsPage Fetch:', { slug: currentSlug, data })
      setPageData(data)
      setLoading(false)
    }
    fetchDoc()
  }, [currentSlug])

  if (loading) {
    return <div className="min-h-screen animate-pulse bg-zinc-100/10" />
  }

  if (!pageData) {
    return (
      <div className="flex min-h-[78vh] flex-col items-center justify-center font-mono">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="text-muted-foreground">Document not found.</p>
      </div>
    )
  }

  return (
    <article className="prose prose-invert max-w-none">
      {/* Header / Banner Image */}
      {mounted && pageData.heroImage && (
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

        <BlogRenderer sanityContent={pageData.content} />

        {/* Blog Highlights Section */}
        {pageData.relatedBlogs && pageData.relatedBlogs.length > 0 && (
          <div className="border-border mt-16 border-t pt-16">
            <h2 className="text-muted-foreground mb-8 font-mono text-xl tracking-widest uppercase">
              Featured Reveries
            </h2>
            <div className="grid gap-6">
              {pageData.relatedBlogs.map((blog: any) => (
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
