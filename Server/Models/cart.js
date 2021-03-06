const mongoose = require('mongoose');
var objectId = mongoose.Schema.Types.ObjectId;
const user = require('./user');
// const add = require('./address');
const ev = require('./event');

const cartSchema = new mongoose.Schema({
    user : {
        type : objectId,
        ref : user
    },
    event : {
        type : objectId,
        ref : ev
    },
    amount : Number,
    dateOfDonation : Date,
    isRecurring : Boolean
});

module.exports = mongoose.model('Cart',cartSchema);