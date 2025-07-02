
const pool = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }

  static async findById(id) {
    const query = 'SELECT * FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async create(userData) {
    const { email, password, full_name, role = 'user' } = userData;
    
    // Хешируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const query = `
      INSERT INTO users (email, password, full_name, role)
      VALUES ($1, $2, $3, $4)
      RETURNING id, email, full_name, role, created_at
    `;
    
    const result = await pool.query(query, [email, hashedPassword, full_name, role]);
    return result.rows[0];
  }

  static async validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  static async findAll() {
    const query = 'SELECT id, email, full_name, role, created_at FROM users ORDER BY created_at DESC';
    const result = await pool.query(query);
    return result.rows;
  }

  static async updateRole(id, role) {
    const query = 'UPDATE users SET role = $1 WHERE id = $2 RETURNING id, email, full_name, role';
    const result = await pool.query(query, [role, id]);
    return result.rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM users WHERE id = $1 RETURNING id, email';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
}

module.exports = User;
