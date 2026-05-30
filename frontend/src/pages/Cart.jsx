import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = cart ? cart.reduce((total, item) => total + (item.pizza.price * item.quantity), 0) : 0;
  const isPromoApplied = sessionStorage.getItem('firstOrderPromoApplied') === 'true';
  const discountAmount = isPromoApplied ? Math.round(subtotal * 0.3) : 0;
  const finalTotal = subtotal - discountAmount;

  const handleCheckout = async () => {
    if (!address.trim()) {
      toast.error('Please enter a full delivery address.');
      return;
    }

    setIsSubmitting(true);

  try {
    const orderData = {
      items: cart.map(item => ({
        pizza: item.pizza._id,
        qty: item.quantity
      })),
      deliveryAddress: address.trim(),
      totalAmount: finalTotal
    };

    const token = localStorage.getItem('token');

    const response = await axios.post('http://127.0.0.1:5000/api/orders', orderData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

      if (response.data) {
        toast.success('Order placed successfully.');
        
        sessionStorage.removeItem('firstOrderPromoApplied');
        
        if (clearCart) {
          clearCart();
        }

        navigate('/orders');
      }
    } catch (error) {
      console.error('Checkout Error:', error);
      toast.error(error.response?.data?.message || 'Could not process order.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="text-center mt-32 max-w-md mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">Your cart is empty</h2>
        <p className="text-gray-500 mt-3 text-base font-medium">Looks like you haven't added any pizzas yet.</p>
        <Link to="/" className="inline-block mt-8 bg-red-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-red-700 transition-colors shadow-md text-sm tracking-wide">
          Back to Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto pb-24 md:pb-12 text-left animate-fadeIn">
      <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-8">Your Order Basket</h2>
      <div className="space-y-4 mb-8">
        {cart.map((item) => (
          <div key={item.pizza._id} className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-sm gap-4">
            
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <img 
                src={item.pizza.imageUrl} 
                alt={item.pizza.name} 
                className="w-20 h-20 object-cover rounded-xl border border-gray-50 bg-gray-50 shrink-0"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=60';
                }}
              />
              <div>
                <h3 className="text-base font-bold text-gray-800 tracking-tight mb-0.5">{item.pizza.name}</h3>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{item.pizza.category}</p>
              </div>
            </div>

            <div className="flex items-center justify-between w-full sm:w-auto gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-50">
              <div className="flex items-center bg-gray-50 border border-gray-100 rounded-xl px-2 py-1">
                <button 
                  onClick={() => updateQuantity(item.pizza._id, item.quantity - 1)}
                  className="text-gray-500 hover:text-gray-800 font-bold px-2 py-0.5 text-sm select-none"
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span className="text-sm font-bold text-gray-800 px-3 min-w-6 text-center select-none">
                  {item.quantity}
                </span>
                <button 
                  onClick={() => updateQuantity(item.pizza._id, item.quantity + 1)}
                  className="text-gray-500 hover:text-gray-800 font-bold px-2 py-0.5 text-sm select-none"
                >
                  +
                </button>
              </div>

              <div className="flex items-center gap-4 ml-auto">
                <span className="text-lg font-extrabold text-gray-800 min-w-[70px] text-right">
                  ₹{item.pizza.price * item.quantity}
                </span>
                <button 
                  onClick={() => removeFromCart(item.pizza._id)}
                  className="text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100/70 p-2 rounded-xl transition-colors"
                  title="Remove item"
                >
                  Remove
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm mb-6">
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Delivery Address</label>
        <textarea 
          placeholder="Enter your full street address here..."
          rows="2"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm text-gray-800 outline-none placeholder-gray-400 focus:border-red-500/20 transition-all resize-none font-medium"
        ></textarea>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-3 max-w-sm ml-auto">
        <div className="flex justify-between text-sm font-medium text-gray-500">
          <span>Subtotal</span>
          <span className="font-semibold text-gray-700">₹{subtotal}</span>
        </div>

        {isPromoApplied && (
          <div className="flex justify-between text-sm font-semibold text-emerald-600 bg-emerald-50/70 px-3 py-2.5 rounded-xl border border-emerald-100/50">
            <div className="flex flex-col text-left">
              <span>First Order Offer</span>
              <span className="text-[10px] text-emerald-500 font-medium tracking-wide normal-case mt-0.5">30% discount applied</span>
            </div>
            <span>- ₹{discountAmount}</span>
          </div>
        )}

        <div className="flex justify-between items-baseline pt-3 border-t border-gray-100">
          <span className="text-base font-bold text-gray-800">Total:</span>
          <span className="text-3xl font-black text-red-600">₹{finalTotal}</span>
        </div>
      </div>

      <div className="mt-6 text-right">
        <button 
          onClick={handleCheckout}
          disabled={isSubmitting}
          className={`w-full sm:w-64 bg-green-500 hover:bg-green-600 active:scale-[0.99] text-white font-black py-4 rounded-xl transition-all shadow-md text-base tracking-wide cursor-pointer text-center ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Processing...' : 'Proceed to Checkout'}
        </button>
      </div>

    </div>
  );
}

export default Cart;