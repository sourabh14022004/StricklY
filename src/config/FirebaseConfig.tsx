// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1JUhXddaMilr3lhPMQBIMcY1_qlKcb_0",
  authDomain: "strickly.firebaseapp.com",
  projectId: "strickly",
  storageBucket: "strickly.firebasestorage.app",
  messagingSenderId: "277355716853",
  appId: "1:277355716853:web:1da506a08366bda50965bc",
  measurementId: "G-4N0BWH7MLP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});