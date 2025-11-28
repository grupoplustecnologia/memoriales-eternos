import { NextRequest, NextResponse } from 'next/server';
import { stripe, PLANS } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth';

// Stripe checkout session endpoint
export async function POST(request: NextRequest) {
  try {
    // Obtener el token del usuario
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

    // Obtener el plan del request
    const { planId } = await request.json();

    // Validar que el plan existe
    const plan = Object.values(PLANS).find((p) => p.id === planId);
    if (!plan) {
      return NextResponse.json(
        { error: 'Plan no válido' },
        { status: 400 }
      );
    }

    // Obtener o crear el cliente de Stripe
    let user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    let stripeCustomerId = user.stripeCustomerId;

    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name,
        metadata: {
          userId: user.id,
        },
      });
      stripeCustomerId = customer.id;

      // Actualizar el usuario con el ID de cliente de Stripe
      await prisma.user.update({
        where: { id: user.id },
        data: { stripeCustomerId },
      });
    }

    // Si es el plan gratuito, no crear sesión de pago
    if (plan.id === 'huella-eterna') {
      // Actualizar el plan del usuario
      await prisma.user.update({
        where: { id: user.id },
        data: {
          planType: 'free',
          subscriptionStatus: 'active',
          subscriptionEndDate: null,
        },
      });

      return NextResponse.json({
        success: true,
        message: 'Plan actualizado exitosamente',
        planType: 'free',
      });
    }

    // Crear sesión de checkout de Stripe
    const successUrl = `${request.nextUrl.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}&plan=${planId}`;
    const cancelUrl = `${request.nextUrl.origin}/pricing`;

    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: plan.name,
              description: plan.description,
              images: [],
            },
            unit_amount: plan.price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        userId: user.id,
        planId: plan.id,
      },
    });

    return NextResponse.json({
      success: true,
      sessionUrl: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    console.error('Error en POST /api/checkout:', error);
    return NextResponse.json(
      { error: 'Error al crear sesión de pago' },
      { status: 500 }
    );
  }
}
