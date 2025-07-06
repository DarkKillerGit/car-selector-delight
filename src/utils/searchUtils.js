
export const searchCars = (cars, searchParams) => {
  const { searchTerm, selectedBrand } = searchParams;
  
  console.log('Searching cars with params:', searchParams);
  
  return cars.filter(car => {
    // Фильтр по поисковому запросу
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const carName = `${car.brand} ${car.model}`.toLowerCase();
      const matches = carName.includes(term) || 
                     car.brand.toLowerCase().includes(term) || 
                     car.model.toLowerCase().includes(term);
      
      if (!matches) {
        return false;
      }
    }
    
    // Фильтр по выбранной марке
    if (selectedBrand && car.brand !== selectedBrand) {
      return false;
    }
    
    return true;
  });
};