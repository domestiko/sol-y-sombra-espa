import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  Wrench, 
  Zap, 
  Scissors, 
  Home, 
  PaintBucket, 
  Settings,
  ArrowRight 
} from "lucide-react";

const services = [
  {
    icon: Wrench,
    title: "Plomería",
    description: "Reparaciones y mantenimiento de tuberías, grifos y sistemas de agua."
  },
  {
    icon: Zap,
    title: "Electricidad",
    description: "Instalaciones eléctricas, reparación de enchufes y sistemas eléctricos."
  },
  {
    icon: Scissors,
    title: "Jardinería",
    description: "Mantenimiento de jardines, poda y diseño de espacios verdes."
  },
  {
    icon: Home,
    title: "Limpieza",
    description: "Limpieza profunda y mantenimiento regular de espacios."
  },
  {
    icon: PaintBucket,
    title: "Pintura",
    description: "Pintura interior y exterior, acabados y reparación de paredes."
  },
  {
    icon: Settings,
    title: "Técnicos",
    description: "Reparación de electrodomésticos y equipos del hogar."
  }
];

const Services = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-16 md:py-20 bg-gradient-hero relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-balance text-white drop-shadow-lg">
            Servicios para cada necesidad de tu hogar
          </h2>
          <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto text-balance">
            Profesionales capacitados y verificados listos para resolver cualquier tarea doméstica
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
          {services.map((service) => (
            <Card 
              key={service.title} 
              className="group hover:shadow-card transition-all duration-200 cursor-pointer border-0 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20"
              onClick={() => navigate('/professionals')}
            >
              <CardContent className="p-4 md:p-6">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 transition-colors">
                    <service.icon className="h-5 w-5 md:h-6 md:w-6 text-white" />
                  </div>
                  <div className="space-y-1 md:space-y-2">
                    <h3 className="font-semibold text-base md:text-lg leading-tight text-white">
                      {service.title}
                    </h3>
                    <p className="text-sm text-white/80 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center space-y-3">
          <p className="text-sm md:text-base text-white/80">
            ¿No encuentras el servicio que necesitas?
          </p>
          <Button 
            className="bg-white text-primary hover:bg-white/90 font-semibold"
            onClick={() => navigate('/book-service')}
            size="lg"
          >
            Solicitar servicio personalizado
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>

      {/* Ilustraciones profesionales y modernas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Arquitectura de servicios - Top Right */}
        <div className="absolute top-16 right-16 opacity-6">
          <svg width="200" height="200" viewBox="0 0 200 200" className="text-indigo-600">
            <defs>
              <linearGradient id="serviceGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor:'currentColor', stopOpacity:0.8}} />
                <stop offset="100%" style={{stopColor:'currentColor', stopOpacity:0.2}} />
              </linearGradient>
            </defs>
            {/* Estructura de servicios interconectados */}
            <polygon points="100,20 160,60 160,140 100,180 40,140 40,60" fill="url(#serviceGrad1)" opacity="0.4"/>
            <polygon points="100,40 140,65 140,135 100,160 60,135 60,65" fill="currentColor" opacity="0.3"/>
            <circle cx="100" cy="100" r="25" fill="currentColor" opacity="0.8"/>
            <rect x="95" y="50" width="10" height="30" fill="currentColor" opacity="0.6"/>
            <rect x="95" y="120" width="10" height="30" fill="currentColor" opacity="0.6"/>
            <rect x="70" y="95" width="30" height="10" fill="currentColor" opacity="0.6"/>
            <rect x="130" y="95" width="30" height="10" fill="currentColor" opacity="0.6"/>
          </svg>
        </div>
        
        {/* Elementos de conectividad - Bottom Left */}
        <div className="absolute bottom-20 left-20 opacity-6">
          <svg width="180" height="180" viewBox="0 0 180 180" className="text-emerald-600">
            <defs>
              <linearGradient id="serviceGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor:'currentColor', stopOpacity:0.7}} />
                <stop offset="100%" style={{stopColor:'currentColor', stopOpacity:0.2}} />
              </linearGradient>
            </defs>
            {/* Red de conexiones */}
            <circle cx="90" cy="90" r="70" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
            <circle cx="90" cy="90" r="45" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
            <path d="M90 30 L130 70 L90 110 L50 70 Z" fill="url(#serviceGrad2)"/>
            <circle cx="90" cy="45" r="8" fill="currentColor" opacity="0.8"/>
            <circle cx="125" cy="90" r="8" fill="currentColor" opacity="0.8"/>
            <circle cx="90" cy="135" r="8" fill="currentColor" opacity="0.8"/>
            <circle cx="55" cy="90" r="8" fill="currentColor" opacity="0.8"/>
          </svg>
        </div>
        
        {/* Patrón tecnológico - Middle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-4">
          <svg width="250" height="250" viewBox="0 0 250 250" className="text-purple-600">
            <defs>
              <linearGradient id="serviceGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor:'currentColor', stopOpacity:0.6}} />
                <stop offset="100%" style={{stopColor:'currentColor', stopOpacity:0.1}} />
              </linearGradient>
            </defs>
            {/* Grid tecnológico */}
            <rect x="50" y="50" width="150" height="150" fill="url(#serviceGrad3)" rx="10"/>
            <path d="M75 75 L125 75 L125 125 L175 125 L175 175 L125 175 L125 125 L75 125 Z" fill="currentColor" opacity="0.3"/>
            <circle cx="100" cy="100" r="15" fill="currentColor" opacity="0.6"/>
            <circle cx="150" cy="150" r="15" fill="currentColor" opacity="0.6"/>
            <rect x="95" y="70" width="10" height="60" fill="currentColor" opacity="0.4"/>
            <rect x="145" y="120" width="10" height="60" fill="currentColor" opacity="0.4"/>
          </svg>
        </div>
        
        {/* Elementos abstractos laterales */}
        <div className="absolute top-20 left-1/3 opacity-5">
          <svg width="150" height="300" viewBox="0 0 150 300" className="text-blue-500">
            <path d="M20 0 Q75 50 20 100 Q75 150 20 200 Q75 250 20 300" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.3"/>
            <path d="M130 0 Q75 50 130 100 Q75 150 130 200 Q75 250 130 300" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.4"/>
            <circle cx="75" cy="75" r="6" fill="currentColor" opacity="0.6"/>
            <circle cx="75" cy="150" r="6" fill="currentColor" opacity="0.6"/>
            <circle cx="75" cy="225" r="6" fill="currentColor" opacity="0.6"/>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Services;