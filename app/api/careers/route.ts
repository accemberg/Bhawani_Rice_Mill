import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase/admin';
import { resend } from '@/lib/email/resend';
import { careersAutoReply } from '@/lib/email/templates/careersAutoReply';
import { careersNotification } from '@/lib/email/templates/careersNotification';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, role, resumeBase64, resumeFileName } = body;

    if (!name || !email || !phone || !role) {
      return NextResponse.json(
        { error: 'Name, email, phone and role are required' },
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

    if (!resumeBase64) {
      return NextResponse.json(
        { error: 'Resume file is required' },
        { status: 400 }
      );
    }

    // Decode base64
    const base64Data = resumeBase64.replace(/^data:application\/pdf;base64,/, '');
    const fileBuffer = Buffer.from(base64Data, 'base64');

    if (fileBuffer.length > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Resume file must be under 5MB' },
        { status: 400 }
      );
    }

    // Save to Firestore without resumeUrl
    await db.collection('careers').add({
      name,
      email,
      phone,
      role,
      resumeFileName: resumeFileName || 'resume.pdf',
      appliedAt: new Date(),
      status: 'new',
    });

    // Send auto-reply to applicant
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: email,
      subject: `Application Received — ${role} | Shri Shyam Bhog`,
      html: careersAutoReply({ name, role }),
    });

    // Send notification to admin WITH resume attached
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: process.env.ADMIN_EMAIL!,
      subject: `New Application: ${role} — ${name}`,
      html: careersNotification({ name, email, phone, role, resumeUrl: 'Attached to this email' }),
      attachments: [
        {
          filename: resumeFileName || 'resume.pdf',
          content: fileBuffer,
        },
      ],
    });

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully. We will review and get back to you.',
    });

  } catch (error) {
    console.error('[api/careers]', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}