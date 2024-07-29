/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dailyjlog.com',
    generateRobotsTxt: true,
    sitemapSize: 7000,
    changefreq: 'daily',
    priority: 0.7,
    exclude: ['/server-sitemap.xml'], // 추가적인 제외 경로 설정
    robotsTxtOptions: {
      additionalSitemaps: [
        'https://www.dailyjlog.com/server-sitemap.xml', // 서버 사이드에서 생성된 사이트맵 추가
      ],
    },
  }
  