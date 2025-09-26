// src/pages/CartPage.tsx
import React from 'react';

const CartPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">Your Cart</h1>
      <div className="mt-8">
        {/* The <Cart /> component will go here */}
        <p className="text-gray-500">Your shopping cart is currently empty.</p>
      </div>
    </div>
  );
};

export default CartPage;