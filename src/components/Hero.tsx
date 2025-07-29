import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Shield, Clock, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero pt-16">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          
          {/* Contenido principal */}
          <div className="lg:w-1/2 text-center lg:text-left space-y-6">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white drop-shadow-lg leading-tight">
                Encuentra el{" "}
                <span className="bg-accent text-accent-foreground px-2 py-1 rounded-lg inline-block">
                  profesional perfecto
                </span>{" "}
                para tu hogar
              </h1>
              
              <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Conectamos a los mejores profesionales verificados con clientes que buscan servicios de calidad
              </p>
            </div>

            {/* Estadísticas */}
            <div className="grid grid-cols-3 gap-3 md:gap-6 py-6">
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/20">
                <Shield className="h-4 w-4 md:h-6 md:w-6 text-white mx-auto mb-1 md:mb-2" />
                <div className="text-lg md:text-2xl font-bold text-white">100%</div>
                <div className="text-xs md:text-sm text-white/80">Verificados</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/20">
                <Users className="h-4 w-4 md:h-6 md:w-6 text-white mx-auto mb-1 md:mb-2" />
                <div className="text-lg md:text-2xl font-bold text-white">1000+</div>
                <div className="text-xs md:text-sm text-white/80">Clientes</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/20">
                <Clock className="h-4 w-4 md:h-6 md:w-6 text-white mx-auto mb-1 md:mb-2" />
                <div className="text-lg md:text-2xl font-bold text-white">24/7</div>
                <div className="text-xs md:text-sm text-white/80">Disponible</div>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Button 
                size="lg" 
                onClick={() => navigate('/book-service')}
                className="bg-white text-primary hover:bg-white/90 shadow-floating text-base md:text-lg px-6 md:px-8 py-3 md:py-4 h-auto font-semibold"
              >
                Solicitar Servicio
                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </Button>
              <Button 
                size="lg" 
                onClick={() => navigate('/register-professional')}
                className="bg-white text-primary hover:bg-white/90 shadow-floating text-base md:text-lg px-6 md:px-8 py-3 md:py-4 h-auto font-semibold"
              >
                Soy Profesional
                <Users className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </Button>
            </div>
          </div>

          {/* Imagen de profesionales */}
          <div className="lg:w-1/2 flex justify-center mt-6 lg:mt-0">
            <div className="relative">
              <img 
                src="/lovable-uploads/1f936c8a-34dc-4393-9f10-d3ea004c24ac.png" 
                alt="Equipo de profesionales de servicios domésticos"
                className="w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[450px] xl:h-[450px] object-contain animate-float drop-shadow-2xl"
              />
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-48 md:w-64 h-6 md:h-8 bg-black/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;