var mongoose = require('mongoose');
var genderSchema = mongoose.Schema(
    {
        name: String,
        patientProfile: [{type: mongoose.Schema.ObjectId, ref: 'PatientProfile'}],
    }
);
var Gender = mongoose.model('Gender', genderSchema);
exports.Model = Gender;