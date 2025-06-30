
import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext(undefined);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const addToFavorites = (car) => {
    const newFavorites = [...favorites, car];
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const removeFromFavorites = (carId) => {
    const newFavorites = favorites.filter(car => car.id !== carId);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const toggleFavorite = (car) => {
    if (isFavorite(car.id)) {
      removeFromFavorites(car.id);
    } else {
      addToFavorites(car);
    }
  };

  const isFavorite = (carId) => {
    return favorites.some(car => car.id === carId);
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addToFavorites,
      removeFromFavorites,
      toggleFavorite,
      isFavorite
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
