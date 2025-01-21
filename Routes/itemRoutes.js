const express = require('express');
const { getitemscontroller, additemcontroller, deleteitemcontroller, updateItemController } = require('../Controllers/itemController');
const itemRoutes = express.Router()

// Get items 
itemRoutes.get('/get-item', getitemscontroller)

// Add items 
itemRoutes.post("/add-item", additemcontroller)
// Delete Item 
itemRoutes.delete("/delete-item/:id", deleteitemcontroller)
// Update item 
itemRoutes.put('/update-item', updateItemController)

module.exports = itemRoutes;