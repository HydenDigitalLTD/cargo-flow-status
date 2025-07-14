-- Add recipient_email column to packages table
ALTER TABLE public.packages 
ADD COLUMN recipient_email text;