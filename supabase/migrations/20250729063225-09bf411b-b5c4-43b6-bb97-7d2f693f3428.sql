-- Sistema de Cobro Doméstiko: Tablas para métodos de pago y comisiones

-- Enum para métodos de pago
CREATE TYPE payment_method_type AS ENUM ('direct_payment', 'guarantee_payment', 'full_app_payment');

-- Enum para estados de transacciones
CREATE TYPE transaction_status AS ENUM ('pending', 'completed', 'failed', 'refunded');

-- Tabla para métodos de pago por booking
CREATE TABLE public.booking_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
  payment_method payment_method_type NOT NULL,
  guarantee_amount NUMERIC DEFAULT 200, -- Monto de garantía por defecto RD$200
  total_amount NUMERIC NOT NULL,
  stripe_payment_intent_id TEXT, -- Para pagos procesados por Stripe
  payment_status transaction_status DEFAULT 'pending',
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tabla para tarjetas de pago de profesionales
CREATE TABLE public.professional_payment_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  professional_id UUID NOT NULL REFERENCES public.professionals(id) ON DELETE CASCADE,
  stripe_customer_id TEXT NOT NULL,
  stripe_payment_method_id TEXT NOT NULL,
  card_last_four TEXT NOT NULL,
  card_brand TEXT NOT NULL,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(professional_id, stripe_payment_method_id)
);

-- Tabla para transacciones de pago
CREATE TABLE public.payment_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_payment_id UUID NOT NULL REFERENCES public.booking_payments(id) ON DELETE CASCADE,
  stripe_payment_intent_id TEXT,
  amount NUMERIC NOT NULL,
  currency TEXT DEFAULT 'DOP',
  transaction_type TEXT NOT NULL, -- 'customer_payment', 'commission_charge', 'professional_payout'
  status transaction_status DEFAULT 'pending',
  stripe_fee NUMERIC DEFAULT 0,
  processed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tabla para cobros de comisión a profesionales
CREATE TABLE public.commission_charges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  professional_id UUID NOT NULL REFERENCES public.professionals(id) ON DELETE CASCADE,
  booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
  commission_amount NUMERIC NOT NULL,
  commission_rate NUMERIC NOT NULL DEFAULT 7.5,
  payment_method_id UUID REFERENCES public.professional_payment_cards(id),
  charge_status transaction_status DEFAULT 'pending',
  stripe_charge_id TEXT,
  charged_at TIMESTAMPTZ,
  retry_count INTEGER DEFAULT 0,
  last_retry_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tabla para transferencias a profesionales
CREATE TABLE public.professional_payouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  professional_id UUID NOT NULL REFERENCES public.professionals(id) ON DELETE CASCADE,
  booking_payment_id UUID NOT NULL REFERENCES public.booking_payments(id) ON DELETE CASCADE,
  gross_amount NUMERIC NOT NULL, -- Monto total pagado por cliente
  commission_amount NUMERIC NOT NULL, -- Comisión de Doméstiko
  net_amount NUMERIC NOT NULL, -- Monto que recibe el profesional
  payment_method_id UUID REFERENCES public.professional_payment_cards(id),
  payout_status transaction_status DEFAULT 'pending',
  stripe_transfer_id TEXT,
  transferred_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Habilitar RLS en todas las tablas
ALTER TABLE public.booking_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.professional_payment_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commission_charges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.professional_payouts ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para booking_payments
CREATE POLICY "Users can view their booking payments" ON public.booking_payments
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.bookings 
    WHERE bookings.id = booking_payments.booking_id 
    AND bookings.user_id = auth.uid()
  )
);

CREATE POLICY "Professionals can view payments for their bookings" ON public.booking_payments
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.bookings b
    JOIN public.professionals p ON p.id = b.professional_id
    WHERE b.id = booking_payments.booking_id 
    AND p.user_id = auth.uid()
  )
);

CREATE POLICY "Users can insert payment for their bookings" ON public.booking_payments
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.bookings 
    WHERE bookings.id = booking_payments.booking_id 
    AND bookings.user_id = auth.uid()
  )
);

