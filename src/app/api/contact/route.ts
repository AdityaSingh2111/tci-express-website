import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { ContactPayload } from '@/types/lead';

export async function POST(request: Request) {
  try {
    const payload: ContactPayload = await request.json();

    // Basic Validation
    if (!payload.customer_name || !payload.email || !payload.phone_number || !payload.message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = await createClient();

    // Insert into Supabase leads table
    const { data, error } = await supabase
      .from('leads')
      .insert({
        source: 'Contact Form',
        customer_name: payload.customer_name,
        email: payload.email,
        phone_number: payload.phone_number,
        whatsapp_number: payload.whatsapp_number || payload.phone_number,
        preferred_contact_method: payload.preferred_contact_method,
        subject: payload.subject,
        message: payload.message,
        enquiry_type: payload.enquiry_type,
        status: 'New'
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase Insert Error:', error);
      return NextResponse.json({ error: 'Failed to submit contact request' }, { status: 500 });
    }

    return NextResponse.json({ success: true, lead: data }, { status: 201 });
  } catch (err) {
    console.error('Contact API Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
