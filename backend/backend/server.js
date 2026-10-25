
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

app.get('/', (req, res) => {
  res.send('GI Setu backend is running!');
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    project: 'GI Setu'
  });
});

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

app.get('/api/products', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM gi_products ORDER BY product_name'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Fetch products failed:', error.message);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.get('/api/sellers', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM sellers ORDER BY seller_name'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Fetch sellers failed:', error.message);
    res.status(500).json({ error: 'Failed to fetch sellers' });
  }
});

app.listen(PORT, () => {
  console.log(`GI Setu backend running on port ${PORT}`);
});
