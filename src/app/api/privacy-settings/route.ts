import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(
      { error: 'Temporalmente desactivado' },
      { status: 503 }
    );
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    return NextResponse.json(
      { error: 'Temporalmente desactivado' },
      { status: 503 }
    );
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error' },
      { status: 500 }
    );
  }
}
