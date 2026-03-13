import type { NextConfig } from 'next'
import createMDX from '@next/mdx'
import withPlaiceholder from '@plaiceholder/next'

const withMDX = createMDX({})

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  devIndicators: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io', pathname: '/images/**' },
    ],
  },
}

export default withPlaiceholder(withMDX(nextConfig))
