import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Shield, Clock, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Ilustraciones de servicios de fondo */}
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-balance">
              Servicios domésticos de
              <span className="text-primary"> confianza</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Conectamos tu hogar con profesionales verificados en República Dominicana. 
              Rápido, seguro y confiable.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-3xl mx-auto">
            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border text-center">
              <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">100%</div>
              <div className="text-sm text-muted-foreground">Verificados</div>
            </div>
            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border text-center">
              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">1,000+</div>
              <div className="text-sm text-muted-foreground">Clientes satisfechos</div>
            </div>
            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border text-center">
              <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">24/7</div>
              <div className="text-sm text-muted-foreground">Disponibilidad</div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <Button 
              size="lg" 
              className="w-full sm:flex-1"
              onClick={() => navigate('/book-service')}
            >
              Solicitar Servicio
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:flex-1"
              onClick={() => navigate('/register-professional')}
            >
              Soy Profesional
            </Button>
          </div>

          {/* Social Proof */}
          <div className="pt-8 space-y-2">
            <p className="text-sm text-muted-foreground">
              Más de 1,000 servicios completados exitosamente
            </p>
            <div className="flex justify-center items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-1 h-1 bg-primary rounded-full" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Ilustraciones decorativas de servicios */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Herramientas de plomería */}
        <div className="absolute top-20 left-20 opacity-10">
          <svg width="120" height="120" viewBox="0 0 120 120" className="text-blue-500">
            <circle cx="60" cy="60" r="8" fill="currentColor"/>
            <rect x="55" y="20" width="10" height="80" fill="currentColor" rx="5"/>
            <rect x="40" y="55" width="40" height="10" fill="currentColor" rx="5"/>
          </svg>
        </div>
        
        {/* Herramientas eléctricas */}
        <div className="absolute top-40 right-20 opacity-10">
          <svg width="100" height="100" viewBox="0 0 100 100" className="text-yellow-500">
            <path d="M30 10 L70 50 L50 50 L70 90 L30 50 L50 50 Z" fill="currentColor"/>
          </svg>
        </div>
        
        {/* Elementos de jardinería */}
        <div className="absolute bottom-32 left-32 opacity-10">
          <svg width="80" height="80" viewBox="0 0 80 80" className="text-green-500">
            <circle cx="40" cy="25" r="15" fill="currentColor"/>
            <rect x="37" y="35" width="6" height="30" fill="currentColor"/>
            <ellipse cx="40" cy="70" rx="20" ry="8" fill="currentColor"/>
          </svg>
        </div>
        
        {/* Elementos de limpieza */}
        <div className="absolute bottom-20 right-40 opacity-10">
          <svg width="90" height="90" viewBox="0 0 90 90" className="text-purple-500">
            <circle cx="45" cy="20" r="12" fill="currentColor"/>
            <rect x="42" y="30" width="6" height="40" fill="currentColor"/>
            <path d="M20 65 Q45 55 70 65 Q45 75 20 65" fill="currentColor"/>
          </svg>
        </div>
        
        {/* Herramientas de pintura */}
        <div className="absolute top-60 left-10 opacity-10">
          <svg width="70" height="70" viewBox="0 0 70 70" className="text-orange-500">
            <rect x="30" y="10" width="10" height="40" fill="currentColor" rx="2"/>
            <rect x="25" y="45" width="20" height="15" fill="currentColor" rx="3"/>
          </svg>
        </div>
        
        {/* Engranajes técnicos */}
        <div className="absolute top-32 right-60 opacity-10">
          <svg width="60" height="60" viewBox="0 0 60 60" className="text-gray-500">
            <circle cx="30" cy="30" r="25" fill="none" stroke="currentColor" strokeWidth="4"/>
            <circle cx="30" cy="30" r="8" fill="currentColor"/>
            <rect x="28" y="5" width="4" height="10" fill="currentColor"/>
            <rect x="28" y="45" width="4" height="10" fill="currentColor"/>
            <rect x="5" y="28" width="10" height="4" fill="currentColor"/>
            <rect x="45" y="28" width="10" height="4" fill="currentColor"/>
          </svg>
        </div>
      </div>

      {/* Patrón de fondo geométrico */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-full blur-3xl" />
      </div>
    </section>
  );
};

export default Hero;