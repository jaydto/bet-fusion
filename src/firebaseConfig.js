import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyBMscvFCSUG7AvfvmmYilyrJBoxk8VoezU",
    authDomain: "betnare.firebaseapp.com",
    projectId: "betnare",
    storageBucket: "betnare.appspot.com",
    messagingSenderId: "43489980882",
    appId: "1:43489980882:web:eb216065b8ece00fe3580b",
    measurementId: "G-SKE7NYZYYB"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };

