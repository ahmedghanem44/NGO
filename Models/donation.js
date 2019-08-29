const mongoose = require('mongoose');
var objectId = mongoose.Schema.Types.ObjectId;
const user = require('./user');
const add = require('./address');
const ev = require('./event');

const donationSchema = new mongoose.Schema({
    user : {
        type : objectId,
        ref : user
    },
    street : String,
    address : {
        type : objectId,
        ref : add
    },
    event : {
        type : objectId,
        ref : ev
    },
    amount : Number,
    dateOfDonation : Date,
    isRecurring : Boolean
});

module.exports = mongoose.model('Donation' , donationSchema);