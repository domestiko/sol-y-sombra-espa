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
    <section className="py-16 md:py-20 bg-gradient-hero relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-balance text-white drop-shadow-lg">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto text-balance">
            Testimonios reales de familias dominicanas que han confiado en nosotros
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto mb-8">
          {testimonials.map((testimonial, index) => (
            <Card key={testimonial.name} className="border-0 bg-white/10 backdrop-blur-sm h-full hover:bg-white/20 transition-all duration-200 border border-white/20">
              <CardContent className="p-4 md:p-6 h-full flex flex-col">
                {/* Quote Icon */}
                <Quote className="h-6 w-6 md:h-8 md:w-8 text-white/60 mb-3 md:mb-4" />
                
                {/* Rating */}
                <div className="flex gap-1 mb-3 md:mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 md:h-4 md:w-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-sm md:text-base text-white/80 mb-4 md:mb-6 flex-grow italic leading-relaxed">
                  "{testimonial.comment}"
                </p>

                {/* User Info */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-white/20 rounded-full flex items-center justify-center text-white font-semibold text-sm md:text-base border border-white/30">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-sm md:text-base text-white">{testimonial.name}</div>
                    <div className="text-xs md:text-sm text-white/70">
                      {testimonial.location} • {testimonial.service}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
            <Star className="h-5 w-5 text-yellow-400 fill-current" />
            <span className="font-semibold text-white">4.9/5 promedio basado en +1,000 reseñas</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;