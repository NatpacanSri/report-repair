const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    role: String,
});

module.exports = mongoose.model('Student', userSchema);