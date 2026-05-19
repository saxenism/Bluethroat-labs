import fs from 'node:fs/promises'
import path from 'node:path'
import { getPlaiceholder } from 'plaiceholder'

export type GetBlurDataURLOptions = {
  /** Placeholder size (4–64). Default 4 for local, 50 often used for remote. */
  size?: number
}

/**
 * Returns a base64 LQIP string for Next.js Image `blurDataURL`.
 * Use for local paths (e.g. `/landing/hero-bg.png`) or remote URLs.
 */
export async function getBlurDataURL(
  src: string,
  options: GetBlurDataURLOptions = {}
): Promise<string | undefined> {
  try {
    const { size } = options
    const isRemote = src.startsWith('http://') || src.startsWith('https://')

    const buffer = isRemote
      ? Buffer.from(await (await fetch(src)).arrayBuffer())
      : await fs.readFile(path.join(process.cwd(), 'public', src))

    const { base64 } = await getPlaiceholder(buffer, { size })
    return base64
  } catch {
    return undefined
  }
}
