// server/index.js
const express = require('express');
const cors = require('cors');
const connection = require('./db');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Получение всех автомобилей
app.get('/api/cars', (req, res) => {
  const query = 'SELECT * FROM cars';
  connection.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({ error });
    }
    res.json(results);
  });
});

// Получение автомобиля по ID
app.get('/api/cars/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM cars WHERE id = ?';
  connection.query(query, [id], (error, results) => {
    if (error) {
      return res.status(500).json({ error });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Автомобиль не найден' });
    }
    res.json(results[0]);
  });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});