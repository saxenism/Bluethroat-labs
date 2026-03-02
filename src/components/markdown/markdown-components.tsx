'use client'

import type { Components } from 'react-markdown'
import { StyledCodeBlock } from './styled-code-block'

/**
 * Shared markdown components for docs and blogs (headings, paragraphs, lists,
 * blockquote, code blocks, hr, links, images). Uses StyledCodeBlock for fenced code.
 */
export const markdownComponents: Components = {
  h1: ({ children }) => (
    <h1 className="text-foreground mt-4 mb-8 font-mono text-3xl leading-tight font-medium sm:text-4xl">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-foreground mt-12 mb-6 font-mono text-3xl font-bold tracking-tighter">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-foreground mt-10 mb-4 font-mono text-2xl font-bold tracking-tighter">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-foreground mt-8 mb-3 font-mono text-xl font-bold tracking-tight">
      {children}
    </h4>
  ),
  h5: ({ children }) => (
    <h5 className="text-foreground mt-6 mb-2 font-mono text-lg font-bold tracking-tight">
      {children}
    </h5>
  ),
  h6: ({ children }) => (
    <h6 className="text-foreground mt-4 mb-2 font-mono text-base font-bold tracking-tight">
      {children}
    </h6>
  ),
  p: ({ children }) => (
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
  ul: ({ children }) => (
    <ul className="text-foreground/80 [&>li]:before:text-foreground/40 my-8 list-none space-y-4 font-mono text-lg leading-relaxed [&>li]:flex [&>li]:before:mr-4 [&>li]:before:content-['■']">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="text-foreground/80 my-8 list-outside list-decimal space-y-4 pl-6 font-mono text-lg leading-relaxed">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="text-foreground/80 font-mono text-lg leading-relaxed">
      {children}
    </li>
  ),
  hr: () => <hr className="border-border my-10 border-t" aria-hidden />,
  pre: ({ children }) => <>{children}</>,
  code: ({ children, className }) => {
    const isFencedBlock = className?.includes('language-')
    const language = isFencedBlock
      ? (className?.replace(/^language-/, '').split(/\s/)[0] ?? undefined)
      : undefined
    if (isFencedBlock) {
      return (
        <StyledCodeBlock code={String(children ?? '')} language={language} />
      )
    }
    return (
      <code className="bg-muted text-foreground rounded px-1.5 py-0.5 text-sm">
        {children}
      </code>
    )
  },
  strong: ({ children }) => <strong>{children}</strong>,
  em: ({ children }) => <em>{children}</em>,
  a: ({ children, href }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-foreground underline underline-offset-2 hover:opacity-80"
    >
      {children}
    </a>
  ),
  img: ({ src, alt }) => (
    <span className="my-8 block">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src ?? ''}
        alt={alt ?? ''}
        className="border-border w-full max-w-full rounded-sm border object-contain"
      />
    </span>
  ),
}
