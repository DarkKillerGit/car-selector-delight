
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import FilterPanel from '../components/FilterPanel';
import CarGrid from '../components/CarGrid';
import { cars } from '../data/cars';
import { toast } from "sonner";

const Index = () => {
  const [filteredCars, setFilteredCars] = useState(cars);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleFilterChange = (filters) => {
    setIsLoading(true);
    
    // Симуляция задержки API
    setTimeout(() => {
      const filtered = cars.filter(car => {
        // Фильтр по происхождению автомобиля
        if (filters.carOrigins.length > 0 && !filters.carOrigins.includes(car.origin)) {
          return false;
        }
        
        // Фильтр по марке, только если выбраны
        if (filters.brands.length > 0 && !filters.brands.includes(car.brand)) {
          return false;
        }
        
        // Фильтр по типу кузова
        if (filters.bodyTypes.length > 0 && !filters.bodyTypes.includes(car.body?.type)) {
          return false;
        }
        
        // Фильтр по материалу кузова
        if (filters.bodyMaterials.length > 0 && !filters.bodyMaterials.includes(car.body?.material)) {
          return false;
        }
        
        // Фильтр по типу подвески
        if (filters.suspensionTypes.length > 0 && !filters.suspensionTypes.includes(car.suspension)) {
          return false;
        }
        
        // Фильтр по статусу пробега (Новая, Б/У)
        if (filters.mileageStatus.length > 0 && !filters.mileageStatus.includes(car.mileageStatus)) {
          return false;
        }
        
        // Фильтр по типу тормозов
        if (filters.brakeTypes.length > 0 && !filters.brakeTypes.includes(car.brakes)) {
          return false;
        }
        
        // Фильтр по типу коробки передач
        if (filters.transmissionTypes.length > 0 && !filters.transmissionTypes.includes(car.transmission)) {
          return false;
        }
        
        // Фильтр по типу привода
        if (filters.driveTypes.length > 0 && !filters.driveTypes.includes(car.driveType)) {
          return false;
        }
        
        // Фильтр по типу двигателя
        if (filters.fuelTypes.length > 0 && !filters.fuelTypes.includes(car.fuelType)) {
          return false;
        }
        
        // Фильтр по ценовому диапазону
        if (car.price < filters.priceRange.min || (filters.priceRange.max !== Infinity && car.price > filters.priceRange.max)) {
          return false;
        }
        
        // Фильтр по диапазону года выпуска
        if (car.year < filters.yearRange.min || (filters.yearRange.max !== Infinity && car.year > filters.yearRange.max)) {
          return false;
        }
        
        return true;
      });
      
      setFilteredCars(filtered);
      setIsLoading(false);
      
      toast.info(`Найдено ${filtered.length} автомобилей соответствующих вашим критериям`);
    }, 500);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Hero />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-8">
          <FilterPanel onFilterChange={handleFilterChange} />
          
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Доступные автомобили</h2>
              <p className="text-gray-600">{filteredCars.length} результатов</p>
            </div>
            
            <CarGrid cars={filteredCars} isLoading={isLoading} />
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-100 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© {new Date().getFullYear()} Поиск автомобилей. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
