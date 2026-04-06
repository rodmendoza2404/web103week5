import 'dotenv/config'
import { pool } from './database.js'

const createTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS custom_items (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        exterior VARCHAR(50) NOT NULL,
        wheels VARCHAR(50) NOT NULL,
        interior VARCHAR(50) NOT NULL,
        sound VARCHAR(50) NOT NULL,
        price NUMERIC(10,2) NOT NULL,
        image_url TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `)

    console.log('custom_items table created successfully')
  } catch (error) {
    console.error('Error creating table:', error)
  } finally {
    await pool.end()
  }
}

createTable()