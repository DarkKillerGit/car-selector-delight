
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Fuel, Box, Zap, Truck, Gauge, ArrowLeft, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '../contexts/AuthContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { useCars } from '../hooks/useCars';
import Header from '../components/Header';

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { data: cars = [], isLoading } = useCars();

  const car = cars.find(c => c.id === id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-4"></div>
            <div className="h-64 bg-gray-300 rounded mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Автомобиль не найден</h1>
            <Button onClick={() => navigate('/')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Вернуться к поиску
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handleFavoriteClick = () => {
    if (isAuthenticated) {
      toggleFavorite(car);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="outline" onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад к поиску
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <img 
              src={car.imageUrl} 
              alt={`${car.brand} ${car.model}`}
              className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
            />
          </div>

          <div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {car.brand} {car.model}
                </h1>
                <p className="text-xl text-muted-foreground">{car.year} год</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-primary">${car.price.toLocaleString()}</p>
                {isAuthenticated && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleFavoriteClick}
                    className={`mt-2 ${isFavorite(car.id) ? 'text-red-500 border-red-500' : ''}`}
                  >
                    <Heart 
                      className="h-4 w-4 mr-2" 
                      fill={isFavorite(car.id) ? 'currentColor' : 'none'}
                    />
                    {isFavorite(car.id) ? 'Удалить из избранного' : 'Добавить в избранное'}
                  </Button>
                )}
              </div>
            </div>

            <div className="bg-card rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Основные характеристики</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Fuel className="h-5 w-5 text-primary" />
                  <span className="font-medium">Топливо:</span>
                  <span>{car.fuelType}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Box className="h-5 w-5 text-primary" />
                  <span className="font-medium">Кузов:</span>
                  <span>{car.body.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  <span className="font-medium">КПП:</span>
                  <span>{car.transmission}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-primary" />
                  <span className="font-medium">Привод:</span>
                  <span>{car.driveType}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Gauge className="h-5 w-5 text-primary" />
                  <span className="font-medium">Пробег:</span>
                  <span>{car.mileage === 0 ? "Новый" : `${car.mileage} км`}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="font-medium">Год:</span>
                  <span>{car.year}</span>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Дополнительная информация</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Цвет:</span>
                  <span>{car.color}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Происхождение:</span>
                  <span>{car.origin}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Материал кузова:</span>
                  <span>{car.body.material}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Подвеска:</span>
                  <span>{car.suspension}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Тормоза:</span>
                  <span>{car.brakes}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Состояние:</span>
                  <span>{car.mileageStatus}</span>
                </div>
              </div>
            </div>

            {car.description && (
              <div className="bg-card rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Описание</h2>
                <p className="text-muted-foreground leading-relaxed">{car.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
