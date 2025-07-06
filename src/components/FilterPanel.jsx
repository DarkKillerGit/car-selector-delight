
import React, { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Filter as FilterIcon, ChevronDown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cars } from '../data/cars';

// Extract unique values from cars data
const extractUniqueValues = (key, nestedKey = null) => {
  const values = cars.map(car => 
    nestedKey ? car[key]?.[nestedKey] : car[key]
  ).filter(Boolean);
  return [...new Set(values)];
};

// Get ranges for numeric values
const getMinMax = (key) => {
  const values = cars.map(car => car[key]).filter(val => !isNaN(val));
  return {
    min: Math.min(...values),
    max: Math.max(...values)
  };
};

const FilterPanel = ({ onFilterChange }) => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(!isMobile);
  
  // Initial filter state
  const [filters, setFilters] = useState({
    brands: [],
    bodyTypes: [],
    bodyMaterials: [],
    suspensionTypes: [],
    mileageStatus: [],
    brakeTypes: [],
    transmissionTypes: [],
    driveTypes: [],
    fuelTypes: [],
    carOrigins: [],
    priceRange: {
      min: getMinMax('price').min,
      max: getMinMax('price').max
    },
    yearRange: {
      min: getMinMax('year').min,
      max: getMinMax('year').max
    }
  });
  
  // Extracted unique values for filter options
  const uniqueValues = {
    brands: [...new Set(cars.map(car => car.brand))],
    bodyTypes: extractUniqueValues('body', 'type'),
    bodyMaterials: extractUniqueValues('body', 'material'),
    suspensionTypes: extractUniqueValues('suspension'),
    mileageStatus: extractUniqueValues('mileageStatus'),
    brakeTypes: extractUniqueValues('brakes'),
    transmissionTypes: extractUniqueValues('transmission'),
    driveTypes: extractUniqueValues('driveType'),
    fuelTypes: extractUniqueValues('fuelType'),
    carOrigins: extractUniqueValues('origin'),
  };
  
  // Price range state
  const [priceRange, setPriceRange] = useState([
    filters.priceRange.min,
    filters.priceRange.max
  ]);
  
  // Year range state
  const [yearRange, setYearRange] = useState([
    filters.yearRange.min,
    filters.yearRange.max
  ]);
  
  // Handle checkbox filter changes
  const handleCheckboxChange = (category, value) => {
    setFilters(prev => {
      const updatedCategory = prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value];
      
      return {
        ...prev,
        [category]: updatedCategory
      };
    });
  };
  
  // Handle range filter changes
  const handleRangeChange = (type, values) => {
    if (type === 'price') {
      setPriceRange(values);
      setFilters(prev => ({
        ...prev,
        priceRange: {
          min: values[0],
          max: values[1]
        }
      }));
    } else if (type === 'year') {
      setYearRange(values);
      setFilters(prev => ({
        ...prev,
        yearRange: {
          min: values[0],
          max: values[1]
        }
      }));
    }
  };
  
  // Apply filters
  const applyFilters = () => {
    onFilterChange(filters);
  };
  
  // Reset filters
  const resetFilters = () => {
    setFilters({
      brands: [],
      bodyTypes: [],
      bodyMaterials: [],
      suspensionTypes: [],
      mileageStatus: [],
      brakeTypes: [],
      transmissionTypes: [],
      driveTypes: [],
      fuelTypes: [],
      carOrigins: [],
      priceRange: {
        min: getMinMax('price').min,
        max: getMinMax('price').max
      },
      yearRange: {
        min: getMinMax('year').min,
        max: getMinMax('year').max
      }
    });
    
    setPriceRange([getMinMax('price').min, getMinMax('price').max]);
    setYearRange([getMinMax('year').min, getMinMax('year').max]);
    
    onFilterChange({
      brands: [],
      bodyTypes: [],
      bodyMaterials: [],
      suspensionTypes: [],
      mileageStatus: [],
      brakeTypes: [],
      transmissionTypes: [],
      driveTypes: [],
      fuelTypes: [],
      carOrigins: [],
      priceRange: {
        min: getMinMax('price').min,
        max: getMinMax('price').max || Infinity
      },
      yearRange: {
        min: getMinMax('year').min,
        max: getMinMax('year').max || Infinity
      }
    });
  };
  
  // Close filter panel on mobile when window resizes
  useEffect(() => {
    setIsOpen(!isMobile);
  }, [isMobile]);
  
  useEffect(() => {
    // Apply initial filters on component mount
    applyFilters();
  }, []);
  
  // Filter section component to reduce repetition
  const FilterSection = ({ title, items, category }) => (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item} className="flex items-center">
            <Checkbox 
              id={`${category}-${item}`} 
              checked={filters[category].includes(item)}
              onCheckedChange={() => handleCheckboxChange(category, item)}
            />
            <Label 
              htmlFor={`${category}-${item}`}
              className="ml-2 text-sm font-normal cursor-pointer"
            >
              {item}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
  
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <FilterIcon className="h-5 w-5 mr-2" />
          <h2 className="text-lg font-bold">Фильтры</h2>
        </div>
        
        <CollapsibleTrigger asChild>
          <Button variant="outline">
            {isOpen ? 'Скрыть фильтры' : 'Показать фильтры'}
            <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </Button>
        </CollapsibleTrigger>
      </div>
      
      <CollapsibleContent>
        <ScrollArea className="h-[500px] pr-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              {/* Price Range */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">Цена автомобиля</h3>
                <Slider
                  value={priceRange}
                  min={getMinMax('price').min}
                  max={getMinMax('price').max}
                  step={1000}
                  onValueChange={(values) => handleRangeChange('price', values)}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm">
                  <span>${priceRange[0].toLocaleString()}</span>
                  <span>${priceRange[1].toLocaleString()}</span>
                </div>
              </div>
              
              {/* Year Range */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">Год выпуска</h3>
                <Slider
                  value={yearRange}
                  min={getMinMax('year').min}
                  max={getMinMax('year').max}
                  step={1}
                  onValueChange={(values) => handleRangeChange('year', values)}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm">
                  <span>{yearRange[0]}</span>
                  <span>{yearRange[1]}</span>
                </div>
              </div>
              
              <FilterSection 
                title="Марка автомобиля" 
                items={uniqueValues.brands} 
                category="brands" 
              />
              
              <FilterSection 
                title="Вид кузова" 
                items={uniqueValues.bodyTypes} 
                category="bodyTypes" 
              />
            </div>
            
            <div>
              <FilterSection 
                title="Материал кузова" 
                items={uniqueValues.bodyMaterials} 
                category="bodyMaterials" 
              />
              
              <FilterSection 
                title="Тип подвески" 
                items={uniqueValues.suspensionTypes} 
                category="suspensionTypes" 
              />
              
              <FilterSection 
                title="Пробег" 
                items={uniqueValues.mileageStatus} 
                category="mileageStatus" 
              />
              
              <FilterSection 
                title="Тип тормозов" 
                items={uniqueValues.brakeTypes} 
                category="brakeTypes" 
              />
            </div>
            
            <div>
              <FilterSection 
                title="Тип трансмиссии" 
                items={uniqueValues.transmissionTypes} 
                category="transmissionTypes" 
              />
              
              <FilterSection 
                title="Привод" 
                items={uniqueValues.driveTypes} 
                category="driveTypes" 
              />
              
              <FilterSection 
                title="Тип топлива" 
                items={uniqueValues.fuelTypes} 
                category="fuelTypes" 
              />
              
              <FilterSection 
                title="Origin" 
                items={uniqueValues.carOrigins} 
                category="carOrigins" 
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-4 mt-6">
            <Button variant="outline" onClick={resetFilters}>
              Reset Filters
            </Button>
            <Button onClick={applyFilters}>
              Apply Filters
            </Button>
          </div>
        </ScrollArea>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default FilterPanel;
