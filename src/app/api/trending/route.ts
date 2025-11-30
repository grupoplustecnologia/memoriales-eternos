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
 * GET /api/trending
 * - ?type=popular|recent|mostCommented|mostLiked
 * - ?limit=20
 * - ?page=1
 */
export async function GET(req: NextRequest) {
  try {
    const type = req.nextUrl.searchParams.get('type') || 'popular';
    const pageParam = req.nextUrl.searchParams.get('page');
    const limitParam = req.nextUrl.searchParams.get('limit') || '20';
    const { page, limit } = getPaginationParams(pageParam || '1', limitParam);

    // Most viewed memorials
    if (type === 'popular') {
      const cacheKey = `${cacheKeys.trending(page, limit)}:popular`;
      let memorials: any = await getCached(cacheKey);

      if (!memorials) {
        const [data, total] = await Promise.all([
          prisma.animalProfile.findMany({
            where: { isPublic: true },
            orderBy: { viewCount: 'desc' },
            skip: (page - 1) * limit,
            take: limit,
            select: {
              id: true,
              name: true,
              photoUrl: true,
              animalType: true,
              deathDate: true,
              viewCount: true,
              user: {
                select: { name: true },
              },
              _count: {
                select: {
                  tributes: true,
                  likes: true,
                  comments: true,
                },
              },
            },
          }),
          prisma.animalProfile.count({ where: { isPublic: true } }),
        ]);

        memorials = {
          data,
          pagination: calculatePagination(page, limit, total),
        };

        await setCached(cacheKey, memorials, 300); // 5 min cache
      }

      return NextResponse.json({
        success: true,
        ...memorials,
      });
    }

    // Most recently created
    if (type === 'recent') {
      const cacheKey = `${cacheKeys.trending(page, limit)}:recent`;
      let memorials: any = await getCached(cacheKey);

      if (!memorials) {
        const [data, total] = await Promise.all([
          prisma.animalProfile.findMany({
            where: { isPublic: true },
            orderBy: { createdAt: 'desc' },
            skip: (page - 1) * limit,
            take: limit,
            select: {
              id: true,
              name: true,
              photoUrl: true,
              animalType: true,
              deathDate: true,
              viewCount: true,
              user: {
                select: { name: true },
              },
              _count: {
                select: {
                  tributes: true,
                  likes: true,
                  comments: true,
                },
              },
            },
          }),
          prisma.animalProfile.count({ where: { isPublic: true } }),
        ]);

        memorials = {
          data,
          pagination: calculatePagination(page, limit, total),
        };

        await setCached(cacheKey, memorials, 300);
      }

      return NextResponse.json({
        success: true,
        ...memorials,
      });
    }

    // Most commented
    if (type === 'mostCommented') {
      const cacheKey = `${cacheKeys.trending(page, limit)}:mostCommented`;
      let memorials: any = await getCached(cacheKey);

      if (!memorials) {
        const [data, total] = await Promise.all([
          prisma.animalProfile.findMany({
            where: { isPublic: true },
            orderBy: {
              comments: { _count: 'desc' },
            },
            skip: (page - 1) * limit,
            take: limit,
            select: {
              id: true,
              name: true,
              photoUrl: true,
              animalType: true,
              deathDate: true,
              viewCount: true,
              user: {
                select: { name: true },
              },
              _count: {
                select: {
                  comments: true,
                  tributes: true,
                  likes: true,
                },
              },
            },
          }),
          prisma.animalProfile.count({ where: { isPublic: true } }),
        ]);

        memorials = {
          data,
          pagination: calculatePagination(page, limit, total),
        };

        await setCached(cacheKey, memorials, 300);
      }

      return NextResponse.json({
        success: true,
        ...memorials,
      });
    }

    // Most liked
    if (type === 'mostLiked') {
      const cacheKey = `${cacheKeys.trending(page, limit)}:mostLiked`;
      let memorials: any = await getCached(cacheKey);

      if (!memorials) {
        const [data, total] = await Promise.all([
          prisma.animalProfile.findMany({
            where: { isPublic: true },
            orderBy: {
              likes: { _count: 'desc' },
            },
            skip: (page - 1) * limit,
            take: limit,
            select: {
              id: true,
              name: true,
              photoUrl: true,
              animalType: true,
              deathDate: true,
              viewCount: true,
              user: {
                select: { name: true },
              },
              _count: {
                select: {
                  likes: true,
                  tributes: true,
                  comments: true,
                },
              },
            },
          }),
          prisma.animalProfile.count({ where: { isPublic: true } }),
        ]);

        memorials = {
          data,
          pagination: calculatePagination(page, limit, total),
        };

        await setCached(cacheKey, memorials, 300);
      }

      return NextResponse.json({
        success: true,
        ...memorials,
      });
    }

    // Stats summary (longer cache: 10 min)
    if (type === 'stats') {
      const cacheKey = 'trending:stats';
      let stats: any = await getCached(cacheKey);

      if (!stats) {
        const [totalMemorials, totalLikes, totalComments, totalTributes, mostViewedMemorial] =
          await Promise.all([
            prisma.animalProfile.count({ where: { isPublic: true } }),
            prisma.like.count(),
            prisma.comment.count(),
            prisma.tribute.count(),
            prisma.animalProfile.findFirst({
              where: { isPublic: true },
              orderBy: { viewCount: 'desc' },
              select: {
                id: true,
                name: true,
                viewCount: true,
              },
            }),
          ]);

        stats = {
          totalMemorials,
          totalLikes,
          totalComments,
          totalTributes,
          mostViewedMemorial,
        };

        await setCached(cacheKey, stats, 600); // 10 min cache
      }

      return NextResponse.json({
        success: true,
        data: stats,
      });
    }

    return NextResponse.json(
      { error: 'Invalid type parameter' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Trending error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
