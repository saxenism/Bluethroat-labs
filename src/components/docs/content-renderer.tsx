'use client'

import { useRef, useMemo, useEffect, useCallback } from 'react'
import { MarkdownRenderer } from '@/components/markdown'
import { markdownComponents } from '@/components/markdown/markdown-components'
import { parseMarkdownHeadings } from '@/lib/markdown-headings'
import type { Components } from 'react-markdown'

interface DocContentRendererProps {
  /** Raw markdown string (doc content). */
  markdown?: string | null
  className?: string
}

/**
 * Renders doc content as markdown. Assigns stable ids to headings (h2–h6)
 * so the left sidebar TOC anchor links work and match parseMarkdownHeadings.
 */
export function DocContentRenderer({
  markdown,
  className = '',
}: DocContentRendererProps) {
  const headingIds = useMemo(
    () => parseMarkdownHeadings(markdown).map((h) => h.id),
    [markdown]
  )
  const nextIndexRef = useRef(0)
  const prevMarkdownRef = useRef(markdown)

  useEffect(() => {
    if (prevMarkdownRef.current !== markdown) {
      prevMarkdownRef.current = markdown
      nextIndexRef.current = 0
    }
  }, [markdown])

  const getNextId = useCallback(
    () =>
      nextIndexRef.current < headingIds.length
        ? headingIds[nextIndexRef.current++]
        : undefined,
    [headingIds]
  )

  const docHeadingComponents: Partial<Components> = useMemo(
    () => ({
      h1: ({ children }) => (
        <h1
          id={getNextId()}
          tabIndex={-1}
          className="text-foreground mt-4 mb-8 scroll-mt-32 font-mono text-3xl leading-tight font-medium sm:text-4xl"
        >
          {children}
        </h1>
      ),
      h2: ({ children }) => (
        <h2
          id={getNextId()}
          tabIndex={-1}
          className="text-foreground mt-12 mb-6 scroll-mt-32 font-mono text-3xl font-bold tracking-tighter"
        >
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3
          id={getNextId()}
          tabIndex={-1}
          className="text-foreground mt-10 mb-4 scroll-mt-32 font-mono text-2xl font-bold tracking-tighter"
        >
          {children}
        </h3>
      ),
      h4: ({ children }) => (
        <h4
          id={getNextId()}
          tabIndex={-1}
          className="text-foreground mt-8 mb-3 scroll-mt-32 font-mono text-xl font-bold tracking-tight"
        >
          {children}
        </h4>
      ),
      h5: ({ children }) => (
        <h5
          id={getNextId()}
          tabIndex={-1}
          className="text-foreground mt-6 mb-2 scroll-mt-32 font-mono text-lg font-bold tracking-tight"
        >
          {children}
        </h5>
      ),
      h6: ({ children }) => (
        <h6
          id={getNextId()}
          tabIndex={-1}
          className="text-foreground mt-4 mb-2 scroll-mt-32 font-mono text-base font-bold tracking-tight"
        >
          {children}
        </h6>
      ),
    }),
    [getNextId]
  )

  const components: Components = useMemo(
    () => ({ ...markdownComponents, ...docHeadingComponents }),
    [docHeadingComponents]
  )

  if (!markdown?.trim()) return null

  return (
    <div className={`${className} my-8`}>
      <MarkdownRenderer content={markdown} components={components} />
    </div>
  )
}
