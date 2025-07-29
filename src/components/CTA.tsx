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
    <section className="py-24 bg-primary relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-balance">
            ¿Listo para comenzar?
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto text-balance">
            Únete a nuestra plataforma y conecta con profesionales verificados o haz crecer tu negocio.
          </p>
        </div>

        {/* Dual CTA */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Para Usuarios */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
            <div className="text-center mb-6 space-y-3">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Para Usuarios</h3>
              <p className="text-white/80 text-sm">
                Encuentra profesionales confiables para tu hogar
              </p>
            </div>
            
            <Button 
              className="w-full bg-white text-primary hover:bg-white/90"
              size="lg"
              onClick={() => navigate('/book-service')}
            >
              Solicitar servicio
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Para Profesionales */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
            <div className="text-center mb-6 space-y-3">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Para Profesionales</h3>
              <p className="text-white/80 text-sm">
                Haz crecer tu negocio y encuentra nuevos clientes
              </p>
            </div>
            
            <Button 
              variant="outline"
              className="w-full border-white/30 text-white hover:bg-white hover:text-primary"
              size="lg"
              onClick={() => navigate('/register-professional')}
            >
              Registrarme como profesional
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="text-center mt-16 space-y-4">
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