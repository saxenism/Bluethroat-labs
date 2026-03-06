'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Components, Options } from 'react-markdown'
import { markdownComponents } from './markdown-components'
import { cn } from '@/lib/utils'

interface MarkdownRendererProps {
  content: string
  className?: string
  /** Override default components (default: shared markdownComponents). */
  components?: Components
  /** Additional rehype plugins (e.g. rehype-slug). */
  rehypePlugins?: Options['rehypePlugins']
}

/**
 * Renders markdown (basic + GFM). Uses shared styled components by default.
 * Docs and blogs use this with the default components for consistent styling.
 */
export function MarkdownRenderer({
  content,
  className = '',
  components = markdownComponents,
  rehypePlugins,
}: MarkdownRendererProps) {
  if (!content?.trim()) return null

  return (
    <div className={cn('wrap-break-word', className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={rehypePlugins}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
