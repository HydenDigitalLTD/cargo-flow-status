-- Add the new enum values to package_status (Part 1)
ALTER TYPE package_status ADD VALUE IF NOT EXISTS 'arrived_at_depot';
ALTER TYPE package_status ADD VALUE IF NOT EXISTS 'reached_sorting_facility';  
ALTER TYPE package_status ADD VALUE IF NOT EXISTS 'on_hold';
ALTER TYPE package_status ADD VALUE IF NOT EXISTS 'returned_to_sender';
ALTER TYPE package_status ADD VALUE IF NOT EXISTS 'departed_sorting_facility';
ALTER TYPE package_status ADD VALUE IF NOT EXISTS 'redelivery_attempt';