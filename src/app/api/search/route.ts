import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/search?q=query&type=location|date|animal - Advanced search
 */
export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams.get('q');
    const type = req.nextUrl.searchParams.get('type') || 'all';
    const limit = parseInt(req.nextUrl.searchParams.get('limit') || '20');

    if (!query) {
      return NextResponse.json(
        { error: 'q parameter is required' },
        { status: 400 }
      );
    }

    const searchQuery = query.toLowerCase();

    // Search in memorial names
    if (type === 'all' || type === 'memorial') {
      const memorials = await prisma.animalProfile.findMany({
        where: {
          AND: [
            { isPublic: true },
            {
              OR: [
                {
                  name: {
                    contains: searchQuery,
                    mode: 'insensitive',
                  },
                },
                {
                  story: {
                    contains: searchQuery,
                    mode: 'insensitive',
                  },
                },
                {
                  epitaph: {
                    contains: searchQuery,
                    mode: 'insensitive',
                  },
                },
              ],
            },
          ],
        },
        take: limit,
        select: {
          id: true,
          name: true,
          photoUrl: true,
          animalType: true,
          deathDate: true,
          user: {
            select: {
              name: true,
            },
          },
        },
      });

      if (type === 'memorial') {
        return NextResponse.json({
          success: true,
          data: { memorials },
        });
      }
    }

    // Search by animal type
    if (type === 'all' || type === 'animal') {
      const byType = await prisma.animalProfile.findMany({
        where: {
          AND: [
            { isPublic: true },
            {
              animalType: {
                contains: searchQuery,
                mode: 'insensitive',
              },
            },
          ],
        },
        take: limit,
        select: {
          id: true,
          name: true,
          photoUrl: true,
          animalType: true,
          user: {
            select: {
              name: true,
            },
          },
        },
      });

      if (type === 'animal') {
        return NextResponse.json({
          success: true,
          data: { memorials: byType },
        });
      }
    }

    // Search by location (coordinates or nearby)
    if (type === 'all' || type === 'location') {
      const [latStr, lonStr] = query.split(',');
      if (latStr && lonStr) {
        const lat = parseFloat(latStr);
        const lon = parseFloat(lonStr);

        if (!isNaN(lat) && !isNaN(lon)) {
          // Simple distance calculation (within ~5km)
          const memorials = await prisma.animalProfile.findMany({
            where: { isPublic: true },
            take: limit * 2,
            select: {
              id: true,
              name: true,
              photoUrl: true,
              latitude: true,
              longitude: true,
              animalType: true,
              deathDate: true,
              user: {
                select: {
                  name: true,
                },
              },
            },
          });

          const nearby = memorials
            .map((m: any) => ({
              ...m,
              distance: Math.sqrt(
                Math.pow(m.latitude - lat, 2) + Math.pow(m.longitude - lon, 2)
              ),
            }))
            .sort((a: any, b: any) => a.distance - b.distance)
            .slice(0, limit)
            .map(({ distance, ...m }: any) => m);

          if (type === 'location') {
            return NextResponse.json({
              success: true,
              data: { memorials: nearby },
            });
          }
        }
      }
    }

    // Return combined results
    const memorials = await prisma.animalProfile.findMany({
      where: {
        AND: [
          { isPublic: true },
          {
            OR: [
              {
                name: {
                  contains: searchQuery,
                  mode: 'insensitive',
                },
              },
              {
                animalType: {
                  contains: searchQuery,
                  mode: 'insensitive',
                },
              },
              {
                story: {
                  contains: searchQuery,
                  mode: 'insensitive',
                },
              },
            ],
          },
        ],
      },
      take: limit,
      select: {
        id: true,
        name: true,
        photoUrl: true,
        animalType: true,
        deathDate: true,
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: { memorials },
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
