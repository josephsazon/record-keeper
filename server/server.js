require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const routes = require('./routes');

const app = express();

// Connect database.
connectDB();

// Init middleware.
app.use(express.json({ extended: false }));

// Define route.
routes.init(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
