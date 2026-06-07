-- Fix RLS error for Website Lead Submissions
CREATE POLICY "Allow public insert to leads" ON public.leads
FOR INSERT
WITH CHECK (true);
