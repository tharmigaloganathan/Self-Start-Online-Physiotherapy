var mongoose = require('mongoose');
var provinceSchema = mongoose.Schema(
    {
        name: String,
        patientProfiles: [{type: mongoose.Schema.ObjectId, ref: 'PatientProfile'}],
        cities: [{type: mongoose.Schema.ObjectId, ref: 'City'}],
        country: {type: mongoose.Schema.ObjectId, ref: 'Country'}
    }
);
var Provinces = mongoose.model('Province', provinceSchema);
exports.Model = Provinces;
