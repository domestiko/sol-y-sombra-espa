-- Add professional certification fields to professional_verifications table
ALTER TABLE public.professional_verifications 
ADD COLUMN professional_certificate_url text,
ADD COLUMN professional_certified boolean DEFAULT false;

-- Create storage bucket for professional certificates
INSERT INTO storage.buckets (id, name, public) 
VALUES ('professional-certificates', 'professional-certificates', false);

-- Create storage policies for professional certificates
CREATE POLICY "Professionals can upload their own certificates" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'professional-certificates' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Professionals can view their own certificates" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'professional-certificates' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Professionals can update their own certificates" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'professional-certificates' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Professionals can delete their own certificates" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'professional-certificates' AND auth.uid()::text = (storage.foldername(name))[1]);