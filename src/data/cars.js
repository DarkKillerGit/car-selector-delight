
export const carOrigins = {
  foreign: "Иномарка",
  domestic: "Отечественная"
};

export const carBrands = {
  foreign: ["BMW", "Toyota", "Ford", "Honda", "Hyundai", "Lexus", "Mazda", "Mercedes", "Nissan", "Tesla", "Volkswagen", "Volvo"],
  domestic: ["Lada", "Volga", "UAZ", "Moskvich"]
};

export const bodyTypes = ["Седан", "Хэтчбек", "Внедорожник", "Минивэн"];

export const bodyMaterials = ["Металл", "Карбон", "Алюминий"];

export const suspensionTypes = ["Независимая", "Зависимая", "Пневматическая", "Гидравлическая"];

export const mileageStatus = ["Новая", "Б/У"];

export const brakeTypes = ["Дисковые", "Барабанные"];

export const transmissionTypes = ["Роботизированная", "Механическая", "Автоматическая", "Вариатор"];

export const driveTypes = ["Передний", "Задний", "Полный"];

export const fuelTypes = ["Бензиновый", "Дизельный", "Электрический", "Гибридный"];

// Функция для определения происхождения автомобиля
const getCarOrigin = (brand) => {
  if (carBrands.foreign.includes(brand)) return "Иномарка";
  if (carBrands.domestic.includes(brand)) return "Отечественная";
  return "Иномарка"; // По умолчанию иномарка
};