-- Políticas RLS para professional_payment_cards
CREATE POLICY "Professionals can manage their payment cards" ON public.professional_payment_cards
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.professionals 
    WHERE professionals.id = professional_payment_cards.professional_id 
    AND professionals.user_id = auth.uid()
  )
);

-- Políticas RLS para payment_transactions
CREATE POLICY "Users can view transactions for their bookings" ON public.payment_transactions
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.booking_payments bp
    JOIN public.bookings b ON b.id = bp.booking_id
    WHERE bp.id = payment_transactions.booking_payment_id 
    AND b.user_id = auth.uid()
  )
);

CREATE POLICY "Professionals can view transactions for their bookings" ON public.payment_transactions
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.booking_payments bp
    JOIN public.bookings b ON b.id = bp.booking_id
    JOIN public.professionals p ON p.id = b.professional_id
    WHERE bp.id = payment_transactions.booking_payment_id 
    AND p.user_id = auth.uid()
  )
);

-- Políticas RLS para commission_charges
CREATE POLICY "Professionals can view their commission charges" ON public.commission_charges
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.professionals 
    WHERE professionals.id = commission_charges.professional_id 
    AND professionals.user_id = auth.uid()
  )
);

-- Políticas RLS para professional_payouts
CREATE POLICY "Professionals can view their payouts" ON public.professional_payouts
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.professionals 
    WHERE professionals.id = professional_payouts.professional_id 
    AND professionals.user_id = auth.uid()
  )
);

-- Triggers para actualizar updated_at
CREATE TRIGGER update_booking_payments_updated_at
  BEFORE UPDATE ON public.booking_payments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_professional_payment_cards_updated_at
  BEFORE UPDATE ON public.professional_payment_cards
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_payment_transactions_updated_at
  BEFORE UPDATE ON public.payment_transactions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_commission_charges_updated_at
  BEFORE UPDATE ON public.commission_charges
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_professional_payouts_updated_at
  BEFORE UPDATE ON public.professional_payouts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Función para procesar comisión automáticamente cuando un trabajo se completa
CREATE OR REPLACE FUNCTION public.process_commission_on_completion()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  booking_payment_rec RECORD;
  commission_amount DECIMAL;
BEGIN
  -- Obtener información del pago del booking
  SELECT bp.*, b.total_price
  INTO booking_payment_rec
  FROM public.booking_payments bp
  JOIN public.bookings b ON b.id = bp.booking_id
  WHERE bp.booking_id = NEW.booking_id;
  
  -- Solo procesar si hay un pago registrado
  IF booking_payment_rec.id IS NOT NULL THEN
    -- Calcular comisión
    commission_amount := public.calculate_commission(
      COALESCE(booking_payment_rec.total_amount, NEW.service_amount)
    );
    
    -- Insertar registro de comisión pendiente
    INSERT INTO public.commission_charges (
      professional_id,
      booking_id,
      commission_amount,
      commission_rate,
      charge_status
    ) VALUES (
      NEW.professional_id,
      NEW.booking_id,
      commission_amount,
      7.5,
      'pending'
    );
    
    -- Si fue pago completo en app, crear payout pendiente
    IF booking_payment_rec.payment_method = 'full_app_payment' 
       AND booking_payment_rec.payment_status = 'completed' THEN
      INSERT INTO public.professional_payouts (
        professional_id,
        booking_payment_id,
        gross_amount,
        commission_amount,
        net_amount,
        payout_status
      ) VALUES (
        NEW.professional_id,
        booking_payment_rec.id,
        booking_payment_rec.total_amount,
        commission_amount,
        booking_payment_rec.total_amount - commission_amount,
        'pending'
      );
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Trigger para procesar comisión cuando se completa un trabajo
CREATE TRIGGER process_commission_on_job_completion
  AFTER INSERT ON public.job_completions
  FOR EACH ROW EXECUTE FUNCTION public.process_commission_on_completion();