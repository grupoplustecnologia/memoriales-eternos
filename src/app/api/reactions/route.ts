import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken } from '@/lib/auth';
import {
  toggleReaction,
  getReactionCounts,
  getUserReactionsOnProfile,
  REACTION_EMOJIS,
} from '@/lib/reactionsService';

/**
 * POST /api/reactions - Toggle reaction on memorial
 * GET /api/reactions?profileId=xxx - Get reaction counts
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

    const { profileId, emoji } = await req.json();

    if (!profileId || !emoji) {
      return NextResponse.json(
        { error: 'profileId and emoji are required' },
        { status: 400 }
      );
    }

    if (!REACTION_EMOJIS.includes(emoji)) {
      return NextResponse.json(
        { error: 'Invalid emoji' },
        { status: 400 }
      );
    }

    const result = await toggleReaction(authResult.user.id, profileId, emoji);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Reaction error:', error);
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

    const counts = await getReactionCounts(profileId);

    let userReactions: string[] = [];
    if (userId) {
      userReactions = await getUserReactionsOnProfile(userId, profileId);
    }

    return NextResponse.json({
      success: true,
      data: {
        counts,
        userReactions,
        availableEmojis: REACTION_EMOJIS,
      },
    });
  } catch (error) {
    console.error('Reactions GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
