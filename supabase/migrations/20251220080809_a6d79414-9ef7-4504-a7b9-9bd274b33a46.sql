-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Service role can read all bookings" ON public.bookings;
DROP POLICY IF EXISTS "Service role can update bookings" ON public.bookings;
DROP POLICY IF EXISTS "Service role can delete bookings" ON public.bookings;

-- Allow authenticated users to view their own bookings (by email match)
CREATE POLICY "Users can view their own bookings"
ON public.bookings
FOR SELECT
USING (
  auth.jwt() ->> 'email' = customer_email
  OR auth.role() = 'service_role'
);

-- Allow authenticated users to update their own bookings
CREATE POLICY "Users can update their own bookings"
ON public.bookings
FOR UPDATE
USING (
  auth.jwt() ->> 'email' = customer_email
  OR auth.role() = 'service_role'
)
WITH CHECK (
  auth.jwt() ->> 'email' = customer_email
  OR auth.role() = 'service_role'
);

-- Allow service role to delete bookings
CREATE POLICY "Service role can delete bookings"
ON public.bookings
FOR DELETE
USING (auth.role() = 'service_role');