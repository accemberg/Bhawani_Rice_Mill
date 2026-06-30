import { NextResponse } from 'next/server';
import { mockCertifications } from '@/lib/mockData';

export async function GET() {
  return NextResponse.json(mockCertifications);
}