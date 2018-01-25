var mongoose = require('mongoose');
var countrySchema = mongoose.Schema(
    {
        name: String,
        patientProfiles: [{type: mongoose.Schema.ObjectId, ref: 'PatientProfile'}],
        provinces: [{type: mongoose.Schema.ObjectId, ref: 'Province'}]
    }
);
var Countries = mongoose.model('Country', countrySchema);
exports.Model = Countries;
