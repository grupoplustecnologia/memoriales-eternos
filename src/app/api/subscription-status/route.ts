import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth';
import { getPlanLimits } from '@/lib/stripe';

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    const decoded = await verifyAuth(token);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Token inválido' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true,
        planType: true,
        subscriptionStatus: true,
        subscriptionEndDate: true,
        stripeCustomerId: true,
        _count: {
          select: {
            profiles: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    const limits = getPlanLimits(user.planType);

    return NextResponse.json({
      success: true,
      data: {
        user,
        plan: {
          type: user.planType,
          status: user.subscriptionStatus,
          endDate: user.subscriptionEndDate,
          limits,
        },
        memorialsCount: user._count.profiles,
        canAddMoreMemorials: user._count.profiles < limits.memorialLimit,
      },
    });
  } catch (error) {
    console.error('Error en GET /api/subscription-status:', error);
    return NextResponse.json(
      { error: 'Error al obtener estado de suscripción' },
      { status: 500 }
    );
  }
}
