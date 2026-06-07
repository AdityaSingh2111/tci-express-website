export type NotificationType = 'lead_created' | 'lead_status_changed' | 'quote_created';
export type NotificationPriority = 'normal' | 'high';

export interface Notification {
  id: string;
  created_at: string;
  title: string;
  message: string;
  type: NotificationType;
  priority: NotificationPriority;
  reference_id: string | null;
  action_url: string | null;
  is_read: boolean;
}
