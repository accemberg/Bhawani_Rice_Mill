import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase/admin';

export async function GET() {
  try {
    const snapshot = await db.collection('Stats').limit(1).get();

    if (snapshot.empty) {
      return NextResponse.json({ error: 'Stats not found' }, { status: 404 });
    }

    const stats = snapshot.docs[0].data();
    return NextResponse.json(stats);
  } catch (error) {
    console.error('[api/stats]', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}