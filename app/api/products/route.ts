import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase/admin';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let query: FirebaseFirestore.Query = db.collection('Products');

    if (category && category !== 'all') {
      query = query.where('Category', '==', category);
    }

    const snapshot = await query.get();
    const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return NextResponse.json(products);
  } catch (error) {
    console.error('[api/products]', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}