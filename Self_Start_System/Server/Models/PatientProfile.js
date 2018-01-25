var mongoose = require('mongoose');
var patientProfileSchema = mongoose.Schema(
    {
        DOB: Date,
        postalCode: String,
        phone: String,
        maritalStatus: String,
        healthCardNumber: String,
        occupation: String,
        others: String,

        account: {type: mongoose.Schema.ObjectId, ref: 'UserAccount'},
        payments: [{type: mongoose.Schema.ObjectId, ref: 'Payments'}],
        country: {type: mongoose.Schema.ObjectId, ref: 'Country'},
        province: {type: mongoose.Schema.ObjectId, ref: 'Province'},
        city: {type: mongoose.Schema.ObjectId, ref: 'City'},
        gender: {type: mongoose.Schema.ObjectId, ref: 'Gender'},
        appointments: [{type: mongoose.Schema.ObjectId, ref: 'Appointment'}],
    }
);
var PatientProfiles = mongoose.model('PatientProfile', patientProfileSchema);
exports.Model = PatientProfiles;
