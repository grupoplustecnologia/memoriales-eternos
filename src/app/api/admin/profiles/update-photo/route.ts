import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifySessionToken } from '@/lib/auth';

export async function PUT(request: NextRequest) {
  try {
    // Verify admin access
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'No token provided' },
        { status: 401 }
      );
    }

    const verification = await verifySessionToken(token);
    if (!verification.valid || verification.user?.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 403 }
      );
    }

    const { profileId, photoUrl } = await request.json();

    if (!profileId || !photoUrl) {
      return NextResponse.json(
        { success: false, error: 'Missing profileId or photoUrl' },
        { status: 400 }
      );
    }

    // Validate URL - permite URLs relativas (locales) y absolutas
    try {
      // Si empieza con / es URL relativa (local), si no es absoluta
      if (!photoUrl.startsWith('/')) {
        new URL(photoUrl);
      }
    } catch {
      console.error('Invalid URL:', photoUrl);
      return NextResponse.json(
        { success: false, error: 'Invalid URL' },
        { status: 400 }
      );
    }

    // Update profile photo
    const updatedProfile = await prisma.animalProfile.update({
      where: { id: profileId },
      data: { photoUrl },
      include: {
        user: { select: { id: true, name: true, email: true } }
      }
    });

    return NextResponse.json({
      success: true,
      data: updatedProfile,
      message: 'Photo updated successfully'
    });

  } catch (error) {
    console.error('Error updating profile photo:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
