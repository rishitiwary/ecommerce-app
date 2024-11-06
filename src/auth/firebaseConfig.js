// firebase configuration 
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCt-xxgmoAjwXf-5J8A7_OISRbfTngF_Sc',
  authDomain: 'ecommerce-app-ecac5.firebaseapp.com',
  projectId: 'ecommerce-app-ecac5',
  storageBucket: 'ecommerce-app-ecac5.firebasestorage.app',
  messagingSenderId: '766430514068',
  appId: '1:766430514068:web:3a22e32439b851707a9d81',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
