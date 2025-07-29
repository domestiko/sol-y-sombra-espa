import { Card, CardContent } from "@/components/ui/card";
import { 
  Shield, 
  Clock, 
  Star, 
  Users,
  CreditCard,
  MapPin,
  Phone,
  CheckCircle
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Profesionales Verificados",
    description: "Todos nuestros profesionales pasan por un riguroso proceso de verificación incluyendo documentos de identidad y antecedentes penales.",
    highlights: ["Verificación de identidad", "Carta de buena conducta", "Certificaciones profesionales"]
  },
  {
    icon: Clock,
    title: "Respuesta Rápida",
    description: "Conectamos contigo con profesionales disponibles en tu zona de forma inmediata, sin esperas innecesarias.",
    highlights: ["Respuesta en minutos", "Disponibilidad 24/7", "Agenda flexible"]
  },
  {
    icon: Star,
    title: "Calidad Garantizada",
    description: "Sistema de calificaciones y reseñas que asegura servicios de alta calidad y profesionales confiables.",
    highlights: ["Sistema de reseñas", "Garantía de servicio", "Soporte continuo"]
  }
];

const howItWorks = [
  {
    step: "1",
    title: "Describe tu necesidad",
    description: "Cuéntanos qué servicio necesitas y cuándo lo necesitas"
  },
  {
    step: "2", 
    title: "Conectamos contigo",
    description: "Te conectamos con profesionales verificados en tu zona"
  },
  {
    step: "3",
    title: "Servicio completado",
    description: "El profesional realiza el trabajo y tú calificas la experiencia"
  }
];

const Features = () => {
  return (
    <>
      {/* Main Features */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-balance">
              ¿Por qué elegir Doméstiko?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              Tu seguridad y satisfacción son nuestra prioridad
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={feature.title} className="border-0 bg-muted/30 h-full">
                <CardContent className="p-8 h-full flex flex-col">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground mb-6 flex-grow">{feature.description}</p>
                  
                  <div className="space-y-2">
                    {feature.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Ilustraciones de seguridad y confianza */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 opacity-6">
            <svg width="140" height="140" viewBox="0 0 140 140" className="text-emerald-400">
              {/* Escudo de verificación */}
              <path d="M70 10 L90 30 L130 30 L110 70 L130 110 L90 110 L70 130 L50 110 L10 110 L30 70 L10 30 L50 30 Z" fill="currentColor" opacity="0.3"/>
              <circle cx="70" cy="70" r="25" fill="currentColor" opacity="0.5"/>
              <path d="M60 70 L67 77 L80 64" stroke="white" strokeWidth="4" fill="none"/>
            </svg>
          </div>
          
          <div className="absolute bottom-20 left-10 opacity-6">
            <svg width="120" height="120" viewBox="0 0 120 120" className="text-blue-400">
              {/* Reloj de tiempo */}
              <circle cx="60" cy="60" r="40" fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="2"/>
              <line x1="60" y1="60" x2="60" y2="35" stroke="currentColor" strokeWidth="3"/>
              <line x1="60" y1="60" x2="80" y2="60" stroke="currentColor" strokeWidth="2"/>
              <circle cx="60" cy="60" r="4" fill="currentColor"/>
            </svg>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-gradient-to-br from-cyan-50 via-teal-50 to-emerald-50 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-balance">
              Cómo funciona
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              En solo 3 pasos sencillos conectamos tu hogar con el profesional ideal
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <div key={step.step} className="text-center relative">
                {/* Connection Line */}
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-border -translate-x-1/2 z-0" />
                )}
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ilustraciones del proceso */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-20 opacity-6">
            <svg width="100" height="100" viewBox="0 0 100 100" className="text-indigo-400">
              {/* Documento/formulario */}
              <rect x="20" y="15" width="60" height="70" fill="currentColor" opacity="0.3" rx="5"/>
              <line x1="30" y1="30" x2="70" y2="30" stroke="currentColor" strokeWidth="2"/>
              <line x1="30" y1="40" x2="65" y2="40" stroke="currentColor" strokeWidth="2"/>
              <line x1="30" y1="50" x2="60" y2="50" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          
          <div className="absolute bottom-10 right-20 opacity-6">
            <svg width="110" height="110" viewBox="0 0 110 110" className="text-green-400">
              {/* Marca de verificación grande */}
              <circle cx="55" cy="55" r="45" fill="currentColor" opacity="0.3"/>
              <path d="M35 55 L47 67 L75 39" stroke="currentColor" strokeWidth="6" fill="none"/>
            </svg>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold">1,000+</div>
              <div className="text-white/80">Servicios completados</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold">500+</div>
              <div className="text-white/80">Profesionales activos</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold">15</div>
              <div className="text-white/80">Ciudades cubiertas</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold">4.9</div>
              <div className="text-white/80">Calificación promedio</div>
            </div>
          </div>
        </div>

        {/* Elementos decorativos para estadísticas */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 opacity-20">
            <svg width="80" height="80" viewBox="0 0 80 80" className="text-white">
              <circle cx="40" cy="40" r="30" fill="none" stroke="currentColor" strokeWidth="4"/>
              <path d="M25 40 Q40 25 55 40 Q40 55 25 40" fill="currentColor"/>
            </svg>
          </div>
          
          <div className="absolute bottom-10 right-10 opacity-20">
            <svg width="90" height="90" viewBox="0 0 90 90" className="text-white">
              <rect x="10" y="30" width="15" height="50" fill="currentColor" rx="2"/>
              <rect x="30" y="20" width="15" height="60" fill="currentColor" rx="2"/>
              <rect x="50" y="35" width="15" height="45" fill="currentColor" rx="2"/>
              <rect x="70" y="15" width="15" height="65" fill="currentColor" rx="2"/>
            </svg>
          </div>
          
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10">
            <svg width="200" height="200" viewBox="0 0 200 200" className="text-white">
              <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="2"/>
              <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="2"/>
              <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;