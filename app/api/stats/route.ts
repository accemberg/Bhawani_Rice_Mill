import { NextResponse } from 'next/server';
import { mockStats } from '@/lib/mockData';

export async function GET() {
  return NextResponse.json(mockStats);
}