import { verifySessionToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

/**
 * DEBUG endpoint to check user and token status
 * GET /api/debug?token=YOUR_TOKEN
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const tokenParam = searchParams.get('token');
    const userId = searchParams.get('userId');

    // Check token if provided
    if (tokenParam) {
      console.log(`[DEBUG] Verifying token: ${tokenParam.substring(0, 10)}...`);
      const result = await verifySessionToken(tokenParam);
      console.log(`[DEBUG] Token verification result:`, result);

      if (result.valid && result.user) {
        // Get fresh user data
        const user = await prisma.user.findUnique({
          where: { id: result.user.id }
        });
        return NextResponse.json({
          tokenValid: true,
          user: result.user,
          userInDb: user
        });
      } else {
        return NextResponse.json({
          tokenValid: false,
          error: 'Token verification failed'
        }, { status: 401 });
      }
    }

    // Check user if provided
    if (userId) {
      console.log(`[DEBUG] Checking user: ${userId}`);
      const user = await prisma.user.findUnique({
        where: { id: userId }
      });
      return NextResponse.json({
        user
      });
    }

    return NextResponse.json({
      error: 'Provide token or userId parameter'
    }, { status: 400 });
  } catch (error) {
    console.error('[DEBUG] Error:', error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
