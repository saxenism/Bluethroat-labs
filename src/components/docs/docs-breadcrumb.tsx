'use client'

import { ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Fragment } from 'react/jsx-runtime'

interface BreadcrumbProps {
  paths: string[]
  isOpen: boolean
  isMobileMenuOpen: boolean
  onToggleContents?: () => void
  onToggleMobileMenu?: () => void
}

export function DocsBreadcrumb({
  paths,
  isOpen,
  isMobileMenuOpen,
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
        {paths.map((path, idx) => (
          <Fragment key={idx}>
            <span
              className={cn(
                'min-w-0 truncate',
                idx === paths.length - 1
                  ? 'text-[#454545] dark:text-[#A9A9A9]'
                  : 'text-[#8F8F8F] dark:text-[#666666]'
              )}
            >
              {path}
            </span>
            {idx < paths.length - 1 && (
              <span className="text-[#8F8F8F] dark:text-[#666666]">{'>'}</span>
            )}
          </Fragment>
        ))}
      </div>

      {/* Toggle Button - Pushed to the far right */}
      <button
        onClick={onToggleContents}
        className="bg-muted left-0 flex items-center justify-center p-1 max-lg:hidden"
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
