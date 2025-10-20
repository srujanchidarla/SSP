'use client';

import { CartItem } from '@/lib/types';

interface CartItemProps {
  item: CartItem;
  onUpdateQuantity: (itemId: number, quantity: number) => void;
  onRemove: (itemId: number) => void;
}

export default function CartItemComponent({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const handleQuantityChange = (delta: number) => {
    const newQuantity = item.quantity + delta;
    if (newQuantity > 0) {
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  const itemTotal = item.product.price * item.quantity;

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-700">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white">{item.product.name}</h3>
          <p className="text-sm text-gray-400">Barcode: {item.product.barcode}</p>
          <p className="text-sm text-gray-300 mt-1">
            ${item.product.price.toFixed(2)} each
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Quantity Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleQuantityChange(-1)}
              className="w-8 h-8 flex items-center justify-center bg-gray-700 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              -
            </button>
            <span className="w-12 text-center font-semibold text-lg text-white">{item.quantity}</span>
            <button
              onClick={() => handleQuantityChange(1)}
              className="w-8 h-8 flex items-center justify-center bg-gray-700 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              +
            </button>
          </div>

          {/* Item Total */}
          <div className="w-24 text-right">
            <p className="text-xl font-bold text-green-400">
              ${itemTotal.toFixed(2)}
            </p>
          </div>

          {/* Remove Button */}
          <button
            onClick={() => onRemove(item.id)}
            className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            title="Remove item"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
