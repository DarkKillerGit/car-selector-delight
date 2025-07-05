
import React, { useState, useMemo } from 'react';
import { useCars } from '../hooks/useCars';
import Header from '../components/Header';
import Hero from '../components/Hero';
import CarGrid from '../components/CarGrid';
import FilterPanel from '../components/FilterPanel';
import CompareButton from '../components/CompareButton';

const Index = () => {
  const { data: cars = [], isLoading, error } = useCars();
  console.log('Cars data in Index component:', cars);
  
  const [searchFilters, setSearchFilters] = useState({
    searchTerm: '',
    selectedBrand: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 100000],
    selectedBrands: [],
    selectedBodyTypes: [],
    selectedFuelTypes: [],
    selectedTransmissions: [],
    selectedColors: [],
    selectedOrigins: [],
    mileageRange: [0, 300000],
    yearRange: [2000, 2024]
  });

  const handleSearch = (searchData) => {
    console.log('Search data received:', searchData);
    setSearchFilters(searchData);
  };

  const filteredCars = useMemo(() => {
    if (!cars || cars.length === 0) return [];

    return cars.filter(car => {
      // Search filters
      const matchesSearchTerm = !searchFilters.searchTerm || 
        car.brand.toLowerCase().includes(searchFilters.searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(searchFilters.searchTerm.toLowerCase());

      const matchesBrand = !searchFilters.selectedBrand || 
        car.brand === searchFilters.selectedBrand;

      // Advanced filters
      const matchesPrice = car.price >= filters.priceRange[0] && car.price <= filters.priceRange[1];
      const matchesBrandFilter = filters.selectedBrands.length === 0 || filters.selectedBrands.includes(car.brand);
      const matchesBodyType = filters.selectedBodyTypes.length === 0 || filters.selectedBodyTypes.includes(car.body?.type);
      const matchesFuelType = filters.selectedFuelTypes.length === 0 || filters.selectedFuelTypes.includes(car.fuelType);
      const matchesTransmission = filters.selectedTransmissions.length === 0 || filters.selectedTransmissions.includes(car.transmission);
      const matchesColor = filters.selectedColors.length === 0 || filters.selectedColors.includes(car.color);
      const matchesOrigin = filters.selectedOrigins.length === 0 || filters.selectedOrigins.includes(car.origin);
      const matchesMileage = car.mileage >= filters.mileageRange[0] && car.mileage <= filters.mileageRange[1];
      const matchesYear = car.year >= filters.yearRange[0] && car.year <= filters.yearRange[1];

      return matchesSearchTerm && matchesBrand && matchesPrice && matchesBrandFilter && 
             matchesBodyType && matchesFuelType && matchesTransmission && matchesColor && 
             matchesOrigin && matchesMileage && matchesYear;
    });
  }, [cars, searchFilters, filters]);

  if (error) {
    console.error('Error loading cars:', error);
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-destructive mb-4">Ошибка загрузки данных</h2>
            <p className="text-muted-foreground">
              Не удалось подключиться к базе данных. Убедитесь, что сервер запущен на порту 3001.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Ошибка: {error.message}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero onSearch={handleSearch} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <aside className={`${showFilters ? 'block' : 'hidden lg:block'} w-full lg:w-80 flex-shrink-0`}>
            <FilterPanel 
              cars={cars}
              filters={filters}
              onFiltersChange={setFilters}
              onToggle={() => setShowFilters(!showFilters)}
            />
          </aside>
          
          <main className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                Найдено автомобилей: {filteredCars.length}
              </h2>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
              >
                {showFilters ? 'Скрыть фильтры' : 'Показать фильтры'}
              </button>
            </div>
            
            <CarGrid cars={filteredCars} isLoading={isLoading} />
          </main>
        </div>
      </div>
      
      <CompareButton />
    </div>
  );
};

export default Index;
