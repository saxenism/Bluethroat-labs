/**
 * Shared GROQ queries and types for reveries (blog) content. Used by server
 * pages for static generation; no client-side Sanity calls.
 */

export interface SanityBlogPost {
  title: string
  slug: string
  bannerImage?: { asset: { _ref: string; _type: string } }
  category?: string
  publishedAt?: string
}

/** Latest N posts for homepage preview. */
export const REVERIES_PREVIEW_QUERY = `*[_type == "blog"] | order(publishedAt desc) [0..2] {
  title,
  "slug": slug.current,
  bannerImage,
  category,
  publishedAt
}`

/** All posts for catalog page. */
export const REVERIES_LIST_QUERY = `*[_type == "blog"] | order(publishedAt desc) {
  title,
  "slug": slug.current,
  bannerImage,
  category,
  publishedAt
}`

export interface BlogItem {
  title: string
  date: string
  category: string
  href: string
  src: string | null
}

export function mapSanityPostToBlogItem(
  post: SanityBlogPost,
  urlFor: (src: unknown) => { url: () => string }
): BlogItem {
  return {
    title: post.title,
    date: post.publishedAt
      ? new Date(post.publishedAt).toLocaleDateString('en-US', {
          month: 'long',
          day: '2-digit',
          year: 'numeric',
        })
      : 'Coming soon',
    category: post.category || 'General',
    href: `/reveries/${post.slug}`,
    src: post.bannerImage ? urlFor(post.bannerImage).url() : null,
  }
}
