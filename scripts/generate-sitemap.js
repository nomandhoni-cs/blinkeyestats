import fs from 'fs';

const baseUrl = 'https://blinkeyestats.netlify.app'; // Update with your actual domain

async function generateSitemap() {
  try {
    // Fetch releases to get all version tags
    const response = await fetch('https://api.github.com/repos/nomandhoni-cs/blink-eye/releases');
    const releases = await response.json();
    
    // Static routes
    const routes = [
      '/',
      '/details'
    ];
    
    // Add dynamic version routes
    releases.forEach(release => {
      routes.push(`/version/${release.tag_name}`);
    });
    
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes.map(route => `
    <url>
      <loc>${baseUrl}${route}</loc>
      <changefreq>daily</changefreq>
      <priority>${route === '/' ? '1.0' : '0.8'}</priority>
    </url>
  `).join('')}
</urlset>`;
    
    fs.writeFileSync('dist/sitemap.xml', sitemap);
    console.log('Sitemap generated successfully!');
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
}

generateSitemap();