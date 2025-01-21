const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const colors = require('colors');
const dotenv = require('dotenv');
const connection = require('./Config/db');
const path = require('path')

const app = express()
connection()
// Midellwear Confij 
dotenv.config();
app.use(express.json());
app.use(morgan("combined"));
app.use(cors());
app.use(express.static(path.join(__dirname, './client/build')))

app.get("*", (req, res) => {
    res.sendFile('./client/build/index.html')
})

// Routes 
app.use('/api/item', require('./Routes/itemRoutes'))
app.use('/api/bills', require('./Routes/billsRoutes'))

// POrt setting 
app.listen(process.env.PORT, () => {
    console.log(`App listen on ${process.env.PORT}`.bgBlue.white)
})