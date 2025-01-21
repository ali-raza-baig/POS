const BillsModel = require("../Models/BillsModel")

exports.addbillsController = async (req, res) => {
    try {
        const AddBill = await BillsModel(req.body).save()
        res.status(201).send({
            success: true
        })

    } catch (error) {
        console.log(error)
    }
}

// Get All items 
exports.getbillscontroller = async (req, res) => {
    try {
        const bills = await BillsModel.find().sort({ _id: -1 })
        res.status(200).send({
            bills
        })

    } catch (error) {
        console.log(error)
    }
}