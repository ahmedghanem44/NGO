const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
const cartType = require('./cart');

const userSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    email : String,
    phone : String,
    cma : Number,
    isAdmin : Boolean,
    userName : String,
    password : String,
    cart : {
        type : ObjectId, // or Schema.Types.ObjectId
        ref : cartType
    } 
});

module.exports = mongoose.model('User' , userSchema);