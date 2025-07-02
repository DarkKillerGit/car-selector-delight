
const pool = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  static async findByEmail(email) {
    try {
      const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
      return rows[0];
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      const [rows] = await pool.execute('SELECT * FROM users WHERE id_user = ?', [id]);
      return rows[0];
    } catch (error) {
      console.error('Error finding user by ID:', error);
      throw error;
    }
  }

  static async create(userData) {
    const { email, password, surname, name, role = 'user', age } = userData;
    
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const [result] = await pool.execute(
        'INSERT INTO users (email, password_hash, surname, name, role, age) VALUES (?, ?, ?, ?, ?, ?)',
        [email, hashedPassword, surname, name, role, age]
      );
      
      return await this.findById(result.insertId);
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  static async validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  static async findAll() {
    try {
      const [rows] = await pool.execute('SELECT id_user, email, surname, name, role, age FROM users ORDER BY id_user DESC');
      return rows;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  static async updateRole(id, role) {
    try {
      await pool.execute('UPDATE users SET role = ? WHERE id_user = ?', [role, id]);
      return await this.findById(id);
    } catch (error) {
      console.error('Error updating user role:', error);
      throw error;
    }
  }

  static async delete(id) {
    try {
      const user = await this.findById(id);
      await pool.execute('DELETE FROM users WHERE id_user = ?', [id]);
      return user;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }
}

module.exports = User;
