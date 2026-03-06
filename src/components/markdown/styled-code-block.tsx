'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export interface StyledCodeBlockProps {
  code: string
  language?: string
  filename?: string
}

/**
 * Styled code block with copy button and optional language/filename.
 * Shared by docs and blogs for markdown fenced code blocks.
 */
export function StyledCodeBlock({
  code,
  language,
  filename,
}: StyledCodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code || '')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="border-border my-10 overflow-hidden rounded-sm border bg-[#1E1E1E]">
      <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500/80" />
            <div className="h-3 w-3 rounded-full bg-amber-500/80" />
            <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
          </div>
          {language && (
            <span className="font-mono text-xs text-white/50">{language}</span>
          )}
        </div>
        <button
          onClick={handleCopy}
          type="button"
          className="group rounded-md p-1.5 hover:bg-white/10"
          title="Copy code"
        >
          {copied ? (
            <Check className="h-4 w-4 text-emerald-500" />
          ) : (
            <Copy className="h-4 w-4 text-white/50 group-hover:text-white" />
          )}
        </button>
      </div>
      <pre className="overflow-x-auto p-6 font-mono text-sm leading-relaxed text-zinc-300 sm:text-base">
        <code>{code}</code>
      </pre>
      {filename && (
        <div className="border-t border-white/10 bg-white/5 px-4 py-2 font-mono text-xs text-white/40">
          {filename}
        </div>
      )}
    </div>
  )
}
