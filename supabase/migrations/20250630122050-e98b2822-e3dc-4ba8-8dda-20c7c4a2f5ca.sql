
-- Создаем таблицу для автомобилей
CREATE TABLE public.cars (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  brand VARCHAR(50) NOT NULL,
  model VARCHAR(100) NOT NULL,
  year INTEGER NOT NULL CHECK (year >= 1900 AND year <= 2030),
  price DECIMAL(12,2) NOT NULL CHECK (price >= 0),
  mileage INTEGER NOT NULL DEFAULT 0 CHECK (mileage >= 0),
  mileage_status VARCHAR(20) NOT NULL DEFAULT 'Б/У',
  fuel_type VARCHAR(30) NOT NULL,
  transmission VARCHAR(30) NOT NULL,
  color VARCHAR(30) NOT NULL,
  image_url TEXT,
  description TEXT,
  origin VARCHAR(20) NOT NULL DEFAULT 'Иномарка',
  body_type VARCHAR(30) NOT NULL,
  body_material VARCHAR(30) NOT NULL DEFAULT 'Металл',
  suspension VARCHAR(30) NOT NULL,
  brakes VARCHAR(30) NOT NULL,
  drive_type VARCHAR(30) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Создаем таблицу профилей пользователей (для дополнительной информации)
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Включаем Row Level Security для таблицы автомобилей
ALTER TABLE public.cars ENABLE ROW LEVEL SECURITY;

-- Создаем политику для просмотра автомобилей (все пользователи могут видеть все автомобили)
CREATE POLICY "Anyone can view cars" ON public.cars FOR SELECT USING (true);

-- Включаем Row Level Security для профилей
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Политики для профилей пользователей
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Создаем функцию для автоматического создания профиля при регистрации
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', '')
  );
  RETURN new;
END;
$$;

-- Создаем триггер для автоматического создания профиля
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Заполняем таблицу автомобилей данными
INSERT INTO public.cars (brand, model, year, price, mileage, mileage_status, fuel_type, transmission, color, image_url, description, origin, body_type, body_material, suspension, brakes, drive_type) VALUES
('Audi', 'A4', 2022, 45000, 12000, 'Б/У', 'Бензиновый', 'Автоматическая', 'Черный', 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60', 'Роскошный седан с премиальными функциями и отличной производительностью.', 'Иномарка', 'Седан', 'Металл', 'Независимая', 'Дисковые', 'Передний'),
('BMW', '3 Series', 2021, 42000, 15000, 'Б/У', 'Дизельный', 'Автоматическая', 'Синий', 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60', 'Представительский седан с идеальным сочетанием роскоши и спортивности.', 'Иномарка', 'Седан', 'Металл', 'Независимая', 'Дисковые', 'Задний'),
('Tesla', 'Model 3', 2023, 55000, 5000, 'Б/У', 'Электрический', 'Автоматическая', 'Белый', 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60', 'Высокотехнологичный электромобиль с впечатляющим запасом хода и производительностью.', 'Иномарка', 'Седан', 'Алюминий', 'Независимая', 'Дисковые', 'Полный'),
('Toyota', 'Corolla', 2022, 25000, 0, 'Новая', 'Гибридный', 'Автоматическая', 'Серебристый', 'https://images.unsplash.com/photo-1623869675781-80be2ab82432?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60', 'Надежный и экономичный компактный автомобиль.', 'Иномарка', 'Седан', 'Металл', 'Независимая', 'Дисковые', 'Передний'),
('Ford', 'Mustang', 2021, 48000, 12000, 'Б/У', 'Бензиновый', 'Механическая', 'Красный', 'https://images.unsplash.com/photo-1584345604476-8ec5f82d6371?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60', 'Культовый американский мускул-кар с мощной производительностью.', 'Иномарка', 'Купе', 'Металл', 'Независимая', 'Дисковые', 'Задний'),
('Mercedes', 'C-Class', 2022, 52000, 10000, 'Б/У', 'Бензиновый', 'Автоматическая', 'Серый', 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60', 'Элегантный роскошный седан с передовыми технологиями.', 'Иномарка', 'Седан', 'Карбон', 'Пневматическая', 'Дисковые', 'Задний'),
('Lada', 'Vesta', 2022, 15000, 0, 'Новая', 'Бензиновый', 'Механическая', 'Белый', 'https://images.unsplash.com/photo-1605816988069-b11383b50717?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60', 'Современный отечественный автомобиль с хорошим соотношением цена-качество.', 'Отечественная', 'Седан', 'Металл', 'Зависимая', 'Дисковые', 'Передний'),
('Volga', 'GAZ-24', 2020, 20000, 5000, 'Б/У', 'Бензиновый', 'Механическая', 'Черный', 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60', 'Классический отечественный седан с историей и характером.', 'Отечественная', 'Седан', 'Металл', 'Зависимая', 'Барабанные', 'Задний'),
('Honda', 'CR-V', 2023, 38000, 0, 'Новая', 'Бензиновый', 'Вариатор', 'Серебристый', 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60', 'Надежный и просторный кроссовер для всей семьи.', 'Иномарка', 'Внедорожник', 'Металл', 'Независимая', 'Дисковые', 'Полный'),
('Toyota', 'Sienna', 2022, 45000, 8000, 'Б/У', 'Гибридный', 'Автоматическая', 'Синий', 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60', 'Просторный и комфортный минивэн для больших семей.', 'Иномарка', 'Минивэн', 'Алюминий', 'Гидравлическая', 'Дисковые', 'Полный'),
('Lada', 'Niva', 2021, 18000, 15000, 'Б/У', 'Бензиновый', 'Механическая', 'Зеленый', 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60', 'Легендарный отечественный внедорожник для бездорожья.', 'Отечественная', 'Внедорожник', 'Металл', 'Зависимая', 'Барабанные', 'Полный'),
('UAZ', 'Patriot', 2023, 22000, 0, 'Новая', 'Дизельный', 'Механическая', 'Черный', 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60', 'Современный отечественный внедорожник с высокой проходимостью.', 'Отечественная', 'Внедорожник', 'Металл', 'Зависимая', 'Дисковые', 'Полный');
