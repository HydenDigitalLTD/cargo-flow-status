-- Enable required extensions for cron jobs
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Create a cron job to automatically update package statuses every 5 minutes
SELECT cron.schedule(
  'auto-update-package-statuses',
  '*/5 * * * *', -- Every 5 minutes
  $$
  SELECT
    net.http_post(
        url:='https://yxppflscazhgoikzzxha.supabase.co/functions/v1/auto-status-update',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4cHBmbHNjYXpoZ29pa3p6eGhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzMDIzMzIsImV4cCI6MjA2Nzg3ODMzMn0.LLXKdrL_xlmNT88naJCVf99Qs09frIxMeQdWmqRxOAs"}'::jsonb,
        body:=concat('{"triggered_by": "cron", "time": "', now(), '"}')::jsonb
    ) as request_id;
  $$
);