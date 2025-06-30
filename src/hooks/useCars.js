
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const fetchCars = async () => {
  const { data, error } = await supabase
    .from('cars')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  // Transform database data to match our Car interface
  return data.map(car => ({
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
