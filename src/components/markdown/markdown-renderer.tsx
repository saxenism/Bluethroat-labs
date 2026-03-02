'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Components } from 'react-markdown'
import { markdownComponents } from './markdown-components'

interface MarkdownRendererProps {
  content: string
  className?: string
  /** Override default components (default: shared markdownComponents). */
  components?: Components
}

/**
 * Renders markdown (basic + GFM). Uses shared styled components by default.
 * Docs and blogs use this with the default components for consistent styling.
 */
export function MarkdownRenderer({
  content,
  className = '',
  components = markdownComponents,
}: MarkdownRendererProps) {
  if (!content?.trim()) return null

  return (
    <div className={className}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
