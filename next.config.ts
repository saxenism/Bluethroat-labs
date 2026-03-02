import type { NextConfig } from 'next'
import withExportImages from 'next-export-optimize-images'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io', pathname: '/images/**' },
    ],
  },
  output: 'export',
}

export default withExportImages(nextConfig)
