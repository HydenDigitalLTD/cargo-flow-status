-- Create default admin user properly using Supabase auth functions
-- First, let's create the user through the admin functions

-- Check if admin user already exists, if not create one
DO $$
DECLARE
    admin_user_id uuid;
BEGIN
    -- Check if admin user exists
    SELECT id INTO admin_user_id 
    FROM auth.users 
    WHERE email = 'admin@admin.com';
    
    -- If user doesn't exist, we'll rely on the signup process
    -- But let's make sure we have the proper setup for profiles
    IF admin_user_id IS NULL THEN
        -- We'll create this through the frontend signup process
        -- Just ensure the profiles trigger works correctly
        RAISE NOTICE 'Admin user will be created through signup process';
    ELSE
        -- Ensure the profile exists
        INSERT INTO public.profiles (id, email, role)
        VALUES (admin_user_id, 'admin@admin.com', 'admin')
        ON CONFLICT (id) DO UPDATE SET
            email = EXCLUDED.email,
            role = EXCLUDED.role;
    END IF;
END $$;