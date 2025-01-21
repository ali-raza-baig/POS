const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const colors = require('colors');
const dotenv = require('dotenv');
const connection = require('./Config/db');
const path = require('path');

// Initialize dotenv configuration
dotenv.config();

// Database connection
connection();

const app = express();

// Middleware configuration
app.use(express.json());
app.use(morgan("combined"));
app.use(cors());
app.use(express.static(path.join(__dirname, './client/build')));

// API routes
app.use('/api/item', require('./Routes/itemRoutes'));
app.use('/api/bills', require('./Routes/billsRoutes'));

// Serve React frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.bgBlue.white);
});