
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Регистрация
router.post('/register', async (req, res) => {
  try {
    const { email, password, name, surname, age } = req.body;

    // Проверяем, существует ли пользователь
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Создаем нового пользователя
    const user = await User.create({ email, password, name, surname, age });
    
    // Создаем токен
    const token = jwt.sign({ userId: user.id_user }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      token,
      user: {
        id: user.id_user,
        email: user.email,
        name: user.name,
        surname: user.surname,
        role: user.role,
        age: user.age
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Авторизация
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Находим пользователя
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Проверяем пароль
    const isValidPassword = await User.validatePassword(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Создаем токен
    const token = jwt.sign({ userId: user.id_user }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      user: {
        id: user.id_user,
        email: user.email,
        name: user.name,
        surname: user.surname,
        role: user.role,
        age: user.age
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Получение текущего пользователя
router.get('/me', authenticateToken, async (req, res) => {
  res.json({
    id: req.user.id_user,
    email: req.user.email,
    name: req.user.name,
    surname: req.user.surname,
    role: req.user.role,
    age: req.user.age
  });
});

module.exports = router;
