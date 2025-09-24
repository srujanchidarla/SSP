import React from 'react';
import { useCart } from '../../contexts/CartContext';

import Button from '../Common/Button';
import { useNavigate } from 'react-router-dom';
import CartItem from './CartItem';

const Cart: React.FC = () => {
  const { cartItems, cartTotal, itemCount } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    // In a real app, you would process payment here
    navigate('/receipt');
  };
  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Cart ({itemCount})</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div>
          <div className="space-y-4">
            {cartItems.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between items-center font-bold text-lg">
              <span>Total:</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <Button onClick={handleCheckout} className="mt-4">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;