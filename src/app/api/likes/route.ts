import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken } from '@/lib/auth';
import { toggleLike, getLikeCount, hasUserLiked } from '@/lib/likesService';

/**
 * POST /api/likes - Toggle like on a memorial
 * GET /api/likes?profileId=xxx - Get like info
 */
export async function POST(req: NextRequest) {
  try {
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

    const { profileId } = await req.json();

    if (!profileId) {
      return NextResponse.json(
        { error: 'profileId is required' },
        { status: 400 }
      );
    }

    const result = await toggleLike(authResult.user.id, profileId);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Like error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const profileId = req.nextUrl.searchParams.get('profileId');
    const userId = req.nextUrl.searchParams.get('userId');

    if (!profileId) {
      return NextResponse.json(
        { error: 'profileId is required' },
        { status: 400 }
      );
    }

    const count = await getLikeCount(profileId);
    
    let hasLiked = false;
    if (userId) {
      hasLiked = await hasUserLiked(userId, profileId);
    }

    return NextResponse.json({
      success: true,
      data: {
        count,
        hasLiked,
      },
    });
  } catch (error) {
    console.error('Like GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
