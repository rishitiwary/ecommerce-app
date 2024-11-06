// src/firebase.js
import { initializeApp } from 'firebase/app';  // Firebase v9+ modular import
import { getAuth } from 'firebase/auth'; // Firebase v9+ auth import

// Firebase config (use your actual Firebase project credentials here)
const firebaseConfig = {
  apiKey: 'AIzaSyCt-xxgmoAjwXf-5J8A7_OISRbfTngF_Sc',
  authDomain: 'ecommerce-app-ecac5.firebaseapp.com',
  projectId: 'ecommerce-app-ecac5',
  storageBucket: 'ecommerce-app-ecac5.firebasestorage.app',
  messagingSenderId: '766430514068',
  appId: '1:766430514068:web:3a22e32439b851707a9d81',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get auth instance
const auth = getAuth(app);

export { auth };
