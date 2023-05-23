const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./db');

const app = express();
const port = 3001;

// Parse JSON bodies
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use((reg, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
})

// Get all products
app.get('/api/products', (req, res) => {
  pool.query('SELECT * FROM products', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });
});

// Get a single product
app.get('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  pool.query('SELECT * FROM products WHERE id = ?', [productId], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else if (results.length === 0) {
      res.status(404).send('Product not found');
    } else {
      res.json(results[0]);
    }
  });
});

// Create a new product
app.post('/api/products', (req, res) => {
  const { product_name, product_price } = req.body;
  pool.query('INSERT INTO products (product_name, product_price) VALUES (?, ?)', [product_name, product_price], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else {
      res.send('Product created');
    }
  });
});

// Update a product
app.put('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  const { product_name, product_price } = req.body;
  pool.query('UPDATE products SET product_name = ?, product_price = ? WHERE id = ?', [product_name, product_price, productId], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else if (results.affectedRows === 0) {
      res.status(404).send('Product not found');
    } else {
      res.send('Product updated');
    }
  });
});

// Delete a product


app.delete('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  pool.query('DELETE FROM products WHERE id = ?', [productId], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else if (results.affectedRows === 0) {
      res.status(204).send('Product not found');
    } else {
      res.send('Product updated');
    }
  });
});
// Delete a product
app.delete('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  pool.query('DELETE FROM products WHERE id = ?', [productId], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else if (results.affectedRows === 0) {
      res.status(404).send('Product not found');
    } else {
      res.send('Product deleted');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});