
const mysql = require('mysql2/promise');
require('dotenv').config();

console.log('Database configuration:');
console.log('Host:', process.env.DB_HOST || 'localhost');
console.log('Port:', process.env.DB_PORT || 3306);
console.log('Database:', process.env.DB_NAME || 'car_selector');
console.log('User:', process.env.DB_USER || 'root');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  database: process.env.DB_NAME || 'car_selector',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Проверяем подключение к базе данных
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✓ Successfully connected to MySQL database');
    connection.release();
  } catch (error) {
    console.error('✗ Failed to connect to MySQL database:', error.message);
  }
})();

module.exports = pool;
