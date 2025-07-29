import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    });

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    );

    const authHeader = req.headers.get('Authorization')!;
    const token = authHeader.replace('Bearer ', '');
    const { data: { user } } = await supabase.auth.getUser(token);

    if (!user) {
      throw new Error('Usuario no autenticado');
    }

    const { bookingId, paymentMethod, totalAmount, guaranteeAmount } = await req.json();

    // Get booking details
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', bookingId)
      .eq('user_id', user.id)
      .single();

    if (bookingError || !booking) {
      throw new Error('Booking no encontrado');
    }

    let amount = 0;
    let description = '';

    if (paymentMethod === 'guarantee_only') {
      amount = Math.round((guaranteeAmount || 200) * 100); // Convert to cents
      description = 'Garantía de servicio';
    } else if (paymentMethod === 'full_app_payment') {
      amount = Math.round(totalAmount * 100); // Convert to cents
      description = 'Pago completo del servicio';
    } else {
      throw new Error('Método de pago no válido');
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'dop',
      metadata: {
        booking_id: bookingId,
        user_id: user.id,
        payment_method: paymentMethod,
      },
    });

    // Record payment in database
    const { error: paymentError } = await supabase
      .from('booking_payments')
      .insert({
        booking_id: bookingId,
        payment_method: paymentMethod,
        total_amount: amount / 100,
        guarantee_amount: paymentMethod === 'guarantee_only' ? amount / 100 : null,
        stripe_payment_intent_id: paymentIntent.id,
        payment_status: 'pending',
      });

    if (paymentError) {
      console.error('Error recording payment:', paymentError);
      throw new Error('Error al registrar el pago');
    }

    return new Response(
      JSON.stringify({
        client_secret: paymentIntent.client_secret,
        payment_intent_id: paymentIntent.id,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});