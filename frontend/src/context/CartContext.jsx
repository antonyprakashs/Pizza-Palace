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
  const addToCart = (payload) => {
    setCart((prevCart) => {
      let targetId;
      let pizzaData = null;

      if (typeof payload === 'string') {
        targetId = payload;
      } else if (payload && payload.pizza && payload.pizza._id) {
        targetId = payload.pizza._id;
        pizzaData = payload.pizza;
      } else if (payload && payload._id) {
        targetId = payload._id;
        pizzaData = payload;
      } else {
        console.error("addToCart received invalid payload:", payload);
        return prevCart;
      }

      const existingItem = prevCart.find((item) => item.pizza._id === targetId);

      if (existingItem) {
        // Exists: Just increment
        return prevCart.map((item) =>
          item.pizza._id === targetId
            ? { ...item, quantity: item.quantity + 1, qty: item.qty + 1 }
            : item
        );
      }

      if (pizzaData) {
        return [...prevCart, { pizza: pizzaData, quantity: 1, qty: 1 }];
      }

      return prevCart;
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