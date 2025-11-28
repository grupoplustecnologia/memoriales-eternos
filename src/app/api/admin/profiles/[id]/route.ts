import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifySessionToken } from '@/lib/auth';

export async function PUT(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'No authorization token' },
        { status: 401 }
      );
    }

    const authResult = await verifySessionToken(token);
    if (!authResult.valid || !authResult.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Only admin can update profiles
    if (authResult.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Only admin can update profiles' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const {
      id,
      name,
      animalType,
      breed,
      birthDate,
      deathDate,
      story,
      epitaph,
      photoUrl
    } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Profile ID is required' },
        { status: 400 }
      );
    }

    // Verify the profile exists
    const profile = await prisma.animalProfile.findUnique({
      where: { id }
    });

    if (!profile) {
      return NextResponse.json(
        { success: false, error: 'Profile not found' },
        { status: 404 }
      );
    }

    // Update the profile
    const updatedProfile = await prisma.animalProfile.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(animalType && { animalType }),
        ...(breed && { breed }),
        ...(birthDate && { birthDate: new Date(birthDate).toISOString() }),
        ...(deathDate && { deathDate: new Date(deathDate).toISOString() }),
        ...(story && { story }),
        ...(epitaph && { epitaph }),
        ...(photoUrl && { photoUrl })
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        _count: {
          select: {
            tributes: true
          }
        }
      }
    });

    return NextResponse.json({
      success: true,
      data: updatedProfile
    });

  } catch (error) {
    console.error('[ADMIN] Error updating profile:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
