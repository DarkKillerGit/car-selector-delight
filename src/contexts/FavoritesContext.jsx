
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage when user logs in
  useEffect(() => {
    if (isAuthenticated && user) {
      const savedFavorites = localStorage.getItem(`favorites_${user.id || 'user'}`);
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } else {
      setFavorites([]);
    }
  }, [isAuthenticated, user]);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    if (isAuthenticated && user) {
      localStorage.setItem(`favorites_${user.id || 'user'}`, JSON.stringify(favorites));
    }
  }, [favorites, isAuthenticated, user]);

  const addToFavorites = (car) => {
    if (!isAuthenticated) return;
    
    setFavorites(prev => {
      if (prev.find(fav => fav.id === car.id)) {
        return prev;
      }
      return [...prev, car];
    });
  };

  const removeFromFavorites = (carId) => {
    if (!isAuthenticated) return;
    
    setFavorites(prev => prev.filter(fav => fav.id !== carId));
  };

  const toggleFavorite = (car) => {
    if (!isAuthenticated) return;
    
    const isFavorite = favorites.find(fav => fav.id === car.id);
    if (isFavorite) {
      removeFromFavorites(car.id);
    } else {
      addToFavorites(car);
    }
  };

  const isFavorite = (carId) => {
    return favorites.some(fav => fav.id === carId);
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
