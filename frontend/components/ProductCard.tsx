'use client';

import { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-700">
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-white">{product.name}</h3>
        <p className="text-sm text-gray-400">Barcode: {product.barcode}</p>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-green-400">
          ${product.price.toFixed(2)}
        </span>
        <button
          onClick={() => onAddToCart(product)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
