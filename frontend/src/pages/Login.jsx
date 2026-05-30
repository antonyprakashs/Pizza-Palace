import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault(); 

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/auth/login', {
        email: email, 
        password,
      });
      login(response.data.token);

      toast.success('Successfully logged in!', {
        style: { background: '#10B981', color: '#fff' } 
      });
      navigate('/');
      
    } catch (error) {
      toast.error('Invalid email or password', {
        style: { background: '#EF4444', color: '#fff' } 
      });
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center mt-20 mb-20">
      <div className="bg-white p-10 rounded-2xl shadow-2xl border border-gray-100 w-full max-w-md">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-2">Welcome Back</h2>
        <p className="text-center text-gray-500 mb-8 font-medium">Log in to Pizza Palace</p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-bold mb-2">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 transition-colors outline-none"
              placeholder="admin@pizza.com"
              required 
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 transition-colors outline-none"
              placeholder="••••••••"
              required 
            />
          </div>
          <button type="submit" 
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors shadow-lg mt-4">
            Sign In
          </button>
        </form>
        <div className="text-center pt-4 border-t border-gray-50">
          <p className="text-sm text-gray-500 font-medium">
            New to Pizza Palace?{' '}
            <Link to="/register" className="text-red-600 font-bold hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;