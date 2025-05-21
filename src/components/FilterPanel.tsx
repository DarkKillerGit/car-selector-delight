
import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { carBrands, transmissionTypes, fuelTypes } from '../data/cars';

interface FilterPanelProps {
  onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
  brands: string[];
  transmissions: string[];
  fuelTypes: string[];
  priceRange: [number, number];
  yearRange: [number, number];
}

const FilterPanel = ({ onFilterChange }: FilterPanelProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    brands: [],
    transmissions: [],
    fuelTypes: [],
    priceRange: [0, 100000],
    yearRange: [2010, 2023],
  });

  const handleBrandChange = (brand: string, checked: boolean) => {
    const newBrands = checked 
      ? [...filters.brands, brand]
      : filters.brands.filter(b => b !== brand);
    
    const newFilters = { ...filters, brands: newBrands };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleTransmissionChange = (type: string, checked: boolean) => {
    const newTransmissions = checked 
      ? [...filters.transmissions, type]
      : filters.transmissions.filter(t => t !== type);
    
    const newFilters = { ...filters, transmissions: newTransmissions };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleFuelTypeChange = (type: string, checked: boolean) => {
    const newFuelTypes = checked 
      ? [...filters.fuelTypes, type]
      : filters.fuelTypes.filter(f => f !== type);
    
    const newFilters = { ...filters, fuelTypes: newFuelTypes };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceRangeChange = (values: number[]) => {
    const newFilters = { ...filters, priceRange: [values[0], values[1]] as [number, number] };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleYearRangeChange = (values: number[]) => {
    const newFilters = { ...filters, yearRange: [values[0], values[1]] as [number, number] };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white rounded-lg shadow-md filter-shadow p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center">
          <Filter className="h-5 w-5 mr-2 text-primary" />
          Filters
        </h2>
        <Button variant="outline" onClick={toggleExpand}>
          {isExpanded ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </div>

      {isExpanded && (
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-3">Brand</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {carBrands.slice(0, 8).map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`brand-${brand}`} 
                    checked={filters.brands.includes(brand)}
                    onCheckedChange={(checked) => handleBrandChange(brand, checked === true)}
                  />
                  <label htmlFor={`brand-${brand}`} className="text-sm">
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">Transmission</h3>
            <div className="flex flex-wrap gap-4">
              {transmissionTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`transmission-${type}`}
                    checked={filters.transmissions.includes(type)}
                    onCheckedChange={(checked) => handleTransmissionChange(type, checked === true)}
                  />
                  <label htmlFor={`transmission-${type}`} className="text-sm">
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">Fuel Type</h3>
            <div className="flex flex-wrap gap-4">
              {fuelTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`fuel-${type}`} 
                    checked={filters.fuelTypes.includes(type)}
                    onCheckedChange={(checked) => handleFuelTypeChange(type, checked === true)}
                  />
                  <label htmlFor={`fuel-${type}`} className="text-sm">
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <h3 className="font-medium">Price Range</h3>
              <span className="text-sm text-gray-500">
                ${filters.priceRange[0]} - ${filters.priceRange[1]}
              </span>
            </div>
            <Slider 
              min={0}
              max={100000}
              step={1000}
              value={[filters.priceRange[0], filters.priceRange[1]]}
              onValueChange={handlePriceRangeChange}
              className="my-6"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <h3 className="font-medium">Year</h3>
              <span className="text-sm text-gray-500">
                {filters.yearRange[0]} - {filters.yearRange[1]}
              </span>
            </div>
            <Slider 
              min={2000}
              max={2023}
              step={1}
              value={[filters.yearRange[0], filters.yearRange[1]]}
              onValueChange={handleYearRangeChange}
              className="my-6"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
