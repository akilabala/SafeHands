// grab the packages that we need for the user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// user schema
var AppointmentSchema = new Schema({
    firstName:String,
    lastName: String,
    phone: Number,
    emailId: String,
    speciality: String,
    createdDate :{ type: Date, default: Date.now },
    appointmentDate: { type: Date, default: Date.now },
    appointmentTime: String
});
// return the model
module.exports = mongoose.model('Appointment', AppointmentSchema);