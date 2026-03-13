import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (menuItem, quantity) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === menuItem.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === menuItem.id 
            ? { ...item, quantity: item.quantity + quantity, total: (item.quantity + quantity) * menuItem.price }
            : item
        );
      }
      return [...prev, { ...menuItem, quantity, total: quantity * menuItem.price }];
    });
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};