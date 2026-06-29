import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // Full implementation on Day 2
  // Will: validate fields, save to Firestore, send Resend emails
  return NextResponse.json(
    { message: 'Enquiry endpoint — full build on Day 2' },
    { status: 501 }
  );
}