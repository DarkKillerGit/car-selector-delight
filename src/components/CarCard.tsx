
import React from 'react';
import { Car as CarType } from '../data/cars';
import { Car as CarIcon, Fuel, Gauge, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CarCardProps {
  car: CarType;
}

const CarCard = ({ car }: CarCardProps) => {
  const formatPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(car.price);

  return (
    <Card className="overflow-hidden card-hover-effect">
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={car.image} 
          alt={`${car.brand} ${car.model}`}
          className="object-cover w-full h-full"
        />
        <Badge className="absolute top-3 right-3">
          {car.year}
        </Badge>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{car.brand} {car.model}</h3>
            <p className="text-2xl font-bold text-primary mt-1">{formatPrice}</p>
          </div>
          <Badge variant="outline" className="bg-primary/10 text-primary">
            {car.transmission}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-gray-500 mb-4">{car.description}</p>
        
        <div className="grid grid-cols-3 gap-2">
          <div className="flex items-center text-sm text-gray-700">
            <Gauge className="h-4 w-4 mr-1 text-gray-400" />
            <span>{car.mileage.toLocaleString()} mi</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-700">
            <Fuel className="h-4 w-4 mr-1 text-gray-400" />
            <span>{car.fuelType}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-700">
            <Calendar className="h-4 w-4 mr-1 text-gray-400" />
            <span>{car.year}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button className="w-full">View Details</Button>
      </CardFooter>
    </Card>
  );
};

export default CarCard;
