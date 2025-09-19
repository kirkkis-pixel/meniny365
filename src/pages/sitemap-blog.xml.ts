import type { APIRoute } from 'astro';
import { readdir } from 'fs/promises';
import { join } from 'path';

export const GET: APIRoute = async () => {
  const baseUrl = 'https://meniny365.sk';
  
  try {
    // Read blog directory
    const blogDir = join(process.cwd(), 'src/pages/sk/blog');
    const files = await readdir(blogDir);
    
    // Filter for .astro files (blog posts)
    const blogPosts = files
      .filter(file => file.endsWith('.astro') && file !== 'index.astro' && file !== '[slug].astro')
      .map(file => ({
        loc: `${baseUrl}/sk/blog/${file.replace('.astro', '')}`,
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: '0.6'
      }));

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${blogPosts.map(post => `
  <url>
    <loc>${post.loc}</loc>
    <lastmod>${post.lastmod}</lastmod>
    <changefreq>${post.changefreq}</changefreq>
    <priority>${post.priority}</priority>
  </url>`).join('')}
</urlset>`;

    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  } catch (error) {
    console.error('Error generating blog sitemap:', error);
    return new Response('Error generating sitemap', { status: 500 });
  }
};

