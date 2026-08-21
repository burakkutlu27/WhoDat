import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'OAI-SearchBot',
          'PerplexityBot',
          'Google-Extended',
          'ClaudeBot',
          'Applebot-Extended',
        ],
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://whodat.burakkutlu.com/sitemap.xml',
    host: 'https://whodat.burakkutlu.com',
  }
}
