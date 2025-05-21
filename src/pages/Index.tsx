
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import FilterPanel from '../components/FilterPanel';
import CarGrid from '../components/CarGrid';
import { cars, Car } from '../data/cars';
import { toast } from "sonner";

interface Filters {
  brands: string[];
  transmissions: string[];
  fuelTypes: string[];
  priceRange: [number, number];
  yearRange: [number, number];
}

const Index = () => {
  const [filteredCars, setFilteredCars] = useState<Car[]>(cars);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleFilterChange = (filters: Filters) => {
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const filtered = cars.filter(car => {
        // Filter by brand if any selected
        if (filters.brands.length > 0 && !filters.brands.includes(car.brand)) {
          return false;
        }
        
        // Filter by transmission if any selected
        if (filters.transmissions.length > 0 && !filters.transmissions.includes(car.transmission)) {
          return false;
        }
        
        // Filter by fuel type if any selected
        if (filters.fuelTypes.length > 0 && !filters.fuelTypes.includes(car.fuelType)) {
          return false;
        }
        
        // Filter by price range
        if (car.price < filters.priceRange[0] || car.price > filters.priceRange[1]) {
          return false;
        }
        
        // Filter by year range
        if (car.year < filters.yearRange[0] || car.year > filters.yearRange[1]) {
          return false;
        }
        
        return true;
      });
      
      setFilteredCars(filtered);
      setIsLoading(false);
      
      toast.info(`Found ${filtered.length} cars matching your criteria`);
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
              <h2 className="text-2xl font-bold">Available Cars</h2>
              <p className="text-gray-600">{filteredCars.length} results</p>
            </div>
            
            <CarGrid cars={filteredCars} isLoading={isLoading} />
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-100 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© {new Date().getFullYear()} CarFinder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
