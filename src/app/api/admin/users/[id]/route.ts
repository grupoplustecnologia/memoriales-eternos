import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const token = req.cookies.get('auth_token')?.value || req.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const authResult = await verifySessionToken(token);
    if (!authResult.valid || authResult.user?.role !== 'ADMIN') {
      return NextResponse.json({ success: false, error: 'Admin access required' }, { status: 403 });
    }

    // Get user to verify they exist
    const user = await prisma.user.findUnique({
      where: { id },
      select: { 
        id: true, 
        email: true, 
        name: true,
        _count: { select: { profiles: true } }
      }
    });

    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    // Delete user (cascade will delete profiles automatically)
    await prisma.user.delete({
      where: { id }
    });

    return NextResponse.json({ 
      success: true, 
      message: `User ${user.email} and ${user._count.profiles} memorials deleted successfully`,
      data: user
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ success: false, error: 'Error deleting user' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const token = req.cookies.get('auth_token')?.value || req.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const authResult = await verifySessionToken(token);
    if (!authResult.valid || authResult.user?.role !== 'ADMIN') {
      return NextResponse.json({ success: false, error: 'Admin access required' }, { status: 403 });
    }

    const body = await req.json();
    const { subscriptionTier } = body;

    // Validate subscription tier
    const validTiers = ['huella-eterna', 'cielo-estrellas', 'santuario-premium'];
    if (!subscriptionTier || !validTiers.includes(subscriptionTier)) {
      return NextResponse.json({ 
        success: false, 
        error: `Invalid subscription tier. Must be one of: ${validTiers.join(', ')}` 
      }, { status: 400 });
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        subscriptionTier,
        subscriptionStatus: 'active'
      },
      select: {
        id: true,
        email: true,
        name: true,
        subscriptionTier: true,
        subscriptionStatus: true,
        _count: { select: { profiles: true } }
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: `User ${updatedUser.email} plan updated to ${subscriptionTier}`,
      data: updatedUser
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes('not found')) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }
    console.error('Error updating user:', error);
    return NextResponse.json({ success: false, error: 'Error updating user' }, { status: 500 });
  }
}
