import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { carBrands } from '../data/cars';
import { Button } from '@/components/ui/button';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
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
    <form onSubmit={handleSearch} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 flex flex-col md:flex-row">
      <div className="flex-1 flex items-center px-4 py-2">
        <Search className="h-5 w-5 text-gray-400 dark:text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Поиск по марке, модели..."
          className="w-full outline-none bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="md:border-l border-gray-200 dark:border-gray-700 px-4 py-2">
        <select
          className="w-full outline-none appearance-none text-gray-700 dark:text-white bg-white dark:bg-gray-800"
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
          <Button 
            type="button" 
            variant="secondary" 
            onClick={handleClear} 
            className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-white"
          >
            Очистить
          </Button>
        )}
        <Button 
          type="submit" 
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Поиск
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;