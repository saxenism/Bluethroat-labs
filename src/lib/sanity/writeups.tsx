import { MarkdownRenderer } from '@/components/markdown'
import type { ReactNode } from 'react'

export interface SanityImage {
  asset: { _ref: string; _type: string }
}

export interface SanityWriteupSeries {
  _id: string
  title: string
  description?: string
  logo?: SanityImage
  coverImage: SanityImage
}

export interface SanityWriteup {
  title: string
  writeupUrl: string
  description?: string
  logo?: SanityImage
  coverImage: SanityImage
  series?: SanityWriteupSeries | null
}

export interface WriteupSeriesItem {
  id: string
  title: string
  description: ReactNode
  logoSrc: string | null
  coverSrc: string | null
}

export interface WriteupItem {
  title: string
  description: ReactNode
  href: string
  logoSrc: string | null
  coverSrc: string | null
  series: WriteupSeriesItem | null
}

export const WRITEUPS_QUERY = `*[_type == "writeup"] | order(orderRank asc) {
  title,
  description,
  writeupUrl,
  logo,
  coverImage,
  "series": series->{
    _id,
    title,
    description,
    logo,
    coverImage
  }
}`

export const WRITEUP_SERIES_QUERY = `*[_type == "writeupSeries"] | order(orderRank asc) {
  _id,
  title,
  description,
  logo,
  coverImage
}`

type ImageUrlBuilder = (src: unknown) => { url: () => string }

export const mapSanityWriteupSeriesToItem = (
  series: SanityWriteupSeries,
  urlFor: ImageUrlBuilder
): WriteupSeriesItem => ({
  id: series._id,
  title: series.title,
  description: series.description ? (
    <MarkdownRenderer content={series.description} />
  ) : (
    ''
  ),
  logoSrc: series.logo ? urlFor(series.logo).url() : null,
  coverSrc: series.coverImage ? urlFor(series.coverImage).url() : null,
})

export const mapSanityWriteupToItem = (
  writeup: SanityWriteup,
  urlFor: ImageUrlBuilder
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
    series: writeup.series
      ? mapSanityWriteupSeriesToItem(writeup.series, urlFor)
      : null,
  }
}
