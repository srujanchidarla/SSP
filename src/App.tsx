// frontend/src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import Dashboard from './components/Dashboard/Dashboard';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Header from './components/Layout/Header';
import LandingPage from './components/LandingPage/LandingPage';
import Cart from './components/Cart/Cart';
import { Navigation, Receipt } from 'lucide-react';


// A helper component to protect routes that require authentication.
const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>; // Or a proper spinner component
  }
  return user ? children : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="bg-gray-50 min-h-screen">
            <Header />
            <main className="pb-20"> {/* Padding bottom to avoid overlap with bottom nav */}
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route 
                  path="/dashboard" 
                  element={<PrivateRoute><Dashboard /></PrivateRoute>} 
                />
                <Route 
                  path="/cart" 
                  element={<PrivateRoute><Cart /></PrivateRoute>} 
                />
                <Route 
                  path="/receipt" 
                  element={<PrivateRoute><Receipt /></PrivateRoute>} 
                />
                {/* Redirect any unknown path to the dashboard if logged in, or landing page if not */}
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </Routes>
            </main>
            <Navigation />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;