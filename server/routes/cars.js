
const express = require('express');
const Car = require('../models/Car');
const { authenticateToken, isAdmin } = require('../middleware/auth');

const router = express.Router();

// Получить все автомобили
router.get('/', async (req, res) => {
  try {
    console.log('GET /api/cars - Fetching all cars from database...');
    const cars = await Car.findAll();
    console.log(`Found ${cars.length} cars in database`);
    res.json(cars);
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({ error: 'Failed to fetch cars from database: ' + error.message });
  }
});

// Получить автомобиль по ID
router.get('/:id', async (req, res) => {
  try {
    console.log('GET /api/cars/:id - Fetching car with id:', req.params.id);
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.json(car);
  } catch (error) {
    console.error('Error fetching car:', error);
    res.status(500).json({ error: 'Failed to fetch car: ' + error.message });
  }
});

// Создать новый автомобиль (только для админов)
router.post('/', authenticateToken, isAdmin, async (req, res) => {
  try {
    console.log('POST /api/cars - Creating new car:', req.body);
    const car = await Car.create(req.body);
    res.status(201).json(car);
  } catch (error) {
    console.error('Error creating car:', error);
    res.status(500).json({ error: 'Failed to create car: ' + error.message });
  }
});

// Обновить автомобиль (только для админов)
router.put('/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    console.log('PUT /api/cars/:id - Updating car with id:', req.params.id, 'Data:', req.body);
    const car = await Car.update(req.params.id, req.body);
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.json(car);
  } catch (error) {
    console.error('Error updating car:', error);
    res.status(500).json({ error: 'Failed to update car: ' + error.message });
  }
});

// Удалить автомобиль (только для админов)
router.delete('/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    console.log('DELETE /api/cars/:id - Deleting car with id:', req.params.id);
    const car = await Car.delete(req.params.id);
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.json({ message: 'Car deleted successfully' });
  } catch (error) {
    console.error('Error deleting car:', error);
    res.status(500).json({ error: 'Failed to delete car: ' + error.message });
  }
});

module.exports = router;
