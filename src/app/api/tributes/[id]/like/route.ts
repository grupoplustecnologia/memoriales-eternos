import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken } from '@/lib/auth';
import { toggleTributeLike, getTributeLikeCount, hasUserLikedTribute } from '@/lib/tributeLikesService';

/**
 * POST /api/tributes/[id]/like - Toggle like on a tribute
 * GET /api/tributes/[id]/like - Get like info
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const tributeId = id;
    const token = req.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const authResult = await verifySessionToken(token);
    if (!authResult.valid || !authResult.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const result = await toggleTributeLike(authResult.user.id, tributeId);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Tribute like error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const tributeId = id;
    const userId = req.nextUrl.searchParams.get('userId');

    const count = await getTributeLikeCount(tributeId);
    
    let hasLiked = false;
    if (userId) {
      hasLiked = await hasUserLikedTribute(userId, tributeId);
    }

    return NextResponse.json({
      success: true,
      data: {
        count,
        hasLiked,
      },
    });
  } catch (error) {
    console.error('Tribute like GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
