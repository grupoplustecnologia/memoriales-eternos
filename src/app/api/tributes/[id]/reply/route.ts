import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken } from '@/lib/auth';
import { createTributeReply, getTributeReplies, deleteTributeReply } from '@/lib/tributeReplyService';

/**
 * POST /api/tributes/[id]/reply - Create a reply to a tribute
 * GET /api/tributes/[id]/reply - Get replies for a tribute
 * DELETE /api/tributes/[id]/reply - Delete a reply
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const tributeId = id;
    const { message } = await req.json();
    const token = req.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const authResult = await verifySessionToken(token);
    if (!authResult.valid || !authResult.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const reply = await createTributeReply(
      tributeId,
      authResult.user.id,
      message
    );

    return NextResponse.json({
      success: true,
      data: reply,
    });
  } catch (error) {
    console.error('Tribute reply error:', error);
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
    const limit = parseInt(req.nextUrl.searchParams.get('limit') || '20');

    const replies = await getTributeReplies(tributeId, limit);

    return NextResponse.json({
      success: true,
      data: replies,
    });
  } catch (error) {
    console.error('Tribute reply GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { replyId } = await req.json();
    const token = req.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (!replyId) {
      return NextResponse.json(
        { error: 'replyId is required' },
        { status: 400 }
      );
    }

    const authResult = await verifySessionToken(token);
    if (!authResult.valid || !authResult.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const result = await deleteTributeReply(replyId, authResult.user.id);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error('Tribute reply DELETE error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: error.message?.includes('Not authorized') ? 403 : 500 }
    );
  }
}
