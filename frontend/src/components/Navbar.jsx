import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import pizzaIcon from '../assets/pizza.svg';

function Navbar({ onSearch }) {
  const { token, user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchText, setSearchText] = useState('');

  const cartItemCount = cart ? cart.reduce((total, item) => total + item.quantity, 0) : 0;

  const handleLogoutClick = () => {
    logout();
    setIsAdminModalOpen(false);
    toast.success('Logged out successfully.');
    navigate('/login');
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const linkStyles = ({ isActive }) => 
    `font-semibold text-sm transition-colors tracking-wide ${
      isActive ? 'text-yellow-300 font-bold' : 'text-white hover:text-yellow-100'
    }`;

  const adminModalLinkStyles = ({ isActive }) =>
    `block w-full text-center py-3 px-4 rounded-xl font-bold text-base transition-all ${
      isActive 
        ? 'bg-red-50 text-red-600 border border-red-100' 
        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
    }`;

  return (
    <nav className="bg-red-600 text-white shadow-md relative z-50 sticky top-0">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        
        <Link to="/" className="flex items-center gap-2.5 group">
          <img 
            src={pizzaIcon} 
            alt="Pizza Logo" 
            className="w-7 h-7 object-contain shrink-0 transition-transform group-hover:scale-105" 
          />
          <span className="text-2xl font-black tracking-tight">Pizza Palace</span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <NavLink to="/" end className={linkStyles}>Menu</NavLink>
          
          <NavLink to="/cart" className={({ isActive }) => `relative flex items-center ${linkStyles({ isActive })}`}>
            <span>Cart</span>
            {cartItemCount > 0 && (
              <span className="absolute -top-2.5 -right-4 bg-yellow-400 text-red-700 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                {cartItemCount}
              </span>
            )}
          </NavLink>

          {token ? (
            <div className="flex items-center space-x-6">
              {user?.role === 'admin' && (
                <div className="flex items-center space-x-6 border-r-2 border-red-500 pr-6 mr-2">
                  <NavLink to="/admin" end className={linkStyles}>Order Manager</NavLink>
                  <NavLink to="/admin/pizzas" className={linkStyles}>Menu Manager</NavLink>
                </div>
              )}
              <NavLink to="/orders" className={linkStyles}>My Orders</NavLink>
              <button onClick={handleLogoutClick} className="font-semibold text-sm text-white hover:text-yellow-200 cursor-pointer transition-colors">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-6">
              <NavLink to="/login" className={linkStyles}>Login</NavLink>
              <NavLink to="/register" className={linkStyles}>Register</NavLink>
            </div>
          )}
        </div>

        <div className="flex md:hidden items-center justify-end flex-grow gap-2">
          
          <div className={`transition-all duration-300 flex items-center ${isSearchExpanded ? 'w-full' : 'w-10'}`}>
            {isSearchExpanded ? (
              <div className="relative w-full flex items-center bg-red-700 rounded-xl px-3 py-1.5 border border-red-500/30">
                <svg className="w-5 h-5 text-red-200 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input 
                  type="text" 
                  value={searchText}
                  onChange={handleSearchChange}
                  placeholder="Search pizzas..."
                  className="bg-transparent text-white text-sm outline-none placeholder-red-300 w-full"
                  autoFocus
                />
                <button 
                  onClick={() => { setIsSearchExpanded(false); setSearchText(''); if(onSearch) onSearch(''); }}
                  className="text-red-200 hover:text-white font-bold ml-1 text-xs"
                >
                  ✕
                </button>
              </div>
            ) : (
              <button 
                onClick={() => { setIsSearchExpanded(true); navigate('/'); }}
                className="p-2 hover:bg-red-700/50 rounded-xl transition-colors cursor-pointer"
                title="Search"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            )}
          </div>

          {token && user?.role === 'admin' && !isSearchExpanded && (
            <button 
              onClick={() => setIsAdminModalOpen(true)}
              className="p-2 bg-red-700/40 border border-red-500/30 rounded-xl font-bold text-xs flex items-center gap-1 cursor-pointer whitespace-nowrap"
            >
              Controls
            </button>
          )}
        </div>

      </div>

      {isAdminModalOpen && user?.role === 'admin' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fadeIn">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsAdminModalOpen(false)}></div>
          <div className="bg-white text-gray-800 rounded-2xl shadow-2xl p-6 w-full max-w-sm relative z-10 border border-gray-100">
            <div className="flex justify-between items-center border-b pb-3 mb-5">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-gray-900 tracking-tight">Admin Control Panel</h3>
              </div>
              <button onClick={() => setIsAdminModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold p-1 leading-none cursor-pointer">✕</button>
            </div>
            <div className="space-y-3">
              <NavLink to="/admin" end onClick={() => setIsAdminModalOpen(false)} className={adminModalLinkStyles}>Order Manager</NavLink>
              <NavLink to="/admin/pizzas" onClick={() => setIsAdminModalOpen(false)} className={adminModalLinkStyles}>Menu Manager</NavLink>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100">
              <button onClick={handleLogoutClick} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-md text-sm cursor-pointer">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;