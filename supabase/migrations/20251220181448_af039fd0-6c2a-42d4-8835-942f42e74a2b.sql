-- 1. Odstrániť verejnú INSERT policy (už nie je potrebná - všetko ide cez edge function)
DROP POLICY IF EXISTS "Anyone can create bookings" ON public.bookings;

-- 2. Pridať database constraints pre validáciu
ALTER TABLE public.bookings 
ADD CONSTRAINT valid_passengers CHECK (passengers >= 1 AND passengers <= 20);

ALTER TABLE public.bookings 
ADD CONSTRAINT valid_email CHECK (customer_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

ALTER TABLE public.bookings 
ADD CONSTRAINT limit_name CHECK (length(customer_name) <= 100);

ALTER TABLE public.bookings 
ADD CONSTRAINT limit_phone CHECK (length(customer_phone) <= 20);

ALTER TABLE public.bookings 
ADD CONSTRAINT limit_email CHECK (length(customer_email) <= 255);

ALTER TABLE public.bookings 
ADD CONSTRAINT limit_pickup CHECK (length(pickup_location) <= 300);

ALTER TABLE public.bookings 
ADD CONSTRAINT limit_dropoff CHECK (length(dropoff_location) <= 300);