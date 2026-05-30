import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 pt-16 pb-8 border-t border-gray-900 tracking-wide mt-20">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 text-left">
          
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-4">Order Now</h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li><Link to="/" className="hover:text-white transition-colors">Deals</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Pizza</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Sides</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Drinks</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Desserts</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-4">About</h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li><Link to="/" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Contactless delivery</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Nutrition</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Career</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-4">Our Policies</h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li><Link to="/" className="hover:text-white transition-colors">Privacy</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Responsible disclosure</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">FAQs & Help</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-4">Visit Pizza Palace</h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li><Link to="/" className="hover:text-white transition-colors">Locate a store</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Global Blog</Link></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-900/60 py-6 my-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
          <p className="text-xs text-gray-400 font-medium">Help us in serving you better</p>
          <button className="bg-white hover:bg-gray-100 text-gray-950 text-xs font-bold px-5 py-2.5 rounded-lg transition-all shadow-sm active:scale-95 cursor-pointer">
            Give Feedback
          </button>
        </div>

        <div className="text-center text-[11px] text-gray-600 space-y-3 pt-4 border-t border-gray-900/40">
          <p className="leading-relaxed max-w-3xl mx-auto font-medium">
            Order a delicious pizza on the go, anywhere, anytime. Pizza Palace is happy to assist you with your home delivery. Every time you order, you get a hot and fresh pizza delivered at your doorstep in less than thirty minutes. *T&C Apply. Hurry up and place your order now!
          </p>
          <p className="font-semibold text-gray-500">
            &copy; {new Date().getFullYear()} Pizza Palace India. All rights reserved. License Number: 10017011004220
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;