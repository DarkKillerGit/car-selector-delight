
// Данные о марках автомобилей для фильтров и поиска
export const carOrigins = {
  domestic: 'Отечественная',
  foreign: 'Иномарка'
};

export const carBrands = {
  domestic: [
    'ВАЗ', 'ГАЗ', 'УАЗ', 'Москвич', 'ИЖ'
  ],
  foreign: [
    'Toyota', 'Honda', 'Nissan', 'Mazda', 'Subaru', 'Mitsubishi',
    'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Opel', 'Ford',
    'Chevrolet', 'Hyundai', 'Kia', 'Renault', 'Peugeot', 'Citroen',
    'Volvo', 'SAAB', 'Skoda', 'SEAT', 'Fiat', 'Alfa Romeo'
  ]
};

export const bodyTypes = [
  'Седан', 'Хэтчбек', 'Универсал', 'Внедорожник', 'Кроссовер', 
  'Купе', 'Кабриолет', 'Минивэн', 'Пикап', 'Лифтбек'
];

export const bodyMaterials = [
  'Металл', 'Алюминий', 'Карбон', 'Пластик', 'Композит'
];

export const suspensionTypes = [
  'Независимая', 'Зависимая', 'Полузависимая', 'Активная', 'Адаптивная'
];

export const mileageStatus = [
  'Новый', 'Б/У', 'После ДТП', 'Требует ремонта'
];

export const brakeTypes = [
  'Дисковые', 'Барабанные', 'Комбинированные', 'Керамические'
];

export const transmissionTypes = [
  'Механическая', 'Автоматическая', 'Вариатор', 'Робот'
];

export const driveTypes = [
  'Передний', 'Задний', 'Полный'
];

export const fuelTypes = [
  'Бензин', 'Дизель', 'Гибрид', 'Электро', 'Газ'
];

// Пример статических данных автомобилей для разработки
export const cars = [
  {
    id: 1,
    brand: 'Toyota',
    model: 'Camry',
    year: 2020,
    price: 2500000,
    mileage: 35000,
    fuelType: 'Бензин',
    transmission: 'Автоматическая',
    body: { type: 'Седан' },
    color: 'Белый',
    origin: 'Иномарка',
    image_url: '/placeholder.svg'
  },
  {
    id: 2,
    brand: 'BMW',
    model: 'X5',
    year: 2019,
    price: 4200000,
    mileage: 28000,
    fuelType: 'Бензин',
    transmission: 'Автоматическая',
    body: { type: 'Внедорожник' },
    color: 'Черный',
    origin: 'Иномарка',
    image_url: '/placeholder.svg'
  },
  {
    id: 3,
    brand: 'ВАЗ',
    model: 'Vesta',
    year: 2021,
    price: 950000,
    mileage: 15000,
    fuelType: 'Бензин',
    transmission: 'Механическая',
    body: { type: 'Седан' },
    color: 'Красный',
    origin: 'Отечественная',
    image_url: '/placeholder.svg'
  }
];
