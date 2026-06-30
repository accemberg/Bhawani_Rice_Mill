import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase/admin';

export async function GET() {
  try {
    const snapshot = await db.collection('testimonials').get();
    const testimonials = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error('[api/testimonials]', error);
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}