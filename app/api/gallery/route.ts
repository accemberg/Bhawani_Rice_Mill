import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase/admin';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let query: FirebaseFirestore.Query = db.collection('gallery');

    if (category && category !== 'all') {
      query = query.where('category', '==', category);
    }

    const snapshot = await query.get();
    const gallery = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return NextResponse.json(gallery);
  } catch (error) {
    console.error('[api/gallery]', error);
    return NextResponse.json({ error: 'Failed to fetch gallery' }, { status: 500 });
  }
}