// src/pages/HomePage.tsx
import React from 'react';

const HomePage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
      <p className="mt-4 text-gray-600">
        Welcome to SmartScan Pro! Select 'Scan' from the navigation bar to begin adding items to your cart.
      </p>
      {/* In the future, this page could show featured products, promotions, etc. */}
    </div>
  );
};

export default HomePage;