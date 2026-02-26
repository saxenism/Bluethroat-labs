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

  // Handle our mock data "dummy-ref"
  if (
    typeof source === 'object' &&
    source !== null &&
    'asset' in source &&
    typeof (source as { asset?: { _ref?: string } }).asset?._ref === 'string' &&
    (source as { asset: { _ref: string } }).asset._ref === 'dummy-ref'
  ) {
    return { url: () => '/dark-mode/dark-footer.png' }
  }

  return builder.image(source as SanityImageSource)
}
