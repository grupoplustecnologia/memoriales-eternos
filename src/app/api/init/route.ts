import { initializeDemoUsers } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await initializeDemoUsers();
    return NextResponse.json({
      success: true,
      message: 'Demo users initialized successfully'
    });
  } catch (error) {
    console.error('Error initializing demo users:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
