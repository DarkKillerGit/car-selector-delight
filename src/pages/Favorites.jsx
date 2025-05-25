
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Heart } from 'lucide-react';
import { useFavorites } from '../contexts/FavoritesContext';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import CarCard from '../components/CarCard';
import CompareButton from '../components/CompareButton';

const Favorites = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { favorites } = useFavorites();

  if (!isAuthenticated) {
    return (
      <div>
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Необходима авторизация</h1>
            <p className="text-gray-600 mb-6">Войдите в систему, чтобы просматривать избранное</p>
            <Button onClick={() => navigate('/')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              На главную
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate('/')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Назад
            </Button>
            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-red-500" />
              <h1 className="text-2xl font-bold">Избранное</h1>
            </div>
          </div>
          <span className="text-gray-600">
            {favorites.length} {favorites.length === 1 ? 'автомобиль' : 'автомобилей'}
          </span>
        </div>

        {favorites.length > 0 && (
          <div className="mb-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              <strong>Совет:</strong> Выберите 2 или более автомобилей с помощью чекбоксов для сравнения их характеристик
            </p>
          </div>
        )}

        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Пока нет избранных автомобилей</h2>
            <p className="text-gray-600 mb-6">Добавьте автомобили в избранное, чтобы легко находить их позже</p>
            <Button onClick={() => navigate('/')}>
              Посмотреть автомобили
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </div>
      
      <CompareButton />
    </div>
  );
};

export default Favorites;
