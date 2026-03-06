import type { ReactNode } from 'react'
import { DocsLayoutShell } from '@/components/docs/docs-layout-shell'
import { client } from '@/lib/sanity/client'
import {
  buildDocsNavQuery,
  DOCS_SEARCH_LIST_QUERY,
  getAdjacentNavItems,
  type DocsNavData,
  type SearchableDoc,
} from '@/lib/sanity/docs-nav'
import { parseMarkdownHeadings } from '@/lib/markdown-headings'

type Props = { children: ReactNode; params: Promise<{ slug: string[] }> }

export default async function DocsLayout({ children, params }: Props) {
  const { slug: slugParam } = await params
  const slugArray = slugParam || []
  const currentSlug = slugArray.join('/') || ''

  const [data, navData, searchableDocs] = await Promise.all([
    client.fetch<{ title: string; content?: string } | null>(
      `*[_type == "doc" && slug.current == $slug][0] {
        title,
        content
    }`,
      { slug: currentSlug }
    ),
    client.fetch<DocsNavData>(buildDocsNavQuery()),
    client.fetch<SearchableDoc[]>(DOCS_SEARCH_LIST_QUERY),
  ])

  const content = typeof data?.content === 'string' ? data.content : ''
  const subSections = parseMarkdownHeadings(content)

  const breadcrumbPaths = [
    'HOME',
    ...slugArray.map((s) => s.replace(/-/g, ' ').toUpperCase()),
  ]

  const { prev, next } = getAdjacentNavItems(navData?.items ?? [], currentSlug)

  return (
    <DocsLayoutShell
      subSections={subSections}
      breadcrumbPaths={breadcrumbPaths}
      navigation={navData?.items ?? []}
      searchableDocs={searchableDocs ?? []}
      version={navData?.version}
      prev={prev}
      next={next}
    >
      {children}
    </DocsLayoutShell>
  )
}
