var mongoose = require('mongoose');
var appointmentSchema = mongoose.Schema(
    {
        date: Date,
        reason: String,
        note: String,
        patientProfile: {type: mongoose.Schema.ObjectId, ref: 'PatientProfile'}
    }
);
var Appointments = mongoose.model('Appointment', appointmentSchema);
exports.Model = Appointments;
