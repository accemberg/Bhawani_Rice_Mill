import { NextRequest, NextResponse } from 'next/server';
import { mockBlogs } from '@/lib/mockData';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  let blogs = mockBlogs;

  if (category && category !== 'all') {
    blogs = mockBlogs.filter(b => b.category === category);
  }

  // Return list without full content (excerpt only for listing page)
  const blogList = blogs.map(({ content, ...rest }) => rest);

  return NextResponse.json(blogList);
}