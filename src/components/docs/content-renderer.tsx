'use client'

import { useMemo } from 'react'
import { MarkdownRenderer } from '@/components/markdown'
import { markdownComponents } from '@/components/markdown/markdown-components'
import type { Components } from 'react-markdown'
import rehypeSlug from 'rehype-slug'

interface DocContentRendererProps {
  markdown?: string | null
  className?: string
}

function HeadingAnchor({ id }: { id?: string }) {
  if (!id) return null
  return (
    <a
      href={`#${id}`}
      aria-hidden="true"
      tabIndex={-1}
      className="pointer-events-none ml-3 inline-flex items-center no-underline opacity-0 group-hover:pointer-events-auto group-hover:opacity-100"
    >
      <span className="text-muted-foreground text-[0.95em] font-normal hover:underline">
        #
      </span>
    </a>
  )
}

export function DocContentRenderer({
  markdown,
  className = '',
}: DocContentRendererProps) {
  const rehypePlugins = useMemo(() => [rehypeSlug], [])

  const docHeadingComponents: Partial<Components> = useMemo(
    () => ({
      h1: ({ children, id }) => (
        <h1
          id={id}
          tabIndex={-1}
          className="group text-foreground mt-4 mb-8 flex scroll-mt-32 items-baseline text-3xl leading-tight font-medium sm:text-4xl"
        >
          {children}
          <HeadingAnchor id={id} />
        </h1>
      ),
      h2: ({ children, id }) => (
        <h2
          id={id}
          tabIndex={-1}
          className="group text-foreground mt-12 mb-6 flex scroll-mt-32 items-baseline text-3xl font-bold tracking-tighter"
        >
          {children}
          <HeadingAnchor id={id} />
        </h2>
      ),
      h3: ({ children, id }) => (
        <h3
          id={id}
          tabIndex={-1}
          className="group text-foreground mt-10 mb-4 flex scroll-mt-32 items-baseline text-2xl font-bold tracking-tighter"
        >
          {children}
          <HeadingAnchor id={id} />
        </h3>
      ),
      h4: ({ children, id }) => (
        <h4
          id={id}
          tabIndex={-1}
          className="group text-foreground mt-8 mb-3 flex scroll-mt-32 items-baseline text-xl font-bold tracking-tight"
        >
          {children}
          <HeadingAnchor id={id} />
        </h4>
      ),
      h5: ({ children, id }) => (
        <h5
          id={id}
          tabIndex={-1}
          className="group text-foreground mt-6 mb-2 flex scroll-mt-32 items-baseline text-lg font-bold tracking-tight"
        >
          {children}
          <HeadingAnchor id={id} />
        </h5>
      ),
      h6: ({ children, id }) => (
        <h6
          id={id}
          tabIndex={-1}
          className="group text-foreground mt-4 mb-2 flex scroll-mt-32 items-baseline text-base font-bold tracking-tight"
        >
          {children}
          <HeadingAnchor id={id} />
        </h6>
      ),
    }),
    []
  )

  const components: Components = useMemo(
    () => ({ ...markdownComponents, ...docHeadingComponents }),
    [docHeadingComponents]
  )

  if (!markdown?.trim()) return null

  return (
    <div className={`${className} my-8`}>
      <MarkdownRenderer
        content={markdown}
        components={components}
        rehypePlugins={rehypePlugins}
      />
    </div>
  )
}
