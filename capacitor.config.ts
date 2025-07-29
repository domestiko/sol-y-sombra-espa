import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.3b10473eae2b4e8d8705d9f2824cf093',
  appName: 'Doméstiko',
  webDir: 'dist',
  server: {
    url: 'https://3b10473e-ae2b-4e8d-8705-d9f2824cf093.lovableproject.com?forceHideBadge=true',
    cleartext: true,
    allowNavigation: ['*'],
    hostname: '3b10473e-ae2b-4e8d-8705-d9f2824cf093.lovableproject.com'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#3b82f6",
      showSpinner: false,
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      iosFadeOutDuration: 500
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#3b82f6'
    }
  },
  ios: {
    scheme: 'Doméstiko',
    minVersion: '13.0',
    webContentsDebuggingEnabled: true,
    allowsLinkPreview: false,
    handleApplicationURL: false
  },
  android: {
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: true,
    backgroundColor: "#3b82f6"
  }
};

export default config;