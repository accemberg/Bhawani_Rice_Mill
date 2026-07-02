import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase/admin';
import { verifyToken } from '@/lib/firebase/verifyToken';

export async function GET(request: NextRequest) {
  try {
    await verifyToken(request.headers.get('authorization'));

    const snapshot = await db.collection('enquiries')
      .orderBy('createdAt', 'desc')
      .get();

    const enquiries = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || null,
    }));

    return NextResponse.json(enquiries);
  } catch (error: any) {
    if (error.message === 'No token provided') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('[admin/enquiries]', error);
    return NextResponse.json(
      { error: 'Failed to fetch enquiries' },
      { status: 500 }
    );
  }
}