-- Add new enum values to package_status
ALTER TYPE package_status ADD VALUE IF NOT EXISTS 'arrived_at_depot';
ALTER TYPE package_status ADD VALUE IF NOT EXISTS 'reached_sorting_facility';
ALTER TYPE package_status ADD VALUE IF NOT EXISTS 'on_hold';
ALTER TYPE package_status ADD VALUE IF NOT EXISTS 'returned_to_sender';
ALTER TYPE package_status ADD VALUE IF NOT EXISTS 'departed_sorting_facility';
ALTER TYPE package_status ADD VALUE IF NOT EXISTS 'redelivery_attempt';

-- Now insert the new status configurations
INSERT INTO public.status_configs (status, display_name, description, status_order, days_after_previous, hours_after_previous, minutes_after_previous, is_active) VALUES
('arrived_at_depot', 'Arrived at Depot', 'Shipment has arrived at the delivery depot', 8, 0, 2, 0, true),
('reached_sorting_facility', 'Reached Sorting Facility', 'Shipment has reached the sorting facility', 9, 0, 1, 0, true),
('on_hold', 'On Hold', 'Shipment is currently on hold', 10, 1, 0, 0, true),
('returned_to_sender', 'Returned to Sender', 'Shipment has been returned to the sender', 11, 0, 4, 0, true),
('departed_sorting_facility', 'Departed Sorting Facility', 'Shipment has departed from the sorting facility', 12, 0, 3, 0, true),
('redelivery_attempt', 'Redelivery Attempt', 'A redelivery attempt has been made', 13, 0, 6, 0, true)
ON CONFLICT (status) DO NOTHING;