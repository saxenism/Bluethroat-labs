'use client'

import { useState, useEffect } from 'react'
import { Copy, Check } from 'lucide-react'
import { codeToHtml } from 'shiki'
import { useTheme } from 'next-themes'

export interface StyledCodeBlockProps {
  code: string
  language?: string
}

export function StyledCodeBlock({ code, language }: StyledCodeBlockProps) {
  const { resolvedTheme } = useTheme()
  const [copied, setCopied] = useState(false)
  const [highlighted, setHighlighted] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    codeToHtml(code, {
      lang: language ?? 'text',
      theme:
        resolvedTheme === 'dark'
          ? 'github-dark-default'
          : 'github-light-default',
    })
      .then((html) => {
        if (!cancelled) setHighlighted(html)
      })
      .catch(() => {
        if (!cancelled) setHighlighted(null)
      })
    return () => {
      cancelled = true
    }
  }, [code, language, resolvedTheme])

  const handleCopy = () => {
    navigator.clipboard.writeText(code || '')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="border-border bg-background my-10 overflow-hidden rounded-sm border">
      <div className="border-border flex items-center justify-between border-b bg-[#EBEBEB] px-4 py-2 dark:bg-[#1F1F1F]">
        <div className="flex items-center gap-1.5">
          <div className="size-3 rounded-full bg-[#FF5F57]" />
          <div className="size-3 rounded-full bg-[#FEBC2E]" />
          <div className="size-3 rounded-full bg-[#29C840]" />
        </div>

        <button
          onClick={handleCopy}
          type="button"
          className="group border-border flex items-center gap-2.5 border bg-[#E6E6E6] px-2 py-0.5 text-sm text-[#454545] hover:bg-[#D9D9D9] dark:bg-[#292929] dark:text-[#CACACA] dark:hover:bg-[#313131]"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check className="size-4" />
              COPIED
            </>
          ) : (
            <>
              <Copy className="size-4" />
              COPY
            </>
          )}
        </button>
      </div>

      {highlighted ? (
        <div
          className="overflow-x-auto [&>pre]:bg-transparent! [&>pre]:p-6 [&>pre]:font-mono [&>pre]:text-sm [&>pre]:leading-relaxed [&>pre]:sm:text-base"
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      ) : (
        <pre className="overflow-x-auto p-6 font-mono text-sm leading-relaxed text-zinc-300 sm:text-base">
          <code>{code}</code>
        </pre>
      )}
    </div>
  )
}
