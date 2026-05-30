import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/orders/my', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchOrders();
    }
  }, [token]);

  if (loading) {
    return (
      <div className="text-center mt-32">
        <div className="animate-spin inline-block w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full" role="status"></div>
        <p className="text-gray-500 mt-4 font-medium">Loading your orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center mt-32">
        <h2 className="text-4xl font-extrabold text-gray-800">No orders found! 🍕</h2>
        <p className="text-gray-500 mt-4 text-lg">You haven't placed any delicious pizza orders yet.</p>
        <Link to="/" className="inline-block mt-8 bg-red-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors shadow-lg">
          Order Now
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 mt-12 max-w-4xl mb-20">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-8">Your Order History</h2>
      
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
            <div className="flex flex-wrap justify-between items-center border-b border-gray-100 pb-4 mb-4 gap-4">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Order ID</p>
                <p className="text-sm font-mono text-gray-600">{order._id}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Date</p>
                <p className="text-sm font-medium text-gray-700">
                  {new Date(order.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Status</p>
                <span className={`inline-block text-xs font-extrabold px-3 py-1 rounded-full uppercase mt-1 ${
                  order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                  order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                }`}>
                  {order.status}
                </span>
              </div>
            </div>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-xl">
                  <div className="flex items-center gap-4">
                    {item.pizza?.imageUrl && (
                      <img src={item.pizza.imageUrl} alt={item.pizza.name} className="w-12 h-12 object-cover rounded-lg shadow-sm" />
                    )}
                    <div>
                      <h4 className="font-bold text-gray-800">{item.pizza?.name || 'Delicious Pizza'}</h4>
                      <p className="text-xs text-gray-500 font-medium">Quantity: {item.qty}</p>
                    </div>
                  </div>
                  <div className="font-bold text-gray-700">
                    ₹{item.pizza?.price ? item.pizza.price * item.qty : ''}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
              <div className="max-w-md">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Delivered To</p>
                <p className="text-sm text-gray-600 leading-relaxed font-medium">{order.deliveryAddress}</p>
              </div>
              <div className="text-right whitespace-nowrap">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Total Amount</p>
                <p className="text-3xl font-extrabold text-red-600">₹{order.totalAmount}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;