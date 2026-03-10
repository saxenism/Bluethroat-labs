import React from 'react'
import * as runtime from 'react/jsx-runtime'
import { evaluateSync } from '@mdx-js/mdx'
import remarkGfm from 'remark-gfm'
import rehypeSanitize from 'rehype-sanitize'
import type { MDXComponents } from 'mdx/types'
import { StyledCodeBlock } from './styled-code-block'

const captionEvalOptions = {
  ...(runtime as Parameters<typeof evaluateSync>[1]),
  format: 'md' as const,
  remarkPlugins: [remarkGfm],
  rehypePlugins: [rehypeSanitize],
}

/**
 * Shared MDX components for docs and blogs (headings, paragraphs, lists,
 * blockquote, code blocks, hr, links, images). Uses StyledCodeBlock for fenced code.
 */
export const markdownComponents: MDXComponents = {
  h1: ({ children, id }) => (
    <h1
      id={id}
      className="text-foreground my-8 text-2xl leading-tight font-bold md:text-[32px]"
    >
      {children}
    </h1>
  ),
  h2: ({ children, id }) => (
    <h2
      id={id}
      className="text-foreground my-6 text-xl font-bold tracking-tighter md:text-2xl"
    >
      {children}
    </h2>
  ),
  h3: ({ children, id }) => (
    <h3
      id={id}
      className="text-foreground my-4 text-lg font-bold tracking-tighter md:text-xl"
    >
      {children}
    </h3>
  ),
  h4: ({ children, id }) => (
    <h4
      id={id}
      className="text-foreground my-3 text-base font-bold tracking-tight md:text-lg"
    >
      {children}
    </h4>
  ),
  h5: ({ children, id }) => (
    <h5
      id={id}
      className="text-foreground my-2 text-sm font-bold tracking-tight md:text-base"
    >
      {children}
    </h5>
  ),
  h6: ({ children, id }) => (
    <h6
      id={id}
      className="text-foreground my-2 text-xs font-bold tracking-tight md:text-sm"
    >
      {children}
    </h6>
  ),
  p: ({ children, id }) => (
    <p
      id={id}
      className="mb-4 text-base leading-relaxed whitespace-pre-wrap text-[#454545] dark:text-[#CACACA]"
    >
      {children}
    </p>
  ),
  blockquote: ({ children, id }) => (
    <blockquote
      id={id}
      className="my-8 border-l-6 border-[#666666] py-1 pr-2 pl-4 text-[#454545] dark:border-[#A9A9A9] dark:text-[#CACACA] [&>p]:mb-0"
    >
      {children}
    </blockquote>
  ),
  ul: ({ children, id }) => (
    <ul
      id={id}
      className="my-4 list-none space-y-2 pl-4 [&_li>p]:mb-0 [&>li]:flex [&>li]:gap-3 [&>li]:before:mt-[5px] [&>li]:before:shrink-0 [&>li]:before:text-xs [&>li]:before:text-[#666666] [&>li]:before:content-['■'] [&>li]:before:select-none dark:[&>li]:before:text-[#A9A9A9]"
    >
      {children}
    </ul>
  ),
  ol: ({ children, start, id }) => (
    <ol
      start={start}
      id={id}
      className="my-4 list-outside list-decimal space-y-2 pl-10 text-[#454545] dark:text-[#CACACA] [&_li>p]:mb-0 [&_ol]:list-[lower-alpha] [&_ol_ol]:list-[lower-roman]"
    >
      {children}
    </ol>
  ),
  li: ({ children, id }) => (
    <li
      id={id}
      className="text-base leading-relaxed text-[#454545] dark:text-[#CACACA]"
    >
      <span className="min-w-0">{children}</span>
    </li>
  ),
  hr: () => <hr className="border-border my-8 border-t" aria-hidden />,
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
      <code className="bg-[#E6E6E6] px-2 py-1 text-base text-[#7D7D7D] dark:bg-[#292929]">
        {children}
      </code>
    )
  },
  strong: ({ children, id }) => (
    <strong id={id} className="text-foreground font-bold">
      {children}
    </strong>
  ),
  em: ({ children, id }) => (
    <em id={id} className="text-[#454545] italic dark:text-[#CACACA]">
      {children}
    </em>
  ),
  del: ({ children, id }) => (
    <del id={id} className="text-[#454545] line-through dark:text-[#CACACA]">
      {children}
    </del>
  ),
  a: ({ children, href, id }) => (
    <a
      id={id}
      href={href}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      className="hover:text-foreground dark:hover:text-foreground text-[#454545] underline underline-offset-2 dark:text-[#CACACA]"
    >
      {children}
    </a>
  ),
  img: ({ src, alt, title, id }) => {
    const image = (
      <span className="block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          id={id}
          src={src ?? ''}
          alt={alt ?? ''}
          className="w-full max-w-full object-contain"
        />
      </span>
    )
    if (!title?.trim()) {
      return <figure className="my-8">{image}</figure>
    }
    try {
      const { default: CaptionContent } = evaluateSync(
        title,
        captionEvalOptions
      )
      return (
        <figure id={id} className="my-8">
          {image}
          <figcaption className="mt-2 text-center text-[#454545] **:text-sm dark:text-[#CACACA] [&_p]:my-0 [&_p]:inline">
            <CaptionContent components={markdownComponents} />
          </figcaption>
        </figure>
      )
    } catch {
      return (
        <figure id={id} className="my-8">
          {image}
          <figcaption className="mt-2 text-center text-[#454545] **:text-sm dark:text-[#CACACA]">
            {title}
          </figcaption>
        </figure>
      )
    }
  },
  table: ({ children, id }) => (
    <div className="my-8 overflow-x-auto">
      <table
        id={id}
        className="border-border w-full border-collapse border text-sm"
      >
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-[#EBEBEB] dark:bg-[#1F1F1F]">{children}</thead>
  ),
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => (
    <tr className="border-border border-b hover:bg-[#E6E6E6]/30 dark:hover:bg-[#292929]/30">
      {children}
    </tr>
  ),
  th: ({ children }) => (
    <th className="border-border text-foreground border px-4 py-2 text-left font-bold">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-border border px-4 py-2 text-[#454545] dark:text-[#CACACA]">
      {children}
    </td>
  ),
}
