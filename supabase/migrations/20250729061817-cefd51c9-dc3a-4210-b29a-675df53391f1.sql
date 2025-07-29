-- Crear tabla para tracking de comisiones y trabajos completados
CREATE TABLE public.job_completions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
  professional_id UUID NOT NULL REFERENCES public.professionals(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  service_amount DECIMAL(10,2) NOT NULL,
  commission_rate DECIMAL(5,2) NOT NULL DEFAULT 7.5, -- 7.5% por defecto
  commission_amount DECIMAL(10,2) NOT NULL,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  verified_by_client BOOLEAN DEFAULT false,
  client_verification_at TIMESTAMPTZ,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed')),
  payment_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  -- Constraint para evitar duplicados
  UNIQUE(booking_id)
);

-- Crear tabla para servicios premium
CREATE TABLE public.premium_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  professional_id UUID NOT NULL REFERENCES public.professionals(id) ON DELETE CASCADE,
  service_type TEXT NOT NULL CHECK (service_type IN ('profile_promotion', 'urgent_service', 'supervision', 'advisor_chat')),
  price DECIMAL(10,2) NOT NULL,
  duration_days INTEGER, -- Para servicios con duración (como promoción por 7 días)
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'expired', 'cancelled')),
  purchased_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  -- Índice para consultas rápidas
  INDEX(professional_id, service_type, status)
);

-- Crear tabla para tracking de reputación
CREATE TABLE public.professional_rankings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  professional_id UUID NOT NULL REFERENCES public.professionals(id) ON DELETE CASCADE UNIQUE,
  total_jobs_completed INTEGER DEFAULT 0,
  total_revenue DECIMAL(12,2) DEFAULT 0,
  average_rating DECIMAL(3,2) DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  ranking_score DECIMAL(10,2) DEFAULT 0, -- Score calculado para el ranking
  last_job_completed_at TIMESTAMPTZ,
  visibility_score DECIMAL(10,2) DEFAULT 100, -- Puntuación de visibilidad (baja si evade el sistema)
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS en todas las tablas
ALTER TABLE public.job_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.premium_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.professional_rankings ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para job_completions
CREATE POLICY "Professionals can view their job completions" ON public.job_completions
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.professionals 
    WHERE professionals.id = job_completions.professional_id 
    AND professionals.user_id = auth.uid()
  )
);

CREATE POLICY "Users can view their job completions" ON public.job_completions
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Professionals can create job completions" ON public.job_completions
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.professionals 
    WHERE professionals.id = job_completions.professional_id 
    AND professionals.user_id = auth.uid()
  )
);

CREATE POLICY "Users can verify job completions" ON public.job_completions
FOR UPDATE USING (auth.uid() = user_id);

-- Políticas RLS para premium_services
CREATE POLICY "Professionals can manage their premium services" ON public.premium_services
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.professionals 
    WHERE professionals.id = premium_services.professional_id 
    AND professionals.user_id = auth.uid()
  )
);

-- Políticas RLS para professional_rankings
CREATE POLICY "Anyone can view professional rankings" ON public.professional_rankings
FOR SELECT USING (true);

CREATE POLICY "Professionals can view their own ranking" ON public.professional_rankings
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.professionals 
    WHERE professionals.id = professional_rankings.professional_id 
    AND professionals.user_id = auth.uid()
  )
);

-- Función para calcular el ranking score
CREATE OR REPLACE FUNCTION public.calculate_ranking_score(
  total_jobs INTEGER,
  avg_rating DECIMAL,
  total_reviews INTEGER,
  visibility DECIMAL,
  last_job_days_ago INTEGER
) RETURNS DECIMAL AS $$
BEGIN
  RETURN (
    (total_jobs * 10) + 
    (avg_rating * 20) + 
    (total_reviews * 5) + 
    (visibility / 10) - 
    (GREATEST(last_job_days_ago, 0) * 0.5)
  );
END;
$$ LANGUAGE plpgsql STABLE;

-- Función para actualizar ranking después de completar trabajo
CREATE OR REPLACE FUNCTION public.update_professional_ranking()
RETURNS TRIGGER AS $$
DECLARE
  prof_stats RECORD;
  new_score DECIMAL;
BEGIN
  -- Obtener estadísticas del profesional
  SELECT 
    COUNT(*) as jobs_count,
    SUM(jc.service_amount) as total_revenue,
    AVG(r.rating) as avg_rating,
    COUNT(r.id) as review_count
  INTO prof_stats
  FROM public.job_completions jc
  LEFT JOIN public.reviews r ON r.professional_id = jc.professional_id
  WHERE jc.professional_id = NEW.professional_id;
  
  -- Calcular nuevo score
  new_score := public.calculate_ranking_score(
    prof_stats.jobs_count,
    COALESCE(prof_stats.avg_rating, 0),
    prof_stats.review_count,
    100, -- visibilidad por defecto
    EXTRACT(days FROM (now() - NEW.completed_at))::INTEGER
  );
  
  -- Actualizar o insertar ranking
  INSERT INTO public.professional_rankings (
    professional_id,
    total_jobs_completed,
    total_revenue,
    average_rating,
    total_reviews,
    ranking_score,
    last_job_completed_at
  ) VALUES (
    NEW.professional_id,
    prof_stats.jobs_count,
    COALESCE(prof_stats.total_revenue, 0),
    COALESCE(prof_stats.avg_rating, 0),
    prof_stats.review_count,
    new_score,
    NEW.completed_at
  )
  ON CONFLICT (professional_id) DO UPDATE SET
    total_jobs_completed = prof_stats.jobs_count,
    total_revenue = COALESCE(prof_stats.total_revenue, 0),
    average_rating = COALESCE(prof_stats.avg_rating, 0),
    total_reviews = prof_stats.review_count,
    ranking_score = new_score,
    last_job_completed_at = NEW.completed_at,
    updated_at = now();
    
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar ranking automáticamente
CREATE TRIGGER update_ranking_on_job_completion
  AFTER INSERT ON public.job_completions
  FOR EACH ROW EXECUTE FUNCTION public.update_professional_ranking();

-- Trigger para actualizar timestamps
CREATE TRIGGER update_job_completions_updated_at
  BEFORE UPDATE ON public.job_completions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Función para calcular comisión
CREATE OR REPLACE FUNCTION public.calculate_commission(
  service_amount DECIMAL,
  commission_rate DECIMAL DEFAULT 7.5
) RETURNS DECIMAL AS $$
BEGIN
  RETURN ROUND(service_amount * (commission_rate / 100), 2);
END;
$$ LANGUAGE plpgsql IMMUTABLE;