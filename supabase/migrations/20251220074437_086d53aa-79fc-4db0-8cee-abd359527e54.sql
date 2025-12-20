-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can create bookings" ON public.bookings;
DROP POLICY IF EXISTS "Service role can manage all bookings" ON public.bookings;

-- Create proper RLS policies

-- Allow anyone to create bookings (for public booking form)
CREATE POLICY "Anyone can create bookings"
ON public.bookings
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only service role can read all bookings (protects customer data)
CREATE POLICY "Service role can read all bookings"
ON public.bookings
FOR SELECT
TO service_role
USING (true);

-- Only service role can update bookings
CREATE POLICY "Service role can update bookings"
ON public.bookings
FOR UPDATE
TO service_role
USING (true)
WITH CHECK (true);

-- Only service role can delete bookings
CREATE POLICY "Service role can delete bookings"
ON public.bookings
FOR DELETE
TO service_role
USING (true);