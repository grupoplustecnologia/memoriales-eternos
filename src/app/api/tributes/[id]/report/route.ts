import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken } from '@/lib/auth';
import { createTributeReport, getTributeReports, getAllTributeReports } from '@/lib/tributeReportService';

/**
 * POST /api/tributes/[id]/report - Report a tribute
 * GET /api/tributes/[id]/report - Get reports for a tribute (admin only)
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const tributeId = id;
    const { reason, description } = await req.json();
    const token = req.headers.get('authorization')?.replace('Bearer ', '');

    if (!reason) {
      return NextResponse.json(
        { error: 'Reason is required' },
        { status: 400 }
      );
    }

    // Get user ID if authenticated
    let reportedByUserId: string | undefined;
    if (token) {
      const authResult = await verifySessionToken(token);
      if (authResult.valid && authResult.user) {
        reportedByUserId = authResult.user.id;
      }
    }

    const report = await createTributeReport({
      tributeId,
      reportedByUserId,
      reason,
      description,
    });

    return NextResponse.json({
      success: true,
      data: report,
    });
  } catch (error) {
    console.error('Tribute report error:', error);
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
    const token = req.headers.get('authorization')?.replace('Bearer ', '');

    // Check if admin
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const authResult = await verifySessionToken(token);
    if (!authResult.valid || !authResult.user || authResult.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized - Admin only' },
        { status: 401 }
      );
    }

    const reports = await getTributeReports(tributeId);

    return NextResponse.json({
      success: true,
      data: reports,
    });
  } catch (error) {
    console.error('Tribute report GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
