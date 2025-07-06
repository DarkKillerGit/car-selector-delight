
import React from 'react';
import SearchBar from './SearchBar';

const Hero = ({ onSearch }) => {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center bg-no-repeat mix-blend-overlay"></div>
      
      <div className="relative container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Найдите свой идеальный автомобиль
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Просматривайте нашу обширную коллекцию автомобилей, чтобы найти тот, который соответствует вашим потребностям и стилю.
          </p>
          
          <SearchBar onSearch={onSearch} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
