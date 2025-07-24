// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3FFa_kYu1n29y0XQRHtFt5-9FZNBRkWY",
  authDomain: "khudahafiz-w2-unj22.firebaseapp.com",
  projectId: "khudahafiz-w2-unj22",
  storageBucket: "khudahafiz-w2-unj22.firebasestorage.app",
  messagingSenderId: "645337722697",
  appId: "1:645337722697:web:ff427f491528dedd1cf498",
  measurementId: "G-SXYQPM8157"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);