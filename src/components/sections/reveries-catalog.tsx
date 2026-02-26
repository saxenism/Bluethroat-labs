'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Grid, List, ArrowUpRight } from 'lucide-react'
import { client } from '@/lib/sanity/client'
import { urlFor } from '@/lib/sanity/image'
import { cn } from '@/lib/utils'

interface BlogItem {
  title: string
  date: string
  category: string
  href: string
  src: string | null
}

interface SanityBlogPost {
  title: string
  slug: string
  bannerImage?: { asset: { _ref: string; _type: string } }
  category?: string
  publishedAt?: string
}

const CATEGORIES = [
  'All Categories',
  'TEE Security',
  'Dolor Sit',
  'Lorem Ipsum',
  'Signum Dolor',
]

const BLOGS_QUERY = `*[_type == "blog"] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    bannerImage,
    category,
    publishedAt
}`

export function ReveriesCatalog() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    'All Categories',
  ])
  const [customFilters, setCustomFilters] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const [currentPage, setCurrentPage] = useState(1)
  const [allItems, setAllItems] = useState<BlogItem[]>([])
  const itemsPerPage = 10

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await client.fetch<SanityBlogPost[]>(BLOGS_QUERY)
        setAllItems(
          blogs.map((post) => ({
            title: post.title,
            date: post.publishedAt
              ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: '2-digit',
                  year: 'numeric',
                })
              : 'Coming soon',
            category: post.category || 'General',
            href: `/reveries/${post.slug}`,
            src: post.bannerImage ? urlFor(post.bannerImage).url() : null,
          }))
        )
      } catch (err) {
        console.error('Failed to fetch Sanity blogs', err)
      }
    }
    fetchBlogs()
  }, [])

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) => {
      if (cat === 'All Categories') return ['All Categories']

      const filtering = prev.filter((c) => c !== 'All Categories')
      if (filtering.includes(cat)) {
        const next = filtering.filter((c) => c !== cat)
        return next.length === 0 ? ['All Categories'] : next
      } else {
        return [...filtering, cat]
      }
    })
  }

  const filteredReveries = allItems.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategories.includes('All Categories') ||
      selectedCategories.some(
        (cat) => item.category.toLowerCase() === cat.toLowerCase()
      )
    return matchesSearch && matchesCategory
  })

  // Reset to page 1 if filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedCategories])

  const totalPages = Math.ceil(filteredReveries.length / itemsPerPage)
  const paginatedReveries = filteredReveries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="border-border relative h-48 w-full overflow-hidden border-b sm:h-56">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/Reveries-Catalog.png)' }}
        />

        {/* Simulated Glitch Overlay - Adjusted */}
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%)',
            backgroundSize: '100% 2px',
          }}
        />

        <div className="absolute inset-0 mt-auto flex max-w-[1300px] items-baseline-last justify-start px-6 py-4">
          <h1 className="font-instrumental text-6xl text-zinc-100 drop-shadow-2xl sm:text-8xl">
            Reveries
          </h1>
        </div>
      </div>

      {/* Filter Section */}
      <div>
        {/* Search Bar */}
        <div className="bg-background mx-auto flex h-20 max-w-[1300px] items-center px-8">
          <Search className="text-muted-foreground mr-6 h-6 w-6" />
          <input
            type="text"
            placeholder="Search Blogs..."
            className="text-foreground placeholder:text-muted-foreground flex-1 border-none bg-transparent font-mono text-xl outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Categories */}
        <div className="border-border bg-background mx-auto flex max-w-[1300px] flex-wrap border-t">
          {[...CATEGORIES, ...customFilters].map((cat) => (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className={cn(
                'border-border border-r border-b px-8 py-6 font-mono text-base transition-all',
                selectedCategories.includes(cat)
                  ? 'bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900'
                  : 'text-muted-foreground hover:text-foreground hover:bg-zinc-50 dark:hover:bg-zinc-900'
              )}
            >
              {cat}
            </button>
          ))}
          <div className="border-border flex min-w-[200px] flex-1 items-center border-b bg-zinc-50/50 px-8 dark:bg-zinc-900/50">
            <input
              type="text"
              placeholder="+ Add Filter"
              className="text-foreground placeholder:text-muted-foreground w-full border-none bg-transparent font-mono text-sm outline-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const val = e.currentTarget.value.trim()
                  if (val) {
                    if (
                      !CATEGORIES.includes(val) &&
                      !customFilters.includes(val)
                    ) {
                      setCustomFilters((prev) => [...prev, val])
                    }
                    toggleCategory(val)
                    e.currentTarget.value = ''
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div className="bg-background mx-auto mt-16 flex max-w-[1300px] justify-end">
        <button
          onClick={() => setViewMode('grid')}
          className={cn(
            'border-border border-x border-t p-4 transition-all',
            viewMode === 'grid'
              ? 'text-foreground bg-zinc-100 dark:bg-zinc-900'
              : 'text-muted-foreground hover:bg-zinc-50'
          )}
        >
          <Grid className="h-10 w-10" />
        </button>
        <button
          onClick={() => setViewMode('list')}
          className={cn(
            'border-border border-t p-4 transition-all',
            viewMode === 'list'
              ? 'text-foreground bg-zinc-100 dark:bg-zinc-900'
              : 'text-muted-foreground hover:bg-zinc-50'
          )}
        >
          <List className="h-10 w-10" />
        </button>
      </div>

      {/* Content Section */}
      <div className="border-border bg-background mx-auto min-h-[600px] max-w-[1300px] border-t">
        {viewMode === 'list' ? (
          <div className="flex flex-col">
            {paginatedReveries.map((blog, index) => (
              <Link
                key={index}
                href={blog.href}
                className="group border-border flex items-stretch border-b transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/10"
              >
                <div className="flex flex-1 flex-col items-start p-8 sm:flex-row sm:items-center sm:p-14">
                  <div className="border-border relative mb-6 aspect-video w-full shrink-0 overflow-hidden border bg-zinc-100 sm:mr-12 sm:mb-0 sm:w-64 dark:bg-zinc-900">
                    {blog.src ? (
                      <div
                        className="absolute inset-0 bg-cover bg-center opacity-40 transition-opacity group-hover:opacity-60"
                        style={{ backgroundImage: `url(${blog.src})` }}
                      />
                    ) : (
                      <div
                        className="absolute inset-0 bg-cover bg-center opacity-40 transition-opacity group-hover:opacity-60"
                        style={{
                          backgroundImage: 'url(/dark-mode/dark-footer.png)',
                        }}
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="group-hover:text-foreground mb-4 max-w-4xl font-mono text-lg leading-tight font-bold transition-colors sm:text-2xl">
                      {blog.title}
                    </h3>
                    <div className="text-muted-foreground flex items-center font-mono text-xs tracking-[0.2em] uppercase">
                      <span className="font-bold">{blog.category}</span>
                      <span className="text-border mx-3">•</span>
                      <span>{blog.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-start justify-end">
                  <div className="border-border border-b border-l">
                    <ArrowUpRight className="group-hover:text-foreground h-18 w-18 stroke-[1.4px]" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2">
            {paginatedReveries.map((blog, index) => (
              <Link
                key={index}
                href={blog.href}
                className="group border-border flex h-full flex-col border-r border-b p-8 sm:p-12"
              >
                <div className="border-border relative mb-8 aspect-video w-full overflow-hidden border bg-zinc-100 dark:bg-zinc-900">
                  {blog.src ? (
                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-40 transition-opacity group-hover:opacity-70"
                      style={{ backgroundImage: `url(${blog.src})` }}
                    />
                  ) : (
                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-40 transition-opacity group-hover:opacity-70"
                      style={{
                        backgroundImage: 'url(/dark-mode/dark-footer.png)',
                      }}
                    />
                  )}
                </div>

                {/* FIXED GRID ARROW: Title and Arrow share a row */}
                <div className="mb-auto flex items-start justify-between gap-4">
                  <h3 className="group-hover:text-foreground font-mono text-lg font-bold transition-colors sm:text-xl">
                    {blog.title}
                  </h3>
                  <div className="border-border bg-background group-hover:bg-foreground shrink-0 border">
                    <ArrowUpRight className="group-hover:text-background h-14 w-14 stroke-[1.5px]" />
                  </div>
                </div>

                <div className="text-muted-foreground flex items-center justify-between pt-12 font-mono text-[10px] sm:text-xs">
                  <span className="font-bold">{blog.category}</span>
                  <span>{blog.date}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Pagination Section */}
      <div className="mx-auto flex max-w-[1300px] justify-center bg-zinc-50/30 p-12 dark:bg-zinc-950/30">
        <div className="border-border bg-background flex border shadow-sm">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="border-border hover:bg-muted flex items-center gap-3 border-y px-10 py-5 font-mono text-sm font-bold transition-colors disabled:opacity-20"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={cn(
                'border-border border-y px-8 py-5 font-mono text-base font-semibold last:border-r-0',
                currentPage === i + 1
                  ? 'bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900'
                  : 'text-muted-foreground'
              )}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="hover:bg-muted border-border flex items-center gap-3 border-l px-10 py-5 font-mono text-base font-semibold transition-colors disabled:opacity-20"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
