
const pool = require('../config/database');

class Car {
  static async findAll() {
    try {
      console.log('Executing SQL query: SELECT * FROM cars ORDER BY year DESC');
      const [rows] = await pool.execute('SELECT * FROM cars ORDER BY year DESC');
      console.log('Query result:', rows);
      return rows;
    } catch (error) {
      console.error('Error fetching cars:', error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      console.log('Executing SQL query: SELECT * FROM cars WHERE id_car = ?', [id]);
      const [rows] = await pool.execute('SELECT * FROM cars WHERE id_car = ?', [id]);
      console.log('Query result:', rows);
      return rows[0];
    } catch (error) {
      console.error('Error fetching car by ID:', error);
      throw error;
    }
  }

  static async create(carData) {
    const {
      brand, model, year, price, mileage, mileage_status, fuel_type, transmission,
      color, image_url, description, origin, body_type, body_material,
      suspension, brakes, drive_type
    } = carData;

    try {
      const [result] = await pool.execute(
        `INSERT INTO cars (
          brand, model, year, price, mileage, mileage_status, fuel_type, transmission,
          color, image_url, description, origin, body_type, body_material,
          suspension, brakes, drive_type
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          brand, model, year, price, mileage, mileage_status, fuel_type, transmission,
          color, image_url, description, origin, body_type, body_material,
          suspension, brakes, drive_type
        ]
      );
      
      return await this.findById(result.insertId);
    } catch (error) {
      console.error('Error creating car:', error);
      throw error;
    }
  }

  static async update(id, carData) {
    const {
      brand, model, year, price, mileage, mileage_status, fuel_type, transmission,
      color, image_url, description, origin, body_type, body_material,
      suspension, brakes, drive_type
    } = carData;

    try {
      console.log('Updating car with id:', id, 'Data:', carData);
      await pool.execute(
        `UPDATE cars SET 
          brand = ?, model = ?, year = ?, price = ?, mileage = ?, mileage_status = ?, fuel_type = ?,
          transmission = ?, color = ?, image_url = ?, description = ?,
          origin = ?, body_type = ?, body_material = ?, suspension = ?,
          brakes = ?, drive_type = ?
        WHERE id_car = ?`,
        [
          brand, model, year, price, mileage, mileage_status, fuel_type, transmission,
          color, image_url, description, origin, body_type, body_material,
          suspension, brakes, drive_type, id
        ]
      );
      
      return await this.findById(id);
    } catch (error) {
      console.error('Error updating car:', error);
      throw error;
    }
  }

  static async delete(id) {
    try {
      const car = await this.findById(id);
      await pool.execute('DELETE FROM cars WHERE id_car = ?', [id]);
      return car;
    } catch (error) {
      console.error('Error deleting car:', error);
      throw error;
    }
  }
}

module.exports = Car;
