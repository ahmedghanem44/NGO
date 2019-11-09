const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
// const cartType = require('./cart');
const donation =require('./donation');
// const add = require('./address');

const userSchema = new mongoose.Schema({
    firstName : String, //req
    lastName : String, //req
    email : {type:String,unique:true}, //req
    phone : String,
    street : String,
    // address : {
    //     type : ObjectId,
    //     ref : add
    // },
    zipCode : String,
    city : String,
    state : String,
    country : String,
    urbanization: String,
    cma : Number,
    isAdmin : Boolean, //req
    // userName : String,
    password : String, // req
    cart : [{
        type : ObjectId, // or Schema.Types.ObjectId
        ref :  donation //cartType
    }], 
    donations : [{
        type : ObjectId, // or Schema.Types.ObjectId
        ref : donation
    }]
});

module.exports = mongoose.model('User' , userSchema);