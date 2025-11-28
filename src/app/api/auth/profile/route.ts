import { NextRequest, NextResponse } from 'next/server';
import { updateUserProfile, getUserById } from '@/lib/auth';

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, updates } = body;

    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'Usuario ID requerido' },
        { status: 400 }
      );
    }

    const result = await updateUserProfile(userId, updates);

    return NextResponse.json(result, {
      status: result.success ? 200 : 400
    });
  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json(
      { success: false, message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
