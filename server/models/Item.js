const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    itemID:String,
    name:String,
    status:String
},{timestamps:true});

module.exports = mongoose.model('Item', itemSchema);