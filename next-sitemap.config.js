/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://bluethroatlabs.com',
  // generateRobotsTxt: true,
  // robotsTxtOptions: {
  //   policies: [
  //     { userAgent: '*', allow: '/', disallow: ['/studio', '/studio/'] },
  //   ],
  // },
  exclude: ['/studio', '/studio/*'],
  generateIndexSitemap: false,
  priority: 1,
}

module.exports = config
