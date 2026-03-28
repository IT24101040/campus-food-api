require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const studentRoutes   = require('./routes/students');
const menuItemRoutes  = require('./routes/menuItems');
const orderRoutes     = require('./routes/orders');
const analyticsRoutes = require('./routes/analytics');

const app = express();
const PORT      = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Campus Food API is running!' });
});

app.use('/students',   studentRoutes);
app.use('/menu-items', menuItemRoutes);
app.use('/orders',     orderRoutes);
app.use('/analytics',  analyticsRoutes);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });
