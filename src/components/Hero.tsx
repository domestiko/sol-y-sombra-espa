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

      {/* Ilustraciones modernas y sofisticadas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Patrón geométrico de servicios - Top Left */}
        <div className="absolute top-16 left-16 opacity-8">
          <svg width="180" height="180" viewBox="0 0 180 180" className="text-blue-600">
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor:'currentColor', stopOpacity:0.6}} />
                <stop offset="100%" style={{stopColor:'currentColor', stopOpacity:0.2}} />
              </linearGradient>
            </defs>
            {/* Estructura arquitectónica moderna */}
            <path d="M40 60 L90 20 L140 60 L140 120 L90 140 L40 120 Z" fill="url(#grad1)" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
            <path d="M60 80 L90 60 L120 80 L120 110 L90 120 L60 110 Z" fill="currentColor" opacity="0.3"/>
            <rect x="85" y="50" width="10" height="40" fill="currentColor" opacity="0.8"/>
            <rect x="70" y="70" width="8" height="30" fill="currentColor" opacity="0.6"/>
            <rect x="102" y="70" width="8" height="30" fill="currentColor" opacity="0.6"/>
          </svg>
        </div>
        
        {/* Patrón tecnológico - Top Right */}
        <div className="absolute top-32 right-20 opacity-8">
          <svg width="160" height="160" viewBox="0 0 160 160" className="text-indigo-600">
            <defs>
              <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor:'currentColor', stopOpacity:0.7}} />
                <stop offset="100%" style={{stopColor:'currentColor', stopOpacity:0.2}} />
              </linearGradient>
            </defs>
            {/* Circuitos modernos */}
            <circle cx="80" cy="80" r="60" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
            <circle cx="80" cy="80" r="40" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
            <path d="M80 40 L100 60 L80 80 L60 60 Z" fill="url(#grad2)"/>
            <circle cx="80" cy="80" r="12" fill="currentColor" opacity="0.8"/>
            <rect x="78" y="20" width="4" height="20" fill="currentColor" opacity="0.6"/>
            <rect x="78" y="120" width="4" height="20" fill="currentColor" opacity="0.6"/>
            <rect x="20" y="78" width="20" height="4" fill="currentColor" opacity="0.6"/>
            <rect x="120" y="78" width="20" height="4" fill="currentColor" opacity="0.6"/>
          </svg>
        </div>
        
        {/* Elementos isométricos - Bottom Left */}
        <div className="absolute bottom-24 left-24 opacity-8">
          <svg width="140" height="140" viewBox="0 0 140 140" className="text-emerald-600">
            <defs>
              <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor:'currentColor', stopOpacity:0.6}} />
                <stop offset="100%" style={{stopColor:'currentColor', stopOpacity:0.3}} />
              </linearGradient>
            </defs>
            {/* Cubos isométricos */}
            <path d="M40 80 L70 60 L100 80 L70 100 Z" fill="url(#grad3)"/>
            <path d="M70 60 L100 80 L100 50 L70 30 Z" fill="currentColor" opacity="0.5"/>
            <path d="M40 80 L70 100 L70 70 L40 50 Z" fill="currentColor" opacity="0.4"/>
            <path d="M60 95 L80 85 L100 95 L80 105 Z" fill="currentColor" opacity="0.3"/>
            <path d="M50 70 L65 60 L80 70 L65 80 Z" fill="currentColor" opacity="0.4"/>
          </svg>
        </div>
        
        {/* Patrón abstracto - Bottom Right */}
        <div className="absolute bottom-32 right-32 opacity-8">
          <svg width="120" height="120" viewBox="0 0 120 120" className="text-purple-600">
            <defs>
              <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor:'currentColor', stopOpacity:0.7}} />
                <stop offset="100%" style={{stopColor:'currentColor', stopOpacity:0.2}} />
              </linearGradient>
            </defs>
            {/* Formas geométricas fluidas */}
            <path d="M20 60 Q40 20 80 40 Q100 60 80 80 Q60 100 20 80 Q10 70 20 60" fill="url(#grad4)"/>
            <path d="M40 60 Q55 45 70 60 Q55 75 40 60" fill="currentColor" opacity="0.6"/>
            <circle cx="60" cy="60" r="15" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
            <circle cx="60" cy="60" r="8" fill="currentColor" opacity="0.4"/>
          </svg>
        </div>
        
        {/* Elementos lineales modernos - Middle */}
        <div className="absolute top-1/2 left-10 opacity-6">
          <svg width="100" height="200" viewBox="0 0 100 200" className="text-slate-500">
            <path d="M20 0 L80 50 L20 100 L80 150 L20 200" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3"/>
            <path d="M40 0 L60 25 L40 50 L60 75 L40 100" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4"/>
          </svg>
        </div>
        
        <div className="absolute top-16 right-60 opacity-6">
          <svg width="200" height="100" viewBox="0 0 200 100" className="text-slate-500">
            <path d="M0 20 L50 80 L100 20 L150 80 L200 20" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3"/>
            <path d="M0 40 L25 60 L50 40 L75 60 L100 40" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4"/>
          </svg>
        </div>
      </div>

      {/* Fondo con patrones geométricos sutiles */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96">
          <svg width="100%" height="100%" viewBox="0 0 400 400" className="text-primary">
            <defs>
              <pattern id="hexagons" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
                <path d="M30 0 L52 15 L52 37 L30 52 L8 37 L8 15 Z" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexagons)"/>
          </svg>
        </div>
        
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full blur-3xl" />
      </div>
    </section>
  );
};

export default Hero;