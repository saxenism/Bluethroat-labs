'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

export const CodeCopyButton = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
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
  )
}
