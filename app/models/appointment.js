// grab the packages that we need for the user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// user schema
var AppointmentSchema = new Schema({
    patientName: String,
    phoneNumber: Number,
    email: String,
    speciality: String,
    create :{ type: Date, default: Date.now },
    date: { type: Date, default: Date.now },
    time: String
});
// return the model
module.exports = mongoose.model('Appointment', AppointmentSchema);