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

        {/* Ilustraciones corporativas y profesionales */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-16 right-16 opacity-6">
            <svg width="180" height="180" viewBox="0 0 180 180" className="text-blue-600">
              <defs>
                <linearGradient id="featureGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor:'currentColor', stopOpacity:0.8}} />
                  <stop offset="100%" style={{stopColor:'currentColor', stopOpacity:0.2}} />
                </linearGradient>
              </defs>
              {/* Escudo empresarial moderno */}
              <path d="M90 20 L140 40 L140 100 Q140 130 90 150 Q40 130 40 100 L40 40 Z" fill="url(#featureGrad1)"/>
              <path d="M90 35 L125 50 L125 95 Q125 115 90 130 Q55 115 55 95 L55 50 Z" fill="currentColor" opacity="0.4"/>
              <path d="M75 85 L85 95 L105 75" stroke="white" strokeWidth="4" fill="none"/>
              <circle cx="90" cy="90" r="35" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
            </svg>
          </div>
          
          <div className="absolute bottom-16 left-16 opacity-6">
            <svg width="160" height="160" viewBox="0 0 160 160" className="text-emerald-600">
              <defs>
                <linearGradient id="featureGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor:'currentColor', stopOpacity:0.7}} />
                  <stop offset="100%" style={{stopColor:'currentColor', stopOpacity:0.2}} />
                </linearGradient>
              </defs>
              {/* Reloj corporativo */}
              <circle cx="80" cy="80" r="60" fill="url(#featureGrad2)"/>
              <circle cx="80" cy="80" r="45" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.6"/>
              <circle cx="80" cy="80" r="30" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
              <line x1="80" y1="80" x2="80" y2="45" stroke="currentColor" strokeWidth="4"/>
              <line x1="80" y1="80" x2="105" y2="80" stroke="currentColor" strokeWidth="3"/>
              <circle cx="80" cy="80" r="6" fill="currentColor"/>
            </svg>
          </div>
          
          <div className="absolute top-1/2 left-20 opacity-5">
            <svg width="120" height="240" viewBox="0 0 120 240" className="text-slate-500">
              <path d="M20 0 L100 40 L20 80 L100 120 L20 160 L100 200 L20 240" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3"/>
              <path d="M60 0 L60 240" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.2"/>
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

        {/* Ilustraciones del proceso empresarial */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-16 left-20 opacity-6">
            <svg width="150" height="150" viewBox="0 0 150 150" className="text-indigo-600">
              <defs>
                <linearGradient id="processGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor:'currentColor', stopOpacity:0.7}} />
                  <stop offset="100%" style={{stopColor:'currentColor', stopOpacity:0.2}} />
                </linearGradient>
              </defs>
              {/* Dashboard/interfaz moderna */}
              <rect x="20" y="30" width="110" height="90" fill="url(#processGrad1)" rx="8"/>
              <rect x="30" y="40" width="90" height="5" fill="currentColor" opacity="0.6" rx="2"/>
              <rect x="30" y="50" width="70" height="5" fill="currentColor" opacity="0.4" rx="2"/>
              <rect x="30" y="60" width="80" height="5" fill="currentColor" opacity="0.5" rx="2"/>
              <circle cx="45" cy="85" r="15" fill="currentColor" opacity="0.4"/>
              <rect x="70" y="75" width="40" height="20" fill="currentColor" opacity="0.3" rx="4"/>
            </svg>
          </div>
          
          <div className="absolute bottom-16 right-20 opacity-6">
            <svg width="140" height="140" viewBox="0 0 140 140" className="text-emerald-600">
              <defs>
                <linearGradient id="processGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor:'currentColor', stopOpacity:0.8}} />
                  <stop offset="100%" style={{stopColor:'currentColor', stopOpacity:0.2}} />
                </linearGradient>
              </defs>
              {/* Check mark empresarial */}
              <circle cx="70" cy="70" r="60" fill="url(#processGrad2)"/>
              <circle cx="70" cy="70" r="45" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.6"/>
              <path d="M45 70 L62 87 L95 54" stroke="white" strokeWidth="6" fill="none"/>
            </svg>
          </div>
          
          <div className="absolute top-1/2 right-10 opacity-4">
            <svg width="100" height="200" viewBox="0 0 100 200" className="text-purple-500">
              <path d="M20 0 Q50 25 80 0 Q50 25 20 50 Q50 75 80 50 Q50 75 20 100 Q50 125 80 100 Q50 125 20 150 Q50 175 80 150 Q50 175 20 200" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3"/>
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