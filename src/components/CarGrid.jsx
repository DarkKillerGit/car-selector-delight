
import React from 'react';
import CarCard from './CarCard';

const CarGrid = ({ cars, isLoading = false }) => {
  console.log('CarGrid received cars:', cars);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-gray-100 dark:bg-gray-700 h-96 rounded-lg animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (!cars || cars.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">Автомобили не найдены</h3>
        <p className="text-gray-500 dark:text-gray-400">
          Попробуйте изменить параметры поиска или убедитесь, что сервер подключен к базе данных.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
};

export default CarGrid;
