import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { CalendarIcon, MapPin, Clock, DollarSign, ArrowLeft } from "lucide-react";
import { PaymentModal } from "@/components/PaymentModal";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface Professional {
  id: string;
  full_name: string;
  city: string;
  hourly_rate: number;
  experience_years: number;
  description: string;
}

const BookService = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<Date>();
  
  // Form state
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedProfessional, setSelectedProfessional] = useState<string>("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [estimatedHours, setEstimatedHours] = useState("");
  
  // Payment modal state
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [createdBooking, setCreatedBooking] = useState<any>(null);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchCategories();
  }, [user, navigate]);

  useEffect(() => {
    if (selectedCategory) {
      fetchProfessionalsByCategory(selectedCategory);
    }
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('service_categories')
        .select('*')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar las categorías de servicios",
        variant: "destructive",
      });
    }
  };

  const fetchProfessionalsByCategory = async (categoryId: string) => {
    try {
      const { data, error } = await supabase
        .from('professional_services')
        .select(`
          professional_id,
          professionals (
            id,
            full_name,
            city,
            hourly_rate,
            experience_years,
            description
          )
        `)
        .eq('category_id', categoryId);

      if (error) throw error;
      
      const uniqueProfessionals = data?.reduce((acc: Professional[], item) => {
        const prof = item.professionals as unknown as Professional;
        if (prof && !acc.find(p => p.id === prof.id)) {
          acc.push(prof);
        }
        return acc;
      }, []) || [];

      setProfessionals(uniqueProfessionals);
    } catch (error) {
      console.error('Error fetching professionals:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los profesionales",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Error",
        description: "Debes iniciar sesión para solicitar un servicio",
        variant: "destructive",
      });
      return;
    }

    if (!selectedProfessional || !title || !address || !city || !phone || !date) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const selectedProf = professionals.find(p => p.id === selectedProfessional);
      const totalPrice = selectedProf?.hourly_rate && estimatedHours 
        ? selectedProf.hourly_rate * parseFloat(estimatedHours)
        : null;

      const { data, error } = await supabase
        .from('bookings')
        .insert({
          user_id: user.id,
          professional_id: selectedProfessional,
          service_id: selectedCategory,
          title,
          description,
          address,
          city,
          phone,
          scheduled_date: date.toISOString(),
          estimated_hours: estimatedHours ? parseFloat(estimatedHours) : null,
          total_price: totalPrice,
          status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;

      // Set created booking and show payment modal
      setCreatedBooking({
        ...data,
        professional: selectedProf
      });
      setShowPaymentModal(true);
    } catch (error) {
      console.error('Error creating booking:', error);
      toast({
        title: "Error",
        description: "No se pudo enviar la solicitud. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    toast({
      title: "Booking confirmado",
      description: "Tu solicitud ha sido procesada exitosamente",
    });
    navigate('/dashboard');
  };

  const selectedProf = professionals.find(p => p.id === selectedProfessional);
  const estimatedCost = selectedProf?.hourly_rate && estimatedHours 
    ? selectedProf.hourly_rate * parseFloat(estimatedHours)
    : null;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Solicitar Servicio
          </h1>
          <p className="text-muted-foreground">
            Completa el formulario para solicitar un servicio profesional
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Service Category */}
              <Card>
                <CardHeader>
                  <CardTitle>Tipo de Servicio</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="category">Categoría del servicio *</Label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            <div className="flex items-center gap-2">
                              <span>{category.icon}</span>
                              <span>{category.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedCategory && professionals.length > 0 && (
                    <div>
                      <Label htmlFor="professional">Profesional *</Label>
                      <Select value={selectedProfessional} onValueChange={setSelectedProfessional}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un profesional" />
                        </SelectTrigger>
                        <SelectContent>
                          {professionals.map((prof) => (
                            <SelectItem key={prof.id} value={prof.id}>
                              <div className="flex flex-col">
                                <span className="font-medium">{prof.full_name}</span>
                                <span className="text-sm text-muted-foreground">
                                  {prof.city} • {prof.experience_years} años • RD${prof.hourly_rate?.toLocaleString()}/hora
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Service Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Detalles del Servicio</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Título del servicio *</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Ej: Reparación de grifo en cocina"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Descripción detallada</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe el trabajo que necesitas..."
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="estimatedHours">Horas estimadas</Label>
                      <Input
                        id="estimatedHours"
                        type="number"
                        step="0.5"
                        min="0.5"
                        value={estimatedHours}
                        onChange={(e) => setEstimatedHours(e.target.value)}
                        placeholder="2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="date">Fecha preferida *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP", { locale: es }) : "Seleccionar fecha"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact & Location */}
              <Card>
                <CardHeader>
                  <CardTitle>Ubicación y Contacto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="address">Dirección *</Label>
                    <Input
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Calle 123 #45-67"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">Ciudad *</Label>
                      <Input
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Santo Domingo"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Teléfono *</Label>
                      <Input
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 809 123 4567"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Resumen</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedProf && (
                    <>
                      <div className="space-y-2">
                        <h4 className="font-medium">{selectedProf.full_name}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{selectedProf.city}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{selectedProf.experience_years} años de experiencia</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <DollarSign className="h-4 w-4" />
                          <span>RD${selectedProf.hourly_rate?.toLocaleString()}/hora</span>
                        </div>
                      </div>

                      {estimatedCost && (
                        <div className="border-t pt-4">
                          <div className="flex justify-between">
                            <span className="text-sm">Costo estimado:</span>
                            <span className="font-medium">RD${estimatedCost.toLocaleString()}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            * Precio aproximado basado en {estimatedHours} horas
                          </p>
                        </div>
                      )}
                    </>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={loading || !selectedProfessional}
                  >
                    {loading ? "Enviando..." : "Solicitar Servicio"}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Al solicitar el servicio, el profesional se pondrá en contacto contigo para confirmar detalles.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>

        {createdBooking && (
          <PaymentModal
            isOpen={showPaymentModal}
            onClose={() => setShowPaymentModal(false)}
            booking={createdBooking}
            onPaymentSuccess={handlePaymentSuccess}
          />
        )}
      </div>
    </div>
  );
};

export default BookService;