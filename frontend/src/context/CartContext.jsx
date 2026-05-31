import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('pizza_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('pizza_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (pizzaOrItem) => {
  const actualPizza = pizzaOrItem.pizza ? pizzaOrItem.pizza : pizzaOrItem;

  setCart((prevCart) => {
    const existingItem = prevCart.find((item) => item.pizza._id === actualPizza._id);
    
    if (existingItem) {
      return prevCart.map((item) =>
        item.pizza._id === actualPizza._id 
          ? { ...item, quantity: item.quantity + 1, qty: item.qty + 1 } 
          : item
      );
    }
    
    return [...prevCart, { pizza: actualPizza, quantity: 1, qty: 1 }];
  });
};

  const decreaseQuantity = (pizzaId) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.pizza._id === pizzaId);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((item) =>
          item.pizza._id === pizzaId ? { ...item, quantity: item.quantity - 1, qty: item.qty - 1 } : item
        );
      }
      return prevCart.filter((item) => item.pizza._id !== pizzaId);
    });
  };

  const removeFromCart = (pizzaId) => {
    setCart((prevCart) => prevCart.filter((item) => item.pizza._id !== pizzaId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, decreaseQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};