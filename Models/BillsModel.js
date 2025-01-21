const mongoose = require('mongoose')
const BillsSchema = mongoose.Schema({
    name: {
        type: String,
        reqired: true
    },
    totalprice: {
        type: String,
        reqired: true
    },
    cartitem: {
        type: Array,
        reqired: true
    }
}, { timeStamp: true })
const BillsModel = mongoose.model('Bills', BillsSchema)

module.exports = BillsModel;