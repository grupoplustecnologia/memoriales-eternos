import { NextRequest } from 'next/server';

export const runtime = 'edge';

/**
 * Dynamic Open Graph image generator
 * Creates unique gradient images for each page
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const title = searchParams.get('title') || 'Forever Pet Friend';
  const color = searchParams.get('color') || 'rgb(147, 51, 234)';

  // Generate a simple PNG OG image using canvas-based approach
  // For production, consider using Vercel OG (satori) with proper JSX-free approach
  
  try {
    // Return a placeholder image that can be generated
    // In production, use a proper image generation service
    const bgGradient = `linear-gradient(135deg, ${color} 0%, rgba(0,0,0,0.2) 100%)`;
    
    const svgImage = `
      <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
            <stop offset="100%" style="stop-color:rgba(0,0,0,0.2);stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="1200" height="630" fill="url(#grad)"/>
        <text x="600" y="250" font-size="72" font-weight="bold" text-anchor="middle" fill="white" font-family="system-ui, -apple-system, sans-serif" text-shadow="0 4px 8px rgba(0,0,0,0.3)">
          ${title}
        </text>
        <text x="600" y="350" font-size="32" text-anchor="middle" fill="rgba(255,255,255,0.9)" font-family="system-ui, -apple-system, sans-serif">
          Monumentos virtuales eternos para tus mascotas
        </text>
        <text x="1100" y="600" font-size="18" text-anchor="end" fill="rgba(255,255,255,0.8)" font-family="system-ui, -apple-system, sans-serif">
          memorias-eternas.app
        </text>
      </svg>
    `;

    return new Response(svgImage, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, s-maxage=31536000, immutable'
      }
    });
  } catch (error) {
    return new Response(`Failed to generate image`, {
      status: 500
    });
  }
}
