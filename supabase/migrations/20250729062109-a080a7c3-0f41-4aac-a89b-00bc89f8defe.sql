-- Corregir las funciones con search_path mutable
DROP FUNCTION IF EXISTS public.calculate_ranking_score;
DROP FUNCTION IF EXISTS public.update_professional_ranking;
DROP FUNCTION IF EXISTS public.calculate_commission;

-- Recrear las funciones con search_path seguro
CREATE OR REPLACE FUNCTION public.calculate_ranking_score(
  total_jobs INTEGER,
  avg_rating DECIMAL,
  total_reviews INTEGER,
  visibility DECIMAL,
  last_job_days_ago INTEGER
) RETURNS DECIMAL 
LANGUAGE plpgsql 
STABLE
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  RETURN (
    (total_jobs * 10) + 
    (avg_rating * 20) + 
    (total_reviews * 5) + 
    (visibility / 10) - 
    (GREATEST(last_job_days_ago, 0) * 0.5)
  );
END;
$$;

-- Función para actualizar ranking después de completar trabajo
CREATE OR REPLACE FUNCTION public.update_professional_ranking()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
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
$$;

-- Función para calcular comisión
CREATE OR REPLACE FUNCTION public.calculate_commission(
  service_amount DECIMAL,
  commission_rate DECIMAL DEFAULT 7.5
) RETURNS DECIMAL 
LANGUAGE plpgsql 
IMMUTABLE
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  RETURN ROUND(service_amount * (commission_rate / 100), 2);
END;
$$;