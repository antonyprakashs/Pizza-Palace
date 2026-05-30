import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; 
import Navbar from './components/Navbar';
import BottomNavigation from './components/BottomNavigation';
import Home from './pages/Home';
import Cart from './pages/Cart'; 
import Login from './pages/Login'; 
import Orders from './pages/Orders';
import AdminDashboard from './pages/AdminDashboard';
import Signup from './pages/Signup';
import AdminPizzas from './pages/AdminPizzas';
import Footer from './components/Footer';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar onSearch={setSearchQuery} /> 
      <Toaster />
      
      <main className="flex-grow w-full max-w-[1400px] mx-auto p-4 md:p-8">
        <Routes>
          <Route path="/" element={<Home searchQuery={searchQuery} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/pizzas" element={<AdminPizzas />} />
          <Route path="/register" element={<Signup />} />
        </Routes>
      </main>

      <Footer />
      <BottomNavigation />
    </div>
  );
}

export default App;