'use server';

import Stripe from 'stripe';

// Only initialize Stripe on the server side
let stripeInstance: Stripe | null = null;

export async function getStripe() {
  if (!stripeInstance) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY is not set');
    }
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-11-17.clover' as any,
    });
  }
  return stripeInstance;
}
