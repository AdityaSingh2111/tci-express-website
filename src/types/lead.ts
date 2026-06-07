export interface QuoteLeadPayload {
  customer_name: string;
  phone_number: string;
  whatsapp_number: string;
  preferred_contact_method: "Phone Call" | "WhatsApp" | "Either";
  email: string;
  service_type: string;
  vehicle_model: string | null;
  pickup_place_id: string | null;
  pickup_city: string | null;
  pickup_state: string | null;
  drop_place_id: string | null;
  drop_city: string | null;
  drop_state: string | null;
  pickup_address: string; // Raw input
  drop_address: string; // Raw input
  distance_km: string | null;
  notes?: string;
}

export interface ContactPayload {
  customer_name: string;
  email: string;
  phone_number: string;
  preferred_contact_method: "Phone Call" | "WhatsApp" | "Either";
  subject?: string;
  message: string;
  whatsapp_number?: string;
  enquiry_type?: string;
}

export type LeadStatus = 'New' | 'Contacted' | 'Quoted' | 'Converted' | 'Rejected';

export interface Lead {
  id: string;
  created_at: string;
  updated_at: string;
  
  customer_name: string;
  phone_number: string;
  whatsapp_number: string;
  preferred_contact_method: "WhatsApp" | "Phone Call" | "Either";
  email: string | null;
  
  service_type: string;
  vehicle_model: string | null;
  pickup_place_id: string;
  pickup_city: string;
  pickup_state: string;
  drop_place_id: string;
  drop_city: string;
  drop_state: string;
  distance_km: number | null;
  
  message: string | null;
  lead_source: string;
  status: LeadStatus;
  
  admin_notes: string | null;
  last_contacted_at: string | null;
}
