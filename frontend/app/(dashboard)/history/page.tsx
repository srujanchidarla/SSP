'use client';

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Transaction } from '@/lib/types';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';
import Image from 'next/image';

export default function HistoryPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const data = await api.transactions.getHistory();
      console.log('Transaction history data:', data);
      setTransactions(data);
    } catch (error) {
      toast.error('Failed to load transaction history');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Transaction History</h1>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-300">Loading history...</p>
          </div>
        ) : transactions.length === 0 ? (
          <div className="bg-gray-800 shadow rounded-lg p-6 border border-gray-700">
            <p className="text-gray-300 text-center">No transaction history yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="bg-gray-800 shadow rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer border border-gray-700"
                onClick={() => setSelectedTransaction(transaction)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="text-lg font-semibold text-white">
                        Order #{transaction.id}
                      </h3>
                      <span className="px-3 py-1 bg-green-900 text-green-300 text-xs font-semibold rounded-full">
                        Paid
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">
                      {formatDate(transaction.created_at)}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      {transaction.items?.reduce((sum, item) => sum + item.quantity, 0) || 0} item(s)
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-400">
                      ${transaction.total_amount.toFixed(2)}
                    </p>
                    <button className="mt-2 text-blue-400 hover:text-blue-300 text-sm font-medium">
                      View Exit Pass →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Transaction Detail Modal */}
        {selectedTransaction && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedTransaction(null)}
          >
            <div
              className="bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 border border-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">
                  Order #{selectedTransaction.id}
                </h2>
                <button
                  onClick={() => setSelectedTransaction(null)}
                  className="text-gray-400 hover:text-gray-300 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-400 mb-1">Order Date</p>
                <p className="font-semibold text-white">{formatDate(selectedTransaction.created_at)}</p>
              </div>

              {/* Items List */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">Items</h3>
                <div className="space-y-2">
                  {selectedTransaction.items?.map((item) => (
                    <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-700">
                      <div className="flex-1">
                        <p className="font-medium text-white">{item.product?.name || 'Product'}</p>
                        <p className="text-sm text-gray-400">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-white">
                        ${(item.price_at_purchase * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-700 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-300">Total Paid:</span>
                  <span className="text-2xl font-bold text-green-400">
                    ${selectedTransaction.total_amount.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* QR Code - Exit Pass */}
              <div className="text-center border-t border-gray-700 pt-6">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Exit Pass
                </h3>
                <p className="text-sm text-gray-300 mb-4">
                  Show this QR code at the exit to leave the store
                </p>
                {selectedTransaction.qr_code ? (
                  <div className="inline-block p-4 bg-gray-900 border-2 border-gray-600 rounded-lg">
                    <Image
                      src={selectedTransaction.qr_code}
                      alt="Exit Pass QR Code"
                      width={200}
                      height={200}
                      className="mx-auto"
                      unoptimized
                    />
                  </div>
                ) : (
                  <p className="text-sm text-red-400">QR code not available for this transaction</p>
                )}
                <p className="text-xs text-gray-400 mt-3">
                  Order #{selectedTransaction.id}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
