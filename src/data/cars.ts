
export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  color: string;
  image: string;
  description: string;
}

export const carBrands = [
  "Audi", "BMW", "Ford", "Honda", "Hyundai", "Lexus", "Mazda", 
  "Mercedes", "Nissan", "Tesla", "Toyota", "Volkswagen", "Volvo"
];

export const transmissionTypes = ["Automatic", "Manual", "Semi-automatic"];

export const fuelTypes = ["Petrol", "Diesel", "Hybrid", "Electric"];

export const cars: Car[] = [
  {
    id: "1",
    brand: "Audi",
    model: "A4",
    year: 2022,
    price: 45000,
    mileage: 12000,
    fuelType: "Petrol",
    transmission: "Automatic",
    color: "Black",
    image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    description: "Luxury sedan with premium features and excellent performance."
  },
  {
    id: "2",
    brand: "BMW",
    model: "3 Series",
    year: 2021,
    price: 42000,
    mileage: 15000,
    fuelType: "Diesel",
    transmission: "Automatic",
    color: "Blue",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    description: "Executive sedan with a perfect blend of luxury and sportiness."
  },
  {
    id: "3",
    brand: "Tesla",
    model: "Model 3",
    year: 2023,
    price: 55000,
    mileage: 5000,
    fuelType: "Electric",
    transmission: "Automatic",
    color: "White",
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    description: "High-tech electric car with impressive range and performance."
  },
  {
    id: "4",
    brand: "Toyota",
    model: "Corolla",
    year: 2022,
    price: 25000,
    mileage: 18000,
    fuelType: "Hybrid",
    transmission: "Automatic",
    color: "Silver",
    image: "https://images.unsplash.com/photo-1623869675781-80be2ab82432?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    description: "Reliable and fuel-efficient compact car."
  },
  {
    id: "5",
    brand: "Ford",
    model: "Mustang",
    year: 2021,
    price: 48000,
    mileage: 12000,
    fuelType: "Petrol",
    transmission: "Manual",
    color: "Red",
    image: "https://images.unsplash.com/photo-1584345604476-8ec5f82d6371?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    description: "Iconic American muscle car with powerful performance."
  },
  {
    id: "6",
    brand: "Mercedes",
    model: "C-Class",
    year: 2022,
    price: 52000,
    mileage: 10000,
    fuelType: "Petrol",
    transmission: "Automatic",
    color: "Gray",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    description: "Elegant luxury sedan with advanced technology."
  },
  {
    id: "7",
    brand: "Honda",
    model: "Civic",
    year: 2022,
    price: 27000,
    mileage: 15000,
    fuelType: "Petrol",
    transmission: "Manual",
    color: "Blue",
    image: "https://images.unsplash.com/photo-1605816988069-b11383b50717?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    description: "Reliable and sporty compact car with excellent fuel economy."
  },
  {
    id: "8",
    brand: "Volkswagen",
    model: "Golf",
    year: 2021,
    price: 29000,
    mileage: 20000,
    fuelType: "Diesel",
    transmission: "Manual",
    color: "Black",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    description: "Iconic hatchback with German engineering and quality."
  }
];
