import type { ReactNode } from 'react'
import { client } from '@/lib/sanity/client'
import {
  buildDocsNavQuery,
  DOCS_SEARCH_LIST_QUERY,
  type DocsNavData,
  type SearchableDoc,
} from '@/lib/sanity/docs-nav'
import { DocsNavbar } from '@/components/docs/docs-navbar'
import { DocsSidebar } from '@/components/docs/docs-sidebar'

export default async function DocsRootLayout({
  children,
}: {
  children: ReactNode
}) {
  const [navData, searchableDocs] = await Promise.all([
    client.fetch<DocsNavData>(buildDocsNavQuery()),
    client.fetch<SearchableDoc[]>(DOCS_SEARCH_LIST_QUERY),
  ])

  return (
    <div className="flex min-h-screen flex-col">
      <DocsNavbar version={navData?.version} />
      <div className="flex flex-1">
        <div className="max-lg:hidden">
          <DocsSidebar
            navigation={navData?.items ?? []}
            searchableDocs={searchableDocs ?? []}
          />
        </div>
        {children}
      </div>
    </div>
  )
}
