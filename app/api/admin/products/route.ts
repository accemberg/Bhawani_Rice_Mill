import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Full implementation on Day 4
  // Will: verify Firebase Auth token, return all products from Firestore
  return NextResponse.json(
    { message: 'Admin products — full build on Day 4' },
    { status: 501 }
  );
}

export async function POST(request: NextRequest) {
  // Full implementation on Day 4
  return NextResponse.json(
    { message: 'Admin products POST — full build on Day 4' },
    { status: 501 }
  );
}

export async function PUT(request: NextRequest) {
  // Full implementation on Day 4
  return NextResponse.json(
    { message: 'Admin products PUT — full build on Day 4' },
    { status: 501 }
  );
}

export async function DELETE(request: NextRequest) {
  // Full implementation on Day 4
  return NextResponse.json(
    { message: 'Admin products DELETE — full build on Day 4' },
    { status: 501 }
  );
}