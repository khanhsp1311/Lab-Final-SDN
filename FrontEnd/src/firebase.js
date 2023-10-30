// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCb8IuWSUoLuVJmDWJ_xJxikiWq5A4V4hQ",
    authDomain: "chat-app-db5b9.firebaseapp.com",
    projectId: "chat-app-db5b9",
    storageBucket: "chat-app-db5b9.appspot.com",
    messagingSenderId: "489836239275",
    appId: "1:489836239275:web:9e890276db60fab57ddaee",
    measurementId: "G-4CE7F92CCN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)