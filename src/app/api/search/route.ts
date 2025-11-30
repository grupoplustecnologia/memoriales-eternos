import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  getCached,
  setCached,
  cacheKeys,
  getPaginationParams,
  calculatePagination,
} from '@/lib/cache';

/**
 * GET /api/search?q=query&type=all|memorial|animal|location&page=1&limit=20
 * Advanced search with caching and pagination
 */
export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams.get('q');
    const type = req.nextUrl.searchParams.get('type') || 'all';
    const pageParam = req.nextUrl.searchParams.get('page');
    const limitParam = req.nextUrl.searchParams.get('limit') || '20';

    if (!query) {
      return NextResponse.json({ error: 'q parameter is required' }, { status: 400 });
    }

    const { page, limit } = getPaginationParams(pageParam || '1', limitParam);
    const searchQuery = query.toLowerCase();
    const cacheKey = cacheKeys.search(searchQuery, type, page);

    // Try to get from cache
    let cached: any = await getCached(cacheKey);
    if (cached) {
      return NextResponse.json({
        success: true,
        cached: true,
        ...cached,
      });
    }

    let result: any = null;

    // Search in memorial names, stories, epitaphs
    if (type === 'all' || type === 'memorial') {
      const [memorials, total] = await Promise.all([
        prisma.animalProfile.findMany({
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
          skip: (page - 1) * limit,
          take: limit,
          select: {
            id: true,
            name: true,
            photoUrl: true,
            animalType: true,
            deathDate: true,
            user: {
              select: { name: true },
            },
          },
        }),
        prisma.animalProfile.count({
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
        }),
      ]);

      if (type === 'memorial') {
        result = {
          data: memorials,
          pagination: calculatePagination(page, limit, total),
        };
      } else {
        // For 'all' type, we'll combine results below
        result = {
          memorials,
          memorialTotal: total,
        };
      }
    }

    // Search by animal type
    if (type === 'all' || type === 'animal') {
      const [byType, total] = await Promise.all([
        prisma.animalProfile.findMany({
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
          skip: (page - 1) * limit,
          take: limit,
          select: {
            id: true,
            name: true,
            photoUrl: true,
            animalType: true,
            user: {
              select: { name: true },
            },
          },
        }),
        prisma.animalProfile.count({
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
        }),
      ]);

      if (type === 'animal') {
        result = {
          data: byType,
          pagination: calculatePagination(page, limit, total),
        };
      } else {
        result.animalResults = byType;
        result.animalTotal = total;
      }
    }

    // Search by location (coordinates or nearby)
    if (type === 'all' || type === 'location') {
      const [latStr, lonStr] = query.split(',');
      if (latStr && lonStr) {
        const lat = parseFloat(latStr);
        const lon = parseFloat(lonStr);

        if (!isNaN(lat) && !isNaN(lon)) {
          // Fetch nearby memorials and calculate distance
          const memorials = await prisma.animalProfile.findMany({
            where: { isPublic: true },
            take: limit * 3, // Fetch more to filter by distance
            select: {
              id: true,
              name: true,
              photoUrl: true,
              latitude: true,
              longitude: true,
              animalType: true,
              deathDate: true,
              user: {
                select: { name: true },
              },
            },
          });

          const nearby = memorials
            .map((m: any) => ({
              ...m,
              distance: Math.sqrt(Math.pow(m.latitude - lat, 2) + Math.pow(m.longitude - lon, 2)),
            }))
            .sort((a: any, b: any) => a.distance - b.distance)
            .slice(0, limit)
            .map(({ distance, ...m }: any) => m);

          if (type === 'location') {
            result = {
              data: nearby,
              pagination: {
                page,
                limit,
                total: nearby.length,
                hasMore: false,
                totalPages: 1,
              },
            };
          } else {
            result.locationResults = nearby;
          }
        }
      }
    }

    // If not found specific type, return combined results (full text search)
    if (!result) {
      const [memorials, total] = await Promise.all([
        prisma.animalProfile.findMany({
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
          skip: (page - 1) * limit,
          take: limit,
          select: {
            id: true,
            name: true,
            photoUrl: true,
            animalType: true,
            deathDate: true,
            user: {
              select: { name: true },
            },
          },
        }),
        prisma.animalProfile.count({
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
        }),
      ]);

      result = {
        data: memorials,
        pagination: calculatePagination(page, limit, total),
      };
    }

    // Cache for 5 minutes
    await setCached(cacheKey, result, 300);

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
