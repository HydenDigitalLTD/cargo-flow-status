-- Temporarily allow package creation for development
-- We'll add proper authentication later

-- Allow anonymous users to create packages temporarily
CREATE POLICY "Allow anonymous package creation (temporary)" 
ON public.packages 
FOR INSERT 
TO anon
WITH CHECK (true);

-- Also allow anonymous users to view packages for the admin panel
CREATE POLICY "Allow anonymous package viewing (temporary)" 
ON public.packages 
FOR SELECT 
TO anon
USING (true);

-- Allow anonymous users to view status configs
CREATE POLICY "Allow anonymous status config viewing (temporary)" 
ON public.status_configs 
FOR SELECT 
TO anon
USING (true);