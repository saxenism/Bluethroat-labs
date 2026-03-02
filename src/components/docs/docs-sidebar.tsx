import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { Search, ChevronDown, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { NavItem, SearchableDoc } from '@/lib/sanity/docs-nav'

interface DocsSidebarProps {
  navigation: NavItem[]
  searchableDocs: SearchableDoc[]
}

export function DocsSidebar({ navigation, searchableDocs }: DocsSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const params = useParams()
  const pathname = usePathname()
  const currentSlug = (params.slug as string[])?.join('/') || ''

  // Client-side search over pre-fetched doc list (statically generated)
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return null
    return searchableDocs.filter(
      (doc) =>
        doc.title.toLowerCase().includes(q) ||
        (doc.slug && doc.slug.toLowerCase().includes(q))
    )
  }, [searchQuery, searchableDocs])

  // Filter nav tree by title when not showing search results
  const filteredNavigation = useMemo(() => {
    if (!searchQuery || searchResults !== null) return navigation

    const filterItems = (items: NavItem[]): NavItem[] => {
      return items.reduce((acc: NavItem[], item) => {
        const matches = item.title
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase())
        const subItems = item.items ? filterItems(item.items) : []

        if (matches || subItems.length > 0) {
          acc.push({
            ...item,
            items: subItems.length > 0 ? subItems : undefined,
          })
        }
        return acc
      }, [])
    }

    return filterItems(navigation)
  }, [searchQuery, navigation, searchResults])

  return (
    <aside className="border-border bg-background sticky top-16 z-30 hidden h-[calc(100vh-64px)] w-[320px] shrink-0 overflow-y-auto border-r pt-12 md:block">
      {/* Search Section */}
      <div className="border-border bg-background sticky top-0 z-10 border-y">
        <div className="group relative py-2">
          <Search className="text-muted-foreground group-focus-within:text-foreground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transition-colors" />
          <input
            type="text"
            placeholder="Search Docs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="text-md focus:border-foreground h-10 w-full pr-12 pl-12 font-mono transition-colors focus:outline-none"
          />
        </div>
      </div>

      {/* Doc navigation tree */}
      <div>
        <nav>
          {searchResults ? (
            <div className="py-4">
              <div className="text-muted-foreground mb-4 px-6 font-mono text-[10px] tracking-widest uppercase">
                Search Results
              </div>
              {searchResults.length > 0 ? (
                searchResults.map((result) => (
                  <Link key={result.slug} href={`/docs/${result.slug}`}>
                    <div className="hover:bg-muted border-border/50 border-b px-6 py-4 font-mono text-sm">
                      {result.title}
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-muted-foreground px-6 py-4 font-mono text-sm">
                  No matches found
                </div>
              )}
            </div>
          ) : (
            filteredNavigation.map((item, idx: number) => (
              <SidebarItem
                key={idx}
                item={item}
                depth={0}
                currentSlug={currentSlug}
                pathname={pathname}
              />
            ))
          )}
        </nav>
      </div>
    </aside>
  )
}

function SidebarItem({
  item,
  depth,
  currentSlug,
  pathname,
}: {
  item: NavItem
  depth: number
  currentSlug: string
  pathname: string
}) {
  const isActive = item.slug ? currentSlug === item.slug : false
  const isChildActive = useMemo(() => {
    const checkActive = (items?: NavItem[]): boolean => {
      return (
        items?.some((i) => i.slug === currentSlug || checkActive(i.items)) ||
        false
      )
    }
    return checkActive(item.items)
  }, [item.items, currentSlug])

  const [isOpen, setIsOpen] = useState(isActive || isChildActive || depth === 0)
  const hasItems = item.items && item.items.length > 0
  const paddingLeft =
    depth === 0 ? 'px-6' : depth === 1 ? 'pl-10 pr-6' : 'pl-14 pr-6'

  const content = (
    <div
      className={cn(
        'group hover:bg-muted flex cursor-pointer items-center justify-between py-5 font-mono text-sm transition-colors',
        paddingLeft,
        isActive
          ? 'bg-muted text-foreground border-border border-y'
          : 'text-muted-foreground hover:text-foreground'
      )}
    >
      <span className="flex-1 text-sm">{item.title}</span>
      {hasItems && (
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setIsOpen(!isOpen)
          }}
          className="hover:text-foreground p-1 transition-colors"
        >
          {isOpen ? (
            <ChevronDown className="h-6 w-6" />
          ) : (
            <ChevronRight className="h-6 w-6" />
          )}
        </button>
      )}
    </div>
  )

  return (
    <div>
      {item.slug ? (
        <Link href={`/docs/${item.slug}`}>{content}</Link>
      ) : (
        <div onClick={() => setIsOpen(!isOpen)}>{content}</div>
      )}

      {hasItems && isOpen && (
        <div className="mt-0.5">
          {item.items?.map((subItem, idx: number) => (
            <SidebarItem
              key={idx}
              item={subItem}
              depth={depth + 1}
              currentSlug={currentSlug}
              pathname={pathname}
            />
          ))}
        </div>
      )}
    </div>
  )
}
