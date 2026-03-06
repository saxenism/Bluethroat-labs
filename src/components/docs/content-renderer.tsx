import { MarkdownRenderer } from '@/components/markdown'
import { markdownComponents } from '@/components/markdown/markdown-components'
import type { MDXComponents } from 'mdx/types'

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

const docHeadingComponents: Partial<MDXComponents> = {
  h1: ({ children, id }) => (
    <h1
      id={id}
      tabIndex={-1}
      className="group text-foreground my-8 flex scroll-mt-32 items-baseline text-2xl leading-tight font-bold md:text-[32px]"
    >
      {children}
      <HeadingAnchor id={id} />
    </h1>
  ),
  h2: ({ children, id }) => (
    <h2
      id={id}
      tabIndex={-1}
      className="group text-foreground my-6 flex scroll-mt-32 items-baseline text-xl font-bold tracking-tighter md:text-2xl"
    >
      {children}
      <HeadingAnchor id={id} />
    </h2>
  ),
  h3: ({ children, id }) => (
    <h3
      id={id}
      tabIndex={-1}
      className="group text-foreground my-4 flex scroll-mt-32 items-baseline text-lg font-bold tracking-tighter md:text-xl"
    >
      {children}
      <HeadingAnchor id={id} />
    </h3>
  ),
  h4: ({ children, id }) => (
    <h4
      id={id}
      tabIndex={-1}
      className="group text-foreground my-3 flex scroll-mt-32 items-baseline text-base font-bold tracking-tight md:text-lg"
    >
      {children}
      <HeadingAnchor id={id} />
    </h4>
  ),
  h5: ({ children, id }) => (
    <h5
      id={id}
      tabIndex={-1}
      className="group text-foreground my-2 flex scroll-mt-32 items-baseline text-sm font-bold tracking-tight md:text-base"
    >
      {children}
      <HeadingAnchor id={id} />
    </h5>
  ),
  h6: ({ children, id }) => (
    <h6
      id={id}
      tabIndex={-1}
      className="group text-foreground my-2 flex scroll-mt-32 items-baseline text-xs font-bold tracking-tight md:text-sm"
    >
      {children}
      <HeadingAnchor id={id} />
    </h6>
  ),
}

const docComponents = {
  ...markdownComponents,
  ...docHeadingComponents,
} as MDXComponents

export function DocContentRenderer({
  markdown,
  className = '',
}: DocContentRendererProps) {
  if (!markdown?.trim()) return null

  return (
    <div className={`${className} my-8`}>
      <MarkdownRenderer
        content={markdown}
        components={docComponents}
        withSlug
      />
    </div>
  )
}
