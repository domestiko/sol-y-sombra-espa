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
      <section className="py-24 bg-background">
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
      </section>

      {/* How it Works */}
      <section className="py-24 bg-muted/30">
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
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-primary text-white">
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
      </section>
    </>
  );
};

export default Features;