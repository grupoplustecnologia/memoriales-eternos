import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe-server';
import { PLANS } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  try {
    const stripe = await getStripe();
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'No signature provided' },
        { status: 400 }
      );
    }

    // Verificar que el evento viene de Stripe
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    // Manejar evento de pago completado
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      // Obtener el userId y planId de los metadatos
      const userId = session.metadata?.userId;
      const planId = session.metadata?.planId;

      if (!userId || !planId) {
        return NextResponse.json(
          { error: 'Invalid metadata' },
          { status: 400 }
        );
      }

      // Obtener el plan
      const plan = Object.values(PLANS).find((p) => p.id === planId);
      if (!plan) {
        return NextResponse.json(
          { error: 'Invalid plan' },
          { status: 400 }
        );
      }

      // Actualizar el usuario con el nuevo plan
      const endDate = new Date();
      endDate.setFullYear(endDate.getFullYear() + 1); // Suscripción de 1 año

      await prisma.user.update({
        where: { id: userId },
        data: {
          subscriptionTier: plan.id,
          subscriptionStatus: 'active',
          subscriptionId: session.id,
          subscriptionEndDate: endDate,
        },
      });

      console.log(`✓ Usuario ${userId} actualizado a plan ${plan.id}`);
    }

    // Manejar evento de pago fallido
    if (event.type === 'charge.failed') {
      const charge = event.data.object as Stripe.Charge;
      console.error(`✗ Pago fallido: ${charge.id}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error en webhook de Stripe:', error);
    return NextResponse.json(
      { error: 'Error processing webhook' },
      { status: 500 }
    );
  }
}
