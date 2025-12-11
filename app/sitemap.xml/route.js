export async function GET() {
  const baseUrl = 'https://crit-4hwi.vercel.app';
  const today = new Date().toISOString();
  const urls = [
    '',
    '/products',
    '/services',
    '/career',
    '/about',
    '/contact',
    '/sap-implementation-services',
    '/sap-rollout-services',
    '/sap-support-services',
    '/sap-upgrade-services',
    '/sap-integration-services',
    '/sap-migration-services',
    '/sap-automation-services',
    '/sap-testing-services',
    '/blog',
    
  ];
  const priorities = {
    '': '1.00',
    '/products': '0.80',
    '/services': '0.80',
    '/career': '0.80',
    '/about': '0.80',
    '/contact': '0.80',
    '/sap-implementation-services': '0.80',
    '/sap-rollout-services': '0.80',
    '/sap-support-services': '0.80',
    '/sap-upgrade-services': '0.80',
    '/sap-integration-services': '0.80',
    '/sap-migration-services': '0.80',
    '/sap-automation-services': '0.80',
    '/sap-testing-services': '0.80',
    '/blog': '0.80',
  };
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map(url =>
      `  <url>\n` +
      `    <loc>${baseUrl}${url}</loc>\n` +
      `    <lastmod>${today}</lastmod>\n` +
      `    <priority>${priorities[url]}</priority>\n` +
      `  </url>`
    ).join('\n') +
    '\n</urlset>';
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}