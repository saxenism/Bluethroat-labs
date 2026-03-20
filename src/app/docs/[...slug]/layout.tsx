import type { ReactNode } from 'react'
import { DocsLayoutShell } from '@/components/docs/docs-layout-shell'
import { client } from '@/lib/sanity/client'
import {
  buildDocsNavQuery,
  DOCS_SEARCH_LIST_QUERY,
  getAdjacentNavItems,
  getNavBreadcrumb,
  type BreadcrumbItem,
  type DocsNavData,
  type SearchableDoc,
} from '@/lib/sanity/docs-nav'
import { parseMarkdownHeadings } from '@/lib/markdown-headings'
import { BASE_URL } from '@/lib/constants'

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

  const navBreadcrumb = getNavBreadcrumb(navData?.items ?? [], currentSlug)
  const breadcrumbItems: BreadcrumbItem[] = navBreadcrumb
    ? [{ title: 'Home' }, ...navBreadcrumb]
    : [
        { title: 'Home', slug: '/docs' },
        ...slugArray.map((s) => ({ title: s.replace(/-/g, ' ') })),
      ]

  const { prev, next } = getAdjacentNavItems(navData?.items ?? [], currentSlug)

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${BASE_URL}/docs/${currentSlug}#breadcrumb`,
    itemListElement: breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.title,
      item: `${BASE_URL}/docs/${item.slug ?? ''}`,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <DocsLayoutShell
        subSections={subSections}
        breadcrumbItems={breadcrumbItems}
        navigation={navData?.items ?? []}
        searchableDocs={searchableDocs ?? []}
        prev={prev}
        next={next}
      >
        {children}
      </DocsLayoutShell>
    </>
  )
}
