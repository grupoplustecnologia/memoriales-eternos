import { NextRequest, NextResponse } from 'next/server';
import {
  registerUser,
  loginUser,
  logoutSession,
  logoutAllDevices,
  updateUserProfile,
  getUserById
} from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    if (!email || !password || !name) {
      return NextResponse.json(
        { success: false, message: 'Email, contraseña y nombre son requeridos' },
        { status: 400 }
      );
    }

    const result = await registerUser(email, password, name);

    if (result.success) {
      // Devolver en formato consistente
      return NextResponse.json({
        success: true,
        message: result.message,
        user: result.user,
        session: result.session
      }, {
        status: 201
      });
    }

    return NextResponse.json(result, {
      status: 400
    });
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      { success: false, message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
