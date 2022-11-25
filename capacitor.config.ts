import {CapacitorConfig} from '@capacitor/cli';
import {KeyboardResize, KeyboardStyle} from '@capacitor/keyboard';

const config: CapacitorConfig = {
    appId: 'com.betnare.app',
    appName: 'betnare',
    webDir: 'build',
    backgroundColor: "#012",
    bundledWebRuntime: false,

    plugins: {
        Keyboard: {
            resize: KeyboardResize.Native,
            style: KeyboardStyle.Dark,
            resizeOnFullScreen: true,
        },
        CapacitorHttp: {
            enabled: true
        },
        android: {
            allowMixedContent: true,
        },
        server: {
            allowNavigation: [
                "*"
            ],
            cleartext: false,
            hostname: "localhost",

        }
    },

};

export default config;
