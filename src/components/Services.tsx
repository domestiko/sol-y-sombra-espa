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
    <section className="py-24 bg-muted/30">
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
    </section>
  );
};

export default Services;