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
