-- Create the notifications table
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL,
    priority TEXT NOT NULL DEFAULT 'normal',
    reference_id UUID, -- Links to the associated Lead ID
    action_url TEXT, -- Direct navigation URL
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT notifications_type_check CHECK (
        type IN (
            'lead_created',
            'lead_status_changed',
            'quote_created'
        )
    ),
    CONSTRAINT notifications_priority_check CHECK (
        priority IN (
            'normal',
            'high'
        )
    )
);

-- Add Performance Indexes
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON public.notifications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON public.notifications(is_read);

-- Enable RLS
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users (admins) to access notifications
CREATE POLICY "Admins can view notifications"
    ON public.notifications FOR SELECT
    USING (auth.role() = 'authenticated');

-- Notifications will be inserted by server actions/functions, which can bypass RLS if using service role,
-- or if using standard client, they must be authenticated. No anon access.
CREATE POLICY "Admins can insert notifications"
    ON public.notifications FOR INSERT
    WITH CHECK (auth.role() = 'authenticated'); 

CREATE POLICY "Admins can update notifications"
    ON public.notifications FOR UPDATE
    USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can delete notifications"
    ON public.notifications FOR DELETE
    USING (auth.role() = 'authenticated');

-- Enable Realtime for the notifications table safely
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_publication_tables
        WHERE pubname = 'supabase_realtime'
        AND schemaname = 'public'
        AND tablename = 'notifications'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
    END IF;
END
$$;

-- Create function to auto-delete notifications older than 90 days
CREATE OR REPLACE FUNCTION cleanup_old_notifications()
RETURNS void AS $$
BEGIN
    DELETE FROM public.notifications WHERE created_at < NOW() - INTERVAL '90 days';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add an insert trigger to opportunistically clean up old notifications
CREATE OR REPLACE FUNCTION trigger_cleanup_notifications()
RETURNS trigger AS $$
BEGIN
    -- Delete old notifications
    PERFORM cleanup_old_notifications();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Safely recreate the trigger
DROP TRIGGER IF EXISTS cleanup_notifications_trigger ON public.notifications;
CREATE TRIGGER cleanup_notifications_trigger
    AFTER INSERT ON public.notifications
    FOR EACH ROW
    EXECUTE FUNCTION trigger_cleanup_notifications();
