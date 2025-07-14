
-- Create a default admin user with email and password
-- We'll use a trigger to automatically create the admin_users entry when this user signs up

-- First, let's create a function to handle new admin user creation
CREATE OR REPLACE FUNCTION public.handle_new_admin_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Only create admin_users entry for the default admin email
  IF NEW.email = 'admin@admin.com' THEN
    INSERT INTO public.admin_users (user_id, email, role, is_active)
    VALUES (NEW.id, NEW.email, 'admin', true);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create admin_users entry
DROP TRIGGER IF EXISTS on_auth_user_created_admin ON auth.users;
CREATE TRIGGER on_auth_user_created_admin
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_admin_user();

-- Also allow authenticated users to create packages (temporary for development)
CREATE POLICY "Authenticated users can create packages" 
ON public.packages 
FOR INSERT 
TO authenticated
WITH CHECK (true);

-- Allow authenticated users to view status configs
CREATE POLICY "Authenticated users can view status configs" 
ON public.status_configs 
FOR SELECT 
TO authenticated
USING (true);
