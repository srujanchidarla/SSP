'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Cart, Transaction } from '@/lib/types';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';
import Image from 'next/image';

export default function CheckoutPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const data = await api.cart.get();
      setCart(data);

      // Redirect if cart is empty
      if (!data || data.items.length === 0) {
        toast.error('Your cart is empty');
        router.push('/products');
      }
    } catch (error) {
      toast.error('Failed to load cart');
      console.error(error);
      router.push('/cart');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    setProcessing(true);
    try {
      const result = await api.transactions.checkout();
      setTransaction(result);
      toast.success('Order completed successfully!');
    } catch (error) {
      toast.error('Checkout failed. Please try again.');
      console.error(error);
    } finally {
      setProcessing(false);
    }
  };

  const cartTotal = cart?.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  ) || 0;

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <p className="text-gray-500">Loading...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (transaction) {
    return (
      <ProtectedRoute>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="mb-4">
                <svg
                  className="mx-auto h-16 w-16 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Order Completed!
              </h1>
              <p className="text-gray-600">
                Thank you for your purchase. Your order has been processed successfully.
              </p>
            </div>

            {/* Order Summary */}
            <div className="border-t border-b border-gray-200 py-6 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-semibold">#{transaction.id}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Total Items:</span>
                <span className="font-semibold">
                  {transaction.items.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-800">Total Amount:</span>
                <span className="text-2xl font-bold text-green-600">
                  ${transaction.total_amount.toFixed(2)}
                </span>
              </div>
            </div>

            {/* QR Code */}
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Payment QR Code
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Scan this QR code to complete your payment
              </p>
              <div className="inline-block p-4 bg-white border-2 border-gray-300 rounded-lg">
                {transaction.qr_code && (
                  <Image
                    src={transaction.qr_code}
                    alt="Payment QR Code"
                    width={256}
                    height={256}
                    className="mx-auto"
                  />
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => router.push('/history')}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                View Order History
              </button>
              <button
                onClick={() => router.push('/products')}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        {cart && (
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>
              <div className="space-y-3">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.product.name}</p>
                      <p className="text-sm text-gray-500">
                        ${item.product.price.toFixed(2)} × {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold text-gray-900">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="border-t mt-4 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-800">Total:</span>
                  <span className="text-2xl font-bold text-green-600">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <div className="bg-white rounded-lg shadow p-6">
              <button
                onClick={handleCheckout}
                disabled={processing}
                className="w-full px-6 py-4 bg-green-600 text-white text-lg font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-green-300"
              >
                {processing ? 'Processing...' : 'Complete Order'}
              </button>
              <button
                onClick={() => router.push('/cart')}
                className="w-full mt-3 px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Back to Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
