import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function MobileProfileModal({ isOpen, onClose }) {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogoutClick = () => {
    logout();
    onClose();
    toast.success('Logged out successfully.');
    navigate('/login');
  };

  const handleLoginRedirect = () => {
    onClose();
    navigate('/login');
  };

  return (
    <div className="fixed inset-0 z-50 md:hidden flex items-end justify-center animate-fadeIn"><div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        onClick={onClose}></div>

      <div className="bg-white w-full rounded-t-3xl p-6 relative z-10 shadow-2xl border-t border-gray-100 max-w-md transform transition-transform duration-300 ease-out pb-8">
        
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" onClick={onClose}></div>

        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-black text-gray-900 tracking-tight">Account Profile</h3>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 font-bold p-1 text-sm bg-gray-50 rounded-full w-7 h-7 flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        {token && user ? (
          <div className="space-y-6">
            
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
              <div className="mb-3">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-0.5">Name</span>
                <span className="text-base font-bold text-gray-800">{user.name || 'Customer User'}</span>
              </div>
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-0.5">Email Address</span>
                <span className="text-base font-medium text-gray-600 break-all">{user.email}</span>
              </div>
            </div>

            {user.role === 'admin' && (
              <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-2 text-center">
                <span className="text-xs font-black text-red-600 uppercase tracking-widest">Administrative Mode Active</span>
              </div>
            )}

            <button
              onClick={handleLogoutClick}
              className="w-full bg-gray-900 hover:bg-black text-white font-bold py-3.5 rounded-xl transition-colors shadow-md text-sm tracking-wide"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-500 font-medium mb-6">You are not signed in right now.</p>
            <button
              onClick={handleLoginRedirect}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl transition-colors shadow-md text-sm tracking-wide"
            >
              Go to Login Page
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default MobileProfileModal;