import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken } from '@/lib/auth';
import {
  createComment,
  getCommentsForProfile,
  deleteComment,
  getCommentCount,
} from '@/lib/commentsService';

/**
 * POST /api/comments - Create comment
 * GET /api/comments?profileId=xxx - Get comments
 */
export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '');
    const { profileId, message, visitorName } = await req.json();

    if (!profileId || !message || !visitorName) {
      return NextResponse.json(
        { error: 'profileId, message, and visitorName are required' },
        { status: 400 }
      );
    }

    let userId: string | undefined;
    if (token) {
      const authResult = await verifySessionToken(token);
      if (authResult.valid && authResult.user) {
        userId = authResult.user.id;
      }
    }

    const comment = await createComment(
      profileId,
      visitorName,
      message,
      userId
    );

    return NextResponse.json({
      success: true,
      data: comment,
    });
  } catch (error) {
    console.error('Comment creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const profileId = req.nextUrl.searchParams.get('profileId');

    if (!profileId) {
      return NextResponse.json(
        { error: 'profileId is required' },
        { status: 400 }
      );
    }

    const comments = await getCommentsForProfile(profileId);
    const count = await getCommentCount(profileId);

    return NextResponse.json({
      success: true,
      data: {
        comments,
        count,
      },
    });
  } catch (error) {
    console.error('Comments GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/comments?id=xxx - Delete comment
 */
export async function DELETE(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '');
    const commentId = req.nextUrl.searchParams.get('id');

    if (!commentId) {
      return NextResponse.json(
        { error: 'id is required' },
        { status: 400 }
      );
    }

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

    await deleteComment(commentId, authResult.user.id);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error('Comment delete error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
