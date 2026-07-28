import type { MDXComponents } from 'mdx/types'
import { markdownComponents } from './markdown-components'
import { StyledCodeBlock } from './styled-code-block'
import { ReactElement } from 'react'

/**
 * Shared MDX components for server-rendered docs and blogs. Fenced code is
 * highlighted by Shiki on the server before the page reaches the browser.
 */
export const markdownComponentsWithStyledCode: MDXComponents = {
  ...markdownComponents,
  pre: ({ children }) => {
    const child = children as ReactElement<{
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
}
