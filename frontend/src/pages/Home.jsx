import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom'; 
import toast from 'react-hot-toast';
import pizzaBanner from '../assets/pizza-ban.jpg';

function Home({ searchQuery = '' }) {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { cart, addToCart } = useCart();

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/pizzas');
        setPizzas(response.data.pizzas);
      } catch (error) {
        console.error('Error fetching pizzas:', error);
        toast.error('Could not load menu.');
      } finally {
        setLoading(false);
      }
    };
    fetchPizzas();
  }, []);

  const handleAddToCart = (pizza) => {
    addToCart(pizza);
    toast.success(`${pizza.name} added to cart!`, {
      style: { background: '#10B981', color: '#fff' }
    });
  };

  const handleClaimOffer = () => {
    sessionStorage.setItem('firstOrderPromoApplied', 'true');
    toast.success('30% discount applied to your upcoming order!', {
      style: { background: '#1F2937', color: '#fff' }
    });
  };

  const categories = ['All', ...new Set(pizzas.map((pizza) => pizza.category).filter(Boolean))];

  const filteredPizzas = pizzas.filter((pizza) => {
    const matchesCategory = selectedCategory === 'All' || pizza.category === selectedCategory;
    const matchesAvailability = pizza.isAvailable !== false; 
    const matchesSearch = pizza.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesAvailability && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 mt-20">
        <div className="animate-spin inline-block w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="w-full -mt-4 pb-16 md:pb-0">
      <div className="w-full py-8 md:py-12 px-2 max-w-[1400px] mx-auto rounded-2xl mb-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-left w-full md:w-1/2 flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight tracking-tight text-gray-900">
              Pizza Palace Online Ordering
            </h1>
            <p className="text-gray-500 text-lg md:text-xl font-medium mb-8 leading-relaxed max-w-md">
              Yummy, hot pizza delivered fast & fresh to your door.</p>
            <button
              onClick={handleClaimOffer}
              className="self-start bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-extrabold px-6 py-3.5 rounded-xl shadow-md uppercase tracking-wider text-xs transition-all cursor-pointer border border-amber-600/10"
            >
              Flat 30% Off on First Order
            </button>
          </div>
          <div className="w-full md:w-1/2 flex justify-end">
            <img 
              src={pizzaBanner} 
              alt="Pizza Banner" 
              className="w-full max-w-[580px] h-[340px] md:h-[380px] object-cover rounded-2xl shadow-xl border border-gray-100"
            />
          </div>
        </div>
      </div>
      <div className="w-full mt-4 mb-20">
        <div className="flex flex-col items-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6 text-center">Our Pizza Menu</h2>
          <div className="flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-2.5 w-full overflow-x-auto md:overflow-x-visible px-4 pr-14 md:px-0 scrollbar-none snap-x style-scrollbar-hidden pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-bold text-xs md:text-sm transition-all duration-200 shrink-0 snap-align-start ${
                  selectedCategory === category
                    ? 'bg-red-600 text-white shadow-md scale-105'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPizzas.map((pizza) => {
            const isInCart = cart ? cart.some(item => item.pizza._id === pizza._id) : false;

            return (
              <div key={pizza._id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col h-full group">
                <div className="relative overflow-hidden h-64 bg-gray-50">
                  <img 
                    src={pizza.imageUrl} 
                    alt={pizza.name} 
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                    
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=60';
                    }}
                  />
                  
                  {pizza.category && (
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-extrabold px-3 py-1 rounded-full uppercase shadow-sm">
                      {pizza.category}
                    </span>
                  )}
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2 tracking-tight">{pizza.name}</h3>
                  <p className="text-gray-500 text-sm mb-6 line-clamp-2 leading-relaxed font-medium flex-grow">
                    {pizza.description}
                  </p>
                  
                  <div className="flex justify-between items-end mt-auto pt-4 border-t border-gray-50">
                    <div className="flex flex-col">
                      <span className="text-3xl font-extrabold text-red-600">₹{pizza.price}</span>
                    </div>
                    
                    {isInCart ? (
                      <Link to="/cart" className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-5 py-2.5 rounded-xl transition-colors text-sm shadow-md text-center">
                        Go to Cart
                      </Link>
                    ) : (
                      <button onClick={() => handleAddToCart(pizza)} className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2.5 rounded-xl transition-colors text-sm shadow-md">
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {filteredPizzas.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-gray-700">No pizzas match your search criteria.</h3>
            <button onClick={() => setSelectedCategory('All')} className="mt-4 text-red-600 font-bold hover:underline">
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default Home;