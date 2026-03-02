'use client'

import Image from 'next/image'
import { Copy, Check } from 'lucide-react'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import { urlFor } from '@/lib/sanity/image'
import { useState } from 'react'
import type { ReactNode } from 'react'
import { MarkdownRenderer } from '@/components/markdown'

type BlockType =
  | 'tag'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'text'
  | 'divider'
  | 'bullet-list'
  | 'ordered-list'
  | 'blockquote'
  | 'code-block'
  | 'image'

interface ContentBlock {
  type: BlockType
  content?: string
  items?: string[] // For lists
  src?: string // For images
  caption?: string // For images
  language?: string // For code blocks
  metadata?: { category?: string; date?: string; author?: string }
}

interface BlogRendererProps {
  blocks?: ContentBlock[]
  /** Portable Text block content (used when markdown is not set). */
  sanityContent?: PortableTextBlock[]
  /** Raw markdown (full basic syntax). When set, used instead of sanityContent. */
  markdown?: string | null
  metadata?: { category?: string; date?: string }
}

interface SanityImageValue {
  _key?: string
  alt?: string
  caption?: string
  asset?: { _ref: string; _type: string }
  [key: string]: unknown
}

interface SanityCodeValue {
  code?: string
  filename?: string
  language?: string
}

const components: PortableTextComponents = {
  block: {
    h1: ({ children, value }) => (
      <h1
        id={value._key}
        className="text-foreground mt-4 mb-8 font-mono text-3xl leading-tight font-medium sm:text-4xl"
      >
        {children}
      </h1>
    ),
    h2: ({ children, value }) => (
      <h2
        id={value._key}
        className="text-foreground mt-12 mb-6 font-mono text-3xl font-bold tracking-tighter"
      >
        {children}
      </h2>
    ),
    h3: ({ children, value }) => (
      <h3
        id={value._key}
        className="text-foreground mt-10 mb-4 font-mono text-2xl font-bold tracking-tighter"
      >
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="text-foreground/80 mb-6 font-mono text-lg leading-relaxed whitespace-pre-wrap">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-foreground/20 bg-muted/30 my-10 rounded-sm border-l-4 p-8">
        <p className="text-foreground/70 font-mono text-lg leading-relaxed italic">
          {children}
        </p>
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="my-8 space-y-4">{children}</ul>,
    number: ({ children }) => (
      <ol className="my-8 list-none space-y-4">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: ReactNode }) => (
      <li className="text-foreground/80 flex font-mono text-lg leading-relaxed">
        <span className="text-foreground/40 mt-1 mr-4">■</span>
        {children}
      </li>
    ),
    number: ({ children, index }: { children?: ReactNode; index: number }) => (
      <li className="text-foreground/80 flex font-mono text-lg leading-relaxed">
        <span className="text-foreground/40 mr-4">{index + 1}.</span>
        {children}
      </li>
    ),
  },
  types: {
    image: ({ value }: { value: SanityImageValue }) => (
      <div className="my-12 space-y-4">
        <div className="border-border bg-muted relative aspect-video w-full overflow-hidden border">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || 'Blog image'}
            fill
            className="object-cover"
          />
        </div>
        {value.caption && (
          <p className="text-muted-foreground text-center font-mono text-sm italic">
            {value.caption}
          </p>
        )}
      </div>
    ),
    code: ({ value }: { value: SanityCodeValue }) => (
      <SanityCodeBlock value={value} />
    ),
    divider: () => <hr className="border-border my-12" />,
  },
  marks: {
    code: ({ children }) => (
      <code className="bg-muted text-foreground rounded px-1.5 py-0.5 text-sm">
        {children}
      </code>
    ),
    underline: ({ children }) => <u>{children}</u>,
    strikeThrough: ({ children }) => <del>{children}</del>,
  },
}

function SanityCodeBlock({ value }: { value: SanityCodeValue }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(value.code || '')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="border-border my-10 overflow-hidden rounded-sm border bg-[#1E1E1E]">
      <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-2">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-500/80" />
          <div className="h-3 w-3 rounded-full bg-amber-500/80" />
          <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
        </div>
        <button
          onClick={handleCopy}
          className="group rounded-md p-1.5 transition-colors hover:bg-white/10"
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
        <code>{value.code}</code>
      </pre>
      {value.filename && (
        <div className="border-t border-white/10 bg-white/5 px-4 py-2 font-mono text-xs text-white/40">
          {value.filename}
        </div>
      )}
    </div>
  )
}

