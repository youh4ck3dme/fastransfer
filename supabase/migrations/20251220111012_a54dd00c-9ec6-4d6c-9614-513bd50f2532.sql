-- Drop existing SELECT policy that allows users to see bookings by email matching
DROP POLICY IF EXISTS "Users can view their own bookings" ON public.bookings;

-- Drop existing UPDATE policy
DROP POLICY IF EXISTS "Users can update their own bookings" ON public.bookings;

-- Create new SELECT policy - only service_role (admin) can view all bookings
CREATE POLICY "Only admins can view bookings" 
ON public.bookings 
FOR SELECT 
USING (auth.role() = 'service_role');

-- Create new UPDATE policy - only service_role (admin) can update bookings
CREATE POLICY "Only admins can update bookings" 
ON public.bookings 
FOR UPDATE 
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');