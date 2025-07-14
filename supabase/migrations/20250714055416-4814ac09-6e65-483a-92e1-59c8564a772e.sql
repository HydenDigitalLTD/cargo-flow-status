-- Fix infinite recursion in admin_users RLS policy by creating a security definer function

-- Drop the existing problematic policy
DROP POLICY IF EXISTS "Admins can view admin users" ON public.admin_users;

-- Create a security definer function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM public.admin_users 
    WHERE user_id = auth.uid() AND is_active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Recreate the admin_users policies using the security definer function
CREATE POLICY "Admins can view admin users" 
ON public.admin_users 
FOR SELECT 
USING (public.is_admin_user());

CREATE POLICY "Admins can insert admin users" 
ON public.admin_users 
FOR INSERT 
WITH CHECK (public.is_admin_user());

CREATE POLICY "Admins can update admin users" 
ON public.admin_users 
FOR UPDATE 
USING (public.is_admin_user());

CREATE POLICY "Admins can delete admin users" 
ON public.admin_users 
FOR DELETE 
USING (public.is_admin_user());

-- Update the packages policy to use the security definer function
DROP POLICY IF EXISTS "Admins can manage packages" ON public.packages;
CREATE POLICY "Admins can manage packages" 
ON public.packages 
FOR ALL 
USING (public.is_admin_user());

-- Update the package_status_history policy to use the security definer function
DROP POLICY IF EXISTS "Admins can manage status history" ON public.package_status_history;
CREATE POLICY "Admins can manage status history" 
ON public.package_status_history 
FOR ALL 
USING (public.is_admin_user());

-- Update the status_configs policy to use the security definer function
DROP POLICY IF EXISTS "Admins can manage status configs" ON public.status_configs;
CREATE POLICY "Admins can manage status configs" 
ON public.status_configs 
FOR ALL 
USING (public.is_admin_user());