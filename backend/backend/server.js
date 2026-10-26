const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Home route
app.get('/', (req, res) => {
  res.send('GI Setu backend is running!');
});

// Backend health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    project: 'GI Setu'
  });
});

// Database health check
app.get('/api/db-health', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW() AS time');

    res.json({
      status: 'connected',
      database: 'Neon PostgreSQL',
      time: result.rows[0].time
    });
  } catch (error) {
    console.error('Database connection failed:', error.message);

    res.status(500).json({
      status: 'error',
      message: 'Database connection failed'
    });
  }
});

// Get all GI products
app.get('/api/products', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM gi_products ORDER BY product_name'
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Fetch products failed:', error.message);

    res.status(500).json({
      error: 'Failed to fetch GI products'
    });
  }
});

// Get all sellers
app.get('/api/sellers', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM sellers ORDER BY seller_name'
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Fetch sellers failed:', error.message);

    res.status(500).json({
      error: 'Failed to fetch sellers'
    });
  }
});

// Register a new seller
app.post('/api/sellers', async (req, res) => {
  try {
    const {
      seller_name,
      state,
      district,
      email,
      phone
    } = req.body;

    if (
      typeof seller_name !== 'string' ||
      !seller_name.trim() ||
      typeof state !== 'string' ||
      !state.trim() ||
      typeof email !== 'string' ||
      !email.trim()
    ) {
      return res.status(400).json({
        error: 'Seller name, state, and email are required'
      });
    }

    const result = await pool.query(
      `INSERT INTO sellers
        (seller_name, state, district, email, phone, is_verified, created_at)
       VALUES ($1, $2, $3, $4, $5, false, CURRENT_TIMESTAMP)
       RETURNING id, seller_name, state, district, email, phone,
                 is_verified, created_at`,
      [
        seller_name.trim(),
        state.trim(),
        typeof district === 'string' && district.trim()
          ? district.trim()
          : null,
        email.trim(),
        typeof phone === 'string' && phone.trim()
          ? phone.trim()
          : null
      ]
    );

    res.status(201).json({
      message: 'Seller registered successfully',
      seller: result.rows[0]
    });
  } catch (error) {
    console.error('Seller registration failed:', error.message);

    res.status(500).json({
      error: 'Failed to register seller'
    });
  }
});

// Start the backend
app.listen(PORT, () => {
  console.log(`GI Setu backend running on port ${PORT}`);
});
