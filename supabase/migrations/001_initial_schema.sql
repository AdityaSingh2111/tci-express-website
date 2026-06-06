-- Phase 1: Database Schema Initialization

-- 1. Enable pgcrypto for UUIDs
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Document Sequences (Concurrency Safe Numbering)
CREATE TABLE document_sequences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prefix VARCHAR(20) NOT NULL UNIQUE, -- e.g., 'TCI-CUST', 'TCI-Q-26', 'TCI-CA-26'
  current_value INTEGER NOT NULL DEFAULT 0,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- Function to safely get the next sequence value
CREATE OR REPLACE FUNCTION get_next_sequence_value(seq_prefix VARCHAR)
RETURNS VARCHAR
LANGUAGE plpgsql
AS $$
DECLARE
  next_val INTEGER;
  padded_val VARCHAR;
BEGIN
  UPDATE document_sequences
  SET current_value = current_value + 1
  WHERE prefix = seq_prefix
  RETURNING current_value INTO next_val;

  IF next_val IS NULL THEN
    -- Initialize if it doesn't exist
    INSERT INTO document_sequences (prefix, current_value)
    VALUES (seq_prefix, 1)
    RETURNING current_value INTO next_val;
  END IF;

  -- Pad with leading zeros to 6 digits (e.g. 000001)
  padded_val := LPAD(next_val::TEXT, 6, '0');
  
  RETURN seq_prefix || '-' || padded_val;
END;
$$;

-- 3. Customers Table
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_reference_id VARCHAR(50) UNIQUE NOT NULL, -- e.g., TCI-CUST-000001
  name VARCHAR(150) NOT NULL,
  email VARCHAR(255),
  phone_number VARCHAR(20) NOT NULL,
  whatsapp_number VARCHAR(20),
  gst_number VARCHAR(50),
  billing_address TEXT,
  billing_city VARCHAR(100),
  billing_state VARCHAR(100),
  billing_pincode VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- 4. Leads Table
-- Merges QuoteLeadPayload and ContactPayload fields
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id) ON DELETE SET NULL, -- Can be linked later
  source VARCHAR(50) NOT NULL DEFAULT 'Website', -- e.g. Website Quote, Contact Form, Manual
  
  -- Customer Details
  customer_name VARCHAR(150) NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  whatsapp_number VARCHAR(20),
  email VARCHAR(255),
  preferred_contact_method VARCHAR(50), -- Phone Call, WhatsApp, Either
  
  -- Service Details
  service_type VARCHAR(100),
  vehicle_model VARCHAR(150),
  enquiry_type VARCHAR(100),
  subject VARCHAR(200),
  message TEXT,
  notes TEXT,
  
  -- Location Details
  pickup_address TEXT,
  pickup_place_id VARCHAR(255),
  pickup_city VARCHAR(100),
  pickup_state VARCHAR(100),
  
  drop_address TEXT,
  drop_place_id VARCHAR(255),
  drop_city VARCHAR(100),
  drop_state VARCHAR(100),
  
  distance_km NUMERIC,
  
  -- Workflow
  status VARCHAR(50) NOT NULL DEFAULT 'New', -- New, Contacted, Quoted, Booked, Lost
  assigned_to UUID, -- References an admin user (UUID from auth.users ideally)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- 5. Quotations Table
