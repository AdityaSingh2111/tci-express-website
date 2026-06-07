'use server'

import { createClient } from '@/lib/supabase/server';
import { Notification, NotificationType, NotificationPriority } from '@/types/notification';

export async function createNotification(data: {
  title: string;
  message: string;
  type: NotificationType;
  priority?: NotificationPriority;
  reference_id?: string;
  action_url?: string;
}) {
  const supabase = await createClient();

  const { data: notification, error } = await supabase
    .from('notifications')
    .insert([data])
    .select()
    .single();

  if (error) {
    console.error('Error creating notification:', error);
    return { success: false, error: error.message };
  }

  return { success: true, data: notification };
}

export async function getNotifications(limit: number = 20) {
  const supabase = await createClient();

  const { data: notifications, error } = await supabase
    .from('notifications')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching notifications:', error);
    return { success: false, error: error.message };
  }

  return { success: true, data: notifications as Notification[] };
}

export async function getUnreadCount() {
  const supabase = await createClient();

  const { count, error } = await supabase
    .from('notifications')
    .select('*', { count: 'exact', head: true })
    .eq('is_read', false);

  if (error) {
    console.error('Error fetching unread count:', error);
    return { success: false, error: error.message };
  }

  return { success: true, count: count || 0 };
}

export async function markAsRead(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('id', id);

  if (error) {
    console.error('Error marking notification as read:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function markAllAsRead() {
  const supabase = await createClient();

  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('is_read', false);

  if (error) {
    console.error('Error marking all notifications as read:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}
