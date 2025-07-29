import { Home, Search, Calendar, User, Plus } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Capacitor } from "@capacitor/core";

export const MobileBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const navItems = [
    {
      icon: Home,
      label: 'Inicio',
      path: '/',
      active: location.pathname === '/'
    },
    {
      icon: Search,
      label: 'Profesionales',
      path: '/professionals',
      active: location.pathname === '/professionals'
    },
    {
      icon: Plus,
      label: 'Reservar',
      path: '/book-service',
      active: location.pathname === '/book-service',
      primary: true
    },
    {
      icon: Calendar,
      label: 'Dashboard',
      path: '/dashboard',
      active: location.pathname === '/dashboard',
      requireAuth: true
    },
    {
      icon: User,
      label: 'Perfil',
      path: user ? '/profile' : '/auth',
      active: location.pathname === '/profile' || location.pathname === '/auth'
    }
  ];

  const handleNavigation = (path: string, requireAuth?: boolean) => {
    if (requireAuth && !user) {
      navigate('/auth');
      return;
    }
    navigate(path);
  };

  return (
    <nav className={`
      fixed bottom-0 left-0 right-0 z-50 
      bg-background/95 backdrop-blur-sm border-t border-border
      ${Capacitor.isNativePlatform() ? 'pb-safe-area-inset-bottom' : ''}
    `}>
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.active;
          
          return (
            <Button
              key={item.path}
              variant="ghost"
              size="sm"
              onClick={() => handleNavigation(item.path, item.requireAuth)}
              className={`
                flex flex-col items-center justify-center h-12 px-2 py-1 min-w-0 flex-1
                ${isActive 
                  ? 'text-primary bg-primary/10' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }
                ${item.primary 
                  ? 'mx-1 bg-primary text-primary-foreground hover:bg-primary-hover rounded-full' 
                  : ''
                }
              `}
            >
              <Icon className={`h-5 w-5 ${item.primary ? 'mb-0' : 'mb-1'}`} />
              {!item.primary && (
                <span className="text-xs font-medium truncate">{item.label}</span>
              )}
            </Button>
          );
        })}
      </div>
    </nav>
  );
};