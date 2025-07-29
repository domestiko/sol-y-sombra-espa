import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Instagram, 
  Twitter,
  Heart 
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-4 text-primary">Doméstiko</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Conectamos hogares con profesionales confiables para crear espacios 
              más seguros y cómodos para todas las familias.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-primary hover:bg-primary/10">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-primary hover:bg-primary/10">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-primary hover:bg-primary/10">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Servicios */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Servicios</h4>
            <ul className="space-y-3">
              {["Plomería", "Electricidad", "Jardinería", "Limpieza", "Cuidado Infantil", "Técnicos"].map((service) => (
                <li key={service}>
                  <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Compañía */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Compañía</h4>
            <ul className="space-y-3">
              {[
                "Acerca de nosotros",
                "Como funciona",
                "Ser profesional",
                "Centro de ayuda",
                "Términos y condiciones",
                "Política de privacidad"
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contacto</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <a href="mailto:info.domestiko@gmail.com" className="text-gray-300 hover:text-primary transition-colors">
                  info.domestiko@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <span className="text-gray-300">+57 (300) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-gray-300">Colombia</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <h5 className="font-medium mb-3 text-white">Newsletter</h5>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Tu email"
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-primary"
                />
                <Button variant="default" size="sm">
                  Suscribir
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 Doméstiko. Todos los derechos reservados.
            </p>
            <p className="text-gray-400 text-sm flex items-center gap-2">
              Hecho con <Heart className="h-4 w-4 text-red-500" /> para conectar hogares
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;