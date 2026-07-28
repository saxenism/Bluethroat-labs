import { codeToHtml } from 'shiki'
import { CodeCopyButton } from './code-copy-button'

export interface StyledCodeBlockProps {
  code: string
  language?: string
}

export const StyledCodeBlock = async ({
  code,
  language,
}: StyledCodeBlockProps) => {
  let highlighted: string | null = null

  try {
    highlighted = await codeToHtml(code, {
      lang: language ?? 'text',
      themes: { light: 'github-light-default', dark: 'github-dark-default' },
    })
  } catch {}

  return (
    <div className="border-border bg-background my-10 overflow-hidden rounded-sm border">
      <div className="border-border flex items-center justify-between border-b bg-[#EBEBEB] px-4 py-2 dark:bg-[#1F1F1F]">
        <div className="flex items-center gap-1.5">
          <div className="size-3 rounded-full bg-[#FF5F57]" />
          <div className="size-3 rounded-full bg-[#FEBC2E]" />
          <div className="size-3 rounded-full bg-[#29C840]" />
        </div>

        <CodeCopyButton code={code} />
      </div>

      {highlighted ? (
        <div
          className="overflow-x-auto [&>pre]:bg-transparent! [&>pre]:p-6 [&>pre]:font-mono [&>pre]:text-sm [&>pre]:leading-relaxed [&>pre]:sm:text-base"
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      ) : (
        <pre className="text-foreground overflow-x-auto p-6 font-mono text-sm leading-relaxed sm:text-base">
          <code>{code}</code>
        </pre>
      )}
    </div>
  )
}
