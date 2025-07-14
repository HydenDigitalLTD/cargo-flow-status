-- Remove temporary policies and set up proper authentication
DROP POLICY IF EXISTS "Allow anonymous package creation (temporary)" ON public.packages;
DROP POLICY IF EXISTS "Allow anonymous package viewing (temporary)" ON public.packages;
DROP POLICY IF EXISTS "Allow anonymous status config viewing (temporary)" ON public.status_configs;

-- Create a profiles table for additional user info
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  PRIMARY KEY (id)
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check if user is authenticated admin
CREATE OR REPLACE FUNCTION public.is_authenticated_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN auth.uid() IS NOT NULL AND EXISTS (
    SELECT 1 
    FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Create profile policies
CREATE POLICY "Users can view own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (NEW.id, NEW.email, 'admin');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update admin_users policies to use new function
DROP POLICY IF EXISTS "Admins can view admin users" ON public.admin_users;
DROP POLICY IF EXISTS "Admins can insert admin users" ON public.admin_users;
DROP POLICY IF EXISTS "Admins can update admin users" ON public.admin_users;
DROP POLICY IF EXISTS "Admins can delete admin users" ON public.admin_users;

CREATE POLICY "Authenticated admins can manage admin users" 
ON public.admin_users 
FOR ALL 
USING (public.is_authenticated_admin());

-- Update packages policies
DROP POLICY IF EXISTS "Admins can manage packages" ON public.packages;
CREATE POLICY "Authenticated admins can manage packages" 
ON public.packages 
FOR ALL 
USING (public.is_authenticated_admin());

-- Update package_status_history policies
DROP POLICY IF EXISTS "Admins can manage status history" ON public.package_status_history;
CREATE POLICY "Authenticated admins can manage status history" 
ON public.package_status_history 
FOR ALL 
USING (public.is_authenticated_admin());

-- Update status_configs policies
DROP POLICY IF EXISTS "Admins can manage status configs" ON public.status_configs;
CREATE POLICY "Authenticated admins can manage status configs" 
ON public.status_configs 
FOR ALL 
USING (public.is_authenticated_admin());

-- Add timestamp trigger for profiles
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();