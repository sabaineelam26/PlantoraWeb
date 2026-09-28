import React, { createContext, useState, useEffect } from 'react';

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  // Load from local storage if available
  useEffect(() => {
    const savedCart = localStorage.getItem('plantora-cart');
    const savedWishlist = localStorage.getItem('plantora-wishlist');
    
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist));
    }
  }, []);

  // Save to local storage when changed
  useEffect(() => {
    localStorage.setItem('plantora-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('plantora-wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToCart = (item, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(p => p.id === item.id);
      if (existing) {
        return prev.map(p => p.id === item.id ? { ...p, quantity: p.quantity + quantity } : p);
      }
      return [...prev, { ...item, quantity }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateCartQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const addToWishlist = (item) => {
    setWishlistItems(prev => {
      if (prev.find(p => p.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
  };

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    wishlistItems,
    addToWishlist,
    removeFromWishlist
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
