"use client";

import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return action.payload;
    case 'UPDATE_CART':
      return action.payload;
    case 'REMOVE_FROM_CART':
      return state.filter((item) => item._id !== action.payload);
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, [], (initial) => {
    if (typeof window !== "undefined") {
      try {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : initial;
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
        return initial;
      }
    }
    return initial;
  });

  const [quantities, setQuantities] = useState(() => {
    if (typeof window !== "undefined") {
      const storedQuantities = localStorage.getItem('quantities');
      return storedQuantities ? JSON.parse(storedQuantities) : {};
    }
    return {};
  });

  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem('quantities', JSON.stringify(quantities));
    }
  }, [quantities]);

  useEffect(() => {
    const newSubtotal = cart.reduce((acc, item) => {
      if (item.selectedNames && item.selectedNames.length > 0) {
        const totalQty = item.selectedNames.reduce((sum, n) => sum + parseInt(n.qty || "1", 10), 0);
        return acc + parseFloat(item.discount) * totalQty;
      }

      if (item.selectedSizes && item.selectedSizes.length > 0) {  
        return acc + item.selectedSizes.reduce((sum, s) => {
          const qty = parseInt(s.qty || "1", 10);
          const price = parseFloat(s.price); 
          return sum + qty * price;
        }, 0);
      }

      const quantity = quantities[item._id] || 1;
      return acc + parseFloat(item.discount) * quantity;
    }, 0); 
    

    setSubtotal(newSubtotal);
  }, [quantities, cart]);

  const addToCart = (item, quantity = 1, selectedSizes = [], selectedNames = []) => {
    const existingIndex = cart.findIndex((cartItem) => String(cartItem._id) === String(item._id));

    let totalQty = parseInt(quantity, 10);

    const processedNames = selectedNames.map((n) => ({
      ...n,
      qty: parseInt(n.qty || "0", 10),
    }));

    if (processedNames.length > 0) {
      totalQty = processedNames.reduce((sum, n) => sum + n.qty, 0);
    }

    const processedSizes = selectedSizes.map((s) => ({
      ...s,
      qty: parseInt(s.qty || "0", 10),
      price: parseFloat(s.price || item.discount),
    }));

    if (processedSizes.length > 0) {
      totalQty = processedSizes.reduce((sum, s) => sum + s.qty, 0);
    }

    const updatedItem = {
      ...item,
      discount: parseFloat(item.discount),
      quantity: totalQty,
      selectedSizes: processedSizes,
      selectedNames: processedNames,
    };

    if (existingIndex !== -1) {
      dispatch({
        type: 'UPDATE_CART',
        payload: cart.map((cartItem, index) =>
          index === existingIndex ? updatedItem : cartItem
        ),
      });
    } else {
      dispatch({
        type: 'ADD_TO_CART',
        payload: [...cart, updatedItem],
      });
    }

    setQuantities((prev) => ({
      ...prev,
      [item._id]: totalQty,
    }));
  };

  const removeFromCart = (itemId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
    setQuantities((prevQuantities) => {
      const { [itemId]: removedItem, ...rest } = prevQuantities;
      return rest;
    });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    setQuantities({});
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        quantities,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export { CartProvider, useCart };
