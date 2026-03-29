import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.smartdive.ai',
  appName: 'Smart Dive AI',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
