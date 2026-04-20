import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, packageChoice, message } = body;

    if (!name || !phone || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // TODO: Connect to your email provider (Resend, SendGrid, etc.)
    // Example with Resend:
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'noreply@rijschoollovanium.be',
    //   to: 'info@rijschoollovanium.be',
    //   subject: `Nieuwe aanvraag van ${name}`,
    //   html: `<p>Naam: ${name}</p><p>Tel: ${phone}</p><p>Email: ${email}</p><p>Pakket: ${packageChoice}</p><p>Bericht: ${message}</p>`,
    // });

    console.log('Contact form submission:', { name, phone, email, packageChoice, message });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
