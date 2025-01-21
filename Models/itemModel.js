const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    name: {
        type: String,
        reqired: true
    },
    price: {
        type: String,
        reqired: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, { timeStamp: true });

const itemModel = mongoose.model("item", itemSchema)
module.exports = itemModel;