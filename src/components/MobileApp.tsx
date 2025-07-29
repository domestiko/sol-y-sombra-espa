import { useEffect } from 'react';
import { StatusBar, Style } from '@capacitor/status-bar';
import { App as CapacitorApp } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';

interface MobileAppProps {
  children: React.ReactNode;
}

export const MobileApp = ({ children }: MobileAppProps) => {
  useEffect(() => {
    const initializeMobileApp = async () => {
      if (Capacitor.isNativePlatform()) {
        // Configurar la barra de estado para una experiencia nativa
        await StatusBar.setStyle({ style: Style.Dark });
        await StatusBar.setBackgroundColor({ color: '#3b82f6' });
        
        // Configurar el comportamiento de la app
        await StatusBar.setOverlaysWebView({ overlay: false });
        
        // Manejar el botón de retroceso en Android
        CapacitorApp.addListener('backButton', ({ canGoBack }) => {
          if (!canGoBack) {
            CapacitorApp.exitApp();
          } else {
            window.history.back();
          }
        });
      }
    };

    initializeMobileApp();

    return () => {
      if (Capacitor.isNativePlatform()) {
        CapacitorApp.removeAllListeners();
      }
    };
  }, []);

  return (
    <div className={`min-h-screen bg-background ${Capacitor.isNativePlatform() ? 'mobile-app' : ''}`}>
      {children}
    </div>
  );
};