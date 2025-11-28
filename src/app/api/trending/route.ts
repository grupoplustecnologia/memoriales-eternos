import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/trending
 * - ?type=popular|recent|mostCommented|mostLiked
 * - ?limit=20
 */
export async function GET(req: NextRequest) {
  try {
    const type = req.nextUrl.searchParams.get('type') || 'popular';
    const limit = parseInt(req.nextUrl.searchParams.get('limit') || '20');

    // Most viewed memorials
    if (type === 'popular') {
      const memorials = await prisma.animalProfile.findMany({
        where: { isPublic: true },
        orderBy: { viewCount: 'desc' },
        take: limit,
        select: {
          id: true,
          name: true,
          photoUrl: true,
          animalType: true,
          deathDate: true,
          viewCount: true,
          user: {
            select: {
              name: true,
            },
          },
          _count: {
            select: {
              tributes: true,
              likes: true,
              comments: true,
            },
          },
        },
      });

      return NextResponse.json({
        success: true,
        data: memorials,
      });
    }

    // Most recently created
    if (type === 'recent') {
      const memorials = await prisma.animalProfile.findMany({
        where: { isPublic: true },
        orderBy: { createdAt: 'desc' },
        take: limit,
        select: {
          id: true,
          name: true,
          photoUrl: true,
          animalType: true,
          deathDate: true,
          viewCount: true,
          user: {
            select: {
              name: true,
            },
          },
          _count: {
            select: {
              tributes: true,
              likes: true,
              comments: true,
            },
          },
        },
      });

      return NextResponse.json({
        success: true,
        data: memorials,
      });
    }

    // Most commented
    if (type === 'mostCommented') {
      const memorials = await prisma.animalProfile.findMany({
        where: { isPublic: true },
        orderBy: {
          comments: {
            _count: 'desc',
          },
        },
        take: limit,
        select: {
          id: true,
          name: true,
          photoUrl: true,
          animalType: true,
          deathDate: true,
          viewCount: true,
          user: {
            select: {
              name: true,
            },
          },
          _count: {
            select: {
              comments: true,
              tributes: true,
              likes: true,
            },
          },
        },
      });

      return NextResponse.json({
        success: true,
        data: memorials,
      });
    }

    // Most liked
    if (type === 'mostLiked') {
      const memorials = await prisma.animalProfile.findMany({
        where: { isPublic: true },
        orderBy: {
          likes: {
            _count: 'desc',
          },
        },
        take: limit,
        select: {
          id: true,
          name: true,
          photoUrl: true,
          animalType: true,
          deathDate: true,
          viewCount: true,
          user: {
            select: {
              name: true,
            },
          },
          _count: {
            select: {
              likes: true,
              tributes: true,
              comments: true,
            },
          },
        },
      });

      return NextResponse.json({
        success: true,
        data: memorials,
      });
    }

    // Stats summary
    if (type === 'stats') {
      const [
        totalMemorials,
        totalLikes,
        totalComments,
        totalTributes,
        mostViewedMemorial,
      ] = await Promise.all([
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

      return NextResponse.json({
        success: true,
        data: {
          totalMemorials,
          totalLikes,
          totalComments,
          totalTributes,
          mostViewedMemorial,
        },
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
