const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    itemID:String,
    itemName:String,
    status:String
},{timestamps:true});

module.exports = mongoose.model('Item', itemSchema);