
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { carBrands } from '../data/cars';
import { Button } from '@/components/ui/button';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ searchTerm, selectedBrand });
    // Here you would typically trigger the search with the provided terms
  };

  return (
    <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-lg p-2 flex flex-col md:flex-row">
      <div className="flex-1 flex items-center px-4 py-2">
        <Search className="h-5 w-5 text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search by model, year, features..."
          className="w-full outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="md:border-l border-gray-200 px-4 py-2">
        <select
          className="w-full outline-none appearance-none text-gray-700"
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
        >
          <option value="">All Brands</option>
          {carBrands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>
      
      <Button type="submit" className="m-1">
        Search Cars
      </Button>
    </form>
  );
};

export default SearchBar;
