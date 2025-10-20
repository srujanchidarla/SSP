'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import CartItemComponent from '@/components/CartItemComponent';
import AIRecommendations from '@/components/AIRecommendations';
import { Cart } from '@/lib/types';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';

export default function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const data = await api.cart.get();
      setCart(data);
    } catch (error) {
      toast.error('Failed to load cart');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (itemId: number, quantity: number) => {
    try {
      const response = await api.cart.updateItem(itemId, quantity);
      setCart(response.cart);
      toast.success('Quantity updated');
    } catch (error) {
      toast.error('Failed to update quantity');
      console.error(error);
    }
  };

  const handleRemoveItem = async (itemId: number) => {
    try {
      const response = await api.cart.removeItem(itemId);
      setCart(response.cart);
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error('Failed to remove item');
      console.error(error);
    }
  };

  const handleCheckout = () => {
    if (cart && cart.items.length > 0) {
      router.push('/checkout');
    }
  };

  const cartTotal = cart?.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  ) || 0;

  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Shopping Cart</h1>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading cart...</p>
          </div>
        ) : !cart || cart.items.length === 0 ? (
          <div className="bg-gray-800 shadow rounded-lg p-6 border border-gray-700">
            <p className="text-gray-300 text-center mb-4">Your cart is empty</p>
            <div className="text-center">
              <button
                onClick={() => router.push('/products')}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* AI Recommendations */}
            <AIRecommendations />

            {/* Cart Items */}
            <div className="space-y-4">
              {cart.items.map((item) => (
                <CartItemComponent
                  key={item.id}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveItem}
                />
              ))}
            </div>

            {/* Cart Summary */}
            <div className="bg-gray-800 p-6 rounded-lg shadow border border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-gray-300">
                  Total Items:
                </span>
                <span className="text-lg font-semibold text-white">
                  {cart.items.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-700">
                <span className="text-2xl font-bold text-white">
                  Total Amount:
                </span>
                <span className="text-3xl font-bold text-green-400">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => router.push('/products')}
                  className="flex-1 px-6 py-3 bg-gray-700 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={handleCheckout}
                  className="flex-1 px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
