import { NextResponse } from 'next/server';
import { mockTestimonials } from '@/lib/mockData';

export async function GET() {
  return NextResponse.json(mockTestimonials);
}