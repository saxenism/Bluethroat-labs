/**
 * Shared types and GROQ for docs navigation. Used by the server layout for SSG
 * and by types in the sidebar.
 */

const DOC_NAV_MAX_DEPTH = 8

function buildNavFragment(depth: number): string {
  const base = '"title": coalesce(title, doc->title), "slug": doc->slug.current'
  if (depth <= 0) return base
  return `${base}, items[] { ${buildNavFragment(depth - 1)} }`
}

export function buildDocsNavQuery(): string {
  const inner = buildNavFragment(DOC_NAV_MAX_DEPTH)
  return `*[_type == "docNavigation"][0] { items[] { ${inner} } }`
}

export interface NavItem {
  title: string
  slug?: string
  items?: NavItem[]
}

export interface DocsNavData {
  items?: NavItem[]
}

export interface SearchableDoc {
  title: string
  slug: string
}

export const DOCS_SEARCH_LIST_QUERY = `*[_type == "doc"] {
  title,
  "slug": slug.current
}`
