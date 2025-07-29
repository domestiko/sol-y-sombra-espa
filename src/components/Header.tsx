import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Menu, X, Home, LogOut, User } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-border shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Home className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">Doméstiko</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => navigate('/professionals')} className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Profesionales
            </button>
            <a href="#servicios" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Servicios
            </a>
            <a href="#como-funciona" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Cómo funciona
            </a>
            <a href="#contacto" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Contacto
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Button variant="ghost" onClick={() => navigate('/dashboard')}>
                  <User className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
                <Button variant="ghost" onClick={() => signOut()}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={() => navigate('/auth')}>
                  Iniciar sesión
                </Button>
                <Button variant="hero">
                  Solicitar servicio
                </Button>
              </>
            )}
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
              <button onClick={() => { navigate('/professionals'); setIsMenuOpen(false); }} className="text-muted-foreground hover:text-primary transition-colors font-medium py-2 text-left">
                Profesionales
              </button>
              <a href="#servicios" className="text-muted-foreground hover:text-primary transition-colors font-medium py-2" onClick={() => setIsMenuOpen(false)}>
                Servicios
              </a>
              <a href="#como-funciona" className="text-muted-foreground hover:text-primary transition-colors font-medium py-2" onClick={() => setIsMenuOpen(false)}>
                Cómo funciona
              </a>
              <a href="#contacto" className="text-muted-foreground hover:text-primary transition-colors font-medium py-2" onClick={() => setIsMenuOpen(false)}>
                Contacto
              </a>
              <div className="flex flex-col gap-3 pt-4 border-t border-border">
                {user ? (
                  <>
                    <Button variant="ghost" className="justify-start" onClick={() => { navigate('/dashboard'); setIsMenuOpen(false); }}>
                      <User className="h-4 w-4 mr-2" />
                      Dashboard
                    </Button>
                    <Button variant="ghost" className="justify-start" onClick={() => { signOut(); setIsMenuOpen(false); }}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Cerrar Sesión
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" className="justify-start" onClick={() => { navigate('/auth'); setIsMenuOpen(false); }}>
                      Iniciar sesión
                    </Button>
                    <Button variant="hero">
                      Solicitar servicio
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;