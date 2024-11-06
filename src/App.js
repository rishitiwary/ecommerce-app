// src/App.js
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from './auth/firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';

import Navbar from './components/Navbar';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load components for better performance
const ProductList = lazy(() => import('./components/ProductList'));
const Cart = lazy(() => import('./components/Cart'));
const LoginForm = lazy(() => import('./components/LoginForm'));
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));

// Initialize Query Client
const queryClient = new QueryClient();

function App() {
  const [user] = useAuthState(auth); // Manage user authentication state
  
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Router>
          <Navbar user={user} />
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<LoginForm />} />
              {user && <Route path="/admin" element={<AdminDashboard />} />}
            </Routes>
          </Suspense>
          <ToastContainer position="top-right" autoClose={3000} />
        </Router>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
