import React, { useEffect } from 'react';
import { useCart } from '../../contexts/CartContext';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Receipt: React.FC = () => {
  const { clearCart } = useCart();

  // Clear the cart when the component mounts
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="flex flex-col items-center justify-center text-center p-4 mt-10">
      <CheckCircle size={64} className="text-green-500 mb-4" />
      <h1 className="text-2xl font-bold mb-2">Thank You!</h1>
      <p className="text-gray-600 mb-6">Your purchase was successful.</p>
      <Link to="/dashboard" className="text-primary-600 hover:underline">
        Back to Home
      </Link>
    </div>
  );
};

export default Receipt;