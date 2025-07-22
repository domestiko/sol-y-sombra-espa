import { Card, CardContent } from "@/components/ui/card";
import { 
  Shield, 
  Clock, 
  MapPin, 
  Star, 
  CreditCard, 
  Headphones 
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Profesionales Verificados",
    description: "Todos nuestros profesionales pasan por un riguroso proceso de verificación de identidad, experiencia y referencias.",
    gradient: "from-blue-500 to-blue-600"
  },
  {
    icon: Clock,
    title: "Respuesta Rápida",
    description: "Encuentra un profesional disponible en menos de 30 minutos. Servicios de emergencia 24/7.",
    gradient: "from-green-500 to-green-600"
  },
  {
    icon: MapPin,
    title: "Cerca de Ti",
    description: "Localiza profesionales en tu zona usando nuestra tecnología de geolocalización avanzada.",
    gradient: "from-purple-500 to-purple-600"
  },
  {
    icon: Star,
    title: "Calificaciones Reales",
    description: "Sistema de reseñas y calificaciones transparente basado en experiencias reales de usuarios.",
    gradient: "from-yellow-500 to-orange-500"
  },
  {
    icon: CreditCard,
    title: "Pagos Seguros",
    description: "Múltiples opciones de pago seguras. Paga después del servicio con total tranquilidad.",
    gradient: "from-indigo-500 to-indigo-600"
  },
  {
    icon: Headphones,
    title: "Soporte 24/7",
    description: "Nuestro equipo de atención al cliente está disponible para ayudarte en cualquier momento.",
    gradient: "from-pink-500 to-pink-600"
  }
];

const Features = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            ¿Por qué elegir <span className="text-primary">Doméstiko</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Hemos diseñado cada aspecto de nuestra plataforma pensando en tu seguridad, 
            comodidad y tranquilidad
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className="group hover:shadow-floating transition-all duration-500 hover:-translate-y-3 bg-gradient-card border-0 animate-scale-in"
              style={{animationDelay: `${index * 0.15}s`}}
            >
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className={`w-14 h-14 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-soft`}>
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Section */}
        <div className="mt-20 text-center animate-fade-in">
          <div className="bg-gradient-hero rounded-2xl p-12 shadow-card">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Más de <span className="text-primary">5,000 familias</span> confían en nosotros
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Únete a la comunidad de hogares que han transformado la manera de gestionar 
              sus servicios domésticos con total seguridad y confianza.
            </p>
            <div className="flex justify-center items-center gap-8 flex-wrap">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">4.9/5</div>
                <div className="text-sm text-muted-foreground">Calificación promedio</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary">98%</div>
                <div className="text-sm text-muted-foreground">Satisfacción del cliente</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Soporte disponible</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;