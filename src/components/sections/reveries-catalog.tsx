'use client'

import { parseAsInteger, parseAsString, useQueryState } from 'nuqs'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { BlogItem } from '@/lib/sanity/reveries'
import { BlogCard } from '@/components/reveries/blog-card'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import Image from 'next/image'
import {
  GridActiveIcon,
  GridInactiveIcon,
  ListActiveIcon,
  ListInactiveIcon,
} from '@/assets/icons'

interface ReveriesCatalogProps {
  initialItems: BlogItem[]
  categories: string[]
}

const ITEMS_PER_PAGE = 4

export function ReveriesCatalog({
  initialItems,
  categories,
}: ReveriesCatalogProps) {
  const [search, setSearch] = useQueryState('q', parseAsString.withDefault(''))
  const [category, setCategory] = useQueryState(
    'cat',
    parseAsString.withDefault('All')
  )
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
  const [view, setView] = useQueryState(
    'view',
    parseAsString.withDefault('grid')
  )

  const filtered = initialItems.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(search.toLowerCase())
    const matchesCategory =
      category === 'All' ||
      item.category.toLowerCase() === category.toLowerCase()
    return matchesSearch && matchesCategory
  })

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  )

  function handleSearch(val: string) {
    setSearch(val || null)
    setPage(null)
  }

  function handleCategory(cat: string) {
    setCategory(cat === 'All' ? null : cat)
    setPage(null)
  }

  function handleView(v: string) {
    setView(v === 'grid' ? null : v)
  }

  const allCats = ['All', ...categories]
  const visibleCats = allCats.slice(0, 5)
  const overflowCats = allCats.slice(5)

  return (
    <section id="reveries" className="w-full">
      <div className="border-border relative isolate h-48 w-full border-b sm:h-52">
        <Image
          src="/reveries/bg.png"
          alt="Reveries Background"
          fill
          className="none -z-1 object-cover max-lg:object-[75%]"
        />

        <div className="flex h-full items-end px-4 py-2 md:px-8">
          <h1 className="font-instrumental text-6xl text-[#F2F2F2] sm:text-8xl">
            Reveries
          </h1>
        </div>
      </div>

      <div className="border-border border-b">
        <div className="flex h-12 items-center px-4 md:h-18 md:px-8">
          <Search className="text-muted-foreground mr-6 h-5 w-5 shrink-0" />
          <input
            type="text"
            placeholder="Search Blogs..."
            className="text-foreground placeholder:text-muted-foreground flex-1 border-none bg-transparent font-mono text-xl outline-none"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap md:mt-8">
        {visibleCats.map((cat) => {
          const isActive = cat === 'All' ? category === 'All' : category === cat
          return (
            <button
              key={cat}
              onClick={() => handleCategory(cat)}
              className={cn(
                'border-border -mt-px border-t border-r border-b px-8 py-6 text-lg leading-none font-medium',
                isActive
                  ? 'bg-foreground text-background'
                  : 'text-muted-foreground hover:text-foreground hover:bg-[#f2f2f2] dark:hover:bg-[#191919]'
              )}
            >
              {cat === 'All' ? 'All Categories' : cat}
            </button>
          )
        })}
        {overflowCats.length > 0 && (
          <div className="border-border -mt-px border-t border-r border-b">
            <Popover>
              <PopoverTrigger className="text-muted-foreground hover:text-foreground px-8 py-6 text-lg leading-none font-medium hover:bg-[#f2f2f2] dark:hover:bg-[#191919]">
                + {overflowCats.length} More
              </PopoverTrigger>
              <PopoverContent className="border-border bg-background w-auto min-w-[150px] rounded-none border p-0 shadow-lg">
                {overflowCats.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategory(cat)}
                    className={cn(
                      'border-border block w-full border-b px-8 py-6 text-left text-lg leading-none font-medium wrap-break-word',
                      category === cat
                        ? 'bg-foreground text-background'
                        : 'text-muted-foreground hover:text-foreground hover:bg-[#f2f2f2] dark:hover:bg-[#191919]'
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>

      <div className="mt-18 flex justify-end max-md:hidden">
        <button
          onClick={() => handleView('grid')}
          className="border-border grid size-18 place-items-center border-t border-l hover:bg-[#E6E6E6] dark:hover:bg-[#191919]"
        >
          {view === 'grid' ? (
            <GridActiveIcon className="h-8 w-8 text-[#1F1F1F] dark:text-[#EBEBEB]" />
          ) : (
            <GridInactiveIcon className="h-8 w-8 text-[#A9A9A9] dark:text-[#2E2E2E]" />
          )}
        </button>
        <button
          onClick={() => handleView('list')}
          className="border-border grid size-18 place-items-center border-t border-l hover:bg-[#E6E6E6] dark:hover:bg-[#191919]"
        >
          {view === 'list' ? (
            <ListActiveIcon className="h-8 w-8 text-[#1F1F1F] dark:text-[#EBEBEB]" />
          ) : (
            <ListInactiveIcon className="h-8 w-8 text-[#A9A9A9] dark:text-[#2E2E2E]" />
          )}
        </button>
      </div>

      <div className="max-md:mt-18">
        {paginated.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <p className="text-muted-foreground mb-6 text-xl">
              No posts found.
            </p>
            <button
              onClick={() => {
                setSearch(null)
                setCategory(null)
                setPage(null)
              }}
              className="border-border hover:bg-foreground hover:text-background border px-8 py-3 text-sm"
            >
              Clear filters
            </button>
          </div>
        ) : view === 'grid' ? (
          <div className="border-border grid grid-cols-1 border-t md:grid-cols-2">
            {paginated.map((blog, index) => (
              <BlogCard
                key={index}
                blog={blog}
                variant="grid"
                className={cn(
                  'max-md:border-r-0',
                  index % 2 !== 0 ? 'border-r-0' : ''
                )}
              />
            ))}
          </div>
        ) : (
          <div className="border-border flex flex-col border-t">
            {paginated.map((blog, index) => (
              <BlogCard key={index} blog={blog} />
            ))}
          </div>
        )}
      </div>

      {paginated.length > 0 && totalPages > 1 && (
        <div className="flex justify-center p-12">
          <div className="border-border flex flex-wrap border">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="border-border flex items-center border p-4 text-base font-medium hover:bg-[#f2f2f2] disabled:cursor-not-allowed! disabled:opacity-20 md:px-8 md:py-5.5 md:text-lg dark:hover:bg-[#191919]"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={cn(
                  'border-border border px-6 py-4 text-base font-medium md:px-8 md:py-5.5 md:text-lg',
                  page === p
                    ? 'bg-foreground text-background'
                    : 'text-muted-foreground hover:bg-[#f2f2f2] dark:hover:bg-[#191919]'
                )}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="border-border flex items-center border p-4 text-base font-medium hover:bg-[#f2f2f2] disabled:cursor-not-allowed! disabled:opacity-20 md:px-8 md:py-5.5 md:text-lg dark:hover:bg-[#191919]"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