export function BlogRenderer({
  blocks,
  sanityContent,
  markdown,
  metadata,
}: BlogRendererProps) {
  return (
    <div className="mx-auto max-w-6xl space-y-12 px-6 py-12">
      {metadata && (
        <div className="text-foreground/50 flex gap-2 font-mono text-base tracking-tight">
          <span>{metadata.category}</span>
          <span>•</span>
          <span>{metadata.date}</span>
        </div>
      )}
      {markdown?.trim() ? (
        <MarkdownRenderer content={markdown} />
      ) : sanityContent ? (
        <PortableText value={sanityContent} components={components} />
      ) : blocks?.length ? (
        blocks.map((block, index) => (
          <div key={index}>
            <BlockSelector block={block} />
          </div>
        ))
      ) : null}
    </div>
  )
}

function BlockSelector({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'h1':
      return (
        <h1 className="text-foreground mt-4 mb-8 font-mono text-3xl leading-tight font-medium sm:text-4xl">
          {block.content}
        </h1>
      )
    case 'h2':
      return (
        <h2 className="text-foreground mt-12 mb-6 font-mono text-3xl font-bold tracking-tighter">
          {block.content}
        </h2>
      )
    case 'h3':
      return (
        <h3 className="text-foreground mt-10 mb-4 font-mono text-2xl font-bold tracking-tighter">
          {block.content}
        </h3>
      )
    case 'text':
      return (
        <p className="text-foreground/80 font-mono text-lg leading-relaxed whitespace-pre-wrap">
          {formatText(block.content || '')}
        </p>
      )
    case 'divider':
      return <hr className="border-border my-12" />
    case 'bullet-list':
      return (
        <ul className="my-8 space-y-4">
          {block.items?.map((item, idx) => (
            <li
              key={idx}
              className="text-foreground/80 flex font-mono text-lg leading-relaxed"
            >
              <span className="text-foreground/40 mt-1 mr-4">■</span>
              {formatText(item || '')}
            </li>
          ))}
        </ul>
      )
    case 'ordered-list':
      return (
        <ol className="my-8 list-none space-y-4">
          {block.items?.map((item, idx) => (
            <li
              key={idx}
              className="text-foreground/80 flex font-mono text-lg leading-relaxed"
            >
              <span className="text-foreground/40 mr-4">{idx + 1}.</span>
              {formatText(item || '')}
            </li>
          ))}
        </ol>
      )
    case 'blockquote':
      return (
        <blockquote className="border-foreground/20 bg-muted/30 my-10 rounded-sm border-l-4 p-8">
          <p className="text-foreground/70 font-mono text-lg leading-relaxed italic">
            {formatText(block.content || '')}
          </p>
        </blockquote>
      )
    case 'code-block':
      return (
        <div className="border-border my-10 overflow-hidden rounded-sm border bg-[#1E1E1E]">
          <pre className="overflow-x-auto p-6 font-mono text-sm leading-relaxed text-zinc-300 sm:text-base">
            <code>{block.content}</code>
          </pre>
        </div>
      )
    case 'image':
      return (
        <div className="my-12 space-y-4">
          <div className="border-border bg-muted relative aspect-video w-full overflow-hidden border">
            <Image
              src={block.src || ''}
              alt={block.caption || 'Blog image'}
              fill
              className="object-cover"
            />
          </div>
        </div>
      )
    default:
      return null
  }
}

/**
 * Basic text formatter for inline markdown-like styles:
 * `code`, _underline_, ~~strikethrough~~
 */
function formatText(text: string) {
  const parts = text.split(/(`[^`]+`|_[^_]+_|~~[^~]+~~)/g)

  return parts.map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={i}
          className="bg-muted text-foreground rounded px-1.5 py-0.5 text-sm"
        >
          {part.slice(1, -1)}
        </code>
      )
    }
    if (part.startsWith('_') && part.endsWith('_')) {
      return <u key={i}>{part.slice(1, -1)}</u>
    }
    if (part.startsWith('~~') && part.endsWith('~~')) {
      return <del key={i}>{part.slice(2, -2)}</del>
    }
    return part
  })
}
