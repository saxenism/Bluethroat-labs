import { MarkdownRenderer } from '@/components/markdown'
import { ReactNode } from 'react'

export interface SanityWriteup {
  title: string
  writeupUrl: string
  description?: string
  logo?: { asset: { _ref: string; _type: string } }
  coverImage?: { asset: { _ref: string; _type: string } }
}

export interface WriteupItem {
  title: string
  description: ReactNode
  href: string
  logoSrc: string | null
  coverSrc: string | null
}

export const WRITEUPS_QUERY = `*[_type == "writeup"] | order(orderRank asc) {
  title,
  description,
  writeupUrl,
  logo,
  coverImage
}`

export const mapSanityWriteupToItem = (
  writeup: SanityWriteup,
  urlFor: (src: unknown) => { url: () => string }
): WriteupItem => {
  return {
    title: writeup.title,
    href: writeup.writeupUrl,
    description: writeup.description ? (
      <MarkdownRenderer content={writeup.description} />
    ) : (
      ''
    ),
    logoSrc: writeup.logo ? urlFor(writeup.logo).url() : null,
    coverSrc: writeup.coverImage ? urlFor(writeup.coverImage).url() : null,
  }
}
