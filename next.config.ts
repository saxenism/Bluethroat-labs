import type { NextConfig } from 'next'
import createMDX from '@next/mdx'

const withMDX = createMDX({})

const isProduction = process.env.NODE_ENV === 'production'

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com https://vercel.live https://core.sanity-cdn.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://cdn.sanity.io",
  "font-src 'self' data: https://fonts.gstatic.com",
  "connect-src 'self' https://*.api.sanity.io https://*.apicdn.sanity.io https://vitals.vercel-insights.com",
  "frame-src 'self' https://calendar.app.google https://vercel.live",
  "manifest-src 'self'",
  "worker-src 'self' blob:",
  'upgrade-insecure-requests',
].join('; ')

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  devIndicators: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io', pathname: '/images/**' },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          ...(isProduction
            ? [{ key: 'Content-Security-Policy', value: contentSecurityPolicy }]
            : []),
        ],
      },
    ]
  },
}

export default withMDX(nextConfig)
