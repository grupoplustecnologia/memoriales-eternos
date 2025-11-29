import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe-server';
import { PLANS } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import { verifySessionToken } from '@/lib/auth';

// Stripe checkout session endpoint
export async function POST(request: NextRequest) {
  try {
    const stripe = await getStripe();
    
    // Obtener el token del usuario
    const token = request.headers.get('authorization')?.replace('Bearer ', '') || request.cookies.get('auth_token')?.value;
    if (!token) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    const authResult = await verifySessionToken(token);
    if (!authResult.valid || !authResult.user) {
      return NextResponse.json(
        { error: 'Token inválido' },
        { status: 401 }
      );
    }

    const user = authResult.user;

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
    let dbUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!dbUser) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    let stripeCustomerId = dbUser.stripeCustomerId;

    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: dbUser.email,
        name: dbUser.name,
        metadata: {
          userId: dbUser.id,
        },
      });
      stripeCustomerId = customer.id;

      // Actualizar el usuario con el ID de cliente de Stripe
      await prisma.user.update({
        where: { id: dbUser.id },
        data: { stripeCustomerId },
      });
    }

    // Si es el plan gratuito, no crear sesión de pago
    if (plan.id === 'huella-eterna') {
      // Actualizar el plan del usuario
      await prisma.user.update({
        where: { id: dbUser.id },
        data: {
          subscriptionTier: 'huella-eterna',
          subscriptionStatus: 'active',
          subscriptionEndDate: null,
        },
      });

      return NextResponse.json({
        success: true,
        message: 'Plan actualizado exitosamente',
        planType: 'huella-eterna',
      });
    }

    // Crear sesión de checkout de Stripe
    // Obtener el host del request y determinar la URL correcta
    let origin = request.nextUrl.origin;
    
    // Si viene de netlify preview, redirigir al dominio custom
    if (origin.includes('netlify.app')) {
      origin = 'https://foreverpetfriend.com';
    }
    
    // Para desarrollo local
    origin = origin.replace('0.0.0.0', 'localhost');
    
    const successUrl = `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}&plan=${planId}`;
    const cancelUrl = `${origin}/pricing`;

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
        userId: dbUser.id,
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
