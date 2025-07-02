
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { apiService } from '../../services/api';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';

const AdminCars = () => {
  const [selectedCar, setSelectedCar] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: cars = [], isLoading } = useQuery({
    queryKey: ['admin-cars'],
    queryFn: () => apiService.getCars(),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => apiService.deleteCar(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-cars']);
      toast({
        title: "Успешно",
        description: "Автомобиль удален",
      });
    },
    onError: (error) => {
      toast({
        title: "Ошибка",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleDelete = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этот автомобиль?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleEdit = (car) => {
    setSelectedCar(car);
    setShowForm(true);
  };

  const handleAdd = () => {
    setSelectedCar(null);
    setShowForm(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Управление автомобилями</h2>
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Добавить автомобиль
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Фото</TableHead>
              <TableHead>Марка</TableHead>
              <TableHead>Модель</TableHead>
              <TableHead>Год</TableHead>
              <TableHead>Цена</TableHead>
              <TableHead>Пробег</TableHead>
              <TableHead className="text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cars.map((car) => (
              <TableRow key={car.id}>
                <TableCell>
                  <img 
                    src={car.imageUrl || '/placeholder.svg'} 
                    alt={`${car.brand} ${car.model}`}
                    className="w-16 h-12 object-cover rounded"
                  />
                </TableCell>
                <TableCell className="font-medium">{car.brand}</TableCell>
                <TableCell>{car.model}</TableCell>
                <TableCell>{car.year}</TableCell>
                <TableCell>${car.price?.toLocaleString()}</TableCell>
                <TableCell>
                  {car.mileage === 0 ? 'Новый' : `${car.mileage?.toLocaleString()} км`}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center gap-2 justify-end">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleEdit(car)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDelete(car.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {cars.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Нет автомобилей для отображения</p>
        </div>
      )}
    </div>
  );
};

export default AdminCars;
