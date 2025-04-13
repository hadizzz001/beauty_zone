'use client';

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
    if (typeof window !== 'undefined') {
      try {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : initial;
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
        return initial;
      }
    }
  });

  const [quantities, setQuantities] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedQuantities = localStorage.getItem('quantities');
      return storedQuantities ? JSON.parse(storedQuantities) : {};
    }
  });

  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined')
      localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (typeof window !== 'undefined')
      localStorage.setItem('quantities', JSON.stringify(quantities));
  }, [quantities]);

  useEffect(() => {
    const newSubtotal = cart.reduce((acc, item) => {
      const itemData = quantities[item._id];
      const q = itemData?.quantity || 1;
      return acc + item.price * q;
    }, 0);
    setSubtotal(newSubtotal);
  }, [quantities, cart]);

  const addToCart = (item, quantity = {}, data) => {
    const existingCartItemIndex = cart.findIndex(
      (cartItem) => String(cartItem._id) === String(item._id)
    );

    const newItemData = {
      quantity: (quantities[item._id]?.quantity || 0) + quantity,
      ...data, // includes size and color
    };

    if (existingCartItemIndex !== -1) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [item._id]: newItemData,
      }));

      dispatch({
        type: 'UPDATE_CART',
        payload: cart.map((cartItem) =>
          String(cartItem._id) === String(item._id)
            ? {
                ...cartItem,
                quantity: (cartItem.quantity || 0) + quantity,
                ...data,
              }
            : cartItem
        ),
      });
    } else {
      dispatch({
        type: 'ADD_TO_CART',
        payload: [
          ...cart,
          {
            ...item,
            quantity,
            ...data,
          },
        ],
      });

      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [item._id]: {
          quantity,
          ...data,
        },
      }));
    }
  };

  const removeFromCart = (itemId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });

    setQuantities((prevQuantities) => {
      const { [itemId]: removedItem, ...newQuantities } = prevQuantities;
      return newQuantities;
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
