import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { QuoteLeadPayload } from '@/types/lead';

export async function POST(request: Request) {
  try {
    const payload: QuoteLeadPayload = await request.json();

    // Basic Validation
    if (!payload.customer_name || !payload.phone_number || !payload.pickup_address || !payload.drop_address) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

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

    // 2. Insert into Supabase leads table
    const { data, error } = await supabase
      .from('leads')
      .insert({
        source: 'Website Quote',
        customer_name: payload.customer_name,
        phone_number: payload.phone_number,
        whatsapp_number: payload.whatsapp_number || payload.phone_number,
        email: payload.email,
        preferred_contact_method: payload.preferred_contact_method,
        service_type: payload.service_type,
        vehicle_model: payload.vehicle_model,
        pickup_address: payload.pickup_address,
        pickup_place_id: payload.pickup_place_id,
        pickup_city: payload.pickup_city,
        pickup_state: payload.pickup_state,
        drop_address: payload.drop_address,
        drop_place_id: payload.drop_place_id,
        drop_city: payload.drop_city,
        drop_state: payload.drop_state,
        distance_km: calculatedDistanceKm || null,
        notes: payload.notes,
        status: 'New'
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase Insert Error:', error);
      return NextResponse.json({ error: 'Failed to submit quote request' }, { status: 500 });
    }

    return NextResponse.json({ success: true, lead: data }, { status: 201 });
  } catch (err) {
    console.error('Quote API Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
