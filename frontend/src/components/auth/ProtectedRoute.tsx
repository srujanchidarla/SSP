// src/components/auth/ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// This is a placeholder hook. We will create the real one later
// which will check the auth state from Zustand or Context.
const useAuth = () => {
  // For demonstration, we'll hardcode the authentication status.
  // In the real app, this would check for a valid JWT token.
  const isAuthenticated = true; // <-- CHANGE TO false TO TEST REDIRECTION
  return { isAuthenticated };
};

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to. This allows us to send them along to that page after they
    // log in, which is a nicer user experience.
    return <Navigate to="/login" replace />;
  }

  // If the user is authenticated, render the child routes.
  return <Outlet />;
};

export default ProtectedRoute;