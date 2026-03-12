'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { Search, ChevronDown, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { NavItem, SearchableDoc } from '@/lib/sanity/docs-nav'

interface DocsSidebarProps {
  navigation: NavItem[]
  searchableDocs: SearchableDoc[]
  onNavigate?: () => void
}

export function DocsSidebar({
  navigation,
  searchableDocs,
  onNavigate,
}: DocsSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const params = useParams()
  const pathname = usePathname()
  const currentSlug = (params.slug as string[])?.join('/') || ''

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return null
    return searchableDocs.filter(
      (doc) =>
        doc.title.toLowerCase().includes(q) ||
        (doc.slug && doc.slug.toLowerCase().includes(q))
    )
  }, [searchQuery, searchableDocs])

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
    <aside className="border-border bg-background sticky top-18 z-30 h-[calc(100vh-72px)] w-80 shrink-0 overflow-y-auto border-r pt-12 max-lg:h-auto max-lg:w-full max-lg:border-r-0 max-lg:pt-0">
      <div className="border-border bg-background sticky -top-12.25 z-10 mb-4 border-y max-lg:hidden">
        <div className="group relative py-2">
          <Search className="text-muted-foreground group-focus-within:text-foreground absolute top-1/2 left-3 size-6 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Quick Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="focus:border-foreground h-18 w-full px-12 font-mono text-xl focus:outline-none"
          />
        </div>
      </div>

      <div>
        <nav>
          {searchResults ? (
            <div className="py-4">
              <div className="text-foreground mb-4 px-6 text-xs tracking-widest uppercase">
                Search Results
              </div>
              {searchResults.length > 0 ? (
                searchResults.map((result) => (
                  <Link
                    key={result.slug}
                    href={`/docs/${result.slug}`}
                    onClick={onNavigate}
                  >
                    <div className="px-6 py-4 font-semibold text-[#7D7D7D] hover:bg-[#E6E6E6] dark:hover:bg-[#292929]">
                      {result.title}
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-muted-foreground px-6 py-4 text-sm">
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
                onNavigate={onNavigate}
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
  onNavigate,
}: {
  item: NavItem
  depth: number
  currentSlug: string
  pathname: string
  onNavigate?: () => void
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

  const bgActive =
    depth === 0
      ? 'bg-[#E6E6E6] dark:bg-[#292929]'
      : depth === 1
        ? 'bg-[#EBEBEB] dark:bg-[#1F1F1F]'
        : 'bg-[#F2F2F2] dark:bg-[#191919]'
  const bgHover =
    depth === 0
      ? 'hover:bg-[#E6E6E6] dark:hover:bg-[#292929]'
      : depth === 1
        ? 'hover:bg-[#EBEBEB] dark:hover:bg-[#1F1F1F]'
        : 'hover:bg-[#F2F2F2] dark:hover:bg-[#191919]'

  const content = (
    <div
      className={cn(
        'group flex cursor-pointer items-center justify-between border-y border-transparent py-5 pr-2',
        isActive
          ? `text-foreground border-border ${bgActive}`
          : `text-[#7D7D7D] ${bgHover}`
      )}
      style={{ paddingLeft: `${24 + depth * 16}px` }}
    >
      <span className="flex-1 text-base">{item.title}</span>
      {hasItems && (
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setIsOpen(!isOpen)
          }}
          className="hover:bg-border hover:text-foreground"
        >
          {isOpen ? (
            <ChevronDown className="size-8" />
          ) : (
            <ChevronRight className="size-8" />
          )}
        </button>
      )}
    </div>
  )

  return (
    <div>
      {item.slug ? (
        <Link
          href={`/docs/${item.slug}`}
          onClick={() => {
            setIsOpen(true)
            onNavigate?.()
          }}
        >
          {content}
        </Link>
      ) : (
        <div onClick={() => setIsOpen(!isOpen)}>{content}</div>
      )}

      {hasItems && isOpen && (
        <div>
          {item.items?.map((subItem, idx: number) => (
            <SidebarItem
              key={idx}
              item={subItem}
              depth={depth + 1}
              currentSlug={currentSlug}
              pathname={pathname}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      )}
    </div>
  )
}
