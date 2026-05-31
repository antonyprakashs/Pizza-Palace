import React, { useEffect, useState } from 'react';
import API from '../axiosConfig';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const response = await API.get('/api/orders', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data.orders);
      } catch (error) {
        console.error('Error fetching admin orders:', error);
        toast.error('Failed to load orders.');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchAllOrders();
    }
  }, [token]);

  const refreshOrders = async () => {
    try {
      const response = await API.get('/api/orders', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Error refreshing orders:', error);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await API.put(`/api/orders/${orderId}/status/${newStatus}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(`Order updated to ${newStatus}!`, {
        style: { background: '#10B981', color: '#fff' }
      });
      
      refreshOrders();
    } catch (error) {
      console.error('Status update failed:', error);
      toast.error('Could not update status.');
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-32">
        <div className="animate-spin inline-block w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full"></div>
        <p className="text-gray-500 mt-4 font-medium">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 mt-12 max-w-6xl mb-20">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-extrabold text-gray-800">Admin Order Manager</h2>
        <span className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Control Panel
        </span>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-400 text-xs font-bold uppercase tracking-wider">
                <th className="p-6">Order ID / Customer</th>
                <th className="p-6">Items Ordered</th>
                <th className="p-6">Total Value</th>
                <th className="p-6">Address</th>
                <th className="p-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm font-medium text-gray-700">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-6">
                    <span className="font-mono text-xs text-gray-400 block mb-1">{order._id}</span>
                    <span className="font-bold text-gray-900 block">{order.customerId?.name || 'Admin User'}</span>
                    <span className="text-xs text-gray-500 block">{order.customerId?.email}</span>
                  </td>

                  <td className="p-6">
                    <div className="space-y-1">
                      {order.items.map((item, i) => (
                        <div key={i} className="text-xs">
                          <span className="font-bold text-red-600">{item.qty}x</span> {item.pizza?.name || 'Pizza'}
                        </div>
                      ))}
                    </div>
                  </td>

                  <td className="p-6">
                    <span className="text-base font-extrabold text-gray-900 block">₹{order.totalAmount}</span>
                    <span className="text-xs text-gray-400 block font-normal">
                      {new Date(order.createdAt).toLocaleDateString('en-IN')}
                    </span>
                  </td>

                  <td className="p-6 max-w-xs truncate font-normal text-gray-500" title={order.deliveryAddress}>
                    {order.deliveryAddress}
                  </td>

                  <td className="p-6">
                    <select
  value={order.status}
  onChange={(e) => handleStatusChange(order._id, e.target.value)}
  className={`px-3 py-2 rounded-lg font-bold text-xs uppercase tracking-wider outline-none border transition-all cursor-pointer ${
    order.status === 'Delivered' ? 'bg-green-50 border-green-200 text-green-700' :
    order.status === 'Pending' ? 'bg-yellow-50 border-yellow-200 text-yellow-700' : 
    'bg-blue-50 border-blue-200 text-blue-700'
  }`}
>
  <option value="Pending">Pending</option>
  <option value="Confirmed">Confirmed</option>
  <option value="Preparing">Preparing</option>
  <option value="Out for Delivery">Out for Delivery</option>
  <option value="Delivered">Delivered</option>
</select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {orders.length === 0 && (
            <div className="text-center py-12 text-gray-400 font-medium">No orders yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;