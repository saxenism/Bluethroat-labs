import * as runtime from 'react/jsx-runtime'
import { evaluate } from '@mdx-js/mdx'
import remarkGfm from 'remark-gfm'
import rehypeSanitize from 'rehype-sanitize'
import rehypeSlug from 'rehype-slug'
import { markdownComponents } from './markdown-components'
import { cn } from '@/lib/utils'
import type { MDXComponents } from 'mdx/types'

interface MarkdownRendererProps {
  content: string
  className?: string
  /** Override or extend default components. */
  components?: MDXComponents
  /** Enable anchor slugs on headings (default: false). */
  withSlug?: boolean
}

/**
 * Async RSC that evaluates MDX on the server — no client JS, no flash of empty content.
 * Content from Sanity strings is compiled at request time.
 */
export async function MarkdownRenderer({
  content,
  className = '',
  components,
  withSlug = false,
}: MarkdownRendererProps) {
  if (!content?.trim()) return null

  const { default: MDXContent } = await evaluate(content, {
    ...(runtime as Parameters<typeof evaluate>[1]),
    remarkPlugins: [remarkGfm],
    rehypePlugins: [...(withSlug ? [rehypeSlug] : []), rehypeSanitize],
    remarkRehypeOptions: {
      // No prefix here so only rehype-sanitize adds "user-content-" once to ids.
      // Hash links stay as #fn-1; we scroll to user-content-fn-1 via client script
      // (see rehype-sanitize readme: Example: headings (DOM clobbering)).
      clobberPrefix: '',
    },
  })

  const mergedComponents: MDXComponents = {
    ...(markdownComponents as MDXComponents),
    ...components,
  }

  return (
    <div className={cn('wrap-break-word', className)}>
      <MDXContent components={mergedComponents} />
    </div>
  )
}
