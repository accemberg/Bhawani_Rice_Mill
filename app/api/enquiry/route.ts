import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase/admin';
import { resend } from '@/lib/email/resend';
import { enquiryAutoReply } from '@/lib/email/templates/enquiryAutoReply';
import { enquiryNotification } from '@/lib/email/templates/enquiryNotification';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message, type } = body;

    if (!name || !email || !message || !type) {
      return NextResponse.json(
        { error: 'Name, email, message and type are required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    await db.collection('enquiries').add({
      name,
      email,
      subject: subject || 'General Enquiry',
      message,
      type,
      createdAt: new Date(),
    });

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: email,
      subject: 'Thank you for contacting Shri Shyam Bhog',
      html: enquiryAutoReply({ name }),
    });

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: process.env.ADMIN_EMAIL!,
      subject: `New Enquiry: ${subject || type}`,
      html: enquiryNotification({ name, email, subject, message, type }),
    });

    return NextResponse.json({
      success: true,
      message: 'Enquiry received. We will contact you within 24 hours.'
    });

  } catch (error) {
    console.error('[api/enquiry]', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}