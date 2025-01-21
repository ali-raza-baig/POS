const express = require('express');
const { addbillsController, getbillscontroller } = require('../Controllers/billsController');
const billsRoutes = express.Router()

billsRoutes.post('/add-bills', addbillsController)
billsRoutes.get('/get-bills', getbillscontroller)

module.exports = billsRoutes;