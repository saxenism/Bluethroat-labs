import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  // If it's already a string URL (common in mock data), return a mock builder-like object
  if (
    typeof source === 'string' &&
    (source.startsWith('/') || source.startsWith('http'))
  ) {
    return { url: () => source }
  }

  // Handle our mock data "dummy-ref"
  if (source?.asset?._ref === 'dummy-ref') {
    return { url: () => '/dark-mode/dark-footer.png' }
  }

  return builder.image(source)
}
