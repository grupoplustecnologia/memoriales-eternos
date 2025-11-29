import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe-server';
import { PLANS } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';

// Verify checkout session and activate plan
export async function POST(request: NextRequest) {
  try {
    const stripe = await getStripe();
    const { sessionId, planId } = await request.json();

    if (!sessionId || !planId) {
      return NextResponse.json(
        { success: false, message: 'Parámetros inválidos' },
        { status: 400 }
      );
    }

    // Validar que el plan existe
    const plan = Object.values(PLANS).find((p) => p.id === planId);
    if (!plan) {
      return NextResponse.json(
        { success: false, message: 'Plan no válido' },
        { status: 400 }
      );
    }

    // Obtener la sesión de Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Verificar que el pago fue exitoso
    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        { success: false, message: 'El pago no fue completado' },
        { status: 400 }
      );
    }

    // Obtener el ID de usuario de los metadatos
    const userId = session.metadata?.userId;

    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'Usuario no encontrado' },
        { status: 400 }
      );
    }

    // Actualizar el plan del usuario
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        subscriptionTier: planId,
        subscriptionStatus: 'active',
        subscriptionEndDate: null,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Plan activado exitosamente',
      user,
    });
  } catch (error) {
    console.error('[VERIFY CHECKOUT] Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error al verificar el pago',
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
