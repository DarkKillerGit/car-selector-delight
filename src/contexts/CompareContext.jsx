
import React, { createContext, useContext, useState } from 'react';

const CompareContext = createContext();

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
};

export const CompareProvider = ({ children }) => {
  const [compareList, setCompareList] = useState([]);

  const addToCompare = (car) => {
    setCompareList(prev => {
      if (prev.find(item => item.id === car.id)) {
        return prev;
      }
      if (prev.length >= 4) {
        return prev;
      }
      return [...prev, car];
    });
  };

  const removeFromCompare = (carId) => {
    setCompareList(prev => prev.filter(item => item.id !== carId));
  };

  const toggleCompare = (car) => {
    const isInCompare = compareList.find(item => item.id === car.id);
    if (isInCompare) {
      removeFromCompare(car.id);
    } else {
      addToCompare(car);
    }
  };

  const isInCompare = (carId) => {
    return compareList.some(item => item.id === carId);
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  const value = {
    compareList,
    addToCompare,
    removeFromCompare,
    toggleCompare,
    isInCompare,
    clearCompare
  };

  return (
    <CompareContext.Provider value={value}>
      {children}
    </CompareContext.Provider>
  );
};
