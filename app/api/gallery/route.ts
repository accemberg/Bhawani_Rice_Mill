import { NextRequest, NextResponse } from 'next/server';
import { mockGallery } from '@/lib/mockData';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  let gallery = mockGallery;

  if (category && category !== 'all') {
    gallery = mockGallery.filter(item => item.category === category);
  }

  return NextResponse.json(gallery);
}