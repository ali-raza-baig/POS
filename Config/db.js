const { config } = require('dotenv');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config();
const connection = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000, // 30 seconds
            connectTimeoutMS: 30000, // 30 seconds
        })
        console.log('database Connected')
    } catch (error) {
        console.log(error)
    }
}
module.exports = connection;