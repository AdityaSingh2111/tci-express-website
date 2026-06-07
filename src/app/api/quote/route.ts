import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { QuoteLeadPayload } from '@/types/lead';
import { createNotification } from '@/actions/notifications';

export async function POST(request: Request) {
  try {
    const payload: QuoteLeadPayload = await request.json();
    console.log('--- LEAD API: Payload Received ---');
    console.log(JSON.stringify(payload, null, 2));

    // Basic Validation
    if (!payload.customer_name || !payload.phone_number || !payload.pickup_address || !payload.drop_address) {
      console.log('LEAD API: Validation Failed - Missing required fields');
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Ensure API never inserts NULL into NOT NULL columns
    const pickupCity = payload.pickup_city || payload.pickup_address || 'Unknown';
    const pickupState = payload.pickup_state || 'Unknown';
    const pickupPlaceId = payload.pickup_place_id || 'manual_entry';
    
    const dropCity = payload.drop_city || payload.drop_address || 'Unknown';
    const dropState = payload.drop_state || 'Unknown';
    const dropPlaceId = payload.drop_place_id || 'manual_entry';

    // 1. Calculate Distance if Place IDs are present
    let calculatedDistanceKm: number | null = null;
    if (payload.pickup_place_id && payload.drop_place_id) {
      try {
        const apiKey = process.env.GOOGLE_MAPS_SERVER_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
        if (apiKey) {
          const distanceRes = await fetch(
            `https://maps.googleapis.com/maps/api/distancematrix/json?origins=place_id:${payload.pickup_place_id}&destinations=place_id:${payload.drop_place_id}&mode=driving&key=${apiKey}`
          );
          const distanceData = await distanceRes.json();
          if (distanceData.status === 'OK' && distanceData.rows[0]?.elements[0]?.status === 'OK') {
            const meters = distanceData.rows[0].elements[0].distance.value;
            calculatedDistanceKm = Math.round((meters / 1000) * 10) / 10; // Round to 1 decimal place
          }
        }
      } catch (distanceErr) {
        console.error('Failed to calculate distance:', distanceErr);
        // Continue without failing the entire submission
      }
    }

    const supabase = await createClient();

    let finalMessage = payload.notes || null;
    const anyPayload = payload as any;
    if (anyPayload.preferredDate) {
      finalMessage = finalMessage ? `[Preferred Date: ${anyPayload.preferredDate}]\n${finalMessage}` : `[Preferred Date: ${anyPayload.preferredDate}]`;
    }

    const insertObject = {
      lead_source: 'Website Quote',
      customer_name: payload.customer_name,
      phone_number: payload.phone_number,
      whatsapp_number: payload.whatsapp_number || payload.phone_number,
      email: payload.email || null,
      preferred_contact_method: payload.preferred_contact_method || 'WhatsApp',
      service_type: payload.service_type || 'General',
      vehicle_model: payload.vehicle_model || null,
      pickup_place_id: pickupPlaceId,
      pickup_city: pickupCity,
      pickup_state: pickupState,
      drop_place_id: dropPlaceId,
      drop_city: dropCity,
      drop_state: dropState,
      distance_km: calculatedDistanceKm || (payload.distance_km ? parseFloat(payload.distance_km) : null),
      message: finalMessage,
      status: 'New'
    };

    console.log('--- LEAD API: Insert Object ---');
    console.log(JSON.stringify(insertObject, null, 2));

    // 2. Insert into Supabase leads table
    const { data, error } = await supabase
      .from('leads')
      .insert(insertObject)
      .select()
      .single();

    if (error) {
      console.error('--- LEAD API: Supabase Insert Error ---');
      console.error(error);
      return NextResponse.json({ error: 'Failed to submit quote request', details: error }, { status: 500 });
    }

    console.log('--- LEAD API: Supabase Response (Success) ---');
    console.log(JSON.stringify(data, null, 2));

    // 3. Trigger Notification
    try {
      await createNotification({
        title: 'New Lead Received',
        message: `${data.customer_name} submitted a ${data.service_type} enquiry.`,
        type: 'lead_created',
        priority: 'high',
        reference_id: data.id,
        action_url: `/admin/leads?id=${data.id}`
      });
    } catch (notifErr) {
      console.error('Failed to create notification:', notifErr);
      // Do not fail the quote submission if notification fails
    }

    return NextResponse.json({ success: true, lead: data }, { status: 201 });
  } catch (err) {
    console.error('--- LEAD API: Unexpected Error ---');
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
