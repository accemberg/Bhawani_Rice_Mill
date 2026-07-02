import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase/admin';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let query = db.collection('blog')
      .where('status', '==', 'published');

    const snapshot = await (category && category !== 'all'
      ? query.where('category', '==', category).get()
      : query.get());

    const blogs = snapshot.docs.map(doc => {
      const data = doc.data();
      const { content, ...rest } = data;
      return { id: doc.id, ...rest };
    });

    return NextResponse.json(blogs);
  } catch (error) {
    console.error('[api/blog]', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}