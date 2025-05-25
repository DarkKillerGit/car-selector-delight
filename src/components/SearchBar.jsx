
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { carBrands } from '../data/cars';
import { Button } from '@/components/ui/button';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search initiated:', { searchTerm, selectedBrand });
    
    // Вызываем функцию поиска из родительского компонента
    if (onSearch) {
      onSearch({
        searchTerm: searchTerm.trim(),
        selectedBrand
      });
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    setSelectedBrand('');
    if (onSearch) {
      onSearch({
        searchTerm: '',
        selectedBrand: ''
      });
    }
  };

  return (
    <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-lg p-2 flex flex-col md:flex-row">
      <div className="flex-1 flex items-center px-4 py-2">
        <Search className="h-5 w-5 text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Поиск по марке, модели..."
          className="w-full outline-none text-gray-900 placeholder-gray-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="md:border-l border-gray-200 px-4 py-2">
        <select
          className="w-full outline-none appearance-none text-gray-700 bg-white"
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
        >
          <option value="">Все марки</option>
          {Object.values(carBrands).flat().map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>
      
      <div className="flex gap-2 m-1">
        {(searchTerm || selectedBrand) && (
          <Button type="button" variant="secondary" onClick={handleClear} className="bg-gray-100 hover:bg-gray-200 text-gray-700">
            Очистить
          </Button>
        )}
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
          Поиск
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
