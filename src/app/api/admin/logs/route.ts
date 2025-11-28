import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('auth_token')?.value || req.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const authResult = await verifySessionToken(token);
    if (!authResult.valid || authResult.user?.role !== 'ADMIN') {
      return NextResponse.json({ success: false, error: 'Admin access required' }, { status: 403 });
    }

    const logs = await prisma.adminLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100
    });

    return NextResponse.json({ success: true, data: logs });
  } catch (error) {
    console.error('Error fetching logs:', error);
    return NextResponse.json({ success: false, error: 'Error fetching logs' }, { status: 500 });
  }
}
