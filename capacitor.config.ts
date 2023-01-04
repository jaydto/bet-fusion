import { CapacitorConfig } from '@capacitor/cli';

// import ip from 'ip';

const config: CapacitorConfig = {
  appId: 'com.betnare.app',
  appName: 'betnare',
  webDir: 'build',
  bundledWebRuntime: false,
  // plugins:{
  //   LiveUpdates: true
  // },

  server: {
    // androidScheme:"betnare"
    // hostname: `${ip.address()}/`:,
    hostname:"betnare",
    cleartext: true
  },
  plugins:{
    "AppUpdate":{
      "updateUrl":""
    },
    "@capacitor/app":{}
    ,
    "SafeArea": {}
    ,
    "@capacitor/filesystem":{},


  },
  ios: {
    contentInset: "always"
  }


};


export default config;
