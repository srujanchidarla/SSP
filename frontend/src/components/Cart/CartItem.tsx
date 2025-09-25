import React from 'react';
import { useCart } from '../../contexts/CartContext';
import { CartItemType } from '../../contexts/CartContext';
import { Plus, Minus, Trash2 } from 'lucide-react';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center p-2 border rounded-md shadow-sm bg-white">
      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
      <div className="flex-grow ml-4">
        <h4 className="font-semibold">{item.name}</h4>
        <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center">
        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1">
            <Minus size={16} />
        </button>
        <span className="px-3">{item.quantity}</span>
        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1">
            <Plus size={16} />
        </button>
        <button onClick={() => removeFromCart(item.id)} className="ml-4 text-red-500 p-1">
            <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;