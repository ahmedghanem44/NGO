const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    zipCode : String,
    city : String,
    state : String,
    country : String
});

module.exports = mongoose.model('Address' , addressSchema);