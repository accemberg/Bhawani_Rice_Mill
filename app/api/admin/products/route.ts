import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase/admin';
import { verifyToken } from '@/lib/firebase/verifyToken';

export async function GET(request: NextRequest) {
  try {
    await verifyToken(request.headers.get('authorization'));
    const snapshot = await db.collection('Products').get();
    const products = snapshot.docs.map(doc => ({
      id: doc.id, ...doc.data()
    }));
    return NextResponse.json(products);
  } catch (error: any) {
    if (error.message === 'No token provided') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('[admin/products GET]', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await verifyToken(request.headers.get('authorization'));
    const body = await request.json();
    const docRef = await db.collection('Products').add({
      ...body,
      createdAt: new Date(),
    });
    return NextResponse.json({ id: docRef.id, success: true });
  } catch (error: any) {
    if (error.message === 'No token provided') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('[admin/products POST]', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await verifyToken(request.headers.get('authorization'));
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json(
        { error: 'Product ID required' },
        { status: 400 }
      );
    }
    const body = await request.json();
    await db.collection('Products').doc(id).update({
      ...body,
      updatedAt: new Date(),
    });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.message === 'No token provided') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('[admin/products PUT]', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
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
        { error: 'Product ID required' },
        { status: 400 }
      );
    }
    await db.collection('Products').doc(id).delete();
    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.message === 'No token provided') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('[admin/products DELETE]', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}