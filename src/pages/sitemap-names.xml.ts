import type { APIRoute } from 'astro';
import { readFile } from 'fs/promises';
import { join } from 'path';

export const GET: APIRoute = async () => {
  const baseUrl = 'https://meniny365.sk';
  
  try {
    // Read names data
    const namesData = await readFile(join(process.cwd(), 'src/data/names-origins.json'), 'utf-8');
    const names = JSON.parse(namesData);
    
    // Generate name pages
    const namePages = names.map((name: any) => ({
      loc: `${baseUrl}/sk/meno/${name.slug}`,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: '0.7'
    }));

    // Add calendar pages for each month
    const currentYear = new Date().getFullYear();
    const calendarPages = [];
    
    for (let month = 1; month <= 12; month++) {
      const monthStr = month.toString().padStart(2, '0');
      calendarPages.push({
        loc: `${baseUrl}/sk/kalendár/${currentYear}/${monthStr}`,
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: '0.8'
      });
    }

    // Add daily pages for current year
    const dailyPages = [];
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    
    for (let month = 1; month <= 12; month++) {
      const days = daysInMonth[month - 1];
      for (let day = 1; day <= days; day++) {
        const monthStr = month.toString().padStart(2, '0');
        const dayStr = day.toString().padStart(2, '0');
        dailyPages.push({
          loc: `${baseUrl}/sk/den/${currentYear}/${monthStr}/${dayStr}`,
          lastmod: new Date().toISOString(),
          changefreq: 'daily',
          priority: '0.6'
        });
      }
    }

    const allPages = [...namePages, ...calendarPages, ...dailyPages];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages.map(page => `
  <url>
    <loc>${page.loc}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('')}
</urlset>`;

    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  } catch (error) {
    console.error('Error generating names sitemap:', error);
    return new Response('Error generating sitemap', { status: 500 });
  }
};

