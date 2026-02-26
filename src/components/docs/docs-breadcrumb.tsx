'use client'

import { ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Fragment } from 'react/jsx-runtime'

interface BreadcrumbProps {
  paths: string[]
  isOpen: boolean
  onToggleContents?: () => void
}

export function DocsBreadcrumb({
  paths,
  isOpen,
  onToggleContents,
}: BreadcrumbProps) {
  return (
    <div className="flex h-12 w-full items-center justify-between">
      {/* Path Links */}
      <div className="flex items-center gap-2 truncate pl-6 font-mono text-sm tracking-widest uppercase">
        {paths.map((path, idx) => (
          <Fragment key={idx}>
            <span
              className={
                idx === paths.length - 1
                  ? 'text-foreground'
                  : 'text-muted-foreground'
              }
            >
              {path}
            </span>
            {idx < paths.length - 1 && (
              <span className="text-muted-foreground">{'>'}</span>
            )}
          </Fragment>
        ))}
      </div>

      {/* Toggle Button - Pushed to the far right */}
      <button
        onClick={onToggleContents}
        className="bg-muted left-0 flex items-center justify-center p-1 transition-colors"
      >
        <ChevronLeft
          className={cn(
            'text-muted-foreground hover:text-foreground h-10 w-10 transition-colors',
            isOpen ? 'rotate-180' : 'rotate-0'
          )}
        />
      </button>
    </div>
  )
}
