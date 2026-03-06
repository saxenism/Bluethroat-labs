import React from 'react'
import type { MDXComponents } from 'mdx/types'
import { StyledCodeBlock } from './styled-code-block'

/**
 * Shared MDX components for docs and blogs (headings, paragraphs, lists,
 * blockquote, code blocks, hr, links, images). Uses StyledCodeBlock for fenced code.
 */
export const markdownComponents: MDXComponents = {
  h1: ({ children, id }) => (
    <h1 id={id} className="text-foreground mt-4 mb-8 font-mono text-3xl leading-tight font-medium sm:text-4xl">
      {children}
    </h1>
  ),
  h2: ({ children, id }) => (
    <h2 id={id} className="text-foreground mt-12 mb-6 font-mono text-3xl font-bold tracking-tighter">
      {children}
    </h2>
  ),
  h3: ({ children, id }) => (
    <h3 id={id} className="text-foreground mt-10 mb-4 font-mono text-2xl font-bold tracking-tighter">
      {children}
    </h3>
  ),
  h4: ({ children, id }) => (
    <h4 id={id} className="text-foreground mt-8 mb-3 font-mono text-xl font-bold tracking-tight">
      {children}
    </h4>
  ),
  h5: ({ children, id }) => (
    <h5 id={id} className="text-foreground mt-6 mb-2 font-mono text-lg font-bold tracking-tight">
      {children}
    </h5>
  ),
  h6: ({ children, id }) => (
    <h6 id={id} className="text-foreground mt-4 mb-2 font-mono text-base font-bold tracking-tight">
      {children}
    </h6>
  ),
  p: ({ children }) => (
    <p className="text-foreground/80 mb-6 font-mono text-lg leading-relaxed whitespace-pre-wrap">
      {children}
    </p>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-foreground/30 [&>p]:text-foreground/70 my-10 border-l-4 py-1 pr-2 pl-6 [&>p]:mb-0 [&>p]:italic">
      {children}
    </blockquote>
  ),
  ul: ({ children }) => (
    <ul className="my-8 list-none space-y-2 pl-0 [&_li>p]:mb-0">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="marker:text-foreground/40 my-8 list-decimal space-y-2 pl-5 [&_li>p]:mb-0">
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => {
    const ordered = (props as { ordered?: boolean }).ordered
    return (
      <li className="text-foreground/80 flex gap-3 font-mono text-base leading-relaxed">
        {!ordered && (
          <span className="text-foreground/40 mt-[5px] shrink-0 text-xs select-none">
            ■
          </span>
        )}
        <span className="min-w-0">{children}</span>
      </li>
    )
  },
  hr: () => <hr className="border-border my-10 border-t" aria-hidden />,
  pre: ({ children }) => {
    // Extract code string and language from the child <code> element.
    const child = children as React.ReactElement<{
      className?: string
      children?: string
    }>
    const className = child?.props?.className ?? ''
    const language = className.includes('language-')
      ? className.replace(/^language-/, '').split(/\s/)[0]
      : undefined
    const code = String(child?.props?.children ?? '').replace(/\n$/, '')
    return <StyledCodeBlock code={code} language={language} />
  },
  code: ({ children, className }) => {
    // Only inline code reaches here (fenced blocks are handled by `pre`).
    if (className?.includes('language-')) return null
    return (
      <code className="bg-muted text-foreground rounded px-1.5 py-0.5 font-mono text-sm">
        {children}
      </code>
    )
  },
  strong: ({ children }) => (
    <strong className="text-foreground font-bold">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="text-foreground/80 italic">{children}</em>
  ),
  del: ({ children }) => (
    <del className="text-foreground/50 line-through">{children}</del>
  ),
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
  table: ({ children }) => (
    <div className="my-10 overflow-x-auto">
      <table className="border-border w-full border-collapse border font-mono text-sm">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-muted/50">{children}</thead>,
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => <tr className="border-border border-b">{children}</tr>,
  th: ({ children }) => (
    <th className="border-border text-foreground border px-4 py-2 text-left font-bold">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-border text-foreground/80 border px-4 py-2">
      {children}
    </td>
  ),
}
