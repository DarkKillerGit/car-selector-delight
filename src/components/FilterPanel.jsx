import React, { useState } from 'react';
import { Filter, ChevronDown, ChevronUp, Minimize2, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { 
  carOrigins,
  carBrands,
  bodyTypes,
  bodyMaterials,
  suspensionTypes,
  mileageStatus,
  brakeTypes,
  transmissionTypes,
  driveTypes,
  fuelTypes 
} from '../data/cars';
import { 
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent 
} from '@/components/ui/collapsible';

const FilterPanel = ({ cars, filters, onFiltersChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [areAllFiltersCollapsed, setAreAllFiltersCollapsed] = useState(false);
  const [areAllFiltersCollapsed, setAreAllFiltersCollapsed] = useState(false);
  const [filters, setFilters] = useState({
    carOrigins: [],
    brands: [],
    bodyTypes: [],
    bodyMaterials: [],
    suspensionTypes: [],
    mileageStatus: [],
    brakeTypes: [],
    transmissionTypes: [],
    driveTypes: [],
    fuelTypes: [],
    priceRange: {min: "", max: ""},
    yearRange: {min: "", max: ""}
  });

  // Обновление состояния фильтров и вызов родительской функции фильтрации
  const updateFilters = (newFilters) => {
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  // Обработчик для чекбоксов
  const handleCheckboxChange = (category, value, checked) => {
    const newValues = checked 
      ? [...filters[category], value]
      : filters[category].filter(item => item !== value);
    
    const newFilters = { ...filters, [category]: newValues };
    updateFilters(newFilters);
  };

  // Обработчик для диапазона цен и года выпуска
  const handleRangeChange = (category, field, value) => {
    const newRange = { ...filters[category], [field]: value };
    const newFilters = { ...filters, [category]: newRange };
    updateFilters(newFilters);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleAllFilters = () => {
    setAreAllFiltersCollapsed(!areAllFiltersCollapsed);
  };

  const applyFilters = () => {
    // Преобразуем минимальное и максимальное значение в числа для диапазонов
    const processedFilters = {
      ...filters,
      priceRange: {
        min: filters.priceRange.min === "" ? 0 : parseInt(filters.priceRange.min),
        max: filters.priceRange.max === "" ? Infinity : parseInt(filters.priceRange.max)
      },
      yearRange: {
        min: filters.yearRange.min === "" ? 2000 : parseInt(filters.yearRange.min),
        max: filters.yearRange.max === "" ? Infinity : parseInt(filters.yearRange.max)
      }
    };
    onFilterChange(processedFilters);
  };

  const resetFilters = () => {
    const emptyFilters = {
      carOrigins: [],
      brands: [],
      bodyTypes: [],
      bodyMaterials: [],
      suspensionTypes: [],
      mileageStatus: [],
      brakeTypes: [],
      transmissionTypes: [],
      driveTypes: [],
      fuelTypes: [],
      priceRange: {min: "", max: ""},
      yearRange: {min: "", max: ""}
    };
    updateFilters(emptyFilters);
  };

  // Компонент для фильтра с чекбоксами
  const CheckboxFilterGroup = ({ title, category, options, values }) => {
    return (
      <div className="mb-4">
        <h4 className="font-medium mb-2">{title}</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {options.map(option => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox 
                id={`${category}-${option}`} 
                checked={values.includes(option)}
                onCheckedChange={(checked) => handleCheckboxChange(category, option, checked === true)}
              />
              <label htmlFor={`${category}-${option}`} className="text-sm">
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Компонент для раскрывающегося фильтра с чекбоксами
  const CollapsibleFilterGroup = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    // Устанавливаем состояние в зависимости от глобального состояния сворачивания
    React.useEffect(() => {
      if (areAllFiltersCollapsed) {
        setIsOpen(false);
      }
    }, [areAllFiltersCollapsed]);
    
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mb-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">{title}</h3>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
              {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="pt-2">
          {children}
        </CollapsibleContent>
      </Collapsible>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md filter-shadow p-4 mb-6">
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center">
            <Filter className="h-5 w-5 mr-2 text-primary" />
            Фильтры
          </h2>
          <div className="flex gap-2">
            {isExpanded && (
              <Button variant="ghost" size="sm" onClick={toggleAllFilters}>
                {areAllFiltersCollapsed ? (
                  <>
                    <Maximize2 className="h-4 w-4 mr-1" />
                    Развернуть все
                  </>
                ) : (
                  <>
                    <Minimize2 className="h-4 w-4 mr-1" />
                    Свернуть все
                  </>
                )}
              </Button>
            )}
            <CollapsibleTrigger asChild>
              <Button variant="outline" onClick={toggleExpand}>
                {isExpanded ? 'Скрыть фильтры' : 'Показать фильтры'}
              </Button>
            </CollapsibleTrigger>
          </div>
        </div>

        <CollapsibleContent>
          <div className="space-y-4">
            {/* 1. Марка автомобиля */}
            <CollapsibleFilterGroup title="Марка автомобиля">
              <div className="mb-3">
                {Object.entries(carOrigins).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2 mb-2">
                    <Checkbox 
                      id={`origin-${key}`} 
                      checked={filters.carOrigins.includes(value)}
                      onCheckedChange={(checked) => handleCheckboxChange('carOrigins', value, checked === true)}
                    />
                    <label htmlFor={`origin-${key}`} className="text-sm font-medium">
                      {value}
                    </label>
                  </div>
                ))}
              </div>

              <div className="ml-4">
                {Object.entries(carBrands).map(([origin, brands]) => (
                  <div key={origin} className={`mb-2 ${filters.carOrigins.includes(carOrigins[origin]) ? 'block' : 'hidden'}`}>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {brands.map(brand => (
                        <div key={brand} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`brand-${brand}`} 
                            checked={filters.brands.includes(brand)}
                            onCheckedChange={(checked) => handleCheckboxChange('brands', brand, checked === true)}
                          />
                          <label htmlFor={`brand-${brand}`} className="text-sm">
                            {brand}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CollapsibleFilterGroup>

            {/* 2. Ходовая часть */}
            <CollapsibleFilterGroup title="Ходовая часть">
              {/* Кузов */}
              <div className="mb-4">
                <h4 className="font-medium mb-2">Кузов</h4>
                
                {/* Вид кузова */}
                <div className="ml-4 mb-3">
                  <h5 className="text-sm font-medium mb-2">Вид кузова</h5>
                  <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
                    {bodyTypes.map(type => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`bodyType-${type}`} 
                          checked={filters.bodyTypes.includes(type)}
                          onCheckedChange={(checked) => handleCheckboxChange('bodyTypes', type, checked === true)}
                        />
                        <label htmlFor={`bodyType-${type}`} className="text-sm">
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Материал кузова */}
                <div className="ml-4">
                  <h5 className="text-sm font-medium mb-2">Материал кузова</h5>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {bodyMaterials.map(material => (
                      <div key={material} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`bodyMaterial-${material}`} 
                          checked={filters.bodyMaterials.includes(material)}
                          onCheckedChange={(checked) => handleCheckboxChange('bodyMaterials', material, checked === true)}
                        />
                        <label htmlFor={`bodyMaterial-${material}`} className="text-sm">
                          {material}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Подвеска */}
              <div>
                <h4 className="font-medium mb-2">Подвеска</h4>
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
                  {suspensionTypes.map(type => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`suspension-${type}`} 
                        checked={filters.suspensionTypes.includes(type)}
                        onCheckedChange={(checked) => handleCheckboxChange('suspensionTypes', type, checked === true)}
                      />
                      <label htmlFor={`suspension-${type}`} className="text-sm">
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </CollapsibleFilterGroup>

            {/* 3. Пробег */}
            <CollapsibleFilterGroup title="Пробег">
              <div className="grid grid-cols-2 gap-2">
                {mileageStatus.map(status => (
                  <div key={status} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`mileage-${status}`} 
                      checked={filters.mileageStatus.includes(status)}
                      onCheckedChange={(checked) => handleCheckboxChange('mileageStatus', status, checked === true)}
                    />
                    <label htmlFor={`mileage-${status}`} className="text-sm">
                      {status}
                    </label>
                  </div>
                ))}
              </div>
            </CollapsibleFilterGroup>

            {/* 4. Тормоза */}
            <CollapsibleFilterGroup title="Тормоза">
              <div className="grid grid-cols-2 gap-2">
                {brakeTypes.map(type => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`brakes-${type}`} 
                      checked={filters.brakeTypes.includes(type)}
                      onCheckedChange={(checked) => handleCheckboxChange('brakeTypes', type, checked === true)}
                    />
                    <label htmlFor={`brakes-${type}`} className="text-sm">
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </CollapsibleFilterGroup>

            {/* 5. Коробка передач */}
            <CollapsibleFilterGroup title="Коробка передач">
              <div className="grid grid-cols-2 gap-2">
                {transmissionTypes.map(type => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`transmission-${type}`} 
                      checked={filters.transmissionTypes.includes(type)}
                      onCheckedChange={(checked) => handleCheckboxChange('transmissionTypes', type, checked === true)}
                    />
                    <label htmlFor={`transmission-${type}`} className="text-sm">
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </CollapsibleFilterGroup>

            {/* 6. Привод */}
            <CollapsibleFilterGroup title="Привод">
              <div className="grid grid-cols-2 gap-2">
                {driveTypes.map(type => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`drive-${type}`} 
                      checked={filters.driveTypes.includes(type)}
                      onCheckedChange={(checked) => handleCheckboxChange('driveTypes', type, checked === true)}
                    />
                    <label htmlFor={`drive-${type}`} className="text-sm">
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </CollapsibleFilterGroup>

            {/* 7. Двигатель */}
            <CollapsibleFilterGroup title="Двигатель">
              <div className="grid grid-cols-2 gap-2">
                {fuelTypes.map(type => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`fuel-${type}`} 
                      checked={filters.fuelTypes.includes(type)}
                      onCheckedChange={(checked) => handleCheckboxChange('fuelTypes', type, checked === true)}
                    />
                    <label htmlFor={`fuel-${type}`} className="text-sm">
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </CollapsibleFilterGroup>

            {/* Ценовой диапазон */}
            <div className="mb-4">
              <h3 className="font-medium mb-2">Ценовой диапазон</h3>
              <div className="flex items-center space-x-2">
                <div className="flex-1">
                  <label htmlFor="price-min" className="text-sm text-gray-500 mb-1 block">От</label>
                  <Input 
                    id="price-min"
                    type="number" 
                    value={filters.priceRange.min}
                    onChange={(e) => handleRangeChange('priceRange', 'min', e.target.value)}
                    placeholder="Минимальная цена"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="price-max" className="text-sm text-gray-500 mb-1 block">До</label>
                  <Input 
                    id="price-max"
                    type="number" 
                    value={filters.priceRange.max}
                    onChange={(e) => handleRangeChange('priceRange', 'max', e.target.value)}
                    placeholder="Максимальная цена"
                  />
                </div>
              </div>
            </div>

            {/* Год выпуска */}
            <div className="mb-4">
              <h3 className="font-medium mb-2">Год выпуска</h3>
              <div className="flex items-center space-x-2">
                <div className="flex-1">
                  <label htmlFor="year-min" className="text-sm text-gray-500 mb-1 block">От</label>
                  <Input 
                    id="year-min"
                    type="number" 
                    value={filters.yearRange.min}
                    onChange={(e) => handleRangeChange('yearRange', 'min', e.target.value)}
                    placeholder="С"
                    min="2000"
                    max="2023"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="year-max" className="text-sm text-gray-500 mb-1 block">До</label>
                  <Input 
                    id="year-max"
                    type="number" 
                    value={filters.yearRange.max}
                    onChange={(e) => handleRangeChange('yearRange', 'max', e.target.value)}
                    placeholder="По"
                    min="2000"
                    max="2023"
                  />
                </div>
              </div>
            </div>

            {/* Кнопки применения и сброса фильтров */}
            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={resetFilters}>
                Сбросить
              </Button>
              <Button onClick={applyFilters}>
                Применить
              </Button>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default FilterPanel;
