import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.3b10473eae2b4e8d8705d9f2824cf093',
  appName: 'Doméstiko',
  webDir: 'dist',
  server: {
    url: 'https://3b10473e-ae2b-4e8d-8705-d9f2824cf093.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
    },
  },
  ios: {
    scheme: 'Doméstiko'
  }
};

export default config;