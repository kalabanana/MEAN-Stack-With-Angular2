const mongoose = requre('mongoose')
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

//creates a new schema

const customerSchema = new Schema({
    name: {type: String, lowercase: true, required:true}, //validate adds here
    party: {type: Number, required:true},
    date: {type: Date, required: true},
    telephone:{type: String, required: true},
    pastBookings:{type: Object, required: true},
});

module.exports = mongoose.model('Customer', customerSchema);
