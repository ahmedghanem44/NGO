const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    eventName : String, //req
    // dateOfEvent : Date,
    isActive : { type: Boolean , default : true}
});

module.exports = mongoose.model('Event' , eventSchema);