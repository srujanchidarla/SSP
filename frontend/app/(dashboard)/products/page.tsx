'use client';

import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function ProductsPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="mt-2 text-sm text-gray-600">
            Welcome, {user?.email}! Scan or search for products to add to your cart.
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-gray-500 text-center">
            Product scanning and browsing will be implemented in Phase 2
          </p>
        </div>
      </div>
    </ProtectedRoute>
  );
}
