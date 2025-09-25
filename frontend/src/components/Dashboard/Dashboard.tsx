import React from 'react';

import { useAuth } from '../../contexts/AuthContext';
import ProductGrid from './ProductGrid';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user?.name || 'User'}!</h1>
      <p className="text-gray-600 mb-6">Select products to add to your cart.</p>
      <ProductGrid />
    </div>
  );
};

export default Dashboard;