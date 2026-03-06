import { createImageUrlBuilder } from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'
import { client } from './client'

const builder = createImageUrlBuilder(client)

export function urlFor(source: SanityImageSource | string) {
  // If it's already a string URL (common in mock data), return a mock builder-like object
  if (
    typeof source === 'string' &&
    (source.startsWith('/') || source.startsWith('http'))
  ) {
    return { url: () => source }
  }

  return builder.image(source as SanityImageSource)
}
