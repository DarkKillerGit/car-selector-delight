
import React from 'react';
import { Clock, Fuel, Box, Zap, Truck, Gauge } from 'lucide-react';

const CarCard = ({ car }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg card-hover-effect">
      <div className="relative h-48">
        <img 
          src={car.image} 
          alt={`${car.brand} ${car.model}`} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
          {car.mileageStatus}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-bold">{car.brand} {car.model}</h3>
          <span className="text-primary font-bold">${car.price.toLocaleString()}</span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Fuel size={16} />
            <span>{car.fuelType}</span>
          </div>
          <div className="flex items-center gap-1">
            <Box size={16} />
            <span>{car.body.type}</span>
          </div>
          <div className="flex items-center gap-1">
            <Zap size={16} />
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center gap-1">
            <Truck size={16} />
            <span>{car.driveType}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>{car.year}</span>
          </div>
          <div className="flex items-center gap-1">
            <Gauge size={16} />
            <span>{car.mileage === 0 ? "Новый" : `${car.mileage} км`}</span>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{car.description}</p>
        
        <div className="flex flex-wrap gap-2 mt-2">
          <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
            {car.origin}
          </span>
          <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
            {car.body.material}
          </span>
          <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
            {car.suspension}
          </span>
          <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
            {car.brakes}
          </span>
        </div>
        
        <button className="w-full mt-4 bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded transition-colors">
          Подробнее
        </button>
      </div>
    </div>
  );
};

export default CarCard;
