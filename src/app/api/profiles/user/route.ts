import { getProfilesByUser } from '@/lib/profilesService';
import { verifySessionToken } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // Get auth token from cookies or headers
    const token = req.cookies.get('auth_token')?.value || req.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized - no auth token'
      }, { status: 401 });
    }

    // Verify token and get user
    const authResult = await verifySessionToken(token);
    if (!authResult.valid || !authResult.user) {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized - invalid token'
      }, { status: 401 });
    }

    // Get user's profiles
    const result = await getProfilesByUser(authResult.user.id);
    return NextResponse.json(result);
  } catch (error) {
    console.error('GET /api/profiles/user error:', error);
    return NextResponse.json({
      success: false,
      error: 'Error fetching user profiles'
    }, { status: 500 });
  }
}
