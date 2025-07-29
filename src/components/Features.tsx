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
      <section className="py-16 md:py-20 bg-gradient-hero relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-balance text-white drop-shadow-lg">
            ¿Por qué elegir Doméstiko?
          </h2>
          <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto text-balance">
            Tu seguridad y satisfacción son nuestra prioridad
          </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-16">
            {features.map((feature, index) => (
              <Card key={feature.title} className="border-0 bg-white/10 backdrop-blur-sm h-full hover:bg-white/20 transition-all duration-200 border border-white/20">
                <CardContent className="p-4 md:p-6 h-full flex flex-col">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-xl flex items-center justify-center mb-4 md:mb-6">
                  <feature.icon className="h-6 w-6 md:h-8 md:w-8 text-white" />
                </div>
                
                <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-4 leading-tight text-white">{feature.title}</h3>
                <p className="text-sm md:text-base text-white/80 mb-4 md:mb-6 flex-grow leading-relaxed">{feature.description}</p>
                  
                  <div className="space-y-2">
                    {feature.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs md:text-sm">
                      <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-white flex-shrink-0" />
                      <span className="text-white/90">{highlight}</span>
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
      <section className="py-16 md:py-20 bg-gradient-hero relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-balance text-white drop-shadow-lg">
              Cómo funciona
            </h2>
            <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto text-balance">
              En solo 3 pasos sencillos conectamos tu hogar con el profesional ideal
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16">
            {howItWorks.map((step, index) => (
              <div key={step.step} className="text-center relative">
                {/* Connection Line */}
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-white/30 -translate-x-1/2 z-0" />
                )}
                
                <div className="relative z-10">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 text-white font-bold text-lg md:text-xl border border-white/30">
                    {step.step}
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-4 text-white leading-tight">{step.title}</h3>
                  <p className="text-sm md:text-base text-white/80 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-20 bg-gradient-hero text-white relative overflow-hidden">
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