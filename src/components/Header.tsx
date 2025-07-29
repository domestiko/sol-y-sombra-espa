import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Menu, X, User, LogOut } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/50 shadow-soft">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer group" 
            onClick={() => navigate('/')}
          >
            <div className="w-7 h-7 bg-primary rounded-md flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="text-primary-foreground font-bold text-sm">D</span>
            </div>
            <span className="text-lg font-semibold">Doméstiko</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => navigate('/professionals')} 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Profesionales
            </button>
            <button 
              onClick={() => navigate('/book-service')} 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Servicios
            </button>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
                  <User className="h-4 w-4 mr-2" />
                  Panel
                </Button>
                <Button variant="ghost" size="sm" onClick={() => signOut()}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={() => navigate('/auth')}>
                  Iniciar sesión
                </Button>
                <Button size="sm" onClick={() => navigate('/book-service')}>
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
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col gap-2">
              <button 
                onClick={() => { navigate('/professionals'); setIsMenuOpen(false); }} 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-3 text-left"
              >
                Profesionales
              </button>
              <button 
                onClick={() => { navigate('/book-service'); setIsMenuOpen(false); }} 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-3 text-left"
              >
                Servicios
              </button>
              
              <div className="flex flex-col gap-2 pt-4 border-t">
                {user ? (
                  <>
                    <Button variant="ghost" size="sm" className="justify-start" onClick={() => { navigate('/dashboard'); setIsMenuOpen(false); }}>
                      <User className="h-4 w-4 mr-2" />
                      Panel
                    </Button>
                    <Button variant="ghost" size="sm" className="justify-start" onClick={() => { signOut(); setIsMenuOpen(false); }}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Cerrar Sesión
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" size="sm" className="justify-start" onClick={() => { navigate('/auth'); setIsMenuOpen(false); }}>
                      Iniciar sesión
                    </Button>
                    <Button size="sm" onClick={() => { navigate('/book-service'); setIsMenuOpen(false); }}>
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