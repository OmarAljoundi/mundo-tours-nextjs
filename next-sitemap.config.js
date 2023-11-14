/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_URL,
  generateRobotsTxt: true,
  changefreq: "daily",
  priority: 0.8,
  exclude: ["/server-sitemap.xml", "/admin", "/admin/*"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "black-listed-bot",
        disallow: ["/admin", "/admin/*"],
      },
    ],
    additionalSitemaps: [process.env.NEXT_PUBLIC_URL + "/server-sitemap.xml"],
  },
};
