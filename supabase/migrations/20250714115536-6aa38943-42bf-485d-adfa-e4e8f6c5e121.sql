-- Add order field to status_configs table and update the logic
ALTER TABLE public.status_configs 
ADD COLUMN status_order integer NOT NULL DEFAULT 0;

-- Update existing records with proper order
UPDATE public.status_configs SET status_order = 1 WHERE status = 'registered';
UPDATE public.status_configs SET status_order = 2 WHERE status = 'ready_for_pickup';
UPDATE public.status_configs SET status_order = 3 WHERE status = 'in_transit';
UPDATE public.status_configs SET status_order = 4 WHERE status = 'out_for_delivery';
UPDATE public.status_configs SET status_order = 5 WHERE status = 'delivered';
UPDATE public.status_configs SET status_order = 6 WHERE status = 'failed_delivery';
UPDATE public.status_configs SET status_order = 7 WHERE status = 'returned';

-- Add unique constraint on status_order to prevent duplicates
ALTER TABLE public.status_configs 
ADD CONSTRAINT unique_status_order UNIQUE (status_order);

-- Update the auto_update_package_status function with new logic
CREATE OR REPLACE FUNCTION public.auto_update_package_status()
RETURNS void
LANGUAGE plpgsql
AS $function$
DECLARE
  pkg RECORD;
  current_config RECORD;
  next_config RECORD;
  time_in_current_status INTEGER;
BEGIN
  FOR pkg IN 
    SELECT p.*, 
           EXTRACT(EPOCH FROM (now() - p.updated_at))/60 as minutes_since_last_update
    FROM public.packages p
    WHERE p.current_status != 'delivered' 
      AND p.current_status != 'returned'
      AND p.current_status != 'failed_delivery'
  LOOP
    -- Get current status configuration
    SELECT sc.status, 
           sc.status_order,
           sc.hours_after_previous,
           sc.days_after_previous,
           sc.minutes_after_previous,
           (sc.days_after_previous * 24 * 60 + sc.hours_after_previous * 60 + sc.minutes_after_previous) as total_duration_minutes
    INTO current_config
    FROM public.status_configs sc
    WHERE sc.status = pkg.current_status
      AND sc.is_active = true;
    
    IF current_config.status IS NOT NULL THEN
      -- Check if enough time has passed in current status
      IF pkg.minutes_since_last_update >= current_config.total_duration_minutes THEN
        -- Get next status in order
        SELECT sc.status
        INTO next_config
        FROM public.status_configs sc
        WHERE sc.status_order = current_config.status_order + 1
          AND sc.is_active = true
        LIMIT 1;
        
        IF next_config.status IS NOT NULL THEN
          -- Update package to next status
          UPDATE public.packages 
          SET current_status = next_config.status,
              updated_at = now()
          WHERE id = pkg.id;
          
          -- Add to status history
          INSERT INTO public.package_status_history (package_id, status, notes)
          VALUES (pkg.id, next_config.status, 'Status updated automatically');
        END IF;
      END IF;
    END IF;
  END LOOP;
END;
$function$;