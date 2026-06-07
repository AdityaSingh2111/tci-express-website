"use server";

import { createClient } from '@/lib/supabase/server';
import { Lead, LeadStatus } from '@/types/lead';
import { createNotification } from '@/actions/notifications';

export async function getLeads(params: {
  page: number;
  limit: number;
  search: string;
  service: string;
  status: string;
  dateRange?: string;
  customStartDate?: string;
  customEndDate?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}) {
  const supabase = await createClient();
  const { page, limit, search, service, status, dateRange = 'All', customStartDate, customEndDate, sortBy = 'created_at', sortOrder = 'desc' } = params;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from('leads')
    .select('*', { count: 'exact' });

  if (service && service !== 'All' && service !== '') {
    query = query.eq('service_type', service);
  }
  
  if (status && status !== 'All' && status !== '') {
    query = query.eq('status', status);
  }

  if (search) {
    query = query.or(`customer_name.ilike.%${search}%,phone_number.ilike.%${search}%,whatsapp_number.ilike.%${search}%`);
  }

  // Apply Date Range filter
  if (dateRange && dateRange !== 'All') {
    const now = new Date();
    let startDate = new Date();
    let endDate = new Date();

    if (dateRange === 'Today') {
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);
      query = query.gte('created_at', startDate.toISOString()).lte('created_at', endDate.toISOString());
    } else if (dateRange === 'Yesterday') {
      startDate.setDate(now.getDate() - 1);
      startDate.setHours(0, 0, 0, 0);
      endDate.setDate(now.getDate() - 1);
      endDate.setHours(23, 59, 59, 999);
      query = query.gte('created_at', startDate.toISOString()).lte('created_at', endDate.toISOString());
    } else if (dateRange === 'Last 7 Days') {
      startDate.setDate(now.getDate() - 7);
      startDate.setHours(0, 0, 0, 0);
      query = query.gte('created_at', startDate.toISOString());
    } else if (dateRange === 'Last 30 Days') {
      startDate.setDate(now.getDate() - 30);
      startDate.setHours(0, 0, 0, 0);
      query = query.gte('created_at', startDate.toISOString());
    } else if (dateRange === 'This Month') {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      query = query.gte('created_at', startDate.toISOString());
    } else if (dateRange === 'Custom Range' && customStartDate && customEndDate) {
      const s = new Date(customStartDate);
      s.setHours(0, 0, 0, 0);
      const e = new Date(customEndDate);
      e.setHours(23, 59, 59, 999);
      query = query.gte('created_at', s.toISOString()).lte('created_at', e.toISOString());
    }
  }

  // Apply Sorting
  if (sortBy) {
    query = query.order(sortBy, { ascending: sortOrder === 'asc' });
  } else {
    query = query.order('created_at', { ascending: false });
  }

  query = query.range(from, to);

  const { data, count, error } = await query;

  if (error) {
    console.error("Error fetching leads:", error);
    return { data: null, count: 0, error: error.message };
  }

  return { data: data as Lead[], count: count || 0, error: null };
}

export async function getDashboardLeadCounters() {
  const supabase = await createClient();
  
  // Get total leads
  const { count: totalLeads, error: totalError } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true });

  if (totalError) {
    console.error("Error fetching total leads:", totalError);
    return { todayLeads: 0, totalLeads: 0 };
  }

  // Get today's leads based on UTC (Supabase default)
  // To avoid timezone complexities for a simple counter, we use a simple current date logic
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  const { count: todayLeads, error: todayError } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', startOfDay.toISOString());

  if (todayError) {
    console.error("Error fetching today leads:", todayError);
    return { todayLeads: 0, totalLeads: totalLeads || 0 };
  }

  return { 
    todayLeads: todayLeads || 0, 
    totalLeads: totalLeads || 0 
  };
}

export async function updateLeadStatus(id: string, status: LeadStatus) {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from('leads')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    console.error("Error updating lead status:", error);
    return { success: false, error: error.message };
  }

  try {
    await createNotification({
      title: 'Lead Updated',
      message: `A lead's status was changed to ${status}.`,
      type: 'lead_status_changed',
      priority: 'normal',
      reference_id: id,
      action_url: `/admin/leads?id=${id}`
    });
  } catch (notifErr) {
    console.error('Failed to create notification:', notifErr);
  }

  return { success: true, error: null };
}
