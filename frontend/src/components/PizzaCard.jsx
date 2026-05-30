import React from 'react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

function PizzaCard({ pizza }) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(pizza);
    toast.success(`${pizza.name} added to cart!`, {
      position: 'bottom-right',
      style: {
        background: '#333',
        color: '#fff',
      },
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
      <img
        src={pizza.imageUrl}
        alt={pizza.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800">{pizza.name}</h3>
        <p className="text-gray-600 text-sm mt-2 h-12 overflow-hidden">
          {pizza.description}
        </p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-2xl font-extrabold text-red-600">₹{pizza.price}</span>
          {/* 4. Trigger the function on click */}
          <button 
            onClick={handleAdd}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default PizzaCard;