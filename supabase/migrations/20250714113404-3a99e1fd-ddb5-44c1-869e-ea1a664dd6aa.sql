-- First, let's update the status_configs table to support more granular time settings
ALTER TABLE public.status_configs 
ADD COLUMN days_after_previous INTEGER DEFAULT 0,
ADD COLUMN minutes_after_previous INTEGER DEFAULT 0;

-- Update the existing function to handle days and minutes
CREATE OR REPLACE FUNCTION public.auto_update_package_status()
RETURNS void
LANGUAGE plpgsql
AS $function$
DECLARE
  pkg RECORD;
  next_status package_status;
  config RECORD;
  total_minutes INTEGER;
BEGIN
  FOR pkg IN 
    SELECT p.*, 
           EXTRACT(EPOCH FROM (now() - p.created_at))/60 as minutes_since_created
    FROM public.packages p
    WHERE p.current_status != 'delivered' 
      AND p.current_status != 'returned'
      AND p.current_status != 'failed_delivery'
  LOOP
    -- Get next status based on time elapsed
    SELECT sc.status, 
           sc.hours_after_previous,
           sc.days_after_previous,
           sc.minutes_after_previous,
           (sc.days_after_previous * 24 * 60 + sc.hours_after_previous * 60 + sc.minutes_after_previous) as total_minutes
    INTO config
    FROM public.status_configs sc
    WHERE (sc.days_after_previous * 24 * 60 + sc.hours_after_previous * 60 + sc.minutes_after_previous) <= pkg.minutes_since_created
      AND sc.is_active = true
      AND sc.status != pkg.current_status
    ORDER BY (sc.days_after_previous * 24 * 60 + sc.hours_after_previous * 60 + sc.minutes_after_previous) DESC
    LIMIT 1;
    
    IF config.status IS NOT NULL AND config.status != pkg.current_status THEN
      -- Update package status
      UPDATE public.packages 
      SET current_status = config.status
      WHERE id = pkg.id;
      
      -- Add to status history
      INSERT INTO public.package_status_history (package_id, status, notes)
      VALUES (pkg.id, config.status, 'Status updated automatically');
    END IF;
  END LOOP;
END;
$function$;

-- Create a function to run auto updates (to be called by cron or edge function)
CREATE OR REPLACE FUNCTION public.trigger_auto_update()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
BEGIN
  PERFORM public.auto_update_package_status();
END;
$function$;