const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    eventName : String,
    dateOfEvent : Date,
    isActive : Boolean
});

module.exports = mongoose.model('Event' , eventSchema);