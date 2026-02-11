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
      // Normalize product ID
      const productId = String(product.id || product._id);
      
      // For products with size, check both id and selectedSize
      const existingItem = prevCart.find((item) => {
        const itemId = String(item.id || item._id);
        if (product.selectedSize) {
          return itemId === productId && item.selectedSize === product.selectedSize;
        }
        return itemId === productId;
      });

      if (existingItem) return prevCart;

      // Generate unique cart ID for size variants
      const cartId = product.selectedSize 
        ? `${productId}-${product.selectedSize}`
        : productId;

      return [...prevCart, { ...product, id: productId, cartId, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => String(item.id || item._id) !== String(id)));
  };

  // Update quantity for a cart item
  const updateQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        String(item.id || item._id) === String(id) && (item.quantity + delta > 0)
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
