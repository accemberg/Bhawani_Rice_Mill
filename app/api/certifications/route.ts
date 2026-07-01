import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase/admin';

export async function GET() {
  try {
    const snapshot = await db.collection('Certifications').get();
    const certifications = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(certifications);
  } catch (error) {
    console.error('[api/certifications]', error);
    return NextResponse.json({ error: 'Failed to fetch certifications' }, { status: 500 });
  }
}