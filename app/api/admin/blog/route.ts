import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json(
    { message: 'Admin blog GET — full build on Day 5' },
    { status: 501 }
  );
}

export async function POST(request: NextRequest) {
  return NextResponse.json(
    { message: 'Admin blog POST — full build on Day 5' },
    { status: 501 }
  );
}

export async function PUT(request: NextRequest) {
  return NextResponse.json(
    { message: 'Admin blog PUT — full build on Day 5' },
    { status: 501 }
  );
}

export async function DELETE(request: NextRequest) {
  return NextResponse.json(
    { message: 'Admin blog DELETE — full build on Day 5' },
    { status: 501 }
  );
}