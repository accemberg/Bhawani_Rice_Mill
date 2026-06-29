import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json(
    { message: 'Admin gallery GET — full build on Day 4' },
    { status: 501 }
  );
}

export async function DELETE(request: NextRequest) {
  return NextResponse.json(
    { message: 'Admin gallery DELETE — full build on Day 4' },
    { status: 501 }
  );
}