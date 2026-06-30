import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Full implementation on Day 4
  // Will: verify Firebase Auth token, return all enquiries from Firestore
  return NextResponse.json(
    { message: 'Admin enquiries — full build on Day 4' },
    { status: 501 }
  );
}