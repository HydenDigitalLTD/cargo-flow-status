-- Create enum for package status
CREATE TYPE public.package_status AS ENUM (
  'registered',
  'ready_for_pickup',
  'in_transit',
  'out_for_delivery',
  'delivered',
  'failed_delivery',
  'returned'
);

-- Create table for status configurations (admin can set timing)
CREATE TABLE public.status_configs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  status package_status NOT NULL UNIQUE,
  hours_after_previous INTEGER NOT NULL DEFAULT 0,
  display_name TEXT NOT NULL,
  description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create packages table
CREATE TABLE public.packages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tracking_number TEXT NOT NULL UNIQUE,
  sender_name TEXT,
  sender_address TEXT,
  sender_phone TEXT,
  recipient_name TEXT NOT NULL,
  recipient_address TEXT NOT NULL,
  recipient_phone TEXT,
  weight DECIMAL(10,2),
  dimensions TEXT,
  service_type TEXT,
  current_status package_status NOT NULL DEFAULT 'registered',
  woocommerce_order_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create package status history table
CREATE TABLE public.package_status_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  package_id UUID NOT NULL REFERENCES public.packages(id) ON DELETE CASCADE,
  status package_status NOT NULL,
  location TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create admin users table for authentication
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.status_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.package_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for public access to tracking (read-only)
CREATE POLICY "Anyone can view packages for tracking" 
ON public.packages 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can view package status history" 
ON public.package_status_history 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can view status configs" 
ON public.status_configs 
FOR SELECT 
USING (true);

-- Create policies for admin access
CREATE POLICY "Admins can manage packages" 
ON public.packages 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() AND is_active = true
  )
);

CREATE POLICY "Admins can manage status history" 
ON public.package_status_history 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() AND is_active = true
  )
);

CREATE POLICY "Admins can manage status configs" 
ON public.status_configs 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() AND is_active = true
  )
);

CREATE POLICY "Admins can view admin users" 
ON public.admin_users 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() AND is_active = true
  )
);

-- Insert default status configurations
INSERT INTO public.status_configs (status, hours_after_previous, display_name, description) VALUES
('registered', 0, 'Package Registered', 'Package has been registered in our system'),
('ready_for_pickup', 5, 'Ready for Pickup', 'Package is ready to be picked up from sender'),
('in_transit', 24, 'In Transit', 'Package is on its way to destination'),
('out_for_delivery', 48, 'Out for Delivery', 'Package is out for delivery to recipient'),
('delivered', 72, 'Delivered', 'Package has been successfully delivered'),
('failed_delivery', 72, 'Failed Delivery', 'Delivery attempt failed'),
('returned', 168, 'Returned', 'Package has been returned to sender');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_packages_updated_at
  BEFORE UPDATE ON public.packages
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_status_configs_updated_at
  BEFORE UPDATE ON public.status_configs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON public.admin_users
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to automatically update package status based on time
CREATE OR REPLACE FUNCTION public.auto_update_package_status()
RETURNS void AS $$
DECLARE
  pkg RECORD;
  next_status package_status;
  config RECORD;
BEGIN
  FOR pkg IN 
    SELECT p.*, 
           EXTRACT(EPOCH FROM (now() - p.created_at))/3600 as hours_since_created
    FROM public.packages p
    WHERE p.current_status != 'delivered' 
      AND p.current_status != 'returned'
      AND p.current_status != 'failed_delivery'
  LOOP
    -- Get next status based on time elapsed
    SELECT sc.status, sc.hours_after_previous
    INTO config
    FROM public.status_configs sc
    WHERE sc.hours_after_previous <= pkg.hours_since_created
      AND sc.is_active = true
      AND sc.status != pkg.current_status
    ORDER BY sc.hours_after_previous DESC
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
$$ LANGUAGE plpgsql;