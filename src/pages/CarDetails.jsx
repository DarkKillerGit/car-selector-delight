import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, X, Heart } from 'lucide-react';
import { cars } from '../data/cars';
import Header from '../components/Header';
import { Dialog, DialogContent } from '../components/ui/dialog';
import { useAuth } from '../contexts/AuthContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { Button } from '@/components/ui/button';

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const { favorites, addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const car = cars.find(c => c.id === id);
  const isCarFavorite = car ? isFavorite(car.id) : false;

  const handleFavoriteToggle = () => {
    if (!car) return;
    if (isCarFavorite) {
      removeFromFavorites(car.id);
    } else {
      addToFavorites(car);
    }
  };

  if (!car) {
    return (
      <div className="min-h-screen flex flex-col dark:bg-gray-900">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="text-center dark:text-white">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Автомобиль не найден</h1>
            <p className="mb-6 dark:text-gray-300">Запрашиваемый автомобиль не существует или был удален.</p>
            <button 
              onClick={() => navigate('/')}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Вернуться к поиску
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-primary hover:text-primary/80 mb-6 transition-colors dark:text-blue-400"
        >
          <ArrowLeft size={20} />
          Вернуться к поиску
        </button>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {/* Изображение автомобиля */}
          <div className="h-96 relative bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
            <img 
              src={car.image} 
              alt={`${car.brand} ${car.model}`}
              className="max-h-full max-w-full object-contain cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => setIsImageModalOpen(true)}
            />
            <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full">
              {car.mileageStatus}
            </div>
            {isAuthenticated && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleFavoriteToggle}
                className={`absolute top-4 left-4 bg-white/80 dark:bg-gray-700/80 hover:bg-white dark:hover:bg-gray-700 shadow-sm ${
                  isCarFavorite ? 'text-red-500' : 'text-gray-400'
                }`}
              >
                <Heart
                  size={20}
                  className={isCarFavorite ? 'fill-current' : ''}
                />
              </Button>
            )}
          </div>
          <div className="p-8 dark:text-white">
            {/* Основная информация */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold dark:text-white">{car.brand} {car.model}</h1>
                <div className="flex items-center gap-4">
                  {isAuthenticated && (
                    <Button
                      variant={isCarFavorite ? "default" : "outline"}
                      onClick={handleFavoriteToggle}
                      className={`flex items-center gap-2 ${
                        isCarFavorite ? 'bg-red-500 hover:bg-red-600' : ''
                      } dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600`}
                    >
                      <Heart
                        size={16}
                        className={isCarFavorite ? 'fill-current text-white' : ''}
                      />
                      {isCarFavorite ? 'В избранном' : 'Добавить в избранное'}
                    </Button>
                  )}
                  <span className="text-3xl font-bold text-primary">${car.price.toLocaleString()}</span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-lg">{car.description}</p>
            </div>
            {/* Детальные характеристики */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold border-b pb-2 dark:border-gray-700 dark:text-white">Основные характеристики</h2>
                <div className="space-y-3">
                  {[
                    { label: 'Марка', value: car.brand },
                    { label: 'Модель', value: car.model },
                    { label: 'Год', value: car.year },
                    { label: 'Пробег', value: car.mileage === 0 ? "Новый" : `${car.mileage.toLocaleString()} км` },
                    { label: 'Статус', value: car.mileageStatus },
                    { label: 'Цвет', value: car.color },
                    { label: 'Происхождение', value: car.origin },
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between dark:text-white">
                      <span className="font-medium">{item.label}:</span>
                      <span>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h2 className="text-xl font-semibold border-b pb-2 dark:border-gray-700 dark:text-white">Технические характеристики</h2>
                <div className="space-y-3">
                  {[
                    { label: 'Тип топлива', value: car.fuelType },
                    { label: 'Коробка передач', value: car.transmission },
                    { label: 'Привод', value: car.driveType },
                    { label: 'Тип кузова', value: car.body?.type || '-' },
                    { label: 'Материал кузова', value: car.body?.material || '-' },
                    { label: 'Подвеска', value: car.suspension },
                    { label: 'Тормоза', value: car.brakes },
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between dark:text-white">
                      <span className="font-medium">{item.label}:</span>
                      <span>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Кнопка возврата */}
            <div className="mt-8 text-center">
              <button 
                onClick={() => navigate('/')}
                className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg transition-colors text-lg dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                Вернуться к поиску автомобилей
              </button>
            </div>
          </div>
        </div>
      </main>
      {/* Модальное окно для изображения */}
      <Dialog open={isImageModalOpen} onOpenChange={setIsImageModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden dark:bg-gray-900">
          <div className="relative">
            <button
              onClick={() => setIsImageModalOpen(false)}
              className="absolute top-4 right-4 z-10 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
            >
              <X size={20} />
            </button>
            <img 
              src={car.image} 
              alt={`${car.brand} ${car.model}`}
              className="w-full h-full object-contain max-h-[90vh]"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CarDetails;