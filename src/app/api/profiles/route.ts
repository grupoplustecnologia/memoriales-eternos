import { createProfile, updateProfile, deleteProfile } from '@/lib/profilesService';
import { verifySessionToken } from '@/lib/auth';
import { PlanPermissionsService } from '@/lib/planPermissions';
import { NextRequest, NextResponse } from 'next/server';
import { getCached, setCached, cacheKeys, getPaginationParams, calculatePagination } from '@/lib/cache';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    // Check if we should only return public profiles (for /map page)
    const url = new URL(req.url);
    const publicOnly = url.searchParams.get('public') === 'true';
    const pageParam = url.searchParams.get('page');
    const limitParam = url.searchParams.get('limit');

    // Default pagination if not specified
    const page = pageParam ? parseInt(pageParam) : 1;
    const limit = limitParam ? parseInt(limitParam) : 50;

    // Validate pagination parameters
    if (isNaN(page) || page < 1) {
      return NextResponse.json({
        success: false,
        error: 'Invalid page number'
      }, { status: 400 });
    }

    if (isNaN(limit) || limit < 1 || limit > 100) {
      return NextResponse.json({
        success: false,
        error: 'Invalid limit'
      }, { status: 400 });
    }

    const cacheKey = publicOnly ? `${cacheKeys.profiles(page, limit)}:public` : cacheKeys.profiles(page, limit);

    // Try cache first
    let cached = await getCached(cacheKey);
    if (cached) {
      return NextResponse.json({
        success: true,
        cached: true,
        ...cached,
      });
    }

    // Fetch paginated results - simplified query
    const [data, total] = await Promise.all([
      prisma.animalProfile.findMany({
        where: publicOnly ? { isPublic: true } : {},
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          name: true,
          photoUrl: true,
          animalType: true,
          breed: true,
          deathDate: true,
          birthDate: true,
          epitaph: true,
          latitude: true,
          longitude: true,
          viewCount: true,
          user: {
            select: { name: true, subscriptionTier: true },
          },
          _count: {
            select: {
              tributes: true,
              likes: true,
              comments: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.animalProfile.count({
        where: publicOnly ? { isPublic: true } : {},
      }),
    ]);

    const result = {
      success: true,
      data: data.map((item: any) => ({
        ...item,
        deathDate: item.deathDate instanceof Date ? item.deathDate.toISOString() : item.deathDate,
        birthDate: item.birthDate instanceof Date ? item.birthDate.toISOString() : item.birthDate,
        latitude: Number(item.latitude) || 0,
        longitude: Number(item.longitude) || 0,
        userSubscriptionTier: item.user?.subscriptionTier || 'free',
        userName: item.user?.name || 'Anónimo',
      })),
      pagination: calculatePagination(page, limit, total),
    };

    // Cache for 5 minutes
    await setCached(cacheKey, result, 300);

    return NextResponse.json(result);
  } catch (error) {
    console.error('GET /api/profiles error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Error fetching profiles'
    }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
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

    // Type guard - ensure user exists
    const user = authResult.user;

    const userPlan = user.subscriptionTier as any || 'huella-eterna';
    
    // Get user memorial count
    const userMemorialCount = await prisma.animalProfile.count({
      where: { userId: user.id }
    });
    
    if (!PlanPermissionsService.canCreateMemorial(userPlan, userMemorialCount)) {
      const permissions = PlanPermissionsService.getPermissions(userPlan);
      return NextResponse.json({
        success: false,
        error: `You have reached the limit of ${permissions.maxMemorials} memorials for your plan. Upgrade your plan to create more.`
      }, { status: 403 });
    }

    // Handle FormData
    const formData = await req.formData();
    
    // Convert FormData to object
    const birthDateStr = formData.get('birthDate') as string;
    const deathDateStr = formData.get('deathDate') as string;
    
    // Get photoUrl from client (already base64 encoded)
    let photoUrl = formData.get('photoUrl') as string;
    if (!photoUrl) {
      photoUrl = `https://via.placeholder.com/400x300?text=${encodeURIComponent(formData.get('name') as string)}`;
    }
    
    const data: any = {
      name: formData.get('name'),
      animalType: formData.get('animalType'),
      breed: formData.get('breed') || undefined,
      birthDate: birthDateStr ? new Date(birthDateStr) : new Date(),
      deathDate: deathDateStr ? new Date(deathDateStr) : new Date(),
      latitude: parseFloat(formData.get('latitude') as string),
      longitude: parseFloat(formData.get('longitude') as string),
      story: formData.get('story'),
      epitaph: formData.get('epitaph'),
      photoUrl: photoUrl
    };

    const result = await createProfile(user.id, data, userPlan);
    
    if (result.success && result.data) {
      return NextResponse.json({
        success: true,
        id: result.data.id,
        data: result.data
      });
    }
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('POST /api/profiles error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Error creating profile'
    }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
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

    // Get the ID from query parameters
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({
        success: false,
        error: 'ID required'
      }, { status: 400 });
    }

    // Handle FormData
    const formData = await req.formData();
    
    // Convert FormData to object
    const birthDateStr = formData.get('birthDate') as string;
    const deathDateStr = formData.get('deathDate') as string;
    
    const data: any = {
      id: id,
      name: formData.get('name'),
      animalType: formData.get('animalType'),
      breed: formData.get('breed') || undefined,
      birthDate: birthDateStr ? new Date(birthDateStr) : undefined,
      deathDate: deathDateStr ? new Date(deathDateStr) : undefined,
      latitude: formData.get('latitude') ? parseFloat(formData.get('latitude') as string) : undefined,
      longitude: formData.get('longitude') ? parseFloat(formData.get('longitude') as string) : undefined,
      story: formData.get('story'),
      epitaph: formData.get('epitaph'),
    };

    // Only update photoUrl if a new photo was provided
    const photoUrl = formData.get('photoUrl') as string;
    if (photoUrl) {
      data.photoUrl = photoUrl;
    }

    console.log('Actualizando memorial:', {
      id: id,
      name: formData.get('name'),
      userId: authResult.user.id
    });

    const result = await updateProfile(id, data);
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        id: result.data?.id,
        data: result.data
      });
    }
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('PUT /api/profiles error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Error updating profile'
    }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({
        success: false,
        error: 'ID required'
      }, { status: 400 });
    }
    
    const result = await deleteProfile(id);
    return NextResponse.json(result);
  } catch (error) {
    console.error('DELETE /api/profiles error:', error);
    return NextResponse.json({
      success: false,
      error: 'Error deleting profile'
    }, { status: 500 });
  }
}
