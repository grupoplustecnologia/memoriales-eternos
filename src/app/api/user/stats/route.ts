import { verifySessionToken } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // Get auth token from cookies or headers
    const token = req.cookies.get('auth_token')?.value || req.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized'
      }, { status: 401 });
    }

    // Verify token and get user
    const result = await verifySessionToken(token);
    if (!result.valid || !result.user) {
      return NextResponse.json({
        success: false,
        error: 'Invalid token'
      }, { status: 401 });
    }

    const user = result.user;

    return NextResponse.json({
      success: true,
      data: {
        subscriptionTier: user.subscriptionTier,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('GET /api/user/stats error:', error);
    return NextResponse.json({
      success: false,
      error: 'Error fetching user stats'
    }, { status: 500 });
  }
}

