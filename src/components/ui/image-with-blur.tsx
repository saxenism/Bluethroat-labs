import Image, { type ImageProps } from 'next/image'
import { getBlurDataURL } from '@/lib/plaiceholder'

export type ImageWithBlurProps = Omit<
  ImageProps,
  'placeholder' | 'blurDataURL'
> & {
  /** Image src: local path (e.g. `/landing/hero-bg.png`) or remote URL. */
  src: string
  /** Placeholder size (4–64). Omit for default; use e.g. 50 for remote images. */
  blurSize?: number
}

/**
 * Next Image with Plaiceholder LQIP blur. Use in server components only.
 */
export async function ImageWithBlur({
  src,
  blurSize = 32,
  alt,
  ...props
}: ImageWithBlurProps) {
  const blurDataURL = await getBlurDataURL(src, { size: blurSize })

  return (
    <Image
      src={src}
      alt={alt}
      placeholder="blur"
      blurDataURL={blurDataURL}
      {...props}
    />
  )
}
