const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    name: {type: String, required: true, lowercase: true}, //validate adds here
    party: {type: Number, required:true},
    date: {type: Date, required: true},
    startTime:{type: Number},
    endTime:{type: Number},
    tableId:{type: Number},

});

module.exports = mongoose.model('Book', bookingSchema);
