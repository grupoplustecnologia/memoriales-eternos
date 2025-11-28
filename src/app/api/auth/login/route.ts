import { NextRequest, NextResponse } from 'next/server';
import { loginUser } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, deviceName = 'Web' } = body;

    console.log(`🔑 Login attempt: ${email}`);

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email y contraseña son requeridos' },
        { status: 400 }
      );
    }

    const result = await loginUser(email, password, deviceName);
    
    console.log(`🔑 Login result:`, result);

    if (result.success) {
      // Devolver en formato consistente
      return NextResponse.json({
        success: true,
        message: result.message,
        user: result.user,
        session: result.session
      }, {
        status: 200
      });
    }

    return NextResponse.json(result, {
      status: 401
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
