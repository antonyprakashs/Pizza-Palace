import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import MobileProfileModal from './MobileProfileModal';

function BottomNavigation() {
  const { cart } = useCart();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const cartItemCount = cart ? cart.reduce((total, item) => total + item.quantity, 0) : 0;

  const navItemStyles = ({ isActive }) =>
    `flex flex-col items-center justify-center flex-grow py-2 text-xs font-bold transition-all duration-150 ${
      isActive ? 'text-red-600 scale-105' : 'text-gray-400 hover:text-gray-600'
    }`;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] z-40 h-16 px-2 md:hidden">
        <div className="flex items-center justify-around h-full max-w-lg mx-auto">
          
          <NavLink to="/" end className={navItemStyles}>
            <svg className="w-6 h-6 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Home</span>
          </NavLink>

          <NavLink to="/cart" className={({ isActive }) => `relative ${navItemStyles({ isActive })}`}>
            <svg className="w-6 h-6 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            {cartItemCount > 0 && (
              <span className="absolute top-1 right-5 bg-red-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                {cartItemCount}
              </span>
            )}
            <span>Cart</span>
          </NavLink>

          <NavLink to="/orders" className={navItemStyles}>
            <svg className="w-6 h-6 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            <span>Orders</span>
          </NavLink>

          <button 
            onClick={() => setIsProfileOpen(true)} 
            className={`flex flex-col items-center justify-center flex-grow py-2 text-xs font-bold transition-all duration-150 outline-none ${
              isProfileOpen ? 'text-red-600 scale-105' : 'text-gray-400'
            }`}
          >
            <svg className="w-6 h-6 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>Profile</span>
          </button>

        </div>
      </div>

      <MobileProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </>
  );
}

export default BottomNavigation;