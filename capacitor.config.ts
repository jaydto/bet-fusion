import { CapacitorConfig } from '@capacitor/cli';

// import ip from 'ip';

const config: CapacitorConfig = {
  appId: 'com.betnare.app',
  appName: 'betnare',
  webDir: 'build',
  bundledWebRuntime: false,

  server: {
    // androidScheme:"betnare"
    // hostname: `${ip.address()}/`,
    hostname:"betnare",
    cleartext: true
  },


};


export default config;
