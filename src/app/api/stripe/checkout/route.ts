import { verifySessionToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export interface StarPackage {
  id: string;
  stars: number;
  price: number;
  priceUSD: number;
}

const STAR_PACKAGES: StarPackage[] = [
  { id: 'stars-10', stars: 10, price: 99, priceUSD: 0.99 },
  { id: 'stars-50', stars: 50, price: 399, priceUSD: 3.99 },
  { id: 'stars-100', stars: 100, price: 799, priceUSD: 7.99 },
  { id: 'stars-250', stars: 250, price: 1599, priceUSD: 15.99 }
];

export async function POST(req: NextRequest) {
  try {
    // Get auth token
    const token = req.cookies.get('auth_token')?.value || req.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized'
      }, { status: 401 });
    }

    // Verify token
    const result = await verifySessionToken(token);
    if (!result.valid || !result.user) {
      return NextResponse.json({
        success: false,
        error: 'Invalid token'
      }, { status: 401 });
    }

    const { packageId } = await req.json();

    // Find package
    const selectedPackage = STAR_PACKAGES.find(p => p.id === packageId);
    if (!selectedPackage) {
      return NextResponse.json({
        success: false,
        error: 'Package not found'
      }, { status: 400 });
    }

    // Simulate payment processing (in production, use real Stripe)
    // Mock stripe response
    const stripeCheckoutUrl = `https://checkout.stripe.com/pay/cs_test_${packageId}_${Date.now()}`;
    
    // Note: starPurchase table has been deprecated
    // This endpoint is kept for backward compatibility but doesn't record purchases

    return NextResponse.json({
      success: true,
      data: {
        checkoutUrl: stripeCheckoutUrl,
        package: selectedPackage,
        sessionId: `session_${Date.now()}`,
        redirectUrl: `/payment-success?session=${Date.now()}`
      },
      message: 'Demo: In production, this would redirect to Stripe. Stars would be added after payment.'
    });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json({
      success: false,
      error: 'Error creating checkout session'
    }, { status: 500 });
  }
}

// Return available packages
export async function GET(req: NextRequest) {
  try {
    return NextResponse.json({
      success: true,
      data: STAR_PACKAGES
    });
  } catch (error) {
    console.error('Get packages error:', error);
    return NextResponse.json({
      success: false,
      error: 'Error fetching packages'
    }, { status: 500 });
  }
}
