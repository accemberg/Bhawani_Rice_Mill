import { NextRequest, NextResponse } from 'next/server';
import { mockBlogs } from '@/lib/mockData';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const blog = mockBlogs.find(b => b.slug === params.slug);

  if (!blog) {
    return NextResponse.json(
      { error: 'Blog post not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(blog);
}