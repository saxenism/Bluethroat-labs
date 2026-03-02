'use client'

import { createContext, useContext, type ReactNode } from 'react'
import type { MarkdownHeading } from '@/lib/markdown-headings'

interface DocsTocContextValue {
  subSections: MarkdownHeading[]
  activeSection: string
}

const DocsTocContext = createContext<DocsTocContextValue>({
  subSections: [],
  activeSection: '',
})

export function DocsTocProvider({
  subSections,
  activeSection,
  children,
}: DocsTocContextValue & { children: ReactNode }) {
  return (
    <DocsTocContext.Provider value={{ subSections, activeSection }}>
      {children}
    </DocsTocContext.Provider>
  )
}

export function useDocsToc() {
  return useContext(DocsTocContext)
}
