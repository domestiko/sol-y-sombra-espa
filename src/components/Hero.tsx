import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Shield, Clock, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* Contenido principal */}
          <div className="lg:w-1/2 text-center lg:text-left space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">
                Encuentra el{" "}
                <span className="bg-accent text-accent-foreground px-3 py-1 rounded-lg">
                  profesional perfecto
                </span>{" "}
                para tu hogar
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Conectamos a los mejores profesionales verificados con clientes que buscan servicios de calidad
              </p>
            </div>

            {/* Estadísticas */}
            <div className="grid grid-cols-3 gap-6 py-8">
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <Shield className="h-6 w-6 text-white mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">100%</div>
                <div className="text-sm text-white/80">Verificados</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <Users className="h-6 w-6 text-white mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">1000+</div>
                <div className="text-sm text-white/80">Clientes</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <Clock className="h-6 w-6 text-white mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-sm text-white/80">Disponible</div>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                onClick={() => navigate('/book-service')}
                className="bg-white text-primary hover:bg-white/90 shadow-floating text-lg px-8 py-4 h-auto"
              >
                Solicitar Servicio
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate('/register-professional')}
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm text-lg px-8 py-4 h-auto"
              >
                Soy Profesional
                <Users className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Imagen de profesionales */}
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative">
              <img 
                src="/lovable-uploads/1f936c8a-34dc-4393-9f10-d3ea004c24ac.png" 
                alt="Equipo de profesionales de servicios domésticos"
                className="w-96 h-96 lg:w-[500px] lg:h-[500px] object-contain animate-float drop-shadow-2xl"
              />
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-64 h-8 bg-black/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Elementos decorativos modernos con la paleta de la imagen */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Patrón geométrico turquesa - Top Left */}
        <div className="absolute top-16 left-16 opacity-20">
          <svg width="180" height="180" viewBox="0 0 180 180" className="text-white">
            <defs>
              <linearGradient id="tealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor:'currentColor', stopOpacity:0.6}} />
                <stop offset="100%" style={{stopColor:'currentColor', stopOpacity:0.2}} />
              </linearGradient>
            </defs>
            <path d="M40 60 L90 20 L140 60 L140 120 L90 140 L40 120 Z" fill="url(#tealGrad)" stroke="currentColor" strokeWidth="1"/>
            <path d="M60 80 L90 60 L120 80 L120 110 L90 120 L60 110 Z" fill="currentColor" opacity="0.3"/>
            <rect x="85" y="50" width="10" height="40" fill="currentColor" opacity="0.8"/>
          </svg>
        </div>
        
        {/* Elementos circulares - Top Right */}
        <div className="absolute top-32 right-20 opacity-15">
          <svg width="160" height="160" viewBox="0 0 160 160" className="text-white">
            <circle cx="80" cy="80" r="60" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
            <circle cx="80" cy="80" r="40" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
            <circle cx="80" cy="80" r="12" fill="currentColor" opacity="0.8"/>
          </svg>
        </div>
        
        {/* Patrones de herramientas - Bottom Left */}
        <div className="absolute bottom-24 left-24 opacity-15">
          <svg width="140" height="140" viewBox="0 0 140 140" className="text-white">
            <path d="M40 80 L70 60 L100 80 L70 100 Z" fill="currentColor" opacity="0.4"/>
            <path d="M60 95 L80 85 L100 95 L80 105 Z" fill="currentColor" opacity="0.3"/>
            <path d="M50 70 L65 60 L80 70 L65 80 Z" fill="currentColor" opacity="0.4"/>
          </svg>
        </div>
        
        {/* Formas fluidas - Bottom Right */}
        <div className="absolute bottom-32 right-32 opacity-15">
          <svg width="120" height="120" viewBox="0 0 120 120" className="text-white">
            <path d="M20 60 Q40 20 80 40 Q100 60 80 80 Q60 100 20 80 Q10 70 20 60" fill="currentColor" opacity="0.4"/>
            <circle cx="60" cy="60" r="15" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
          </svg>
        </div>
      </div>

      {/* Fondo con gradiente sutil */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
      </div>
    </section>
  );
};

export default Hero;