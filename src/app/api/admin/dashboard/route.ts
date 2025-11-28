import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('auth_token')?.value || req.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      console.log('No token found in request');
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const authResult = await verifySessionToken(token);
    if (!authResult.valid) {
      console.log('Invalid token');
      return NextResponse.json({ success: false, error: 'Invalid token' }, { status: 401 });
    }
    
    // Check if user is admin
    if (authResult.user?.role !== 'admin') {
      console.log('User role:', authResult.user?.role, 'Expected: admin');
      return NextResponse.json({ success: false, error: 'Admin access required' }, { status: 403 });
    }

    // Obtener estadísticas
    const totalUsers = await prisma.user.count();
    const totalProfiles = await prisma.animalProfile.count();
    const totalTributes = await prisma.tribute.count();

    // Usuarios por suscripción
    const usersBySubscription = await prisma.user.groupBy({
      by: ['subscriptionTier'],
      _count: { id: true }
    });

    // Tributos por tipo
    const tributesByType = await prisma.tribute.groupBy({
      by: ['tributeType'],
      _count: { id: true }
    });

    // Últimos usuarios
    const recentUsers = await prisma.user.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: { id: true, email: true, name: true, createdAt: true }
    });

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          totalUsers,
          totalProfiles,
          totalTributes
        },
        usersBySubscription,
        tributesByType,
        recentUsers
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json({ success: false, error: 'Error fetching statistics' }, { status: 500 });
  }
}
