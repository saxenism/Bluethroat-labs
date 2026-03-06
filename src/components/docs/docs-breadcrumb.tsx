'use client'

import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Fragment } from 'react/jsx-runtime'
import type { BreadcrumbItem } from '@/lib/sanity/docs-nav'

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  isOpen: boolean
  isMobileMenuOpen: boolean
  hasToc?: boolean
  onToggleContents?: () => void
  onToggleMobileMenu?: () => void
}

export function DocsBreadcrumb({
  items,
  isOpen,
  isMobileMenuOpen,
  hasToc = false,
  onToggleContents,
  onToggleMobileMenu,
}: BreadcrumbProps) {
  return (
    <div className="flex h-12 w-full items-center gap-2 lg:justify-between lg:pl-8">
      {/* Path Links */}
      <button
        onClick={onToggleMobileMenu}
        className="hover:bg-muted flex h-full flex-col justify-center gap-1 px-3 lg:hidden"
        aria-label="Toggle menu"
      >
        <span
          className={cn(
            'bg-foreground block h-0.5 w-4.5 rounded-full transition-transform duration-300',
            isMobileMenuOpen && 'translate-y-1.5 rotate-225'
          )}
        ></span>
        <span
          className={cn(
            'bg-foreground block h-0.5 w-2.5 origin-right rounded-full transition-[translate,scale,opacity] duration-300',
            isMobileMenuOpen && 'translate-x-0 scale-x-0 opacity-0'
          )}
        ></span>
        <span
          className={cn(
            'bg-foreground block h-0.5 w-4.5 rounded-full transition-transform duration-300',
            isMobileMenuOpen && '-translate-y-1.5 -rotate-225'
          )}
        ></span>
      </button>

      <div className="flex items-center gap-2 truncate text-sm font-semibold uppercase">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1
          const isClickable = !isLast && item.slug
          const className = cn(
            'min-w-0 truncate',
            isLast
              ? 'text-[#454545] dark:text-[#A9A9A9]'
              : 'text-[#8F8F8F] dark:text-[#666666]',
            isClickable && 'hover:text-foreground transition-colors'
          )
          return (
            <Fragment key={idx}>
              {isClickable ? (
                <Link
                  href={
                    item.slug!.startsWith('/')
                      ? item.slug!
                      : `/docs/${item.slug}`
                  }
                  className={className}
                >
                  {item.title}
                </Link>
              ) : (
                <span className={className}>{item.title}</span>
              )}
              {!isLast && (
                <span className="text-[#8F8F8F] dark:text-[#666666]">
                  {'>'}
                </span>
              )}
            </Fragment>
          )
        })}
      </div>

      {/* Toggle Button - Pushed to the far right */}
      <button
        onClick={onToggleContents}
        className={cn(
          'bg-muted left-0 flex items-center justify-center p-1 max-lg:hidden',
          !hasToc && 'hidden'
        )}
      >
        <ChevronLeft
          className={cn(
            'text-muted-foreground hover:text-foreground h-10 w-10',
            isOpen ? 'rotate-180' : 'rotate-0'
          )}
        />
      </button>
    </div>
  )
}
