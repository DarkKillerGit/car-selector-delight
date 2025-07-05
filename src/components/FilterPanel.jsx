
import React, { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronRight, X, Filter } from 'lucide-react';
import {
  carBrands,
  carOrigins,
  bodyTypes,
  fuelTypes,
  transmissionTypes,
  driveTypes,
  bodyMaterials,
  suspensionTypes,
  brakeTypes,
  mileageStatus
} from '../data/cars';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent 
} from '@/components/ui/collapsible';

const FilterPanel = ({ cars, filters, onFiltersChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [areAllFiltersCollapsed, setAreAllFiltersCollapsed] = useState(false);

  const handleFilterChange = (filterType, value, isChecked) => {
    const updatedFilters = { ...filters };
    
    if (filterType === 'priceRange' || filterType === 'mileageRange' || filterType === 'yearRange') {
      updatedFilters[filterType] = value;
    } else {
      if (isChecked) {
        updatedFilters[filterType] = [...updatedFilters[filterType], value];
      } else {
        updatedFilters[filterType] = updatedFilters[filterType].filter(item => item !== value);
      }
    }
    
    onFiltersChange(updatedFilters);
  };

  const clearAllFilters = () => {
    onFiltersChange({
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
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.selectedBrands.length > 0) count++;
    if (filters.selectedBodyTypes.length > 0) count++;
    if (filters.selectedFuelTypes.length > 0) count++;
    if (filters.selectedTransmissions.length > 0) count++;
    if (filters.selectedColors.length > 0) count++;
    if (filters.selectedOrigins.length > 0) count++;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 100000) count++;
    if (filters.mileageRange[0] > 0 || filters.mileageRange[1] < 300000) count++;
    if (filters.yearRange[0] > 2000 || filters.yearRange[1] < 2024) count++;
    return count;
  };

  const getUniqueValues = (key) => {
    if (!cars || cars.length === 0) return [];
    
    const values = cars.map(car => {
      if (key === 'body.type') return car.body?.type;
      if (key === 'body.material') return car.body?.material;
      return car[key];
    }).filter(Boolean);
    
    return [...new Set(values)].sort();
  };

  const FilterSection = ({ title, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded-md">
          <span className="font-medium text-sm">{title}</span>
          {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="p-2 space-y-2">
          {children}
        </CollapsibleContent>
      </Collapsible>
    );
  };

  const CheckboxGroup = ({ items, selectedItems, onChange, filterType }) => (
    <div className="space-y-2 max-h-48 overflow-y-auto">
      {items.map(item => (
        <div key={item} className="flex items-center space-x-2">
          <Checkbox
            id={`${filterType}-${item}`}
            checked={selectedItems.includes(item)}
            onCheckedChange={(checked) => onChange(filterType, item, checked)}
          />
          <label htmlFor={`${filterType}-${item}`} className="text-sm cursor-pointer">
            {item}
          </label>
        </div>
      ))}
    </div>
  );

  const RangeSlider = ({ title, range, min, max, step = 1000, formatValue, onChange }) => (
    <div className="space-y-3">
      <div className="flex justify-between text-sm">
        <span>{formatValue ? formatValue(range[0]) : range[0]}</span>
        <span>{formatValue ? formatValue(range[1]) : range[1]}</span>
      </div>
      <Slider
        value={range}
        onValueChange={onChange}
        min={min}
        max={max}
        step={step}
        className="w-full"
      />
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 sticky top-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          <h3 className="font-semibold">Фильтры</h3>
          {getActiveFiltersCount() > 0 && (
            <Badge variant="secondary">{getActiveFiltersCount()}</Badge>
          )}
        </div>
        {getActiveFiltersCount() > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            <X className="h-4 w-4 mr-1" />
            Очистить
          </Button>
        )}
      </div>

      <div className="space-y-1">
        <FilterSection title="Цена" defaultOpen>
          <RangeSlider
            title="Цена"
            range={filters.priceRange}
            min={0}
            max={100000}
            step={1000}
            formatValue={(value) => `$${value.toLocaleString()}`}
            onChange={(value) => handleFilterChange('priceRange', value)}
          />
        </FilterSection>

        <FilterSection title="Марка">
          <CheckboxGroup
            items={Object.values(carBrands).flat()}
            selectedItems={filters.selectedBrands}
            onChange={handleFilterChange}
            filterType="selectedBrands"
          />
        </FilterSection>

        <FilterSection title="Тип кузова">
          <CheckboxGroup
            items={getUniqueValues('body.type')}
            selectedItems={filters.selectedBodyTypes}
            onChange={handleFilterChange}
            filterType="selectedBodyTypes"
          />
        </FilterSection>

        <FilterSection title="Топливо">
          <CheckboxGroup
            items={getUniqueValues('fuelType')}
            selectedItems={filters.selectedFuelTypes}
            onChange={handleFilterChange}
            filterType="selectedFuelTypes"
          />
        </FilterSection>

        <FilterSection title="Коробка передач">
          <CheckboxGroup
            items={getUniqueValues('transmission')}
            selectedItems={filters.selectedTransmissions}
            onChange={handleFilterChange}
            filterType="selectedTransmissions"
          />
        </FilterSection>

        <FilterSection title="Цвет">
          <CheckboxGroup
            items={getUniqueValues('color')}
            selectedItems={filters.selectedColors}
            onChange={handleFilterChange}
            filterType="selectedColors"
          />
        </FilterSection>

        <FilterSection title="Происхождение">
          <CheckboxGroup
            items={Object.values(carOrigins)}
            selectedItems={filters.selectedOrigins}
            onChange={handleFilterChange}
            filterType="selectedOrigins"
          />
        </FilterSection>

        <FilterSection title="Пробег">
          <RangeSlider
            title="Пробег"
            range={filters.mileageRange}
            min={0}
            max={300000}
            step={5000}
            formatValue={(value) => `${value.toLocaleString()} км`}
            onChange={(value) => handleFilterChange('mileageRange', value)}
          />
        </FilterSection>

        <FilterSection title="Год выпуска">
          <RangeSlider
            title="Год выпуска"
            range={filters.yearRange}
            min={2000}
            max={2024}
            step={1}
            onChange={(value) => handleFilterChange('yearRange', value)}
          />
        </FilterSection>
      </div>
    </div>
  );
};

export default FilterPanel;
