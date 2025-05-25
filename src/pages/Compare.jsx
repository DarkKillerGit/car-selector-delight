
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Scale, X } from 'lucide-react';
import { useCompare } from '../contexts/CompareContext';
import Header from '../components/Header';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const Compare = () => {
  const navigate = useNavigate();
  const { compareList, removeFromCompare, clearCompare } = useCompare();

  if (compareList.length === 0) {
    return (
      <div>
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <Scale className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-4">Нет автомобилей для сравнения</h1>
            <p className="text-gray-600 mb-6">Выберите автомобили из избранного для сравнения</p>
            <Button onClick={() => navigate('/favorites')}>
              Перейти в избранное
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const specifications = [
    { key: 'brand', label: 'Марка' },
    { key: 'model', label: 'Модель' },
    { key: 'year', label: 'Год' },
    { key: 'price', label: 'Цена', format: (value) => `$${value.toLocaleString()}` },
    { key: 'mileage', label: 'Пробег', format: (value) => value === 0 ? 'Новый' : `${value.toLocaleString()} км` },
    { key: 'mileageStatus', label: 'Статус' },
    { key: 'fuelType', label: 'Тип топлива' },
    { key: 'transmission', label: 'Коробка передач' },
    { key: 'driveType', label: 'Привод' },
    { key: 'body.type', label: 'Тип кузова' },
    { key: 'body.material', label: 'Материал кузова' },
    { key: 'suspension', label: 'Подвеска' },
    { key: 'brakes', label: 'Тормоза' },
    { key: 'origin', label: 'Происхождение' },
    { key: 'color', label: 'Цвет' }
  ];

  const getValue = (car, key) => {
    if (key.includes('.')) {
      const [parent, child] = key.split('.');
      return car[parent]?.[child];
    }
    return car[key];
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate('/favorites')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Назад к избранному
            </Button>
            <div className="flex items-center gap-2">
              <Scale className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">Сравнение автомобилей</h1>
            </div>
          </div>
          <Button variant="outline" onClick={clearCompare}>
            Очистить все
          </Button>
        </div>

        {/* Изображения автомобилей */}
        <div className="mb-8">
          <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${compareList.length}, 1fr)` }}>
            <div className="font-semibold text-lg flex items-center">
              Фото
            </div>
            {compareList.map((car) => (
              <div key={car.id} className="relative">
                <button
                  onClick={() => removeFromCompare(car.id)}
                  className="absolute top-2 right-2 z-10 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
                <img
                  src={car.image}
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <h3 className="mt-2 font-semibold text-center">
                  {car.brand} {car.model}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Таблица сравнения */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-48 font-semibold">Характеристика</TableHead>
                {compareList.map((car) => (
                  <TableHead key={car.id} className="text-center font-semibold">
                    {car.brand} {car.model}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {specifications.map((spec) => (
                <TableRow key={spec.key}>
                  <TableCell className="font-medium bg-gray-50">
                    {spec.label}
                  </TableCell>
                  {compareList.map((car) => {
                    const value = getValue(car, spec.key);
                    const formattedValue = spec.format ? spec.format(value) : value;
                    return (
                      <TableCell key={car.id} className="text-center">
                        {formattedValue}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Кнопки действий */}
        <div className="mt-8 flex gap-4 justify-center">
          <Button onClick={() => navigate('/favorites')}>
            Вернуться к избранному
          </Button>
          <Button variant="outline" onClick={() => navigate('/')}>
            К поиску автомобилей
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Compare;
