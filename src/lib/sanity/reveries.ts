/**
 * Shared GROQ queries and types for reveries (blog) content. Used by server
 * pages for static generation; no client-side Sanity calls.
 */

export interface SanityCategory {
  title: string
}

export interface SanityBlogPost {
  title: string
  slug: string
  bannerImage?: { asset: { _ref: string; _type: string } }
  categories?: { title: string }[] | null
  publishedAt?: string
}

/** All categories for the filter bar. */
export const CATEGORIES_QUERY = `*[_type == "blogCategory"] | order(title asc) {
  title
}`

/** Latest N posts for homepage preview. */
export const REVERIES_PREVIEW_QUERY = `*[_type == "blog"] | order(publishedAt desc) [0..2] {
  title,
  "slug": slug.current,
  bannerImage,
  "categories": categories[]->{ title },
  publishedAt
}`

/** All posts for catalog page. */
export const REVERIES_LIST_QUERY = `*[_type == "blog"] | order(publishedAt desc) {
  title,
  "slug": slug.current,
  bannerImage,
  "categories": categories[]->{ title },
  publishedAt
}`

export interface BlogItem {
  title: string
  date: string
  categories: string[]
  href: string
  src: string | null
}

export const mapSanityPostToBlogItem = (
  post: SanityBlogPost,
  urlFor: (src: unknown) => { url: () => string }
): BlogItem => {
  return {
    title: post.title,
    date: post.publishedAt
      ? new Date(post.publishedAt).toLocaleDateString('en-US', {
          month: 'long',
          day: '2-digit',
          year: 'numeric',
        })
      : '',
    categories: post.categories?.map((c) => c.title).filter(Boolean) ?? [
      'General',
    ],
    href: `/reveries/${post.slug}`,
    src: post.bannerImage ? urlFor(post.bannerImage).url() : null,
  }
}
