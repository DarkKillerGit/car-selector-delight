
const pool = require('../config/database');

class Car {
  static async findAll() {
    const query = `
      SELECT * FROM cars 
      ORDER BY created_at DESC
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  static async findById(id) {
    const query = 'SELECT * FROM cars WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async create(carData) {
    const {
      brand, model, year, price, mileage, mileage_status,
      fuel_type, transmission, color, image_url, description,
      origin, body_type, body_material, suspension, brakes, drive_type
    } = carData;

    const query = `
      INSERT INTO cars (
        brand, model, year, price, mileage, mileage_status,
        fuel_type, transmission, color, image_url, description,
        origin, body_type, body_material, suspension, brakes, drive_type
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
      RETURNING *
    `;

    const values = [
      brand, model, year, price, mileage, mileage_status,
      fuel_type, transmission, color, image_url, description,
      origin, body_type, body_material, suspension, brakes, drive_type
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async update(id, carData) {
    const {
      brand, model, year, price, mileage, mileage_status,
      fuel_type, transmission, color, image_url, description,
      origin, body_type, body_material, suspension, brakes, drive_type
    } = carData;

    const query = `
      UPDATE cars SET 
        brand = $1, model = $2, year = $3, price = $4, mileage = $5, 
        mileage_status = $6, fuel_type = $7, transmission = $8, color = $9,
        image_url = $10, description = $11, origin = $12, body_type = $13,
        body_material = $14, suspension = $15, brakes = $16, drive_type = $17,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $18
      RETURNING *
    `;

    const values = [
      brand, model, year, price, mileage, mileage_status,
      fuel_type, transmission, color, image_url, description,
      origin, body_type, body_material, suspension, brakes, drive_type, id
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM cars WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
}

module.exports = Car;
