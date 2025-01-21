const mongoose = require('mongoose');
const connection = require('./Config/db')
const itemModel = require('./Models/itemModel')
const item = require('./Utility/data')
const colors = require('colors')
const dotenv = require('dotenv')

// config 
dotenv.config()
connection()

const putData = async () => {
    try {
        // await itemModel.DeleteMany()
        // const itemsData = await itemModel.insertMany(item);
        // console.log('Data Successfuly uploaded'.bgCyan.white)

    } catch (error) {
        console.log(error)
    }
}

putData();