// src/App.tsx
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import { MainLayout } from './components/layout';
import { ProtectedRoute } from './components/auth';

// Import all the pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ScanPage from './pages/ScanPage';
import CartPage from './pages/CartPage';
import NotFoundPage from './pages/NotFoundPage';
// You can add more pages like HistoryPage, ProfilePage later

const router = createBrowserRouter([
  // Public routes
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  // Main application routes (protected)
  {
    path: '/',
    element: <MainLayout />, // The layout wraps all main pages
    children: [
      {
        element: <ProtectedRoute />, // This protects all nested children
        children: [
          {
            path: '/',
        element: <Navigate to="/home" replace />, // Redirect from root to /home
          },
          {
            path: 'home',
            element: <HomePage />,
          },
          {
            path: 'scan',
            element: <ScanPage />,
          },
          {
            path: 'cart',
            element: <CartPage />,
          },
          // Add other protected routes here (e.g., history, profile)
        ],
      },
    ],
  },
  // Catch-all 404 route
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;