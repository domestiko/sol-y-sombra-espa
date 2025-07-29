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
    description: "Reparaciones, instalaciones y mantenimiento de tuberías, grifos y sistemas de agua.",
    color: "text-blue-600"
  },
  {
    icon: Zap,
    title: "Electricidad",
    description: "Instalaciones eléctricas, reparación de enchufes, cambio de bombillas y más.",
    color: "text-yellow-500"
  },
  {
    icon: Scissors,
    title: "Jardinería",
    description: "Mantenimiento de jardines, poda de plantas, diseño de espacios verdes.",
    color: "text-green-600"
  },
  {
    icon: Home,
    title: "Limpieza",
    description: "Limpieza profunda, mantenimiento regular, organización de espacios.",
    color: "text-purple-600"
  },
  {
    icon: PaintBucket,
    title: "Servicios de Pintura",
    description: "Pintura interior y exterior, acabados especiales, reparación de paredes.",
    color: "text-orange-600"
  },
  {
    icon: Settings,
    title: "Técnicos",
    description: "Reparación de electrodomésticos, aire acondicionado, calentadores y más.",
    color: "text-gray-600"
  }
];

const Services = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Servicios para <span className="text-primary">cada necesidad</span> de tu hogar
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Profesionales capacitados y verificados listos para resolver cualquier tarea doméstica
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <Card 
              key={service.title} 
              className="group hover:shadow-card transition-all duration-300 hover:-translate-y-2 bg-gradient-card border-0 animate-scale-in"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <CardContent className="p-8 text-center">
                <div className="mb-6 flex justify-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>
                <Button 
                  variant="ghost" 
                  className="group/btn text-primary hover:text-primary-foreground hover:bg-primary"
                  onClick={() => navigate('/professionals')}
                >
                  Ver profesionales
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center animate-fade-in">
          <p className="text-muted-foreground mb-6">
            ¿No encuentras el servicio que necesitas?
          </p>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => navigate('/book-service')}
          >
            Solicitar servicio personalizado
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;