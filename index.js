require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Producto = require('./models/producto');
const sequelize = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

// GET: obtener todos los productos
app.get('/api/productos', async (req, res) => {
  try {
    const productos = await Producto.findAll();
    console.log('Productos obtenidos:', productos.map(p => p.toJSON()));
    res.json(productos);
  } catch (error) {
    console.error('Error GET /api/productos:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST: agregar producto
app.post('/api/productos', async (req, res) => {
  try {
    const { nombre, precio } = req.body;
    if (!nombre || precio === undefined) {
      return res.status(400).json({ error: 'Nombre y precio son obligatorios' });
    }

    const nuevo = await Producto.create({ nombre, precio });
    console.log('Producto creado:', nuevo.toJSON());
    res.json({ message: 'Producto insertado correctamente', producto: nuevo });
  } catch (error) {
    console.error('Error POST /api/productos:', error);
    res.status(500).json({ error: error.message });
  }
});

// Puerto
const PORT = process.env.PORT || 3000;

// Conexión a DB y arranque del servidor
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida');
    app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
  })
  .catch(err => console.error('Error conectando a la base de datos:', err));