CREATE TABLE quotations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_reference_id VARCHAR(50) UNIQUE NOT NULL, -- e.g., TCI-Q-26-000001
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  customer_id UUID REFERENCES customers(id) ON DELETE RESTRICT,
  
  -- Location / Journey (Copied from lead for record keeping)
  pickup_city VARCHAR(100),
  drop_city VARCHAR(100),
  service_type VARCHAR(100),
  
  -- Pricing
  freight_charges NUMERIC NOT NULL DEFAULT 0,
  packing_charges NUMERIC NOT NULL DEFAULT 0,
  loading_charges NUMERIC NOT NULL DEFAULT 0,
  unloading_charges NUMERIC NOT NULL DEFAULT 0,
  insurance_charges NUMERIC NOT NULL DEFAULT 0,
  other_charges NUMERIC NOT NULL DEFAULT 0,
  sub_total NUMERIC NOT NULL DEFAULT 0,
  gst_percentage NUMERIC NOT NULL DEFAULT 18.0,
  gst_amount NUMERIC NOT NULL DEFAULT 0,
  total_amount NUMERIC NOT NULL DEFAULT 0,
  
  -- Metadata
  valid_until DATE,
  status VARCHAR(50) NOT NULL DEFAULT 'Draft', -- Draft, Sent, Accepted, Rejected
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- 6. Collection Advice Table
CREATE TABLE collection_advice (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ca_reference_id VARCHAR(50) UNIQUE NOT NULL, -- e.g. TCI-CA-26-000001
  quotation_id UUID REFERENCES quotations(id) ON DELETE RESTRICT,
  customer_id UUID REFERENCES customers(id) ON DELETE RESTRICT,
  
  -- Payment Details
  advance_received NUMERIC NOT NULL DEFAULT 0,
  payment_mode VARCHAR(50),
  payment_reference VARCHAR(100),
  balance_amount NUMERIC NOT NULL DEFAULT 0,
  
  -- Execution Details
  planned_pickup_date DATE,
  supervisor_name VARCHAR(100),
  
  -- Vehicle Trans Details (if applicable)
  vehicle_make_model VARCHAR(150),
  chassis_number VARCHAR(100),
  registration_number VARCHAR(50),
  
  status VARCHAR(50) NOT NULL DEFAULT 'Created',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- 7. Shipments Table
CREATE TABLE shipments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_id VARCHAR(50) UNIQUE NOT NULL, -- e.g. TCI-26-000001
  ca_id UUID REFERENCES collection_advice(id) ON DELETE RESTRICT,
  customer_id UUID REFERENCES customers(id) ON DELETE RESTRICT,
  
  service_type VARCHAR(100) NOT NULL,
  origin VARCHAR(100) NOT NULL,
  destination VARCHAR(100) NOT NULL,
  
  -- Logistics Info
  current_location VARCHAR(150),
  estimated_delivery_date DATE,
  actual_delivery_date DATE,
  
  -- Workflow
  status VARCHAR(50) NOT NULL DEFAULT 'Booked', -- Booked, In Transit, Reached Hub, Out for Delivery, Delivered
  is_delayed BOOLEAN DEFAULT false,
  delay_note TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- 8. Shipment Milestones Table (For Tracking Timeline)
CREATE TABLE shipment_milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shipment_id UUID REFERENCES shipments(id) ON DELETE CASCADE,
  status_update VARCHAR(100) NOT NULL,
  location VARCHAR(150) NOT NULL,
  notes TEXT,
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- 9. Invoices Table
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_reference_id VARCHAR(50) UNIQUE NOT NULL, -- e.g. TCI-INV-26-000001
  shipment_id UUID REFERENCES shipments(id) ON DELETE RESTRICT,
  customer_id UUID REFERENCES customers(id) ON DELETE RESTRICT,
  
  -- Financials
  sub_total NUMERIC NOT NULL DEFAULT 0,
  gst_percentage NUMERIC NOT NULL DEFAULT 18.0,
  gst_amount NUMERIC NOT NULL DEFAULT 0,
  total_amount NUMERIC NOT NULL DEFAULT 0,
  amount_paid NUMERIC NOT NULL DEFAULT 0,
  balance_due NUMERIC NOT NULL DEFAULT 0,
  
  status VARCHAR(50) NOT NULL DEFAULT 'Unpaid', -- Unpaid, Partially Paid, Paid, Cancelled
  due_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- 10. Settings Table
CREATE TABLE settings (
  key VARCHAR(100) PRIMARY KEY,
  value JSONB NOT NULL,
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- 11. Initial Settings
INSERT INTO settings (key, value, description) VALUES
('company_info', '{"name": "TCI Express", "gstin": "27XXXXX0000X1XX", "pan": "XXXXX0000X"}', 'Global company info'),
('tax_defaults', '{"freight_gst": 18}', 'Default tax rates for quotes/invoices');

-- 12. Row Level Security (RLS)
-- Currently allowing all operations assuming a trusted backend API/Middleware handles auth
-- To restrict, apply proper authenticated policies later
ALTER TABLE document_sequences ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotations ENABLE ROW LEVEL SECURITY;
ALTER TABLE collection_advice ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipment_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Allow public access for now (API keys / middleware will protect)
CREATE POLICY "Allow public all" ON document_sequences FOR ALL USING (true);
CREATE POLICY "Allow public all" ON customers FOR ALL USING (true);
CREATE POLICY "Allow public all" ON leads FOR ALL USING (true);
CREATE POLICY "Allow public all" ON quotations FOR ALL USING (true);
CREATE POLICY "Allow public all" ON collection_advice FOR ALL USING (true);
CREATE POLICY "Allow public all" ON shipments FOR ALL USING (true);
CREATE POLICY "Allow public all" ON shipment_milestones FOR ALL USING (true);
CREATE POLICY "Allow public all" ON invoices FOR ALL USING (true);
CREATE POLICY "Allow public all" ON settings FOR ALL USING (true);
