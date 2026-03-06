/**
 * Slugify a string for use as a heading id.
 * Matches github-slugger behavior (used by rehype-slug) exactly:
 * lowercase, spaces to hyphens, strip non-alphanumeric/non-hyphen — no hyphen collapsing.
 */
export function slugify(text: string): string {
  return (
    text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\p{L}\p{N}-]/gu, '') || 'section'
  )
}

export interface MarkdownHeading {
  id: string
  title: string
  level: number
  style: string
}

/**
 * Parse markdown content and return headings (h1–h6) with stable ids.
 * Handles duplicate titles by appending -1, -2, etc. to ids.
 */
export function parseMarkdownHeadings(
  markdown: string | null | undefined
): MarkdownHeading[] {
  if (!markdown?.trim()) return []

  const lines = markdown.split('\n')
  const seen = new Map<string, number>()
  const result: MarkdownHeading[] = []

  const headingRe = /^(#{1,6})\s+(.+)$/
  let inCodeBlock = false

  for (const line of lines) {
    if (line.trimStart().startsWith('```')) {
      inCodeBlock = !inCodeBlock
      continue
    }
    if (inCodeBlock) continue

    const match = line.match(headingRe)
    if (!match) continue

    const level = match[1].length
    const raw = match[2].trim()
    // Strip inline markdown: code spans, bold/italic, links
    const title = raw
      .replace(/`[^`]*`/g, (m) => m.slice(1, -1)) // `code` → code
      .replace(/\*\*([^*]+)\*\*/g, '$1') // **bold** → bold
      .replace(/\*([^*]+)\*/g, '$1') // *italic* → italic
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') // [text](url) → text
      .trim()
    if (!title) continue

    const baseId = slugify(title)
    const count = seen.get(baseId) ?? 0
    seen.set(baseId, count + 1)
    const id = count === 0 ? baseId : `${baseId}-${count}`

    result.push({ id, title, level, style: `h${level}` })
  }

  return result
}
