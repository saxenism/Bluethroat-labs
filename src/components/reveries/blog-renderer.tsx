import { MarkdownRenderer } from '@/components/markdown'
import { CategoryDisplay } from './blog-card'
import { AuthorByline } from './author-byline'

interface BlogRendererProps {
  markdown?: string | null
  metadata: {
    title: string
    categories: string[]
    date?: string
    author?: { name?: string; socialHandle?: string; socialLink?: string }
  }
}

export function BlogRenderer({ markdown, metadata }: BlogRendererProps) {
  return (
    <div className="space-y-8 px-4 md:space-y-12 lg:px-24">
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#7D7D7D] md:text-base dark:text-[#A9A9A9]">
          <CategoryDisplay categories={metadata.categories} />
          {!!metadata.date && (
            <>
              <span className="text-base leading-none md:text-xl">•</span>
              <span>{metadata.date}</span>
            </>
          )}
        </div>

        <h1 className="text-foreground text-xl font-semibold md:text-[32px]">
          {metadata?.title}
        </h1>

        <AuthorByline author={metadata.author} />
      </div>

      {markdown?.trim() ? <MarkdownRenderer content={markdown} /> : null}
    </div>
  )
}
