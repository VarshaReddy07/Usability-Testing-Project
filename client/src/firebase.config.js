// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFTy_13uWXnP02YMd3c9bf2P_46eMlg-g",
  authDomain: "everest-apparel.firebaseapp.com",
  projectId: "everest-apparel",
  storageBucket: "everest-apparel.appspot.com",
  messagingSenderId: "600634284072",
  appId: "1:600634284072:web:83b030f614ef5c11893d1d",
  measurementId: "G-CZYV23W2TD"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);