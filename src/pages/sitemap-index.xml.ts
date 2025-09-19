import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const baseUrl = 'https://meniny365.sk';
  
  const sitemaps = [
    {
      loc: `${baseUrl}/sitemap-pages.xml`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: '1.0'
    },
    {
      loc: `${baseUrl}/sitemap-blog.xml`,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: '0.8'
    },
    {
      loc: `${baseUrl}/sitemap-names.xml`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: '0.9'
    }
  ];

  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemaps.map(sitemap => `
  <sitemap>
    <loc>${sitemap.loc}</loc>
    <lastmod>${sitemap.lastmod}</lastmod>
    <changefreq>${sitemap.changefreq}</changefreq>
    <priority>${sitemap.priority}</priority>
  </sitemap>`).join('')}
</sitemapindex>`;

  return new Response(sitemapIndex, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};

