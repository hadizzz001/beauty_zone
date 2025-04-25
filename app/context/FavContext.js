'use client';

import React, { createContext, useContext, useEffect, useReducer } from 'react';

const FavoriteContext = createContext();

const favoriteReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_FAVORITES':
      // Avoid duplicates
      if (state.some((item) => item._id === action.payload._id)) return state;
      return [...state, action.payload];
    case 'REMOVE_FROM_FAVORITES':
      return state.filter((item) => item._id !== action.payload);
    default:
      return state;
  }
};

const FavoriteProvider = ({ children }) => {
  const [favorites, dispatch] = useReducer(favoriteReducer, [], (initial) => {
    if (typeof window !== 'undefined') {
      try {
        const storedFavorites = localStorage.getItem('favorites');
        return storedFavorites ? JSON.parse(storedFavorites) : initial;
      } catch (error) {
        console.error('Error parsing favorites from localStorage:', error);
        return initial;
      }
    }
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites]);

  const addToFavorites = (item) => {
    dispatch({ type: 'ADD_TO_FAVORITES', payload: item });
  };

  const removeFromFavorites = (itemId) => {
    dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: itemId });
  };

  return (
    <FavoriteContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoriteContext.Provider>
  );
};

const useFavorites = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoriteProvider');
  }
  return context;
};

export { FavoriteProvider, useFavorites };
