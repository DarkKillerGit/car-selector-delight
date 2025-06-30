
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Heart, Scale, Calendar, Gauge, Palette, Settings, Fuel, Car, Wrench } from 'lucide-react';
import { useFavorites } from '../contexts/FavoritesContext';
import { useCompare } from '../contexts/CompareContext';
import { useCars } from '../hooks/useCars';
import Header from '../components/Header';

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: cars = [], isLoading } = useCars();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();

  const car = cars.find(c => c.id === id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Загрузка...</div>
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
              Вернуться к каталогу
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const toggleFavorite = () => {
    if (isFavorite(car.id)) {
      removeFromFavorites(car.id);
    } else {
      addToFavorites(car);
    }
  };

  const toggleCompare = () => {
    if (isInCompare(car.id)) {
      removeFromCompare(car.id);
    } else {
      addToCompare(car);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="outline" onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад к каталогу
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <img 
              src={car.imageUrl || '/placeholder.svg'} 
              alt={`${car.brand} ${car.model}`}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-3xl font-bold text-foreground">{car.brand} {car.model}</h1>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleFavorite}
                    className={isFavorite(car.id) ? 'text-red-500' : ''}
                  >
                    <Heart className={`h-4 w-4 ${isFavorite(car.id) ? 'fill-current' : ''}`} />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleCompare}
                    className={isInCompare(car.id) ? 'text-blue-500' : ''}
                  >
                    <Scale className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="text-2xl font-semibold text-green-600">${car.price.toLocaleString()}</p>
              <div className="flex gap-2 mt-2">
                <Badge variant={car.mileageStatus === 'Новая' ? 'default' : 'secondary'}>
                  {car.mileageStatus}
                </Badge>
                <Badge variant="outline">{car.origin}</Badge>
              </div>
            </div>

            {car.description && (
              <p className="text-muted-foreground">{car.description}</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Основные характеристики
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>Год выпуска:</span>
                    <span className="font-medium">{car.year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Пробег:</span>
                    <span className="font-medium">{car.mileage.toLocaleString()} км</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Цвет:</span>
                    <span className="font-medium">{car.color}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Технические характеристики
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>Топливо:</span>
                    <span className="font-medium">{car.fuelType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Коробка передач:</span>
                    <span className="font-medium">{car.transmission}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Привод:</span>
                    <span className="font-medium">{car.driveType}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Car className="h-5 w-5" />
                    Кузов
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>Тип кузова:</span>
                    <span className="font-medium">{car.body?.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Материал:</span>
                    <span className="font-medium">{car.body?.material}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Wrench className="h-5 w-5" />
                    Системы
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>Подвеска:</span>
                    <span className="font-medium">{car.suspension}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Тормоза:</span>
                    <span className="font-medium">{car.brakes}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
