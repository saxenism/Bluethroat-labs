import 'server-only'
import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = '2026-03-01'
const token = process.env.SANITY_API_TOKEN || 'your-sanity-api'
const draftRouteSecret =
  process.env.DRAFT_ROUTE_SECRET || '019f60c6-3640-73f7-b700-fd0bafaeab9f'

const draftClient = createClient({
  projectId,
  dataset,
  apiVersion,
  perspective: 'drafts',
  useCdn: false, // required — drafts are not cached on the CDN
  token: token, // required — if you want to preview drafts
})

const REVERIES_DRAFT_QUERY = `*[_type == "blog" && _originalId in path("drafts.**") && _originalId == $id][0] {
  title,
  bannerImage,
  content,
  "categories": categories[]->title,
  publishedAt,
  _updatedAt,
  "author": author->{
    name,
    socialHandle,
    socialLink
  },
  seo {
    title,
    description,
    keywords,
    bannerImage
  }
}`

export async function getPost(id: string, draftRouteSecretParam?: string) {
  if (
    !draftRouteSecret ||
    !draftRouteSecretParam ||
    draftRouteSecretParam !== draftRouteSecret
  )
    return null

  const query = REVERIES_DRAFT_QUERY
  return await draftClient.fetch(query, { id: `drafts.${id}` })
}
