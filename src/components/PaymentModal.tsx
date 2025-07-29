import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CreditCard, Shield, Banknote } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const stripePromise = loadStripe("pk_test_51QNzq6FP5HMshyBkj8xYF7cVg7yZHf8YnA8C5Gj3NHN4Q5t7cUvDhKqNvL1vLfqNwP2LhBpTr8FtSmVcXhz0024L00i2Gm8BUO");

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: {
    id: string;
    total_price: number;
    professional: {
      full_name: string;
    };
  };
  onPaymentSuccess: () => void;
}

export const PaymentModal = ({ isOpen, onClose, booking, onPaymentSuccess }: PaymentModalProps) => {
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handlePayment = async () => {
    if (!paymentMethod) {
      toast({
        title: "Error",
        description: "Por favor selecciona un método de pago",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      if (paymentMethod === "direct_professional") {
        // Handle direct payment to professional
        onPaymentSuccess();
        onClose();
        toast({
          title: "Booking confirmado",
          description: "El profesional será notificado. Podrás coordinar el pago directamente.",
        });
        return;
      }

      // Handle Stripe payments
      const { data, error } = await supabase.functions.invoke('create-payment-intent', {
        body: {
          bookingId: booking.id,
          paymentMethod,
          totalAmount: booking.total_price,
          guaranteeAmount: 200,
        },
      });

      if (error) throw error;

      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe not loaded');

      const { error: stripeError } = await stripe.confirmPayment({
        clientSecret: data.client_secret,
        elements: null,
        confirmParams: {
          return_url: `${window.location.origin}/dashboard`,
        },
        redirect: 'if_required',
      });

      if (stripeError) {
        throw new Error(stripeError.message);
      }

      // Confirm payment completion
      await supabase.functions.invoke('confirm-payment', {
        body: {
          paymentIntentId: data.payment_intent_id,
        },
      });

      onPaymentSuccess();
      onClose();
      toast({
        title: "Pago exitoso",
        description: "Tu pago ha sido procesado correctamente",
      });
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Error en el pago",
        description: error.message || "Hubo un problema procesando tu pago",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Seleccionar método de pago</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            Servicio con {booking.professional.full_name}
            <br />
            Total: ${booking.total_price?.toFixed(2) || '0.00'} DOP
          </div>

          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <Card className="p-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="guarantee_only" id="guarantee" />
                <Label htmlFor="guarantee" className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">Garantía únicamente</div>
                      <div className="text-sm text-muted-foreground">
                        Pago de $200 DOP como garantía
                      </div>
                    </div>
                  </div>
                </Label>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="full_app_payment" id="full" />
                <Label htmlFor="full" className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">Pago completo en app</div>
                      <div className="text-sm text-muted-foreground">
                        Pago total de ${booking.total_price?.toFixed(2)} DOP
                      </div>
                    </div>
                  </div>
                </Label>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="direct_professional" id="direct" />
                <Label htmlFor="direct" className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Banknote className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">Pago directo al profesional</div>
                      <div className="text-sm text-muted-foreground">
                        Coordina el pago directamente
                      </div>
                    </div>
                  </div>
                </Label>
              </div>
            </Card>
          </RadioGroup>

          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button 
              onClick={handlePayment} 
              disabled={!paymentMethod || isProcessing}
              className="flex-1"
            >
              {isProcessing ? "Procesando..." : "Continuar"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};