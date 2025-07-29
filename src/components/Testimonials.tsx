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
    <section className="py-24 bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-balance">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Testimonios reales de familias dominicanas que han confiado en nosotros
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={testimonial.name} className="border-0 bg-background/50 h-full">
              <CardContent className="p-8 h-full flex flex-col">
                {/* Quote Icon */}
                <Quote className="h-8 w-8 text-primary/30 mb-4" />
                
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-muted-foreground mb-6 flex-grow italic">
                  "{testimonial.comment}"
                </p>

                {/* User Info */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
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

        {/* Ilustraciones de confianza y satisfacción */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 opacity-8">
            <svg width="120" height="120" viewBox="0 0 120 120" className="text-yellow-400">
              {/* Estrellas de calificación */}
              <path d="M60 10 L67 37 L95 37 L73 53 L80 80 L60 64 L40 80 L47 53 L25 37 L53 37 Z" fill="currentColor" opacity="0.4"/>
              <circle cx="60" cy="60" r="35" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
            </svg>
          </div>
          
          <div className="absolute bottom-10 right-15 opacity-8">
            <svg width="100" height="100" viewBox="0 0 100 100" className="text-rose-400">
              {/* Corazón de satisfacción */}
              <path d="M50 85 C20 60, 10 30, 25 20 C35 15, 45 20, 50 30 C55 20, 65 15, 75 20 C90 30, 80 60, 50 85" fill="currentColor" opacity="0.4"/>
            </svg>
          </div>
          
          <div className="absolute top-1/2 right-10 opacity-8">
            <svg width="80" height="80" viewBox="0 0 80 80" className="text-green-400">
              {/* Burbujas de chat */}
              <ellipse cx="40" cy="35" rx="30" ry="20" fill="currentColor" opacity="0.3"/>
              <ellipse cx="50" cy="55" rx="20" ry="15" fill="currentColor" opacity="0.4"/>
              <circle cx="35" cy="30" r="3" fill="currentColor"/>
              <circle cx="40" cy="30" r="3" fill="currentColor"/>
              <circle cx="45" cy="30" r="3" fill="currentColor"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;