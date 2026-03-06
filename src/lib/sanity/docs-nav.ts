/**
 * Shared types and GROQ for docs navigation. Used by the server layout for SSG
 * and by types in the sidebar.
 */

import { DOC_NAV_MAX_DEPTH } from '../constants'

function buildNavFragment(depth: number): string {
  const base = '"title": coalesce(title, doc->title), "slug": doc->slug.current'
  if (depth <= 0) return base
  return `${base}, items[] { ${buildNavFragment(depth - 1)} }`
}

export function buildDocsNavQuery(): string {
  const inner = buildNavFragment(DOC_NAV_MAX_DEPTH)
  return `*[_type == "docNavigation"][0] { version, items[] { ${inner} } }`
}

export interface NavItem {
  title: string
  slug?: string
  items?: NavItem[]
}

export interface DocsNavData {
  version?: string
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

/** Flatten a nav tree into ordered leaf nodes (items with a slug). */
export function flattenNavItems(items: NavItem[]): NavItem[] {
  const result: NavItem[] = []
  for (const item of items) {
    if (item.slug) result.push(item)
    if (item.items?.length) result.push(...flattenNavItems(item.items))
  }
  return result
}

export function getAdjacentNavItems(
  items: NavItem[],
  currentSlug: string
): { prev: NavItem | null; next: NavItem | null } {
  const flat = flattenNavItems(items)
  const idx = flat.findIndex((i) => i.slug === currentSlug)
  return {
    prev: idx > 0 ? flat[idx - 1] : null,
    next: idx < flat.length - 1 ? flat[idx + 1] : null,
  }
}
