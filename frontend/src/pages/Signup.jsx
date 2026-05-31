import React, { useState } from 'react';
import API from "../axiosConfig";
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/api/auth/register", ...formData);
      
      toast.success('Account created successfully! Please login. 🍕', {
        style: { background: '#10B981', color: '#fff' }
      });
      
      navigate('/login');
    } catch (error) {
      console.error('Registration Error:', error);
      toast.error(error.response?.data?.message || 'Registration failed. Try again.', {
        style: { background: '#EF4444', color: '#fff' }
      });
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center">
          <span className="text-4xl">🍕</span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-500 font-medium">
            Join Pizza Palace to track and place orders
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 transition-all outline-none font-medium"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 transition-all outline-none font-medium"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 transition-all outline-none font-medium"
                placeholder="••••••••"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3.5 px-4 rounded-xl font-bold text-lg transition-colors shadow-lg shadow-red-100 hover:shadow-xl"
          >
            Sign Up
          </button>
        </form>
        <div className="text-center pt-4 border-t border-gray-50">
          <p className="text-sm text-gray-500 font-medium">
            Already have an account?{' '}
            <Link to="/login" className="text-red-600 font-bold hover:underline">
              Log in
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Signup;