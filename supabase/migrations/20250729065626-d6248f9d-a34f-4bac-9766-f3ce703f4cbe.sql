-- Add terms acceptance tracking to profiles and professionals tables
ALTER TABLE public.profiles 
ADD COLUMN terms_accepted boolean DEFAULT false,
ADD COLUMN terms_accepted_at timestamp with time zone;

ALTER TABLE public.professionals 
ADD COLUMN terms_accepted boolean DEFAULT false,
ADD COLUMN terms_accepted_at timestamp with time zone;