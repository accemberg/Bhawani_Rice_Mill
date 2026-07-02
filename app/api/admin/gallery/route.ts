import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase/admin';
import { verifyToken } from '@/lib/firebase/verifyToken';

export async function GET(request: NextRequest) {
  try {
    await verifyToken(request.headers.get('authorization'));
    const snapshot = await db.collection('gallery').get();
    const gallery = snapshot.docs.map(doc => ({
      id: doc.id, ...doc.data()
    }));
    return NextResponse.json(gallery);
  } catch (error: any) {
    if (error.message === 'No token provided') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('[admin/gallery GET]', error);
    return NextResponse.json(
      { error: 'Failed to fetch gallery' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await verifyToken(request.headers.get('authorization'));
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json(
        { error: 'Gallery item ID required' },
        { status: 400 }
      );
    }
    await db.collection('gallery').doc(id).delete();
    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.message === 'No token provided') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('[admin/gallery DELETE]', error);
    return NextResponse.json(
      { error: 'Failed to delete gallery item' },
      { status: 500 }
    );
  }
}