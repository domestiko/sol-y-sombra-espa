import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { 
  User, 
  Phone, 
  MapPin, 
  Briefcase,
  DollarSign,
  Star,
  ArrowLeft,
  CheckCircle,
  Upload,
  FileText,
  Shield,
  AlertCircle
} from "lucide-react";

interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface ProfessionalService {
  categoryId: string;
  title: string;
  description: string;
  priceMin: string;
  priceMax: string;
}

const RegisterProfessional = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Professional profile data
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [experienceYears, setExperienceYears] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");

  // Services data
  const [selectedServices, setSelectedServices] = useState<ProfessionalService[]>([]);
  const [currentService, setCurrentService] = useState<ProfessionalService>({
    categoryId: "",
    title: "",
    description: "",
    priceMin: "",
    priceMax: ""
  });

  // Verification documents
  const [identityDocument, setIdentityDocument] = useState<File | null>(null);
  const [policeCertificate, setPoliceCertificate] = useState<File | null>(null);
  const [professionalCertificate, setProfessionalCertificate] = useState<File | null>(null);
  const [uploadingDocs, setUploadingDocs] = useState(false);

  useEffect(() => {
    if (!user) {
      toast({
        title: "Acceso restringido",
        description: "Debes iniciar sesión para registrarte como profesional",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }
    
    // Pre-fill email from user
    setEmail(user.email || "");
    fetchCategories();
  }, [user, navigate, toast]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const addService = () => {
    if (!currentService.categoryId || !currentService.title || !currentService.priceMin) {
      toast({
        title: "Error",
        description: "Completa todos los campos obligatorios del servicio",
        variant: "destructive",
      });
      return;
    }

    setSelectedServices([...selectedServices, currentService]);
    setCurrentService({
      categoryId: "",
      title: "",
      description: "",
      priceMin: "",
      priceMax: ""
    });

    toast({
      title: "Servicio agregado",
      description: "El servicio se agregó a tu lista",
    });
  };

  const removeService = (index: number) => {
    setSelectedServices(selectedServices.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;

    if (!fullName || !phone || !city || !description || !experienceYears || !hourlyRate) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive",
      });
      return;
    }

    if (selectedServices.length === 0) {
      toast({
        title: "Error",
        description: "Debes agregar al menos un servicio",
        variant: "destructive",
      });
      return;
    }

    if (!identityDocument || !policeCertificate) {
      toast({
        title: "Documentos requeridos",
        description: "Debes cargar tanto el documento de identidad como la carta de buena conducta",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    try {
      // 1. Create professional profile
      const { data: professional, error: professionalError } = await supabase
        .from('professionals')
        .insert({
          user_id: user.id,
          full_name: fullName,
          email: email,
          phone: phone,
          city: city,
          description: description,
          experience_years: parseInt(experienceYears),
          hourly_rate: parseFloat(hourlyRate),
          verified: false, // Will be reviewed by admin
          available: true
        })
        .select()
        .single();

      if (professionalError) throw professionalError;

      // 2. Upload verification documents
      const documentUrls = await uploadVerificationDocuments(professional.id);

      // 3. Create professional services
      const services = selectedServices.map(service => ({
        professional_id: professional.id,
        category_id: service.categoryId,
        title: service.title,
        description: service.description,
        price_min: parseFloat(service.priceMin),
        price_max: service.priceMax ? parseFloat(service.priceMax) : null
      }));

      const { error: servicesError } = await supabase
        .from('professional_services')
        .insert(services);

      if (servicesError) throw servicesError;

      // 4. Create verification record
      const { error: verificationError } = await supabase
        .from('professional_verifications')
        .insert({
          professional_id: professional.id,
          identity_document_url: documentUrls.identityUrl,
          police_certificate_url: documentUrls.policeUrl,
          professional_certificate_url: documentUrls.professionalCertificateUrl,
          identity_verified: false,
          police_verified: false,
          professional_certified: documentUrls.professionalCertificateUrl ? false : null,
          overall_verified: false
        });

      if (verificationError) throw verificationError;

      toast({
        title: "¡Registro exitoso!",
        description: "Tu solicitud y documentos han sido enviados para verificación. Te contactaremos pronto.",
      });

      navigate('/dashboard');

    } catch (error: any) {
      console.error('Error registering professional:', error);
      
      if (error.message?.includes('duplicate key')) {
        toast({
          title: "Ya eres profesional",
          description: "Ya tienes un perfil profesional registrado",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "No se pudo completar el registro. Inténtalo de nuevo.",
          variant: "destructive",
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const uploadVerificationDocuments = async (professionalId: string) => {
    if (!identityDocument || !policeCertificate) {
      throw new Error("Documents are required");
    }

    setUploadingDocs(true);

    try {
      // Upload identity document
      const identityFileName = `${user?.id}/identity-${Date.now()}.${identityDocument.name.split('.').pop()}`;
      const { data: identityData, error: identityError } = await supabase.storage
        .from('identity-documents')
        .upload(identityFileName, identityDocument);

      if (identityError) throw identityError;

      // Upload police certificate
      const policeFileName = `${user?.id}/police-${Date.now()}.${policeCertificate.name.split('.').pop()}`;
      const { data: policeData, error: policeError } = await supabase.storage
        .from('police-certificates')
        .upload(policeFileName, policeCertificate);

      if (policeError) throw policeError;

      // Upload professional certificate (optional)
      let professionalCertificateUrl = null;
      if (professionalCertificate) {
        const professionalFileName = `${user?.id}/professional-${Date.now()}.${professionalCertificate.name.split('.').pop()}`;
        const { data: professionalData, error: professionalError } = await supabase.storage
          .from('professional-certificates')
          .upload(professionalFileName, professionalCertificate);

        if (professionalError) throw professionalError;
        professionalCertificateUrl = professionalData.path;
      }

      return {
        identityUrl: identityData.path,
        policeUrl: policeData.path,
        professionalCertificateUrl
      };
    } finally {
      setUploadingDocs(false);
    }
  };

  const handleFileChange = (file: File | null, type: 'identity' | 'police' | 'professional') => {
    if (file) {
      // Validate file size (50MB max)
      if (file.size > 50 * 1024 * 1024) {
        toast({
          title: "Archivo muy grande",
          description: "El archivo no puede superar los 50MB",
          variant: "destructive",
        });
        return;
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Tipo de archivo inválido",
          description: "Solo se permiten imágenes (JPG, PNG, WebP) y PDF",
          variant: "destructive",
        });
        return;
      }

      if (type === 'identity') {
        setIdentityDocument(file);
      } else if (type === 'police') {
        setPoliceCertificate(file);
      } else if (type === 'professional') {
        setProfessionalCertificate(file);
      }

      toast({
        title: "Archivo cargado",
        description: `${file.name} ha sido seleccionado correctamente`,
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando formulario...</p>
        </div>
      </div>
    );
  }

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? `${category.icon} ${category.name}` : categoryId;
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Únete como Profesional
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comparte tus habilidades y haz crecer tu negocio conectando con familias que necesitan tus servicios
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Información Personal
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Nombre completo *</Label>
                      <Input
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Juan Pérez"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="juan@email.com"
                        required
                        disabled
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Teléfono *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+1 809 123 4567"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="city">Ciudad *</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="city"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="Santo Domingo"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Descripción profesional *</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe tu experiencia, especialidades y por qué los clientes deberían elegirte..."
                      rows={4}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="experienceYears">Años de experiencia *</Label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="experienceYears"
                          type="number"
                          min="0"
                          max="50"
                          value={experienceYears}
                          onChange={(e) => setExperienceYears(e.target.value)}
                          placeholder="5"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="hourlyRate">Tarifa por hora (RD$) *</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="hourlyRate"
                          type="number"
                          min="500"
                           step="50"
                          value={hourlyRate}
                          onChange={(e) => setHourlyRate(e.target.value)}
                          placeholder="1500"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Verification Documents */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Documentos de Verificación
                  </CardTitle>
                  <div className="flex items-start gap-2 mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">Documentos requeridos para verificación:</p>
                      <ul className="space-y-1">
                        <li>• Documento de identidad (cédula o pasaporte)</li>
                        <li>• Carta de buena conducta de la Policía Nacional RD</li>
                      </ul>
                      <p className="mt-2 text-xs">
                        Estos documentos son para uso interno de Doméstiko y garantizan la seguridad de nuestros usuarios.
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Identity Document Upload */}
                  <div>
                    <Label htmlFor="identityDocument" className="flex items-center gap-2 mb-2">
                      <FileText className="h-4 w-4" />
                      Documento de Identidad *
                    </Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
                      <input
                        id="identityDocument"
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => handleFileChange(e.target.files?.[0] || null, 'identity')}
                        className="hidden"
                      />
                      <label htmlFor="identityDocument" className="cursor-pointer">
                        <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm font-medium">
                          {identityDocument ? identityDocument.name : "Cargar documento de identidad"}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          PNG, JPG, WebP o PDF (máx. 50MB)
                        </p>
                      </label>
                    </div>
                    {identityDocument && (
                      <div className="flex items-center gap-2 mt-2 text-sm text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span>Documento cargado correctamente</span>
                      </div>
                    )}
                  </div>

                  {/* Police Certificate Upload */}
                  <div>
                    <Label htmlFor="policeCertificate" className="flex items-center gap-2 mb-2">
                      <Shield className="h-4 w-4" />
                      Carta de Buena Conducta *
                    </Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
                      <input
                        id="policeCertificate"
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => handleFileChange(e.target.files?.[0] || null, 'police')}
                        className="hidden"
                      />
                      <label htmlFor="policeCertificate" className="cursor-pointer">
                        <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm font-medium">
                          {policeCertificate ? policeCertificate.name : "Cargar carta de buena conducta"}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          PNG, JPG, WebP o PDF (máx. 50MB)
                        </p>
                      </label>
                    </div>
                    {policeCertificate && (
                      <div className="flex items-center gap-2 mt-2 text-sm text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span>Carta cargada correctamente</span>
                      </div>
                    )}
                  </div>

                  {/* Professional Certificate Upload */}
                  <div>
                    <Label htmlFor="professionalCertificate" className="flex items-center gap-2 mb-2">
                      <FileText className="h-4 w-4" />
                      Título o Certificación Profesional (Opcional)
                    </Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
                      <input
                        id="professionalCertificate"
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => handleFileChange(e.target.files?.[0] || null, 'professional')}
                        className="hidden"
                      />
                      <label htmlFor="professionalCertificate" className="cursor-pointer">
                        <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm font-medium">
                          {professionalCertificate ? professionalCertificate.name : "Cargar título o certificación"}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          PNG, JPG, WebP o PDF (máx. 50MB)
                        </p>
                      </label>
                    </div>
                    {professionalCertificate && (
                      <div className="flex items-center gap-2 mt-2 text-sm text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span>Certificación cargada correctamente</span>
                      </div>
                    )}
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-yellow-800">
                        <p className="font-medium">Información importante:</p>
                        <ul className="mt-1 space-y-1">
                          <li>• Los documentos deben estar vigentes y ser legibles</li>
                          <li>• La carta de buena conducta debe ser emitida por la Policía Nacional</li>
                          <li>• El proceso de verificación puede tomar 2-5 días hábiles</li>
                          <li>• Una vez verificado, recibirás el check mark de verificación</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Services */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Servicios que Ofreces
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Add Service Form */}
                  <div className="border rounded-lg p-4 bg-muted/20">
                    <h4 className="font-medium mb-4">Agregar Servicio</h4>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="serviceCategory">Categoría *</Label>
                        <Select 
                          value={currentService.categoryId} 
                          onValueChange={(value) => setCurrentService({...currentService, categoryId: value})}
                        >
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

                      <div>
                        <Label htmlFor="serviceTitle">Título del servicio *</Label>
                        <Input
                          id="serviceTitle"
                          value={currentService.title}
                          onChange={(e) => setCurrentService({...currentService, title: e.target.value})}
                          placeholder="Ej: Reparación de grifos y llaves"
                        />
                      </div>

                      <div>
                        <Label htmlFor="serviceDescription">Descripción</Label>
                        <Textarea
                          id="serviceDescription"
                          value={currentService.description}
                          onChange={(e) => setCurrentService({...currentService, description: e.target.value})}
                          placeholder="Describe qué incluye este servicio..."
                          rows={2}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="priceMin">Precio mínimo (RD$) *</Label>
                          <Input
                            id="priceMin"
                            type="number"
                             min="100"
                             step="50"
                            value={currentService.priceMin}
                            onChange={(e) => setCurrentService({...currentService, priceMin: e.target.value})}
                            placeholder="800"
                          />
                        </div>
                        <div>
                          <Label htmlFor="priceMax">Precio máximo (RD$)</Label>
                          <Input
                            id="priceMax"
                            type="number"
                            min="100"
                            step="50"
                            value={currentService.priceMax}
                            onChange={(e) => setCurrentService({...currentService, priceMax: e.target.value})}
                            placeholder="1500"
                          />
                        </div>
                      </div>

                      <Button type="button" onClick={addService} variant="outline" className="w-full">
                        Agregar Servicio
                      </Button>
                    </div>
                  </div>

                  {/* Selected Services List */}
                  {selectedServices.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-medium">Servicios agregados ({selectedServices.length})</h4>
                      {selectedServices.map((service, index) => (
                        <div key={index} className="border rounded-lg p-3 bg-background">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-medium">{getCategoryName(service.categoryId)}</span>
                              </div>
                              <h5 className="font-medium">{service.title}</h5>
                              {service.description && (
                                <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
                              )}
                              <div className="text-sm text-muted-foreground mt-2">
                                 RD${parseInt(service.priceMin).toLocaleString()}
                                 {service.priceMax && ` - RD$${parseInt(service.priceMax).toLocaleString()}`}
                              </div>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeService(index)}
                              className="text-destructive hover:text-destructive"
                            >
                              ✕
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Resumen del Registro</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className={`h-4 w-4 ${fullName ? 'text-green-500' : 'text-muted-foreground'}`} />
                      <span>Información personal</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className={`h-4 w-4 ${selectedServices.length > 0 ? 'text-green-500' : 'text-muted-foreground'}`} />
                      <span>Servicios ({selectedServices.length})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className={`h-4 w-4 ${identityDocument && policeCertificate ? 'text-green-500' : 'text-muted-foreground'}`} />
                      <span>Documentos de verificación</span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Proceso de verificación</h4>
                    <div className="text-sm text-muted-foreground space-y-2">
                      <p>1. Revisión de documentos</p>
                      <p>2. Verificación de experiencia</p>
                      <p>3. Activación del perfil</p>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={submitting || selectedServices.length === 0 || !identityDocument || !policeCertificate}
                  >
                    {submitting ? (uploadingDocs ? "Subiendo documentos..." : "Enviando...") : "Enviar Solicitud"}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Al enviar esta solicitud, aceptas nuestros términos de servicio para profesionales.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterProfessional;