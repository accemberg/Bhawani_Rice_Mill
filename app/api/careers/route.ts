import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // Full implementation on Day 3
  // Will: handle multipart form, upload resume to Firebase Storage, send emails
  return NextResponse.json(
    { message: 'Careers endpoint — full build on Day 3' },
    { status: 501 }
  );
}