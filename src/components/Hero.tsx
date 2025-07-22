import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Clock, Star } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Profesionales confiables para tu hogar"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Conectamos tu <span className="text-primary">hogar</span> con 
            <span className="text-secondary"> profesionales</span> confiables
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Encuentra plomeros, electricistas, jardineros, niñeras y más. 
            Servicios verificados, rápidos y seguros para tu tranquilidad.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-10 animate-fade-in">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Shield className="h-5 w-5 text-secondary" />
              <span className="font-medium">100% Verificados</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-5 w-5 text-primary" />
              <span className="font-medium">Respuesta en 30min</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Star className="h-5 w-5 text-secondary" />
              <span className="font-medium">+1000 servicios realizados</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in">
            <Button variant="hero" size="lg" className="w-full sm:w-auto">
              Solicitar Servicio
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="professional" size="lg" className="w-full sm:w-auto">
              Soy Profesional
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 animate-fade-in">
            <p className="text-sm text-muted-foreground mb-4">
              Únete a las familias que ya confían en Doméstiko
            </p>
            <div className="flex justify-center items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-secondary fill-current" />
              ))}
              <span className="ml-2 text-sm font-medium text-foreground">4.9/5 en satisfacción</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 animate-float hidden lg:block">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
          <Shield className="h-8 w-8 text-primary" />
        </div>
      </div>
      <div className="absolute bottom-20 right-10 animate-float hidden lg:block" style={{animationDelay: '1s'}}>
        <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center">
          <Star className="h-10 w-10 text-secondary" />
        </div>
      </div>
    </section>
  );
};

export default Hero;