
import { useQuery } from '@tanstack/react-query';
import { apiService } from '../services/api';

const fetchCars = async () => {
  const cars = await apiService.getCars();
  
  // Преобразуем данные в нужный формат
  return cars.map(car => ({
    id: car.id,
    brand: car.brand,
    model: car.model,
    year: car.year,
    price: car.price,
    mileage: car.mileage,
    mileageStatus: car.mileage_status,
    fuelType: car.fuel_type,
    transmission: car.transmission,
    color: car.color,
    imageUrl: car.image_url,
    description: car.description,
    origin: car.origin,
    body: {
      type: car.body_type,
      material: car.body_material
    },
    suspension: car.suspension,
    brakes: car.brakes,
    driveType: car.drive_type,
    createdAt: car.created_at,
    updatedAt: car.updated_at
  }));
};

export const useCars = () => {
  return useQuery({
    queryKey: ['cars'],
    queryFn: fetchCars,
  });
};
