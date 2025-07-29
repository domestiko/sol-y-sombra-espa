import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Smartphone, Download } from "lucide-react";
import { useState } from "react";

const CTA = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí se manejaría el registro
    console.log("Registrando email:", email);
    setEmail("");
  };

  return (
    <section className="py-20 bg-gradient-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            ¿Listo para transformar tu hogar?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Únete a Doméstiko y accede a una red de profesionales confiables. 
            Regístrate ahora y recibe tu primer servicio con descuento especial.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Dual Registration */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Para Usuarios */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 animate-scale-in">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Para Usuarios</h3>
                <p className="text-white/80">Encuentra profesionales para tu hogar</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Tu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30"
                  required
                />
                <Button 
                  type="submit" 
                  variant="secondary" 
                  className="w-full"
                  size="lg"
                >
                  Solicitar servicio
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </div>

            {/* Para Profesionales */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 animate-scale-in" style={{animationDelay: "0.2s"}}>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Para Profesionales</h3>
                <p className="text-white/80">Haz crecer tu negocio con nosotros</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Tu email profesional"
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30"
                  required
                />
                <Button 
                  type="submit" 
                  variant="professional" 
                  className="w-full bg-white text-primary hover:bg-white/90"
                  size="lg"
                >
                  Registrarme como profesional
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </div>
          </div>

          {/* App Download */}
          <div className="text-center animate-fade-in">
            <p className="text-white/90 mb-6">Próximamente disponible en:</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/30">
                <span className="text-white font-medium">📱 App Store</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/30">
                <span className="text-white font-medium">🤖 Google Play</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;