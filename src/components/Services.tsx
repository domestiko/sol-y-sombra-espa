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

    </section>
  );
};

export default Services;