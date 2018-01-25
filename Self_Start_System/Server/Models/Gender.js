var mongoose = require('mongoose');
var genderSchema = mongoose.Schema(
    {
        name: String,
        patientProfiles: [{type: mongoose.Schema.ObjectId, ref: 'PatientProfile'}],
    }
);
var Genders = mongoose.model('Gender', genderSchema);
exports.Model = Genders;
