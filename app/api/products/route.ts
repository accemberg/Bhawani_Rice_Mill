import { NextRequest, NextResponse } from 'next/server';
import { mockProducts } from '@/lib/mockData';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  let products = mockProducts;

  if (category && category !== 'all') {
    products = mockProducts.filter(p => p.category === category);
  }

  return NextResponse.json(products);
}