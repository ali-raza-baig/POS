const itemModel = require('../Models/itemModel')

// Get All items 
exports.getitemscontroller = async (req, res) => {
    try {
        const All_items = await itemModel.find().sort({ _id: -1 })
        res.status(200).send({
            All_items
        })

    } catch (error) {
        console.log(error)
    }
}

// Add New Items 
exports.additemcontroller = async (req, res) => {
    try {
        const additem = await itemModel(req.body).save()
        res.status(200).send({
            success: true,
            message: "New item added successfuly",
            additem
        })
    } catch (error) {
        console.log(error)
    }
}

exports.deleteitemcontroller = async (req, res) => {
    try {

        const { id } = req.params;
        await itemModel.findByIdAndDelete(id)
        res.status(201).send({
            success: true,
            message: "item Deleted."
        })
    } catch (error) {

    }
}

exports.updateItemController = async (req, res) => {
    try {
        await itemModel.findOneAndUpdate({ _id: req.body.itemid }, req.body)
        res.status(201).send({
            success: true,
            message: "item Update."
        })

    } catch (error) {
        console.log(error)
    }
}
