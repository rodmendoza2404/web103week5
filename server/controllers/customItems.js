import { pool } from '../config/database.js'

const getCustomItems = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM custom_items ORDER BY id ASC')
    res.status(200).json(results.rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message })
  }
}

const getCustomItemById = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const results = await pool.query(
      'SELECT * FROM custom_items WHERE id = $1',
      [id]
    )

    if (results.rows.length === 0) {
      return res.status(404).json({ error: 'Custom item not found' })
    }

    res.status(200).json(results.rows[0])
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message })
  }
}

const createCustomItem = async (req, res) => {
  try {
    const { name, exterior, wheels, interior, sound, price, image_url } = req.body

    if (!name || !exterior || !wheels || !interior || !sound || !price || !image_url) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    const results = await pool.query(
      `INSERT INTO custom_items
      (name, exterior, wheels, interior, sound, price, image_url)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`,
      [name, exterior, wheels, interior, sound, price, image_url]
    )

    res.status(201).json(results.rows[0])
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message })
  }
}

const updateCustomItem = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const { name, exterior, wheels, interior, sound, price, image_url } = req.body

    const results = await pool.query(
      `UPDATE custom_items
       SET name = $1,
           exterior = $2,
           wheels = $3,
           interior = $4,
           sound = $5,
           price = $6,
           image_url = $7
       WHERE id = $8
       RETURNING *`,
      [name, exterior, wheels, interior, sound, price, image_url, id]
    )

    if (results.rows.length === 0) {
      return res.status(404).json({ error: 'Custom item not found' })
    }

    res.status(200).json(results.rows[0])
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message })
  }
}

const deleteCustomItem = async (req, res) => {
  try {
    const id = parseInt(req.params.id)

    const results = await pool.query(
      'DELETE FROM custom_items WHERE id = $1 RETURNING *',
      [id]
    )

    if (results.rows.length === 0) {
      return res.status(404).json({ error: 'Custom item not found' })
    }

    res.status(200).json(results.rows[0])
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message })
  }
}

export default {
  getCustomItems,
  getCustomItemById,
  createCustomItem,
  updateCustomItem,
  deleteCustomItem
}