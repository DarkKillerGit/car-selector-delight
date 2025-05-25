
import React from 'react';
import { Clock, Fuel, Box, Zap, Truck, Gauge, Heart } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '../contexts/AuthContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { useCompare } from '../contexts/CompareContext';

const CarCard = ({ car }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { toggleCompare, isInCompare } = useCompare();

  const isFavoritesPage = location.pathname === '/favorites';

  const handleDetailsClick = () => {
    navigate(`/car/${car.id}`);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (isAuthenticated) {
      toggleFavorite(car);
    }
  };

  const handleCompareChange = (checked) => {
    toggleCompare(car);
  };

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
        
        <div className="absolute top-2 left-2 flex gap-2">
          {isFavoritesPage && (
            <div className="bg-white/90 rounded p-1">
              <Checkbox
                checked={isInCompare(car.id)}
                onCheckedChange={handleCompareChange}
                className="h-5 w-5"
              />
            </div>
          )}
          {isAuthenticated && (
            <button
              onClick={handleFavoriteClick}
              className={`p-2 rounded-full bg-white/80 hover:bg-white transition-colors ${
                isFavorite(car.id) ? 'text-red-500' : 'text-gray-600'
              }`}
            >
              <Heart 
                className="h-4 w-4" 
                fill={isFavorite(car.id) ? 'currentColor' : 'none'}
              />
            </button>
          )}
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
        
        <Button 
          className="w-full mt-4 bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded transition-colors"
          onClick={handleDetailsClick}
        >
          Подробнее
        </Button>
      </div>
    </div>
  );
};

export default CarCard;
