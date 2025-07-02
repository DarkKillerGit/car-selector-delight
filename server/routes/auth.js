
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Регистрация
router.post('/register', async (req, res) => {
  try {
    const { email, password, surname, name, age } = req.body;
    
    // Проверяем, существует ли пользователь
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    // Создаем нового пользователя
    const user = await User.create({ email, password, surname, name, age });
    
    // Создаем JWT токен
    const token = jwt.sign(
      { userId: user.id_user, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );
    
    res.status(201).json({
      user: { 
        id: user.id_user, 
        email: user.email, 
        full_name: `${user.name} ${user.surname}`, 
        role: user.role 
      },
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// Авторизация
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Находим пользователя
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Проверяем пароль
    const isValidPassword = await User.validatePassword(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Создаем JWT токен
    const token = jwt.sign(
      { userId: user.id_user, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );
    
    res.json({
      user: { 
        id: user.id_user, 
        email: user.email, 
        full_name: `${user.name} ${user.surname}`, 
        role: user.role 
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
});

// Получить текущего пользователя
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({
      id: user.id_user,
      email: user.email,
      full_name: `${user.name} ${user.surname}`,
      role: user.role
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

module.exports = router;
