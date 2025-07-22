import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.domestiko.app',
  appName: 'domestiko',
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
};

export default config;