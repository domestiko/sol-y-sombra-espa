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
    <section className="py-24 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-balance">
            Servicios para cada necesidad de tu hogar
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Profesionales capacitados y verificados listos para resolver cualquier tarea doméstica
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service) => (
            <Card 
              key={service.title} 
              className="group hover:shadow-lg transition-all duration-200 cursor-pointer border-0 bg-card/50"
              onClick={() => navigate('/professionals')}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">
            ¿No encuentras el servicio que necesitas?
          </p>
          <Button 
            variant="outline"
            onClick={() => navigate('/book-service')}
            className="group"
          >
            Solicitar servicio personalizado
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>

      {/* Ilustraciones decorativas por toda la sección */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Elementos de servicios distribuidos */}
        <div className="absolute top-10 right-10 opacity-8">
          <svg width="150" height="150" viewBox="0 0 150 150" className="text-blue-400">
            {/* Casa con herramientas */}
            <rect x="40" y="80" width="70" height="50" fill="currentColor" opacity="0.3" rx="5"/>
            <path d="M30 80 L75 40 L120 80" fill="none" stroke="currentColor" strokeWidth="4" opacity="0.5"/>
            <circle cx="90" cy="100" r="8" fill="currentColor"/>
            <rect x="85" y="60" width="10" height="50" fill="currentColor" rx="2"/>
          </svg>
        </div>
        
        <div className="absolute bottom-20 left-10 opacity-8">
          <svg width="120" height="120" viewBox="0 0 120 120" className="text-green-400">
            {/* Elementos de jardinería */}
            <circle cx="60" cy="30" r="20" fill="currentColor" opacity="0.3"/>
            <rect x="57" y="45" width="6" height="35" fill="currentColor"/>
            <ellipse cx="60" cy="85" rx="25" ry="10" fill="currentColor" opacity="0.4"/>
            <path d="M30 20 Q60 10 90 20" stroke="currentColor" strokeWidth="3" fill="none"/>
          </svg>
        </div>
        
        <div className="absolute top-1/2 left-20 opacity-8">
          <svg width="100" height="100" viewBox="0 0 100 100" className="text-purple-400">
            {/* Elementos de limpieza */}
            <circle cx="50" cy="25" r="15" fill="currentColor" opacity="0.3"/>
            <rect x="47" y="35" width="6" height="30" fill="currentColor"/>
            <ellipse cx="50" cy="75" rx="20" ry="8" fill="currentColor" opacity="0.4"/>
          </svg>
        </div>
        
        <div className="absolute top-20 left-1/2 opacity-8">
          <svg width="80" height="80" viewBox="0 0 80 80" className="text-orange-400">
            {/* Herramientas de pintura */}
            <rect x="35" y="15" width="10" height="35" fill="currentColor" rx="2"/>
            <rect x="30" y="45" width="20" height="12" fill="currentColor" rx="3"/>
            <path d="M20 65 Q40 60 60 65" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Services;