// Обновленные данные автомобилей с новыми параметрами
export const cars = [
  {
    id: "1",
    brand: "Audi",
    model: "A4",
    year: 2022,
    price: 45000,
    mileage: 12000,
    mileageStatus: "Б/У",
    fuelType: "Бензиновый",
    transmission: "Автоматическая",
    color: "Черный",
    image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    description: "Роскошный седан с премиальными функциями и отличной производительностью.",
    origin: "Иномарка",
    body: {
      type: "Седан",
      material: "Металл"
    },
    suspension: "Независимая",
    brakes: "Дисковые",
    driveType: "Передний"
  },
  {
    id: "2",
    brand: "BMW",
    model: "3 Series",
    year: 2021,
    price: 42000,
    mileage: 15000,
    mileageStatus: "Б/У",
    fuelType: "Дизельный",
    transmission: "Автоматическая",
    color: "Синий",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    description: "Представительский седан с идеальным сочетанием роскоши и спортивности.",
    origin: "Иномарка",
    body: {
      type: "Седан",
      material: "Металл"
    },
    suspension: "Независимая",
    brakes: "Дисковые",
    driveType: "Задний"
  },
  {
    id: "3",
    brand: "Tesla",
    model: "Model 3",
    year: 2023,
    price: 55000,
    mileage: 5000,
    mileageStatus: "Б/У",
    fuelType: "Электрический",
    transmission: "Автоматическая",
    color: "Белый",
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    description: "Высокотехнологичный электромобиль с впечатляющим запасом хода и производительностью.",
    origin: "Иномарка",
    body: {
      type: "Седан",
      material: "Алюминий"
    },
    suspension: "Независимая",
    brakes: "Дисковые",
    driveType: "Полный"
  },
  {
    id: "4",
    brand: "Toyota",
    model: "Corolla",
    year: 2022,
    price: 25000,
    mileage: 0,
    mileageStatus: "Новая",
    fuelType: "Гибридный",
    transmission: "Автоматическая",
    color: "Серебристый",
    image: "https://images.unsplash.com/photo-1623869675781-80be2ab82432?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    description: "Надежный и экономичный компактный автомобиль.",
    origin: "Иномарка",
    body: {
      type: "Седан",
      material: "Металл"
    },
    suspension: "Независимая",
    brakes: "Дисковые",
    driveType: "Передний"
  },
  {
    id: "5",
    brand: "Ford",
    model: "Mustang",
    year: 2021,
    price: 48000,
    mileage: 12000,
    mileageStatus: "Б/У",
    fuelType: "Бензиновый",
    transmission: "Механическая",
    color: "Красный",
    image: "https://images.unsplash.com/photo-1584345604476-8ec5f82d6371?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    description: "Культовый американский мускул-кар с мощной производительностью.",
    origin: "Иномарка",
    body: {
      type: "Купе",
      material: "Металл"
    },
    suspension: "Независимая",
    brakes: "Дисковые",
    driveType: "Задний"
  },
  {
    id: "6",
    brand: "Mercedes",
    model: "C-Class",
    year: 2022,
    price: 52000,
    mileage: 10000,
    mileageStatus: "Б/У",
    fuelType: "Бензиновый",
    transmission: "Автоматическая",
    color: "Серый",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    description: "Элегантный роскошный седан с передовыми технологиями.",
    origin: "Иномарка",
    body: {
      type: "Седан",
      material: "Карбон"
    },
    suspension: "Пневматическая",
    brakes: "Дисковые",
    driveType: "Задний"
  },
  {
    id: "7",
    brand: "Lada",
    model: "Vesta",
    year: 2022,
    price: 15000,
    mileage: 0,
    mileageStatus: "Новая",
    fuelType: "Бензиновый",
    transmission: "Механическая",
    color: "Белый",
    image: "https://images.unsplash.com/photo-1605816988069-b11383b50717?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    description: "Современный отечественный автомобиль с хорошим соотношением цена-качество.",
    origin: "Отечественная",
    body: {
      type: "Седан",
      material: "Металл"
    },
    suspension: "Зависимая",
    brakes: "Дисковые",
    driveType: "Передний"
  },
  {
    id: "8",
    brand: "Volga",
    model: "GAZ-24",
    year: 2020,
    price: 20000,
    mileage: 5000,
    mileageStatus: "Б/У",
    fuelType: "Бензиновый",
    transmission: "Механическая",
    color: "Черный",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    description: "Классический отечественный седан с историей и характером.",
    origin: "Отечественная",
    body: {
      type: "Седан",
      material: "Металл"
    },
    suspension: "Зависимая",
    brakes: "Барабанные",
    driveType: "Задний"
  },
  {
    id: "9",
    brand: "Honda",
    model: "CR-V",
    year: 2023,
    price: 38000,
    mileage: 0,
    mileageStatus: "Новая",
    fuelType: "Бензиновый",
    transmission: "Вариатор",
    color: "Серебристый",
    image: "https://images.unsplash.com/photo-1506015391300-4802dc74de2e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    description: "Надежный и просторный кроссовер для всей семьи.",
    origin: "Иномарка",
    body: {
      type: "Внедорожник",
      material: "Металл"
    },
    suspension: "Независимая",
    brakes: "Дисковые",
    driveType: "Полный"
  },
  {
    id: "10",
    brand: "Toyota",
    model: "Sienna",
    year: 2022,
    price: 45000,
    mileage: 8000,
    mileageStatus: "Б/У",
    fuelType: "Гибридный",
    transmission: "Автоматическая",
    color: "Синий",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    description: "Просторный и комфортный минивэн для больших семей.",
    origin: "Иномарка",
    body: {
      type: "Минивэн",
      material: "Алюминий"
    },
    suspension: "Гидравлическая",
    brakes: "Дисковые",
    driveType: "Полный"
  },
  {
    id: "11",
    brand: "Lada",
    model: "Niva",
    year: 2021,
    price: 18000,
    mileage: 15000,
    mileageStatus: "Б/У",
    fuelType: "Бензиновый",
    transmission: "Механическая",
    color: "Зеленый",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    description: "Легендарный отечественный внедорожник для бездорожья.",
    origin: "Отечественная",
    body: {
      type: "Внедорожник",
      material: "Металл"
    },
    suspension: "Зависимая",
    brakes: "Барабанные",
    driveType: "Полный"
  },
  {
    id: "12",
    brand: "UAZ",
    model: "Patriot",
    year: 2023,
    price: 22000,
    mileage: 0,
    mileageStatus: "Новая",
    fuelType: "Дизельный",
    transmission: "Механическая",
    color: "Черный",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    description: "Современный отечественный внедорожник с высокой проходимостью.",
    origin: "Отечественная",
    body: {
      type: "Внедорожник",
      material: "Металл"
    },
    suspension: "Зависимая",
    brakes: "Дисковые",
    driveType: "Полный"
  }
];
