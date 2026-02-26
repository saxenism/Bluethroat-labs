/**
 * Centralized mock data for local development.
 * This data is only used when process.env.NODE_ENV === 'development'.
 */

export const IS_DEV = false && process.env.NODE_ENV === 'development'

export const MOCK_BLOGS = [
  {
    title:
      'Debunking The TeeDotFail Panic: Why TEEs Are Still Viable For Secure Computing',
    slug: 'debunking-teedotfail',
    publishedAt: '2025-12-13T00:00:00.000Z',
    category: 'TEE Security',
    bannerImage: { _type: 'image', asset: { _ref: 'dummy-ref' } },
    // Fallback for components that expect a direct URL in their state
    src: '/dark-mode/dark-strip.png',
    content: [
      {
        _type: 'block',
        style: 'h1',
        children: [{ _type: 'span', text: 'Debunking The TeeDotFail Panic' }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Ok so continuing commentary on TEE attacks from my previous article on TEE.fail attack...',
          },
        ],
      },
    ],
  },
  {
    title: 'The Future of Confidential Computing in 2026',
    slug: 'future-confidential-computing',
    publishedAt: '2026-01-05T00:00:00.000Z',
    category: 'TEE Security',
    bannerImage: null,
    src: null,
    content: [],
  },
]

export const MOCK_DOCS = {
  'executive-summary': {
    title: 'Executive Summary',
    slug: 'executive-summary',
    heroImage: { _type: 'image', asset: { _ref: 'dummy-ref' } },
    content: [
      {
        _key: 'h1',
        _type: 'block',
        style: 'h1',
        children: [{ _type: 'span', text: 'Executive Summary' }],
      },
      {
        _key: 'p1',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Bluethroat Labs is pioneering the next generation of confidential computing infrastructure.',
          },
        ],
      },
    ],
    relatedBlogs: [MOCK_BLOGS[0]],
  },
}

export const MOCK_DOC_NAVIGATION = {
  items: [
    { title: 'Introduction', slug: 'executive-summary', items: [] },
    {
      title: 'Core Platforms',
      items: [
        { title: 'Nitro', slug: 'nitro' },
        { title: 'Enclave Manager', slug: 'enclave-manager' },
      ],
    },
  ],
}
