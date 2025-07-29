-- Crear buckets de almacenamiento para documentos de verificación
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('identity-documents', 'identity-documents', false, 52428800, ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf']),
  ('police-certificates', 'police-certificates', false, 52428800, ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf']);

-- Crear tabla para manejar las verificaciones de profesionales
CREATE TABLE public.professional_verifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  professional_id UUID NOT NULL REFERENCES public.professionals(id) ON DELETE CASCADE,
  
  -- Documentos cargados
  identity_document_url TEXT,
  police_certificate_url TEXT,
  
  -- Estados de verificación
  identity_verified BOOLEAN DEFAULT FALSE,
  police_verified BOOLEAN DEFAULT FALSE,
  overall_verified BOOLEAN DEFAULT FALSE,
  
  -- Información de verificación
  verified_by UUID REFERENCES auth.users(id),
  verified_at TIMESTAMP WITH TIME ZONE,
  rejection_reason TEXT,
  
  -- Notas internas
  admin_notes TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS en la tabla de verificaciones
ALTER TABLE public.professional_verifications ENABLE ROW LEVEL SECURITY;

-- Políticas para professional_verifications
-- Los profesionales pueden ver su propia verificación
CREATE POLICY "Professionals can view their own verification"
ON public.professional_verifications
FOR SELECT
USING (EXISTS (
  SELECT 1 FROM public.professionals 
  WHERE professionals.id = professional_verifications.professional_id 
  AND professionals.user_id = auth.uid()
));

-- Los profesionales pueden insertar su verificación inicial
CREATE POLICY "Professionals can insert their verification"
ON public.professional_verifications
FOR INSERT
WITH CHECK (EXISTS (
  SELECT 1 FROM public.professionals 
  WHERE professionals.id = professional_verifications.professional_id 
  AND professionals.user_id = auth.uid()
));

-- Solo admins pueden actualizar verificaciones (esto se implementará después)
CREATE POLICY "Only admins can update verifications"
ON public.professional_verifications
FOR UPDATE
USING (false); -- Por ahora bloqueado, se habilitará para admins

-- Políticas de Storage para documentos de identidad
CREATE POLICY "Professionals can upload identity documents"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'identity-documents' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Professionals can view their own identity documents"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'identity-documents' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Políticas de Storage para certificados policiales
CREATE POLICY "Professionals can upload police certificates"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'police-certificates' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Professionals can view their own police certificates"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'police-certificates' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Trigger para actualizar updated_at
CREATE TRIGGER update_professional_verifications_updated_at
  BEFORE UPDATE ON public.professional_verifications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Función para verificar si un profesional está completamente verificado
CREATE OR REPLACE FUNCTION public.is_professional_verified(prof_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
AS $$
  SELECT COALESCE(
    (SELECT overall_verified 
     FROM public.professional_verifications 
     WHERE professional_id = prof_id), 
    FALSE
  );
$$;