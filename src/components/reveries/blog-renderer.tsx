import { MarkdownRenderer } from '@/components/markdown'

interface BlogRendererProps {
  markdown?: string | null
  metadata: { title: string; category: string; date?: string; author?: string }
}

export function BlogRenderer({ markdown, metadata }: BlogRendererProps) {
  return (
    <div className="space-y-8 px-4 md:space-y-12 lg:px-24">
      <div className="space-y-6">
        <div className="flex gap-2 text-xs font-medium text-[#7D7D7D] md:text-base dark:text-[#A9A9A9]">
          <span>{metadata.category}</span>
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

        {!!metadata.author && (
          <div className="flex gap-2 text-xs font-medium text-[#7D7D7D] md:text-base dark:text-[#A9A9A9]">
            By {metadata.author}
          </div>
        )}
      </div>

      {markdown?.trim() ? <MarkdownRenderer content={markdown} /> : null}
    </div>
  )
}
