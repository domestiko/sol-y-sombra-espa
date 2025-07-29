import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "María González",
    location: "Santo Domingo",
    service: "Plomería",
    rating: 5,
    comment: "Excelente servicio. El plomero llegó puntual y resolvió mi problema de manera muy profesional. Totalmente recomendado.",
    avatar: "MG"
  },
  {
    name: "Carlos Rodríguez", 
    location: "Santiago",
    service: "Electricidad",
    rating: 5,
    comment: "Muy satisfecho con el trabajo realizado. El electricista fue muy cuidadoso y explicó todo el proceso. Definitivamente volveré a usar Doméstiko.",
    avatar: "CR"
  },
  {
    name: "Ana Martínez",
    location: "La Romana", 
    service: "Limpieza",
    rating: 5,
    comment: "El servicio de limpieza superó mis expectativas. Mi casa quedó impecable y el personal fue muy respetuoso y profesional.",
    avatar: "AM"
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 md:py-20 bg-muted/30 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-balance">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Testimonios reales de familias dominicanas que han confiado en nosotros
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto mb-8">
          {testimonials.map((testimonial, index) => (
            <Card key={testimonial.name} className="border-0 bg-card/60 backdrop-blur-sm h-full hover:bg-card/80 transition-all duration-200">
              <CardContent className="p-4 md:p-6 h-full flex flex-col">
                {/* Quote Icon */}
                <Quote className="h-6 w-6 md:h-8 md:w-8 text-primary/30 mb-3 md:mb-4" />
                
                {/* Rating */}
                <div className="flex gap-1 mb-3 md:mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 md:h-4 md:w-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6 flex-grow italic leading-relaxed">
                  "{testimonial.comment}"
                </p>

                {/* User Info */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-primary rounded-full flex items-center justify-center text-white font-semibold text-sm md:text-base">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-sm md:text-base">{testimonial.name}</div>
                    <div className="text-xs md:text-sm text-muted-foreground">
                      {testimonial.location} • {testimonial.service}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-6 py-3">
            <Star className="h-5 w-5 text-primary fill-current" />
            <span className="font-semibold">4.9/5 promedio basado en +1,000 reseñas</span>
          </div>
        </div>

        {/* Ilustraciones profesionales de satisfacción del cliente */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-16 left-16 opacity-6">
            <svg width="160" height="160" viewBox="0 0 160 160" className="text-amber-500">
              <defs>
                <linearGradient id="testimonialGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor:'currentColor', stopOpacity:0.8}} />
                  <stop offset="100%" style={{stopColor:'currentColor', stopOpacity:0.2}} />
                </linearGradient>
              </defs>
              {/* Sistema de calificación moderno */}
              <circle cx="80" cy="80" r="60" fill="url(#testimonialGrad1)"/>
              <path d="M80 40 L90 65 L115 65 L95 82 L105 107 L80 90 L55 107 L65 82 L45 65 L70 65 Z" fill="white" opacity="0.9"/>
              <circle cx="80" cy="80" r="45" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.4"/>
              <circle cx="80" cy="80" r="30" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
            </svg>
          </div>
          
          <div className="absolute bottom-16 right-20 opacity-6">
            <svg width="140" height="140" viewBox="0 0 140 140" className="text-rose-500">
              <defs>
                <linearGradient id="testimonialGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor:'currentColor', stopOpacity:0.7}} />
                  <stop offset="100%" style={{stopColor:'currentColor', stopOpacity:0.2}} />
                </linearGradient>
              </defs>
              {/* Elemento de satisfacción */}
              <path d="M70 25 C85 15, 105 25, 115 45 C115 65, 95 85, 70 100 C45 85, 25 65, 25 45 C25 25, 45 15, 70 25" fill="url(#testimonialGrad2)"/>
              <circle cx="70" cy="70" r="40" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
              <path d="M55 60 Q70 75 85 60" stroke="white" strokeWidth="4" fill="none"/>
              <circle cx="58" cy="55" r="3" fill="white"/>
              <circle cx="82" cy="55" r="3" fill="white"/>
            </svg>
          </div>
          
          <div className="absolute top-1/2 right-16 opacity-5">
            <svg width="120" height="200" viewBox="0 0 120 200" className="text-emerald-500">
              <defs>
                <linearGradient id="testimonialGrad3" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{stopColor:'currentColor', stopOpacity:0.6}} />
                  <stop offset="100%" style={{stopColor:'currentColor', stopOpacity:0.1}} />
                </linearGradient>
              </defs>
              {/* Burbujas de comunicación */}
              <ellipse cx="60" cy="40" rx="35" ry="25" fill="url(#testimonialGrad3)"/>
              <ellipse cx="60" cy="100" rx="30" ry="20" fill="currentColor" opacity="0.4"/>
              <ellipse cx="60" cy="160" rx="25" ry="15" fill="currentColor" opacity="0.3"/>
              <path d="M60 65 Q70 75 60 85" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.5"/>
              <path d="M60 125 Q70 135 60 145" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.4"/>
            </svg>
          </div>
          
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 opacity-4">
            <svg width="200" height="80" viewBox="0 0 200 80" className="text-purple-500">
              <path d="M0 40 Q50 20 100 40 Q150 60 200 40" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3"/>
              <circle cx="50" cy="35" r="4" fill="currentColor" opacity="0.6"/>
              <circle cx="100" cy="40" r="4" fill="currentColor" opacity="0.6"/>
              <circle cx="150" cy="45" r="4" fill="currentColor" opacity="0.6"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;