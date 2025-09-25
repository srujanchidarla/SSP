import React from 'react';
import { useCart } from '../../contexts/CartContext';
import { PlusCircle } from 'lucide-react';

// Mock product data
const products = [
  { id: '1', name: 'Organic Apples', price: 2.99, image: 'https://via.placeholder.com/150/FFC0CB/000000?Text=Apples' },
  { id: '2', name: 'Whole Milk', price: 3.49, image: 'https://via.placeholder.com/150/89CFF0/000000?Text=Milk' },
  { id: '3', name: 'Sourdough Bread', price: 4.99, image: 'https://via.placeholder.com/150/FDFD96/000000?Text=Bread' },
  { id: '4', name: 'Free-Range Eggs', price: 5.29, image: 'https://via.placeholder.com/150/FFFFFF/000000?Text=Eggs' },
  { id: '5', name: 'Avocado', price: 1.99, image: 'https://via.placeholder.com/150/77DD77/000000?Text=Avocado' },
  { id: '6', name: 'Cheddar Cheese', price: 6.79, image: 'https://via.placeholder.com/150/FFB347/000000?Text=Cheese' },
];

const ProductGrid: React.FC = () => {
  const { addToCart } = useCart();

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <div key={product.id} className="border rounded-lg p-3 shadow-sm bg-white">
          <img src={product.image} alt={product.name} className="w-full h-24 object-cover rounded-md mb-2" />
          <h3 className="font-semibold text-sm">{product.name}</h3>
          <div className="flex justify-between items-center mt-2">
            <p className="text-gray-700">${product.price.toFixed(2)}</p>
            <button
              onClick={() => addToCart(product)}
              className="text-primary-600 hover:text-primary-800"
              aria-label={`Add ${product.name} to cart`}
            >
              <PlusCircle size={24} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;