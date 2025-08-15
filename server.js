const express = require('express');
require('dotenv').config();
const db = require('./db');

const bodyParser = require('body-parser');
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

const app = express();

app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Welcome to our Hotel API');
});

app.use('/person', personRoutes);

app.use('/menu', menuItemRoutes);



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});