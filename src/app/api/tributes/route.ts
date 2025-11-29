import { getTributes, createTribute, deleteTribute, getTributeStats } from '@/lib/tributesService';
import { verifySessionToken } from '@/lib/auth';
import { PlanPermissionsService } from '@/lib/planPermissions';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const profileId = searchParams.get('profileId');
    const action = searchParams.get('action');
    
    if (action === 'stats' && profileId) {
      const result = await getTributeStats(profileId);
      return NextResponse.json(result);
    }
    
    if (!profileId) {
      return NextResponse.json({
        success: false,
        error: 'profileId required'
      }, { status: 400 });
    }
    
    const result = await getTributes(profileId);
    return NextResponse.json(result);
  } catch (error) {
    console.error('GET /api/tributes error:', error);
    return NextResponse.json({
      success: false,
      error: 'Error fetching tributes'
    }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    // Get auth token
    const token = req.cookies.get('auth_token')?.value || req.headers.get('authorization')?.replace('Bearer ', '');
    
    const data = await req.json();
    const { profileId, visitorName, tributeType, message } = data;

    if (!profileId) {
      return NextResponse.json({
        success: false,
        error: 'profileId is required'
      }, { status: 400 });
    }

    if (!visitorName || !tributeType) {
      return NextResponse.json({
        success: false,
        error: 'visitorName and tributeType are required'
      }, { status: 400 });
    }

    // Get visitor ID from token if available (optional)
    let visitorId: string | undefined;
    let visitorPlan = 'huella-eterna'; // plan gratuito por defecto
    
    if (token) {
      const result = await verifySessionToken(token);
      if (result.valid && result.user) {
        visitorId = result.user.id;
        visitorPlan = result.user.subscriptionTier as string || 'huella-eterna';
        console.log(`[TRIBUTES] User authenticated: ${result.user.name} (${visitorId}) - Plan: ${visitorPlan}`);
      } else {
        console.log('[TRIBUTES] Token verification failed');
      }
    } else {
      console.log('[TRIBUTES] No token provided - using guest tribute');
    }

    // Validar que el tipo de tributo es permitido para el plan del visitante
    const allowedTypes = PlanPermissionsService.getAllowedTributeTypes(visitorPlan as any);
    if (!allowedTypes.includes(tributeType)) {
      return NextResponse.json({
        success: false,
        error: `Tribute type '${tributeType}' not allowed for your plan. Allowed types: ${allowedTypes.join(', ')}`
      }, { status: 403 });
    }

    // ============ NUEVA VALIDACIÓN: Verificar límite de tributos del DUEÑO del memorial ============
    // Obtener el memorial y su dueño
    const memorial = await prisma.animalProfile.findUnique({
      where: { id: profileId },
      include: {
        user: true,
        tributes: true
      }
    });

    if (!memorial) {
      return NextResponse.json({
        success: false,
        error: 'Memorial not found'
      }, { status: 404 });
    }

    // Verificar el plan del DUEÑO del memorial
    const memorialOwnerPlan = memorial.user.subscriptionTier || 'huella-eterna';
    const currentTributeCount = memorial.tributes.length;
    const canReceiveMoreTributes = PlanPermissionsService.canReceiveMoreTributes(
      memorialOwnerPlan as any,
      currentTributeCount
    );

    if (!canReceiveMoreTributes) {
      const maxTributes = PlanPermissionsService.getMaxTributes(memorialOwnerPlan as any);
      return NextResponse.json({
        success: false,
        error: `This memorial has reached its tribute limit of ${maxTributes}. The owner would need to upgrade their plan to receive more tributes.`,
        tributeLimitReached: true,
        currentCount: currentTributeCount,
        maxTributes: maxTributes
      }, { status: 403 });
    }

    // Create tribute with star deduction
    const result = await createTribute(profileId, visitorId, {
      visitorName,
      tributeType: tributeType as 'flower' | 'candle' | 'message',
      message
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('POST /api/tributes error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Error creating tribute'
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
    
    const result = await deleteTribute(id);
    return NextResponse.json(result);
  } catch (error) {
    console.error('DELETE /api/tributes error:', error);
    return NextResponse.json({
      success: false,
      error: 'Error deleting tribute'
    }, { status: 500 });
  }
}
