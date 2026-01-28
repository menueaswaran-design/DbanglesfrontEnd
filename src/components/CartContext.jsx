import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      // For products with size, check both id and selectedSize
      const existingItem = prevCart.find((item) => {
        if (product.selectedSize) {
          return item.id === product.id && item.selectedSize === product.selectedSize;
        }
        return item.id === product.id;
      });

      if (existingItem) return prevCart;

      // Generate unique cart ID for size variants
      const cartId = product.selectedSize 
        ? `${product.id}-${product.selectedSize}`
        : product.id;

      return [...prevCart, { ...product, cartId, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Update quantity for a cart item
  const updateQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && (item.quantity + delta > 0)
          ? { ...item, quantity: item.quantity + delta }
          : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
