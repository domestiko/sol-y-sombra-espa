import { ArrowLeft, Menu, User, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Capacitor } from "@capacitor/core";

interface MobileHeaderProps {
  title?: string;
  showBack?: boolean;
  showMenu?: boolean;
  onMenuClick?: () => void;
}

export const MobileHeader = ({ 
  title, 
  showBack = true, 
  showMenu = false,
  onMenuClick 
}: MobileHeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const getPageTitle = () => {
    if (title) return title;
    
    switch (location.pathname) {
      case '/': return 'Doméstiko';
      case '/dashboard': return 'Dashboard';
      case '/professionals': return 'Profesionales';
      case '/book-service': return 'Reservar Servicio';
      case '/profile': return 'Mi Perfil';
      case '/auth': return 'Iniciar Sesión';
      case '/register-professional': return 'Registro Profesional';
      default: return 'Doméstiko';
    }
  };

  const shouldShowBack = showBack && location.pathname !== '/';
  const isHomePage = location.pathname === '/';

  return (
    <header className={`
      sticky top-0 z-50 w-full bg-primary/95 backdrop-blur-sm border-b border-primary-foreground/10
      ${Capacitor.isNativePlatform() ? 'pt-safe-area-inset-top' : ''}
    `}>
      <div className="flex items-center justify-between h-14 px-4">
        {/* Lado izquierdo */}
        <div className="flex items-center">
          {shouldShowBack ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="text-primary-foreground hover:bg-primary-foreground/20 p-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          ) : showMenu ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={onMenuClick}
              className="text-primary-foreground hover:bg-primary-foreground/20 p-2"
            >
              <Menu className="h-5 w-5" />
            </Button>
          ) : null}
        </div>

        {/* Título central */}
        <div className="flex-1 text-center">
          <h1 className="text-lg font-semibold text-primary-foreground truncate">
            {getPageTitle()}
          </h1>
        </div>

        {/* Lado derecho */}
        <div className="flex items-center space-x-2">
          {user && !isHomePage && (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary-foreground hover:bg-primary-foreground/20 p-2"
              >
                <Bell className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/profile')}
                className="text-primary-foreground hover:bg-primary-foreground/20 p-2"
              >
                <User className="h-5 w-5" />
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};