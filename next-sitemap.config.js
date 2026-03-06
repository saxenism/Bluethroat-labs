/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://bluethroatlabs.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', disallow: ['/studio', '/studio/'] },
      { userAgent: '*', allow: '/' },
    ],
  },
  exclude: ['/studio', '/studio/*'],
  generateIndexSitemap: false,
}

module.exports = config
