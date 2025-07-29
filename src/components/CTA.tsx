import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Users, Briefcase } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CTA = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registrando email:", email);
    setEmail("");
  };

  return (
    <section className="py-16 md:py-20 bg-primary relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 text-balance">
            ¿Listo para comenzar?
          </h2>
          <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto text-balance">
            Únete a nuestra plataforma y conecta con profesionales verificados o haz crecer tu negocio.
          </p>
        </div>

        {/* Dual CTA */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8">
          {/* Para Usuarios */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/20">
            <div className="text-center mb-6 space-y-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto">
                <Users className="h-5 w-5 md:h-6 md:w-6 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-white">Para Usuarios</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                Encuentra profesionales confiables para tu hogar
              </p>
            </div>
            
            <Button 
              className="w-full bg-white text-primary hover:bg-white/90 font-semibold"
              size="lg"
              onClick={() => navigate('/book-service')}
            >
              Solicitar servicio
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Para Profesionales */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/20">
            <div className="text-center mb-6 space-y-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto">
                <Briefcase className="h-5 w-5 md:h-6 md:w-6 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-white">Para Profesionales</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                Haz crecer tu negocio y encuentra nuevos clientes
              </p>
            </div>
            
            <Button 
              variant="outline"
              className="w-full border-white/30 text-white hover:bg-white hover:text-primary font-semibold"
              size="lg"
              onClick={() => navigate('/register-professional')}
            >
              Registrarme como profesional
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="text-center space-y-3">
          <p className="text-white/80 text-sm">
            Más de 1,000 conexiones exitosas realizadas
          </p>
          <div className="flex justify-center items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-1 h-1 bg-white/60 rounded-full" />
            ))}
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
      </div>
    </section>
  );
};

export default CTA;