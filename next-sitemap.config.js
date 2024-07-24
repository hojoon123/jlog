module.exports = {
  siteUrl: 'https://dailyjlog.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
    ],
    sitemap: 'https://dailyjlog.com/sitemap.xml',
  },
};