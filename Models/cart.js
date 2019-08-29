const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    name : String,
    quantity : Number,
    amount : Number,
    total : {
        type: Number,
        default : function() {
            return this.amount * this.quantity
        }
    },
});

module.exports = mongoose.model('Cart',cartSchema);