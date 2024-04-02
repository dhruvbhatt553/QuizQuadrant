import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: `${process.env.REACT_APP_API_BASE_URL}`,
    authDomain: `${process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}`,
    projectId: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}`,
    storageBucket: `${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}`,
    messagingSenderId: `${process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID}`,
    appId: `${process.env.REACT_APP_FIREBASE_APP_ID}`,
    measurementId: `${process.env.REACT_APP_FIREBASE_MEASUREMENT_ID}`


    // apiKey: "AIzaSyDX0iHmJoIZ4oHqkUY7-ZaF6GTKZX0hUYU",
    // authDomain: "quizquadrant-project.firebaseapp.com",
    // projectId: "quizquadrant-project",
    // storageBucket: "quizquadrant-project.appspot.com",
    // messagingSenderId: "1095498022985",
    // appId: "1:1095498022985:web:e4365eec423067f71cbf98",
    // measurementId: "G-SHMD9790ZS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const imageDB = getStorage(app);