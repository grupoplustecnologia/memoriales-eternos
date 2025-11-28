import { generateSitemapXml, generateSitemapUrls } from '@/lib/seo';
import { mockProfiles } from '@/data/mockData';

export const revalidate = 86400; // Revalidate every 24 hours

export async function GET() {
  try {
    // Convert profiles to sitemap format
    const profiles = mockProfiles.map((profile) => ({
      id: profile.id,
      updatedAt: profile.createdAt
    }));

    // Generate sitemap URLs
    const urls = generateSitemapUrls(profiles);

    // Generate XML
    const xml = generateSitemapXml(urls);

    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate'
      }
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new Response('Error generating sitemap', { status: 500 });
  }
}
