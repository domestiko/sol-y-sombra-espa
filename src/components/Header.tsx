import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X, Home } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-border shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Home className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">Doméstiko</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#servicios" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Servicios
            </a>
            <a href="#como-funciona" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Cómo funciona
            </a>
            <a href="#profesionales" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Para profesionales
            </a>
            <a href="#contacto" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Contacto
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost">
              Iniciar sesión
            </Button>
            <Button variant="hero">
              Solicitar servicio
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-4">
              <a href="#servicios" className="text-muted-foreground hover:text-primary transition-colors font-medium py-2">
                Servicios
              </a>
              <a href="#como-funciona" className="text-muted-foreground hover:text-primary transition-colors font-medium py-2">
                Cómo funciona
              </a>
              <a href="#profesionales" className="text-muted-foreground hover:text-primary transition-colors font-medium py-2">
                Para profesionales
              </a>
              <a href="#contacto" className="text-muted-foreground hover:text-primary transition-colors font-medium py-2">
                Contacto
              </a>
              <div className="flex flex-col gap-3 pt-4 border-t border-border">
                <Button variant="ghost" className="justify-start">
                  Iniciar sesión
                </Button>
                <Button variant="hero">
                  Solicitar servicio
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;