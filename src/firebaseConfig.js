import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import {getAuth} from "firebase/auth"
import {getMessaging} from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyBMscvFCSUG7AvfvmmYilyrJBoxk8VoezU",
    authDomain: "BetDonjo.firebaseapp.com",
    projectId: "BetDonjo",
    storageBucket: "BetDonjo.appspot.com",
    messagingSenderId: "43489980882",
    appId: "1:43489980882:web:de63763c66f9aeafe3580b",
    measurementId: "G-MMYJQ4544J"
};
let app;
let analytics;
let messaging;
let auth;

try {
    app = initializeApp(firebaseConfig);
    analytics = getAnalytics(app);
    messaging = getMessaging(app);
    auth = getAuth(app)

} catch (error) {
    console.error("Error initializing Firebase:", error);
}

export {auth, app, analytics, messaging};

